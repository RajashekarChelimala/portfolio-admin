import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  FormFeedback,
  CardFooter,
} from "reactstrap";
import Swal from "sweetalert2";
import Loader from "../ui-elements/Loader"; // Import the Loader component
import "./ManageProjects.css";
import { myPrivateAxios } from "../utils/api";
import externalLink from "../assets/external-link.svg";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    skills: [],
    fromDate: "",
    toDate: "",
    currentlyWorking: false,
    projectLink: "",
    organizationName: "",
  });
  const [errors, setErrors] = useState({});
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false); // State for loader
  const [expanded, setExpanded] = useState({});
  const [skillsOptions, setSkillsOptions] = useState([]); // State for skill options

  // Initialize AOS
  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchProjects = async () => {
    setLoading(true); // Show loader
    try {
      const response = await myPrivateAxios.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Fetch the list of available skills from the backend
  const fetchSkills = async () => {
    try {
      const response = await myPrivateAxios.get("/skills");
      const options = response.data.map((skill) => ({
        value: skill._id,
        label: skill.name,
      }));
      console.log("OPTIONS:", options);
      setSkillsOptions(options);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const handleSkillsChange = (selectedOptions) => {
    const selectedSkills = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData((prevState) => ({
      ...prevState,
      skills: selectedSkills,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "skills") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({
        ...formData,
        [name]: selectedOptions,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName)
      newErrors.projectName = "Project Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.skills) newErrors.skills = "Skills/Technologies are required";
    if (!formData.fromDate) newErrors.fromDate = "Start date is required";
    if (!formData.currentlyWorking && !formData.toDate)
      newErrors.toDate = "End date is required";
    if (!formData.projectLink)
      newErrors.projectLink = "Project link is required";
    if (!formData.organizationName)
      newErrors.organizationName = "Organization name is required";
    return newErrors;
  };

  const addOrUpdateProject = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true); // Show loader during save
      try {
        if (editingProject) {
          const response = await myPrivateAxios.put(`/projects`, {
            id: editingProject._id,
            ...formData,
          });
          setProjects(
            projects.map((proj) =>
              proj._id === editingProject._id ? response.data : proj
            )
          );
          Swal.fire("Success", "Project updated successfully", "success");
        } else {
          const response = await myPrivateAxios.post("/projects", formData);
          setProjects([...projects, response.data]);
          Swal.fire("Success", "Project added successfully", "success");
        }
        setFormData({
          projectName: "",
          description: "",
          skills: "",
          fromDate: "",
          toDate: "",
          currentlyWorking: false,
          projectLink: "",
          organizationName: "",
        });
        setEditingProject(null);
        setErrors({});
      } catch (error) {
        Swal.fire("Error", "Error saving project", "error");
      } finally {
        setLoading(false); // Hide loader after save
      }
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await myPrivateAxios.delete(`/projects/${id}`);
          fetchProjects();
          Swal.fire("Deleted!", "Project has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Error deleting project", "error");
        }
      }
    });
  };

  const handleEdit = (project) => {
    alert("EDIT:" + JSON.stringify(project));
    setFormData({
      ...project,
      fromDate: project.fromDate
        ? new Date(project.fromDate).toISOString().split("T")[0]
        : "",
      toDate: project.toDate
        ? new Date(project.toDate).toISOString().split("T")[0]
        : "",
      skills: project.skills.map((skill) => skill._id),
    });
    setEditingProject(project);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <Loader type="bars" />; // Show loader while fetching data
  }

  return (
    <Container className="manage-projects-container" data-aos="fade-up">
      <h2 className="modern-heading">Manage Projects</h2>
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <Form className="modern-form" noValidate>
            <FormGroup>
              <Label for="projectName" className="modern-label">
                Project Name
              </Label>
              <Input
                type="text"
                name="projectName"
                id="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter project name"
                invalid={!!errors.projectName}
                className="modern-input"
              />
              <FormFeedback>{errors.projectName}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="description" className="modern-label">
                Project Description
              </Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
                invalid={!!errors.description}
                className="modern-input"
              />
              <FormFeedback>{errors.description}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="skills" className="modern-label">
                Skills/Technologies Used
              </Label>
              <Select
                isMulti
                name="skills"
                value={skillsOptions?.filter((option) =>
                  formData.skills?.includes(option.value)
                )}
                onChange={handleSkillsChange}
                options={skillsOptions}
                className="basic-multi-select modern-input"
                classNamePrefix="custom-select"
              />
              {errors.skills && (
                <div className="invalid-feedback d-block">{errors.skills}</div>
              )}
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="fromDate" className="modern-label">
                    From Date
                  </Label>
                  <Input
                    type="date"
                    name="fromDate"
                    id="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    invalid={!!errors.fromDate}
                    className="modern-input"
                  />
                  <FormFeedback>{errors.fromDate}</FormFeedback>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="toDate" className="modern-label">
                    To Date
                  </Label>
                  <Input
                    type="date"
                    name="toDate"
                    id="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    disabled={formData.currentlyWorking}
                    invalid={!!errors.toDate}
                    className="modern-input"
                  />
                  <FormFeedback>{errors.toDate}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup check className="modern-checkbox">
              <Label check className="modern-label">
                <Input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={formData.currentlyWorking}
                  onChange={handleChange}
                />{" "}
                Currently working on this project
              </Label>
            </FormGroup>

            <FormGroup>
              <Label for="projectLink" className="modern-label">
                Project Link
              </Label>
              <Input
                type="text"
                name="projectLink"
                id="projectLink"
                value={formData.projectLink}
                onChange={handleChange}
                placeholder="Enter project link"
                invalid={!!errors.projectLink}
                className="modern-input"
              />
              <FormFeedback>{errors.projectLink}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="organizationName" className="modern-label">
                Organization Name or Personal Project
              </Label>
              <Input
                type="text"
                name="organizationName"
                id="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Enter organization name or 'Personal'"
                invalid={!!errors.organizationName}
                className="modern-input"
              />
              <FormFeedback>{errors.organizationName}</FormFeedback>
            </FormGroup>

            <Button
              color="primary"
              className="modern-button"
              onClick={addOrUpdateProject}
            >
              {editingProject ? "Update Project" : "Add Project"}
            </Button>
          </Form>
        </Col>
      </Row>
      <hr />

      <Row>
        {projects.map((project) => (
          <Col md={{ size: 6, offset: 0 }} key={project._id} data-aos="fade-up">
            <Card className="project-card">
              <CardBody>
                <header>
                  <div className="project-title-container">
                    <CardTitle tag="h3" className="project-title">
                      {project.projectName}
                    </CardTitle>
                  </div>
                  <div className="project-links">
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={externalLink} alt="Visit site" />
                    </a>
                  </div>
                </header>
                <CardText>
                  <h4 className="project-organization">
                    {project.organizationName} |{" "}
                    {new Date(project.fromDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}{" "}
                    -{" "}
                    {project.currentlyWorking
                      ? "Present"
                      : new Date(project.toDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}
                  </h4>
                  <p className="project-description">
                    {expanded[project._id]
                      ? project.description
                      : `${project.description.substring(0, 100)}...`}
                    {project.description.length > 100 && (
                      <Button
                        color="link"
                        onClick={() => toggleExpand(project._id)}
                      >
                        {expanded[project._id] ? "Show less" : "Show more"}
                      </Button>
                    )}
                  </p>
                </CardText>
                <footer>
                  <ul className="tech-list">
                    {project.skills?.map((skill, index) => (
                      <li key={index}>{skill.name}</li>
                    ))}
                  </ul>
                </footer>
              </CardBody>
              <CardFooter>
                <Button
                  color="warning"
                  className="modern-button me-2"
                  onClick={() => handleEdit(project)}
                >
                  Edit Project
                </Button>
                <Button
                  color="danger"
                  className="modern-button me-2"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete Project
                </Button>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ManageProjects;
