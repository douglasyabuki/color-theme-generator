export const MATERIAL_VIEWS = [
  "Semantic roles",
  "Reference palettes",
  "Export",
] as const;

export type MaterialView = (typeof MATERIAL_VIEWS)[number];
