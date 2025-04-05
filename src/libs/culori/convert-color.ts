import {
  converter,
  formatCss,
  formatHex,
  formatHex8,
  formatHsl,
  formatRgb,
  parse,
} from "culori";

type SupportedFormat = "rgb" | "hex" | "hex8" | "hsl" | "oklch" | "lab" | "lch";

export const convertColor = (
  color: string,
  format: SupportedFormat
): string => {
  const parsed = parse(color);
  if (!parsed) return "";

  switch (format) {
    case "rgb":
      return formatRgb(parsed) ?? "";
    case "hex":
      return formatHex(parsed) ?? "";
    case "hex8":
      return formatHex8(parsed) ?? "";
    case "hsl":
      return formatHsl(parsed) ?? "";
    case "oklch":
    case "lab":
    case "lch": {
      const toTarget = converter(format); // Convert to oklch/lab/lch
      const converted = toTarget(parsed);
      return formatCss(converted);
    }
    default:
      return "";
  }
};
