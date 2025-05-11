import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const MaterialHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mobile menu button (if needed) */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          {/* Logo and site title */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-tertiary">
              StudyBoi
            </span>
          </Link>
        </div>
        
        {/* Navigation links - hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/pomodoro" className="text-sm font-medium hover:text-primary">
            Pomodoro
          </Link>
          <Link to="/todo" className="text-sm font-medium hover:text-primary">
            Todo
          </Link>
          <Link to="/notes" className="text-sm font-medium hover:text-primary">
            Notes
          </Link>
          <Link to="/self-study" className="text-sm font-medium hover:text-primary">
            Self Study
          </Link>
        </nav>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle switch */}
          <ThemeToggle />
          
          {/* User account button or other actions can go here */}
        </div>
      </div>
    </header>
  );
};

export default MaterialHeader;
