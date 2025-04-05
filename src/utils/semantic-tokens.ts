import { ThemeCategories } from "../types/theme-categories";

interface SemanticToken {
  light: string;
  dark: string;
}

const primarySemanticTokens: Record<string, SemanticToken> = {
  "--primary": { light: "--primary-40", dark: "--primary-70" },
  "--on-primary": { light: "--primary-100", dark: "--primary-20" },
  "--primary-container": { light: "--primary-90", dark: "--primary-30" },
  "--on-primary-container": { light: "--primary-10", dark: "--primary-90" },
  "--primary-fixed": { light: "--primary-90", dark: "--primary-90" },
  "--on-primary-fixed": { light: "--primary-10", dark: "--primary-10" },
  "--primary-fixed-dim": { light: "--primary-80", dark: "--primary-70" },
  "--on-primary-fixed-variant": { light: "--primary-30", dark: "--primary-30" },
  "--inverse-primary": { light: "--primary-80", dark: "--primary-40" },
};
const secondarySemanticTokens: Record<string, SemanticToken> = {
  "--secondary": { light: "--secondary-40", dark: "--secondary-70" },
  "--on-secondary": { light: "--secondary-100", dark: "--secondary-20" },
  "--secondary-container": { light: "--secondary-90", dark: "--secondary-30" },
  "--on-secondary-container": {
    light: "--secondary-10",
    dark: "--secondary-90",
  },
  "--secondary-fixed": { light: "--secondary-90", dark: "--secondary-90" },
  "--on-secondary-fixed": { light: "--secondary-10", dark: "--secondary-10" },
  "--secondary-fixed-dim": { light: "--secondary-80", dark: "--secondary-70" },
  "--on-secondary-fixed-variant": {
    light: "--secondary-30",
    dark: "--secondary-30",
  },
};
const tertiarySemanticTokens: Record<string, SemanticToken> = {
  "--tertiary": { light: "--tertiary-40", dark: "--tertiary-70" },
  "--on-tertiary": { light: "--tertiary-100", dark: "--tertiary-20" },
  "--tertiary-container": { light: "--tertiary-90", dark: "--tertiary-30" },
  "--on-tertiary-container": { light: "--tertiary-10", dark: "--tertiary-90" },
  "--tertiary-fixed": { light: "--tertiary-90", dark: "--tertiary-90" },
  "--on-tertiary-fixed": { light: "--tertiary-10", dark: "--tertiary-10" },
  "--tertiary-fixed-dim": { light: "--tertiary-80", dark: "--tertiary-70" },
  "--on-tertiary-fixed-variant": {
    light: "--tertiary-30",
    dark: "--tertiary-30",
  },
};
const errorSemanticTokens: Record<string, SemanticToken> = {
  "--error": { light: "--error-40", dark: "--error-70" },
  "--on-error": { light: "--error-100", dark: "--error-20" },
  "--error-container": { light: "--error-90", dark: "--error-30" },
  "--on-error-container": { light: "--error-10", dark: "--error-90" },
};
const neutralSemanticTokens: Record<string, SemanticToken> = {
  "--neutral": { light: "--neutral-40", dark: "--neutral-40" },
  "--neutral-variant": {
    light: "--neutral-variant-40",
    dark: "--neutral-variant-40",
  },

  "--surface-dim": { light: "--neutral-87", dark: "--neutral-6" },
  "--surface": { light: "--neutral-98", dark: "--neutral-6" },
  "--surface-bright": { light: "--neutral-98", dark: "--neutral-24" },

  "--surface-container-lowest": { light: "--neutral-100", dark: "--neutral-4" },
  "--surface-container-low": { light: "--neutral-96", dark: "--neutral-10" },
  "--surface-container": { light: "--neutral-94", dark: "--neutral-12" },
  "--surface-container-high": { light: "--neutral-92", dark: "--neutral-17" },
  "--surface-container-highest": {
    light: "--neutral-90",
    dark: "--neutral-22",
  },

  "--inverse-surface": { light: "--neutral-20", dark: "--neutral-90" },
  "--inverse-on-surface": { light: "--neutral-95", dark: "--neutral-20" },
  "--on-surface": { light: "--neutral-10", dark: "--neutral-90" },
  "--scrim": { light: "--neutral-0", dark: "--neutral-0" },
  "--shadow": { light: "--neutral-0", dark: "--neutral-0" },
};
const neutralVariantSemanticTokens: Record<string, SemanticToken> = {
  "--outline": { light: "--neutral-variant-50", dark: "--neutral-variant-60" },
  "--outline-variant": {
    light: "--neutral-variant-80",
    dark: "--neutral-variant-30",
  },
};

const allSemanticTokens = {
  ...primarySemanticTokens,
  ...secondarySemanticTokens,
  ...tertiarySemanticTokens,
  ...errorSemanticTokens,
  ...neutralSemanticTokens,
  ...neutralVariantSemanticTokens,
};

const getCategorySemanticTokens = (
  category: ThemeCategories,
): Record<string, SemanticToken> => {
  switch (category) {
    case "primary":
      return primarySemanticTokens;

    case "secondary":
      return secondarySemanticTokens;

    case "tertiary":
      return tertiarySemanticTokens;

    case "error":
      return errorSemanticTokens;

    case "neutral":
      return neutralSemanticTokens;

    case "neutral-variant":
      return neutralVariantSemanticTokens;
  }
};

export const applySemanticTokens = (category: ThemeCategories | "all") => {
  const tokens =
    category === "all"
      ? allSemanticTokens
      : getCategorySemanticTokens(category);

  (["light", "dark"] as const).forEach((mode) => {
    const target = document.querySelector(
      `html[data-mode="${mode}"]`,
    ) as HTMLElement | null;

    if (!target) return;

    Object.entries(tokens).forEach(([semantic, mapping]) => {
      target.style.setProperty(semantic, `var(${mapping[mode]})`);
    });
  });
};
