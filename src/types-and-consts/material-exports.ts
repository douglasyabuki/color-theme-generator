import {
  exportMaterialCss,
  exportMaterialJson,
  exportMaterialPalettes,
} from "@/utils/material-exports";

export const MATERIAL_EXPORTS = {
  semantic: {
    label: "Semantic CSS",
    filename: "material-theme.css",
    mime: "text/css",
    serialize: exportMaterialCss,
    description: "Ready-to-use system colors for light and dark mode.",
  },
  palettes: {
    label: "Reference CSS",
    filename: "material-palettes.css",
    mime: "text/css",
    serialize: exportMaterialPalettes,
    description: "Separate light and dark HCT reference palettes.",
  },
  json: {
    label: "Theme JSON",
    filename: "material-theme.json",
    mime: "application/json",
    serialize: exportMaterialJson,
    description:
      "The complete theme, with canonical ARGB colors and generation metadata.",
  },
} as const;

export type MaterialExportFormat = keyof typeof MATERIAL_EXPORTS;

export type MaterialExportFeedback = { content: string; text: string };
