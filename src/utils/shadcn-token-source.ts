import {
  SHADCN_TOKEN_MANIFEST,
  type ShadcnColorToken,
} from "@/types-and-consts/shadcn-manifest";
import type { ThemeMode } from "@/types-and-consts/theme-mode";
import { describeShadcnChartSource } from "@/utils/shadcn-chart-colors";

/**
 * Describes the Material source behind a shadcn token in one mode.
 *
 * @param token shadcn token to explain.
 * @param mode Theme mode used for the derivation.
 * @returns Human-readable token provenance.
 * @example
 * ```ts
 * describeShadcnTokenSource("primary", "light");
 * // "Material source: primary"
 * ```
 */
export const describeShadcnTokenSource = (
  token: ShadcnColorToken,
  mode: ThemeMode,
) => {
  const source = SHADCN_TOKEN_MANIFEST[token];
  return "role" in source
    ? `Material source: ${source.role}`
    : describeShadcnChartSource(source.chart, mode);
};
