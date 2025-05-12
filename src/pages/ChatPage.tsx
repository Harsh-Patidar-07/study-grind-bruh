
import ChatSystem from '@/components/ChatSystem';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container py-4 md:py-8 px-3 md:px-8 max-w-5xl">
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-glow">Chat Zone</h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm md:text-base">
          A safe space for chaotic academic discussions and questionable excuses.
        </p>
      </div>
      
      <div className={isMobile ? "mx-auto -mx-3" : ""}>
        <ChatSystem />
      </div>
    </div>
  );
};

export default ChatPage;
