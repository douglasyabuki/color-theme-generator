import type { MaterialTheme } from "@/types-and-consts/material-design";

import {
  createMaterialDeclarations,
  createMaterialPaletteDeclarations,
} from "./material-css";

/** Serializes declarations into a CSS rule block. */
const createCssRuleBlock = (
  selector: string,
  entries: [string, string][],
): string => {
  return `${selector} {\n${entries.map(([name, value]) => `  ${name}: ${value};`).join("\n")}\n}`;
};

/** Creates the metadata comment shared by Material CSS exports. */
const createMaterialExportHeader = (theme: MaterialTheme): string => {
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

/**
 * Exports the light and dark semantic Material roles as CSS.
 *
 * @param theme Complete Material theme to serialize.
 * @returns CSS containing both theme modes.
 * @example
 * ```ts
 * const css = exportMaterialCss(theme);
 * css.includes('[data-mode="dark"]'); // true
 * ```
 */
export const exportMaterialCss = (theme: MaterialTheme): string => {
  return (
    createMaterialExportHeader(theme) +
    createCssRuleBlock(":root", createMaterialDeclarations(theme.light)) +
    "\n\n" +
    createCssRuleBlock(
      '[data-mode="dark"]',
      createMaterialDeclarations(theme.dark),
    ) +
    "\n"
  );
};

/**
 * Exports the light and dark reference palettes as CSS.
 *
 * @param theme Complete Material theme to serialize.
 * @returns CSS containing both theme modes and all configured tones.
 * @example
 * ```ts
 * const css = exportMaterialPalettes(theme);
 * css.includes("--md-ref-palette-primary-40"); // true
 * ```
 */
export const exportMaterialPalettes = (theme: MaterialTheme): string => {
  return (
    createMaterialExportHeader(theme) +
    createCssRuleBlock(
      ":root",
      createMaterialPaletteDeclarations(theme.palettes.light),
    ) +
    "\n\n" +
    createCssRuleBlock(
      '[data-mode="dark"]',
      createMaterialPaletteDeclarations(theme.palettes.dark),
    ) +
    "\n"
  );
};

/**
 * Exports the complete Material theme model as formatted JSON.
 *
 * @param theme Complete Material theme to serialize.
 * @returns A newline-terminated JSON document.
 * @example
 * ```ts
 * const json = exportMaterialJson(theme);
 * JSON.parse(json).metadata.sourceColor; // "#6750A4"
 * ```
 */
export const exportMaterialJson = (theme: MaterialTheme): string => {
  return JSON.stringify(theme, null, 2) + "\n";
};
