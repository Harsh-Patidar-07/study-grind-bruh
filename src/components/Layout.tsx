
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MenuIcon, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 bottom-0 z-50 transition-transform duration-300 ease-in-out",
          isMobile ? "w-72" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out min-h-screen flex flex-col",
        sidebarOpen && !isMobile ? "ml-64" : "ml-0"
      )}>
        {/* Mobile sidebar toggle */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
            
            <div className="sm:hidden text-center font-medium">
              StudyBST
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
