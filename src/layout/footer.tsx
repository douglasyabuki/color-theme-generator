export const Footer = () => {
  return (
    <footer className="mt-17.5 flex justify-between gap-5 border-t border-t-(--md-sys-color-outline-variant) px-[4.5%] py-6 text-[10px] text-(--md-sys-color-on-surface-variant) max-[800px]:mt-10 max-[580px]:flex-col max-[580px]:gap-2 max-[580px]:pr-5 max-[580px]:pl-5 max-[580px]:text-[9px] [&_span_span]:px-2.5 [&_span_span]:py-0">
      <span>
        Chroma <span aria-hidden="true">/</span> Made for color exploration.
      </span>
      <span>Material color system · 2025 specification</span>
    </footer>
  );
};
