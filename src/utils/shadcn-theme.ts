import type { MaterialTheme } from "@/types-and-consts/material-design";
import {
  SHADCN_COLOR_TOKENS,
  SHADCN_TOKEN_MANIFEST,
} from "@/types-and-consts/shadcn-manifest";
import type {
  ShadcnColorScheme,
  ShadcnTheme,
} from "@/types-and-consts/shadcn-theme";
import type { ThemeMode } from "@/types-and-consts/theme-mode";
import { createShadcnChartColors } from "@/utils/shadcn-chart-colors";

/**
 * Adapts a resolved Material theme to the shadcn color-token contract.
 *
 * @param materialTheme Resolved Material theme used as the source.
 * @returns A shadcn theme with independent light and dark token maps.
 * @example
 * ```ts
 * const shadcnTheme = createShadcnTheme(materialTheme);
 * shadcnTheme.dark.primary; // ARGB shadcn primary color
 * ```
 */
export const createShadcnTheme = (
  materialTheme: MaterialTheme,
): ShadcnTheme => {
  /** Builds the shadcn token map for one theme mode. */
  const createScheme = (mode: ThemeMode): ShadcnColorScheme => {
    const charts = createShadcnChartColors(materialTheme, mode);
    return Object.fromEntries(
      SHADCN_COLOR_TOKENS.map((token) => {
        const source = SHADCN_TOKEN_MANIFEST[token];
        return [
          token,
          ("role" in source
            ? materialTheme[mode][source.role]
            : charts[source.chart]) >>> 0,
        ];
      }),
    ) as ShadcnColorScheme;
  };
  return {
    light: createScheme("light"),
    dark: createScheme("dark"),
    metadata: {
      sourceColor: materialTheme.metadata.sourceColor,
      materialVariant: materialTheme.metadata.variant,
      contrastLevel: materialTheme.metadata.contrastLevel,
      adapter: "shadcn",
    },
  };
};
