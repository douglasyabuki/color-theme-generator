import { Oklch } from "../types/oklch";

export const parseOklchString = (oklch: string): Oklch => {
  const match = oklch.match(/oklch\(([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\)/i);
  if (!match) return { l: 0, c: 0, h: 0 };

  const [, lStr, cStr, hStr] = match;

  const l = parseFloat(lStr.replace("%", "")) / (oklch.includes("%") ? 100 : 1);
  const c = parseFloat(cStr);
  const h = parseFloat(hStr);

  return { l, c, h };
};
