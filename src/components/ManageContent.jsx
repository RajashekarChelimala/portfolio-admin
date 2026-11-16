import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import { myAxios, myPrivateAxios } from "../utils/api";
import { DEFAULT_CONTENT } from "../utils/fallbackData";
import AOS from "aos";
import Swal from "sweetalert2";
import "aos/dist/aos.css"; // AOS styles
import JoditEditor from "jodit-react";
import Loader from "../ui-elements/Loader";
import AdminNav from "./AdminNav";
import "./ManageContent.css";

const ManageContent = ({ placeholder }) => {
  const [formData, setFormData] = useState(() => {
    try {
      const cached = localStorage.getItem("portfolio_content_cache");
      return cached ? { ...DEFAULT_CONTENT, ...JSON.parse(cached) } : DEFAULT_CONTENT;
    } catch {
      return DEFAULT_CONTENT;
    }
  });

  const [contentId, setContentId] = useState(null); // Store the content ID
  const [isLoading, setIsLoading] = useState(false); // Loader state

  // Cloudinary media upload states
  const [profileFile, setProfileFile] = useState(null);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  const editor = useRef(null); // Jodit editor reference
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS animations
  }, []);

  // Fetch existing content data for editing
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await myAxios.get("/content");
        if (response.data && response.data.name) {
          const { _id, ...dataWithoutId } = response.data; // Destructure to exclude _id
          setFormData((prev) => ({ ...prev, ...dataWithoutId }));
          setContentId(_id);
          try {
            localStorage.setItem("portfolio_content_cache", JSON.stringify(dataWithoutId));
          } catch {}
        }
      } catch (err) {
        console.warn("Using default profile content in ManageContent:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, introduction: content });
  };

  // Upload Profile Photo directly to Cloudinary via backend API
  const handleUploadProfile = async () => {
    if (!profileFile) {
      Swal.fire("Select File", "Please select an image file first.", "warning");
      return;
    }

    setUploadingProfile(true);
    const data = new FormData();
    data.append("image", profileFile);

    try {
      const response = await myPrivateAxios.post("/media/upload/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.url) {
        setFormData((prev) => ({ ...prev, imageLink: response.data.url }));
        setProfileFile(null);
        Swal.fire({
          icon: "success",
          title: "Profile Photo Uploaded!",
          text: "Uploaded to Cloudinary and synchronized with database.",
        });
      }
    } catch (err) {
      console.error("Cloudinary profile upload error:", err);
      Swal.fire(
        "Upload Error",
        err.response?.data?.message || "Failed to upload profile photo to Cloudinary.",
        "error"
      );
    } finally {
      setUploadingProfile(false);
    }
  };

  // Upload Resume PDF directly to Cloudinary via backend API
  const handleUploadResume = async () => {
    if (!resumeFile) {
      Swal.fire("Select File", "Please select a PDF file first.", "warning");
      return;
    }

    setUploadingResume(true);
    const data = new FormData();
    data.append("resume", resumeFile);

    try {
      const response = await myPrivateAxios.post("/media/upload/resume", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.url) {
        setFormData((prev) => ({ ...prev, resumeLink: response.data.url }));
        setResumeFile(null);
        Swal.fire({
          icon: "success",
          title: "Resume PDF Uploaded!",
          text: "Uploaded to Cloudinary CDN and synchronized with database.",
        });
      }
    } catch (err) {
      console.error("Cloudinary resume upload error:", err);
      Swal.fire(
        "Upload Error",
        err.response?.data?.message || "Failed to upload resume PDF to Cloudinary.",
        "error"
      );
    } finally {
      setUploadingResume(false);
    }
  };

  const validateForm = () => {
    const { name, hobbies, organization, designation, location } = formData;
    if (!name || !hobbies || !organization || !designation || !location) {
      Swal.fire("Error", "Please fill in all required fields.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true); // Start loading
    try {
      if (contentId) {
        await myPrivateAxios.put(`/content`, formData);
        try { localStorage.setItem("portfolio_content_cache", JSON.stringify(formData)); } catch {}
        Swal.fire("Success", "Content updated successfully!", "success");
      } else {
        const response = await myPrivateAxios.post("/content", formData);
        setContentId(response.data._id);
        try { localStorage.setItem("portfolio_content_cache", JSON.stringify(formData)); } catch {}
        Swal.fire("Success", "Content added successfully!", "success");
      }
    } catch (err) {
      Swal.fire("Error", "Error submitting data.", "error");
      console.error(err);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <Container className="manage-content-container py-4" data-aos="fade-up">
      <AdminNav />
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="mb-1 manage-content-title">Content & Media Management</h2>
          <p className="text-secondary small mb-0">
            Manage your personal portfolio details, Cloudinary media assets, and professional profile.
          </p>
        </div>
        <span className="badge px-3 py-2 manage-content-badge">
          Cloudinary Media Connected
        </span>
      </div>

      {isLoading ? (
        <Loader type="bars" />
      ) : (
        <Form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <FormGroup key={key} className="mb-4" data-aos="fade-up">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Label for={key} className="fw-semibold manage-field-label mb-0">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                </Label>
                {["imageLink", "resumeLink"].includes(key) && (
                  <span className="badge manage-content-badge small">Cloudinary CDN Managed</span>
                )}
              </div>

              {key === "introduction" ? (
                <JoditEditor
                  ref={editor}
                  value={formData.introduction}
                  config={config}
                  tabIndex={1}
                  onChange={handleContentChange}
                />
              ) : (
                <Input
                  type={["footerText"].includes(key) ? "textarea" : "text"}
                  name={key}
                  id={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  required={[
                    "name",
                    "hobbies",
                    "organization",
                    "designation",
                    "location",
                  ].includes(key)}
                  className="modern-input"
                />
              )}

              {/* Dedicated Cloudinary Media Box for Profile Photo */}
              {key === "imageLink" && (
                <Card className="mt-3 cloudinary-upload-card p-3">
                  <CardBody className="p-0">
                    <Row className="align-items-center g-3">
                      <Col xs="auto">
                        {formData.imageLink ? (
                          <img
                            src={formData.imageLink}
                            alt="Current Profile Preview"
                            style={{
                              width: "72px",
                              height: "72px",
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "2px solid #00f2fe",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "72px",
                              height: "72px",
                              borderRadius: "50%",
                              background: "#222",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px dashed #666",
                            }}
                          >
                            <span className="text-muted small">No photo</span>
                          </div>
                        )}
                      </Col>
                      <Col>
                        <h6 className="mb-1 cloudinary-upload-title">Upload New Profile Image to Cloudinary</h6>
                        <p className="text-secondary small mb-2">
                          Optimized on upload with automatic smart cropping and WebP/AVIF delivery.
                        </p>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfileFile(e.target.files[0])}
                            className="form-control-sm"
                            style={{ maxWidth: "280px" }}
                          />
                          <Button
                            color="info"
                            size="sm"
                            type="button"
                            onClick={handleUploadProfile}
                            disabled={uploadingProfile || !profileFile}
                          >
                            {uploadingProfile ? "Uploading..." : "Upload & Sync to Cloudinary"}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              )}

              {/* Dedicated Cloudinary Media Box for Resume PDF */}
              {key === "resumeLink" && (
                <Card className="mt-3 cloudinary-upload-card p-3">
                  <CardBody className="p-0">
                    <Row className="align-items-center g-3">
                      <Col>
                        <h6 className="mb-1 cloudinary-upload-title">Upload New Resume PDF to Cloudinary</h6>
                        <p className="text-secondary small mb-2">
                          Uploads your latest PDF resume to Cloudinary storage, automatically updating the Resume page viewer and download link.
                        </p>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <Input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={(e) => setResumeFile(e.target.files[0])}
                            className="form-control-sm"
                            style={{ maxWidth: "280px" }}
                          />
                          <Button
                            color="info"
                            size="sm"
                            type="button"
                            onClick={handleUploadResume}
                            disabled={uploadingResume || !resumeFile}
                          >
                            {uploadingResume ? "Uploading..." : "Upload Resume PDF to Cloudinary"}
                          </Button>
                          {formData.resumeLink && (
                            <a
                              href={formData.resumeLink}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-outline-light"
                            >
                              Preview Active Resume ↗
                            </a>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              )}
            </FormGroup>
          ))}
          <Button color="primary" type="submit" size="lg" className="px-5 mt-3" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Content Changes"}
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default ManageContent;
