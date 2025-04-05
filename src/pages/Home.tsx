import { ColoredCardsGrid } from "../components/colored-cards-grid/ColoredCardsGrid";
import { ThemePicker } from "../components/theme-picker/ThemePicker";

export const Home = () => {
  return (
    <main className="page z-10 flex flex-col gap-6 px-8 py-6">
      <h1 className="text-2xl font-bold">Welcome to Theme Switcher</h1>
      <ThemePicker />
      <h1 className="text-2xl font-bold">Preview</h1>
      <ColoredCardsGrid />
    </main>
  );
};
