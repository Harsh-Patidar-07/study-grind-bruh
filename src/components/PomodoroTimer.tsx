import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Check, Pause, Play, RotateCcw, Volume2 } from 'lucide-react';

const funnyAlerts = [
  "Back to the grind, nerd 🫡",
  "Break's over, back to suffering 💀",
  "Time to pretend you're learning something 🧠",
  "Your free trial of relaxation has ended 🙃",
  "Vacation's over, bestie 😭",
  "Time to touch some grass... jk back to work 🌱",
  "Break time is dead, just like your social life 🪦",
  "Snap back to reality, ope there goes gravity 🎵",
  "POV: You thought break time was longer 🤡",
  "Skill issue: Can't have breaks forever 🤷‍♂️"
];

const funnyBreakAlerts = [
  "Touch grass time (or your phone) 📱",
  "Time to stare at a different screen! 👁️",
  "You earned 5 mins of TikTok, I guess 🙄",
  "Quick! Pretend you have a social life! 💃",
  "Procrastination but make it planned ✨",
  "Time to overthink your life choices! 🧠",
];

const sarcasmFinishedAlerts = [
  "Wow, you actually finished something? Revolutionary. 🏆",
  "Harvard wants to know your location 🧠",
  "Look at you being productive, couldn't be me 💅",
  "Your parents would be shocked rn 😮",
  "Screenshot this, it won't happen again 📸",
  "Is this personal growth? Gross. 🌱",
];

const PomodoroTimer = () => {
  const { toast } = useToast();
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [progress, setProgress] = useState(100);
  const [cycles, setCycles] = useState(0);
  const [volume, setVolume] = useState(70);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const totalTime = isBreak ? breakTime * 60 : workTime * 60;
    setProgress((time / totalTime) * 100);
  }, [time, isBreak, workTime, breakTime]);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setIsActive(true);
    intervalRef.current = window.setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 1) {
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
          }
          
          clearInterval(intervalRef.current!);
          
          if (isBreak) {
            const alertMsg = funnyAlerts[Math.floor(Math.random() * funnyAlerts.length)];
            toast({ title: "Break's over!", description: alertMsg });
            setIsBreak(false);
            setTime(workTime * 60);
          } else {
            setCycles(prev => prev + 1);
            const alertMsg = funnyBreakAlerts[Math.floor(Math.random() * funnyBreakAlerts.length)];
            toast({ title: "Work Session Complete!", description: alertMsg });
            setIsBreak(true);
            setTime(breakTime * 60);
          }
          
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
    setTime(workTime * 60);
    setIsBreak(false);
  };

  const completeSession = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
    setIsBreak(false);
    setTime(workTime * 60);
    
    const alertMsg = sarcasmFinishedAlerts[Math.floor(Math.random() * sarcasmFinishedAlerts.length)];
    toast({
      title: "Study Session Complete!",
      description: alertMsg,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card-genz max-w-md mx-auto shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">
          {isBreak ? "Chill Time" : "Focus Time"} 
          {isBreak ? " 😌" : " 🧠"}
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          {isBreak 
            ? "scroll mindlessly like the zombie you are" 
            : "pretend to be productive for once"}
        </p>
        
        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border-4 border-genz-purple/30 flex items-center justify-center mx-auto mb-8 relative">
          <div className="absolute inset-1 rounded-full overflow-hidden">
            <div 
              className={`h-full w-full absolute top-0 transition-all duration-300 ${isBreak ? 'bg-gradient-to-tr from-genz-blue to-genz-green' : 'bg-gradient-to-tr from-genz-purple to-genz-pink'}`} 
              style={{ height: `${progress}%`, top: `${100 - progress}%` }}
            ></div>
          </div>
          <div className="z-10">
            <div className="text-5xl md:text-6xl font-bold">{formatTime(time)}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {isBreak ? "break" : "focus"} • cycle {cycles + 1}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mb-8 justify-center">
          {!isActive ? (
            <Button onClick={startTimer} className="flex items-center gap-2 px-6">
              <Play size={18} />
              <span>Start</span>
            </Button>
          ) : (
            <Button onClick={pauseTimer} variant="outline" className="flex items-center gap-2">
              <Pause size={18} />
              <span>Pause</span>
            </Button>
          )}
          <Button onClick={resetTimer} variant="outline" className="flex items-center gap-2">
            <RotateCcw size={18} />
            <span>Reset</span>
          </Button>
          <Button onClick={completeSession} variant="secondary" className="flex items-center gap-2">
            <Check size={18} />
            <span>Done</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Focus Length: {workTime} min</label>
            <Slider 
              defaultValue={[workTime]} 
              min={5} 
              max={60} 
              step={5} 
              disabled={isActive}
              onValueChange={(vals) => setWorkTime(vals[0])} 
              className="py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Break Length: {breakTime} min</label>
            <Slider 
              defaultValue={[breakTime]} 
              min={1} 
              max={30} 
              step={1} 
              disabled={isActive}
              onValueChange={(vals) => setBreakTime(vals[0])} 
              className="py-2"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Volume2 size={16} className="text-muted-foreground" />
          <Slider
            defaultValue={[volume]}
            max={100}
            step={10}
            className="flex-1"
            onValueChange={(vals) => setVolume(vals[0])}
          />
          <span className="text-xs text-muted-foreground w-8">{volume}%</span>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
