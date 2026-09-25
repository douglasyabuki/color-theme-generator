import { type ComponentProps, useId } from "react";

import { cn } from "@/lib/utils";

type MaterialTextFieldProps = Omit<ComponentProps<"input">, "type"> & {
  variant?: "filled" | "outlined";
  label: string;
  supportingText?: string;
  errorText?: string;
  type?: "text" | "email" | "password" | "search" | "url" | "tel" | "number";
};

export function MaterialTextField({
  variant = "outlined",
  label,
  supportingText,
  errorText,
  className,
  id,
  disabled,
  required,
  placeholder,
  type = "text",
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  ...props
}: MaterialTextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const description = errorText || supportingText;
  const descriptionId = `${inputId}-description`;
  return (
    <div
      className={cn(
        "group/field min-w-0 text-(--md-sys-color-on-surface)",
        className,
      )}
      data-variant={variant}
      data-error={Boolean(errorText) || invalid === true || invalid === "true"}
      data-disabled={disabled || undefined}
    >
      <div
        className={cn(
          "group/control relative min-h-14 rounded-[4px]",
          "group-data-[variant=filled]/field:rounded-b-none group-data-[variant=filled]/field:border-b group-data-[variant=filled]/field:border-(--md-sys-color-on-surface-variant) group-data-[variant=filled]/field:bg-(--md-sys-color-surface-container-highest)",
          "group-data-[variant=filled]/field:not-has-disabled:hover:bg-[color-mix(in_srgb,var(--md-sys-color-on-surface)_8%,var(--md-sys-color-surface-container-highest))] group-data-[variant=filled]/field:has-focus:border-(--md-sys-color-primary) group-data-[variant=filled]/field:has-focus:shadow-[inset_0_-2px_var(--md-sys-color-primary)]",
          "group-data-[variant=filled]/field:group-data-[error=true]/field:border-(--md-sys-color-error) group-data-[variant=filled]/field:group-data-[error=true]/field:has-focus:border-(--md-sys-color-error) group-data-[variant=filled]/field:group-data-[error=true]/field:has-focus:shadow-[inset_0_-2px_var(--md-sys-color-error)]",
          "group-data-[variant=filled]/field:group-data-disabled/field:border-(--md-sys-color-on-surface)/38 group-data-[variant=filled]/field:group-data-disabled/field:bg-(--md-sys-color-on-surface)/4",
        )}
        data-placeholder={Boolean(placeholder) || undefined}
      >
        <input
          {...props}
          id={inputId}
          type={type}
          disabled={disabled}
          required={required}
          placeholder={placeholder || " "}
          className="peer block h-14 w-full rounded-[inherit] border-0 bg-transparent p-4 text-base leading-6 text-(--md-sys-color-on-surface) caret-(--md-sys-color-primary) outline-none group-data-[error=true]/field:caret-(--md-sys-color-error) group-data-[variant=filled]/field:pt-6 group-data-[variant=filled]/field:pb-2 placeholder:text-(--md-sys-color-on-surface-variant) disabled:text-(--md-sys-color-on-surface)/38"
          aria-invalid={errorText ? true : invalid}
          aria-describedby={
            [describedBy, description ? descriptionId : undefined]
              .filter(Boolean)
              .join(" ") || undefined
          }
        />
        <label
          className={cn(
            "absolute start-4 top-4 max-w-[calc(100%_-_32px)] cursor-text truncate text-base leading-6 text-(--md-sys-color-on-surface-variant) transition-[top,font-size] duration-150",
            "group-data-placeholder/control:-top-2.25 group-data-placeholder/control:text-xs group-data-placeholder/control:leading-4.5 peer-not-placeholder-shown:-top-2.25 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:leading-4.5 peer-autofill:-top-2.25 peer-autofill:text-xs peer-autofill:leading-4.5 peer-focus:-top-2.25 peer-focus:text-xs peer-focus:leading-4.5 peer-focus:text-(--md-sys-color-primary)",
            "group-data-[variant=filled]/field:group-data-placeholder/control:top-1.5 group-data-[variant=filled]/field:peer-not-placeholder-shown:top-1.5 group-data-[variant=filled]/field:peer-autofill:top-1.5 group-data-[variant=filled]/field:peer-focus:top-1.5",
            "group-data-[error=true]/field:text-(--md-sys-color-error) group-data-[error=true]/field:peer-focus:text-(--md-sys-color-error) peer-disabled:text-(--md-sys-color-on-surface)/38 group-data-[error=true]/field:peer-disabled:text-(--md-sys-color-on-surface)/38",
          )}
          htmlFor={inputId}
        >
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
        {variant === "outlined" && (
          <fieldset
            className={cn(
              "pointer-events-none absolute inset-x-0 -top-2.25 bottom-0 m-0 min-w-0 rounded-[inherit] border border-(--md-sys-color-outline) px-2.75 py-0 peer-focus:border-2 peer-focus:border-(--md-sys-color-primary) group-hover/control:peer-focus:border-(--md-sys-color-primary) group-hover/control:peer-enabled:border-(--md-sys-color-on-surface)",
              "group-data-[error=true]/field:border-(--md-sys-color-error) group-data-[error=true]/field:peer-focus:border-(--md-sys-color-error) group-data-[error=true]/field:group-hover/control:peer-focus:border-(--md-sys-color-error) group-data-[error=true]/field:group-hover/control:peer-enabled:border-(--md-sys-color-error) peer-disabled:border-(--md-sys-color-on-surface)/12 group-data-[error=true]/field:peer-disabled:border-(--md-sys-color-on-surface)/12",
            )}
            aria-hidden="true"
          >
            <legend className="invisible h-4.5 w-auto max-w-0 p-0 text-xs leading-4.5 whitespace-nowrap group-has-autofill/control:max-w-full group-has-focus/control:max-w-full group-has-[input:not(:placeholder-shown)]/control:max-w-full group-data-placeholder/control:max-w-full">
              <span className="px-1">
                {label}
                {required ? " *" : ""}
              </span>
            </legend>
          </fieldset>
        )}
      </div>
      {description && (
        <p
          className="mx-4 mt-1 text-xs leading-4 text-(--md-sys-color-on-surface-variant) group-data-disabled/field:text-(--md-sys-color-on-surface)/38 group-data-[error=true]/field:text-(--md-sys-color-error) group-data-disabled/field:group-data-[error=true]/field:text-(--md-sys-color-on-surface)/38"
          id={descriptionId}
        >
          {description}
        </p>
      )}
    </div>
  );
}
