import { useState } from "react";
import { convertToHex } from "../libs/culori/convert-to-hex";
import { useOnMount } from "./use-on-mount";

export const useThemePicker = () => {
  const [themeColors, setThemeColors] = useState({
    primary: "#ffffff",
    secondary: "#ffffff",
    tertiary: "#ffffff",
  });

  useOnMount(() => {
    const rootStyles = getComputedStyle(document.documentElement);

    setThemeColors({
      primary: convertToHex(rootStyles.getPropertyValue("--primary").trim()),
      secondary: convertToHex(
        rootStyles.getPropertyValue("--secondary").trim(),
      ),
      tertiary: convertToHex(rootStyles.getPropertyValue("--tertiary").trim()),
    });
  });

  return {
    themeColors,
    onThemeColorChange: (
      color: string,
      type: "primary" | "secondary" | "tertiary",
    ) => {
      const { style } = document.documentElement;
      style.setProperty(`--${type}`, color);
      setThemeColors((prev) => ({ ...prev, [type]: color }));
    },
  };
};
