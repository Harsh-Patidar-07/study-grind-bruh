
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
import ThemeToggle from './ThemeToggle';

// Import required material components
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/ripple/ripple.js';
import '@material/web/divider/divider.js';

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

const MaterialNavItem = ({ icon: Icon, label, path, current, onClick }: NavItemProps) => {
  return (
    <Link 
      to={path} 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 md-ripple",
        current 
          ? "bg-primary text-primary-foreground font-medium" 
          : "text-foreground hover:bg-muted hover:text-foreground"
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

const MaterialSidebar = ({ closeSidebar }: SidebarProps) => {
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
    <div className="h-full bg-background flex flex-col border-r border-border shadow-sm">
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">S</span>
          </div>
          <h1 className="font-bold text-xl">StudyBST</h1>
        </Link>
      </div>
      
      <div className="px-3 py-4 flex-1">
        <p className={cn(
          "text-xs text-muted-foreground font-medium px-3 py-2 uppercase tracking-wider",
          isClassroomMode ? "text-genz-green" : "text-primary"
        )}>
          {isClassroomMode ? "Classroom Mode" : "Self Study Mode"}
        </p>
        
        <div className="mt-2 space-y-1">
          {navItems.map((item) => (
            <MaterialNavItem 
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              current={currentPath === item.path}
              onClick={closeSidebar}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/80 flex items-center justify-center">
              <span className="font-bold text-white">U</span>
            </div>
            <div>
              <p className="text-sm font-medium">User</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MaterialSidebar;
