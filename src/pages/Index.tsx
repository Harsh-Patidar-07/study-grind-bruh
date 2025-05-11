
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Clock, 
  ListChecks, 
  MessageSquare, 
  Upload, 
  BellRing, 
  FileSearch, 
  BookOpen, 
  GraduationCap 
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
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-t-primary"
    },
    {
      title: "To-Do List",
      description: "Track your study tasks and assignments efficiently",
      icon: ListChecks,
      path: "/todo",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-t-secondary"
    },
    {
      title: "Study Sources",
      description: "Find quality educational resources for your studies",
      icon: FileSearch,
      path: "/study-sources",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-t-accent"
    },
    // Classroom features
    {
      title: "Classroom Chat",
      description: "Communicate with classmates and ask questions",
      icon: MessageSquare,
      path: "/chat",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-t-accent"
    },
    {
      title: "Notes Sharing",
      description: "Share and access class notes with your peers",
      icon: Upload,
      path: "/notes",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-t-secondary"
    },
    {
      title: "Announcement Feed",
      description: "Stay updated with important class announcements",
      icon: BellRing,
      path: "/announcements",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-t-accent"
    }
  ];
  
  const getRandomTip = () => {
    const tips = [
      "Are bhai padhai chhodo movies dekho",
      "Timepass karo mauj karo life jeeyo",
      "Your mom doesnt know if you're studying or not",
      "Hell yeah, you dont need to get motivated",
      "Break large tasks into smaller, manageable chunks",
      "Stay hydrated while studying - it improves brain function",
      "Review your notes within 24 hours of taking them",
      "Try the Pomodoro technique with our timer",
      "Get enough sleep - it helps consolidate memories",
    ];
    
    return tips[Math.floor(Math.random() * tips.length)];
  };

  return (
    <div className="container py-4 md:py-8 px-3 md:px-8">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12 mt-2 md:mt-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 md:mb-6 text-primary">
          Study Assistant
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your companion for effective studying and classroom collaboration
        </p>
        <div className="mt-6 md:mt-8 flex flex-col gap-4 items-center">
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <Button 
              size={isMobile ? "default" : "lg"}
              onClick={() => navigate("/self-study")}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Self Study
            </Button>
            <Button 
              variant="outline" 
              size={isMobile ? "default" : "lg"}
              onClick={() => navigate("/classroom")}
              className="gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              Classroom
            </Button>
            <Button
              variant="outline" 
              size={isMobile ? "default" : "lg"}
              onClick={() => toast({
                title: "Study Tip",
                description: getRandomTip(),
              })}
            >
              Get Study Tips
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="text-primary" />
          Study Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.slice(0, 3).map((feature) => (
            <Card 
              key={feature.path}
              className={`border border-border ${feature.borderColor} border-t-4 bg-card hover:border-primary/30 transition-all duration-200 cursor-pointer overflow-hidden relative shadow-sm`}
              onClick={() => navigate(feature.path)}
            >
              <div className="p-4 md:p-6">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-3 md:mb-4`}>
                  <feature.icon className={`${feature.color}`} size={isMobile ? 20 : 24} />
                </div>
                <h3 className="text-md md:text-lg font-medium mb-1 md:mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
              <div className="px-4 md:px-6 py-3 md:py-4 border-t border-border bg-muted/30">
                <Button variant="ghost" size={isMobile ? "sm" : "default"} className="w-full justify-start text-sm">
                  Open {feature.title}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Classroom Tools */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <GraduationCap className="text-primary" />
          Classroom Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.slice(3).map((feature) => (
            <Card 
              key={feature.path}
              className={`border border-border ${feature.borderColor} border-t-4 bg-card hover:border-primary/30 transition-all duration-200 cursor-pointer overflow-hidden relative shadow-sm`}
              onClick={() => navigate(feature.path)}
            >
              <div className="p-4 md:p-6">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-3 md:mb-4`}>
                  <feature.icon className={`${feature.color}`} size={isMobile ? 20 : 24} />
                </div>
                <h3 className="text-md md:text-lg font-medium mb-1 md:mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
              <div className="px-4 md:px-6 py-3 md:py-4 border-t border-border bg-muted/30">
                <Button variant="ghost" size={isMobile ? "sm" : "default"} className="w-full justify-start text-sm">
                  Open {feature.title}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 md:mt-16 text-center text-sm text-muted-foreground">
        <p className="mb-1">Made for students, by students</p>
        <p>© {new Date().getFullYear()} Study Assistant</p>
      </div>
    </div>
  );
};

export default Index;
