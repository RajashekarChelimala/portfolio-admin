import React from "react";
import { Container, Row, Col } from "reactstrap";
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
            <h1 style={{ paddingBottom: 15 }}>Hi There!</h1>
            <h1 style={{ paddingBottom: 15 }}>
              I'M
              <strong> RAJASHEKAR CHELIMALA</strong>
            </h1>
            <div>
              <h1>
                <strong>
                  <Type />
                </strong>
              </h1>
            </div>
          </Col>
          <Col md={5} className="mt-5">
            <img
              src={myImg}
              alt="home pic"
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "450px", objectFit: "cover" }}
            />
          </Col>
        </Row>
      </section>
      <section className="home-content">
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I fell in love with programming when I'm 18. Since then I have worked with many 
              technologies and frameworks.
              <br />
              <br />I am fluent in classics like
              <i>
                <b> Java, Javascript and Python. </b>
              </i>
              <br />
              <br />
              My field of Interest's are building new &nbsp;
              <i>
                <b>Web Technologies and Products </b> and
                also in areas related to <b>Cloud Computing.</b>
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              with <b>Springboot</b> and
              <i>
                <b>
                  {" "}
                  Modern Javascript Library and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b> React.js</b>
              </i>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span>connect </span>with me
            </p>
            <ul>
              <li className="social-icons">
                <a
                  href="https://github.com/RajashekarChelimala"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/RChelimala"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/rajashekar-chelimala"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/prince_chelimala_?igsh=c3hoZzIwMHhpend1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default Home;
