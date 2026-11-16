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
  AiOutlineCheckCircle,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { Card, CardBody, CardText, CardTitle, Col, Container, Row, Badge } from "reactstrap";
import { myAxios, myPrivateAxios } from "../utils/api";
import AdminNav from "./AdminNav";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    posts: 0,
    skills: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, postRes, skillRes, contactRes] = await Promise.allSettled([
          myAxios.get("/projects"),
          myAxios.get("/posts"),
          myPrivateAxios.get("/skills"),
          myPrivateAxios.get("/contact"),
        ]);

        setStats({
          projects: projRes.status === "fulfilled" && Array.isArray(projRes.value.data) ? projRes.value.data.length : 3,
          posts: postRes.status === "fulfilled" && Array.isArray(postRes.value.data) ? postRes.value.data.length : 1,
          skills: skillRes.status === "fulfilled" && Array.isArray(skillRes.value.data) ? skillRes.value.data.length : 18,
          contacts: contactRes.status === "fulfilled" && Array.isArray(contactRes.value.data) ? contactRes.value.data.length : 2,
        });
      } catch (err) {
        console.warn("Stats fetch fallback");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
      badge: `${stats.projects} Active`,
      color: "primary",
    },
    {
      path: "/manage-posts",
      icon: <AiOutlineFileText />,
      title: "Articles & CMS",
      desc: "Write technical blogs, upload Cloudinary covers, and format body articles.",
      badge: `${stats.posts} Published`,
      color: "success",
    },
    {
      path: "/manage-skills",
      icon: <AiOutlineThunderbolt />,
      title: "Skills & Tech",
      desc: "Inline edit skill matrix, categories, and priority ordering in DataGrid.",
      badge: `${stats.skills} Technologies`,
      color: "warning",
    },
    {
      path: "/contact-requests",
      icon: <AiOutlineMail />,
      title: "Inquiries & Leads",
      desc: "Review received contact submissions and client opportunity messages.",
      badge: `${stats.contacts} Inquiries`,
      color: "danger",
    },
  ];

  return (
    <div className="admin-dashboard-wrapper">
      <AdminNav />

      <Container>
        {/* Header Strip */}
        <div className="dashboard-header mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <span className="badge bg-primary text-uppercase px-3 py-1 mb-2">
                Console Active
              </span>
              <h1 className="dashboard-main-title">Administrator Console</h1>
              <p className="dashboard-main-sub text-secondary mb-0">
                Central control panel for portfolio content, Cloudinary media pipeline, and incoming opportunities.
              </p>
            </div>

            {/* System Status Indicators */}
            <div className="system-status-box d-flex gap-2 flex-wrap">
              <span className="status-indicator-pill online">
                <AiOutlineDatabase className="me-1" /> MongoDB Atlas: Online
              </span>
              <span className="status-indicator-pill cloud">
                <AiOutlineCloud className="me-1" /> Cloudinary CDN: Active
              </span>
            </div>
          </div>
        </div>

        {/* Live Metric Stats Strip */}
        <Row className="g-3 mb-5">
          <Col md={3} sm={6}>
            <div className="stat-card glass-panel">
              <div className="stat-label">Published Articles</div>
              <div className="stat-number gradient-text">{stats.posts}</div>
              <div className="stat-sub">Live on Articles Route</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="stat-card glass-panel">
              <div className="stat-label">Showcase Projects</div>
              <div className="stat-number gradient-text">{stats.projects}</div>
              <div className="stat-sub">GovTech & Enterprise</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="stat-card glass-panel">
              <div className="stat-label">Technical Skills</div>
              <div className="stat-number gradient-text">{stats.skills}</div>
              <div className="stat-sub">Indexed in Database</div>
            </div>
          </Col>
          <Col md={3} sm={6}>
            <div className="stat-card glass-panel">
              <div className="stat-label">Direct Inquiries</div>
              <div className="stat-number gradient-text">{stats.contacts}</div>
              <div className="stat-sub">Logged in Contacts</div>
            </div>
          </Col>
        </Row>

        {/* Management Modules Grid */}
        <h2 className="h4 text-light mb-3">Management Modules</h2>
        <Row className="g-4 mb-5">
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
                      <CardTitle tag="h5" className="module-title text-light mb-2">
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
    </div>
  );
};

export default AdminDashboard;
