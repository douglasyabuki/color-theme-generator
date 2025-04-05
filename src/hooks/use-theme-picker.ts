import { useState } from "react";
import { convertColor } from "../libs/culori/convert-color";
import { useOnMount } from "./use-on-mount";

export const useThemePicker = () => {
  const [themeColors, setThemeColors] = useState({
    primary: "#ffffff",
    secondary: "#ffffff",
    tertiary: "#ffffff",
  });

  useOnMount(() => {
    const rootStyles = getComputedStyle(document.documentElement);

    setThemeColors(
      (prev) =>
        Object.fromEntries(
          Object.keys(prev).map((key) => [
            key,
            convertColor(rootStyles.getPropertyValue(`--${key}`).trim(), "hex"),
          ]),
        ) as typeof prev,
    );
  });

  return {
    themeColors,
    onThemeColorChange: (
      color: string,
      type: "primary" | "secondary" | "tertiary",
    ) => {
      setThemeColors((prev) => ({ ...prev, [type]: color }));
    },
  };
};
