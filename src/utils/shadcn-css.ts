import { formatArgbOklch } from "@/lib/format-oklch";
import { SHADCN_COLOR_TOKENS } from "@/types-and-consts/shadcn-manifest";
import type { ShadcnColorScheme } from "@/types-and-consts/shadcn-theme";

/**
 * Converts a shadcn color scheme into ordered OKLCH CSS declarations.
 *
 * @param scheme Resolved shadcn token values for one mode.
 * @returns Ordered token/value pairs ready for CSS serialization.
 * @example
 * ```ts
 * const declarations = createShadcnDeclarations(shadcnTheme.light);
 * declarations[0]; // ["background", "oklch(...)"]
 * ```
 */
export const createShadcnDeclarations = (scheme: ShadcnColorScheme) =>
  SHADCN_COLOR_TOKENS.map(
    (token) => [token, formatArgbOklch(scheme[token])] as const,
  );
