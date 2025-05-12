
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSearch, Search, Youtube, FileText, Globe, BookOpen, ExternalLink, BookmarkPlus, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'video' | 'article' | 'pdf' | 'website';
  provider: string;
  rating: number;
}

// Predefined resources for demo purposes
const mockResources: Record<string, Resource[]> = {
  "calculus": [
    {
      id: "1",
      title: "Calculus Made Easy - Full Course",
      description: "A 12-hour course covering all the basics of differential and integral calculus. Perfect if you skipped all your classes.",
      url: "https://youtu.be/example",
      type: "video",
      provider: "YouTube",
      rating: 4.8,
    },
    {
      id: "2",
      title: "Calculus Cheat Sheet",
      description: "All formulas you need to pretend you understand calculus. Your professor hates this PDF.",
      url: "https://example.com/calculus-cheat-sheet.pdf",
      type: "pdf",
      provider: "MathIsFun",
      rating: 4.9,
    },
    {
      id: "3",
      title: "Visual Guide to Derivatives",
      description: "Explains derivatives with animations for people who are visual learners (aka TikTok brains).",
      url: "https://example.com/visual-calculus",
      type: "website",
      provider: "Khan Academy",
      rating: 4.7,
    },
  ],
  "history": [
    {
      id: "4",
      title: "World War II Explained",
      description: "Everything you need to know about WWII crammed into a 30-minute video. History teachers hate this trick!",
      url: "https://youtu.be/example2",
      type: "video",
      provider: "YouTube",
      rating: 4.6,
    },
    {
      id: "5",
      title: "History Timeline Generator",
      description: "Create perfect history timelines for your assignments without actually understanding history.",
      url: "https://example.com/timeline-generator",
      type: "website",
      provider: "HistoryTools",
      rating: 4.3,
    },
  ],
  "programming": [
    {
      id: "6",
      title: "Learn Python in 10 Minutes",
      description: "The most unrealistic tutorial ever, but you'll click anyway because you're desperate.",
      url: "https://youtu.be/example3",
      type: "video",
      provider: "YouTube",
      rating: 4.4,
    },
    {
      id: "7",
      title: "JavaScript for People Who Hate JavaScript",
      description: "A guide for when your professor forces you to use JS despite your tears.",
      url: "https://example.com/js-guide.pdf",
      type: "pdf",
      provider: "CodeMasters",
      rating: 4.5,
    },
  ],
};

const placeholderSearches = [
  "calculus integration",
  "biology cell structure",
  "shakespeare hamlet analysis",
  "python loops tutorial",
  "history world war 2",
  "chemistry periodic table",
  "statistics probability",
  "essay writing tips"
];

const StudySourcesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Resource[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'videos' | 'articles' | 'websites'>('all');
  const [placeholder] = useState(placeholderSearches[Math.floor(Math.random() * placeholderSearches.length)]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Empty Search",
        description: "Type something first, bestie. I can't read your mind.",
        variant: "destructive",
      });
      return;
    }

    setHasSearched(true);
    
    // Simulate search results based on keywords
    const query = searchQuery.toLowerCase();
    let results: Resource[] = [];
    
    if (query.includes("calc") || query.includes("math")) {
      results = [...mockResources["calculus"]];
    } else if (query.includes("history") || query.includes("world war")) {
      results = [...mockResources["history"]];
    } else if (query.includes("program") || query.includes("coding") || query.includes("python") || query.includes("javascript")) {
      results = [...mockResources["programming"]];
    } else {
      // Random mix of results if no specific match
      results = [
        ...mockResources["calculus"].slice(0, 1),
        ...mockResources["history"].slice(0, 1),
        ...mockResources["programming"].slice(0, 1),
      ];
    }
    
    // Add a funny fake result
    results.push({
      id: "fake-" + Date.now(),
      title: `"${searchQuery}" Explained by Someone Who Barely Passed`,
      description: "A questionable explanation from someone who got a C- in this subject. Good luck!",
      url: "https://example.com/fake",
      type: Math.random() > 0.5 ? "video" : "article",
      provider: "TrustMeBro.edu",
      rating: 3.2,
    });
    
    setSearchResults(results);
    
    // Show toast
    toast({
      title: "Search Results",
      description: `Found ${results.length} resources for "${searchQuery}"`,
    });
  };
  
  const filteredResults = searchResults.filter(result => {
    if (activeTab === 'all') return true;
    if (activeTab === 'videos') return result.type === 'video';
    if (activeTab === 'articles') return result.type === 'article' || result.type === 'pdf';
    if (activeTab === 'websites') return result.type === 'website';
    return true;
  });
  
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Youtube size={18} className="text-red-500" />;
      case 'pdf':
        return <FileText size={18} className="text-blue-500" />;
      case 'article':
        return <BookOpen size={18} className="text-amber-500" />;
      case 'website':
        return <Globe size={18} className="text-green-500" />;
      default:
        return <FileSearch size={18} />;
    }
  };
  
  const handleBookmark = (resource: Resource) => {
    toast({
      description: `${resource.title} saved to your collection.`,
    });
  };
  
  const handleResourceClick = (resource: Resource) => {
    toast({
      title: "Opening Resource",
      description: "This would open the resource if this wasn't a demo.",
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3 text-glow">Study Sources</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Find free resources because we know you're not paying for anything.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto mb-10">
        <Card className="card-genz">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileSearch size={20} />
              <span>Search for Resources</span>
            </CardTitle>
            <CardDescription>Type literally anything academic (or just mash keys)</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                className="pl-10 py-6 text-lg"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
            
            <div className="mt-2 text-center text-xs text-muted-foreground">
              <p>"Free" as in "no money required" but you might pay with your sanity</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {hasSearched && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">
              Results for "{searchQuery}"
            </h2>
            
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="websites">Websites</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <FileSearch size={48} className="mx-auto mb-4 text-muted-foreground opacity-30" />
              <h3 className="text-xl font-medium mb-2">No Results Found</h3>
              <p className="text-muted-foreground">
                Either no one has studied this or you're the first one struggling. Congrats!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredResults.map((resource) => (
                <Card key={resource.id} className="hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getResourceIcon(resource.type)}
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleBookmark(resource)}>
                        <BookmarkPlus size={16} />
                      </Button>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span>{resource.provider}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={12} />
                        <span>{resource.rating}/5</span>
                      </span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm">{resource.description}</p>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleResourceClick(resource)}>
                      <ExternalLink size={16} className="mr-2" />
                      <span>Open Resource</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      
      {!hasSearched && (
        <div className="mt-8 text-center">
          <div className="flex flex-col items-center justify-center py-12">
            <FileSearch size={64} className="mb-4 text-muted-foreground opacity-30" />
            <h3 className="text-xl font-medium mb-3">Start a Search</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Type in a topic and discover resources. We promise they're better quality than your last essay.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudySourcesPage;
