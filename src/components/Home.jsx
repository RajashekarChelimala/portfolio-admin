import React, { useEffect, useState } from "react";
import { AiFillGithub, AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { Col, Container, Row } from "reactstrap";
import Type from "../ui-elements/Type";
import { myAxios } from "../utils/api";
import "./Home.css";

// Extended loading messages array
const loadingMessages = [
  'Hey, Welcome!',
  'Hold tight, loading the magic...',
  'Just a moment, great things are coming...',
  'Fetching awesomeness for you!',
  'Banging the server doors...',
  'Pushing electrons through the wires...',
  'Grabbing the good stuff...',
  'Summoning the content...',
  'Almost there, stay tuned...',
  'Good things take time!',
  'Giving you the best experience...',
  'We are almost done...',
  'Setting things up for you...',
  'Here it comes!',
  'Final touches...'
];

const Home = () => {
  const [contentData, setContentData] = useState({
    name: "",
    hobbies: "",
    organization: "",
    designation: "",
    location: "",
    introduction: "",
    imageLink: "",
    typeWriterText: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
  });

  const [loadingMessagesQueue, setLoadingMessagesQueue] = useState(loadingMessages);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(loadingMessages[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const response = await myAxios.get("/content");
        setContentData(response.data);
        setIsLoading(false); // Stop the loading screen once data is fetched
      } catch (error) {
        console.error("Error fetching content data:", error);
      }
    };

    fetchContentData();
  }, []);

  // Effect for showing unique loading messages one after the other
  useEffect(() => {
    if (isLoading && loadingMessagesQueue.length > 0) {
      const intervalId = setInterval(() => {
        // Pick the next message in queue and update the state
        const nextMessage = loadingMessagesQueue.shift();
        setCurrentLoadingMessage(nextMessage);

        setLoadingMessagesQueue([...loadingMessagesQueue]); // Update queue without repeating messages
      }, 4000); // Change message every 3 seconds

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [isLoading, loadingMessagesQueue]);

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <Container className="loading-screen d-flex align-items-center justify-content-center text-white">
          <Row>
            <Col>
              <h2 className="text-center">{currentLoadingMessage}</h2>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <Container className="home-section text-white">
      {/* Section 1: Introduction */}
      <section className="home-content">
        <Row className="align-items-center">
          <Col xs={12} md={7} className="text-center text-md-start">
            <h1>Hi There!</h1>
            <h2>
              I'M <strong>{contentData.name.toUpperCase()}</strong>
            </h2>
            <h2 className="type-writer">
              <strong>
                <Type textArray={contentData.typeWriterText.split(",")} />
              </strong>
            </h2>
          </Col>
          <Col xs={12} md={5} className="mt-4">
            <img
              src={contentData.imageLink}
              alt="Profile pic"
              className="img-fluid rounded"
              loading="lazy"
            />
          </Col>
        </Row>
      </section>

      {/* Section 2: About Me */}
      <section className="home-content mt-4">
        {/* Section 3: Find Me On */}
        <Row className="social-media-section">
          <Col md={12} className="text-center">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span>connect</span> with me
            </p>
            <ul className="social-icons-list">
              {[{
                href: contentData.github,
                icon: <AiFillGithub />,
                label: "GitHub"
              },
              {
                href: contentData.twitter,
                icon: <AiOutlineTwitter />,
                label: "Twitter"
              },
              {
                href: contentData.linkedin,
                icon: <FaLinkedinIn />,
                label: "LinkedIn"
              },
              {
                href: contentData.instagram,
                icon: <AiFillInstagram />,
                label: "Instagram"
              }]
                .filter(({ href }) => href)
                .map(({ href, icon, label }, index) => (
                  <li key={index} className="home-social-icons">
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
