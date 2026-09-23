import { converter } from "culori";

const toOklch = converter("oklch");
const decimal = (value: number, precision: number) =>
  Number(value.toFixed(precision)).toString();

// The only conversion path: canonical opaque ARGB -> sRGB -> OKLCH.
export const formatArgbOklch = (argb: number): string => {
  const color = toOklch({
    mode: "rgb",
    r: ((argb >>> 16) & 255) / 255,
    g: ((argb >>> 8) & 255) / 255,
    b: (argb & 255) / 255,
  });
  const chroma = decimal(color.c, 4);
  const hue =
    chroma === "0" || color.h === undefined
      ? "0"
      : decimal(((color.h % 360) + 360) % 360, 3);
  return `oklch(${decimal(color.l, 4)} ${chroma} ${hue === "360" ? "0" : hue})`;
};
