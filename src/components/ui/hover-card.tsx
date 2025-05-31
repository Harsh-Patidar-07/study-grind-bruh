import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

export function HoverCard({ 
  children, 
  className,
  gradientFrom = "#ffbc00",
  gradientTo = "#ff0058",
  ...props 
}: HoverCardProps) {
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

export { HoverCard, HoverCardTrigger, HoverCardContent }
