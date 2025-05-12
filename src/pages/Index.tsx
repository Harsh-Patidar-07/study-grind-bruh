
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  ListChecks, 
  MessageSquare, 
  Upload, 
  BellRing, 
  FileSearch, 
  BookOpen, 
  GraduationCap,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { MaterialButton } from "@/components/material";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const features = [
    // Self Study features
    {
      title: "Pomodoro Timer",
      description: "Set timers to improve your study focus and productivity",
      icon: Clock,
      path: "/pomodoro",
      color: "text-md-primary",
      bgColor: "bg-md-primary-container",
      textColor: "text-md-on-primary-container"
    },
    {
      title: "To-Do List",
      description: "Track your study tasks and assignments efficiently",
      icon: ListChecks,
      path: "/todo",
      color: "text-md-secondary",
      bgColor: "bg-md-secondary-container",
      textColor: "text-md-on-secondary-container"
    },
    {
      title: "Study Sources",
      description: "Find quality educational resources for your studies",
      icon: FileSearch,
      path: "/study-sources",
      color: "text-md-tertiary",
      bgColor: "bg-md-tertiary-container",
      textColor: "text-md-on-tertiary-container"
    },
    // Classroom features
    {
      title: "Classroom Chat",
      description: "Communicate with classmates and ask questions",
      icon: MessageSquare,
      path: "/chat",
      color: "text-md-primary",
      bgColor: "bg-md-primary-container",
      textColor: "text-md-on-primary-container"
    },
    {
      title: "Notes Sharing",
      description: "Share and access class notes with your peers",
      icon: Upload,
      path: "/notes",
      color: "text-md-secondary",
      bgColor: "bg-md-secondary-container",
      textColor: "text-md-on-secondary-container"
    },
    {
      title: "Announcement Feed",
      description: "Stay updated with important class announcements",
      icon: BellRing,
      path: "/announcements",
      color: "text-md-tertiary",
      bgColor: "bg-md-tertiary-container",
      textColor: "text-md-on-tertiary-container"
    }
  ];
  
  const getRandomTip = () => {
    const tips = [
      "Break large tasks into smaller, manageable chunks",
      "Stay hydrated while studying - it improves brain function",
      "Review your notes within 24 hours of taking them",
      "Try the Pomodoro technique with our timer",
      "Get enough sleep - it helps consolidate memories",
      "Create a dedicated study space free from distractions",
      "Teach concepts to others to deepen your understanding",
      "Use active recall instead of passive re-reading",
      "Take short breaks every 25-30 minutes of focused study",
      "Set specific, achievable goals for each study session"
    ];
    
    return tips[Math.floor(Math.random() * tips.length)];
  };

  return (
    <div className="container py-4 md:py-8 px-3 md:px-8">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12 mt-2 md:mt-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 md:mb-6 text-md-primary">
          Study Assistant
        </h1>
        <p className="text-lg md:text-xl text-md-on-surface-variant max-w-2xl mx-auto">
          Your companion for effective studying and classroom collaboration
        </p>
        <div className="mt-6 md:mt-8 flex flex-wrap gap-4 items-center justify-center">
          <MaterialButton 
            variant="filled"
            size={isMobile ? "default" : "lg"}
            onClick={() => navigate("/self-study")}
            hasIcon
          >
            <BookOpen className="h-4 w-4" />
            Self Study
          </MaterialButton>
          
          <MaterialButton 
            variant="tonal"
            size={isMobile ? "default" : "lg"}
            onClick={() => navigate("/classroom")}
            hasIcon
          >
            <GraduationCap className="h-4 w-4" />
            Classroom
          </MaterialButton>
          
          <MaterialButton
            variant="outlined" 
            size={isMobile ? "default" : "lg"}
            onClick={() => toast({
              title: "Study Tip",
              description: getRandomTip(),
            })}
            hasIcon
          >
            <Info className="h-4 w-4" />
            Get Study Tips
          </MaterialButton>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-md-on-surface">
          <BookOpen className="text-md-primary" />
          Study Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.slice(0, 3).map((feature) => (
            <div 
              key={feature.path}
              className="rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden relative shadow-sm border border-md-outline-variant"
              onClick={() => navigate(feature.path)}
            >
              <div className={`p-4 md:p-6 ${feature.bgColor} ${feature.textColor}`}>
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center`}>
                    <feature.icon className={feature.color} size={isMobile ? 20 : 24} />
                  </div>
                  <h3 className="text-md md:text-lg font-medium">{feature.title}</h3>
                </div>
                <p className="text-sm">{feature.description}</p>
              </div>
              <div className="px-4 md:px-6 py-3 md:py-4 bg-md-surface">
                <MaterialButton variant="text" size={isMobile ? "sm" : "default"} className="w-full justify-start">
                  Open {feature.title}
                </MaterialButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classroom Tools */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-md-on-surface">
          <GraduationCap className="text-md-primary" />
          Classroom Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.slice(3).map((feature) => (
            <div 
              key={feature.path}
              className="rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden relative shadow-sm border border-md-outline-variant"
              onClick={() => navigate(feature.path)}
            >
              <div className={`p-4 md:p-6 ${feature.bgColor} ${feature.textColor}`}>
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center`}>
                    <feature.icon className={feature.color} size={isMobile ? 20 : 24} />
                  </div>
                  <h3 className="text-md md:text-lg font-medium">{feature.title}</h3>
                </div>
                <p className="text-sm">{feature.description}</p>
              </div>
              <div className="px-4 md:px-6 py-3 md:py-4 bg-md-surface">
                <MaterialButton variant="text" size={isMobile ? "sm" : "default"} className="w-full justify-start">
                  Open {feature.title}
                </MaterialButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 md:mt-16 text-center text-sm text-md-on-surface-variant">
        <p className="mb-1">Made for students, by students</p>
        <p>© {new Date().getFullYear()} Study Assistant</p>
      </div>
    </div>
  );
};

export default Index;
