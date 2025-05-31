import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

export function AnimatedCard({ 
  children, 
  className, 
  gradientFrom = "#00B7FF",
  gradientTo = "#FF30FF",
  ...props 
}: AnimatedCardProps) {
  return (
    <div className={cn("relative group", className)} {...props}>
      {/* Animated border container */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2">
          <div className="absolute w-full h-full">
            {/* First gradient segment */}
            <div className="absolute w-1/2 h-full bg-gradient-to-r from-transparent via-[var(--gradient-from)] to-[var(--gradient-to)]" 
                 style={{ 
                   '--gradient-from': gradientFrom,
                   '--gradient-to': gradientTo,
                   left: '0%',
                   transform: 'rotate(0deg)'
                 } as React.CSSProperties} />
            {/* Second gradient segment with gap */}
            <div className="absolute w-1/2 h-full bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)]" 
                 style={{ 
                   '--gradient-from': gradientFrom,
                   '--gradient-to': gradientTo,
                   left: '50%',
                   transform: 'rotate(180deg)'
                 } as React.CSSProperties} />
          </div>
          <div className="absolute w-full h-full animate-[spin_3s_linear_infinite]" />
        </div>
      </div>
      
      {/* Card content */}
      <Card className="relative bg-card rounded-xl m-[2px]">
        {children}
      </Card>
    </div>
  );
} 