import { CheckIcon, MinusIcon } from "lucide-react";
import { type ComponentProps, type ReactNode, useCallback, useId } from "react";

import { cn } from "@/lib/utils";

type MaterialCheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label: ReactNode;
  indeterminate?: boolean;
};

export function MaterialCheckbox({ label, indeterminate = false, id, className, ref, disabled, ...props }: MaterialCheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useCallback((node: HTMLInputElement | null) => {
    if (node) node.indeterminate = indeterminate;
    if (typeof ref === "function") return ref(node);
    if (ref) ref.current = node;
  }, [indeterminate, ref]);
  return (
    <label className={cn("material-selection", className)} htmlFor={inputId} data-disabled={disabled || undefined}>
      <span className="material-checkbox__target">
        <input {...props} ref={inputRef} id={inputId} disabled={disabled} type="checkbox" className="material-selection__input" />
        <span className="material-checkbox__state" />
        <span className="material-checkbox__box" aria-hidden="true"><CheckIcon className="material-checkbox__check" /><MinusIcon className="material-checkbox__mixed" /></span>
      </span>
      <span className="material-selection__label">{label}</span>
    </label>
  );
}
