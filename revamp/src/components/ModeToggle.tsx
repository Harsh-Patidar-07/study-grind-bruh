
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ModeToggleProps {
  className?: string;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ className }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  
  // Determine if we're in classroom mode based on the current route
  const isClassroomMode = ['/chat', '/notes', '/announcements', '/classroom'].includes(currentPath);
  const isSelfStudyMode = ['/pomodoro', '/todo', '/study-sources', '/self-study'].includes(currentPath);
  
  const handleModeChange = (mode: 'self-study' | 'classroom') => {
    if (mode === 'self-study') {
      navigate('/self-study');
    } else {
      navigate('/classroom');
    }
  };

  return (
    <div className={cn("flex rounded-md border border-border p-1 gap-1 shadow-sm", className)}>
      <Button 
        variant={isSelfStudyMode ? "default" : "ghost"}
        size="sm"
        className={cn(
          "flex-1 gap-2 transition-colors duration-200",
          isSelfStudyMode ? "bg-genz-purple text-white" : "text-muted-foreground"
        )}
        onClick={() => handleModeChange('self-study')}
      >
        <BookOpen size={16} />
        <span className="hidden sm:inline">Self Study</span>
      </Button>
      
      <Button 
        variant={isClassroomMode ? "default" : "ghost"}
        size="sm"
        className={cn(
          "flex-1 gap-2 transition-colors duration-200",
          isClassroomMode ? "bg-genz-green text-white" : "text-muted-foreground"
        )}
        onClick={() => handleModeChange('classroom')}
      >
        <GraduationCap size={16} />
        <span className="hidden sm:inline">Classroom</span>
      </Button>
    </div>
  );
};

export default ModeToggle;
