import type { DynamicScheme } from "@material/material-color-utilities";
import {
  argbFromHex,
  Hct,
  hexFromArgb,
} from "@material/material-color-utilities";

import type {
  MaterialColorScheme,
  MaterialColorTheme,
  MaterialPalettes,
  MaterialThemeOptions,
} from "../types-and-consts/material-design";
import { SCHEME_FACTORIES } from "../types-and-consts/material-design";
import {
  MATERIAL_COLOR_ROLES,
  MATERIAL_ROLE_RESOLVERS,
} from "../types-and-consts/material-design";
import {
  PALETTE_NAMES,
  PALETTE_TONES,
} from "../types-and-consts/material-design";

export const normalizeSourceColor = (value: string): string | undefined => {
  const hex = value.trim().replace(/^#/, "");
  if (!/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(hex)) return undefined;
  return `#${(hex.length === 3 ? [...hex].map((char) => char + char).join("") : hex).toUpperCase()}`;
};

const resolveScheme = (scheme: DynamicScheme): MaterialColorScheme => {
  const entries = MATERIAL_COLOR_ROLES.flatMap((role) => {
    const color = MATERIAL_ROLE_RESOLVERS[role](scheme.colors);
    return color === undefined ? [] : [[role, color.getArgb(scheme)]];
  });
  // The typed manifest requires every non-optional role to have a resolver.
  return Object.fromEntries(entries) as MaterialColorScheme;
};

const resolvePalettes = (scheme: DynamicScheme): MaterialPalettes => {
  const palettes = {
    primary: scheme.primaryPalette,
    secondary: scheme.secondaryPalette,
    tertiary: scheme.tertiaryPalette,
    neutral: scheme.neutralPalette,
    neutralVariant: scheme.neutralVariantPalette,
    error: scheme.errorPalette,
  };
  const keyColors = {
    primary: scheme.primaryPaletteKeyColor,
    secondary: scheme.secondaryPaletteKeyColor,
    tertiary: scheme.tertiaryPaletteKeyColor,
    neutral: scheme.neutralPaletteKeyColor,
    neutralVariant: scheme.neutralVariantPaletteKeyColor,
    error: scheme.errorPaletteKeyColor,
  };
  return Object.fromEntries(
    PALETTE_NAMES.map((name) => [
      name,
      {
        keyColor: keyColors[name],
        tones: Object.fromEntries(
          PALETTE_TONES.map((tone) => [tone, palettes[name].tone(tone)]),
        ),
      },
    ]),
  ) as MaterialPalettes;
};

export const createMaterialTheme = (
  options: MaterialThemeOptions,
): MaterialColorTheme => {
  const sourceColor = normalizeSourceColor(options.sourceColor);
  if (!sourceColor)
    throw new TypeError("Enter an opaque 3- or 6-digit hex color.");
  if (
    !Number.isFinite(options.contrastLevel) ||
    options.contrastLevel < -1 ||
    options.contrastLevel > 1
  ) {
    throw new RangeError("Contrast must be between -1 and 1.");
  }
  if (!Object.hasOwn(SCHEME_FACTORIES, options.variant)) {
    throw new TypeError("Unsupported Material variant.");
  }
  const factory = SCHEME_FACTORIES[options.variant];
  const source = Hct.fromInt(argbFromHex(sourceColor));
  const light = factory(source, false, options.contrastLevel);
  const dark = factory(source, true, options.contrastLevel);
  return {
    metadata: {
      sourceColor,
      variant: options.variant,
      contrastLevel: options.contrastLevel,
      packageVersion: "0.4.0",
      specVersion: light.specVersion,
      platform: light.platform,
    },
    light: resolveScheme(light),
    dark: resolveScheme(dark),
    palettes: { light: resolvePalettes(light), dark: resolvePalettes(dark) },
  };
};

export const formatHex = (argb: number): string => {
  return hexFromArgb(argb).toUpperCase();
};
