"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create the theme context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// Provider component
export function ThemeProvider({ children }) {
  // Initialize with a value that won't cause hydration mismatch
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Only run client-side
  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Only save to localStorage after component has mounted
    if (mounted) {
      localStorage.setItem("theme", theme);
      
      // Apply theme to document.documentElement instead of body for better CSS variable support
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }

      console.log("Theme changed to:", theme); // Debug log
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    console.log("Toggle theme called, current:", theme); // Debug log
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);