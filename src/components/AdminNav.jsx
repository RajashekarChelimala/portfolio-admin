import React, { useContext } from "react";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { 
  AiOutlineDashboard, 
  AiOutlineEdit, 
  AiOutlineProject, 
  AiOutlineFileText, 
  AiOutlineThunderbolt, 
  AiOutlineMail,
  AiOutlineLogout,
  AiOutlineGlobal
} from "react-icons/ai";
import { AuthContext } from "../context/AuthProvider";
import "./AdminNav.css";

const AdminNav = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  const navItems = [
    { to: "/admin-dashboard", label: "Dashboard", icon: <AiOutlineDashboard /> },
    { to: "/manage-content", label: "Content & Bio", icon: <AiOutlineEdit /> },
    { to: "/manage-projects", label: "Projects", icon: <AiOutlineProject /> },
    { to: "/manage-posts", label: "Articles & CMS", icon: <AiOutlineFileText /> },
    { to: "/manage-skills", label: "Skills", icon: <AiOutlineThunderbolt /> },
    { to: "/contact-requests", label: "Inquiries", icon: <AiOutlineMail /> },
  ];

  return (
    <div className="admin-nav-bar mb-4">
      <div className="admin-nav-container">
        <div className="admin-nav-scroll-wrap">
          <div className="admin-nav-links">
            {navItems.map((item) => (
              <RouterNavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `admin-nav-item ${isActive ? "active" : ""}`
                }
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span className="admin-nav-label">{item.label}</span>
              </RouterNavLink>
            ))}
          </div>

          <div className="admin-nav-actions">
            <RouterNavLink to="/" className="admin-nav-btn view-site" title="View Public Website">
              <AiOutlineGlobal className="me-1" /> View Site
            </RouterNavLink>
            <button onClick={handleLogout} className="admin-nav-btn logout" title="Sign Out">
              <AiOutlineLogout className="me-1" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
