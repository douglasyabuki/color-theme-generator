import { twMerge } from "tailwind-merge";
import { ComponentsSizes } from "../../../types/components-sizes";
import { ComponentsVariants } from "../../../types/components-variants";

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  size?: ComponentsSizes;
  variant?: ComponentsVariants;
}

const buttonStyles: Record<"small" | "medium" | "large", string> = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

export const Button = ({
  children,
  className,
  variant,
  size = "medium",
  ...props
}: Button) => {
  return (
    <button
      className={twMerge(
        "h-fit w-fit font-bold",
        variant,
        buttonStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
