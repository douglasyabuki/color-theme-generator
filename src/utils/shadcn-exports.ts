import { SHADCN_COLOR_TOKENS } from "@/types-and-consts/shadcn-manifest";
import type {
  ShadcnColorScheme,
  ShadcnTheme,
} from "@/types-and-consts/shadcn-theme";
import { createShadcnDeclarations } from "@/utils/shadcn-css";

/** Serializes one shadcn scheme into a CSS rule block. */
const createShadcnCssRuleBlock = (
  selector: string,
  scheme: ShadcnColorScheme,
) =>
  `${selector} {\n${createShadcnDeclarations(scheme)
    .map(([token, value]) => `  --${token}: ${value};`)
    .join("\n")}\n}`;

/**
 * Exports shadcn variables for light and dark mode.
 *
 * @param theme Complete shadcn theme to serialize.
 * @returns CSS variables for both modes.
 * @example
 * ```ts
 * const css = exportShadcnCss(theme);
 * css.includes(".dark"); // true
 * ```
 */
export const exportShadcnCss = (theme: ShadcnTheme): string => {
  return `${createShadcnCssRuleBlock(":root", theme.light)}\n\n${createShadcnCssRuleBlock(
    ".dark",
    theme.dark,
  )}\n`;
};

/**
 * Exports shadcn variables with Tailwind v4 color mappings.
 *
 * @param theme Complete shadcn theme to serialize.
 * @returns A Tailwind `@theme inline` block followed by the variables.
 * @example
 * ```ts
 * const css = exportShadcnTailwindTheme(theme);
 * css.startsWith("@theme inline"); // true
 * ```
 */
export const exportShadcnTailwindTheme = (theme: ShadcnTheme): string => {
  const mappings = SHADCN_COLOR_TOKENS.map(
    (token) => `  --color-${token}: var(--${token});`,
  ).join("\n");
  return `@theme inline {\n${mappings}\n}\n\n${exportShadcnCss(theme)}`;
};

/**
 * Exports the theme as a native shadcn `registry:theme` item.
 *
 * @param theme Complete shadcn theme to serialize.
 * @returns A newline-terminated registry item JSON document.
 * @example
 * ```ts
 * const item = JSON.parse(exportShadcnRegistryTheme(theme));
 * item.type; // "registry:theme"
 * ```
 */
export const exportShadcnRegistryTheme = (theme: ShadcnTheme): string => {
  return (
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: `chroma-${theme.metadata.sourceColor.slice(1).toLowerCase()}`,
        type: "registry:theme",
        cssVars: {
          light: Object.fromEntries(createShadcnDeclarations(theme.light)),
          dark: Object.fromEntries(createShadcnDeclarations(theme.dark)),
        },
      },
      null,
      2,
    ) + "\n"
  );
};
