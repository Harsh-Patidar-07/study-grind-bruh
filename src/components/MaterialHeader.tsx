
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const MaterialHeader = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = window.location.pathname;
  
  // Determine if we're in classroom mode based on the current route
  const isClassroomMode = ['/chat', '/notes', '/announcements', '/classroom'].includes(currentPath);
  const isSelfStudyMode = ['/pomodoro', '/todo', '/study-sources', '/self-study'].includes(currentPath);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-full hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          
          {/* Logo and site title */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">
              StudyBoi
            </span>
          </Link>
        </div>
        
        {/* Self Study and Classroom buttons - always visible */}
        <div className="flex items-center gap-2">
          <Button 
            variant={isSelfStudyMode ? "default" : "outline"}
            size="sm"
            className="hidden sm:flex"
            onClick={() => navigate('/self-study')}
          >
            Self Study
          </Button>
          <Button 
            variant={isClassroomMode ? "default" : "outline"}
            size="sm"
            className="hidden sm:flex"
            onClick={() => navigate('/classroom')}
          >
            Classroom
          </Button>
          
          {/* Mobile version - just icons */}
          <Button 
            variant={isSelfStudyMode ? "default" : "outline"}
            size="icon"
            className="sm:hidden"
            onClick={() => navigate('/self-study')}
            aria-label="Self Study"
          >
            S
          </Button>
          <Button 
            variant={isClassroomMode ? "default" : "outline"}
            size="icon"
            className="sm:hidden"
            onClick={() => navigate('/classroom')}
            aria-label="Classroom"
          >
            C
          </Button>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle switch */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default MaterialHeader;
