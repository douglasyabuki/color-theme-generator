import { Footer } from "./footer";
import { Header } from "./header";

interface Layout {
  children: React.ReactElement;
}

export const Layout = ({ children }: Layout) => {
  return (
    <div>
      <a
        className="fixed -top-25 left-4 z-10 rounded-lg bg-(--md-sys-color-primary) px-5 py-3 text-(--md-sys-color-on-primary) focus:top-4"
        href="#workspace"
      >
        Skip to preview
      </a>
      <Header />
      <main className="m-auto max-w-400 px-[4.5%] py-0 max-[580px]:pr-5 max-[580px]:pl-5">
        {children}
      </main>
      <Footer />
    </div>
  );
};
