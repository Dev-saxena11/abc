import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Memory } from "./MemoryCard";
import { format } from "date-fns";
import { Heart, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { MemoryCategory } from "./CategoryFilter";

interface MemoryDetailProps {
  memory: Memory | null;
  open: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const categoryLabels: Record<MemoryCategory, string> = {
  all: "Memory",
  "first-dates": "First Date",
  anniversaries: "Anniversary",
  travels: "Travel",
  everyday: "Everyday",
  milestones: "Milestone",
  special: "Special",
};

export function MemoryDetail({
  memory,
  open,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: MemoryDetailProps) {
  if (!memory) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden" data-testid="dialog-memory-detail">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 backdrop-blur-sm"
          data-testid="button-close-detail"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={memory.imageUrl}
              alt={memory.title}
              className="h-full w-full object-cover"
            />
            
            {hasPrevious && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={onPrevious}
                data-testid="button-previous-memory"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            
            {hasNext && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={onNext}
                data-testid="button-next-memory"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <div className="flex flex-col p-6">
            <DialogHeader className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{categoryLabels[memory.category]}</Badge>
                <Heart
                  className={`h-4 w-4 ${
                    memory.isFavorite
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              </div>
              <DialogTitle className="font-serif text-2xl font-bold" data-testid="text-detail-title">
                {memory.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(memory.date, "MMMM d, yyyy")}</span>
            </div>
            
            <div className="mt-6 flex-1">
              <p className="text-foreground leading-relaxed" data-testid="text-detail-description">
                {memory.description}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <p className="text-xs text-muted-foreground italic">
                "Every love story is beautiful, but ours is my favorite."
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
