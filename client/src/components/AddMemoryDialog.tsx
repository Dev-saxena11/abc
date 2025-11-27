import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Upload, X, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { MemoryCategory } from "./CategoryFilter";

interface AddMemoryDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    title: string;
    description: string;
    date: Date;
    category: MemoryCategory;
    imageUrl: string;
  }) => void;
}

export function AddMemoryDialog({ open, onClose, onSubmit }: AddMemoryDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [category, setCategory] = useState<MemoryCategory>("everyday");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !imagePreview) return;
    
    onSubmit?.({
      title,
      description,
      date,
      category,
      imageUrl: imagePreview,
    });
    
    setTitle("");
    setDescription("");
    setDate(new Date());
    setCategory("everyday");
    setImagePreview(null);
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDate(new Date());
    setCategory("everyday");
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-lg" data-testid="dialog-add-memory">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Add a New Memory</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div
            className="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-primary/50"
            onClick={() => fileInputRef.current?.click()}
            data-testid="dropzone-image"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              data-testid="input-image"
            />
            
            {imagePreview ? (
              <div className="relative w-full">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-48 w-full rounded-md object-cover"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-2 top-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImagePreview(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <ImageIcon className="mb-2 h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click or drag to upload a photo
                </p>
              </>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Memory Title</Label>
            <Input
              id="title"
              placeholder="Give this memory a name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              data-testid="input-title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What made this moment special?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              data-testid="input-description"
            />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    data-testid="button-date-picker"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => d && setDate(d)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as MemoryCategory)}>
                <SelectTrigger data-testid="select-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-dates">First Date</SelectItem>
                  <SelectItem value="anniversaries">Anniversary</SelectItem>
                  <SelectItem value="travels">Travel</SelectItem>
                  <SelectItem value="everyday">Everyday Moment</SelectItem>
                  <SelectItem value="milestones">Milestone</SelectItem>
                  <SelectItem value="special">Special Occasion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} data-testid="button-cancel">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title || !imagePreview}
            data-testid="button-save-memory"
          >
            <Upload className="mr-2 h-4 w-4" />
            Save Memory
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
