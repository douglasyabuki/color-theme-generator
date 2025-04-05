import { twMerge } from "tailwind-merge";
import { ComponentsSizes } from "../../../types/components-sizes";
import { ComponentsVariants } from "../../../types/components-variants";

interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  className?: string;
  variant?: ComponentsVariants;
  customSize?: ComponentsSizes;
  isUnstyled?: boolean;
}

const inputStyles: Record<"small" | "medium" | "large", string> = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

export const Input = ({
  id,
  className,
  customSize = "medium",
  variant = "primary",
  isUnstyled = false,
  ...props
}: Input) => {
  return (
    <input
      id={id}
      className={twMerge(
        isUnstyled ? ["appearance-none"] : [inputStyles[customSize], variant],
        className,
      )}
      {...props}
    />
  );
};
