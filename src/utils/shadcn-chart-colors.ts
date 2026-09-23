import type { MaterialColorTheme } from "@/types-and-consts/material-design";
import {
  SHADCN_CHART_SOURCES,
  type ShadcnChartColors,
  type ShadcnChartToken,
} from "@/types-and-consts/shadcn-chart-colors";
import type { ThemeMode } from "@/types-and-consts/theme-mode";

/**
 * Derives the shadcn chart colors for one Material theme mode.
 *
 * @param theme Resolved Material theme used as the source.
 * @param mode Theme mode whose roles and palettes should be read.
 * @returns Resolved shadcn chart token values.
 * @example
 * ```ts
 * const charts = createShadcnChartColors(materialTheme, "dark");
 * charts["chart-1"]; // ARGB chart color
 * ```
 */
export const createShadcnChartColors = (
  theme: MaterialColorTheme,
  mode: ThemeMode,
): ShadcnChartColors => {
  return Object.fromEntries(
    Object.entries(SHADCN_CHART_SOURCES).map(([token, source]) => [
      token,
      "role" in source
        ? theme[mode][source.role]
        : theme.palettes[mode][source.palette].tones[source[mode]],
    ]),
  ) as ShadcnChartColors;
};

/**
 * Describes the Material role or palette tone behind a chart token.
 *
 * @param token Chart token to explain.
 * @param mode Theme mode used for the derivation.
 * @returns Human-readable provenance for the chart token.
 * @example
 * ```ts
 * describeShadcnChartSource("chart-4", "light");
 * // "Chart derivation: light primary palette, tone 60"
 * ```
 */
export const describeShadcnChartSource = (
  token: ShadcnChartToken,
  mode: ThemeMode,
) => {
  const source = SHADCN_CHART_SOURCES[token];
  return "role" in source
    ? `Chart derivation: ${mode} Material ${source.role}`
    : `Chart derivation: ${mode} ${source.palette} palette, tone ${source[mode]}`;
};
