
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
import MaterialThemeToggle from './MaterialThemeToggle';

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
        <div className="py-2">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              {isClassroomMode ? (
                <GraduationCap className="h-5 w-5 text-primary" />
              ) : (
                <BookOpen className="h-5 w-5 text-primary" />
              )}
              <p className="text-base font-medium">
                {isClassroomMode ? "Classroom Mode" : "Self Study Mode"}
              </p>
            </div>
          </div>
        </div>
        
        <md-divider></md-divider>
        
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
        
        <md-divider className="my-4"></md-divider>
        
        {/* Mode switching buttons with icons */}
        <div className="px-4 py-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">SWITCH MODE</p>
          <div className="grid grid-cols-2 gap-2">
            <Link 
              to="/self-study"
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                !isClassroomMode 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-muted"
              )}
              onClick={closeSidebar}
            >
              <BookOpen className="h-5 w-5 mb-1" />
              <span className="text-xs">Self Study</span>
            </Link>
            <Link 
              to="/classroom"
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                isClassroomMode 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-muted"
              )}
              onClick={closeSidebar}
            >
              <GraduationCap className="h-5 w-5 mb-1" />
              <span className="text-xs">Classroom</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t border-border">
        <MaterialThemeToggle />
      </div>
    </div>
  );
};

export default MaterialSidebar;
