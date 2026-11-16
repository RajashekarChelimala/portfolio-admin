import React, { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import "./ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
        setScrollProgress(progress);
      }

      if (currentScroll > 280) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circular progress calculation
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="top-reading-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Scroll to Top Pill / Button */}
      <div className={`scroll-to-top-wrapper ${visible ? "is-visible" : ""}`}>
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          aria-label="Scroll back to top"
          title={`Scroll to top (${Math.round(scrollProgress)}%)`}
        >
          <svg className="scroll-progress-ring" width="48" height="48" viewBox="0 0 48 48">
            <circle
              className="progress-ring-bg"
              cx="24"
              cy="24"
              r={radius}
            />
            <circle
              className="progress-ring-fill"
              cx="24"
              cy="24"
              r={radius}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <span className="scroll-icon-wrap">
            <FiArrowUp />
          </span>
        </button>
      </div>
    </>
  );
};

export default ScrollToTopButton;
