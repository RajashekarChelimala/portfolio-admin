import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineSend, AiOutlineRobot } from "react-icons/ai";
import { FaBrain } from "react-icons/fa";
import { myAxios } from "../utils/api";
import { queryRAG } from "../utils/ragEngine";
import "./AIChatWidget.css";

const renderFormattedContent = (text) => {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    if (!line.trim()) {
      return <div key={lineIdx} style={{ height: "0.35rem" }} />;
    }

    const parts = [];
    const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith("**") && token.endsWith("**")) {
        parts.push(
          <strong key={`${lineIdx}-${match.index}`} className="ai-bold-text">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith("[") && token.includes("](")) {
        const title = token.substring(1, token.indexOf("]("));
        const url = token.substring(token.indexOf("](") + 2, token.length - 1);
        parts.push(
          <a
            key={`${lineIdx}-${match.index}`}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="ai-chat-link"
          >
            {title}
          </a>
        );
      } else if (token.startsWith("http")) {
        parts.push(
          <a
            key={`${lineIdx}-${match.index}`}
            href={token}
            target="_blank"
            rel="noreferrer"
            className="ai-chat-link"
          >
            {token}
          </a>
        );
      }
      lastIndex = match.index + token.length;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    const isBullet = line.trim().startsWith("•") || line.trim().startsWith("* ") || line.trim().startsWith("- ");

    return (
      <p
        key={lineIdx}
        style={{
          margin: lineIdx === 0 ? 0 : "0.35rem 0 0 0",
          paddingLeft: isBullet ? "0.6rem" : 0,
          lineHeight: 1.55,
        }}
      >
        {parts.length > 0 ? parts : line}
      </p>
    );
  });
};

const SUGGESTIONS = [
  "What is his surname?",
  "What is his phone number?",
  "What are his skills?",
  "Tell me about his projects",
  "Where did he study?",
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
      const aiText = response.data?.reply || queryRAG(userText);
      setMessages((prev) => [...prev, { role: "ai", text: aiText }]);
    } catch (err) {
      // Instant intelligent fallback via RAG engine if backend API is waking up or offline
      const fallbackText = queryRAG(userText);
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
                {renderFormattedContent(msg.text)}
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
