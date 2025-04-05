import { useEffect, useState } from "react";

type ColorMode = "light" | "dark";

const getInitialMode = (): ColorMode => {
  if (typeof window === "undefined") return "light";
  return (
    (document.documentElement.getAttribute("data-mode") as ColorMode) || "light"
  );
};

export const useDarkMode = (): [ColorMode, () => void] => {
  const [mode, setMode] = useState<ColorMode>(getInitialMode);

  const onDarkModeToggle = () => {
    const nextMode: ColorMode = mode === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-mode", nextMode);
    setMode(nextMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  return [mode, onDarkModeToggle];
};
