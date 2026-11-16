import AOS from "aos";
import "aos/dist/aos.css"; // AOS animations CSS
import React, { useContext, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import AllPosts from "./components/AllPosts";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthProvider";
import ProtectedRoute from "./context/ProtectedRoute";
import { ThemeContext } from "./context/ThemeProvider";

// Code-split heavy admin routes and rich editors for optimal bundle performance
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const Services = lazy(() => import("./components/Services"));
const ToDo = lazy(() => import("./components/ToDo"));
const ManagePosts = lazy(() => import("./components/ManagePosts"));
const ManageProjects = lazy(() => import("./components/ManageProjects"));
const ManageSkills = lazy(() => import("./components/ManageSkills"));
const ContactRequests = lazy(() => import("./components/ContactRequests"));
const ManageContent = lazy(() => import("./components/ManageContent"));
const Register = lazy(() => import("./components/Register"));
const FullPost = lazy(() => import("./components/FullPost"));

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false, offset: 50 });
  }, []);

  const { theme } = useContext(ThemeContext);
  const { auth } = useContext(AuthContext);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <Suspense
        fallback={
          <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "60vh" }}>
            <div className="status-pill">
              <span className="pulse-dot" /> Loading...
            </div>
          </div>
        }
      >
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
      </Suspense>
    </div>
  );
}

export default App;
