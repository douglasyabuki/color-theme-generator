import { createContext } from "react";
import { ColorModes } from "../types/color-modes";

type DarkModeContextValue = {
  mode: ColorModes;
  onDarkModeToggle: () => void;
};

export const DarkModeContext = createContext<DarkModeContextValue>(
  {} as DarkModeContextValue,
);
