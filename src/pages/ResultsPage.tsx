
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ProfileCard from "@/components/ProfileCard";
import AdviceSection from "@/components/AdviceSection";
import ShareSection from "@/components/ShareSection";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import Mascot from "@/components/Mascot";

const ResultsPage = () => {
  const { results, isCompleted, resetQuestionnaire } = useQuestionnaire();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCompleted && !results.profile) {
      navigate("/questionnaire");
    }
  }, [isCompleted, navigate, results.profile]);

  const handleRestart = () => {
    resetQuestionnaire();
    navigate("/");
  };

  if (!results.profile) {
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-md mx-auto px-4 pb-16">
        <div className="mb-6 relative">
          <div className="absolute -top-8 right-0">
            <Mascot 
              size={32} 
              mood="happy" 
              withText="Bravo pour ton analyse !" 
            />
          </div>
        </div>

        <PageHeader 
          title="Tes résultats" 
          subtitle="Voici ton profil écologique personnalisé"
          showMascot={false}
        />

        <ProfileCard profile={results.profile} className="mb-8" />

        <AdviceSection
          title="Tes points forts"
          items={results.strengths}
          type="strengths"
        />

        <AdviceSection
          title="Pistes d'amélioration"
          items={results.improvements}
          type="improvements"
        />

        <AdviceSection
          title="Conseils pratiques"
          items={results.tips}
          type="tips"
        />

        <ShareSection 
          profileName={results.profile.name} 
          score={results.profile.score} 
        />

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleRestart}
            variant="outline"
            className="px-6 py-2"
          >
            <ArrowLeft size={18} className="mr-2" />
            Refaire le test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
