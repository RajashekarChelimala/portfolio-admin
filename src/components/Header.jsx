import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  Container,
} from "reactstrap";
import { AuthContext } from "../context/AuthProvider";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { 
  AiOutlineHome, 
  AiOutlineUser, 
  AiOutlineProject, 
  AiOutlineFileText, 
  AiOutlineMail,
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineLogin
} from "react-icons/ai";
import { BsSun, BsMoonStars } from "react-icons/bs";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { to: "/", text: "Home", icon: <AiOutlineHome /> },
    { to: "/about", text: "About", icon: <AiOutlineUser /> },
    { to: "/projects", text: "Projects", icon: <AiOutlineProject /> },
    { to: "/posts", text: "Articles", icon: <AiOutlineFileText /> },
    { to: "/contact", text: "Contact", icon: <AiOutlineMail /> },
    { to: "/resume", text: "Resume", icon: <AiOutlineFileText /> },
  ];

  return (
    <header className={`header-wrapper ${isScrolled ? "scrolled" : ""}`}>
      <Container>
        <Navbar expand="md" className="custom-navbar">
          <NavbarBrand tag={RouterNavLink} to="/" className="brand-logo" onClick={closeMenu}>
            <span className="logo-accent">RC</span>
            <span className="logo-dot">.</span>
          </NavbarBrand>

          <div className="d-flex align-items-center d-md-none gap-2">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn mobile-toggle"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <BsSun className="theme-icon sun" /> : <BsMoonStars className="theme-icon moon" />}
            </button>
            <NavbarToggler onClick={toggle} className="custom-toggler" />
          </div>

          <Collapse isOpen={isOpen} navbar className="navbar-collapse-custom">
            <Nav className="mx-auto nav-links-group" navbar>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <NavItem key={link.to}>
                    <RouterNavLink
                      to={link.to}
                      className={`custom-nav-link ${isActive ? "active" : ""}`}
                      onClick={closeMenu}
                    >
                      <span className="nav-icon">{link.icon}</span>
                      <span className="nav-label">{link.text}</span>
                      {isActive && <span className="active-pill" />}
                    </RouterNavLink>
                  </NavItem>
                );
              })}
            </Nav>

            <div className="d-none d-md-flex align-items-center gap-3">
              {auth.isLoggedIn ? (
                <>
                  <RouterNavLink to="/admin-dashboard" className="nav-action-btn secondary" onClick={closeMenu}>
                    <AiOutlineDashboard className="me-1" /> Dashboard
                  </RouterNavLink>
                  <button onClick={logout} className="nav-action-btn danger" aria-label="Logout">
                    <AiOutlineLogout />
                  </button>
                </>
              ) : (
                <RouterNavLink to="/admin-login" className="nav-action-btn ghost" onClick={closeMenu}>
                  <AiOutlineLogin className="me-1" /> Admin
                </RouterNavLink>
              )}

              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label="Toggle Theme"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <BsSun className="theme-icon sun" /> : <BsMoonStars className="theme-icon moon" />}
              </button>
            </div>
          </Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
