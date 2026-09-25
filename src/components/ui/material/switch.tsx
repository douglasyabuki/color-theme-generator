import { type ComponentProps, type ReactNode, useId } from "react";

import { cn } from "@/lib/utils";

type MaterialSwitchProps = Omit<ComponentProps<"input">, "type" | "role"> & {
  label: ReactNode;
};

export function MaterialSwitch({
  label,
  id,
  className,
  disabled,
  ...props
}: MaterialSwitchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label
      className={cn(
        "group/selection flex min-h-12 w-fit max-w-full cursor-pointer items-center gap-2 text-sm leading-5 text-(--md-sys-color-on-surface) data-disabled:cursor-default",
        className,
      )}
      htmlFor={inputId}
      data-disabled={disabled || undefined}
    >
      <span className="group/switch relative inline-flex h-12 w-13 shrink-0 items-center justify-center">
        <input
          {...props}
          id={inputId}
          disabled={disabled}
          type="checkbox"
          role="switch"
          className="peer absolute inset-0 z-1 m-0 size-full cursor-[inherit] opacity-0 forced-colors:inset-3 forced-colors:size-6 forced-colors:appearance-auto forced-colors:opacity-100"
        />
        <span
          className={cn(
            "pointer-events-none relative flex h-8 w-13 items-center rounded-[16px] border-2 border-(--md-sys-color-outline) bg-(--md-sys-color-surface-container-highest) peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-(--md-sys-color-primary) peer-enabled:peer-checked:border-(--md-sys-color-primary) peer-enabled:peer-checked:bg-(--md-sys-color-primary)",
            "peer-disabled:border-(--md-sys-color-on-surface)/12 peer-disabled:bg-(--md-sys-color-surface-container-highest)/12 peer-disabled:peer-checked:border-transparent peer-disabled:peer-checked:bg-(--md-sys-color-on-surface)/12 forced-colors:invisible",
          )}
          aria-hidden="true"
        >
          <span
            className={cn(
              "absolute left-1.5 size-4 rounded-full bg-(--md-sys-color-outline) transition-[left,width,height] duration-150 group-has-checked/switch:left-5.5 group-has-checked/switch:size-6 group-has-disabled/switch:bg-(--md-sys-color-on-surface)/38 group-has-[input:disabled:checked]/switch:bg-(--md-sys-color-surface) group-has-[input:enabled:active]/switch:left-0 group-has-[input:enabled:active]/switch:size-7 group-has-[input:enabled:checked]/switch:bg-(--md-sys-color-on-primary) group-has-[input:enabled:checked:active]/switch:left-5",
              "before:absolute before:top-1/2 before:left-1/2 before:size-10 before:-translate-1/2 before:rounded-full before:bg-(--md-sys-color-on-surface) before:opacity-0 before:content-[''] group-has-checked/switch:before:bg-(--md-sys-color-primary) group-has-[input:enabled:active]/switch:before:opacity-12 [@media(hover:hover)]:group-has-[input:enabled:hover]/switch:before:opacity-8",
            )}
          />
        </span>
      </span>
      <span className="group-data-disabled/selection:text-(--md-sys-color-on-surface)/38">
        {label}
      </span>
    </label>
  );
}
