import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import {
  AiOutlineArrowRight,
  AiOutlineBook,
  AiOutlineGlobal,
  AiOutlineAim,
  AiOutlineLaptop,
  AiOutlineCompass,
  AiOutlineCalendar,
  AiOutlineEnvironment,
  AiOutlineCheckCircle
} from "react-icons/ai";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import profileAvatarImg from "../assets/profile-avatar.jpg";
import { myAxios } from "../utils/api";
import { DEFAULT_CONTENT, DEFAULT_SKILLS, DEFAULT_PROJECTS, DEFAULT_EXPERIENCES } from "../utils/fallbackData";
import "./AboutMe.css";

export default function AboutMe() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const loadData = async () => {
      try {
        const contentRes = await myAxios.get("/content");
        if (contentRes.data && contentRes.data.name) {
          setContent((prev) => ({ ...prev, ...contentRes.data }));
        }
      } catch (err) {
        console.warn("Using default content in AboutMe:", err.message);
      }

      try {
        const skillsRes = await myAxios.get("/skills");
        if (Array.isArray(skillsRes.data) && skillsRes.data.length > 0) {
          setSkills(skillsRes.data);
        }
      } catch (err) {
        console.warn("Using default skills in AboutMe:", err.message);
      }

      try {
        const projRes = await myAxios.get("/projects");
        if (Array.isArray(projRes.data) && projRes.data.length > 0) {
          setProjects(projRes.data.slice(0, 3));
        }
      } catch (err) {
        console.warn("Using default projects in AboutMe:", err.message);
      } finally {
        setTimeout(() => {
          if (typeof AOS !== "undefined") {
            AOS.refresh();
          }
        }, 100);
      }
    };

    loadData();
  }, []);

  const profileImg = (content?.imageLink && content.imageLink.startsWith("http"))
    ? content.imageLink
    : profileAvatarImg;

  // Extract unique skill types
  const categories = ["All", ...Array.from(new Set(skills.map((s) => s.type || "Other")))];

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.type === activeCategory);

  const hobbiesList = content?.hobbies
    ? content.hobbies.split(",").map((h) => h.trim())
    : [
        "Enterprise Architecture",
        "Distributed Microservices",
        "Open Source",
        "AI & Voice Agents",
        "Performance Optimization"
      ];

  return (
    <div className="about-me-page">
      <Container>
        {/* ================= HEADER SECTION ================= */}
        <section className="about-header text-center my-4" data-aos="fade-up">
          <span className="status-pill mb-3">
            <span className="pulse-dot" /> Engineering Journey
          </span>
          <h1 className="section-title">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="section-subtitle">
            Java Full Stack Developer specializing in large-scale enterprise applications, high-throughput microservices, and modern web architectures.
          </p>
        </section>

        {/* ================= BENTO PROFILE GRID ================= */}
        <section className="about-bento-grid my-5">
          <Row className="g-4">
            {/* Left Card: Profile & Core Bio */}
            <Col lg={7} md={12}>
              <div className="about-glass-card h-100">
                <div className="about-intro-wrapper">
                  <div className="about-avatar-ring">
                    <img src={profileImg} alt={content?.name || "Rajashekar Chelimala"} className="about-avatar-img" />
                  </div>
                  <div>
                    <h2 className="about-name">{content?.name || "Rajashekar Chelimala"}</h2>
                    <p className="about-role-tag">{content?.designation || "Java Full Stack Developer"}</p>
                    <p className="about-location">📍 {content?.location || "Hyderabad, Telangana"}</p>
                  </div>
                </div>

                <div className="about-story mt-4">
                  <p>
                    I am a <strong>Java Full Stack Developer with 3+ years of professional experience</strong> engineering
                    mission-critical enterprise platforms and financial management software across the Telangana Government.
                  </p>
                  <p>
                    My core expertise spans <strong>Java, Spring Boot, Spring MVC, Hibernate, React.js, PostgreSQL, and AWS</strong>.
                    I specialize in designing transactional workflows, multi-level approval hierarchies, role-based access control (RBAC),
                    and scalable REST API microservices.
                  </p>
                  <p>
                    Key achievements include contributing to centralized financial platforms serving <strong>160+ municipal offices</strong>,
                    modernizing enterprise HR systems supporting <strong>100,000+ users</strong>, and architecting AI-powered microservices
                    using Node.js, Python FastAPI, whisper.cpp, and Qwen LLMs.
                  </p>
                </div>
              </div>
            </Col>

            {/* Right Card: Quick Facts & Credentials */}
            <Col lg={5} md={12}>
              <div className="about-glass-card h-100">
                <h3 className="card-heading mb-4">Professional Snapshot</h3>

                <div className="snapshot-list">
                  <div className="snapshot-item">
                    <div className="snapshot-icon"><AiOutlineLaptop /></div>
                    <div>
                      <div className="snapshot-label">Role & Focus</div>
                      <div className="snapshot-val">{content?.designation || "Java Full Stack Developer"}</div>
                    </div>
                  </div>

                  <div className="snapshot-item">
                    <div className="snapshot-icon"><AiOutlineCompass /></div>
                    <div>
                      <div className="snapshot-label">Current Organization</div>
                      <div className="snapshot-val">{content?.organization || "Centre for Good Governance (CGG)"}</div>
                    </div>
                  </div>

                  <div className="snapshot-item">
                    <div className="snapshot-icon"><FaGraduationCap /></div>
                    <div>
                      <div className="snapshot-label">Degree</div>
                      <div className="snapshot-val">{content?.degree || "B.Tech in Computer Science Engineering (CGPA: 8.4 / 10.0)"}</div>
                    </div>
                  </div>

                  <div className="snapshot-item">
                    <div className="snapshot-icon"><AiOutlineBook /></div>
                    <div>
                      <div className="snapshot-label">Education</div>
                      <div className="snapshot-val">{content?.education || "Rajiv Gandhi University of Knowledge Technologies (RGUKT), Basar"}</div>
                    </div>
                  </div>

                  <div className="snapshot-item">
                    <div className="snapshot-icon"><AiOutlineGlobal /></div>
                    <div>
                      <div className="snapshot-label">Languages</div>
                      <div className="snapshot-val">{content?.languages || "English, Telugu, Hindi"}</div>
                    </div>
                  </div>
                </div>

                {/* Hobbies / Interests */}
                <div className="mt-4 pt-3 border-top border-secondary">
                  <div className="snapshot-label mb-2"><AiOutlineAim className="me-1" /> Core Disciplines</div>
                  <div className="d-flex flex-wrap gap-2">
                    {hobbiesList.map((hobby, i) => (
                      <span key={i} className="hobby-chip">{hobby}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* ================= WORK EXPERIENCE / CAREER TIMELINE ================= */}
        <section className="career-experience-section my-5" data-aos="fade-up">
          <div className="text-center mb-5">
            <span className="status-pill mb-3">
              <span className="pulse-dot" /> Career Track
            </span>
            <h2 className="section-title">Professional <span className="gradient-text">Experience</span></h2>
            <p className="section-subtitle">Demonstrated impact across government, enterprise, and distributed systems</p>
          </div>

          <div className="timeline-container">
            {DEFAULT_EXPERIENCES.map((exp, index) => (
              <div key={index} className="timeline-card glass-panel" data-aos="fade-up" data-aos-delay={index * 150}>
                <div className="timeline-header">
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <div className="timeline-badge-icon">
                      <FaBriefcase />
                    </div>
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <h4 className="timeline-org gradient-text">{exp.organization}</h4>
                    </div>
                  </div>

                  <div className="timeline-meta-strip">
                    <span className="timeline-meta-pill">
                      <AiOutlineCalendar className="me-1" /> {exp.period}
                    </span>
                    <span className="timeline-meta-pill">
                      <AiOutlineEnvironment className="me-1" /> {exp.location}
                    </span>
                    <span className="timeline-type-pill">{exp.type}</span>
                  </div>
                </div>

                <ul className="timeline-bullets">
                  {exp.highlights.map((point, pIndex) => (
                    <li key={pIndex} className="timeline-bullet-item">
                      <AiOutlineCheckCircle className="bullet-check-icon" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SKILL MATRIX ================= */}
        <section className="skills-matrix-section my-5" data-aos="fade-up">
          <div className="text-center mb-4">
            <h2 className="section-title">Technical <span className="gradient-text">Skillset</span></h2>
            <p className="section-subtitle">Comprehensive overview of languages, frameworks, and architecture toolkits</p>

            {/* Category Filter Pills */}
            <div className="category-filter-strip">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Row className="g-4">
            {filteredSkills.map((skill) => {
              const proficiencyVal = skill.proficiency || 90;
              return (
                <Col lg={4} md={6} sm={12} key={skill._id || skill.name}>
                  <div className="skill-matrix-card glass-panel">
                    <div className="skill-card-top">
                      <div className="skill-name-group">
                        <h4 className="skill-title">{skill.name}</h4>
                        <span className="skill-type-tag">{skill.type}</span>
                      </div>
                      <span className="skill-exp">{skill.experience || "3+ Yrs"}</span>
                    </div>

                    <div className="skill-meter-wrap mt-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="skill-meter-label">Proficiency</span>
                        <span className="skill-meter-percent">{proficiencyVal}%</span>
                      </div>
                      <div className="skill-meter-bar">
                        <div
                          className="skill-meter-fill"
                          style={{ width: `${proficiencyVal}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </section>

        {/* ================= KEY PROJECTS HIGHLIGHT ================= */}
        <section className="recent-highlights my-5" data-aos="fade-up">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h2 className="section-title text-start mb-1">Key <span className="gradient-text">Projects</span></h2>
              <p className="text-secondary mb-0">Engineered systems reflecting these enterprise capabilities</p>
            </div>
            <Link to="/projects" className="btn-modern-primary">
              All Projects <AiOutlineArrowRight className="ms-1" />
            </Link>
          </div>

          <Row className="g-4">
            {projects.slice(0, 3).map((proj) => (
              <Col md={4} key={proj._id || proj.projectName}>
                <div className="glass-panel p-4 h-100 d-flex flex-column">
                  <span className="org-badge mb-2 d-inline-block">{proj.organizationName}</span>
                  <h4 className="fw-bold mb-2">{proj.projectName}</h4>
                  <p className="text-secondary small mb-3">
                    {proj.description?.substring(0, 120)}...
                  </p>
                  <a
                    href={proj.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link-btn mt-auto"
                  >
                    View Project <AiOutlineArrowRight className="ms-1" />
                  </a>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </div>
  );
}
