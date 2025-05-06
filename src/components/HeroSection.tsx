import React from "react";
import { Leaf, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/questionnaire");
  };
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-b from-eco-lightest to-white">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1500&q=60')] bg-cover opacity-5 z-0"></div>
      <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="text-eco-dark mr-2 h-10 w-10" />
          <h2 className="text-2xl font-bold text-eco-dark">EcoScan</h2>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-eco-dark mb-6 leading-tight">
          Découvre ton impact écologique <br className="hidden md:block" />
          <span className="text-eco-medium">en 2 minutes</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
          Simple, rapide et non culpabilisant. Obtiens une analyse personnalisée
          et des conseils concrets pour un mode de vie plus durable.
        </p>
        <Button onClick={handleStart} className="eco-button text-lg">
          Commencer le scan
        </Button>
        <div className="mt-16 animate-bounce-subtle">
          <button
            onClick={() => scrollToSection("why-ecoscan")}
            className="flex flex-col items-center text-eco-medium hover:text-eco-dark transition-colors"
            aria-label="En savoir plus"
          >
            <span className="mb-2">En savoir plus</span>
            <ArrowDown />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
