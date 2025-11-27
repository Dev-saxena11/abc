import { Header } from "../Header";

export default function HeaderExample() {
  return (
    <Header
      onAddMemory={() => console.log("Add memory clicked")}
      onSearch={(q) => console.log("Search:", q)}
    />
  );
}
