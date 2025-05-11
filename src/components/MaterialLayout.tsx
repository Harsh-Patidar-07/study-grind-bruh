import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MaterialHeader from "./MaterialHeader";
import MaterialSidebar from "./MaterialSidebar"; // Import this if you have a sidebar
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { MaterialIconButton } from "./material";

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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <MaterialHeader />
      
      <div className="flex flex-1">
        {/* If you have a sidebar, include it here */}
        {/* <MaterialSidebar /> */}
        
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MaterialLayout;
