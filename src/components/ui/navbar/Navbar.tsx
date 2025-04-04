import { useColorMode } from "../../../hooks/use-color-mode";

export function ThemeToggle() {
  const [mode, toggleMode] = useColorMode();

  return (
    <button
      onClick={toggleMode}
      className="animate-border border-angle border-active border-2 p-2 font-bold"
    >
      Toggle {mode === "light" ? "dark" : "light"} mode
    </button>
  );
}
export const Navbar = () => {
  return (
    <nav className="surface flex h-12 w-full items-center justify-between border-b px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold">TailwindCSS - Theme Switcher</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
};
