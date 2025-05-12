
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { MaterialIconButton } from "./material";
import { Menu, Search } from "lucide-react";

interface MaterialHeaderProps {
  toggleSidebar: () => void;
}

const MaterialHeader = ({ toggleSidebar }: MaterialHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-md-surface border-b border-md-outline-variant shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Hamburger menu button */}
          <MaterialIconButton 
            variant="standard"
            onClick={toggleSidebar}
            ariaLabel="Toggle menu"
            icon={<Menu size={20} />}
          />
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-xl bg-md-primary flex items-center justify-center">
              <span className="text-md-on-primary font-bold text-lg">S</span>
            </div>
          </Link>
        </div>
        
        {/* Center area - can be used for page title */}
        <div className="hidden md:flex justify-center">
          <h1 className="text-md-on-surface font-medium text-lg">Study Assistant</h1>
        </div>
        
        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          <MaterialIconButton 
            variant="standard"
            ariaLabel="Search"
            icon={<Search size={20} />}
          />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default MaterialHeader;
