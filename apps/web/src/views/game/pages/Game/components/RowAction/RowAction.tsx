import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "src/components/DropdownMenu/DropdownMenu";
import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "src/hooks/useClickOutside";
import styles from "./RowAction.module.scss";
import { ChevronDown, ChevronUp } from "lucide-react";
export const RowAction = ({
  label,
  trigger,
  items,
}: {
  label?: string;
  trigger: string | JSX.Element;
  items?: { name: string; render: JSX.Element }[];
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger>
          <div className={styles.triggerWrapper}>
            Action
            {open ? <ChevronUp className={styles.triggerIcon} /> : <ChevronDown className={styles.triggerIcon} />}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent onPointerDownOutside={() => setOpen(false)}>
          <DropdownMenuLabel>Article</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items?.map((v) => <DropdownMenuItem key={v.name}>{v.render}</DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
