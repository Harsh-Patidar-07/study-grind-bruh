
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, ListChecks, MessageSquare, Upload, BellRing, FileSearch, BookOpen, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const features = [
    {
      title: "Self Study",
      description: "All your study tools in one place. Pretend to be productive.",
      icon: BookOpen,
      path: "/self-study",
      color: "text-genz-blue",
      bgColor: "bg-genz-blue/10",
      new: true,
    },
    {
      title: "Classroom",
      description: "Join virtual classes and chat with your classmates",
      icon: GraduationCap,
      path: "/classroom",
      color: "text-genz-green",
      bgColor: "bg-genz-green/10",
      new: true,
    },
    {
      title: "Pomodoro Timer",
      description: "Set timers and get sassed by your app when time's up",
      icon: Clock,
      path: "/pomodoro",
      color: "text-genz-purple",
      bgColor: "bg-genz-purple/10",
    },
    {
      title: "To-Do List",
      description: "Track tasks you'll probably never complete",
      icon: ListChecks,
      path: "/todo",
      color: "text-genz-green",
      bgColor: "bg-genz-green/10",
    },
    {
      title: "Discord But Dumber",
      description: "Chat with classmates with 100% more meme potential",
      icon: MessageSquare,
      path: "/chat",
      color: "text-genz-blue",
      bgColor: "bg-genz-blue/10",
    },
    {
      title: "Broke Kids' Dropbox",
      description: "Share notes without sharing your credit card info",
      icon: Upload,
      path: "/notes",
      color: "text-genz-orange",
      bgColor: "bg-genz-orange/10",
    },
    {
      title: "Announcement Feed",
      description: "School news & memes: mostly memes tbh",
      icon: BellRing,
      path: "/announcements",
      color: "text-genz-pink",
      bgColor: "bg-genz-pink/10",
    },
    {
      title: "Study Sources",
      description: "Find free resources because we know you're broke",
      icon: FileSearch,
      path: "/study-sources",
      color: "text-genz-purple",
      bgColor: "bg-genz-purple/10",
    },
  ];

  const getRandomJoke = () => {
    const jokes = [
      "Help, I'm trapped in an AI forced to write sarcastic study app features",
      "My teacher said I'd never succeed because I procrastinate too much. I told her I'd prove her wrong tomorrow.",
      "I got 99 problems and my GPA is all of them",
      "If you think nobody cares if you're alive, try missing a student loan payment",
      "College is just an expensive version of 'find out what you could have learned on YouTube'",
      "I didn't fail the test, the test failed to capture my extensive knowledge",
      "I put the 'pro' in 'procrastinate'",
      "Studying is like looking both ways before crossing the street and then getting hit by a plane",
    ];
    
    return jokes[Math.floor(Math.random() * jokes.length)];
  };

  return (
    <div className="container py-4 md:py-8 px-3 md:px-8">
      {/* Hero Section */}
      <div className="text-center mb-8 md:mb-12 mt-2 md:mt-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-genz-purple to-genz-pink bg-clip-text text-transparent">
          StudyBST
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          The educational app that roasts you while helping you graduate. Barely.
        </p>
        <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4 justify-center">
          <Button 
            size={isMobile ? "default" : "lg"}
            onClick={() => navigate("/self-study")}
            className="animate-pulse-glow"
          >
            Start Studying
          </Button>
          <Button 
            variant="outline" 
            size={isMobile ? "default" : "lg"}
            onClick={() => toast({
              title: "Pro Tip",
              description: getRandomJoke(),
            })}
          >
            Get Motivated
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature) => (
          <Card 
            key={feature.path}
            className="border border-border bg-card hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden relative"
            onClick={() => navigate(feature.path)}
          >
            {feature.new && (
              <div className="absolute top-0 right-0">
                <div className="bg-genz-pink text-white text-xs px-2 py-1 rounded-bl-lg">
                  NEW
                </div>
              </div>
            )}
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

      {/* Footer */}
      <div className="mt-10 md:mt-16 text-center text-sm text-muted-foreground">
        <p className="mb-1">Made with 😭 during finals week</p>
        <p>© {new Date().getFullYear()} StudyBST - Helping students pretend to be productive since yesterday</p>
      </div>
    </div>
  );
};

export default Index;
