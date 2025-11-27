import { Memory } from "./MemoryCard";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, Calendar } from "lucide-react";
import { format } from "date-fns";
import { MemoryCategory } from "./CategoryFilter";
import { motion } from "framer-motion";

interface TimelineViewProps {
  memories: Memory[];
  onMemoryClick?: (memory: Memory) => void;
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

export function TimelineView({ memories, onMemoryClick }: TimelineViewProps) {
  const sortedMemories = [...memories].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  if (sortedMemories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Heart className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-serif text-xl font-semibold">Start your love story</h3>
        <p className="mt-2 text-muted-foreground">
          Add your first memory to begin the timeline
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-3xl" data-testid="timeline-view">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border" />
      
      <div className="space-y-12">
        {sortedMemories.map((memory, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative flex items-center gap-8 ${
                isLeft ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
                <Card
                  className="cursor-pointer overflow-hidden hover-elevate"
                  onClick={() => onMemoryClick?.(memory)}
                  data-testid={`timeline-card-${memory.id}`}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={memory.imageUrl}
                      alt={memory.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {categoryLabels[memory.category]}
                    </Badge>
                    <h3 className="font-serif text-lg font-semibold">
                      {memory.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {memory.description}
                    </p>
                  </div>
                </Card>
              </div>
              
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Heart className="h-5 w-5" />
              </div>
              
              <div className={`flex-1 ${isLeft ? "text-left" : "text-right"}`}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">
                    {format(memory.date, "MMMM d, yyyy")}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
