import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Type from "../ui-elements/Type";
import myImg from "../assets/my-image.png";
import { AiFillGithub, AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { myAxios } from "../utils/api"; // Assuming `myAxios` is already configured for API requests
import "./Home.css";

const Home = () => {
  const [contentData, setContentData] = useState({
    name: "",
    hobbies: "",
    organization: "",
    designation: "",
    location: "",
    introduction: "",
    imageLink: myImg,
    typeWriterText: "", // This will now be a comma-separated string
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
  });

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
    <Container className="home-section text-white">
      {/* Section 1: Introduction */}
      <section className="home-content">
        <Row className="align-items-center">
          <Col md={7}>
            <h1 data-aos="fade-right">Hi There!</h1>
            <h1 data-aos="fade-right">
              I'M <strong>{contentData.name.toUpperCase()}</strong>
            </h1>
            <h1 data-aos="fade-right">
              <strong>
                {/* Pass the comma-separated string after splitting it into an array */}
                <Type textArray={contentData.typeWriterText.split(",")} />
              </strong>
            </h1>
          </Col>
          <Col md={4} className="mt-4" data-aos="fade-left">
            <img
              src={contentData.imageLink || myImg}
              alt="Profile pic"
              className="img-fluid rounded shadow-lg"
            />
          </Col>
        </Row>
      </section>

      {/* Section 2: About Me */}
      <section className="home-content">
        <Row>
          <Col md={8} className="home-about-description" data-aos="fade-up">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span>INTRODUCE</span> MYSELF
            </h1>
            <p className="home-about-body">
              {contentData.introduction}
              <br />
              <br />
              My hobbies include <strong>{contentData.hobbies}</strong>. I currently work at{" "}
              <strong>{contentData.organization}</strong> as a{" "}
              <strong>{contentData.designation}</strong>.
              <br />
              <br />
              I am passionate about web technologies like{" "}
              <strong>JavaScript, React, Spring Boot, and more!</strong>
            </p>
          </Col>
        </Row>

        {/* Section 3: Find Me On */}
        <Row>
          <Col md={12} className="text-center" data-aos="fade-left">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span>connect</span> with me
            </p>
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
      </section>
    </Container>
  );
};

export default Home;
