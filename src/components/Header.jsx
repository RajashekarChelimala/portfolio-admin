import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import './Header.css'; // Import your custom CSS file
import { AuthContext } from "../context/AuthProvider";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(true); // State to track if scrolled to top
  const { auth, logout } = useContext(AuthContext); // Access auth and logout from context

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
    { href: "/request-resume", className: "fa-file-alt", text: "Resume" },
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

  return (
    <Navbar className={`navbar-transparent sticky-top${isTop ? '' : ' top-scroll'}`} expand="md">
      <NavbarBrand href="/" className="d-flex text-light">
        <b>RC.</b>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar className="justify-content-center">
        <Nav className="ms-auto" navbar>
          {services.map((item, index) => (
            <NavItem key={index}>
              <NavLink href={item.href} className="nav-link" onClick={item.onClick}>
                <i className={`fas ${item.className} icon`} />
                <span className="nav-text">{item.text}</span>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
