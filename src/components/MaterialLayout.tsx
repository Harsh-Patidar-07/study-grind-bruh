
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MaterialHeader from "./MaterialHeader";
import MaterialSidebar from "./MaterialSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { MaterialIconButton } from "./material";
import { Menu, X } from "lucide-react";

const MaterialLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're in classroom mode based on the current route
  const isClassroomMode = ['/chat', '/notes', '/announcements', '/classroom'].includes(location.pathname);
  
  // Auto-close sidebar when navigating to specific routes on mobile
  useEffect(() => {
    if (isMobile && 
        location.pathname !== '/classroom' && 
        location.pathname !== '/self-study') {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-md-background text-md-on-background flex flex-col">
      <MaterialHeader toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1">
        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div 
          className={cn(
            "fixed top-16 bottom-0 z-50 bg-md-surface transition-transform duration-300 ease-in-out border-r border-md-outline-variant",
            isMobile ? "w-64" : "w-72", 
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <MaterialSidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
        
        {/* Main content */}
        <main 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out p-4 md:p-6",
            sidebarOpen && !isMobile ? "ml-72" : "ml-0"
          )}
        >
          <Outlet />
        </main>
      </div>
      
      {/* Material Design 3 style bottom navigation for mobile */}
      {isMobile && (
        <div className="md3-bottom-navigation">
          <div 
            className={cn(
              "md3-bottom-navigation-item",
              location.pathname === "/" || location.pathname === "/self-study" ? "md3-bottom-navigation-item-active" : ""
            )}
            onClick={() => navigate("/self-study")}
          >
            <Menu size={24} />
            <span className="text-xs">Home</span>
          </div>
          {/* Add more bottom navigation items as needed */}
        </div>
      )}
    </div>
  );
};

export default MaterialLayout;
