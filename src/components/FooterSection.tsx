
import React from "react";
import { Leaf, Github, Twitter, Linkedin } from "lucide-react";

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-eco-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <Leaf className="mr-2" />
              <span className="text-xl font-bold">EcoScan</span>
            </div>
            <p className="text-eco-lightest max-w-xs">
              Découvre ton impact écologique et améliore tes habitudes quotidiennes 
              grâce à l'intelligence artificielle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-eco-lightest hover:text-white transition-colors">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-eco-lightest hover:text-white transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-eco-lightest hover:text-white transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center text-eco-lightest hover:text-white transition-colors"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    <span>Code source</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-eco-lightest">
          <p>© {new Date().getFullYear()} EcoScan. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
