import { MemoryCard, Memory } from "./MemoryCard";

interface MemoryGridProps {
  memories: Memory[];
  onMemoryClick?: (memory: Memory) => void;
  onFavorite?: (memory: Memory) => void;
}

export function MemoryGrid({ memories, onMemoryClick, onFavorite }: MemoryGridProps) {
  if (memories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <svg
            className="h-12 w-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-semibold" data-testid="text-empty-title">
          No memories yet
        </h3>
        <p className="mt-2 text-muted-foreground">
          Start capturing your beautiful moments together
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      data-testid="memory-grid"
    >
      {memories.map((memory) => (
        <MemoryCard
          key={memory.id}
          memory={memory}
          onClick={onMemoryClick}
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
}
