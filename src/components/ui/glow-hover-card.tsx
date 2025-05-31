import * as React from "react";
import { cn } from "@/lib/utils";

interface GlowHoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

export function GlowHoverCard({ 
  children, 
  className,
  gradientFrom = "#ffbc00",
  gradientTo = "#ff0058",
  ...props 
}: GlowHoverCardProps) {
  return (
    <div 
      className={cn(
        "relative transition-all duration-500 cursor-pointer group",
        "hover:-translate-y-5",
        className
      )} 
      {...props}
    >
      {/* Gradient background with blur */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`
        }}
      />
      <div 
        className="absolute inset-0 rounded-xl opacity-70 blur-xl"
        style={{
          background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`
        }}
      />
      
      {/* Dark overlay with shine effect */}
      <div className="absolute inset-[3px] rounded-xl bg-black/60 z-[2] overflow-hidden">
        <div className="absolute inset-0 w-1/2 bg-white/10" />
      </div>
      
      {/* Content */}
      <div className="relative p-6 z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
} 