
import PomodoroTimer from '@/components/PomodoroTimer';
import { Scissors } from 'lucide-react';

const PomodoroPage = () => {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-3 text-glow">Pomodoro Timer</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Focus for 25 minutes, then take a 5-minute break. Works like 20% of the time, every time.
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-px bg-border flex-1 max-w-[100px]"></div>
          <Scissors className="text-muted-foreground" size={14} />
          <div className="h-px bg-border flex-1 max-w-[100px]"></div>
        </div>
      </div>
      
      <PomodoroTimer />
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Pro tip: actually focus during focus time</p>
        <p className="text-xs">...but we know you won't</p>
      </div>
    </div>
  );
};

export default PomodoroPage;
