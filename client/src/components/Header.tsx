import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Heart, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeaderProps {
  onAddMemory?: () => void;
  onSearch?: (query: string) => void;
}

export function Header({ onAddMemory, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 fill-primary text-primary" />
          <span className="font-serif text-xl font-semibold" data-testid="text-logo">
            Our Memories
          </span>
        </div>

        <div className="hidden flex-1 max-w-md mx-8 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your memories..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
              data-testid="input-search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={onAddMemory} data-testid="button-add-memory">
            <Plus className="mr-2 h-4 w-4" />
            Add Memory
          </Button>
        </div>
      </div>
    </header>
  );
}
