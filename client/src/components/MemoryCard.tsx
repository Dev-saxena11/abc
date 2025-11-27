import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar } from "lucide-react";
import { format } from "date-fns";
import { MemoryCategory } from "./CategoryFilter";
import { motion } from "framer-motion";

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: MemoryCategory;
  imageUrl: string;
  isFavorite?: boolean;
}

interface MemoryCardProps {
  memory: Memory;
  onClick?: (memory: Memory) => void;
  onFavorite?: (memory: Memory) => void;
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

export function MemoryCard({ memory, onClick, onFavorite }: MemoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="group cursor-pointer overflow-hidden hover-elevate"
        onClick={() => onClick?.(memory)}
        data-testid={`card-memory-${memory.id}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          
          <Badge
            variant="secondary"
            className="absolute right-3 top-3 bg-background/80 backdrop-blur-sm"
          >
            <Calendar className="mr-1 h-3 w-3" />
            {format(memory.date, "MMM d, yyyy")}
          </Badge>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.(memory);
            }}
            className="absolute left-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
            data-testid={`button-favorite-${memory.id}`}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                memory.isFavorite
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        </div>
        
        <div className="p-4">
          <Badge variant="outline" className="mb-2 text-xs">
            {categoryLabels[memory.category]}
          </Badge>
          <h3
            className="font-serif text-lg font-semibold line-clamp-1"
            data-testid={`text-memory-title-${memory.id}`}
          >
            {memory.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {memory.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
