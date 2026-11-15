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
  AiOutlineApartment,
  AiOutlineCheckCircle,
  AiOutlineThunderbolt
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
    if (filter === "GovTech") {
      const isGovLink = project.projectLink && project.projectLink.includes(".gov.in");
      const isCggOrg = project.organizationName && project.organizationName.toLowerCase().includes("good governance");
      return isGovLink || isCggOrg;
    }
    if (filter === "AI & GenAI") {
      const desc = (project.description || "").toLowerCase();
      const title = (project.projectName || "").toLowerCase();
      const skillsList = project.skills?.map((s) => (typeof s === "object" ? s.name : s).toLowerCase()) || [];
      return title.includes("ai") || desc.includes("ai") || desc.includes("llm") || desc.includes("vector") || skillsList.some(s => s.includes("ai") || s.includes("langchain"));
    }
    const skillsList = project.skills?.map((s) => (typeof s === "object" ? s.name : s).toLowerCase()) || [];
    const desc = (project.description || "").toLowerCase();
    const title = (project.projectName || "").toLowerCase();
    const target = filter.toLowerCase();
    return skillsList.some((s) => s.includes(target)) || desc.includes(target) || title.includes(target);
  });

  const getCleanDomain = (url) => {
    try {
      if (!url) return "";
      const parsed = new URL(url);
      return parsed.hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="projects-page">
      <Container>
        {/* Header Section */}
        <section className="projects-header text-center my-4" data-aos="fade-up">
          <span className="status-pill mb-3">
            <span className="pulse-dot" /> Production Engineering & Deployments
          </span>
          <h1 className="section-title">
            Featured <span className="gradient-text">Projects & Systems</span>
          </h1>
          <p className="section-subtitle">
            Enterprise GovTech platforms serving hundreds of thousands of users, secure financial workflows, and AI innovations.
          </p>

          {/* Filter Pills */}
          <div className="projects-filter-bar">
            {["All", "GovTech", "Spring Boot", "React", "AI & GenAI", "Active"].map((cat) => (
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
            const isLong = project.description && project.description.length > 170;
            const isExpanded = expanded[project._id || project.projectName];
            const displayDesc = isLong && !isExpanded
              ? `${project.description.substring(0, 170)}...`
              : project.description;

            const isGovProject = project.projectLink && project.projectLink.includes(".gov.in");
            const isAiProject = (project.projectName || "").toLowerCase().includes("ai") || (project.description || "").toLowerCase().includes("langchain");
            const domain = getCleanDomain(project.projectLink);

            return (
              <Col lg={6} md={12} key={project._id || project.projectName} data-aos="fade-up">
                <div className={`project-modern-card glass-panel h-100 ${isGovProject ? "gov-highlight" : ""}`}>
                  {/* Top Bar with Badges and External Links */}
                  <div className="project-card-topbar">
                    <div className="d-flex align-items-center gap-2">
                      <div className="folder-icon-wrap">
                        <AiOutlineFolder />
                      </div>
                      {isGovProject && (
                        <span className="badge-govtech">
                          <AiOutlineCheckCircle className="me-1" /> Live GovTech Portal
                        </span>
                      )}
                      {isAiProject && (
                        <span className="badge-ai">
                          <AiOutlineThunderbolt className="me-1" /> AI & GenAI
                        </span>
                      )}
                    </div>

                    <div className="project-action-links">
                      {project.projectLink && (
                        <a
                          href={project.projectLink}
                          target="_blank"
                          rel="noreferrer"
                          className="action-icon-link"
                          title={`Visit ${domain || "Portal"}`}
                          aria-label={`Visit ${domain || "Portal"}`}
                        >
                          <FiExternalLink />
                        </a>
                      )}
                      <a
                        href={project.projectLink?.includes("github.com") ? project.projectLink : "https://github.com/RajashekarChelimala"}
                        target="_blank"
                        rel="noreferrer"
                        className="action-icon-link"
                        title="View Source / GitHub Profile"
                        aria-label="View Source / GitHub Profile"
                      >
                        <FiGithub />
                      </a>
                    </div>
                  </div>

                  {/* Project Title & Metadata */}
                  <h3 className="project-card-title">{project.projectName}</h3>

                  <div className="project-meta-strip">
                    {project.organizationName && (
                      <span className="meta-badge org">
                        <AiOutlineApartment className="me-1" /> {project.organizationName}
                      </span>
                    )}
                    <span className="meta-badge date">
                      <AiOutlineCalendar className="me-1" />
                      {formatDate(project.fromDate)} — {project.currentlyWorking ? "Present" : formatDate(project.toDate)}
                    </span>
                    {project.currentlyWorking && (
                      <span className="meta-badge live-active">
                        ● Active Production
                      </span>
                    )}
                  </div>

                  {/* Direct Link Pill for Live Portals */}
                  {project.projectLink && (
                    <div className="project-live-portal-pill mb-3">
                      <span className="portal-label">Portal:</span>
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noreferrer"
                        className="portal-url"
                      >
                        {domain || project.projectLink} <FiExternalLink className="ms-1" />
                      </a>
                    </div>
                  )}

                  {/* Description */}
                  <p className="project-card-desc">
                    {displayDesc}
                    {isLong && (
                      <button
                        className="read-more-btn"
                        onClick={() => toggleExpand(project._id || project.projectName)}
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
