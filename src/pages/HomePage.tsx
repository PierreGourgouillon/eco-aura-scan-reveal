
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Mascot from "@/components/Mascot";

const HomePage = () => {
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  const getGroqResponse = async (message: string): Promise<string> => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
      }),
    });
  
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erreur Groq API: ${error}`);
    }
  
    const data = await response.json();
    return data.choices[0].message.content;
  };  

  const handleStart = () => {
    navigate("/questionnaire");
  };

  useEffect(() => {
    const test = async () => {
      try {
        const response = await getGroqResponse("Salut ChatGPT, ça va ?");
        console.log("Réponse de ChatGPT :", response);
      } catch (error) {
        console.error("Erreur lors de l'appel API ChatGPT :", error);
      }
    };

    test();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="container max-w-md mx-auto px-4 py-12 text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-3">
            <Mascot size={64} mood="happy" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-eco-teal mb-3">
            Eco<span className="text-eco-green">Scan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-sm mx-auto">
            Découvre ton profil écologique et comment avoir un impact positif au quotidien
          </p>
        </div>

        <div className="eco-card mb-8">
          <h2 className="text-xl font-semibold mb-3">Comment ça marche ?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-eco-beige flex items-center justify-center text-eco-teal flex-shrink-0">
                1
              </div>
              <p>Réponds à quelques questions simples sur ton mode de vie</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-eco-beige flex items-center justify-center text-eco-teal flex-shrink-0">
                2
              </div>
              <p>Découvre ton profil écologique personnalisé</p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-eco-beige flex items-center justify-center text-eco-teal flex-shrink-0">
                3
              </div>
              <p>Reçois des conseils adaptés pour progresser à ton rythme</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleStart} 
          className="eco-button w-full"
        >
          <Leaf size={18} />
          <span>Commencer mon scan écolo</span>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
