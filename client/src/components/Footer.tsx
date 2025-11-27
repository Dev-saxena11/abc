import { Heart } from "lucide-react";

interface FooterProps {
  memoryCount?: number;
  coupleName?: string;
}

export function Footer({ memoryCount = 0, coupleName = "E & J" }: FooterProps) {
  return (
    <footer className="border-t bg-card py-8">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-5 w-5 fill-primary text-primary" />
          <span className="font-serif text-lg font-semibold" data-testid="text-footer-couple">
            {coupleName}
          </span>
          <Heart className="h-5 w-5 fill-primary text-primary" />
        </div>
        
        <p className="text-sm text-muted-foreground" data-testid="text-footer-count">
          {memoryCount} Beautiful Moments Captured
        </p>
        
        <p className="mt-4 text-xs text-muted-foreground italic">
          "The best thing to hold onto in life is each other." — Audrey Hepburn
        </p>
      </div>
    </footer>
  );
}
