
import React, { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Leaf className={`mr-2 ${isScrolled ? "text-eco-dark" : "text-eco-dark"}`} />
            <span className={`text-xl font-bold ${isScrolled ? "text-eco-dark" : "text-eco-dark"}`}>
              EcoScan
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("why-ecoscan")}
              className={`font-medium hover:text-eco-dark transition-colors ${
                isScrolled ? "text-gray-700" : "text-gray-800"
              }`}
            >
              Pourquoi EcoScan
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className={`font-medium hover:text-eco-dark transition-colors ${
                isScrolled ? "text-gray-700" : "text-gray-800"
              }`}
            >
              Comment ça marche
            </button>
            <button
              onClick={() => scrollToSection("ai-profile")}
              className={`font-medium hover:text-eco-dark transition-colors ${
                isScrolled ? "text-gray-700" : "text-gray-800"
              }`}
            >
              Profils AI
            </button>
            <Button
              onClick={() => scrollToSection("start-scan")}
              className="eco-button"
            >
              Commencer le scan
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${isScrolled ? "text-eco-dark" : "text-eco-dark"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white mt-4 rounded-lg shadow-lg p-4 space-y-3">
            <button
              onClick={() => scrollToSection("why-ecoscan")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-eco-lightest rounded-md"
            >
              Pourquoi EcoScan
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-eco-lightest rounded-md"
            >
              Comment ça marche
            </button>
            <button
              onClick={() => scrollToSection("ai-profile")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-eco-lightest rounded-md"
            >
              Profils AI
            </button>
            <div className="pt-2">
              <Button
                onClick={() => scrollToSection("start-scan")}
                className="eco-button w-full"
              >
                Commencer le scan
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
