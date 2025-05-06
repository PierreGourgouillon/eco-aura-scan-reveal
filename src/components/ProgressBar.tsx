
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  const progress = Math.min((currentStep / totalSteps), 1); // clamp à 100%
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm text-muted-foreground mb-1">
        <span>Question {currentStep} / {totalSteps}</span>
        <span>{Math.round(progress * 100)}%</span>
      </div>
      <div className="h-2 bg-eco-beige/50 rounded-full overflow-hidden relative">
        <div 
          className="absolute inset-0 bg-eco-green rounded-full eco-transition origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
