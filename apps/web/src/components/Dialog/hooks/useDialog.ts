import { useState } from "react";

export function useDialog() {
  const [open, setOpen] = useState(false);
  const onOpenChange = () => {
    setOpen((prev) => !prev);
  };
  return { open, onOpenChange };
}
