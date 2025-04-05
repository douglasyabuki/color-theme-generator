import { useContext } from "react";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import { Button } from "../ui/button/Button";

export const DarkModeSwitch = () => {
  const { mode, onDarkModeToggle } = useContext(DarkModeContext);

  return (
    <Button
      onClick={onDarkModeToggle}
      className="animate-border border-angle border-active border-2 bg-[var(--tertiary)] p-2 font-bold"
    >
      Toggle {mode === "light" ? "dark" : "light"} mode
    </Button>
  );
};
