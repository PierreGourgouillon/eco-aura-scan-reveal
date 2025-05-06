
import React, { createContext, useState, useContext, useEffect } from "react";
import { TreeDeciduous, TreePalm, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Advice } from "@/components/AdviceSection";

// Define the questions and answers
export const questions = [
  {
    id: "transport",
    question: "Comment te déplaces-tu au quotidien ?",
    options: [
      { id: "t1", text: "Principalement en voiture", value: "car" },
      { id: "t2", text: "Transports en commun", value: "public" },
      { id: "t3", text: "Vélo ou marche", value: "bike" },
      { id: "t4", text: "Mix de plusieurs modes", value: "mixed" },
    ],
  },
  {
    id: "food",
    question: "Quel régime alimentaire adoptes-tu ?",
    options: [
      { id: "f1", text: "Beaucoup de viande", value: "meat" },
      { id: "f2", text: "Omnivore modéré", value: "moderate" },
      { id: "f3", text: "Flexitarien", value: "flexitarian" },
      { id: "f4", text: "Végétarien ou végétalien", value: "vegan" },
    ],
  },
  {
    id: "energy",
    question: "Comment gères-tu ta consommation d'énergie ?",
    options: [
      { id: "e1", text: "Je n'y fais pas attention", value: "careless" },
      { id: "e2", text: "J'éteins les appareils inutilisés", value: "basic" },
      { id: "e3", text: "Je suis attentif à ma consommation", value: "aware" },
      { id: "e4", text: "J'utilise des énergies renouvelables", value: "renewable" },
    ],
  },
  {
    id: "shopping",
    question: "Comment décris-tu tes habitudes de consommation ?",
    options: [
      { id: "s1", text: "J'achète souvent du neuf", value: "new" },
      { id: "s2", text: "J'achète parfois d'occasion", value: "mixed" },
      { id: "s3", text: "Je privilégie seconde main et local", value: "secondhand" },
      { id: "s4", text: "Je consomme très peu", value: "minimal" },
    ],
  },
  {
    id: "waste",
    question: "Comment gères-tu tes déchets ?",
    options: [
      { id: "w1", text: "Je ne trie pas vraiment", value: "notsorting" },
      { id: "w2", text: "Je trie les basiques", value: "basic" },
      { id: "w3", text: "Je trie et composte", value: "advanced" },
      { id: "w4", text: "Je tends vers zéro déchet", value: "zerowaste" },
    ],
  },
  {
    id: "water",
    question: "Quelle est ta gestion de l'eau ?",
    options: [
      { id: "wa1", text: "Je laisse couler l'eau sans y penser", value: "careless" },
      { id: "wa2", text: "J'évite de gaspiller l'eau", value: "basic" },
      { id: "wa3", text: "Je récupère l'eau ou optimise ma consommation", value: "aware" },
      { id: "wa4", text: "J’utilise des dispositifs pour économiser l’eau", value: "eco" },
    ],
  },
  {
    id: "digital",
    question: "Quel est ton usage du numérique ?",
    options: [
      { id: "d1", text: "Je ne me préoccupe pas de mon usage", value: "careless" },
      { id: "d2", text: "J’éteins mes appareils la nuit", value: "basic" },
      { id: "d3", text: "Je limite mes mails/stockages inutiles", value: "aware" },
      { id: "d4", text: "J’optimise mes outils et mes habitudes numériques", value: "eco" },
    ],
  },
  {
    id: "clothing",
    question: "Comment gères-tu ton habillement ?",
    options: [
      { id: "cl1", text: "J’achète beaucoup de vêtements neufs", value: "fastfashion" },
      { id: "cl2", text: "J’achète moins souvent mais toujours du neuf", value: "moderate" },
      { id: "cl3", text: "Je mixe neuf et friperies", value: "mixed" },
      { id: "cl4", text: "Je consomme peu ou en seconde main", value: "eco" },
    ],
  },
  {
    id: "local",
    question: "Consommes-tu local ?",
    options: [
      { id: "lo1", text: "Je ne fais pas attention", value: "none" },
      { id: "lo2", text: "J’achète local de temps en temps", value: "occasionally" },
      { id: "lo3", text: "Je privilégie souvent les circuits courts", value: "frequent" },
      { id: "lo4", text: "Je ne consomme presque que local", value: "always" },
    ],
  },
  {
    id: "activism",
    question: "T’impliques-tu dans des actions écologiques ?",
    options: [
      { id: "a1", text: "Pas du tout", value: "none" },
      { id: "a2", text: "Je signe des pétitions ou partage des infos", value: "light" },
      { id: "a3", text: "Je participe à des actions locales", value: "active" },
      { id: "a4", text: "Je suis très engagé·e dans la cause", value: "committed" },
    ],
  },
];

