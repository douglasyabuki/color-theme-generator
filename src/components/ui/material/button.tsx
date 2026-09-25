import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type MaterialButtonProps = ComponentProps<"button"> & {
  variant?: "filled" | "tonal" | "outlined" | "text" | "elevated";
  leadingIcon?: ReactNode;
};

export function MaterialButton({
  variant = "filled", leadingIcon, children, className, type = "button", ...props
}: MaterialButtonProps) {
  return (
    <button {...props} type={type} className={cn("material-button", className)} data-variant={variant}>
      <span className="material-button__surface">
        {leadingIcon && <span className="material-button__icon" aria-hidden="true">{leadingIcon}</span>}
        <span>{children}</span>
      </span>
    </button>
  );
}
