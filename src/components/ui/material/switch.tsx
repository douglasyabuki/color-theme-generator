import { type ComponentProps, type ReactNode, useId } from "react";

import { cn } from "@/lib/utils";

type MaterialSwitchProps = Omit<ComponentProps<"input">, "type" | "role"> & { label: ReactNode };

export function MaterialSwitch({ label, id, className, disabled, ...props }: MaterialSwitchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label className={cn("material-selection", className)} htmlFor={inputId} data-disabled={disabled || undefined}>
      <span className="material-switch__target">
        <input {...props} id={inputId} disabled={disabled} type="checkbox" role="switch" className="material-selection__input" />
        <span className="material-switch__track" aria-hidden="true"><span className="material-switch__handle" /></span>
      </span>
      <span className="material-selection__label">{label}</span>
    </label>
  );
}
