import { Outlet } from "react-router";
import { Navbar } from "../components/ui/navbar/Navbar";
import { DarkModeProvider } from "../contexts/DarkModeProvider";

export const RootLayout = () => {
  return (
    <DarkModeProvider>
      <section className="h-dvh w-screen flex-1 flex-col items-start justify-start">
        <Navbar />
        <Outlet />
      </section>
    </DarkModeProvider>
  );
};
