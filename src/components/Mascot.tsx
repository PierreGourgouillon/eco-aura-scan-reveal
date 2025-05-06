
import React from "react";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface MascotProps {
  className?: string;
  size?: number;
  mood?: "happy" | "neutral" | "thinking";
  withText?: string;
}

const Mascot = ({ 
  className, 
  size = 24, 
  mood = "neutral", 
  withText 
}: MascotProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <Leaf 
          size={size} 
          className={cn(
            "eco-mascot text-eco-green",
            mood === "happy" && "text-eco-lightGreen animate-pulse-gentle",
            mood === "thinking" && "text-eco-teal"
          )}
        />
        {/* Eyes for the leaf */}
        <div className="absolute top-[30%] left-[40%] w-[20%] flex gap-1">
          <div className="w-1 h-1 rounded-full bg-white"></div>
          <div className="w-1 h-1 rounded-full bg-white"></div>
        </div>
      </div>
      
      {withText && (
        <div className="text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm">
          {withText}
        </div>
      )}
    </div>
  );
};

export default Mascot;
