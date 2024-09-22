import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../ui-elements/toastConfig";
import { useNavigate } from "react-router-dom";

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
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/check`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          setAuth({ accessToken: response.data.accessToken, isLoggedIn: true });
        }else{
          localStorage.removeItem("accessToken");
          setAuth({ accessToken: '', isLoggedIn: false});
        }
      } catch (error) {
        console.error("Not authenticated", error);
        localStorage.removeItem("accessToken");
        setAuth({ accessToken: '', isLoggedIn: false});
      }
    };

    checkAuth();
  }, []);

  const register = async (username, password, adminKey) => {
    try {
      console.log(`${process.env.REACT_APP_BACKEND_URL}/register`);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        { username, password, adminKey },
        { withCredentials: true }
      );
      console.log("response", response); // Log the response
      navigate('/admin-login'); // Redirect to Admin Dashboard on successful registration
      showSuccessToast(response.data.success);
    } catch (error) {
      console.error("Registration Failed", error); // Log the error
      showErrorToast(error.response.data.message);
    }
  };

  const login = async (username, password) => {
    try {
      console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/login`);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      console.log("response", response); // Log the response
      localStorage.setItem("accessToken", response.data.accessToken); // Save token to localStorage
      setAuth({ accessToken: response.data.accessToken, isLoggedIn: true });
    } catch (error) {
      console.error("Login failed", error); // Log the error
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
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
