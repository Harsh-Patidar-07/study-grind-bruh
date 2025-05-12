
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Upload, Search, FileText, Bookmark, Download, ThumbsUp, Eye, Share2 } from 'lucide-react';

const noteCategories = [
  "Math",
  "Science",
  "History",
  "English",
  "Computer Science",
  "Physics",
  "Languages"
];

interface NoteCard {
  id: string;
  title: string;
  subject: string;
  author: string;
  likes: number;
  views: number;
  preview: string;
  fileName: string;
}

const popularNotes: NoteCard[] = [
  {
    id: "1",
    title: "Calculus Crash Course",
    subject: "Math",
    author: "MathWizard99",
    likes: 423,
    views: 1289,
    preview: "Everything you need to know about derivatives, integrals, and why your professor hates you.",
    fileName: "calculus_notes.pdf"
  },
  {
    id: "2",
    title: "Chemistry Cheat Sheet",
    subject: "Science",
    author: "FailingChemistry101",
    likes: 310,
    views: 982,
    preview: "Periodic table hacks, reaction shortcuts, and how to not blow up the lab.",
    fileName: "chem_cheat_sheet.pdf"
  },
  {
    id: "3",
    title: "History Timeline Dump",
    subject: "History",
    author: "TimeTraveler23",
    likes: 267,
    views: 731,
    preview: "All the dates your teacher expects you to memorize but you won't.",
    fileName: "history_timeline.pdf"
  },
  {
    id: "4",
    title: "Programming for Dummies",
    subject: "Computer Science",
    author: "CodeMonkey",
    likes: 389,
    views: 1105,
    preview: "Java, Python, and why StackOverflow will be your real teacher.",
    fileName: "coding_basics.pdf"
  },
];

const recentNotes: NoteCard[] = [
  {
    id: "5",
    title: "English Lit Essay Templates",
    subject: "English",
    author: "BookWorm22",
    likes: 98,
    views: 302,
    preview: "Copy & paste your way to an A- with these essay frameworks.",
    fileName: "essay_templates.docx"
  },
  {
    id: "6",
    title: "Physics Formula Decoded",
    subject: "Physics",
    author: "NewtonWannabe",
    likes: 124,
    views: 412,
    preview: "Every formula explained so even your pet rock could understand.",
    fileName: "physics_formulas.pdf"
  },
];

const NotesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadFileName, setUploadFileName] = useState("");
  const [uploadSubject, setUploadSubject] = useState("Math");
  
  const handleDownload = (note: NoteCard) => {
    toast({
      title: "Download Started",
      description: `Just kidding, these notes don't actually exist. But good try!`,
    });
  };
  
  const handleUpload = () => {
    if (!uploadFileName.trim()) {
      toast({
        title: "Upload Failed",
        description: "You need to pretend to select a file first",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Upload Successful",
      description: "Your notes have been shared with absolutely no one. Congrats!",
    });
    
    setUploadFileName("");
  };
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Search Results",
      description: `Found 0 results for "${searchQuery}" because this is a demo, bestie`,
    });
  };
  
  const handleBookmark = (note: NoteCard) => {
    toast({
      description: `${note.title} saved to your bookmarks that don't actually exist`,
    });
  };
  
  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3 text-glow">Notes Sharing</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Dropbox for broke kids. Share notes, steal knowledge, ace exams.
        </p>
      </div>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="card-genz">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={18} />
              <span>Upload Notes</span>
            </CardTitle>
            <CardDescription>Help the community, boost your karma, feel superior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Subject</label>
              <select 
                value={uploadSubject}
                onChange={(e) => setUploadSubject(e.target.value)}
                className="w-full input-genz"
              >
                {noteCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">File</label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:bg-muted/10 transition-colors">
                <input 
                  type="text" 
                  value={uploadFileName}
                  onChange={(e) => setUploadFileName(e.target.value)}
                  placeholder="Enter fake file name"
                  className="bg-transparent border-none text-center w-full outline-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Click to pretend to upload a file
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleUpload}>Upload</Button>
          </CardFooter>
        </Card>
        
        {/* Search Section */}
        <Card className="card-genz">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search size={18} />
              <span>Find Notes</span>
            </CardTitle>
            <CardDescription>Because you didn't pay attention in class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="What did you sleep through?"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Filter</label>
              <div className="flex gap-2 flex-wrap">
                {noteCategories.slice(0, 5).map(category => (
                  <Button 
                    key={category} 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSearch} className="w-full">Search</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-10">
        <Tabs defaultValue="popular">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
            </TabsList>
            
            <div className="text-sm text-muted-foreground">
              1,532 notes shared by 409 students
            </div>
          </div>
          
          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularNotes.map(note => (
                <Card key={note.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{note.title}</CardTitle>
                        <CardDescription>{note.subject}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleBookmark(note)}>
                        <Bookmark size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{note.preview}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <ThumbsUp size={12} />
                        <span>{note.likes}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Eye size={12} />
                        <span>{note.views}</span>
                      </div>
                      <div className="text-xs text-muted-foreground ml-auto">
                        by {note.author}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full gap-2">
                      <Button 
                        onClick={() => handleDownload(note)} 
                        className="flex-1 gap-2"
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 size={14} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentNotes.map(note => (
                <Card key={note.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{note.title}</CardTitle>
                        <CardDescription>{note.subject}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleBookmark(note)}>
                        <Bookmark size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{note.preview}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <ThumbsUp size={12} />
                        <span>{note.likes}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Eye size={12} />
                        <span>{note.views}</span>
                      </div>
                      <div className="text-xs text-muted-foreground ml-auto">
                        by {note.author}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full gap-2">
                      <Button 
                        onClick={() => handleDownload(note)} 
                        className="flex-1 gap-2"
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 size={14} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="bookmarked" className="mt-0">
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto mb-4 text-muted-foreground opacity-30" />
              <h3 className="text-xl font-medium mb-2">No Bookmarks Yet</h3>
              <p className="text-muted-foreground">
                You haven't saved any notes. Typical student behavior.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NotesPage;
