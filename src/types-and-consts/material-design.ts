import type {
  DynamicColor,
  DynamicScheme,
  MaterialDynamicColors,
} from "@material/material-color-utilities";
import { type Hct, SchemeTonalSpot } from "@material/material-color-utilities";

import type { ThemeMode } from "./theme-mode";

// This is the supported CSS/API contract, not a reflection of library internals.
export const MATERIAL_COLOR_ROLES = [
  "primary",
  "primaryDim",
  "onPrimary",
  "primaryContainer",
  "onPrimaryContainer",
  "inversePrimary",
  "primaryFixed",
  "primaryFixedDim",
  "onPrimaryFixed",
  "onPrimaryFixedVariant",
  "secondary",
  "secondaryDim",
  "onSecondary",
  "secondaryContainer",
  "onSecondaryContainer",
  "secondaryFixed",
  "secondaryFixedDim",
  "onSecondaryFixed",
  "onSecondaryFixedVariant",
  "tertiary",
  "tertiaryDim",
  "onTertiary",
  "tertiaryContainer",
  "onTertiaryContainer",
  "tertiaryFixed",
  "tertiaryFixedDim",
  "onTertiaryFixed",
  "onTertiaryFixedVariant",
  "error",
  "errorDim",
  "onError",
  "errorContainer",
  "onErrorContainer",
  "surface",
  "surfaceDim",
  "surfaceBright",
  "surfaceContainerLowest",
  "surfaceContainerLow",
  "surfaceContainer",
  "surfaceContainerHigh",
  "surfaceContainerHighest",
  "onSurface",
  "onSurfaceVariant",
  "outline",
  "outlineVariant",
  "inverseSurface",
  "inverseOnSurface",
  "shadow",
  "scrim",
  "surfaceTint",
  "background",
  "onBackground",
  "surfaceVariant",
] as const;

export type MaterialColorRole = (typeof MATERIAL_COLOR_ROLES)[number];
export type MaterialOptionalColorRole =
  "primaryDim" | "secondaryDim" | "tertiaryDim" | "errorDim";

type RoleResolvers = {
  [Role in MaterialColorRole]: (
    colors: MaterialDynamicColors,
  ) => Role extends MaterialOptionalColorRole
    ? DynamicColor | undefined
    : DynamicColor;
};

// Explicit public methods: adding a role requires a deliberate API change here.
export const MATERIAL_ROLE_RESOLVERS: RoleResolvers = {
  primary: (c) => c.primary(),
  primaryDim: (c) => c.primaryDim(),
  onPrimary: (c) => c.onPrimary(),
  primaryContainer: (c) => c.primaryContainer(),
  onPrimaryContainer: (c) => c.onPrimaryContainer(),
  inversePrimary: (c) => c.inversePrimary(),
  primaryFixed: (c) => c.primaryFixed(),
  primaryFixedDim: (c) => c.primaryFixedDim(),
  onPrimaryFixed: (c) => c.onPrimaryFixed(),
  onPrimaryFixedVariant: (c) => c.onPrimaryFixedVariant(),
  secondary: (c) => c.secondary(),
  secondaryDim: (c) => c.secondaryDim(),
  onSecondary: (c) => c.onSecondary(),
  secondaryContainer: (c) => c.secondaryContainer(),
  onSecondaryContainer: (c) => c.onSecondaryContainer(),
  secondaryFixed: (c) => c.secondaryFixed(),
  secondaryFixedDim: (c) => c.secondaryFixedDim(),
  onSecondaryFixed: (c) => c.onSecondaryFixed(),
  onSecondaryFixedVariant: (c) => c.onSecondaryFixedVariant(),
  tertiary: (c) => c.tertiary(),
  tertiaryDim: (c) => c.tertiaryDim(),
  onTertiary: (c) => c.onTertiary(),
  tertiaryContainer: (c) => c.tertiaryContainer(),
  onTertiaryContainer: (c) => c.onTertiaryContainer(),
  tertiaryFixed: (c) => c.tertiaryFixed(),
  tertiaryFixedDim: (c) => c.tertiaryFixedDim(),
  onTertiaryFixed: (c) => c.onTertiaryFixed(),
  onTertiaryFixedVariant: (c) => c.onTertiaryFixedVariant(),
  error: (c) => c.error(),
  errorDim: (c) => c.errorDim(),
  onError: (c) => c.onError(),
  errorContainer: (c) => c.errorContainer(),
  onErrorContainer: (c) => c.onErrorContainer(),
  surface: (c) => c.surface(),
  surfaceDim: (c) => c.surfaceDim(),
  surfaceBright: (c) => c.surfaceBright(),
  surfaceContainerLowest: (c) => c.surfaceContainerLowest(),
  surfaceContainerLow: (c) => c.surfaceContainerLow(),
  surfaceContainer: (c) => c.surfaceContainer(),
  surfaceContainerHigh: (c) => c.surfaceContainerHigh(),
  surfaceContainerHighest: (c) => c.surfaceContainerHighest(),
  onSurface: (c) => c.onSurface(),
  onSurfaceVariant: (c) => c.onSurfaceVariant(),
  outline: (c) => c.outline(),
  outlineVariant: (c) => c.outlineVariant(),
  inverseSurface: (c) => c.inverseSurface(),
  inverseOnSurface: (c) => c.inverseOnSurface(),
  shadow: (c) => c.shadow(),
  scrim: (c) => c.scrim(),
  surfaceTint: (c) => c.surfaceTint(),
  // Compatibility roles remain available but are not preferred for new UI.
  background: (c) => c.background(),
  onBackground: (c) => c.onBackground(),
  surfaceVariant: (c) => c.surfaceVariant(),
};

