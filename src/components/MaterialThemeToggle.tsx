
import { MaterialSwitch } from './material';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const MaterialThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has previously set theme preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Set initial state based on saved theme or system preference
    setIsDarkMode(savedTheme === "dark" || (!savedTheme && prefersDark));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    
    // Toggle dark mode class on document
    document.documentElement.classList.toggle('dark', !isDarkMode);
    document.documentElement.classList.toggle('light', isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex items-center gap-2 px-2">
      <Sun size={18} className="text-foreground opacity-60" />
      <MaterialSwitch 
        checked={isDarkMode}
        onChange={toggleTheme}
        icons={true}
        className="mx-1"
      />
      <Moon size={18} className="text-foreground opacity-60" />
    </div>
  );
};

export default MaterialThemeToggle;
