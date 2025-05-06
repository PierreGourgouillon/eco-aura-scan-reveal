
import React, { useEffect, useRef } from "react";
import { Rocket, Users } from "lucide-react";

interface TechItemProps {
  name: string;
}

const TechItem: React.FC<TechItemProps> = ({ name }) => {
  return (
    <div className="bg-white px-4 py-2 rounded-full text-eco-dark font-medium shadow-sm">
      {name}
    </div>
  );
};

const HackathonSection: React.FC = () => {
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
    <section className="py-20 bg-eco-lightest" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6 animate-on-scroll">
            <Rocket className="text-eco-dark mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-eco-dark">
              Conçu pendant un hackathon
            </h2>
          </div>
          
          <p className="text-center text-gray-600 mb-10 animate-on-scroll">
            EcoScan a été créé lors d'un hackathon dédié aux projets à impact positif. 
            Notre équipe de développeurs et designers passionnés a conçu cette solution en 48h.
          </p>
          
          <div className="mb-10 animate-on-scroll">
            <div className="flex items-center mb-4">
              <Users className="text-eco-dark mr-2" />
              <h3 className="text-xl font-semibold text-eco-dark">Notre équipe</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Une équipe pluridisciplinaire de 5 personnes : développeurs full-stack, 
              designer UX/UI, et expert en développement durable.
            </p>
          </div>
          
          <div className="animate-on-scroll">
            <h3 className="text-xl font-semibold text-eco-dark mb-4">Technologies utilisées</h3>
            <div className="flex flex-wrap gap-2">
              <TechItem name="GPT-4" />
              <TechItem name="React" />
              <TechItem name="TypeScript" />
              <TechItem name="Tailwind CSS" />
              <TechItem name="Shadcn/ui" />
              <TechItem name="Node.js" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HackathonSection;