// Define profiles
const profiles = {
  "débutant": {
    name: "Explorateur Écologique",
    icon: <Leaf className="text-eco-green" size={32} />,
    description: "Tu commences ton voyage écologique avec enthousiasme. Chaque petit geste compte !",
    score: 40,
  },
  "modéré": {
    name: "Gardien Vert",
    icon: <TreeDeciduous className="text-eco-green" size={32} />,
    description: "Tu es sur la bonne voie avec plusieurs habitudes écoresponsables déjà ancrées.",
    score: 65,
  },
  "avancé": {
    name: "Sage de la Nature",
    icon: <TreePalm className="text-eco-green" size={32} />,
    description: "Bravo ! Tu as adopté un mode de vie respectueux de l'environnement et inspires les autres.",
    score: 85,
  },
};

// Types
type Answers = Record<string, string>;
type AnswerValue = string | null;

interface QuestionnaireContextType {
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  answers: Answers;
  setAnswer: (questionId: string, value: string) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  resetQuestionnaire: () => void;
  currentQuestionData: typeof questions[0] | undefined;
  currentAnswer: AnswerValue;
  progress: number;
  isLastQuestion: boolean;
  isCompleted: boolean;
  calculateResults: () => void;
  results: {
    profile: typeof profiles[keyof typeof profiles] | null;
    strengths: Advice[];
    improvements: Advice[];
    tips: Advice[];
  };
}

const QuestionnaireContext = createContext<QuestionnaireContextType | null>(null);

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error("useQuestionnaire must be used within a QuestionnaireProvider");
  }
  return context;
};

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const navigate = useNavigate();
  
  const [results, setResults] = useState<{
    profile: typeof profiles[keyof typeof profiles] | null;
    strengths: Advice[];
    improvements: Advice[];
    tips: Advice[];
  }>({
    profile: null,
    strengths: [],
    improvements: [],
    tips: [],
  });

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = currentQuestionData ? answers[currentQuestionData.id] || null : null;
  const progress = (currentQuestion + 1) / questions.length;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isCompleted = Object.keys(answers).length === questions.length;

  const setAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const goToNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      await calculateResults();
      navigate("/results");
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults({
      profile: null,
      strengths: [],
      improvements: [],
      tips: [],
    });
  };

  const calculateResults = async () => {
    const userResponses = questions.map((q) => {
      const answerValue = answers[q.id];
      const selectedOption = q.options.find(opt => opt.value === answerValue);
      return {
        question: q.question,
        answer: selectedOption?.text || "Aucune réponse",
      };
    });

    const prompt = `
Tu es un assistant expert en écologie.

Voici les réponses d’un utilisateur à un questionnaire environnemental :
${userResponses.map((r, i) => `${i + 1}. ${r.question}\nRéponse : ${r.answer}`).join("\n\n")}

Analyse ces réponses et produis un **résultat au format JSON** structuré comme suit :

{
  "profile": {
    "name": "Nom du profil",
    "description": "Description du profil"
  },
  "strengths": ["Point fort 1", "Point fort 2", "Point fort 3"],
  "improvements": ["Axe d'amélioration 1", "Axe 2", "Axe 3"],
  "tips": ["Conseil 1", "Conseil 2", "Conseil 3"]
}

Ne donne que le JSON, sans texte avant ou après.
Sois bienveillant et motivant.
`;

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "";
      const parsed = JSON.parse(raw);

    setResults({
      profile: {
        name: parsed.profile.name,
        description: parsed.profile.description,
        icon: null,
        score: 0,
      },
      strengths: parsed.strengths.map(text => ({ text, type: "strength" })),
      improvements: parsed.improvements.map(text => ({ text, type: "improvement" })),
      tips: parsed.tips.map(text => ({ text, type: "tip" })),
    });
    } catch (error) {
      console.error("Erreur IA :", error);
      setResults({
        profile: null,
        strengths: [],
        improvements: [],
        tips: [{ text: "Impossible d'obtenir une analyse pour le moment.", type: "tip" }],
      });
    }
  };  

  return (
    <QuestionnaireContext.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        answers,
        setAnswer,
        goToNextQuestion,
        goToPreviousQuestion,
        resetQuestionnaire,
        currentQuestionData,
        currentAnswer,
        progress,
        isLastQuestion,
        isCompleted,
        calculateResults,
        results,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};
