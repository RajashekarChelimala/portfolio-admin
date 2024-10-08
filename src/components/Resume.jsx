import React, { useEffect } from "react";
import "./Resume.css"; // Import custom styles
import { myAxios } from "../utils/api";
import { useState } from "react";

export default function Resume() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [resumeLink,setResumeLink] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myAxios.get("/content");
        if (response.data) {
          setResumeLink(response.data.resumeLink);
        }
      } catch (err) {
        console.error("Error fetching content data:", err);
      }
    };
    fetchData();
  }, []);

  const handleDownload = () => {
    window.location.href =
      resumeLink;
  };

  return (
    <div className="resume-container">
      <div className="resume-content">
        <h2 className="text-center">Resume</h2>
        <div className="resume-frame-container">
          <iframe
            src={`${resumeLink}/preview`}
            title="Resume"
            width="100%"
            height="100%"
            style={{ border: "5px solid" }}
            loading="lazy"
          ></iframe>
        </div>
        <div className="resume-download-button">
          <button onClick={handleDownload}>Download Resume</button>
        </div>
      </div>
    </div>
  );
}
