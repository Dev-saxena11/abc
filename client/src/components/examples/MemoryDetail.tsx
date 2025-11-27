import { useState } from "react";
import { MemoryDetail } from "../MemoryDetail";
import { Memory } from "../MemoryCard";
import { Button } from "@/components/ui/button";
import dancingImage from "@assets/generated_images/couple_dancing_fairy_lights.png";

export default function MemoryDetailExample() {
  const [open, setOpen] = useState(true);
  
  const memory: Memory = {
    id: "2",
    title: "Dancing Under the Stars",
    description: "Our magical night at Sarah's wedding reception. The fairy lights were twinkling, the music was perfect, and for a moment, it felt like we were the only two people in the world. You looked absolutely stunning, and I couldn't believe how lucky I was to be holding you in my arms. This was the night I knew I wanted to spend forever with you.",
    date: new Date("2023-09-22"),
    category: "special",
    imageUrl: dancingImage,
    isFavorite: true,
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Memory Detail</Button>
      <MemoryDetail
        memory={memory}
        open={open}
        onClose={() => setOpen(false)}
        hasPrevious={true}
        hasNext={true}
        onPrevious={() => console.log("Previous")}
        onNext={() => console.log("Next")}
      />
    </div>
  );
}
