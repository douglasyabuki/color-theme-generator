import { CheckIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type MaterialChipProps = ComponentProps<"button"> &
  (
    | { variant?: "assist"; selected?: never; onSelectedChange?: never }
    | {
        variant: "filter";
        selected: boolean;
        onSelectedChange: (selected: boolean) => void;
      }
  );

export function MaterialChip({
  variant = "assist",
  selected,
  onSelectedChange,
  onClick,
  children,
  className,
  type = "button",
  ...props
}: MaterialChipProps) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        "group/chip inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[8px] border-0 bg-transparent p-0 align-middle text-sm leading-5 font-medium focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-(--md-sys-color-primary) disabled:cursor-default",
        className,
      )}
      aria-pressed={variant === "filter" ? selected : undefined}
      data-selected={selected || undefined}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && variant === "filter")
          onSelectedChange?.(!selected);
      }}
    >
      <span
        className={cn(
          "relative isolate inline-flex min-h-8 items-center justify-center gap-2 rounded-[inherit] border border-(--md-sys-color-outline) px-3.75 py-1.25 text-(--md-sys-color-on-surface) before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:bg-current before:opacity-0 before:transition-opacity before:duration-150 before:content-[''] group-enabled/chip:group-hover/chip:before:opacity-8 group-enabled/chip:group-active/chip:before:opacity-12",
          "group-disabled/chip:border-(--md-sys-color-on-surface)/12 group-disabled/chip:text-(--md-sys-color-on-surface)/38 group-data-selected/chip:border-transparent group-enabled/chip:group-data-selected/chip:bg-(--md-sys-color-secondary-container) group-enabled/chip:group-data-selected/chip:text-(--md-sys-color-on-secondary-container) group-disabled/chip:group-data-selected/chip:bg-(--md-sys-color-on-surface)/12 forced-colors:border-[ButtonText]",
        )}
      >
        {selected && <CheckIcon className="size-4.5" aria-hidden="true" />}
        <span>{children}</span>
      </span>
    </button>
  );
}
