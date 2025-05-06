
import React, { useEffect, useRef } from "react";
import { ChartBar, Earth, Leaf } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, icon, delay }) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center animate-on-scroll" 
      style={{ transitionDelay: delay }}
    >
      <div className="text-eco-medium mb-3">{icon}</div>
      <h3 className="text-3xl font-bold text-eco-dark mb-2">{value}</h3>
      <p className="text-gray-600 text-center">{label}</p>
    </div>
  );
};

const WhyEcoscanSection: React.FC = () => {
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
    <section id="why-ecoscan" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-eco-dark mb-4">
          Pourquoi EcoScan ?
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          L'empreinte écologique des Français est préoccupante, mais avec de petits changements, nous pouvons tous faire une différence.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <StatCard
            value="11,5 tonnes"
            label="Émissions de CO2 par Français par an"
            icon={<ChartBar size={36} />}
            delay="0ms"
          />
          <StatCard
            value="30%"
            label="Réduction possible avec de simples habitudes quotidiennes"
            icon={<Leaf size={36} />}
            delay="150ms"
          />
          <StatCard
            value="2,7x"
            label="Planètes nécessaires si tout le monde vivait comme les Français"
            icon={<Earth size={36} />}
            delay="300ms"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyEcoscanSection;
