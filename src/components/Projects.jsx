import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import { myAxios } from "../utils/api";
import { DEFAULT_PROJECTS } from "../utils/fallbackData";
import {
  AiOutlineFolder,
  AiOutlineCalendar,
  AiOutlineApartment
} from "react-icons/ai";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProjects = async () => {
      try {
        // Fix: Use public myAxios instead of myPrivateAxios for public portfolio visitors
        const response = await myAxios.get("/projects");
        if (Array.isArray(response.data) && response.data.length > 0) {
          setProjects(response.data);
        }
      } catch (error) {
        console.warn("Using default projects while backend wakes up:", error.message);
      }
    };

    fetchProjects();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return "";
    }
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Active") return project.currentlyWorking;
    const skillsList = project.skills?.map((s) => (typeof s === "object" ? s.name : s).toLowerCase()) || [];
    return skillsList.some((s) => s.includes(filter.toLowerCase()));
  });

  return (
    <div className="projects-page">
      <Container>
        {/* Header Section */}
        <section className="projects-header text-center my-4" data-aos="fade-up">
          <span className="status-pill mb-3">
            <span className="pulse-dot" /> Portfolio Showcase
          </span>
          <h1 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h1>
          <p className="section-subtitle">
            A curated showcase of production applications, distributed microservices, and interactive web tools.
          </p>

          {/* Filter Pills */}
          <div className="projects-filter-bar">
            {["All", "Active", "React", "Node", "Spring Boot"].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Project Cards Grid */}
        <Row className="g-4 my-3">
          {filteredProjects.map((project) => {
            const isLong = project.description && project.description.length > 140;
            const isExpanded = expanded[project._id];
            const displayDesc = isLong && !isExpanded
              ? `${project.description.substring(0, 140)}...`
              : project.description;

            return (
              <Col lg={6} md={12} key={project._id || project.projectName} data-aos="fade-up">
                <div className="project-modern-card glass-panel h-100">
                  {/* Top Bar with Folder Icon and External Links */}
                  <div className="project-card-topbar">
                    <div className="folder-icon-wrap">
                      <AiOutlineFolder />
                    </div>
                    <div className="project-action-links">
                      {project.projectLink && (
                        <a
                          href={project.projectLink}
                          target="_blank"
                          rel="noreferrer"
                          className="action-icon-link"
                          title="Visit Project"
                          aria-label="Visit Project"
                        >
                          <FiExternalLink />
                        </a>
                      )}
                      <a
                        href={project.projectLink?.includes("github.com") ? project.projectLink : "https://github.com/RajashekarChelimala"}
                        target="_blank"
                        rel="noreferrer"
                        className="action-icon-link"
                        title="View Source on GitHub"
                        aria-label="View Source on GitHub"
                      >
                        <FiGithub />
                      </a>
                    </div>
                  </div>

                  {/* Project Title & Metadata */}
                  <h3 className="project-card-title">{project.projectName}</h3>

                  <div className="project-meta-strip">
                    {project.organizationName && (
                      <span className="meta-badge">
                        <AiOutlineApartment className="me-1" /> {project.organizationName}
                      </span>
                    )}
                    <span className="meta-badge date">
                      <AiOutlineCalendar className="me-1" />
                      {formatDate(project.fromDate)} — {project.currentlyWorking ? "Present" : formatDate(project.toDate)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="project-card-desc">
                    {displayDesc}
                    {isLong && (
                      <button
                        className="read-more-btn"
                        onClick={() => toggleExpand(project._id)}
                      >
                        {isExpanded ? " Show less" : " Read more"}
                      </button>
                    )}
                  </p>

                  {/* Skills / Tech List */}
                  <div className="project-tech-footer mt-auto pt-3">
                    <div className="tech-tag-list">
                      {project.skills?.map((skill, index) => {
                        const skillName = typeof skill === "object" ? skill.name : skill;
                        return (
                          <span key={index} className="tech-tag-pill">
                            {skillName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Projects;
