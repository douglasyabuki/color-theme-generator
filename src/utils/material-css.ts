import type { MaterialColorRole } from "../types-and-consts/material-design";
import type {
  MaterialColorScheme,
  MaterialColorTheme,
  MaterialPalettes,
} from "../types-and-consts/material-design";
import { MATERIAL_COLOR_ROLES } from "../types-and-consts/material-design";
import {
  PALETTE_NAMES,
  PALETTE_TONES,
} from "../types-and-consts/material-design";
import { formatHex } from "./create-material-theme";

export const kebabCase = (name: string): string => {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

export const roleVariable = (role: MaterialColorRole): string => {
  return `--md-sys-color-${kebabCase(role)}`;
};

export const semanticDeclarations = (
  scheme: MaterialColorScheme,
): [string, string][] => {
  return MATERIAL_COLOR_ROLES.flatMap((role) => {
    const value = scheme[role];
    return value === undefined
      ? []
      : [[roleVariable(role), formatHex(value)] as [string, string]];
  });
};

const paletteDeclarations = (
  palettes: MaterialPalettes,
): [string, string][] => {
  return PALETTE_NAMES.flatMap((name) =>
    PALETTE_TONES.map(
      (tone) =>
        [
          `--md-ref-palette-${kebabCase(name)}-${tone}`,
          formatHex(palettes[name].tones[tone]),
        ] as [string, string],
    ),
  );
};

const cssBlock = (selector: string, entries: [string, string][]): string => {
  return `${selector} {\n${entries.map(([name, value]) => `  ${name}: ${value};`).join("\n")}\n}`;
};

const header = (theme: MaterialColorTheme): string => {
  const {
    sourceColor,
    variant,
    contrastLevel,
    specVersion,
    packageVersion,
    platform,
  } = theme.metadata;
  return `/* Material Color Utilities ${packageVersion} | ${variant} | spec ${specVersion} | ${platform}\n   Source ${sourceColor} | contrast ${contrastLevel} | light + dark */\n\n`;
};

export const exportMaterialCss = (theme: MaterialColorTheme): string => {
  return (
    header(theme) +
    cssBlock(":root", semanticDeclarations(theme.light)) +
    "\n\n" +
    cssBlock('[data-mode="dark"]', semanticDeclarations(theme.dark)) +
    "\n"
  );
};

export const exportMaterialPalettes = (theme: MaterialColorTheme): string => {
  return (
    header(theme) +
    cssBlock(":root", paletteDeclarations(theme.palettes.light)) +
    "\n\n" +
    cssBlock('[data-mode="dark"]', paletteDeclarations(theme.palettes.dark)) +
    "\n"
  );
};

export const exportMaterialJson = (theme: MaterialColorTheme): string => {
  return JSON.stringify(theme, null, 2) + "\n";
};
