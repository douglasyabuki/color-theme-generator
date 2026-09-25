import {
  MaterialTabs,
  MaterialTabsList,
  MaterialTabsPanel,
  MaterialTabsTrigger,
} from "@/components/ui/material/tabs";
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
  <MaterialTabs
    value={view}
    onValueChange={(value) => {
      const nextView = MATERIAL_VIEWS.find((name) => name === value);
      if (nextView) onViewChange(nextView);
    }}
    data-material-workspace=""
    className="selection:bg-(--md-sys-color-primary-container) selection:text-(--md-sys-color-on-primary-container)"
  >
    <div className="flex items-center justify-between gap-3">
      <MaterialTabsList className="min-w-0 flex-1" aria-label="Theme views">
        {MATERIAL_VIEWS.map((name) => (
          <MaterialTabsTrigger key={name} value={name}>
            {name}
          </MaterialTabsTrigger>
        ))}
      </MaterialTabsList>
      <span className="rounded-[20px] bg-(--md-sys-color-surface-container) px-2.25 py-1.25 text-[10px] whitespace-nowrap capitalize max-[1150px]:hidden max-[800px]:block max-[580px]:hidden">
        {mode} scheme
      </span>
    </div>
    <MaterialTabsPanel value="Semantic roles" className="pt-0">
      <MaterialPreview scheme={theme[mode]} />
    </MaterialTabsPanel>
    <MaterialTabsPanel value="Reference palettes" className="pt-0">
      <MaterialPalettes palettes={theme.palettes[mode]} mode={mode} />
    </MaterialTabsPanel>
    <MaterialTabsPanel value="Export" className="pt-0">
      <MaterialExport theme={theme} />
    </MaterialTabsPanel>
  </MaterialTabs>
);
