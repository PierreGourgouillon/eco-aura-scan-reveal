
import React, { useEffect, useRef } from "react";
import { FileQuestion, Layers, FileCheck } from "lucide-react";

interface StepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, delay }) => {
  return (
    <div 
      className="flex flex-col items-center text-center animate-on-scroll"
      style={{ transitionDelay: delay }}
    >
      <div className="bg-eco-lightest w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-md">
        <div className="text-eco-dark">{icon}</div>
      </div>
      <div className="bg-eco-medium text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-3">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-eco-dark">{title}</h3>
      <p className="text-gray-600 max-w-xs">{description}</p>
    </div>
  );
};

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="how-it-works" className="py-20 bg-eco-lightest" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-eco-dark mb-14">
          Comment ça marche ?
        </h2>
        
        <div className="relative">
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-eco-light z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <Step
              number="1"
              title="Réponds à quelques questions"
              description="5-6 questions simples sur ton alimentation, tes habitudes de transport et ta consommation."
              icon={<FileQuestion size={36} />}
              delay="0ms"
            />
            <Step
              number="2"
              title="L'IA analyse ton profil"
              description="Notre intelligence artificielle traite tes réponses et détermine ton profil écologique."
              icon={<Layers size={36} />}
              delay="150ms"
            />
            <Step
              number="3"
              title="Tu reçois des conseils personnalisés"
              description="Obtiens des recommandations concrètes et adaptées à ton mode de vie pour réduire ton impact."
              icon={<FileCheck size={36} />}
              delay="300ms"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
