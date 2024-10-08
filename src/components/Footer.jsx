import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import { myAxios } from "../utils/api";
import { ThemeContext } from "../context/ThemeProvider";

function Footer() {
  const [contentData, setContentData] = useState({});
  const { theme } = useContext(ThemeContext);
  const colorStyle = theme==='dark'?"#212529":"white";
  let date = new Date();
  let year = date.getFullYear();
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
