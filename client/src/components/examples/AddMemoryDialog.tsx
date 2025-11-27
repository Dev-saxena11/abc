import { useState } from "react";
import { AddMemoryDialog } from "../AddMemoryDialog";
import { Button } from "@/components/ui/button";

export default function AddMemoryDialogExample() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Memory</Button>
      <AddMemoryDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log("New memory:", data);
          setOpen(false);
        }}
      />
    </div>
  );
}
