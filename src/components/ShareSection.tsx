
import React from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { toast } from "sonner";

interface ShareSectionProps {
  profileName: string;
  score: number;
}

const ShareSection = ({ profileName, score }: ShareSectionProps) => {
  const handleShare = async () => {
    const shareText = `J'ai découvert mon profil écologique avec EcoScan : je suis ${profileName} avec un score de ${score}/100 ! Découvre le tien sur ecoscan.fr`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mon profil EcoScan",
          text: shareText,
        });
      } catch (error) {
        console.error("Error sharing:", error);
        copyToClipboard(shareText);
      }
    } else {
      copyToClipboard(shareText);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Texte copié dans le presse-papier !");
  };

  return (
    <div className="eco-card text-center">
      <h3 className="text-xl font-semibold mb-3">Partager mon résultat</h3>
      <p className="text-muted-foreground mb-4">
        Envie de partager ton profil écologique à tes amis ?
      </p>
      <Button 
        onClick={handleShare}
        className="eco-button mx-auto"
      >
        <Share size={18} />
        <span>Partager mon profil</span>
      </Button>
    </div>
  );
};

export default ShareSection;
