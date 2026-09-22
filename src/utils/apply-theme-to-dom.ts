import type { MaterialColorScheme } from "../types-and-consts/material-design";
import { MATERIAL_COLOR_ROLES } from "../types-and-consts/material-design";
import { roleVariable, semanticDeclarations } from "./material-css";

export const applyMaterialScheme = (
  element: HTMLElement,
  scheme: MaterialColorScheme,
): void => {
  // Clear optional roles left behind by a previously applied scheme.
  for (const role of MATERIAL_COLOR_ROLES)
    element.style.removeProperty(roleVariable(role));
  for (const [name, value] of semanticDeclarations(scheme))
    element.style.setProperty(name, value);
};
