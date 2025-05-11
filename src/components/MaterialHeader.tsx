
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface MaterialHeaderProps {
  toggleSidebar: () => void;
}

const MaterialHeader = ({ toggleSidebar }: MaterialHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Hamburger menu button */}
          <Button 
            className="p-2 rounded-full hover:bg-muted"
            onClick={toggleSidebar}
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </Button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">S</span>
            </div>
          </Link>
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
