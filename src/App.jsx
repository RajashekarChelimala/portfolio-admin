import AOS from "aos";
import "aos/dist/aos.css"; // AOS animations CSS
import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BaseLayout from "../src/components/BaseLayout"; // Import the base layout component
import AboutMe from "./components/AboutMe";
import AdminDashboard from "./components/AdminDashboard";
import AllPosts from "./components/AllPosts";
import Contact from "./components/Contact";
import ContactRequests from "./components/ContactRequests";
import FullPost from "./components/FullPost";
import Home from "./components/Home";
import Login from "./components/Login";
import ManageContent from "./components/ManageContent";
import ManagePosts from "./components/ManagePosts";
import ManageProjects from "./components/ManageProjects";
import ManageSkills from "./components/ManageSkills";
import Projects from "./components/Projects";
import Register from "./components/Register";
import Resume from "./components/Resume";
import Services from "./components/Services";
import ToDo from "./components/ToDo";
import { AuthContext } from "./context/AuthProvider";
import ProtectedRoute from "./context/ProtectedRoute";
import { ThemeContext } from "./context/ThemeProvider";
import MouseFollowerParticle from "./ui-elements/MouseFollowerParticle";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
        {auth.isLoggedIn && <MouseFollowerParticle />}
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="admin-login" element={<Login />} />
            <Route path="admin-register" element={<Register />} />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-todo"
              element={
                <ProtectedRoute>
                  <ToDo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-posts"
              element={
                <ProtectedRoute>
                  <ManagePosts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-projects"
              element={
                <ProtectedRoute>
                  <ManageProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-skills"
              element={
                <ProtectedRoute>
                  <ManageSkills />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact-requests"
              element={
                <ProtectedRoute>
                  <ContactRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-content"
              element={
                <ProtectedRoute>
                  <ManageContent />
                </ProtectedRoute>
              }
            />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/about" element={<AboutMe />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
