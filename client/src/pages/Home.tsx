import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter, MemoryCategory } from "@/components/CategoryFilter";
import { MemoryGrid } from "@/components/MemoryGrid";
import { TimelineView } from "@/components/TimelineView";
import { MemoryDetail } from "@/components/MemoryDetail";
import { AddMemoryDialog } from "@/components/AddMemoryDialog";
import { ViewToggle } from "@/components/ViewToggle";
import { Footer } from "@/components/Footer";
import { Memory } from "@/components/MemoryCard";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type Memory as MemoryType } from "@shared/schema";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<MemoryCategory>("all");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: apiMemories = [], isLoading } = useQuery<MemoryType[]>({
    queryKey: ["/api/memories"],
  });

  const memories: Memory[] = useMemo(() => {
    return apiMemories.map((m) => ({
      ...m,
      date: new Date(m.date),
      category: m.category as MemoryCategory,
    }));
  }, [apiMemories]);

  const createMemoryMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      date: Date;
      category: MemoryCategory;
      imageUrl: string;
    }) => {
      const res = await apiRequest("POST", "/api/memories", {
        ...data,
        date: data.date.toISOString(),
        isFavorite: false,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/memories"] });
      toast({
        title: "Memory saved",
        description: "Your beautiful moment has been captured.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save memory. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: async ({ id, isFavorite }: { id: string; isFavorite: boolean }) => {
      const res = await apiRequest("PATCH", `/api/memories/${id}`, { isFavorite });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/memories"] });
    },
  });

  const filteredMemories = useMemo(() => {
    return memories.filter((memory) => {
      const matchesCategory =
        selectedCategory === "all" || memory.category === selectedCategory;
      const matchesSearch =
        memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memory.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [memories, selectedCategory, searchQuery]);

  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
    setIsDetailOpen(true);
  };

  const handleFavorite = (memory: Memory) => {
    toggleFavoriteMutation.mutate({
      id: memory.id,
      isFavorite: !memory.isFavorite,
    });
  };

  const handleAddMemory = (data: {
    title: string;
    description: string;
    date: Date;
    category: MemoryCategory;
    imageUrl: string;
  }) => {
    createMemoryMutation.mutate(data);
  };

  const currentMemoryIndex = selectedMemory
    ? filteredMemories.findIndex((m) => m.id === selectedMemory.id)
    : -1;

  const handlePreviousMemory = () => {
    if (currentMemoryIndex > 0) {
      setSelectedMemory(filteredMemories[currentMemoryIndex - 1]);
    }
  };

  const handleNextMemory = () => {
    if (currentMemoryIndex < filteredMemories.length - 1) {
      setSelectedMemory(filteredMemories[currentMemoryIndex + 1]);
    }
  };

  const scrollToMemories = () => {
    document.getElementById("memories-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onAddMemory={() => setIsAddDialogOpen(true)}
        onSearch={setSearchQuery}
      />

      <HeroSection
        coupleName="Emma & James"
        tagline="Every moment with you is a treasure worth keeping forever"
        memoryCount={memories.length}
        onExplore={scrollToMemories}
        onAddMemory={() => setIsAddDialogOpen(true)}
      />

      <main id="memories-section" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-bold" data-testid="text-section-title">
            Our Love Story
          </h2>
          <p className="mt-2 text-muted-foreground">
            A collection of moments that make our journey beautiful
          </p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <ViewToggle view={viewMode} onViewChange={setViewMode} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-muted-foreground">Loading your memories...</div>
          </div>
        ) : viewMode === "grid" ? (
          <MemoryGrid
            memories={filteredMemories}
            onMemoryClick={handleMemoryClick}
            onFavorite={handleFavorite}
          />
        ) : (
          <TimelineView
            memories={filteredMemories}
            onMemoryClick={handleMemoryClick}
          />
        )}
      </main>

      <Footer memoryCount={memories.length} coupleName="E & J" />

      <MemoryDetail
        memory={selectedMemory}
        open={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedMemory(null);
        }}
        onPrevious={handlePreviousMemory}
        onNext={handleNextMemory}
        hasPrevious={currentMemoryIndex > 0}
        hasNext={currentMemoryIndex < filteredMemories.length - 1}
      />

      <AddMemoryDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddMemory}
      />
    </div>
  );
}
