import { CheckIcon, MinusIcon } from "lucide-react";
import { type ComponentProps, type ReactNode, useCallback, useId } from "react";

import { cn } from "@/lib/utils";

type MaterialCheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label: ReactNode;
  indeterminate?: boolean;
};

export function MaterialCheckbox({
  label,
  indeterminate = false,
  id,
  className,
  ref,
  disabled,
  ...props
}: MaterialCheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useCallback(
    (node: HTMLInputElement | null) => {
      if (node) node.indeterminate = indeterminate;
      if (typeof ref === "function") return ref(node);
      if (ref) ref.current = node;
    },
    [indeterminate, ref],
  );
  return (
    <label
      className={cn(
        "group/selection flex min-h-12 w-fit max-w-full cursor-pointer items-center gap-2 text-sm leading-5 text-(--md-sys-color-on-surface) data-disabled:cursor-default",
        className,
      )}
      htmlFor={inputId}
      data-disabled={disabled || undefined}
    >
      <span className="relative inline-flex size-12 shrink-0 items-center justify-center">
        <input
          {...props}
          ref={inputRef}
          id={inputId}
          disabled={disabled}
          type="checkbox"
          className="peer absolute inset-0 z-1 m-0 size-full cursor-[inherit] opacity-0 forced-colors:inset-3 forced-colors:size-6 forced-colors:appearance-auto forced-colors:opacity-100"
        />
        <span className="pointer-events-none absolute inset-1 rounded-full bg-(--md-sys-color-on-surface) opacity-0 peer-checked:bg-(--md-sys-color-primary) peer-indeterminate:bg-(--md-sys-color-primary) peer-focus-visible:bg-transparent peer-focus-visible:opacity-100 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-(--md-sys-color-primary) peer-enabled:peer-hover:peer-not-focus-visible:opacity-8 peer-enabled:peer-active:peer-not-focus-visible:opacity-12 forced-colors:invisible" />
        <span
          className={cn(
            "pointer-events-none grid size-4.5 place-items-center rounded-[2px] border-2 border-(--md-sys-color-on-surface-variant) text-(--md-sys-color-on-primary) peer-checked:border-(--md-sys-color-primary) peer-checked:bg-(--md-sys-color-primary) peer-indeterminate:border-(--md-sys-color-primary) peer-indeterminate:bg-(--md-sys-color-primary)",
            "peer-disabled:border-(--md-sys-color-on-surface)/38 peer-disabled:peer-checked:border-transparent peer-disabled:peer-checked:bg-(--md-sys-color-on-surface)/38 peer-disabled:peer-checked:bg-clip-padding peer-disabled:peer-checked:text-(--md-sys-color-surface) peer-disabled:peer-indeterminate:border-transparent peer-disabled:peer-indeterminate:bg-(--md-sys-color-on-surface)/38 peer-disabled:peer-indeterminate:bg-clip-padding peer-disabled:peer-indeterminate:text-(--md-sys-color-surface)",
            "forced-colors:invisible peer-checked:peer-not-indeterminate:[&>svg:first-child]:block peer-indeterminate:[&>svg:last-child]:block",
          )}
          aria-hidden="true"
        >
          <CheckIcon className="hidden size-4 stroke-3" />
          <MinusIcon className="hidden size-4 stroke-3" />
        </span>
      </span>
      <span className="group-data-disabled/selection:text-(--md-sys-color-on-surface)/38">
        {label}
      </span>
    </label>
  );
}
