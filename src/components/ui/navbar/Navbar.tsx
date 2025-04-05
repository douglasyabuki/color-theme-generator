import { DarkModeSwitch } from "../../dark-mode-switch/DarkModeSwitch";

export const Navbar = () => {
  return (
    <nav className="inverse-primary sticky top-0 z-20 flex w-full items-center justify-between border-b bg-[var(--primary)/90] px-4 py-3 shadow-sm backdrop-blur-md hover:bg-[var(--primary)] lg:px-8 lg:py-2">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold">TailwindCSS - Theme Switcher</h1>
      </div>
      <DarkModeSwitch />
    </nav>
  );
};
