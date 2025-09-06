import { twMerge } from "tailwind-merge";

interface ColoredCard {
  className?: string;
  name: string;
  children?: React.ReactNode;
}

export const ColoredCard = ({ className, name, children }: ColoredCard) => {
  return (
    <span
      className={twMerge(
        "line-clamp-4 flex h-36 flex-col gap-2 rounded-md px-4 py-3 text-ellipsis",
        className,
      )}
    >
      <h1 className="text-lg leading-tight font-bold">{name}</h1>
      <p className="text-sm leading-snug tracking-tight">{children}</p>
    </span>
  );
};
