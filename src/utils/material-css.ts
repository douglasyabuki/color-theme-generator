import { formatArgbHex } from "@/lib/format-argb-hex";
import {
  MATERIAL_COLOR_ROLES,
  type MaterialColorRole,
  type MaterialColorScheme,
  type MaterialPalettes,
  PALETTE_NAMES,
  PALETTE_TONES,
  type PaletteName,
} from "@/types-and-consts/material-design";

/**
 * Converts a Material role or palette name to kebab-case.
 *
 * @param name Material role or palette identifier.
 * @returns The identifier formatted for CSS names.
 * @example
 * ```ts
 * formatMaterialTokenName("surfaceContainerHigh"); // "surface-container-high"
 * ```
 */
export const formatMaterialTokenName = (
  name: MaterialColorRole | PaletteName,
): string => {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
};

/**
 * Returns the CSS custom property name for a Material system color role.
 *
 * @param role Material system color role.
 * @returns The corresponding `--md-sys-color-*` property name.
 * @example
 * ```ts
 * getMaterialRoleVariable("primary"); // "--md-sys-color-primary"
 * ```
 */
export const getMaterialRoleVariable = (role: MaterialColorRole): string => {
  return `--md-sys-color-${formatMaterialTokenName(role)}`;
};

/**
 * Converts the resolved Material roles into CSS custom-property declarations.
 *
 * @param scheme Resolved role values for one theme mode.
 * @returns Ordered CSS property/value pairs.
 * @example
 * ```ts
 * const declarations = createMaterialDeclarations(theme.light);
 * declarations[0]; // ["--md-sys-color-primary", "#..."]
 * ```
 */
export const createMaterialDeclarations = (
  scheme: MaterialColorScheme,
): [string, string][] => {
  return MATERIAL_COLOR_ROLES.flatMap((role) => {
    const value = scheme[role];
    return value === undefined
      ? []
      : [
          [getMaterialRoleVariable(role), formatArgbHex(value)] as [
            string,
            string,
          ],
        ];
  });
};

/**
 * Converts every reference palette tone into CSS custom-property declarations.
 *
 * @param palettes Resolved Material reference palettes.
 * @returns Ordered CSS property/value pairs.
 * @example
 * ```ts
 * const declarations = createMaterialPaletteDeclarations(theme.palettes.light);
 * declarations[0][0]; // "--md-ref-palette-primary-0"
 * ```
 */
export const createMaterialPaletteDeclarations = (
  palettes: MaterialPalettes,
): [string, string][] => {
  return PALETTE_NAMES.flatMap((name) =>
    PALETTE_TONES.map(
      (tone) =>
        [
          `--md-ref-palette-${formatMaterialTokenName(name)}-${tone}`,
          formatArgbHex(palettes[name].tones[tone]),
        ] as [string, string],
    ),
  );
};
