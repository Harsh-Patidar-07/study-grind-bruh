
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MaterialHeader from "./MaterialHeader";
import MaterialSidebar from "./MaterialSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const MaterialLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <MaterialHeader />
      
      <div className="flex flex-1">
        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div 
          className={cn(
            "fixed top-16 bottom-0 z-50 transition-transform duration-200 ease-in-out",
            isMobile ? "w-64" : "w-64", 
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <MaterialSidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
        
        {/* Main content */}
        <main 
          className={cn(
            "flex-1 transition-all duration-200 ease-in-out p-4 md:p-6",
            sidebarOpen && !isMobile ? "ml-64" : "ml-0"
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MaterialLayout;
