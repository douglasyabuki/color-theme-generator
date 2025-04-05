import { useThemePicker } from "../../hooks/use-theme-picker";
import { ColorPicker } from "../ui/color-picker/ColorPicker";

export const ThemePicker = () => {
  const { themeColors, onThemeColorChange } = useThemePicker();
  return (
    <div className="flex flex-col items-start">
      {Object.entries(themeColors).map(([key, value]) => {
        return (
          <ColorPicker
            key={key}
            variant="primary"
            label={`Pick a ${key} color`}
            color={value}
            onColorChange={(color: string) =>
              onThemeColorChange(
                color,
                key as "primary" | "secondary" | "tertiary",
              )
            }
          />
        );
      })}
    </div>
  );
};
