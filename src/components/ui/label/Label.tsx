import { twMerge } from "tailwind-merge";
import { ComponentsSizes } from "../../../types/components-sizes";
import { ComponentsVariants } from "../../../types/components-variants";

interface Label extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label?: string;
  className?: string;
  htmlFor?: string;
  size?: ComponentsSizes;
  variant?: ComponentsVariants;
}

const labelSizeStyles: Record<"small" | "medium" | "large", string> = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

const labelVariantStyles: Record<ComponentsVariants, string> = {
  primary: "text-[var(--on-primary)]",
  secondary: "text-[var(--on-secondary)]",
  tertiary: "text-[var(--on-tertiary)]",
  error: "text-[var(--on-error)]",
};

export const Label = ({
  label,
  className,
  htmlFor = "input",
  size = "medium",
  variant = "primary",
  ...props
}: Label) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        label ? [labelSizeStyles[size], labelVariantStyles[variant]] : "hidden",
        className,
      )}
      {...props}
    >
      {label}
    </label>
  );
};
