import { twMerge } from "tailwind-merge";
import { ComponentsSizes } from "../../../types/components-sizes";
import { Input } from "../input/Input";
import { Label } from "../label/Label";

interface ColorPicker {
  id?: string;
  className?: string;
  label?: string;
  color: string;
  onColorChange: (color: string) => void;
  size?: ComponentsSizes;
}

export const ColorPicker = ({
  id = "color-picker",
  label,
  size = "medium",
  color,
  className,
  onColorChange,
}: ColorPicker) => {
  return (
    <div
      className={twMerge(
        "secondary-fixed flex flex-col items-start justify-start gap-2 rounded-md px-4 py-3",
        className,
      )}
    >
      <Label
        htmlFor={id}
        className="text-sm font-bold text-[var(--on-secondary-fixed)]"
        label={label}
        size={size}
      />
      <Input
        id={id}
        type="color"
        value={color}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onColorChange(e.target.value)
        }
        className="animate-border border-angle border-active size-10 cursor-pointer appearance-none overflow-hidden rounded-full border-2 bg-transparent p-0 outline-none"
        customSize={size}
      />
    </div>
  );
};
