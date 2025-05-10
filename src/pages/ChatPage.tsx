
import ChatSystem from '@/components/ChatSystem';

const ChatPage = () => {
  return (
    <div className="container py-8 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3 text-glow">Chat Zone</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          A safe space for chaotic academic discussions and questionable excuses.
        </p>
      </div>
      
      <ChatSystem />
    </div>
  );
};

export default ChatPage;
