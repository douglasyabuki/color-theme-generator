import { useContext, useEffect } from "react";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import { useSessionStorage } from "../../hooks/use-session-storage";
import { useThemePicker } from "../../hooks/use-theme-picker";
import { convertColor } from "../../libs/culori/convert-color";
import { applyCssVars } from "../../utils/apply-css-vars";
import { generateMaterialDesignOklchScales } from "../../utils/generate-material-design-oklch-scales";
import { parseOklchString } from "../../utils/parse-oklch-string";
import { applySemanticTokens } from "../../utils/semantic-tokens";
import { ColorPicker } from "../ui/color-picker/ColorPicker";

export const ThemePicker = () => {
  const { storedValue: storedScales, updateStoredValue: updateStoredScales } =
    useSessionStorage("scales", {});
  const { themeColors, onThemeColorChange } = useThemePicker();
  const { mode } = useContext(DarkModeContext);

  useEffect(() => {
    if (storedScales) {
      applySemanticTokens("all");
    }
  }, [mode, storedScales]);

  return (
    <div className="flex items-start gap-4">
      {Object.entries(themeColors).map(([key, value]) => {
        return (
          <ColorPicker
            key={key}
            label={`Pick a ${key} color`}
            color={value}
            onColorChange={(color: string) => {
              onThemeColorChange(
                color,
                key as "primary" | "secondary" | "tertiary",
              );
              const asOklch = convertColor(color, "oklch");
              const { l, c, h } = parseOklchString(asOklch);
              const oklchScales = generateMaterialDesignOklchScales(
                l,
                c,
                h,
                key,
              );
              applyCssVars(oklchScales);
              updateStoredScales(oklchScales);
            }}
          />
        );
      })}
    </div>
  );
};
