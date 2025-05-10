
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BellRing, Calendar, ChevronDown, Filter, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  course: string;
  date: Date;
  pinned: boolean;
  type: 'info' | 'alert' | 'success' | 'meme';
}

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Midterm Exam Postponed',
    content: 'The midterm exam scheduled for next Friday has been postponed to the following Monday. You have more time to pretend you're going to study! 📚',
    author: 'Prof. Martinez',
    course: 'Advanced Biology',
    date: new Date('2025-05-05T10:30:00'),
    pinned: true,
    type: 'success',
  },
  {
    id: '2',
    title: 'Group Project Deadline Extended',
    content: 'Due to multiple complaints about "not having enough time" (as if you weren\'t just watching Netflix), the group project deadline has been extended by one week. You\'re welcome. 🙄',
    author: 'Dr. Johnson',
    course: 'Economics 101',
    date: new Date('2025-05-04T14:15:00'),
    pinned: true,
    type: 'info',
  },
  {
    id: '3',
    title: 'Pop Quiz Tomorrow',
    content: 'There will be a surprise pop quiz tomorrow. Wait, is it still a surprise if I\'m announcing it? Whatever, come prepared! 📝',
    author: 'Ms. Williams',
    course: 'World History',
    date: new Date('2025-05-03T09:45:00'),
    pinned: false,
    type: 'alert',
  },
  {
    id: '4',
    title: 'Text detected in your principal\'s search history:',
    content: 'LEAKED 🚨 Your principal\'s search history:\n- "how to look cool to teenagers"\n- "what is a TikTok"\n- "why do students hate mandatory fun"\n- "teacher resignation rates 2025"\n\njk this is a meme 😇',
    author: 'Student Council',
    course: 'School-Wide',
    date: new Date('2025-05-02T11:20:00'),
    pinned: false,
    type: 'meme',
  },
  {
    id: '5',
    title: 'Library Hours Extended',
    content: 'The library will now be open until 10 PM on weekdays. Perfect for pretending to study while actually watching YouTube videos for 4 hours straight.',
    author: 'Library Staff',
    course: 'School-Wide',
    date: new Date('2025-05-01T16:00:00'),
    pinned: false,
    type: 'info',
  },
  {
    id: '6',
    title: 'Campus Wi-Fi Password Change',
    content: 'The campus Wi-Fi password will be changing next week. New password: "WeCanSeeYourSearchHistory2025". Just kidding, it\'s "Campus2025".',
    author: 'IT Department',
    course: 'School-Wide',
    date: new Date('2025-04-30T13:10:00'),
    pinned: false,
    type: 'info',
  },
];

const AnnouncementsPage = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const courses = Array.from(new Set(announcements.map((a) => a.course)));
  
  const filteredAnnouncements = announcements.filter((announcement) => {
    if (!filter) return true;
    return announcement.course === filter;
  });
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-500';
      case 'alert':
        return 'bg-amber-500';
      case 'success':
        return 'bg-green-500';
      case 'meme':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'info':
        return 'Info';
      case 'alert':
        return 'Alert';
      case 'success':
        return 'Good News';
      case 'meme':
        return 'Meme';
      default:
        return 'Notice';
    }
  };
  
  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3 text-glow">Announcements</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          School news, updates, and memes. Try to pretend you care.
        </p>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <BellRing className="text-muted-foreground" size={18} />
          <h2 className="text-xl font-medium">Latest Announcements</h2>
        </div>
        
        <div className="flex flex-col w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            <span>{filter || 'All Courses'}</span>
            <ChevronDown size={16} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
          
          {showFilters && (
            <Card className="mt-2 p-2 absolute bg-card z-10">
              <div className="space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setFilter(null);
                    setShowFilters(false);
                  }}
                >
                  All Courses
                </Button>
                
                {courses.map((course) => (
                  <Button
                    key={course}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => {
                      setFilter(course);
                      setShowFilters(false);
                    }}
                  >
                    {course}
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12">
            <BellRing size={48} className="mx-auto mb-4 text-muted-foreground opacity-30" />
            <h3 className="text-xl font-medium mb-2">No Announcements</h3>
            <p className="text-muted-foreground">
              There are no announcements for this filter. Lucky you.
            </p>
          </div>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <div 
              key={announcement.id}
              className={cn(
                "border rounded-lg p-4 transition-all",
                announcement.pinned 
                  ? "border-genz-purple/50 bg-genz-purple/5" 
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${getTypeColor(announcement.type)}`}></div>
                    <Badge variant="outline" className="text-xs">
                      {getTypeLabel(announcement.type)}
                    </Badge>
                    {announcement.pinned && (
                      <Badge className="bg-genz-purple text-xs">
                        Pinned
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-medium">{announcement.title}</h3>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                    <span>{announcement.author}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                    <span>{announcement.course}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>{formatDate(announcement.date)}</span>
                </div>
              </div>
              
              <div className="text-sm whitespace-pre-line">
                {announcement.content}
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  <MessageCircle size={14} />
                  <span>Comment</span>
                </Button>
                
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="text-xs">
                    👍 {Math.floor(Math.random() * 50) + 1}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    🔥 {Math.floor(Math.random() * 30) + 1}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    💀 {Math.floor(Math.random() * 20) + 1}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
