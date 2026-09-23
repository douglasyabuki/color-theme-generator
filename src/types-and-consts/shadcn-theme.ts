import type { MaterialVariant } from "@/types-and-consts/material-design";

import type { ShadcnColorToken } from "./shadcn-manifest";

export type ShadcnColorScheme = Record<ShadcnColorToken, number>;
export interface ShadcnTheme {
  light: ShadcnColorScheme;
  dark: ShadcnColorScheme;
  metadata: {
    sourceColor: string;
    materialVariant: MaterialVariant;
    contrastLevel: number;
    adapter: "shadcn";
  };
}
