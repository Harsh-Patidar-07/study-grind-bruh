import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AnimatedCard({ children, className, ...props }: AnimatedCardProps) {
  return (
    <div className={cn("relative group", className)} {...props}>
      {/* Animated border container */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute w-[150%] h-[150%] -top-1/4 -left-1/4">
          <div className="absolute w-full h-full bg-gradient-to-r from-[#00B7FF] to-[#FF30FF] animate-[spin_3s_linear_infinite]" />
        </div>
      </div>
      
      {/* Card content */}
      <Card className="relative bg-card rounded-xl m-[2px]">
        {children}
      </Card>
    </div>
  );
} 