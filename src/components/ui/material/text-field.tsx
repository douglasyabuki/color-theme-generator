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
  variant = "outlined", label, supportingText, errorText, className, id,
  disabled, required, placeholder, type = "text", "aria-describedby": describedBy,
  "aria-invalid": invalid, ...props
}: MaterialTextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const description = errorText || supportingText;
  const descriptionId = `${inputId}-description`;
  return (
    <div className={cn("material-field", className)} data-variant={variant} data-error={Boolean(errorText) || invalid === true || invalid === "true"} data-disabled={disabled || undefined}>
      <div className="material-field__control" data-placeholder={Boolean(placeholder) || undefined}>
        <input {...props} id={inputId} type={type} disabled={disabled} required={required}
          placeholder={placeholder || " "} className="material-field__input"
          aria-invalid={errorText ? true : invalid}
          aria-describedby={[describedBy, description ? descriptionId : undefined].filter(Boolean).join(" ") || undefined} />
        <label className="material-field__label" htmlFor={inputId}>{label}{required && <span aria-hidden="true"> *</span>}</label>
        {variant === "outlined" && <fieldset className="material-field__outline" aria-hidden="true"><legend><span>{label}{required ? " *" : ""}</span></legend></fieldset>}
      </div>
      {description && <p className="material-field__description" id={descriptionId}>{description}</p>}
    </div>
  );
}
