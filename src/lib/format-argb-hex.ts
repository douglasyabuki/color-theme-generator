import { hexFromArgb } from "@material/material-color-utilities";

export const formatArgbHex = (argb: number): string => {
  return hexFromArgb(argb).toUpperCase();
};
