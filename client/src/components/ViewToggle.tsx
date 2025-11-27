import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

type ViewMode = "grid" | "timeline";

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border p-1" data-testid="view-toggle">
      <Button
        size="sm"
        variant={view === "grid" ? "default" : "ghost"}
        onClick={() => onViewChange("grid")}
        className="gap-2"
        data-testid="button-view-grid"
      >
        <LayoutGrid className="h-4 w-4" />
        Grid
      </Button>
      <Button
        size="sm"
        variant={view === "timeline" ? "default" : "ghost"}
        onClick={() => onViewChange("timeline")}
        className="gap-2"
        data-testid="button-view-timeline"
      >
        <List className="h-4 w-4" />
        Timeline
      </Button>
    </div>
  );
}
