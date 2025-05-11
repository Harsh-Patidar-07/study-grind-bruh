import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import material components directly
import '@material/web/switch/switch.js';

// Define DOM element that extends HTMLElement with selected property
interface MDSwitchElement extends HTMLElement {
  selected: boolean;
}

const MaterialThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Read from localStorage, defaulting to dark if not set
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Update the document root class based on the theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    // Store the preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (e: Event) => {
    const switchElement = e.target as MDSwitchElement;
    const newTheme = switchElement.selected ? 'light' : 'dark';
    setTheme(newTheme);
    toast({
      description: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated!`,
      duration: 2000,
    });
  };

  useEffect(() => {
    const switchElement = document.getElementById('theme-switch') as MDSwitchElement;
    if (switchElement) {
      switchElement.selected = theme === 'light';
      switchElement.addEventListener('change', toggleTheme);
      
      return () => {
        switchElement.removeEventListener('change', toggleTheme);
      };
    }
  }, [theme]);

  return (
    <div className="flex items-center justify-between w-full p-2">
      <div className="flex items-center gap-2">
        <Moon size={16} className="dark:text-white" />
        <span>Dark</span>
      </div>
      
      <md-switch id="theme-switch" icons></md-switch>
      
      <div className="flex items-center gap-2">
        <Sun size={16} />
        <span>Light</span>
      </div>
    </div>
  );
};

export default MaterialThemeToggle;
