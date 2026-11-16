import React, { useState, useEffect, useId } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Alert,
  Nav,
  NavItem,
  NavLink,
  Badge,
} from "reactstrap";
import { myPrivateAxios, myAxios } from "../utils/api";
import { DEFAULT_POSTS } from "../utils/fallbackData";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { 
  AiOutlinePlus, 
  AiOutlineEdit, 
  AiOutlineDelete, 
  AiOutlineEye, 
  AiOutlineCloudUpload,
  AiOutlineCheckCircle,
  AiOutlineFileText,
  AiOutlineClose,
  AiOutlineSearch
} from "react-icons/ai";
import AdminNav from "./AdminNav";
import "./ManagePosts.css";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [formData, setFormData] = useState({
    headline: "",
    content: "",
    image: "",
    _id: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [coverFile, setCoverFile] = useState(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setFetching(true);
    try {
      const response = await myAxios.get("/posts");
      if (Array.isArray(response.data) && response.data.length > 0) {
        setPosts(response.data);
      } else {
        setPosts(DEFAULT_POSTS);
      }
    } catch (err) {
      console.warn("Using default articles catalog while backend connects:", err.message);
      setPosts(DEFAULT_POSTS);
    } finally {
      setFetching(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.headline.trim()) {
      errs.headline = "Article title is required.";
    } else if (formData.headline.trim().length > 150) {
      errs.headline = "Headline cannot exceed 150 characters.";
    }

    if (!formData.content.trim()) {
      errs.content = "Article body content is required.";
    } else if (formData.content.trim().length < 20) {
      errs.content = "Content must be at least 20 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Upload Cover Image directly to Cloudinary via backend API
  const handleUploadCover = async () => {
    if (!coverFile) {
      Swal.fire("Select Image", "Please select an image file first.", "info");
      return;
    }

    setUploadingCover(true);
    const data = new FormData();
    data.append("image", coverFile);

    try {
      const response = await myPrivateAxios.post("/media/upload/post", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.url) {
        setFormData((prev) => ({ ...prev, image: response.data.url }));
        setCoverFile(null);
        Swal.fire({
          icon: "success",
          title: "Cover Uploaded!",
          text: "Article cover image saved to Cloudinary CDN.",
          timer: 2000,
        });
      }
    } catch (err) {
      console.error("Cover upload error:", err);
      Swal.fire(
        "Upload Failed",
        err.response?.data?.message || "Failed to upload image to Cloudinary.",
        "error"
      );
    } finally {
      setUploadingCover(false);
    }
  };

  // Helper to insert quick formatting templates into body
  const insertTemplate = (prefix, suffix = "") => {
    const textarea = document.getElementById("article-content-input");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = formData.content;
    const selectedText = current.substring(start, end) || "text";

    const updated =
      current.substring(0, start) +
      prefix +
      selectedText +
      suffix +
      current.substring(end);

    setFormData((prev) => ({ ...prev, content: updated }));
    if (errors.content) setErrors((prev) => ({ ...prev, content: "" }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 50);
  };

  // Submit Article (Create or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      Swal.fire("Validation Error", "Please fill in all required fields.", "warning");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        headline: formData.headline.trim(),
        content: formData.content.trim(),
        image: formData.image.trim(),
      };

      if (formData._id) {
        payload._id = formData._id;
        const response = await myPrivateAxios.put("/posts", payload);
        Swal.fire({
          icon: "success",
          title: "Article Updated!",
          text: "Changes saved to database successfully.",
          timer: 2000,
        });
      } else {
        const response = await myPrivateAxios.post("/posts", payload);
        Swal.fire({
          icon: "success",
          title: "Article Published!",
          text: "New article is now live on your portfolio.",
          timer: 2000,
        });
      }

      // Reset form to clean state
      setFormData({ headline: "", content: "", image: "", _id: "" });
      setActiveTab("editor");
      fetchPosts();
    } catch (err) {
      console.error("Post save error:", err);
      Swal.fire(
        "Save Failed",
        err.response?.data?.error || err.response?.data?.message || "Failed to save article.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Populate form with existing post for editing
  const handleEdit = (post) => {
    setFormData({
      headline: post.headline || "",
      content: post.content || "",
      image: post.image || "",
      _id: post._id,
    });
    setErrors({});
    setActiveTab("editor");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setFormData({ headline: "", content: "", image: "", _id: "" });
    setErrors({});
  };

  // Delete Post with SweetAlert Confirmation
  const handleDelete = async (post) => {
    const result = await Swal.fire({
      title: "Delete Article?",
      text: `Are you sure you want to delete "${post.headline}"? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await myPrivateAxios.delete(`/posts/${post._id}`);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Article has been deleted.",
          timer: 2000,
        });
        if (formData._id === post._id) {
          handleCancelEdit();
        }
        fetchPosts();
      } catch (err) {
        console.error("Delete failed:", err);
        Swal.fire("Error", "Failed to delete article.", "error");
      }
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-posts-dashboard">
      <AdminNav />
      <div className="admin-page-header mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h1 className="admin-heading">Manage Articles & Publications</h1>
            <p className="admin-subheading">
              Publish technical writeups, enterprise case studies, and engineering architecture deep dives.
            </p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-dark border border-secondary text-info px-3 py-2">
              {posts.length} {posts.length === 1 ? "Article" : "Articles"} Published
            </span>
          </div>
        </div>
      </div>

      {/* Editor & Creation Card */}
      <Card className="glass-panel admin-card mb-5">
        <CardBody className="p-4 p-md-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2 border-bottom border-secondary pb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="admin-card-icon">
                {formData._id ? <AiOutlineEdit /> : <AiOutlinePlus />}
              </span>
              <h3 className="h4 text-light mb-0">
                {formData._id ? "Edit Article" : "Create New Article"}
              </h3>
              {formData._id && (
                <Badge color="warning" className="ms-2">
                  Editing Mode
                </Badge>
              )}
            </div>

            {formData._id && (
              <Button
                color="secondary"
                size="sm"
                outline
                onClick={handleCancelEdit}
                className="d-flex align-items-center gap-1"
              >
                <AiOutlineClose /> Cancel Editing
              </Button>
            )}
          </div>

          <Form onSubmit={handleSubmit} noValidate>
            {/* Title / Headline */}
            <FormGroup className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <Label for="headline" className="admin-field-label">
                  Article Title / Headline <span className="text-danger">*</span>
                </Label>
                <span className="text-muted small">
                  {formData.headline.length} / 150 chars
                </span>
              </div>
              <Input
                type="text"
                name="headline"
                id="headline"
                placeholder="e.g., Architecting Resilient Microservices with Spring Boot & Docker"
                value={formData.headline}
                onChange={handleInputChange}
                maxLength="150"
                className={`admin-text-input ${errors.headline ? "is-invalid" : ""}`}
              />
              {errors.headline && (
                <div className="invalid-feedback d-block">{errors.headline}</div>
              )}
            </FormGroup>

            {/* Cover Image URL & Cloudinary Uploader */}
            <FormGroup className="mb-4">
              <Label for="image" className="admin-field-label">
                Cover Image (Cloudinary CDN URL)
              </Label>
              <Input
                type="url"
                name="image"
                id="image"
                placeholder="https://res.cloudinary.com/... or upload a file below"
                value={formData.image}
                onChange={handleInputChange}
                className="admin-text-input mb-2"
              />

              {/* Cloudinary Upload Box */}
              <div className="cloudinary-upload-strip p-3 rounded d-flex align-items-center gap-3 flex-wrap">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Cover preview"
                    className="cover-thumb-preview"
                  />
                ) : (
                  <div className="cover-thumb-placeholder">
                    <AiOutlineFileText />
                  </div>
                )}
                <div className="flex-grow-1">
                  <div className="small text-light fw-semibold mb-1">
                    Upload New Cover Image to Cloudinary
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCoverFile(e.target.files[0])}
                      className="form-control-sm admin-file-input"
                      style={{ maxWidth: "260px" }}
                    />
                    <Button
                      color="info"
                      size="sm"
                      type="button"
                      onClick={handleUploadCover}
                      disabled={uploadingCover || !coverFile}
                      className="d-flex align-items-center gap-1"
                    >
                      <AiOutlineCloudUpload />
                      {uploadingCover ? "Uploading..." : "Upload to Cloudinary"}
                    </Button>
                  </div>
                </div>
              </div>
            </FormGroup>

            {/* Body Content Editor & Live Preview Tabs */}
            <FormGroup className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                <Label for="article-content-input" className="admin-field-label mb-0">
                  Article Body / Content <span className="text-danger">*</span>
                </Label>
                <Nav pills className="editor-nav-pills">
                  <NavItem>
                    <NavLink
                      className={activeTab === "editor" ? "active" : ""}
                      onClick={() => setActiveTab("editor")}
                      style={{ cursor: "pointer", padding: "0.25rem 0.75rem", fontSize: "0.85rem" }}
                    >
                      Write Content
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "preview" ? "active" : ""}
                      onClick={() => setActiveTab("preview")}
                      style={{ cursor: "pointer", padding: "0.25rem 0.75rem", fontSize: "0.85rem" }}
                    >
                      Live Preview
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>

              {activeTab === "editor" ? (
                <>
                  {/* Quick Format Tool Strip */}
                  <div className="editor-toolbar mb-2 d-flex gap-1 flex-wrap">
                    <Button
                      size="sm"
                      color="dark"
                      type="button"
                      onClick={() => insertTemplate("<h2>", "</h2>\n\n")}
                      title="Heading 2"
                    >
                      H2
                    </Button>
                    <Button
                      size="sm"
                      color="dark"
                      type="button"
                      onClick={() => insertTemplate("<h3>", "</h3>\n\n")}
                      title="Heading 3"
                    >
                      H3
                    </Button>
                    <Button
                      size="sm"
                      color="dark"
                      type="button"
                      onClick={() => insertTemplate("<p>", "</p>\n\n")}
                      title="Paragraph"
                    >
                      Paragraph
                    </Button>
                    <Button
                      size="sm"
                      color="dark"
                      type="button"
                      onClick={() => insertTemplate("<strong>", "</strong>")}
                      title="Bold"
                    >
                      Bold
                    </Button>
                    <Button
                      size="sm"
                      color="dark"
                      type="button"
                      onClick={() => insertTemplate("<ul>\n  <li>", "</li>\n</ul>\n\n")}
                      title="List"
                    >
                      Bullet List
                    </Button>
                    <Button
                      size="sm"
                      color="dark"
                      type="button"
                      onClick={() => insertTemplate("<pre><code>\n", "\n</code></pre>\n\n")}
                      title="Code Block"
                    >
                      Code Block
                    </Button>
                    <Button
                      size="sm"
                      color="dark"
                      type="button"
                      onClick={() => insertTemplate("<blockquote>", "</blockquote>\n\n")}
                      title="Quote"
                    >
                      Quote
                    </Button>
                  </div>

                  <Input
                    type="textarea"
                    name="content"
                    id="article-content-input"
                    rows="14"
                    placeholder="Write your article body here in HTML or rich text paragraphs (e.g. <p>In this article we explore...</p>)..."
                    value={formData.content}
                    onChange={handleInputChange}
                    className={`admin-text-input editor-textarea ${errors.content ? "is-invalid" : ""}`}
                  />
                  {errors.content && (
                    <div className="invalid-feedback d-block">{errors.content}</div>
                  )}
                  <small className="text-muted mt-1 d-block">
                    Supports HTML elements: &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;pre&gt;&lt;code&gt;, and &lt;strong&gt;.
                  </small>
                </>
              ) : (
                /* Live Preview Box */
                <div className="article-live-preview-box p-4 rounded bg-dark border border-secondary">
                  <h2 className="mb-3 text-light">{formData.headline || "Untitled Article"}</h2>
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="img-fluid rounded mb-4"
                      style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
                    />
                  )}
                  <div
                    className="preview-prose-body text-light"
                    dangerouslySetInnerHTML={{
                      __html: formData.content || "<p className='text-muted'>No content entered yet...</p>",
                    }}
                  />
                </div>
              )}
            </FormGroup>

            {/* Submit / Save Button */}
            <div className="d-flex align-items-center gap-3">
              <Button
                color="primary"
                size="lg"
                type="submit"
                disabled={loading}
                className="btn-modern-primary px-4"
              >
                {loading
                  ? "Saving Article..."
                  : formData._id
                  ? "Update Article"
                  : "Publish Article"}
              </Button>
              {formData._id && (
                <Button
                  color="secondary"
                  size="lg"
                  outline
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </CardBody>
      </Card>

      {/* Published Articles Management Section */}
      <div className="published-posts-section">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="h4 text-light mb-1">Published Articles Catalog</h2>
            <p className="text-secondary small mb-0">
              Manage existing live articles, edit content, and view engagement metrics.
            </p>
          </div>

          <div className="search-bar-wrap" style={{ maxWidth: "320px", width: "100%" }}>
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-text-input form-control-sm"
            />
          </div>
        </div>

        {fetching ? (
          <div className="text-center py-5">
            <span className="status-pill">
              <span className="pulse-dot" /> Loading Articles...
            </span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <Card className="glass-panel text-center py-5">
            <CardBody>
              <AiOutlineFileText className="display-4 text-muted mb-3" />
              <h5 className="text-light">No articles found</h5>
              <p className="text-secondary">
                {searchQuery ? "No articles match your search filter." : "You haven't created any articles yet."}
              </p>
            </CardBody>
          </Card>
        ) : (
          <Row className="g-4">
            {filteredPosts.map((post) => (
              <Col lg={4} md={6} key={post._id}>
                <Card className="glass-panel admin-post-card h-100">
                  {post.image ? (
                    <div className="admin-post-img-wrap">
                      <CardImg
                        top
                        src={post.image}
                        alt={post.headline}
                        className="admin-post-img"
                      />
                    </div>
                  ) : (
                    <div className="admin-post-no-img">
                      <AiOutlineFileText />
                    </div>
                  )}
                  <CardBody className="d-flex flex-column justify-content-between p-4 h-100">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="admin-post-date">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Recent"}
                        </span>
                        <Badge color="info" pill className="small">
                          {post.likes || 0} Likes
                        </Badge>
                      </div>
                      <CardTitle
                        tag="h5"
                        className="admin-post-title mb-2 post-title-truncate"
                        title={post.headline}
                      >
                        {post.headline}
                      </CardTitle>
                      <CardText
                        className="text-secondary small post-excerpt-truncate mb-3"
                        title={post.content ? post.content.replace(/<[^>]*>?/gm, "") : ""}
                      >
                        {post.content ? post.content.replace(/<[^>]*>?/gm, "").substring(0, 110) + "..." : "No content"}
                      </CardText>
                    </div>

                    <div className="admin-post-actions pt-3 border-top border-secondary mt-auto d-flex justify-content-between align-items-center gap-2 flex-wrap">
                      <div className="d-flex gap-2">
                        <Button
                          color="info"
                          size="sm"
                          outline
                          onClick={() => handleEdit(post)}
                          className="d-flex align-items-center gap-1 admin-action-btn"
                        >
                          <AiOutlineEdit /> Edit
                        </Button>
                        <Button
                          color="danger"
                          size="sm"
                          outline
                          onClick={() => handleDelete(post)}
                          className="d-flex align-items-center gap-1 admin-action-btn"
                        >
                          <AiOutlineDelete /> Delete
                        </Button>
                      </div>
                      <a
                        href={`/posts/${post._id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-view-btn"
                        title="View Public Article"
                      >
                        <AiOutlineEye className="me-1" /> View ↗
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default ManagePosts;
