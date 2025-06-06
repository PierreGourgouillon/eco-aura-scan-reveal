
import React from "react";
import { cn } from "@/lib/utils";
import { Check, TreePalm } from "lucide-react";

export interface Advice {
  type: "strength" | "improvement" | "tip";
  text: string;
}

interface AdviceSectionProps {
  title: string;
  items: Advice[];
  className?: string;
  type: "strengths" | "improvements" | "tips";
}

const AdviceSection = ({ title, items, className, type }: AdviceSectionProps) => {
  const getEmptyMessage = () => {
    switch (type) {
      case "strengths":
        return "Aucun point fort détecté, mais chaque petit pas compte 🌱";
      case "improvements":
        return "Rien à améliorer pour le moment, continue comme ça ! 💪";
      case "tips":
        return "Pas de conseil personnalisé, tu es déjà sur la bonne voie ✨";
      default:
        return "";
    }
  };

  return (
    <div className={cn("mb-6", className)}>
      <h3 className="text-xl font-semibold mb-3 text-eco-teal">{title}</h3>

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li 
              key={index} 
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg",
                type === "strengths" && "bg-eco-lightGreen/10 border border-eco-lightGreen/30",
                type === "improvements" && "bg-eco-beige/30 border border-eco-beige",
                type === "tips" && "bg-eco-teal/10 border border-eco-teal/30"
              )}
            >
              <div className={cn(
                "mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                type === "strengths" && "bg-eco-green text-white",
                type === "improvements" && "bg-eco-beige text-eco-teal",
                type === "tips" && "bg-eco-teal text-white"
              )}>
                <Check size={12} />
              </div>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="italic text-sm text-gray-500">{getEmptyMessage()}</p>
      )}
    </div>
  );
};

export default AdviceSection;
