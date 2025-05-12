
import { useEffect, useState } from "react";
import { MaterialSwitch } from "./material";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has previously set theme preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Set initial state based on saved theme or system preference
    setIsDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark));
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    
    // Toggle dark mode class on document
    if (newIsDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <MaterialSwitch 
      checked={isDarkMode} 
      onChange={toggleTheme}
      className="inline-flex"
    />
  );
};

export default ThemeToggle;
