import type {
  MaterialColorRole,
  OptionalMaterialColorRole,
} from "@/types-and-consts/material-design";

import type { ShadcnChartToken } from "./shadcn-chart-colors";

type TokenDefinition = {
  group: string;
} & (
  | { role: Exclude<MaterialColorRole, OptionalMaterialColorRole> }
  | { chart: ShadcnChartToken }
);

// Chroma's canonical shadcn color API, following the main shadcn theming contract.
// Order and provenance belong here, never in a preview style or serializer.
export const SHADCN_TOKEN_MANIFEST = {
  background: { group: "Base", role: "surface" },
  foreground: { group: "Base", role: "onSurface" },
  card: { group: "Surfaces", role: "surfaceContainerLow" },
  "card-foreground": { group: "Surfaces", role: "onSurface" },
  popover: { group: "Surfaces", role: "surfaceContainer" },
  "popover-foreground": { group: "Surfaces", role: "onSurface" },
  primary: { group: "Actions", role: "primary" },
  "primary-foreground": { group: "Actions", role: "onPrimary" },
  secondary: { group: "Actions", role: "secondaryContainer" },
  "secondary-foreground": { group: "Actions", role: "onSecondaryContainer" },
  muted: { group: "Muted / Accent", role: "surfaceContainer" },
  "muted-foreground": { group: "Muted / Accent", role: "onSurfaceVariant" },
  accent: { group: "Muted / Accent", role: "surfaceContainerHigh" },
  "accent-foreground": { group: "Muted / Accent", role: "onSurface" },
  destructive: { group: "Actions", role: "error" },
  border: { group: "Borders / Focus", role: "outlineVariant" },
  input: { group: "Borders / Focus", role: "outline" },
  ring: { group: "Borders / Focus", role: "primary" },
  "chart-1": { group: "Charts", chart: "chart-1" },
  "chart-2": { group: "Charts", chart: "chart-2" },
  "chart-3": { group: "Charts", chart: "chart-3" },
  "chart-4": { group: "Charts", chart: "chart-4" },
  "chart-5": { group: "Charts", chart: "chart-5" },
  sidebar: { group: "Sidebar", role: "surfaceContainerLow" },
  "sidebar-foreground": { group: "Sidebar", role: "onSurface" },
  "sidebar-primary": { group: "Sidebar", role: "primary" },
  "sidebar-primary-foreground": { group: "Sidebar", role: "onPrimary" },
  "sidebar-accent": { group: "Sidebar", role: "surfaceContainerHigh" },
  "sidebar-accent-foreground": { group: "Sidebar", role: "onSurface" },
  "sidebar-border": { group: "Sidebar", role: "outlineVariant" },
  "sidebar-ring": { group: "Sidebar", role: "primary" },
} as const satisfies Record<string, TokenDefinition>;

export type ShadcnColorToken = keyof typeof SHADCN_TOKEN_MANIFEST;
export const SHADCN_COLOR_TOKENS = Object.keys(
  SHADCN_TOKEN_MANIFEST,
) as ShadcnColorToken[];
export const SHADCN_TOKEN_GROUPS = [
  ...new Set(
    SHADCN_COLOR_TOKENS.map((token) => SHADCN_TOKEN_MANIFEST[token].group),
  ),
];
