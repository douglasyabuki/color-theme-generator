import type { MaterialTheme } from "@/types-and-consts/material-design";
import {
  MATERIAL_VIEWS,
  type MaterialView,
} from "@/types-and-consts/material-workspace";
import type { ThemeMode } from "@/types-and-consts/theme-mode";

import { MaterialExport } from "./material-export";
import { MaterialPalettes } from "./material-palettes";
import { MaterialPreview } from "./material-preview";

interface MaterialWorkspaceProps {
  theme: MaterialTheme;
  mode: ThemeMode;
  view: MaterialView;
  onViewChange: (view: MaterialView) => void;
}

export const MaterialWorkspace = ({
  theme,
  mode,
  view,
  onViewChange,
}: MaterialWorkspaceProps) => (
  <div
    data-material-workspace=""
    className="selection:bg-(--md-sys-color-primary-container) selection:text-(--md-sys-color-on-primary-container)"
  >
    <div className="flex min-h-12.75 items-center justify-between gap-3 border-b border-b-(--md-sys-color-outline-variant) max-[580px]:min-h-10.5">
      <nav
        className="flex gap-6 self-stretch max-[1150px]:gap-4.5 max-[580px]:w-full max-[580px]:justify-between max-[580px]:gap-3 [&_button]:relative [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-0 [&_button]:pt-1 [&_button]:pb-4 [&_button]:text-[12px] [&_button]:whitespace-nowrap [&_button]:text-(--md-sys-color-on-surface-variant) max-[580px]:[&_button]:text-[11px] [&_button[aria-pressed=true]]:font-[650] [&_button[aria-pressed=true]]:text-(--md-sys-color-primary) [&_button[aria-pressed=true]::after]:absolute [&_button[aria-pressed=true]::after]:right-0 [&_button[aria-pressed=true]::after]:-bottom-px [&_button[aria-pressed=true]::after]:left-0 [&_button[aria-pressed=true]::after]:h-0.5 [&_button[aria-pressed=true]::after]:bg-(--md-sys-color-primary) [&_button[aria-pressed=true]::after]:content-['']"
        aria-label="Theme views"
      >
        {MATERIAL_VIEWS.map((name) => (
          <button
            className="cursor-pointer transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary)"
            key={name}
            aria-pressed={view === name}
            onClick={() => onViewChange(name)}
          >
            {name}
          </button>
        ))}
      </nav>
      <span className="mb-2.5 rounded-[20px] bg-(--md-sys-color-surface-container) px-2.25 py-1.25 text-[10px] whitespace-nowrap capitalize max-[1150px]:hidden max-[800px]:block max-[580px]:hidden">
        {mode} scheme
      </span>
    </div>
    {view === "Semantic roles" && <MaterialPreview scheme={theme[mode]} />}
    {view === "Reference palettes" && (
      <MaterialPalettes palettes={theme.palettes[mode]} mode={mode} />
    )}
    {view === "Export" && <MaterialExport theme={theme} />}
  </div>
);
