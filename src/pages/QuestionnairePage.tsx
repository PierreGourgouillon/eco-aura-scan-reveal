
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import { questions, useQuestionnaire } from "@/context/QuestionnaireContext";
import Mascot from "@/components/Mascot";

const QuestionnairePage = () => {
  const {
    currentQuestionData,
    currentAnswer,
    setAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    currentQuestion,
    isLastQuestion,
  } = useQuestionnaire();
  
  const navigate = useNavigate();

  if (!currentQuestionData) {
    return navigate("/");
  }

  const handleMoveHome = () => {
    return navigate("/");
  };

  const handleSelectAnswer = (value: string | number) => {
    setAnswer(currentQuestionData.id, value.toString());
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex justify-center">
          <Mascot 
            size={32} 
            mood="thinking" 
            withText={
              currentQuestion === 0 
              ? "Salut ! Parlons de tes habitudes..." 
              : "Très bien, continuons..."
            } 
          />
        </div>
        <ProgressBar 
          currentStep={currentQuestion + 1} 
          totalSteps={questions.length} 
          className="mb-4"
        />
        
        <PageHeader 
          title="Ton profil écologique" 
          subtitle="Réponds aux questions pour découvrir ton impact et recevoir des conseils personnalisés."
          showMascot={false}
        />

        <QuestionCard
          question={currentQuestionData.question}
          options={currentQuestionData.options}
          selectedAnswer={currentAnswer}
          onSelectAnswer={handleSelectAnswer}
        />

        <div className="flex justify-between mt-8">
          <Button
            onClick={goToPreviousQuestion}
            variant="outline"
            disabled={currentQuestion === 0}
            className="px-4 py-2"
          >
            <ArrowLeft size={18} className="mr-2" />
            Précédent
          </Button>
          
          <Button
            onClick={handleMoveHome}
            variant="outline"
            className="px-4 py-2"
          >
            <Home size={18} />
          </Button>
          
          <Button
            onClick={ async () => { await goToNextQuestion() }}
            disabled={!currentAnswer}
            className="eco-button"
          >
            {isLastQuestion ? "Voir mes résultats" : "Suivant"}
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;
