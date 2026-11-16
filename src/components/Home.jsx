import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineArrowRight,
  AiOutlineMail,
  AiOutlineDownload
} from "react-icons/ai";
import { FaLinkedinIn, FaReact, FaNodeJs, FaJava, FaDocker } from "react-icons/fa";
import { SiMongodb, SiTypescript } from "react-icons/si";
import { Col, Container, Row } from "reactstrap";
import Type from "../ui-elements/Type";
import AnimatedCounter from "../ui-elements/AnimatedCounter";
import { myAxios } from "../utils/api";
import { DEFAULT_CONTENT, DEFAULT_PROJECTS } from "../utils/fallbackData";
import "./Home.css";

const Home = () => {
  const [contentData, setContentData] = useState(() => {
    try {
      const cached = localStorage.getItem("portfolio_content_cache");
      return cached ? { ...DEFAULT_CONTENT, ...JSON.parse(cached) } : DEFAULT_CONTENT;
    } catch {
      return DEFAULT_CONTENT;
    }
  });
  const [featuredProjects, setFeaturedProjects] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Fetch live content in the background without blocking render
    const fetchLiveContent = async () => {
      try {
        const response = await myAxios.get("/content");
        if (response.data && response.data.name) {
          setContentData((prev) => ({ ...prev, ...response.data }));
          try {
            localStorage.setItem("portfolio_content_cache", JSON.stringify(response.data));
          } catch {}
        }
      } catch (error) {
        console.warn("Using default profile content while backend wakes up:", error.message);
      }
    };

    const fetchLiveProjects = async () => {
      try {
        const response = await myAxios.get("/projects");
        if (Array.isArray(response.data) && response.data.length > 0) {
          setFeaturedProjects(response.data.slice(0, 3));
        }
      } catch (error) {
        console.warn("Using default projects while backend wakes up:", error.message);
      }
    };

    fetchLiveContent();
    fetchLiveProjects();
  }, []);

  const typewriterStrings = contentData.typeWriterText
    ? contentData.typeWriterText.split(",")
    : [
        "Full Stack Software Engineer",
        "React & Modern Web Specialist",
        "Java & Spring Boot Engineer",
        "Cloud & Scalable Architecture"
      ];

  const profileAvatar = (contentData.imageLink && contentData.imageLink.startsWith("http"))
    ? contentData.imageLink
    : "https://res.cloudinary.com/ddsmuhr7k/image/upload/v1794806325/portfolio/profile/bw3ytpqw0vayl4478ab1.jpg";

  return (
    <div className="home-page">
      {/* Background Ambient Glows */}
      <div className="ambient-glow-cyan" style={{ top: "10%", left: "-10%" }} />
      <div className="ambient-glow-purple" style={{ top: "35%", right: "-10%" }} />

      <Container>
        {/* ================= HERO SECTION ================= */}
        <section className="hero-section">
          <Row className="align-items-center">
            <Col lg={7} md={12} className="hero-text-col">
              <div className="status-pill mb-3">
                <span className="pulse-dot" /> Available for Full-Stack Roles & Engineering
              </div>

              <h1 className="hero-title">
                Building <span className="gradient-text">Scalable Systems</span> & Modern Web Experiences
              </h1>

              <div className="hero-greeting">
                <span>Hi, I'm </span>
                <strong className="author-name">{contentData.name || "Rajashekar Chelimala"}</strong>
              </div>

              <div className="hero-typewriter">
                <span className="typewriter-prefix">I specialize in </span>
                <span className="typewriter-content">
                  <Type textArray={typewriterStrings} />
                </span>
              </div>

              <p className="hero-bio">
                {contentData.introduction
                  ? contentData.introduction.replace(/<[^>]*>?/gm, "")
                  : "Passionate Full Stack Software Engineer crafting resilient microservices, high-performance web applications, and intuitive digital experiences with MERN, Java Spring Boot, and Cloud Technologies."}
              </p>

              {/* Action Buttons */}
              <div className="hero-actions">
                <Link to="/projects" className="btn-modern-primary">
                  View Projects <AiOutlineArrowRight className="ms-2" />
                </Link>
                <Link to="/contact" className="btn-modern-glass">
                  <AiOutlineMail className="me-2" /> Get in Touch
                </Link>
                <a
                  href={contentData.resumeLink && !contentData.resumeLink.includes("sample-resume") ? contentData.resumeLink : "/RajashekarChelimala_Resume.pdf"}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-modern-ghost"
                  title="Download Resume"
                  download="RajashekarChelimala_Resume.pdf"
                >
                  <AiOutlineDownload className="me-1" /> Resume
                </a>
              </div>

              {/* Social Channels */}
              <div className="hero-social-strip">
                <span className="social-label">Connect:</span>
                <div className="social-pills">
                  {contentData.github && (
                    <a href={contentData.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="social-pill">
                      <AiFillGithub /> <span>GitHub</span>
                    </a>
                  )}
                  {contentData.linkedin && (
                    <a href={contentData.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-pill">
                      <FaLinkedinIn /> <span>LinkedIn</span>
                    </a>
                  )}
                  {contentData.twitter && (
                    <a href={contentData.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="social-pill">
                      <AiOutlineTwitter /> <span>Twitter</span>
                    </a>
                  )}
                  {contentData.instagram && (
                    <a href={contentData.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-pill">
                      <AiFillInstagram /> <span>Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            </Col>

            {/* Profile Avatar Card */}
            <Col lg={5} md={12} className="hero-avatar-col text-center mt-5 mt-lg-0">
              <div className="avatar-glass-card">
                <div className="avatar-frame">
                  <img
                    src={profileAvatar}
                    alt={contentData.name}
                    className="avatar-image"
                  />
                  <div className="avatar-overlay-glow" />
                </div>

                <div className="avatar-details">
                  <div className="avatar-status-pill mb-2">
                    <span className="pulse-dot" /> Enterprise Software Engineer
                  </div>
                  <h3 className="avatar-title">{contentData.name || "Rajashekar Chelimala"}</h3>
                  <p className="avatar-subtitle">{contentData.designation || "Java Full Stack Developer"}</p>
                  <p className="avatar-org text-secondary small mb-3">{contentData.organization || "Centre for Good Governance (CGG)"}</p>

                  {/* Clean, Integrated Tech Summary Strip */}
                  <div className="avatar-tech-strip">
                    <span className="tech-pill"><FaJava className="me-1 text-warning" /> Java</span>
                    <span className="tech-pill"><FaReact className="me-1 text-info" /> React</span>
                    <span className="tech-pill"><FaNodeJs className="me-1 text-success" /> Node.js</span>
                    <span className="tech-pill"><FaDocker className="me-1 text-primary" /> Docker</span>
                    <span className="tech-pill"><SiMongodb className="me-1 text-success" /> MongoDB</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* ================= BENTO STATS GRID ================= */}
        <section className="bento-stats-section my-5" data-aos="fade-up">
          <Row className="g-4">
            <Col md={3} sm={6}>
              <div className="bento-card">
                <div className="bento-metric gradient-text">3+</div>
                <div className="bento-label">Years of Experience</div>
                <p className="bento-desc">Building production-ready full stack web applications.</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="bento-card">
                <div className="bento-metric gradient-text">18+</div>
                <div className="bento-label">Technologies Mastered</div>
                <p className="bento-desc">MERN, Java Spring Boot, TypeScript, Docker, SQL & NoSQL.</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="bento-card">
                <div className="bento-metric gradient-text">7+</div>
                <div className="bento-label">Production Projects</div>
                <p className="bento-desc">GovTech, enterprise, AI-powered & freelance applications.</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="bento-card">
                <div className="bento-metric gradient-text">100K+</div>
                <div className="bento-label">Users Served</div>
                <p className="bento-desc">100K+ police personnel across 160+ municipal offices in Telangana.</p>
              </div>
            </Col>
          </Row>
        </section>

        {/* ================= TECH STACK STRIP ================= */}
        <section className="tech-strip-section my-5" data-aos="fade-up">
          <h2 className="section-title">Core <span className="gradient-text">Tech Arsenal</span></h2>
          <p className="section-subtitle">The modern frameworks, languages, and platforms I leverage daily</p>

          <div className="tech-chips-wrapper">
            <div className="tech-chip"><FaReact className="chip-icon react" /> React.js</div>
            <div className="tech-chip"><SiTypescript className="chip-icon ts" /> TypeScript</div>
            <div className="tech-chip"><FaNodeJs className="chip-icon node" /> Node.js</div>
            <div className="tech-chip"><FaJava className="chip-icon java" /> Java / Spring Boot</div>
            <div className="tech-chip"><SiMongodb className="chip-icon mongo" /> MongoDB</div>
            <div className="tech-chip"><FaDocker className="chip-icon docker" /> Docker & Cloud</div>
          </div>
        </section>

        {/* ================= FEATURED PROJECTS PREVIEW ================= */}
        <section className="featured-projects-section my-5" data-aos="fade-up">
          <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
            <div>
              <h2 className="section-title text-start mb-1">Featured <span className="gradient-text">Projects</span></h2>
              <p className="text-secondary mb-0">Handpicked production systems and engineering highlights</p>
            </div>
            <Link to="/projects" className="btn-modern-ghost">
              View All Projects <AiOutlineArrowRight className="ms-1" />
            </Link>
          </div>

          <Row className="g-4">
            {featuredProjects.map((project) => (
              <Col lg={4} md={6} key={project._id || project.projectName}>
                <div className="project-feature-card glass-panel h-100">
                  <div className="project-card-header">
                    <span className="org-badge">{project.organizationName || "Featured Build"}</span>
                    {project.currentlyWorking && <span className="active-badge">Active</span>}
                  </div>

                  <h3 className="project-name text-truncate-2" title={project.projectName}>
                    {project.projectName}
                  </h3>
                  <p className="project-summary text-truncate-3" title={project.description}>
                    {project.description && project.description.length > 130
                      ? `${project.description.substring(0, 130)}...`
                      : project.description}
                  </p>

                  <div className="project-tags">
                    {project.skills?.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="project-tag">
                        {typeof skill === "object" ? skill.name : skill}
                      </span>
                    ))}
                  </div>

                  <div className="project-footer mt-auto pt-3">
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn"
                    >
                      Explore Project <AiOutlineArrowRight className="ms-1" />
                    </a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* ================= AI & INNOVATION STRIP ================= */}
        <section className="ai-interest-section my-5">
          <div className="ai-strip-inner glass-panel">
            <div className="ai-strip-left">
              <span className="ai-strip-badge">🤖 Currently Exploring</span>
              <h3 className="ai-strip-title">
                AI-Integrated Development & <span className="gradient-text">Generative AI</span>
              </h3>
              <p className="ai-strip-desc">
                Building AI-augmented systems using LLMs, Whisper speech-to-text, and Python FastAPI microservices.
                Passionate about integrating Generative AI, RAG pipelines, and voice agents into enterprise workflows.
              </p>
              <div className="ai-tags-wrap">
                <span className="ai-tag">Gemini API</span>
                <span className="ai-tag">LLM Integration</span>
                <span className="ai-tag">Whisper STT</span>
                <span className="ai-tag">FastAPI + RAG</span>
                <span className="ai-tag">AI Agents</span>
              </div>
            </div>
            <div className="ai-strip-right">
              <div className="ai-icon-glow">🧠</div>
            </div>
          </div>
        </section>

        {/* ================= GITHUB STATS ================= */}
        <section className="github-stats-section my-5">
          <h2 className="section-title text-center">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="section-subtitle text-center">Open source contributions and coding consistency</p>
          <div className="github-stats-grid">
            <img
              src="https://github-readme-stats.vercel.app/api?username=RajashekarChelimala&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=38bdf8&text_color=94a3b8&icon_color=818cf8"
              alt="GitHub Stats"
              className="github-stat-card"
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=RajashekarChelimala&theme=tokyonight&hide_border=true&background=00000000&ring=38bdf8&fire=c084fc&currStreakLabel=38bdf8"
              alt="GitHub Streak"
              className="github-stat-card"
              loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        </section>

        {/* ================= CALL TO ACTION STRIP (Final Climax Before Footer) ================= */}
        <section className="cta-banner my-5">
          <div className="cta-inner">
            <h2 className="cta-title">Have a project in mind or looking for a developer?</h2>
            <p className="cta-subtitle">
              Let's connect and build something extraordinary together — from enterprise systems to AI-powered applications.
            </p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-modern-primary">
                Start a Conversation <AiOutlineArrowRight className="ms-2" />
              </Link>
              <Link to="/about" className="btn-modern-glass">
                Learn More About Me
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Home;
