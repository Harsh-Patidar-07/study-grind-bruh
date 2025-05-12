import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  text: string;
  sender: string;
  role: 'student' | 'teacher';
  timestamp: Date;
}

interface ChatRoomProps {
  className?: string;
}

const dummyChatMessages: ChatMessage[] = [
  {
    id: 'm1',
    text: "Welcome to the class chat! Don't forget your assignment due tomorrow.",
    sender: "Prof. TikTok",
    role: "teacher",
    timestamp: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    id: 'm2',
    text: "Wait, what assignment?! 😳",
    sender: "Panic Pete",
    role: "student",
    timestamp: new Date(Date.now() - 82800000) // 23 hours ago
  },
  {
    id: 'm3',
    text: "The one that's worth 30% of your grade that I mentioned on day one when no one was listening.",
    sender: "Prof. TikTok",
    role: "teacher",
    timestamp: new Date(Date.now() - 82700000)
  },
  {
    id: 'm4',
    text: "Can we get an extension?",
    sender: "Deadline Dan",
    role: "student",
    timestamp: new Date(Date.now() - 43200000) // 12 hours ago
  },
  {
    id: 'm5',
    text: "Did anyone actually start it yet? I'm so lost rn",
    sender: "Last Minute Lucy",
    role: "student",
    timestamp: new Date(Date.now() - 21600000) // 6 hours ago
  },
  {
    id: 'm6',
    text: "I'll give an extension if everyone admits they procrastinated.",
    sender: "Prof. TikTok",
    role: "teacher",
    timestamp: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    id: 'm7',
    text: "I totally procrastinated 🫠",
    sender: "Honest Hank",
    role: "student",
    timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
  },
];

const funnyResponses = [
  "Your professor will remember that.",
  "Everyone saw you send that.",
  "Screenshot taken by 5 students.",
  "That's definitely going in the class group chat.",
  "Autocorrect won't save you this time.",
  "Message received... Unfortunately.",
  "Weird message but ok.",
  "This will be discussed in your annual review.",
];

const ChatRoom: React.FC<ChatRoomProps> = ({ className }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(dummyChatMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "You",
      role: "student",
      timestamp: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Add a "teacher" message sometimes for fun
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const responseMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: funnyResponses[Math.floor(Math.random() * funnyResponses.length)],
          sender: "Prof. TikTok",
          role: "teacher",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 1000);
    }
  };

  return (
    <div className={cn("flex flex-col h-[500px]", className)}>
      <div className="flex-1 overflow-y-auto mb-4 pr-2">
        {messages.map(message => (
          <div 
            key={message.id}
            className={cn(
              "mb-4",
              message.sender === "You" ? "text-right" : "text-left"
            )}
          >
            <div className="inline-block max-w-[80%]">
              <div className="flex items-center gap-1 mb-1">
                <div 
                  className={cn(
                    "text-xs font-medium",
                    message.role === "teacher" ? "text-yellow-500" : "text-gray-400"
                  )}
                >
                  {message.sender}
                </div>
                {message.role === "teacher" && (
                  <span className="text-[10px] px-1 bg-yellow-500/20 text-yellow-500 rounded">Teacher</span>
                )}
              </div>
              
              <div 
                className={cn(
                  "p-3 rounded-lg",
                  message.sender === "You" 
                    ? "bg-genz-purple text-white rounded-br-none" 
                    : message.role === "teacher"
                      ? "bg-yellow-500/10 border border-yellow-500/20 text-white rounded-bl-none"
                      : "bg-muted text-foreground rounded-bl-none"
                )}
              >
                {message.text}
              </div>
              
              <div className="text-xs text-muted-foreground mt-1">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2 mt-auto">
        <Button variant="ghost" size="icon" className="flex-shrink-0">
          <Smile size={20} />
        </Button>
        <Input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatRoom;
