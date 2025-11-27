import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Plane, Coffee, Star, Gift } from "lucide-react";

export type MemoryCategory =
  | "all"
  | "first-dates"
  | "anniversaries"
  | "travels"
  | "everyday"
  | "milestones"
  | "special";

interface CategoryFilterProps {
  selected: MemoryCategory;
  onSelect: (category: MemoryCategory) => void;
}

const categories: { id: MemoryCategory; label: string; icon: typeof Heart }[] = [
  { id: "all", label: "All Memories", icon: Heart },
  { id: "first-dates", label: "First Dates", icon: Heart },
  { id: "anniversaries", label: "Anniversaries", icon: Calendar },
  { id: "travels", label: "Travels", icon: Plane },
  { id: "everyday", label: "Everyday Moments", icon: Coffee },
  { id: "milestones", label: "Milestones", icon: Star },
  { id: "special", label: "Special Occasions", icon: Gift },
];

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" data-testid="category-filter">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selected === cat.id;
        return (
          <Badge
            key={cat.id}
            variant={isSelected ? "default" : "outline"}
            className={`cursor-pointer px-4 py-2 text-sm ${
              isSelected ? "" : "bg-transparent"
            }`}
            onClick={() => onSelect(cat.id)}
            data-testid={`badge-category-${cat.id}`}
          >
            <Icon className="mr-1.5 h-3.5 w-3.5" />
            {cat.label}
          </Badge>
        );
      })}
    </div>
  );
}
