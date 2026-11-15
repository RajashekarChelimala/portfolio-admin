import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import "./index.css";
import ParticlesComponent from "./ui-elements/Particle";
import './ui-elements/Theme.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <ParticlesComponent id="tsparticles" />
        <App />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
