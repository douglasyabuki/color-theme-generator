import { useEffect, useState } from "react";
import { ColorModes } from "../types/color-modes";

const getInitialMode = (): ColorModes => {
  if (typeof window === "undefined") return "light";
  return (
    (document.documentElement.getAttribute("data-mode") as ColorModes) ||
    "light"
  );
};

export const useDarkMode = (): [ColorModes, () => void] => {
  const [mode, setMode] = useState<ColorModes>(getInitialMode);

  const onDarkModeToggle = () => {
    const nextMode: ColorModes = mode === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-mode", nextMode);
    setMode(nextMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  return [mode, onDarkModeToggle];
};
