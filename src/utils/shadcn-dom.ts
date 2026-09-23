import type { ShadcnColorScheme } from "@/types-and-consts/shadcn-theme";
import { createShadcnDeclarations } from "@/utils/shadcn-css";

/**
 * Applies one shadcn color scheme as inline CSS custom properties.
 *
 * @param element Element that owns the shadcn variables.
 * @param scheme Resolved token values to apply.
 * @example
 * ```ts
 * applyShadcnScheme(document.documentElement, shadcnTheme.light);
 * ```
 */
export const applyShadcnScheme = (
  element: HTMLElement,
  scheme: ShadcnColorScheme,
): void => {
  for (const [token, value] of createShadcnDeclarations(scheme)) {
    element.style.setProperty(`--${token}`, value);
  }
};
