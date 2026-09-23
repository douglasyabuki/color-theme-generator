import {
  exportShadcnCss,
  exportShadcnRegistryTheme,
  exportShadcnTailwindTheme,
} from "@/utils/shadcn-exports";

export const SHADCN_EXPORTS = {
  variables: {
    label: "CSS variables",
    filename: "shadcn-theme.css",
    mime: "text/css",
    serialize: exportShadcnCss,
    description:
      "Paste into an existing shadcn stylesheet. Both modes included.",
  },
  tailwind: {
    label: "Tailwind v4 theme",
    filename: "shadcn-tailwind-theme.css",
    mime: "text/css",
    serialize: exportShadcnTailwindTheme,
    description:
      "Tailwind v4 color mappings plus generated variables. Keep your project's imports and other configuration.",
  },
  registry: {
    label: "Registry theme",
    filename: "shadcn-theme.json",
    mime: "application/json",
    serialize: exportShadcnRegistryTheme,
    description:
      "A native registry:theme item containing light and dark color variables.",
  },
} as const;

export type ShadcnExportFormat = keyof typeof SHADCN_EXPORTS;

export type ShadcnExportFeedback = { content: string; text: string };
