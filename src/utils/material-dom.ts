import type { MaterialColorScheme } from "@/types-and-consts/material-design";
import { MATERIAL_COLOR_ROLES } from "@/types-and-consts/material-design";
import {
  createMaterialDeclarations,
  getMaterialRoleVariable,
} from "@/utils/material-css";

/**
 * Applies one resolved Material color scheme to an element.
 *
 * @param element Element whose inline custom properties should be updated.
 * @param scheme Resolved role values to apply.
 * @example
 * ```ts
 * applyMaterialScheme(document.documentElement, theme.light);
 * ```
 */
export const applyMaterialScheme = (
  element: HTMLElement,
  scheme: MaterialColorScheme,
): void => {
  // Clear optional roles left behind by a previously applied scheme.
  for (const role of MATERIAL_COLOR_ROLES)
    element.style.removeProperty(getMaterialRoleVariable(role));
  for (const [name, value] of createMaterialDeclarations(scheme))
    element.style.setProperty(name, value);
};
