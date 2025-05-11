
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MenuIcon, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import ModeToggle from "./ModeToggle";
import ThemeToggle from "./ThemeToggle";

const Layout = () => {
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

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 bottom-0 z-50 transition-transform duration-200 ease-in-out",
          isMobile ? "w-72" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-200 ease-in-out min-h-screen flex flex-col",
        sidebarOpen && !isMobile ? "ml-64" : "ml-0"
      )}>
        {/* Mobile header bar */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
              </button>
              
              <ModeToggle className="md:hidden" />
            </div>
            
            <div className="sm:hidden text-center font-medium">
              {isClassroomMode ? "Classroom" : "Self Study"}
            </div>
            
            <div className="h-10 w-10 rounded-full bg-muted/30 flex items-center justify-center sm:hidden">
              <span className="font-semibold">G</span>
            </div>
          </div>
        </div>
        
        {/* Page content */}
        <div className="flex-1 pb-20">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
