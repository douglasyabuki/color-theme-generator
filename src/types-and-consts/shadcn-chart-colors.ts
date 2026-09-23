// One global derivation, shared by every source color. No palette generation here.
export const SHADCN_CHART_SOURCES = {
  "chart-1": { role: "primary" },
  "chart-2": { role: "tertiary" },
  "chart-3": { role: "secondary" },
  // T50 separates these from resolved dark roles at reduced contrast as well.
  "chart-4": { palette: "primary", light: 60, dark: 50 },
  "chart-5": { palette: "tertiary", light: 60, dark: 50 },
} as const;

export type ShadcnChartToken = keyof typeof SHADCN_CHART_SOURCES;

export type ShadcnChartColors = Record<ShadcnChartToken, number>;
