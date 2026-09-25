import { CheckIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type MaterialChipProps = ComponentProps<"button"> & (
  | { variant?: "assist"; selected?: never; onSelectedChange?: never }
  | { variant: "filter"; selected: boolean; onSelectedChange: (selected: boolean) => void }
);

export function MaterialChip({ variant = "assist", selected, onSelectedChange, onClick, children, className, type = "button", ...props }: MaterialChipProps) {
  return (
    <button {...props} type={type} className={cn("material-chip", className)} aria-pressed={variant === "filter" ? selected : undefined} data-selected={selected || undefined}
      onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && variant === "filter") onSelectedChange?.(!selected); }}>
      <span className="material-chip__surface">{selected && <CheckIcon aria-hidden="true" />}<span>{children}</span></span>
    </button>
  );
}
