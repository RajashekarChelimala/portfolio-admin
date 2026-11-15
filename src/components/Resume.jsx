import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { AiOutlineDownload, AiOutlineEye, AiOutlineFileText } from "react-icons/ai";
import { myAxios } from "../utils/api";
import { DEFAULT_CONTENT } from "../utils/fallbackData";
import "./Resume.css";

export default function Resume() {
  const [resumeLink, setResumeLink] = useState(DEFAULT_CONTENT.resumeLink);
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchData = async () => {
      try {
        const response = await myAxios.get("/content");
        if (response.data) {
          setContent((prev) => ({ ...prev, ...response.data }));
          if (response.data.resumeLink) {
            setResumeLink(response.data.resumeLink);
          }
        }
      } catch (err) {
        // Fallback already set
      }
    };
    fetchData();
  }, []);

  const handleDownload = () => {
    window.open(resumeLink, "_blank");
  };

  const previewUrl = resumeLink?.includes("/view")
    ? resumeLink.replace("/view", "/preview")
    : resumeLink;

  return (
    <div className="resume-page">
      <Container>
        {/* Header Section */}
        <section className="resume-header text-center my-4" data-aos="fade-up">
          <span className="status-pill mb-3">
            <span className="pulse-dot" /> Curriculum Vitae
          </span>
          <h1 className="section-title">
            Professional <span className="gradient-text">Resume</span>
          </h1>
          <p className="section-subtitle">
            Overview of my engineering background, technical qualifications, and career experience.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button onClick={handleDownload} className="btn-modern-primary">
              <AiOutlineDownload className="me-2" /> Download Resume PDF
            </button>
            <a
              href={resumeLink}
              target="_blank"
              rel="noreferrer"
              className="btn-modern-glass"
            >
              <AiOutlineEye className="me-2" /> Open in New Tab
            </a>
          </div>
        </section>

        {/* Quick Highlights Strip */}
        <Row className="g-3 my-4">
          <Col md={4}>
            <div className="glass-panel p-3 text-center">
              <span className="text-muted small text-uppercase fw-bold">Primary Focus</span>
              <div className="fw-bold mt-1">{content.designation || "Full Stack Software Engineer"}</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="glass-panel p-3 text-center">
              <span className="text-muted small text-uppercase fw-bold">Education</span>
              <div className="fw-bold mt-1">{content.degree || "B.Tech in Computer Science"}</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="glass-panel p-3 text-center">
              <span className="text-muted small text-uppercase fw-bold">Location</span>
              <div className="fw-bold mt-1">{content.location || "Hyderabad, India"}</div>
            </div>
          </Col>
        </Row>

        {/* Iframe Frame Container */}
        <div className="resume-frame-wrapper glass-panel my-4" data-aos="fade-up">
          {previewUrl ? (
            <iframe
              src={previewUrl}
              title="Rajashekar Chelimala Resume"
              className="resume-iframe"
              loading="lazy"
            />
          ) : (
            <div className="text-center py-5">
              <AiOutlineFileText className="display-4 text-muted mb-3" />
              <h4>Resume preview not configured.</h4>
              <p className="text-secondary">Please configure your Google Drive resume link in Admin Content.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
