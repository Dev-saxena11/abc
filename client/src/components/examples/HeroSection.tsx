import { HeroSection } from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <HeroSection
      coupleName="Emma & James"
      tagline="Every moment with you is a treasure worth keeping forever"
      memoryCount={42}
      onExplore={() => console.log("Explore clicked")}
      onAddMemory={() => console.log("Add memory clicked")}
    />
  );
}
