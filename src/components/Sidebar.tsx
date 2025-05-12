
import { Link, useLocation } from 'react-router-dom';
import { 
  Clock, 
  ListChecks, 
  MessageSquare, 
  Upload, 
  FileSearch, 
  BellRing, 
  BookOpen, 
  GraduationCap 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ModeToggle from './ModeToggle';
import ThemeToggle from './ThemeToggle';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  current: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  closeSidebar?: () => void;
}

const NavItem = ({ icon: Icon, label, path, current, onClick }: NavItemProps) => {
  return (
    <Link 
      to={path} 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
        current 
          ? "bg-genz-purple text-white font-medium" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {current && (
        <div className="ml-auto h-2 w-2 rounded-full bg-white"></div>
      )}
    </Link>
  );
};

const Sidebar = ({ closeSidebar }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Check if we're in classroom mode based on the current route
  const isClassroomMode = ['/chat', '/notes', '/announcements', '/classroom'].includes(currentPath);
  
  // Define nav items for self-study and classroom modes
  const selfStudyNavItems = [
    { icon: BookOpen, label: "Self Study", path: "/self-study" },
    { icon: Clock, label: "Pomodoro Timer", path: "/pomodoro" },
    { icon: ListChecks, label: "To-Do List", path: "/todo" },
    { icon: FileSearch, label: "Study Sources", path: "/study-sources" },
  ];
  
  const classroomNavItems = [
    { icon: GraduationCap, label: "Classroom", path: "/classroom" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: Upload, label: "Notes Sharing", path: "/notes" },
    { icon: BellRing, label: "Announcements", path: "/announcements" },
  ];
  
  // Use the appropriate nav items based on mode
  const navItems = isClassroomMode ? classroomNavItems : selfStudyNavItems;

  return (
    <div className="h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border shadow-lg">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-genz-purple flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <h1 className="font-bold text-xl">StudyBST</h1>
          <span className="text-xs bg-genz-green text-black px-1.5 rounded-md ml-auto">beta</span>
        </Link>
      </div>
      
      <div className="px-3 py-2">
        <ModeToggle className="mb-6" />
        
        <p className={cn(
          "text-xs text-muted-foreground font-medium px-3 py-1 uppercase tracking-wider",
          isClassroomMode ? "text-genz-green" : "text-genz-purple"
        )}>
          {isClassroomMode ? "Classroom Mode" : "Self Study Mode"}
        </p>
        
        <nav className="space-y-1 mt-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              current={currentPath === item.path}
              onClick={closeSidebar}
            />
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <ThemeToggle />
        <div className="flex items-center gap-3 mt-4">
          <div className="h-9 w-9 rounded-full bg-genz-blue flex items-center justify-center">
            <span className="font-bold text-white">G</span>
          </div>
          <div>
            <p className="text-sm font-medium">Gen Z Legend</p>
            <p className="text-xs text-muted-foreground">Barely surviving</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
