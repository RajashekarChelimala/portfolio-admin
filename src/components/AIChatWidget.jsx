import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineSend, AiOutlineRobot } from "react-icons/ai";
import { FaBrain } from "react-icons/fa";
import { myAxios } from "../utils/api";
import "./AIChatWidget.css";

const getSmartFallback = (query) => {
  const q = (query || "").toLowerCase();
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language")) {
    return "Rajashekar specializes in Java (Spring Boot, Spring Security, Hibernate), React.js, Node.js, SQL (PostgreSQL), MongoDB, Docker, and AWS. He's also actively building AI-integrated systems using Python FastAPI, Whisper STT, and LLMs!";
  }
  if (q.includes("project") || q.includes("work") || q.includes("built")) {
    return "Key projects include:\n• Telangana Police HRMS (100K+ users with Spring Boot & PostgreSQL)\n• Municipal Administration Financial Management System (160+ municipal offices)\n• AI-Powered Candidate Screening Platform (Whisper STT, Qwen LLM, FastAPI)\n• Comrade (Encrypted messaging app with Socket.io)\n• Tekavinya Market Screener (React equity analytics)";
  }
  if (q.includes("experience") || q.includes("cgg") || q.includes("job") || q.includes("career")) {
    return "Rajashekar has 3+ years of professional full-stack software engineering experience. He currently works as a Software Developer at Centre for Good Governance (CGG) in Hyderabad building high-scale government platforms, alongside freelance AI full-stack development.";
  }
  if (q.includes("hire") || q.includes("available") || q.includes("role") || q.includes("opportunity")) {
    return "Yes! Rajashekar is open to Full-Stack Software Engineering roles, AI-integrated product development, and select freelance engineering contracts. Head over to the Contact page to connect!";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("phone")) {
    return "You can reach Rajashekar directly at rajashekarchelimela1@gmail.com, call +91 9908545367, connect on LinkedIn at /in/rajashekar-chelimala, or use the interactive Contact form on this site!";
  }
  if (q.includes("ai") || q.includes("llm") || q.includes("genai") || q.includes("machine learning")) {
    return "Rajashekar is passionate about AI integration! He built an AI candidate screening platform using Python FastAPI microservices, Whisper STT, and Qwen LLMs for automated interviews, and is exploring Generative AI, RAG pipelines, and AI agent workflows.";
  }
  return "Rajashekar Chelimala is a Full Stack Developer & AI enthusiast with 3+ years of experience in Java, Spring Boot, React, AWS, and modern GenAI applications. Feel free to explore his Projects or reach out via the Contact page!";
};

const SUGGESTIONS = [
  "What are his skills?",
  "Tell me about his projects",
  "Is he available for hire?",
  "What's his experience?",
  "How to contact him?",
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! 👋 I'm Rajashekar's AI assistant. Ask me anything about his skills, experience, projects, or how to collaborate!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || isLoading) return;

    setInput("");
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      // Secure backend call — NO API keys are exposed to the browser client
      const response = await myAxios.post("/chat", { message: userText });
      const aiText = response.data?.reply || getSmartFallback(userText);
      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (err) {
      // Instant intelligent fallback if backend API is waking up or offline
      const fallbackText = getSmartFallback(userText);
      setMessages((prev) => [...prev, { role: "ai", text: fallbackText }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        className={`ai-chat-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open AI Assistant"
        title="Chat with Rajashekar's AI Assistant"
      >
        {isOpen ? <AiOutlineClose size={22} /> : <FaBrain size={22} />}
        {!isOpen && <span className="ai-trigger-badge">AI</span>}
      </button>

      {/* Chat Panel */}
      <div className={`ai-chat-panel glass-panel ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="ai-chat-header">
          <div className="ai-chat-header-left">
            <div className="ai-avatar-wrap">
              <AiOutlineRobot size={18} />
            </div>
            <div>
              <div className="ai-chat-title">RC Assistant</div>
              <div className="ai-chat-subtitle">
                <span className="ai-online-dot" /> Powered by Gemini AI
              </div>
            </div>
          </div>
          <button className="ai-close-btn" onClick={() => setIsOpen(false)}>
            <AiOutlineClose size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="ai-chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`ai-message ${msg.role === "user" ? "user" : "ai"}`}>
              {msg.role === "ai" && (
                <div className="ai-message-avatar">
                  <AiOutlineRobot size={14} />
                </div>
              )}
              <div className="ai-message-bubble">
                {msg.text.split("\n").map((line, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : "0.4rem 0 0 0" }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="ai-message ai">
              <div className="ai-message-avatar">
                <AiOutlineRobot size={14} />
              </div>
              <div className="ai-message-bubble ai-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {showSuggestions && messages.length === 1 && (
            <div className="ai-suggestions">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className="ai-suggestion-chip"
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="ai-chat-input-wrap">
          <input
            ref={inputRef}
            type="text"
            className="ai-chat-input"
            placeholder="Ask about skills, projects, availability..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            maxLength={300}
          />
          <button
            className="ai-send-btn"
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            title="Send"
          >
            <AiOutlineSend size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
