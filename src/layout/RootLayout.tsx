import { Outlet } from "react-router";
import { Navbar } from "../components/ui/navbar/Navbar";

export const RootLayout = () => {
  return (
    <section className="h-dvh w-screen flex-1 flex-col items-start justify-start">
      <Navbar />
      <Outlet />
    </section>
  );
};