export type MaterialVariant = "tonal-spot";
export type MaterialColorScheme = Record<
  Exclude<MaterialColorRole, MaterialOptionalColorRole>,
  number
> &
  Partial<Record<MaterialOptionalColorRole, number>>;

export const MATERIAL_PALETTE_NAMES = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "neutralVariant",
  "error",
] as const;

export const MATERIAL_PALETTE_TONES = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100,
] as const;

export type MaterialPaletteName = (typeof MATERIAL_PALETTE_NAMES)[number];
export type MaterialPaletteMap = Record<
  MaterialPaletteName,
  {
    keyColor: number;
    tones: Record<(typeof MATERIAL_PALETTE_TONES)[number], number>;
  }
>;

export interface MaterialThemeOptions {
  sourceColor: string;
  variant: MaterialVariant;
  contrastLevel: number;
}

export interface MaterialTheme {
  light: MaterialColorScheme;
  dark: MaterialColorScheme;
  palettes: Record<ThemeMode, MaterialPaletteMap>;
  metadata: MaterialThemeOptions & {
    packageVersion: "0.4.0";
    specVersion: DynamicScheme["specVersion"];
    platform: DynamicScheme["platform"];
  };
}

export const MATERIAL_ACCENT_PAIRS = [
  ["primary", "onPrimary", "primaryContainer", "onPrimaryContainer"],
  ["secondary", "onSecondary", "secondaryContainer", "onSecondaryContainer"],
  ["tertiary", "onTertiary", "tertiaryContainer", "onTertiaryContainer"],
  ["error", "onError", "errorContainer", "onErrorContainer"],
] as const;

export const MATERIAL_FIXED_PAIRS = [
  [
    "primaryFixed",
    "onPrimaryFixed",
    "primaryFixedDim",
    "onPrimaryFixedVariant",
  ],
  [
    "secondaryFixed",
    "onSecondaryFixed",
    "secondaryFixedDim",
    "onSecondaryFixedVariant",
  ],
  [
    "tertiaryFixed",
    "onTertiaryFixed",
    "tertiaryFixedDim",
    "onTertiaryFixedVariant",
  ],
] as const;

export const MATERIAL_SURFACE_ROLES = [
  "surfaceDim",
  "surface",
  "surfaceBright",
  "surfaceContainerLowest",
  "surfaceContainerLow",
  "surfaceContainer",
  "surfaceContainerHigh",
  "surfaceContainerHighest",
] as const;

export const DEFAULT_MATERIAL_THEME_OPTIONS: Readonly<MaterialThemeOptions> = {
  sourceColor: "#6750A4",
  variant: "tonal-spot",
  contrastLevel: 0,
};

type SchemeFactory = (
  source: Hct,
  isDark: boolean,
  contrast: number,
) => DynamicScheme;
export const MATERIAL_SCHEME_FACTORIES: Record<MaterialVariant, SchemeFactory> =
  {
    "tonal-spot": (source, isDark, contrast) =>
      new SchemeTonalSpot(source, isDark, contrast, "2025", "phone"),
  };
