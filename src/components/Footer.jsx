import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineHeart
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { Col, Container, Row } from "reactstrap";
import { myAxios } from "../utils/api";
import { DEFAULT_CONTENT } from "../utils/fallbackData";
import "./Footer.css";

function Footer() {
  const [contentData, setContentData] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const response = await myAxios.get("/content");
        if (response.data && response.data.name) {
          setContentData((prev) => ({ ...prev, ...response.data }));
        }
      } catch (error) {
        // Fallback already set
      }
    };
    fetchContentData();
  }, []);

  return (
    <footer className="footer-wrapper">
      <Container>
        <div className="footer-top-strip py-4 border-bottom border-secondary">
          <Row className="align-items-center g-3">
            <Col md={6}>
              <div className="d-flex align-items-center gap-2">
                <span className="brand-logo footer-logo">
                  <span className="logo-accent">RC</span>
                  <span className="logo-dot">.</span>
                </span>
                <span className="footer-brand-title">{contentData.name || "Rajashekar Chelimala"}</span>
              </div>
              <p className="footer-tagline mt-2 mb-0">
                Crafting robust web architectures, scalable backend systems, and modern digital experiences.
              </p>
            </Col>

            <Col md={6} className="text-md-end">
              <div className="footer-social-links">
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
            </Col>
          </Row>
        </div>

        <div className="footer-bottom-strip py-3">
          <Row className="align-items-center text-center text-md-start">
            <Col md={6}>
              <p className="footer-copy mb-0">
                © {new Date().getFullYear()} {contentData.name}. Designed & Built with <AiOutlineHeart className="text-danger" />
              </p>
            </Col>
            <Col md={6} className="text-md-end mt-2 mt-md-0">
              <div className="footer-nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/posts">Articles</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
