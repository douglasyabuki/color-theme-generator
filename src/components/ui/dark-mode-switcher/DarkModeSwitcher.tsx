import { useDarkMode } from "../../../hooks/use-dark-mode";
import { Button } from "../button/Button";

export const DarkModeSwitcher = () => {
  const [mode, toggleMode] = useDarkMode();

  return (
    <Button
      onClick={toggleMode}
      className="animate-border border-angle border-active border-2 p-2 font-bold bg-[var(--tertiary)]"
    >
      Toggle {mode === "light" ? "dark" : "light"} mode
    </Button>
  );
};
