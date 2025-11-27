import { useState } from "react";
import { ViewToggle } from "../ViewToggle";

export default function ViewToggleExample() {
  const [view, setView] = useState<"grid" | "timeline">("grid");
  
  return (
    <ViewToggle
      view={view}
      onViewChange={(v) => {
        setView(v);
        console.log("View changed to:", v);
      }}
    />
  );
}
