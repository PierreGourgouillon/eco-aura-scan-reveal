import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import WhyEcoscanSection from "@/components/WhyEcoscanSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import AiProfileSection from "@/components/AiProfileSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  useEffect(() => {
    // Scroll animation logic
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.2,
    });

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <WhyEcoscanSection />
      <HowItWorksSection />
      <AiProfileSection />
      <FooterSection />
    </div>
  );
};

export default Index;
