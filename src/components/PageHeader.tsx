
import { cn } from "@/lib/utils";
import Mascot from "./Mascot";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  showMascot?: boolean;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  className,
  showMascot = true
}: PageHeaderProps) => {
  return (
    <header className={cn("text-center mb-8", className)}>
      {showMascot && (
        <div className="flex justify-center mb-4">
          <Mascot size={40} mood="happy" />
        </div>
      )}
      <h1 className="text-3xl md:text-4xl font-bold text-eco-teal mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground max-w-md mx-auto">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default PageHeader;
