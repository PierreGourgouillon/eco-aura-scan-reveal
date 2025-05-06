import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ShareSection from "@/components/ShareSection";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import Mascot from "@/components/Mascot";
import AdviceSection from "@/components/AdviceSection";

const ResultsPage = () => {
  const { results, isCompleted, resetQuestionnaire } = useQuestionnaire();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCompleted) {
      navigate("/questionnaire");
    }
  }, [isCompleted, navigate]);

  const handleRestart = () => {
    resetQuestionnaire();
    navigate("/");
  };

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
          subtitle="Voici ton analyse écologique personnalisée"
          showMascot={false}
        />

        {results.profile && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow text-sm whitespace-pre-line">
            <h3 className="text-lg font-bold text-eco-green mb-2">{results.profile.name}</h3>
            <p>{results.profile.description}</p>
          </div>
        )}

        <AdviceSection
          title="✅ Tes points forts"
          items={results.strengths}
          type="strengths"
        />

        <AdviceSection
          title="⚠️ Pistes d'amélioration"
          items={results.improvements}
          type="improvements"
        />

        <AdviceSection
          title="💡 Conseils pratiques"
          items={results.tips}
          type="tips"
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