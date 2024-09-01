import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <div className="footer-container">
      <Container>
        <Row className="footer-content">
          <Col md="4">
            <p>Designed and Developed by Rajashekar Chelimala</p>
          </Col>
          <Col md="4">
            <p>Copyright © {year}</p>
          </Col>
          <Col md="4">
            <ul>
              <li className="social-icons">
                <a
                  href="https://github.com/RajashekarChelimala"
                  target="_blank"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/RChelimala"
                  target="_blank"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/rajashekar-chelimala"
                  target="_blank"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/prince_chelimala_?igsh=c3hoZzIwMHhpend1"
                  target="_blank"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
