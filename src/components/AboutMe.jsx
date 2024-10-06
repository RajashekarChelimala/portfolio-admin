import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
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
import myImg from "../assets/my-image.png";
import { myAxios } from "../utils/api";
import "./AboutMe.css";
import { useNavigate } from "react-router-dom";
import Loader from "../ui-elements/Loader";

export default function AboutMe() {
  const [content, setContent] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading initially to true

  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    fetchContentData();
    fetchSkillsData();
    fetchProjectsData();
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const fetchContentData = async () => {
    try {
      const response = await myAxios.get("/content");
      setContent(response.data);
      setLoading(false); // Stop loading after data is fetched
    } catch (error) {
      console.error("Error fetching content data:", error);
      setLoading(false); // Stop loading even on error
    }
  };

  const fetchSkillsData = async () => {
    try {
      const response = await myAxios.get("/skills");
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills data:", error);
    }
  };

  const fetchProjectsData = async () => {
    try {
      const response = await myAxios.get("/projects");
      setProjects(response.data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching projects data:", error);
    }
  };

  if (loading) {
    return <Loader type="bars" />; // Display loading message while data is being fetched
  }

  return (
    <Container className="about-me">
      <Row className="header-section align-items-center">
        <Col md="4">
          <img src={content.imageLink || myImg} alt="Profile" className="profile-image img-fluid" />
        </Col>
        <Col md="8">
          <h1>About Me</h1>
          <span dangerouslySetInnerHTML={{ __html: content.introduction }}></span>
        </Col>
      </Row>

      <Row className="details-section my-5">
        <Col>
          <h2>General Information</h2>
          <Row>
            <DetailCard title="Organization" value={content.organization} />
            <DetailCard title="Designation" value={content.designation} />
            <DetailCard title="Location" value={content.location} />
            <DetailCard title="Education" value={content.education} />
            <DetailCard title="Degree" value={content.degree} />
            <DetailCard title="Languages" value={content.languages} />
          </Row>
        </Col>
      </Row>

      <Row className="skills-section my-5">
        <Col>
          <h2>My Skillset</h2>
          <Row>
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="projects-section my-5">
        <Col>
          <h2>Projects</h2>
          <Row>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Row>
          <Row className="my-3">
            <Col>
              <Button
                color="primary"
                outline
                onClick={() => navigate("/projects")} // Navigate to the /projects route on click
              >
                View All Projects
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="hobbies-section my-5">
        <Col>
          <h2>Hobbies/Interests</h2>
          <Row>
            {content.hobbies.split(",").map((hobbie) => (
              <HobbieCard key={hobbie} hobbie={hobbie} />
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="social-links">
        <Col>
          <h2>Connect with me</h2>
          <div className="icons">
            {content.github && (
              <a href={content.github}>
                <FaGithub />
              </a>
            )}
            {content.linkedin && (
              <a href={content.linkedin}>
                <FaLinkedin />
              </a>
            )}
            {content.instagram && (
              <a href={content.instagram}>
                <FaInstagram />
              </a>
            )}
            {content.twitter && (
              <a href={content.twitter}>
                <FaTwitter />
              </a>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

// DetailCard Component using Card from Reactstrap
const DetailCard = ({ title, value }) => (
  <Col md="4" className="mb-3">
    <Card className="detail-card">
      <CardBody>
        <CardTitle tag="h5">{title}</CardTitle>
        <CardText>{value}</CardText>
      </CardBody>
    </Card>
  </Col>
);

// SkillCard Component
const SkillCard = ({ skill }) => (
  <Col md="2" className="mb-3">
    <Card className="skill-card-about">
      <CardBody className="text-center">
        <i className={`fa ${skill.icon}`} aria-hidden="true"></i>
        <CardText>{skill.name}</CardText>
      </CardBody>
    </Card>
  </Col>
);

// SkillCard Component
const HobbieCard = ({ hobbie }) => (
  <Col md="3" className="mb-3">
    <Card className="hobbie-card-about">
      <CardBody className="text-center">
        <CardText>{hobbie}</CardText>
      </CardBody>
    </Card>
  </Col>
);

// ProjectCard Component
const ProjectCard = ({ project }) => (
  <Col md="4" className="mb-3">
    <Card className="project-card-about">
      <CardBody>
        <CardTitle tag="h5">{project.projectName}</CardTitle>
        <CardText>{project.description}</CardText>
        <Button
          href={project.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          color="success"
        >
          View Project
        </Button>
      </CardBody>
    </Card>
  </Col>
);
