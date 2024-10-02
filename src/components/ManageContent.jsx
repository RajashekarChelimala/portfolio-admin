import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";
import { myAxios, myPrivateAxios } from "../utils/api";
import AOS from "aos";
import Swal from "sweetalert2";
import "aos/dist/aos.css"; // AOS styles
import "./ManageContent.css";
import Loader from "../ui-elements/Loader";

const ManageContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    hobbies: "",
    organization: "",
    designation: "",
    location: "",
    degree: "",
    education: "",
    languages: "",
    footerText: "",
    introduction: "",
    imageLink: "",
    resumeLink: "",
    typeWriterText: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
  });

  const [contentId, setContentId] = useState(null); // Store the content ID
  const [isLoading, setIsLoading] = useState(false); // Loader state

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS animations
  }, []);

  // Fetch existing content data for editing
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await myAxios.get("/content");
        if (response.data) {
          const { _id, ...dataWithoutId } = response.data; // Destructure to exclude _id
          setFormData(dataWithoutId); // Set form data without _id
          setContentId(_id); // Store the _id separately
        }
        setIsLoading(false); // End loading
      } catch (err) {
        console.error("Error fetching content data:", err);
        setIsLoading(false); // End loading
        Swal.fire("Error", "Failed to load content.", "error");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        // If contentId exists, update the existing content
        await myPrivateAxios.put(`/content`, formData);
        Swal.fire("Success", "Content updated successfully!", "success");
      } else {
        // If no contentId, create new content
        const response = await myPrivateAxios.post("/content", formData);
        setContentId(response.data._id); // Set the new content ID
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
    <Container className="manage-content-container" data-aos="fade-up">
      <h2>Content Management</h2>
      {isLoading ? (
        <Loader type="bars" />
      ) : (
        <Form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <FormGroup key={key} data-aos="fade-up">
              <Label for={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
              </Label>
              {["introduction", "footerText"].includes(key) ? (
                <Input
                  type="textarea"
                  name={key}
                  id={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required={[
                    "name",
                    "hobbies",
                    "organization",
                    "designation",
                    "location",
                  ].includes(key)}
                />
              ) : (
                <Input
                  type="text"
                  name={key}
                  id={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required={[
                    "name",
                    "hobbies",
                    "organization",
                    "designation",
                    "location",
                  ].includes(key)}
                />
              )}
            </FormGroup>
          ))}
          <Button color="primary" type="submit" disabled={isLoading}>
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default ManageContent;
