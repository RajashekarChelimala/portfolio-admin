import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineEdit,
  AiOutlineFileText,
  AiOutlineProject,
  AiOutlineThunderbolt,
  AiOutlineMail,
  AiOutlineCloud,
  AiOutlineDatabase,
  AiOutlineArrowRight,
  AiOutlineEye,
  AiOutlineDelete,
  AiOutlineReload,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsStars, BsPeople, BsRobot, BsChatSquareDots, BsLaptop, BsPhone } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Container,
  Row,
  Badge,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Progress,
} from "reactstrap";
import { myPrivateAxios } from "../utils/api";
import AdminNav from "./AdminNav";
import { showSuccessToast, showErrorToast } from "../ui-elements/toastConfig";
import { sweetAlert } from "../ui-elements/sweetAlert";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState({
    visitors: {
      totalVisits: 0,
      uniqueVisitors: 0,
      todayVisits: 0,
      todayUniqueVisitors: 0,
      recentVisits: [],
      topPages: [],
      deviceBreakdown: [],
    },
    chatLogs: {
      totalQuestions: 0,
      todayQuestions: 0,
      recent: [],
    },
    cms: {
      projects: 0,
      posts: 0,
      skills: 0,
      contacts: 0,
      likes: 0,
      engagements: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [engineFilter, setEngineFilter] = useState("all");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      const res = await myPrivateAxios.get("/analytics/overview");
      if (res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.warn("Analytics fetch error, fallback to initial state:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDeleteChat = async (id, e) => {
    e.stopPropagation();
    const confirmed = await sweetAlert({
      title: "Delete Chat Log?",
      text: "Are you sure you want to remove this Q&A history entry?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (confirmed.isConfirmed) {
      try {
        await myPrivateAxios.delete(`/analytics/chat-logs/${id}`);
        showSuccessToast("Log entry deleted.");
        setData((prev) => ({
          ...prev,
          chatLogs: {
            ...prev.chatLogs,
            totalQuestions: Math.max(0, prev.chatLogs.totalQuestions - 1),
            recent: prev.chatLogs.recent.filter((item) => item._id !== id),
          },
        }));
      } catch (err) {
        showErrorToast("Failed to delete log entry.");
      }
    }
  };

  const handleClearAllChats = async () => {
    const confirmed = await sweetAlert({
      title: "Clear All Jerry Chat History?",
      text: "This will permanently remove all logged questions and answers. Continue?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear all",
      cancelButtonText: "Cancel",
    });

    if (confirmed.isConfirmed) {
      try {
        await myPrivateAxios.delete("/analytics/chat-logs");
        showSuccessToast("All Jerry chat history cleared.");
        setData((prev) => ({
          ...prev,
          chatLogs: {
            ...prev.chatLogs,
            totalQuestions: 0,
            todayQuestions: 0,
            recent: [],
          },
        }));
      } catch (err) {
        showErrorToast("Failed to clear chat logs.");
      }
    }
  };

  const openChatModal = (chat) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
  };

  // Filter chat logs based on user search and engine filter
  const filteredChatLogs = (data.chatLogs.recent || []).filter((log) => {
    const matchesSearch =
      !searchTerm.trim() ||
      (log.question && log.question.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.answer && log.answer.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesEngine =
      engineFilter === "all" ||
      (engineFilter === "gemini" && log.source === "gemini") ||
      (engineFilter === "rag" && log.source !== "gemini");

    return matchesSearch && matchesEngine;
  });

  const managementModules = [
    {
      path: "/manage-content",
      icon: <AiOutlineEdit />,
      title: "Content & Media",
      desc: "Update personal profile, biography, and sync Cloudinary avatar & resume PDF.",
      badge: "Core Profile",
      color: "info",
    },
    {
      path: "/manage-projects",
      icon: <AiOutlineProject />,
      title: "Projects Showcase",
      desc: "Manage GovTech and enterprise platform entries, stack tags, and links.",
      badge: `${data.cms.projects} Active`,
      color: "primary",
    },
    {
      path: "/manage-posts",
      icon: <AiOutlineFileText />,
      title: "Articles & CMS",
      desc: "Write technical blogs, upload Cloudinary covers, and format body articles.",
      badge: `${data.cms.posts} Published`,
      color: "success",
    },
    {
      path: "/manage-skills",
      icon: <AiOutlineThunderbolt />,
      title: "Skills & Tech",
      desc: "Inline edit skill matrix, categories, and priority ordering in DataGrid.",
      badge: `${data.cms.skills} Technologies`,
      color: "warning",
    },
    {
      path: "/contact-requests",
      icon: <AiOutlineMail />,
      title: "Inquiries & Leads",
      desc: "Review received contact submissions and client opportunity messages.",
      badge: `${data.cms.contacts} Inquiries`,
      color: "danger",
    },
  ];

  // Calculate percentages for top visited pages
  const totalPageHits = (data.visitors.topPages || []).reduce((acc, p) => acc + (p.count || 0), 0) || 1;

  return (
    <div className="admin-dashboard-wrapper">
      <AdminNav />

      <Container className="py-4">
        {/* Header Strip */}
        <div className="dashboard-header mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <span className="badge bg-primary text-uppercase px-3 py-1 mb-2">
                Console Active
              </span>
              <h1 className="dashboard-main-title">Administrator Analytics & Console</h1>
              <p className="dashboard-main-sub text-secondary mb-0">
                Live portfolio traffic, Jerry AI Assistant conversation history, and content modules.
              </p>
            </div>

            {/* System Status Indicators & Refresh */}
            <div className="system-status-box d-flex gap-2 flex-wrap align-items-center">
              <span className="status-indicator-pill online">
                <AiOutlineDatabase className="me-1" /> MongoDB Atlas: Online
              </span>
              <span className="status-indicator-pill ai">
                <BsStars className="me-1" /> Jerry AI: Active
              </span>
              <span className="status-indicator-pill cloud">
                <AiOutlineCloud className="me-1" /> Cloudinary CDN: Active
              </span>
              <button
                className="btn-refresh-analytics"
                onClick={fetchDashboardData}
                disabled={refreshing}
                title="Refresh Analytics"
              >
                <AiOutlineReload className={`me-1 ${refreshing ? "spin-icon" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>

        {/* ================= 1. PRIMARY METRICS STRIP ================= */}
        <Row className="g-3 mb-4">
          {/* Total Visitors */}
          <Col lg={4} md={6}>
            <div className="stat-card glass-panel h-100 position-relative overflow-hidden">
              <div className="stat-card-glow cyan" />
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="stat-label">Total Portfolio Visits</div>
                <div className="stat-icon-pill cyan">
                  <AiOutlineEye size={18} />
                </div>
              </div>
              <div className="stat-number gradient-text">{data.visitors.totalVisits}</div>
              <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
                <Badge color="info" pill className="px-2 py-1">
                  <BsPeople className="me-1" /> {data.visitors.uniqueVisitors} Unique
                </Badge>
                <Badge color="success" pill className="px-2 py-1">
                  Today: +{data.visitors.todayVisits}
                </Badge>
              </div>
            </div>
          </Col>

          {/* Jerry AI Questions */}
          <Col lg={4} md={6}>
            <div className="stat-card glass-panel h-100 position-relative overflow-hidden">
              <div className="stat-card-glow purple" />
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="stat-label">Jerry AI Questions</div>
                <div className="stat-icon-pill purple">
                  <BsStars size={18} />
                </div>
              </div>
              <div className="stat-number gradient-text-purple">{data.chatLogs.totalQuestions}</div>
              <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
                <Badge color="warning" pill className="px-2 py-1">
                  <BsRobot className="me-1" /> AI Conversations
                </Badge>
                <Badge color="success" pill className="px-2 py-1">
                  Today: +{data.chatLogs.todayQuestions}
                </Badge>
              </div>
            </div>
          </Col>

          {/* Articles & Engagement */}
          <Col lg={4} md={12}>
            <div className="stat-card glass-panel h-100 position-relative overflow-hidden">
              <div className="stat-card-glow emerald" />
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="stat-label">Articles & Engagement</div>
                <div className="stat-icon-pill emerald">
                  <AiOutlineFileText size={18} />
                </div>
              </div>
              <div className="stat-number gradient-text-emerald">{data.cms.posts}</div>
              <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
                <Badge color="danger" pill className="px-2 py-1">
                  <FaHeart className="me-1" /> {data.cms.likes} Total Likes
                </Badge>
                <Badge color="primary" pill className="px-2 py-1">
                  {data.cms.projects} Projects Showcase
                </Badge>
              </div>
            </div>
          </Col>
        </Row>

        {/* ================= 2. AUDIENCE & TRAFFIC INSIGHTS ================= */}
        <Row className="g-3 mb-4">
          {/* Top Visited Pages */}
          <Col lg={7}>
            <div className="glass-panel analytics-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="analytics-card-title mb-0">
                  <AiOutlineEye className="me-2 text-info" /> Top Visited Routes
                </h3>
                <span className="badge bg-dark border border-secondary text-secondary">
                  Live Traffic Distribution
                </span>
              </div>

              {data.visitors.topPages && data.visitors.topPages.length > 0 ? (
                <div className="top-pages-list">
                  {data.visitors.topPages.map((page, idx) => {
                    const percent = Math.round((page.count / totalPageHits) * 100);
                    return (
                      <div key={idx} className="page-hit-row mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="page-path-pill">
                            <code>{page._id || "/"}</code>
                          </span>
                          <span className="page-hit-count">
                            <strong>{page.count}</strong> visits ({percent}%)
                          </span>
                        </div>
                        <Progress
                          value={percent}
                          className="page-progress-bar"
                          style={{ height: "6px" }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-secondary">
                  <p className="mb-0">No page visits logged yet. Browse your portfolio to generate traffic data!</p>
                </div>
              )}
            </div>
          </Col>

          {/* Device Breakdown & Recent Visitors */}
          <Col lg={5}>
            <div className="glass-panel analytics-card p-4 h-100">
              <h3 className="analytics-card-title mb-3">
                <BsLaptop className="me-2 text-warning" /> Device & Audience Profile
              </h3>

              <div className="device-pills-row d-flex gap-2 mb-4">
                {data.visitors.deviceBreakdown && data.visitors.deviceBreakdown.length > 0 ? (
                  data.visitors.deviceBreakdown.map((dev, idx) => (
                    <div key={idx} className="device-stat-chip flex-fill text-center p-2 rounded">
                      <div className="device-chip-icon">
                        {dev._id === "Mobile" ? <BsPhone size={18} /> : <BsLaptop size={18} />}
                      </div>
                      <div className="device-chip-name">{dev._id || "Desktop"}</div>
                      <div className="device-chip-count fw-bold">{dev.count}</div>
                    </div>
                  ))
                ) : (
                  <div className="device-stat-chip flex-fill text-center p-2 rounded">
                    <BsLaptop size={18} />
                    <div className="device-chip-name">Desktop</div>
                    <div className="device-chip-count fw-bold">100%</div>
                  </div>
                )}
              </div>

              <h4 className="recent-visits-subtitle mb-2 text-secondary small text-uppercase">
                Recent Visitor Activity
              </h4>
              <div className="recent-visits-stream">
                {data.visitors.recentVisits && data.visitors.recentVisits.length > 0 ? (
                  data.visitors.recentVisits.slice(0, 5).map((v, i) => (
                    <div key={i} className="visitor-stream-item d-flex justify-content-between align-items-center py-1 border-bottom border-dark">
                      <span className="small text-truncate" style={{ maxWidth: "160px" }}>
                        <code>{v.path}</code> ({v.device || "Desktop"})
                      </span>
                      <span className="text-muted small">
                        {new Date(v.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted small mb-0">Waiting for live visitor traffic...</p>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {/* ================= 3. JERRY AI Q&A HISTORY TABLE (COLLECTION) ================= */}
        <div className="glass-panel analytics-card p-4 mb-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="ai-icon-badge">
                  <BsStars size={18} />
                </span>
                <h2 className="dashboard-section-heading mb-0">
                  Jerry AI Assistant • Q&A History
                </h2>
              </div>
              <p className="text-secondary small mb-0 mt-1">
                Real-time collection of questions asked by visitors & recruiters with Jerry's generated answers.
              </p>
            </div>

            {/* Search, Filter & Clear */}
            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* Search Bar */}
              <div className="chat-search-wrap position-relative">
                <AiOutlineSearch className="chat-search-icon" />
                <Input
                  type="text"
                  placeholder="Search questions or answers..."
                  className="chat-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Engine Filter */}
              <select
                className="engine-select-dropdown"
                value={engineFilter}
                onChange={(e) => setEngineFilter(e.target.value)}
              >
                <option value="all">All Engines</option>
                <option value="gemini">Gemini LLM</option>
                <option value="rag">RAG Engine</option>
              </select>

              {/* Clear History Button */}
              {data.chatLogs.recent && data.chatLogs.recent.length > 0 && (
                <button className="btn-clear-chats" onClick={handleClearAllChats}>
                  <AiOutlineDelete className="me-1" /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="chat-logs-table-responsive table-responsive">
            <Table className="chat-history-table align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: "16%" }}>Time</th>
                  <th style={{ width: "12%" }}>Visitor</th>
                  <th style={{ width: "32%" }}>User Question</th>
                  <th style={{ width: "24%" }}>Jerry's Answer</th>
                  <th style={{ width: "10%" }}>Engine</th>
                  <th style={{ width: "6%" }} className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredChatLogs.length > 0 ? (
                  filteredChatLogs.map((log) => {
                    const isGemini = log.source === "gemini";
                    const formattedDate = new Date(log.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                    const formattedTime = new Date(log.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <tr key={log._id} className="chat-log-row" onClick={() => openChatModal(log)}>
                        {/* Time */}
                        <td>
                          <div className="log-date">{formattedDate}</div>
                          <div className="log-time text-muted small">{formattedTime}</div>
                        </td>

                        {/* Visitor ID */}
                        <td>
                          <span className="visitor-badge" title={log.visitorId}>
                            {(log.visitorId || "Anonymous").slice(0, 8)}...
                          </span>
                        </td>

                        {/* User Question */}
                        <td>
                          <div className="question-bubble" title={log.question}>
                            <BsChatSquareDots className="me-1 text-info flex-shrink-0" />
                            <span className="question-text">{log.question}</span>
                          </div>
                        </td>

                        {/* Jerry's Answer */}
                        <td>
                          <div className="answer-preview text-secondary" title="Click to view full answer">
                            {log.answer && log.answer.length > 90
                              ? `${log.answer.substring(0, 90)}...`
                              : log.answer}
                          </div>
                          <span className="view-full-pill">Click to expand</span>
                        </td>

                        {/* Engine Source */}
                        <td>
                          <Badge
                            color={isGemini ? "primary" : "secondary"}
                            pill
                            className="engine-pill"
                          >
                            {isGemini ? "Gemini 3.5" : "RAG Engine"}
                          </Badge>
                          {log.responseTimeMs > 0 && (
                            <div className="text-muted small mt-1 font-monospace">
                              {(log.responseTimeMs / 1000).toFixed(1)}s
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="text-center">
                          <button
                            className="btn-delete-log-row"
                            onClick={(e) => handleDeleteChat(log._id, e)}
                            title="Delete log"
                          >
                            <AiOutlineDelete />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-secondary">
                      <BsStars size={36} className="text-muted mb-2 d-block mx-auto" />
                      <p className="mb-1 fw-bold">No chat history matches your filter.</p>
                      <small className="text-muted">
                        When recruiters or visitors ask Jerry questions in the chat widget, their questions and Jerry's answers will appear right here in real-time.
                      </small>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        {/* ================= 4. MANAGEMENT MODULES GRID ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="dashboard-section-heading mb-0">Management Modules</h2>
          <span className="text-secondary small">Direct Content CMS Access</span>
        </div>

        <Row className="g-4">
          {managementModules.map((module) => (
            <Col lg={4} md={6} key={module.path}>
              <Link to={module.path} className="module-card-link">
                <Card className="glass-panel module-card h-100">
                  <CardBody className="p-4 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className={`module-icon-wrap ${module.color}`}>
                          {module.icon}
                        </div>
                        <Badge color={module.color} pill className="module-badge">
                          {module.badge}
                        </Badge>
                      </div>
                      <CardTitle tag="h5" className="module-title mb-2">
                        {module.title}
                      </CardTitle>
                      <CardText className="module-desc text-secondary">
                        {module.desc}
                      </CardText>
                    </div>

                    <div className="module-action-link pt-3 border-top border-secondary d-flex align-items-center justify-content-between text-info">
                      <span>Open Module</span>
                      <AiOutlineArrowRight />
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ================= MODAL: FULL Q&A DETAIL INSPECTOR ================= */}
      <Modal
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
        centered
        size="lg"
        className="chat-detail-modal"
      >
        <ModalHeader toggle={() => setIsModalOpen(false)} className="border-secondary bg-dark text-light">
          <BsStars className="me-2 text-warning" /> Jerry AI Conversation Detail
        </ModalHeader>
        <ModalBody className="bg-dark text-light p-4">
          {selectedChat && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div>
                  <span className="text-secondary small d-block">Asked On</span>
                  <strong>
                    {new Date(selectedChat.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </strong>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <Badge color={selectedChat.source === "gemini" ? "primary" : "secondary"} pill className="px-3 py-1">
                    {selectedChat.source === "gemini" ? "Gemini 3.5 Flash" : "RAG Knowledge Engine"}
                  </Badge>
                  {selectedChat.responseTimeMs > 0 && (
                    <Badge color="dark" pill className="border border-secondary px-2 py-1">
                      {(selectedChat.responseTimeMs / 1000).toFixed(2)}s Latency
                    </Badge>
                  )}
                </div>
              </div>

              {/* Question Section */}
              <div className="modal-qa-card question mb-4 p-3 rounded">
                <div className="small text-muted text-uppercase mb-1">User Question</div>
                <div className="fs-5 fw-bold text-info">
                  "{selectedChat.question}"
                </div>
              </div>

              {/* Answer Section */}
              <div className="modal-qa-card answer p-3 rounded">
                <div className="small text-muted text-uppercase mb-2">Jerry's Generated Answer</div>
                <div
                  className="modal-answer-prose text-light"
                  style={{ whiteSpace: "pre-line", lineHeight: 1.7 }}
                >
                  {selectedChat.answer}
                </div>
              </div>

              {/* Technical Metadata */}
              <div className="mt-4 pt-3 border-top border-secondary small text-muted d-flex justify-content-between flex-wrap gap-2">
                <span>Visitor Session: <code>{selectedChat.visitorId}</code></span>
                {selectedChat.ipAddress && (
                  <span>Client IP: <code>{selectedChat.ipAddress}</code></span>
                )}
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="border-secondary bg-dark">
          <Button color="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
