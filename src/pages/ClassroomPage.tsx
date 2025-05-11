
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  MessageSquare, 
  Upload, 
  BellRing, 
  Plus, 
  Lock, 
  ArrowRight,
  Copy,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import ChatRoom from "@/components/ChatRoom";

const dummyClasses = [
  {
    id: "c1",
    name: "Advanced Memes 101",
    code: "MEME101",
    teacher: "Prof. TikTok",
    students: 42,
    announcements: 5,
    notes: 3,
    active: true,
  },
  {
    id: "c2",
    name: "Sleep Procrastination",
    code: "SLEEP404",
    teacher: "Dr. Insomnia",
    students: 28,
    announcements: 2,
    notes: 1,
    active: true,
  },
  {
    id: "c3", 
    name: "Advanced Caffeination",
    code: "COFF333",
    teacher: "Prof. Starbucks",
    students: 36, 
    announcements: 1,
    notes: 4,
    active: false,
  }
];

const dummyNotes = [
  {
    id: "n1",
    title: "Chapter 1: Intro to Memes",
    description: "The evolution of memes from Rage Comics to TikTok",
    author: "Prof. TikTok",
    date: new Date("2025-04-28"),
    class: "Advanced Memes 101",
    downloads: 37,
  },
  {
    id: "n2",
    title: "Important Formulas",
    description: "All the formulas you'll need for the final but still fail",
    author: "Sarah L.",
    date: new Date("2025-05-01"),
    class: "Advanced Memes 101",
    downloads: 52,
  },
  {
    id: "n3",
    title: "Sleep Cycle Analysis",
    description: "Why you're always tired despite sleeping 12 hours",
    author: "Dr. Insomnia",
    date: new Date("2025-04-22"),
    class: "Sleep Procrastination",
    downloads: 19,
  }
];

