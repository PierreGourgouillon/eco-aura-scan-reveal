
import React, { createContext, useState, useContext, useEffect } from "react";
import { TreeDeciduous, TreePalm, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    strengths: { text: string }[];
    improvements: { text: string }[];
    tips: { text: string }[];
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
  
  const [results, setResults] = useState({
    profile: null as typeof profiles[keyof typeof profiles] | null,
    strengths: [] as { text: string }[],
    improvements: [] as { text: string }[],
    tips: [] as { text: string }[],
  });

  const currentQuestionData = questions[currentQuestion];
  const currentAnswer = currentQuestionData ? answers[currentQuestionData.id] || null : null;
  const progress = (currentQuestion + 1) / questions.length;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isCompleted = Object.keys(answers).length === questions.length;

  const setAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
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

  const calculateResults = () => {
    // Simple scoring logic based on answers
    let score = 0;
    const valueWeights: Record<string, number> = {
      // Transport
      car: 1, public: 3, mixed: 2, bike: 4,
      // Food
      meat: 1, moderate: 2, flexitarian: 3, vegan: 4,
      // Energy
      careless: 1, basic: 2, aware: 3, renewable: 4,
      // Shopping
      new: 1, mixed: 2, secondhand: 3, minimal: 4,
      // Waste
      notsorting: 1, basic: 2, advanced: 3, zerowaste: 4
    };
    
    // Calculate score based on answers
    Object.values(answers).forEach(value => {
      score += valueWeights[value] || 0;
    });
    
    // Normalize to 100
    const normalizedScore = (score / (Object.keys(answers).length * 4)) * 100;
    
    // Determine profile
    let profile;
    if (normalizedScore < 50) {
      profile = profiles["débutant"];
    } else if (normalizedScore < 75) {
      profile = profiles["modéré"];
    } else {
      profile = profiles["avancé"];
    }
    
    // Extract strengths (highest scores)
    const strengths = Object.entries(answers)
      .filter(([_, value]) => valueWeights[value] >= 3)
      .map(([questionId, _]) => {
        const question = questions.find(q => q.id === questionId);
        if (!question) return { text: "" };
        
        switch (questionId) {
          case "transport": return { text: "Tes choix de mobilité sont excellents pour la planète !" };
          case "food": return { text: "Ton alimentation est respectueuse de l'environnement" };
          case "energy": return { text: "Ta gestion de l'énergie est exemplaire" };
          case "shopping": return { text: "Tes habitudes de consommation sont responsables" };
          case "waste": return { text: "Ta gestion des déchets est très avancée" };
          default: return { text: "" };
        }
      })
      .filter(item => item.text !== "");
    
    // Extract areas for improvement (lowest scores)
    const improvements = Object.entries(answers)
      .filter(([_, value]) => valueWeights[value] <= 2)
      .map(([questionId, _]) => {
        const question = questions.find(q => q.id === questionId);
        if (!question) return { text: "" };
        
        switch (questionId) {
          case "transport": return { text: "Essaie d'explorer des alternatives à la voiture quand c'est possible" };
          case "food": return { text: "Réduire la consommation de produits animaux aurait un impact positif" };
          case "energy": return { text: "Surveiller ta consommation d'énergie pourrait faire une grande différence" };
          case "shopping": return { text: "Privilégier les achats d'occasion ou locaux réduirait ton empreinte" };
          case "waste": return { text: "Améliorer ton tri et réduire tes déchets serait bénéfique" };
          default: return { text: "" };
        }
      })
      .filter(item => item.text !== "");
    
    // Generate general tips
    const tips = [
      { text: "Commence par un petit changement à la fois pour créer de nouvelles habitudes durables" },
      { text: "Partage tes succès avec tes proches pour les inspirer à leur tour" },
      { text: "Rejoins des groupes locaux d'éco-citoyens pour échanger et apprendre" }
    ];
    
    setResults({
      profile,
      strengths: strengths.length ? strengths : [{ text: "Tu es sur la bonne voie !" }],
      improvements: improvements.length ? improvements : [{ text: "Continue comme ça !" }],
      tips,
    });
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
