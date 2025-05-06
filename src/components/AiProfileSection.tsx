
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AiProfileSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

  const handleQuizz =  () => {
    navigate("/questionnaire")
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach(el => {
              el.classList.add('active');
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="ai-profile" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-eco-dark mb-4">
          Ce que dit l'IA de toi
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Voici un exemple de profil et de conseils que notre IA pourrait te générer
        </p>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex animate-on-scroll">
          <div className="md:w-1/3 bg-gradient-to-br from-eco-medium to-eco-dark p-8 text-white flex justify-center items-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">L'Écolo du Dimanche 🌿</h3>
              <div className="w-24 h-24 bg-white/10 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-5xl">🌱</span>
              </div>
            </div>
          </div>
          <div className="p-8 md:w-2/3">
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-eco-dark mb-2">Ton profil</h4>
              <p className="text-gray-600">
                Tu te soucies de l'environnement et fais des efforts dans certains domaines, mais il y a encore de la marge de progression. Tu es conscient des enjeux écologiques mais tu n'es pas prêt à sacrifier tout ton confort.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-eco-dark mb-3">Nos conseils pour toi</h4>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="mr-2 text-eco-medium">•</span> 
                  Essaie de réduire ta consommation de viande à 2-3 fois par semaine
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-eco-medium">•</span> 
                  Privilégie les transports en commun quand c'est possible
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-eco-medium">•</span> 
                  Opte pour des vêtements de seconde main ou des marques éthiques
                </li>
              </ul>
            </div>
            <div id="start-scan" className="text-center mt-4">
              <Button 
                className="eco-button"
                onClick={handleQuizz}
              >
                Découvre ton propre profil
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiProfileSection;
