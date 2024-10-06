import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import BaseLayout from "../src/components/BaseLayout"; // Import the base layout component
import { AuthProvider } from "./context/AuthProvider";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./context/ProtectedRoute";
import Services from "./components/Services";
import ToDo from "./components/ToDo";
import Register from "./components/Register";
import ManagePosts from "./components/ManagePosts";
import FullPost from "./components/FullPost";
import AllPosts from "./components/AllPosts";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS animations CSS
import Contact from "./components/Contact";
import ContactRequests from "./components/ContactRequests";
import ManageProjects from "./components/ManageProjects";
import Projects from "./components/Projects";
import ManageSkills from "./components/ManageSkills";
import Resume from "./components/Resume";
import ManageContent from "./components/ManageContent";
import AboutMe from "./components/AboutMe";
import { ThemeContext, ThemeProvider } from "./context/ThemeProvider";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <AuthProvider>
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
      </AuthProvider>
      </div>
  );
}

export default App;