const ClassroomPage = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [classTab, setClassTab] = useState("chat");
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [openCollapsible, setOpenCollapsible] = useState<string | null>("c1");
  
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const handleSelectClass = (classId: string) => {
    setSelectedClass(classId);
    setClassTab("chat");
  };
  
  const handleJoinClass = () => {
    setIsJoining(true);
    setJoinError(null);
    
    // Simulate checking the code
    setTimeout(() => {
      if (dummyClasses.some(c => c.code === joinCode)) {
        toast({
          title: "Class Joined!",
          description: "You've joined the class. Try not to fall asleep.",
          variant: "default",
        });
        setJoinCode("");
        setIsJoining(false);
      } else {
        setJoinError("Invalid class code. Try MEME101 or SLEEP404.");
        setIsJoining(false);
      }
    }, 1000);
  };
  
  const copyClassCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      description: `Class code ${code} copied to clipboard!`,
    });
  };
  
  // Render the selected class content or the class list
  const renderContent = () => {
    if (selectedClass && activeTab === "classes") {
      const classData = dummyClasses.find(c => c.id === selectedClass);
      if (!classData) return null;
      
      return (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedClass(null)}
              className="gap-1"
            >
              <ArrowRight className="rotate-180" size={16} />
              <span>Back</span>
            </Button>
            <h2 className="text-xl font-medium">{classData.name}</h2>
            {classData.active ? (
              <Badge className="bg-green-500">Active</Badge>
            ) : (
              <Badge variant="outline" className="text-yellow-500">Inactive</Badge>
            )}
          </div>
          
          <Tabs value={classTab} onValueChange={setClassTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageSquare size={14} />
                <span className={isMobile ? "sr-only" : ""}>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-1">
                <Upload size={14} />
                <span className={isMobile ? "sr-only" : ""}>Notes</span>
              </TabsTrigger>
              <TabsTrigger value="announcements" className="flex items-center gap-1">
                <BellRing size={14} />
                <span className={isMobile ? "sr-only" : ""}>Announcements</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <ChatRoom className="chat-theme-purple" />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="mt-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Class Notes</h3>
                    <Button size="sm" className="gap-1">
                      <Upload size={14} />
                      <span>Upload</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {dummyNotes
                      .filter(note => note.class === classData.name)
                      .map(note => (
                        <div 
                          key={note.id}
                          className="border rounded-lg p-3 hover:border-genz-purple/40 transition-all"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{note.title}</h4>
                              <p className="text-sm text-muted-foreground">{note.description}</p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <span>{note.author}</span>
                                <span>·</span>
                                <span>{note.date.toLocaleDateString()}</span>
                                <span>·</span>
                                <span>{note.downloads} downloads</span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">Download</Button>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="announcements" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Announcements</h3>
                      <Badge>{classData.announcements}</Badge>
                    </div>
                    
                    {/* Placeholder for actual announcements */}
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium">Midterm Postponed</h4>
                      <p className="text-sm mt-1">
                        The midterm is postponed because I forgot to write it. You're welcome.
                      </p>
                      <div className="text-xs text-muted-foreground mt-2">
                        Posted 2 days ago
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <h4 className="font-medium">Group Project Reminder</h4>
                      <p className="text-sm mt-1">
                        Remember your group projects are due next week. Start panicking now.
                      </p>
                      <div className="text-xs text-muted-foreground mt-2">
                        Posted 1 week ago
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      );
    }
    
    // Show class list if no class is selected
    return (
      <div className="space-y-3">
        {dummyClasses.map((classItem) => (
          <Collapsible
            key={classItem.id}
            open={openCollapsible === classItem.id}
            onOpenChange={() => setOpenCollapsible(openCollapsible === classItem.id ? null : classItem.id)}
          >
            <Card className={`hover:border-genz-purple/40 transition-all ${openCollapsible === classItem.id ? 'border-genz-purple/40' : ''}`}>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${classItem.active ? 'text-genz-purple' : 'text-muted-foreground'}`}>
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{classItem.name}</h3>
                      <div className="text-xs text-muted-foreground">
                        {classItem.teacher} • {classItem.students} students
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSelectClass(classItem.id)}
                    >
                      Enter
                    </Button>
                    
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {openCollapsible === classItem.id ? "Less" : "More"}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                
                <CollapsibleContent className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Lock size={14} className="text-muted-foreground" />
                      <span>Class Code:</span>
                      <span className="font-medium">{classItem.code}</span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8"
                      onClick={() => copyClassCode(classItem.code)}
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-muted/30 p-3 rounded-lg flex flex-col items-center">
                      <MessageSquare size={18} className="mb-1 text-genz-blue" />
                      <span className="text-xs">Chat</span>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg flex flex-col items-center">
                      <Upload size={18} className="mb-1 text-genz-green" />
                      <span className="text-xs">{classItem.notes} Notes</span>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg flex flex-col items-center">
                      <BellRing size={18} className="mb-1 text-genz-pink" />
                      <span className="text-xs">{classItem.announcements} Updates</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Card>
          </Collapsible>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-4 md:py-8 px-3 md:px-8 max-w-5xl">
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-glow">Classroom</h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
          Where education meets sleep deprivation. Find your classes here.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-xs">
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <Users size={16} />
              <span>{isMobile ? "" : "My Classes"}</span>
            </TabsTrigger>
            <TabsTrigger value="join" className="flex items-center gap-2">
              <Plus size={16} />
              <span>{isMobile ? "" : "Join Class"}</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="classes" className="mt-0">
          {selectedClass === null && (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">My Classes</h2>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1">
                    <Plus size={14} />
                    <span>Create</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a New Class</DialogTitle>
                    <DialogDescription>
                      Create a new class and share the code with your students.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Class Name</label>
                      <Input placeholder="Enter class name..." />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input placeholder="Enter subject..." />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit">Create Class</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
          
          {renderContent()}
        </TabsContent>
        
        <TabsContent value="join" className="mt-0">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4 text-center">Join a Class</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="classCode" className="text-sm font-medium">
                    Class Code
                  </label>
                  <Input
                    id="classCode"
                    placeholder="Enter class code... (try MEME101)"
                    value={joinCode}
                    onChange={(e) => {
                      setJoinCode(e.target.value.toUpperCase());
                      setJoinError(null);
                    }}
                  />
                  {joinError && (
                    <div className="flex items-center gap-2 text-xs text-red-500 mt-1">
                      <XCircle size={12} />
                      <span>{joinError}</span>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleJoinClass} 
                  className="w-full"
                  disabled={isJoining || !joinCode}
                >
                  {isJoining ? "Joining..." : "Join Class"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Ask your teacher for the class code
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassroomPage;
