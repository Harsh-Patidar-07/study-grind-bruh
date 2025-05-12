
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { MessageSquare, Send, User, AlertCircle, Hash, Plus } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isTeacher: boolean;
}

interface Channel {
  id: string;
  name: string;
  isTeacher: boolean;
}

// Dummy data
const initialMessages: Record<string, Message[]> = {
  "general": [
    {
      id: "1",
      sender: "Ms. Johnson",
      content: "Remember that your group projects are due this Friday! No excuses this time, Tyler 👀",
      timestamp: new Date(Date.now() - 86400000),
      isTeacher: true,
    },
    {
      id: "2",
      sender: "Alex",
      content: "Wait what project? I literally have no idea what you're talking about 💀",
      timestamp: new Date(Date.now() - 76400000),
      isTeacher: false,
    },
    {
      id: "3",
      sender: "Tyler",
      content: "I'm working on it! My dog ate my first draft Ms. J",
      timestamp: new Date(Date.now() - 66400000),
      isTeacher: false,
    },
    {
      id: "4",
      sender: "Ms. Johnson",
      content: "You don't have a dog Tyler, you made a presentation about not having pets last semester",
      timestamp: new Date(Date.now() - 56400000),
      isTeacher: true,
    },
    {
      id: "5",
      sender: "Tyler",
      content: "uhhh I adopted one... yesterday 😅",
      timestamp: new Date(Date.now() - 46400000),
      isTeacher: false,
    },
  ],
  "homework-help": [
    {
      id: "1",
      sender: "Jamie",
      content: "Can someone explain question 3 on the math worksheet? I'm so confused 😭",
      timestamp: new Date(Date.now() - 36400000),
      isTeacher: false,
    },
    {
      id: "2",
      sender: "Quinn",
      content: "It's literally the example from class but with different numbers...",
      timestamp: new Date(Date.now() - 26400000),
      isTeacher: false,
    },
    {
      id: "3",
      sender: "Jamie",
      content: "Wait we had class yesterday? I thought it was canceled",
      timestamp: new Date(Date.now() - 16400000),
      isTeacher: false,
    },
  ],
  "mr-petersen": [
    {
      id: "1",
      sender: "Mr. Petersen",
      content: "Welcome to the History channel! Feel free to ask questions about the upcoming test on Ancient Rome.",
      timestamp: new Date(Date.now() - 106400000),
      isTeacher: true,
    },
    {
      id: "2",
      sender: "Mr. Petersen",
      content: "Don't forget that the test will cover chapters 5-8!",
      timestamp: new Date(Date.now() - 96400000),
      isTeacher: true,
    },
  ],
};

const initialChannels: Channel[] = [
  { id: "general", name: "General", isTeacher: false },
  { id: "homework-help", name: "Homework Help", isTeacher: false },
  { id: "mr-petersen", name: "Mr. Petersen", isTeacher: true },
];

// Funny responses for when teachers are offline
const teacherOfflineResponses = [
  "Mr. Petersen is probably grading papers and crying right now",
  "Teachers have lives too (shocking, I know)",
  "They're in the teacher's lounge talking about you",
  "Left on read, just like your college applications",
  "Your teacher is offline, just like your motivation",
  "They're ignoring you on purpose, bestie",
  "Even teachers need mental health days from y'all",
];

