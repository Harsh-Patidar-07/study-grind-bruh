import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedCard } from "@/components/ui/animated-card";
import { GlowHoverCard } from "@/components/ui/glow-hover-card";
import { GlowCursor } from "@/components/ui/glow-cursor";
import { Clock, ListChecks, MessageSquare, Upload, BellRing, FileSearch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const features = [
    {
      title: "Pomodoro Timer",
      description: "Set timers and get sassed by your app when time's up",
      icon: Clock,
      path: "/pomodoro",
      color: "text-genz-purple",
      bgColor: "bg-genz-purple/10",
      gradientFrom: "#9B87F5",
      gradientTo: "#FF7AAC"
    },
    {
      title: "To-Do List",
      description: "Track tasks you'll probably never complete",
      icon: ListChecks,
      path: "/todo",
      color: "text-genz-green",
      bgColor: "bg-genz-green/10",
      gradientFrom: "#4EE19B",
      gradientTo: "#7E69AB"
    },
    {
      title: "Discord But Dumber",
      description: "Chat with classmates with 100% more meme potential",
      icon: MessageSquare,
      path: "/chat",
      color: "text-genz-blue",
      bgColor: "bg-genz-blue/10",
      gradientFrom: "#7E69AB",
      gradientTo: "#FF965B"
    },
    {
      title: "Broke Kids' Dropbox",
      description: "Share notes without sharing your credit card info",
      icon: Upload,
      path: "/notes",
      color: "text-genz-orange",
      bgColor: "bg-genz-orange/10",
      gradientFrom: "#FF965B",
      gradientTo: "#9B87F5"
    },
    {
      title: "Announcement Feed",
      description: "School news & memes: mostly memes tbh",
      icon: BellRing,
      path: "/announcements",
      color: "text-genz-pink",
      bgColor: "bg-genz-pink/10",
      gradientFrom: "#FF7AAC",
      gradientTo: "#4EE19B"
    },
    {
      title: "Study Sources",
      description: "Find free resources because we know you're broke",
      icon: FileSearch,
      path: "/study-sources",
      color: "text-genz-purple",
      bgColor: "bg-genz-purple/10",
      gradientFrom: "#9B87F5",
      gradientTo: "#FF965B"
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
    <div className="min-h-screen relative">
      {/* Background pattern */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundPosition: '-5px -5px'
        }}
      />
      
      {/* Glow cursor effect */}
      <GlowCursor />
      
      {/* Content */}
      <div className="container py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 mt-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-genz-purple to-genz-pink bg-clip-text text-transparent">
            StudyBST
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            The educational app that roasts you while helping you graduate. Barely.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate("/pomodoro")}
              className="animate-pulse-glow"
            >
              Start Studying
            </Button>
            <Button 
              variant="outline" 
              size="lg"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            // Use GlowHoverCard for the first two features
            if (index < 2) {
              return (
                <GlowHoverCard 
                  key={feature.path}
                  className="cursor-pointer"
                  onClick={() => navigate(feature.path)}
                  gradientFrom={feature.gradientFrom}
                  gradientTo={feature.gradientTo}
                >
                  <div className="flex-1">
                    <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <feature.icon className={`${feature.color}`} size={24} />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-white">{feature.title}</h3>
                    <p className="text-white/90">{feature.description}</p>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10">
                      Open {feature.title}
                    </Button>
                  </div>
                </GlowHoverCard>
              );
            }
            
            // Use AnimatedCard for the rest
            return (
              <AnimatedCard 
                key={feature.path}
                className="cursor-pointer"
                onClick={() => navigate(feature.path)}
                gradientFrom={feature.gradientFrom}
                gradientTo={feature.gradientTo}
              >
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`${feature.color}`} size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-white">{feature.title}</h3>
                  <p className="text-white/90">{feature.description}</p>
                </div>
                <div className="px-6 py-4 border-t border-white/10 bg-white/5">
                  <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-white/10">
                    Open {feature.title}
                  </Button>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-white/70">
          <p className="mb-1">Made with 😭 during finals week</p>
          <p>© {new Date().getFullYear()} StudyBST - Helping students pretend to be productive since yesterday</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
