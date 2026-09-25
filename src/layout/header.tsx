export const Header = () => {
  return (
    <header className="flex h-20.5 items-center justify-between border-b border-b-(--md-sys-color-outline-variant) px-[4.5%] py-0 max-[800px]:h-17 max-[580px]:pr-5 max-[580px]:pl-5">
      <a
        className="flex items-center gap-3 text-[23px] font-bold tracking-[-1px]"
        href="#"
      >
        <span
          className="mr-0.5 grid -rotate-12 grid-cols-[repeat(2,9px)] gap-0.75 [&_i]:h-2.25 [&_i]:w-2.25 [&_i]:rounded-full [&_i]:bg-(--md-sys-color-primary) [&_i:nth-child(2)]:bg-(--md-sys-color-tertiary) [&_i:nth-child(3)]:bg-(--md-sys-color-tertiary)"
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
          <i />
        </span>
        Chroma
        <span className="mx-1.25 my-0 h-5.25 w-px bg-(--md-sys-color-outline-variant) max-[580px]:hidden" />
        <span className="text-[12px] font-normal tracking-normal text-(--md-sys-color-on-surface-variant) max-[580px]:hidden">
          Semantic color theme generator
        </span>
      </a>
    </header>
  );
};
