import React, { createContext, useState, useContext, useEffect } from "react";
import { TreeDeciduous, TreePalm, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Advice } from "@/components/AdviceSection";

// Define the questions and answers
export const questions = [
  {
    id: "transport",
    question:
      "Quel moyen utilises-tu le plus souvent pour te rendre au travail ou à l’école ?",
    options: [
      { id: "t1", text: "Voiture individuelle", value: "car" },
      { id: "t2", text: "Bus, métro ou train", value: "public" },
      { id: "t3", text: "Vélo, marche ou trottinette", value: "bike" },
      {
        id: "t4",
        text: "Télétravail ou pas de déplacement régulier",
        value: "remote",
      },
    ],
  },
  {
    id: "housing",
    question: "Quel type de logement occupes-tu ?",
    options: [
      { id: "h1", text: "Grande maison individuelle", value: "house" },
      { id: "h2", text: "Appartement spacieux", value: "flat" },
      { id: "h3", text: "Petit logement optimisé", value: "small" },
      { id: "h4", text: "Habitat partagé ou éco-conçu", value: "eco" },
    ],
  },
  {
    id: "diet",
    question: "Comment choisis-tu ce que tu manges ?",
    options: [
      { id: "d1", text: "Prix et praticité avant tout", value: "cheap" },
      { id: "d2", text: "Je varie mais sans trop y penser", value: "moderate" },
      { id: "d3", text: "Je privilégie bio et local", value: "conscious" },
      { id: "d4", text: "Je cuisine végétal et maison", value: "eco" },
    ],
  },
  {
    id: "appliances",
    question: "Quelle est ta gestion des appareils électriques ?",
    options: [
      { id: "ap1", text: "Ils restent souvent en veille", value: "wasteful" },
      { id: "ap2", text: "Je les éteins quand je peux", value: "moderate" },
      {
        id: "ap3",
        text: "J’utilise des multiprises ou minuteries",
        value: "optimized",
      },
      {
        id: "ap4",
        text: "Je réduis au minimum mes équipements",
        value: "minimal",
      },
    ],
  },
  {
    id: "waste",
    question: "Comment gères-tu les emballages et les déchets ?",
    options: [
      { id: "w1", text: "Tout part à la poubelle", value: "unsorted" },
      { id: "w2", text: "Je trie les plastiques et cartons", value: "basic" },
      {
        id: "w3",
        text: "Je composte et limite mes emballages",
        value: "advanced",
      },
      { id: "w4", text: "Je vise le zéro déchet", value: "zerowaste" },
    ],
  },
  {
    id: "digital",
    question: "Quel est ton comportement numérique ?",
    options: [
      {
        id: "d1",
        text: "Je stream beaucoup, tout le temps",
        value: "intensive",
      },
      { id: "d2", text: "Je limite mes écrans le soir", value: "moderate" },
      { id: "d3", text: "Je fais le ménage dans mes données", value: "eco" },
      {
        id: "d4",
        text: "J’optimise tout (stockage, cloud, etc.)",
        value: "advanced",
      },
    ],
  },
  {
    id: "consumption",
    question: "Quelle est ta manière de consommer au quotidien ?",
    options: [
      {
        id: "c1",
        text: "Je fais beaucoup d’achats impulsifs",
        value: "impulsive",
      },
      { id: "c2", text: "J’essaie de limiter les achats", value: "moderate" },
      { id: "c3", text: "Je répare, réutilise ou recycle", value: "conscious" },
      { id: "c4", text: "Je suis adepte du minimalisme", value: "minimalist" },
    ],
  },
  {
    id: "clothing",
    question: "D’où viennent tes vêtements ?",
    options: [
      {
        id: "cl1",
        text: "Fast fashion en ligne ou grandes marques",
        value: "fastfashion",
      },
      { id: "cl2", text: "Un peu de neuf, un peu de fripes", value: "mixed" },
      { id: "cl3", text: "Friperies ou créateurs locaux", value: "eco" },
      { id: "cl4", text: "Je n’achète quasiment rien", value: "lowimpact" },
    ],
  },
  {
    id: "community",
    question: "As-tu un rôle actif dans ta communauté ?",
    options: [
      { id: "co1", text: "Je ne m’implique pas", value: "none" },
      {
        id: "co2",
        text: "Je participe à des événements ou débats",
        value: "engaged",
      },
      {
        id: "co3",
        text: "Je fais partie d’une asso ou collectif",
        value: "member",
      },
      {
        id: "co4",
        text: "Je suis moteur de projets écologiques",
        value: "leader",
      },
    ],
  },
  {
    id: "nature",
    question: "Quel lien entretiens-tu avec la nature ?",
    options: [
      {
        id: "n1",
        text: "Je suis rarement en plein air",
        value: "disconnected",
      },
      {
        id: "n2",
        text: "Je fais quelques balades le week-end",
        value: "casual",
      },
      { id: "n3", text: "Je jardine ou observe la nature", value: "connected" },
      {
        id: "n4",
        text: "Je suis en contact quotidien avec elle",
        value: "immersed",
      },
    ],
  },
];

