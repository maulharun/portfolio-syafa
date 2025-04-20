"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

// Provider component
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Check if there's a saved theme preference in localStorage
    // Using try-catch to handle cases where localStorage might not be available
    try {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      // Save theme to localStorage when it changes
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
    
    // Apply theme to body
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);