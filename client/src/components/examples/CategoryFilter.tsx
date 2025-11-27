import { useState } from "react";
import { CategoryFilter, MemoryCategory } from "../CategoryFilter";

export default function CategoryFilterExample() {
  const [selected, setSelected] = useState<MemoryCategory>("all");
  
  return (
    <CategoryFilter
      selected={selected}
      onSelect={(cat) => {
        setSelected(cat);
        console.log("Category selected:", cat);
      }}
    />
  );
}
