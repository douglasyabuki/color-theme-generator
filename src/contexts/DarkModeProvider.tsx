import { ReactNode } from "react";
import { useDarkMode } from "../hooks/use-dark-mode";
import { DarkModeContext } from "./DarkModeContext";

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, onDarkModeToggle] = useDarkMode();

  return (
    <DarkModeContext.Provider value={{ mode, onDarkModeToggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
