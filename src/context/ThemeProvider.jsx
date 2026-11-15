import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default theme

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme'); // Check for saved theme in local storage
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
  
    // Apply a light grey background color if the theme is "light"
    if (theme === "light") {
      document.body.style.backgroundColor = "rgb(240,240,240)"; // Light grey color
    } else {
      document.body.style.backgroundColor = ""; // Reset to default for dark theme
    }
  }, [theme]);
  

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save the new theme to local storage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