// Define profiles
const profiles = {
  débutant: {
    name: "Explorateur Écologique",
    icon: <Leaf className="text-eco-green" size={32} />,
    description:
      "Tu commences ton voyage écologique avec enthousiasme. Chaque petit geste compte !",
    score: 40,
  },
  modéré: {
    name: "Gardien Vert",
    icon: <TreeDeciduous className="text-eco-green" size={32} />,
    description:
      "Tu es sur la bonne voie avec plusieurs habitudes écoresponsables déjà ancrées.",
    score: 65,
  },
  avancé: {
    name: "Sage de la Nature",
    icon: <TreePalm className="text-eco-green" size={32} />,
    description:
      "Bravo ! Tu as adopté un mode de vie respectueux de l'environnement et inspires les autres.",
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
  currentQuestionData: (typeof questions)[0] | undefined;
  currentAnswer: AnswerValue;
  progress: number;
  isLastQuestion: boolean;
  isCompleted: boolean;
  calculateResults: () => void;
  results: {
    profile: (typeof profiles)[keyof typeof profiles] | null;
    strengths: Advice[];
    improvements: Advice[];
    tips: Advice[];
  };
}

const QuestionnaireContext = createContext<QuestionnaireContextType | null>(
  null
);

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error(
      "useQuestionnaire must be used within a QuestionnaireProvider"
    );
  }
  return context;
};

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const navigate = useNavigate();

  const [results, setResults] = useState<{
    profile: (typeof profiles)[keyof typeof profiles] | null;
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
  const currentAnswer = currentQuestionData
    ? answers[currentQuestionData.id] || null
    : null;
  const progress = (currentQuestion + 1) / questions.length;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isCompleted = Object.keys(answers).length === questions.length;

  const setAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const goToNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      await calculateResults();
      navigate("/results");
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
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
      const selectedOption = q.options.find((opt) => opt.value === answerValue);
      return {
        question: q.question,
        answer: selectedOption?.text || "Aucune réponse",
      };
    });

    const prompt = `
Tu es un assistant expert en écologie.

Voici les réponses d’un utilisateur à un questionnaire environnemental :
${userResponses
  .map((r, i) => `${i + 1}. ${r.question}\nRéponse : ${r.answer}`)
  .join("\n\n")}

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
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
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
        }
      );

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
        strengths: parsed.strengths.map((text) => ({ text, type: "strength" })),
        improvements: parsed.improvements.map((text) => ({
          text,
          type: "improvement",
        })),
        tips: parsed.tips.map((text) => ({ text, type: "tip" })),
      });
    } catch (error) {
      console.error("Erreur IA :", error);
      setResults({
        profile: null,
        strengths: [],
        improvements: [],
        tips: [
          {
            text: "Impossible d'obtenir une analyse pour le moment.",
            type: "tip",
          },
        ],
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
