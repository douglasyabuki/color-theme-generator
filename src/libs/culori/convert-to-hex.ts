import { formatHex, parse } from "culori";

export const convertToHex = (color: string): string => {
  const parsed = parse(color);
  if (!parsed) return "";

  const hex = formatHex(parsed);
  return hex ?? "";
};
