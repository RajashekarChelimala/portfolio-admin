import React, { useContext, useEffect, useState } from "react";
import {
  AiFillGithub,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { Col, Container, Row } from "reactstrap";
import { ThemeContext } from "../context/ThemeProvider";
import { myAxios } from "../utils/api";
import "./Footer.css";

function Footer() {
  const [contentData, setContentData] = useState({});
  const { theme } = useContext(ThemeContext);
  const colorStyle = theme==='dark'?"#212529":"white";
  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const response = await myAxios.get("/content");
        setContentData(response.data);
      } catch (error) {
        console.error("Error fetching content data:", error);
      }
    };

    fetchContentData();
  }, []);
  return (
    <div className="footer-container" style={{backgroundColor:`${colorStyle}`}}>
      <Container>
        <Row className="footer-content">
          <Col md="8">
            <p>{contentData.footerText}</p>
          </Col>
          <Col md="4">
          <ul className="social-icons-list">
              {[
                { href: contentData.github, icon: <AiFillGithub />, label: "GitHub" },
                { href: contentData.twitter, icon: <AiOutlineTwitter />, label: "Twitter" },
                { href: contentData.linkedin, icon: <FaLinkedinIn />, label: "LinkedIn" },
                { href: contentData.instagram, icon: <AiFillInstagram />, label: "Instagram" },
              ]
                .filter(({ href }) => href)
                .map(({ href, icon, label }, index) => (
                  <li key={index} className="social-icons">
                    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                      {icon}
                    </a>
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
