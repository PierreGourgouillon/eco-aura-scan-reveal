
import React from "react";
import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";

export interface AnswerOption {
  id: string;
  text: string;
  icon?: string;
  value: string | number;
}

interface QuestionCardProps {
  question: string;
  options: AnswerOption[];
  selectedAnswer: string | number | null;
  onSelectAnswer: (value: string | number) => void;
  className?: string;
}

const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
  className,
}: QuestionCardProps) => {
  return (
    <div className={cn("question-card", className)}>
      <h3 className="text-xl font-semibold mb-4 text-eco-teal">{question}</h3>
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.id}
            className={cn(
              "answer-option",
              selectedAnswer === option.value && "selected"
            )}
            onClick={() => onSelectAnswer(option.value)}
          >
            <div className="w-6 h-6 flex-shrink-0">
              {selectedAnswer === option.value ? (
                <div className="rounded-full bg-eco-green text-white flex items-center justify-center">
                  <Check size={16} />
                </div>
              ) : (
                <Circle className="text-muted-foreground" size={20} />
              )}
            </div>
            <span>{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
