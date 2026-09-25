import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type MaterialCardProps = ComponentProps<"div"> & { variant?: "filled" | "elevated" | "outlined" };

export function MaterialCard({ variant = "filled", className, ...props }: MaterialCardProps) {
  return <div {...props} className={cn("material-card", className)} data-variant={variant} />;
}
