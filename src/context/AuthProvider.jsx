import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../ui-elements/toastConfig";
import { useNavigate } from "react-router-dom";
import { sweetAlert } from "../ui-elements/sweetAlert";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const navigate = useNavigate(); // Initialize useNavigate

  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("accessToken") || null,
    isLoggedIn: !!localStorage.getItem("accessToken"),
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const token = localStorage.getItem("accessToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          `${backendUrl}/auth/check`,
          { withCredentials: true, headers }
        );
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          setAuth({ accessToken: response.data.accessToken, isLoggedIn: true });
        }else{
          localStorage.removeItem("accessToken");
          setAuth({ accessToken: '', isLoggedIn: false});
        }
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.error("Session expired or unauthorized", error);
          localStorage.removeItem("accessToken");
          setAuth({ accessToken: '', isLoggedIn: false });
        } else if (localStorage.getItem("accessToken")) {
          // Backend network delay / waking up: preserve existing admin session
          setAuth({ accessToken: localStorage.getItem("accessToken"), isLoggedIn: true });
        }
      }
    };

    checkAuth();
  }, []);

  const register = async (username, password, adminKey) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.post(
        `${backendUrl}/register`,
        { username, password, adminKey },
        { withCredentials: true }
      );
      sweetAlert({
        type: 'success',
        title: 'Registration Successful!',
        text: response.data.success || 'Administrator account established.',
        timer: 2000,
      });
      return { success: true, message: response.data.success };
    } catch (error) {
      console.error("Registration Failed", error);
      const message = error.response?.data?.message || "Registration failed. Invalid admin key.";
      sweetAlert({
        type: 'error',
        title: 'Registration Failed',
        text: message,
        timer: 3000,
      });
      return { success: false, message };
    }
  };

  const login = async (username, password) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.post(
        `${backendUrl}/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      if (response.data && response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        setAuth({ accessToken: response.data.accessToken, isLoggedIn: true });
        return { success: true };
      }
      return { success: false, message: "Authentication failed: No access token received." };
    } catch (error) {
      console.error("Login failed:", error);
      const message = error.response?.status === 401
        ? "Invalid username or password. Please try again."
        : (error.response?.data?.message || "Unable to reach authentication server. Please check connection.");
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      await axios.post(
        `${backendUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("accessToken"); // Remove token from localStorage
      setAuth({ accessToken: null, isLoggedIn: false });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
