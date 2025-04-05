import { twMerge } from "tailwind-merge";
import { ComponentsSizes } from "../../../types/components-sizes";
import { ComponentsVariants } from "../../../types/components-variants";
import { Input } from "../input/Input";
import { Label } from "../label/Label";

interface ColorPicker {
  id?: string;
  className?: string;
  label?: string;
  color: string;
  onColorChange: (color: string) => void;
  size?: ComponentsSizes;
  variant?: ComponentsVariants;
}

export const ColorPicker = ({
  id = "color-picker",
  label,
  size = "medium",
  color,
  variant = "primary",
  className,
  onColorChange,
}: ColorPicker) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-start justify-start gap-2",
        className,
      )}
    >
      <Label
        htmlFor={id}
        className="text-sm font-bold"
        label={label}
        size={size}
        variant={variant}
      />
      <Input
        id={id}
        type="color"
        value={color}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onColorChange(e.target.value)
        }
        className="size-10 cursor-pointer appearance-none overflow-hidden rounded-full animate-border border-angle border-active border-2 bg-transparent p-0 outline-none"
        customSize={size}
        variant={variant}
      />
    </div>
  );
};
