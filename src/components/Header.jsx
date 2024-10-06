import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarToggler,
  Collapse,
  NavLink as ReactstrapNavLink,
} from "reactstrap";
import { AuthContext } from "../context/AuthProvider";
import { NavLink as RouterNavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import { ThemeContext } from "../context/ThemeProvider"; // Import the ThemeContext

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true); // State to track if scrolled to top
  const { auth, logout } = useContext(AuthContext); // Access auth and logout from context
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggleTheme from context

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Check if scrolled to top
      setIsTop(scrollPosition === 0);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // Define the services statically
  const services = [
    { href: "/", className: "fa-home", text: "Home" },
    { href: "/about", className: "fa-user", text: "About" },
    { href: "/projects", className: "fa-project-diagram", text: "Projects" },
    { href: "/posts", className: "fa-file-alt", text: "Posts" },
    { href: "/contact", className: "fa-envelope", text: "Contact" },
    { href: "/resume", className: "fa-file-alt", text: "Resume" },
  ];

  // Conditionally add admin links based on authentication state
  if (auth.isLoggedIn) {
    services.push(
      { href: "/admin-dashboard", className: "fa-server", text: "Dashboard" },
      { href: "#", className: "fa-sign-out-alt", text: "Logout", onClick: logout }
    );
  } else {
    services.push(
      { href: "/admin-login", className: "fa-sign-in-alt", text: "Admin Login" }
    );
  }

  const handleNavLinkClick = () => {
    setIsOpen(false); // Close the navbar on link click
  };

  return (
    <Navbar
      color={theme} // Set color for the navbar
      dark={theme==='dark'?true:false}
      expand="md" // Enable responsiveness on medium screens and above
      fixed="top" // Keep the navbar sticky on top
      className={isTop ? "navbar-transparent" : "navbar-scrolled"} // Change style on scroll
    >
      <NavbarBrand href="/" className={`text-${theme==='dark'?'light':'dark'}`}>
        <b>RC.</b>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse className={`text-${theme==='dark'?'light':'dark'}`} isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {services.map((item, index) =>
            item.text === "Logout" ? (
              <NavItem key={index}>
                <ReactstrapNavLink
                  href="#"
                  className="d-flex align-items-center"
                  onClick={item.onClick}
                >
                  <i className={`fas ${item.className} me-2`} />
                  {item.text}
                </ReactstrapNavLink>
              </NavItem>
            ) : (
              <NavItem key={index}>
                <RouterNavLink
                  to={item.href}
                  className="nav-link d-flex align-items-center"
                  activeClassName="active"
                  onClick={handleNavLinkClick} // Close the navbar on click
                >
                  <i className={`fas ${item.className} me-2`} />
                  {item.text}
                </RouterNavLink>
              </NavItem>
            )
          )}
          {/* Theme Toggle Button */}
          <NavItem>
            <button
              onClick={toggleTheme}
              className={`btn btn-outline-light ms-2 text-${theme==='dark'?'light':'dark'}`} // You can style this button as needed
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <i className="fas fa-moon" />
              ) : (
                <i className="fas fa-sun" />
              )}
            </button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
