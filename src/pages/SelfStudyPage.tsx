
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  ListChecks, 
  Search, 
  BookOpen, 
  ArrowRight, 
  Youtube, 
  FileText, 
  Globe 
} from 'lucide-react';
import PomodoroTimer from '@/components/PomodoroTimer';
import TodoList from '@/components/TodoList';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const studyResources = [
  {
    title: "Khan Academy Calculus Course",
    description: "Free calculus lessons that won't make you cry... well, maybe a little.",
    url: "https://www.khanacademy.org/math/calculus-1",
    type: "website",
    subject: "Math",
  },
  {
    title: "3Blue1Brown Linear Algebra",
    description: "Visual explanations that actually make sense for once.",
    url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
    type: "video",
    subject: "Math",
  },
  {
    title: "MIT OpenCourseWare Physics",
    description: "Pretend you got into MIT from the comfort of your bed.",
    url: "https://ocw.mit.edu/courses/physics/",
    type: "website",
    subject: "Physics",
  },
  {
    title: "Crash Course World History",
    description: "History but make it actually interesting and fast.",
    url: "https://www.youtube.com/playlist?list=PLBDA2E52FB1EF80C9",
    type: "video",
    subject: "History",
  },
  {
    title: "AP Biology PDF Notes",
    description: "Saved by students who actually took good notes (not you).",
    url: "#",
    type: "pdf",
    subject: "Biology",
  },
  {
    title: "Codecademy Python Course",
    description: "Learn to code and explain it to your grandma after.",
    url: "https://www.codecademy.com/learn/learn-python",
    type: "website",
    subject: "Computer Science",
  },
];

const motivationalQuotes = [
  "Study like you're trying to impress your FBI agent watching through your webcam.",
  "If you can scroll TikTok for 3 hours, you can study for 30 minutes.",
  "Your future self is begging you to close Instagram right now.",
  "Education is expensive, but so is being stuck with your parents forever.",
  "This is your sign to stop procrastinating, bestie.",
  "Time you enjoy wasting isn't wasted, but this definitely is.",
  "Study now or have a breakdown later, your choice.",
  "Manifesting an A+ won't work if you don't study.",
];

const SelfStudyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("timer");
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const filteredResources = studyResources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getRandomQuote = () => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  };
  
  const showMotivation = () => {
    toast({
      description: getRandomQuote(),
    });
  };
  
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Youtube className="text-red-500" size={16} />;
      case 'pdf':
        return <FileText className="text-blue-500" size={16} />;
      case 'website':
        return <Globe className="text-green-500" size={16} />;
      default:
        return <BookOpen className="text-yellow-500" size={16} />;
    }
  };

  return (
    <div className="container py-4 md:py-8 px-3 md:px-8 max-w-5xl">
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-glow">Self Study</h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
          Time to pretend you're studying when we all know you're just here for the memes.
        </p>
        
        <Button 
          onClick={showMotivation}
          variant="ghost" 
          className="mt-2 text-xs md:text-sm"
        >
          Need motivation?
        </Button>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Clock size={16} />
              <span className={isMobile ? "sr-only" : ""}>Timer</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ListChecks size={16} />
              <span className={isMobile ? "sr-only" : ""}>Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Search size={16} />
              <span className={isMobile ? "sr-only" : ""}>Resources</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="timer" className="mt-0">
          <div className="max-w-md mx-auto">
            <PomodoroTimer />
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-0">
          <div className="card-genz max-w-md mx-auto">
            <TodoList />
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="mt-0">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Input
                placeholder="Search for study resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-genz"
              />
            </div>
            
            <div className="space-y-3">
              {filteredResources.length === 0 ? (
                <div className="text-center py-10">
                  <BookOpen size={40} className="mx-auto mb-3 text-muted-foreground opacity-40" />
                  <p className="text-muted-foreground">No resources found. Just like your motivation.</p>
                </div>
              ) : (
                filteredResources.map((resource, index) => (
                  <Card key={index} className="overflow-hidden hover:border-genz-purple/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 bg-muted/30 p-2 rounded-full">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs bg-genz-purple/20 text-genz-purple px-2 py-1 rounded">
                              {resource.subject}
                            </span>
                            
                            <Button size="sm" variant="ghost" className="text-xs gap-1">
                              <span>Open</span>
                              <ArrowRight size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SelfStudyPage;