const ChatSystem = () => {
  const { toast } = useToast();
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentChannel, setCurrentChannel] = useState('general');
  const [newChannelName, setNewChannelName] = useState('');
  const [activeTab, setActiveTab] = useState<'channels' | 'dms'>('channels');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, currentChannel]);

  const sendMessage = () => {
    if (currentMessage.trim() === '') return;
    
    const currentChannelObj = channels.find(ch => ch.id === currentChannel);
    
    if (currentChannelObj?.isTeacher) {
      // It's a teacher channel, show offline message
      const offlineMessage = teacherOfflineResponses[Math.floor(Math.random() * teacherOfflineResponses.length)];
      toast({
        title: "Teacher Offline",
        description: offlineMessage,
      });
      
      // Still add the message to the chat
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: currentMessage,
        timestamp: new Date(),
        isTeacher: false,
      };
      
      setMessages(prev => ({
        ...prev,
        [currentChannel]: [...(prev[currentChannel] || []), newMessage],
      }));
      
      // 50% chance to get a teacher response after a delay
      if (Math.random() > 0.5) {
        setTimeout(() => {
          const teacherName = currentChannelObj.name;
          const teacherResponses = [
            "I'll address this in class tomorrow.",
            "Please check the syllabus before asking questions.",
            "This has already been covered in lecture.",
            "You should know this from your reading.",
            "I'm marking this as your participation for today.",
            "The answer is in your textbook, page 42.",
          ];
          
          const responseMessage: Message = {
            id: Date.now().toString(),
            sender: teacherName,
            content: teacherResponses[Math.floor(Math.random() * teacherResponses.length)],
            timestamp: new Date(),
            isTeacher: true,
          };
          
          setMessages(prev => ({
            ...prev,
            [currentChannel]: [...(prev[currentChannel] || []), responseMessage],
          }));
          
          toast({
            title: `${teacherName} responded!`,
            description: "They actually replied... are they okay?",
          });
        }, Math.random() * 5000 + 2000); // Random delay between 2-7 seconds
      }
    } else {
      // Regular channel message
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: currentMessage,
        timestamp: new Date(),
        isTeacher: false,
      };
      
      setMessages(prev => ({
        ...prev,
        [currentChannel]: [...(prev[currentChannel] || []), newMessage],
      }));
      
      // Random chance for a funny auto-response
      if (Math.random() > 0.7) {
        const autoResponders = ["Aiden", "Taylor", "Riley", "Jordan", "Alex"];
        const autoResponses = [
          "no thoughts, just vibes",
          "me when I'm in a not paying attention competition and my opponent is everyone in this chat",
          "my braincells left the chat fr",
          "I'm just here so I don't get marked absent",
          "*crickets*",
          "bestie I'm scared too",
          "not me thinking about dropping this class 🙂",
          "let's just collectively agree to fail together",
        ];
        
        setTimeout(() => {
          const autoResponse: Message = {
            id: Date.now().toString(),
            sender: autoResponders[Math.floor(Math.random() * autoResponders.length)],
            content: autoResponses[Math.floor(Math.random() * autoResponses.length)],
            timestamp: new Date(),
            isTeacher: false,
          };
          
          setMessages(prev => ({
            ...prev,
            [currentChannel]: [...(prev[currentChannel] || []), autoResponse],
          }));
        }, Math.random() * 4000 + 1000);
      }
    }
    
    setCurrentMessage('');
  };
  
  const createChannel = () => {
    if (newChannelName.trim() === '') return;
    
    const channelId = newChannelName.toLowerCase().replace(/\s+/g, '-');
    
    if (channels.some(ch => ch.id === channelId)) {
      toast({
        title: "Channel Exists",
        description: "This channel already exists. Be more creative, bestie.",
        variant: "destructive",
      });
      return;
    }
    
    const newChannel: Channel = {
      id: channelId,
      name: newChannelName,
      isTeacher: false,
    };
    
    setChannels([...channels, newChannel]);
    setNewChannelName('');
    setCurrentChannel(channelId);
    
    toast({
      title: "Channel Created",
      description: `'${newChannelName}' created. Try not to be cringe in there.`,
    });
  };
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };
  
  return (
    <div className="h-[calc(100vh-180px)] flex flex-col bg-card rounded-lg border border-border overflow-hidden">
      <div className="flex border-b border-border">
        <Tabs defaultValue="channels" className="flex-1" onValueChange={(v) => setActiveTab(v as 'channels' | 'dms')}>
          <TabsList className="grid grid-cols-2 bg-transparent">
            <TabsTrigger value="channels" className="data-[state=active]:bg-muted">Channels</TabsTrigger>
            <TabsTrigger value="dms" className="data-[state=active]:bg-muted">DMs</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-64 border-r border-border flex flex-col">
          {activeTab === 'channels' ? (
            <>
              <div className="p-4 flex items-center justify-between border-b border-border">
                <h3 className="font-medium">Channels</h3>
                <Button variant="ghost" size="icon" onClick={() => setNewChannelName('New Channel')}>
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="overflow-y-auto flex-1">
                {channels.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setCurrentChannel(channel.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 flex items-center gap-3 transition-colors",
                      currentChannel === channel.id
                        ? "bg-genz-purple/10 text-genz-purple"
                        : "hover:bg-muted"
                    )}
                  >
                    {channel.isTeacher ? (
                      <User size={18} className="text-muted-foreground" />
                    ) : (
                      <Hash size={18} className="text-muted-foreground" />
                    )}
                    <span>{channel.name}</span>
                    {channel.isTeacher && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-red-500"></span>
                    )}
                  </button>
                ))}
              </div>
              
              {newChannelName && (
                <div className="p-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Input
                      value={newChannelName}
                      onChange={(e) => setNewChannelName(e.target.value)}
                      className="flex-1 h-8 text-sm"
                      placeholder="Channel name"
                      onKeyDown={(e) => e.key === 'Enter' && createChannel()}
                    />
                    <Button size="sm" onClick={createChannel} className="h-8 px-2">
                      Create
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="p-4 border-b border-border">
                <h3 className="font-medium">Direct Messages</h3>
              </div>
              
              <div className="flex-1 flex items-center justify-center text-muted-foreground p-4 text-center">
                <div>
                  <p>No friends available</p>
                  <p className="text-xs mt-1">Typical student moment</p>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              {channels.find(ch => ch.id === currentChannel)?.isTeacher ? (
                <User size={20} className="text-muted-foreground" />
              ) : (
                <Hash size={20} className="text-muted-foreground" />
              )}
              <h3 className="font-medium">
                {channels.find(ch => ch.id === currentChannel)?.name || currentChannel}
              </h3>
            </div>
            <div className="text-xs text-muted-foreground">
              {messages[currentChannel]?.length || 0} messages
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {(!messages[currentChannel] || messages[currentChannel].length === 0) && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <AlertCircle size={40} className="mb-2" />
                <p>No messages here yet</p>
                <p className="text-xs">Be the first to say something random</p>
              </div>
            )}
            
            {messages[currentChannel]?.map((message) => (
              <div key={message.id} className="flex gap-3 group">
                <div className="w-8 h-8 rounded-full flex-shrink-0 bg-muted flex items-center justify-center">
                  {message.isTeacher ? (
                    <User size={14} />
                  ) : (
                    <span className="font-medium text-sm">{message.sender.charAt(0)}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-medium text-sm",
                      message.isTeacher && "text-genz-orange"
                    )}>
                      {message.sender}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  
                  <div className="mt-1">
                    {message.content}
                  </div>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <span className="text-xs">👍</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <span className="text-xs">💀</span>
                  </Button>
                </div>
              </div>
            ))}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                className="flex-1"
                placeholder={`Message ${channels.find(ch => ch.id === currentChannel)?.name || currentChannel}...`}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage} size="icon" disabled={currentMessage.trim() === ''}>
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem;
