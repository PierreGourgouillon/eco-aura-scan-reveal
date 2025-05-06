
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
                
        <p className="text-muted-foreground">
          {profile.description}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
