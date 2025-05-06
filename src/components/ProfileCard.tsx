
import React from "react";
import { cn } from "@/lib/utils";
import { TreeDeciduous } from "lucide-react";

export interface EcoProfile {
  name: string;
  icon: React.ReactNode;
  description: string;
  score: number;
}

interface ProfileCardProps {
  profile: EcoProfile;
  className?: string;
}

const ProfileCard = ({ profile, className }: ProfileCardProps) => {
  return (
    <div className={cn("eco-card text-center max-w-md mx-auto", className)}>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-eco-beige flex items-center justify-center mb-4">
          {profile.icon || <TreeDeciduous className="text-eco-green" size={36} />}
        </div>
        
        <h3 className="text-2xl font-bold text-eco-teal mb-1">
          {profile.name}
        </h3>
        
        <div className="mb-4">
          <div className="text-sm text-muted-foreground mb-2">Éco-Score</div>
          <div className="flex items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <div 
                key={star}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  star <= Math.round(profile.score / 20) 
                    ? "bg-eco-green text-white" 
                    : "bg-eco-beige/50 text-muted-foreground"
                }`}
              >
                {star}
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-muted-foreground">
          {profile.description}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
