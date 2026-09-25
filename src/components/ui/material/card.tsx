import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type MaterialCardProps = ComponentProps<"div"> & {
  variant?: "filled" | "elevated" | "outlined";
};

export function MaterialCard({
  variant = "filled",
  className,
  ...props
}: MaterialCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "min-w-0 rounded-[12px] border border-transparent p-6 text-(--md-sys-color-on-surface) data-[variant=elevated]:bg-(--md-sys-color-surface-container-low) data-[variant=elevated]:shadow-[0_1px_2px_color-mix(in_srgb,var(--md-sys-color-shadow)_30%,transparent),0_1px_3px_1px_color-mix(in_srgb,var(--md-sys-color-shadow)_15%,transparent)] data-[variant=filled]:bg-(--md-sys-color-surface-container-highest) data-[variant=outlined]:border-(--md-sys-color-outline-variant) data-[variant=outlined]:bg-(--md-sys-color-surface) max-[580px]:p-4 forced-colors:border-[ButtonText]",
        className,
      )}
      data-variant={variant}
    />
  );
}
