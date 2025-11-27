import { Button } from "@/components/ui/button";
import { Heart, ArrowDown } from "lucide-react";
import heroImage from "@assets/generated_images/romantic_couple_sunset_beach.png";

interface HeroSectionProps {
  coupleName?: string;
  tagline?: string;
  memoryCount?: number;
  onExplore?: () => void;
  onAddMemory?: () => void;
}

export function HeroSection({
  coupleName = "Neetu & Dev",
  tagline = "Every moment with you is a treasure worth keeping forever",
  memoryCount = 42,
  onExplore,
  onAddMemory,
}: HeroSectionProps) {
  return (
    <section className="relative h-[80vh] min-h-[500px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="h-8 w-8 fill-primary text-primary animate-pulse" />
        </div>
        
        <h1
          className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          data-testid="text-couple-name"
        >
          {coupleName}
        </h1>
        
        <p
          className="mt-4 max-w-2xl font-serif text-lg italic text-white/90 sm:text-xl"
          data-testid="text-tagline"
        >
          "{tagline}"
        </p>
        
        <p className="mt-6 text-sm text-white/70" data-testid="text-memory-count">
          {memoryCount} Beautiful Moments Captured
        </p>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={onAddMemory}
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
            data-testid="button-hero-add"
          >
            <Heart className="mr-2 h-4 w-4" />
            Add a Memory
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onExplore}
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-hero-explore"
          >
            Explore Our Story
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
