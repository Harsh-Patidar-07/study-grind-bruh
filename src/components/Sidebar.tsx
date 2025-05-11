
import { Link, useLocation } from 'react-router-dom';
import { Clock, ListChecks, MessageSquare, Upload, FileSearch, BellRing, BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  current: boolean;
}

const NavItem = ({ icon: Icon, label, path, current }: NavItemProps) => {
  return (
    <Link 
      to={path} 
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
        current 
          ? "bg-genz-purple text-white font-medium animate-pulse-glow" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {current && (
        <div className="ml-auto h-2 w-2 rounded-full bg-white animate-pulse"></div>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: BookOpen, label: "Self Study", path: "/self-study" },
    { icon: GraduationCap, label: "Classroom", path: "/classroom" },
    { icon: Clock, label: "Pomodoro Timer", path: "/pomodoro" },
    { icon: ListChecks, label: "To-Do List", path: "/todo" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: Upload, label: "Notes Sharing", path: "/notes" },
    { icon: BellRing, label: "Announcements", path: "/announcements" },
    { icon: FileSearch, label: "Study Sources", path: "/study-sources" },
  ];

  return (
    <div className="h-screen w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-genz-purple flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <h1 className="font-bold text-xl text-glow">StudyBST</h1>
          <span className="text-xs bg-genz-green text-black px-1.5 rounded-md ml-auto">beta</span>
        </Link>
      </div>
      
      <div className="px-3 py-2">
        <p className="text-xs text-muted-foreground font-medium px-3 py-1 uppercase tracking-wider">Dashboard</p>
        <nav className="space-y-1 mt-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              current={currentPath === item.path}
            />
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
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
