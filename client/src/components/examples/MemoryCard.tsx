import { MemoryCard, Memory } from "../MemoryCard";
import coffeeImage from "@assets/generated_images/couple_coffee_date_cafe.png";

export default function MemoryCardExample() {
  const memory: Memory = {
    id: "1",
    title: "Our First Coffee Date",
    description: "The day we met at that cozy little cafe downtown. I still remember how nervous we both were, but the conversation flowed so naturally.",
    date: new Date("2023-06-15"),
    category: "first-dates",
    imageUrl: coffeeImage,
    isFavorite: true,
  };

  return (
    <div className="max-w-sm">
      <MemoryCard
        memory={memory}
        onClick={(m) => console.log("Clicked:", m.title)}
        onFavorite={(m) => console.log("Favorited:", m.title)}
      />
    </div>
  );
}
