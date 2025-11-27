import { TimelineView } from "../TimelineView";
import { Memory } from "../MemoryCard";
import coffeeImage from "@assets/generated_images/couple_coffee_date_cafe.png";
import dancingImage from "@assets/generated_images/couple_dancing_fairy_lights.png";
import autumnImage from "@assets/generated_images/couple_autumn_park_walk.png";

export default function TimelineViewExample() {
  const memories: Memory[] = [
    {
      id: "1",
      title: "Our First Coffee Date",
      description: "The day we met at that cozy little cafe downtown. I still remember how nervous we both were.",
      date: new Date("2023-06-15"),
      category: "first-dates",
      imageUrl: coffeeImage,
      isFavorite: true,
    },
    {
      id: "2",
      title: "Dancing Under the Stars",
      description: "Our magical night at Sarah's wedding reception.",
      date: new Date("2023-09-22"),
      category: "special",
      imageUrl: dancingImage,
      isFavorite: true,
    },
    {
      id: "3",
      title: "Autumn Walk in the Park",
      description: "A perfect fall afternoon just being together.",
      date: new Date("2023-10-08"),
      category: "everyday",
      imageUrl: autumnImage,
      isFavorite: false,
    },
  ];

  return (
    <div className="py-8">
      <TimelineView
        memories={memories}
        onMemoryClick={(m) => console.log("Clicked:", m.title)}
      />
    </div>
  );
}
