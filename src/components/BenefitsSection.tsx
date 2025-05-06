import React from "react";
import { Clock, CircleCheck, Rocket } from "lucide-react";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefit: React.FC<BenefitProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-eco-dark mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-eco-dark">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 bg-eco-lightest">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-eco-dark mb-14">
          Pourquoi utiliser EcoScan ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Benefit
            icon={<Clock size={48} />}
            title="Rapide"
            description="5 questions, 2 minutes de ton temps, et tu découvres ton profil écologique."
          />
          <Benefit
            icon={<CircleCheck size={48} />}
            title="Gratuit"
            description="Un service 100% gratuit, accessible à tous, sans inscription requise."
          />
          <Benefit
            icon={<Rocket size={48} />}
            title="Impactant"
            description="Des conseils personnalisés et concrets pour réduire ton empreinte écologique au quotidien."
          />
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
