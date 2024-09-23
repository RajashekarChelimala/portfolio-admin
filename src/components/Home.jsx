import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Type from "../ui-elements/Type";
import myImg from "../assets/my-image.png";
import { AiFillGithub, AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import './Home.css';

const Home = () => {
  return (
    <Container className="home-section text-white">
      <section className="home-content">
        <Row className="align-items-center">
          <Col md={7}>
            <h1 data-aos="fade-right">Hi There!</h1>
            <h1 data-aos="fade-right">
              I'M <strong>RAJASHEKAR CHELIMALA</strong>
            </h1>
            <h1 data-aos="fade-right"><strong><Type /></strong></h1>
          </Col>
          <Col md={4} className="mt-4" data-aos="fade-left">
            <img src={myImg} alt="home pic" className="img-fluid rounded shadow-lg" />
          </Col>
        </Row>
      </section>
      <section className="home-content">
        <Row>
          <Col md={8} className="home-about-description" data-aos="fade-up">
            <h1 style={{ fontSize: "2.6em" }}>LET ME <span>INTRODUCE</span> MYSELF</h1>
            <p className="home-about-body">
              I fell in love with programming when I was 18. Since then, I have worked with many technologies and frameworks. 
              <br /><br />
              I am fluent in classics like <strong>Java, Javascript, and Python.</strong>
              <br /><br />
              My interests include building new <strong>Web Technologies and Products</strong> and areas related to <strong>Cloud Computing.</strong>
              <br /><br />
              I am passionate about developing products with <strong>Spring Boot</strong> and <strong>React.js</strong>.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center" data-aos="fade-left">
            <h1>FIND ME ON</h1>
            <p>Feel free to <span>connect</span> with me</p>
            <ul className="social-icons-list">
              {[
                { href: "https://github.com/RajashekarChelimala", icon: <AiFillGithub /> },
                { href: "https://twitter.com/RChelimala", icon: <AiOutlineTwitter /> },
                { href: "https://www.linkedin.com/in/rajashekar-chelimala", icon: <FaLinkedinIn /> },
                { href: "https://www.instagram.com/prince_chelimala_", icon: <AiFillInstagram /> }
              ].map(({ href, icon }, index) => (
                <li key={index} className="social-icons">
                  <a href={href} target="_blank" rel="noreferrer">{icon}</a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Home;
