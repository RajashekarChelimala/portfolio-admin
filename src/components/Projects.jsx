import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import Loader from "../ui-elements/Loader"; // Loader component
import { myPrivateAxios } from "../utils/api";
import externalLink from "../assets/external-link.svg";
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await myPrivateAxios.get("/projects");
      setProjects(response.data);
      setLoading(false); // Stop loader after data is fetched
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false); // Stop loader in case of an error
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return <Loader type="bars" />; // Show loader while fetching data
  }

  return (
    <Container className="projects-container">
      <h2 className="projects-heading">Projects</h2>
      <Row>
        {projects.map((project) => (
          <Col xs="12" sm="12" md="6" lg="6" key={project._id} data-aos="fade-up" data-aos-duration="1000">
            <Card className="project-card">
              <CardBody>
                <header>
                  <div className="project-title-container">
                    <CardTitle tag="h3" className="project-title">{project.projectName}</CardTitle>
                  </div>
                  <div className="project-links">
                    <a href={project.projectLink} target="_blank" rel="noreferrer">
                      <img src={externalLink} alt="Visit site" />
                    </a>
                  </div>
                </header>
                <CardText>
                  <h4 className="project-organization">{project.organizationName} | {new Date(project.fromDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}{" "}
                    -{" "}
                    {project.currentlyWorking
                      ? "Present"
                      : new Date(project.toDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                        })}</h4>
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
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Projects;
