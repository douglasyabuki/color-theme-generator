import { useLayoutEffect, useMemo, useState } from "react";

import { ThemeControls } from "@/components/theme-controls";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/shadcn/toggle-group";
import { MaterialWorkspace } from "@/components/workspaces/material/material-workspace";
import { ShadcnWorkspace } from "@/components/workspaces/shadcn/shadcn-workspace";
import { DEFAULT_MATERIAL_THEME_OPTIONS } from "@/types-and-consts/material-design";
import type { MaterialView } from "@/types-and-consts/material-workspace";
import type { ShadcnView } from "@/types-and-consts/shadcn-workspace";
import type { ThemeMode } from "@/types-and-consts/theme-mode";
import type { Workspace } from "@/types-and-consts/workspaces";
import { applyMaterialScheme } from "@/utils/material-dom";
import { createMaterialTheme } from "@/utils/material-theme";
import { normalizeHexColor } from "@/utils/normalize-hex-color";
import { createShadcnTheme } from "@/utils/shadcn-theme";

export const Home = () => {
  const [sourceColor, setSourceColor] = useState(
    DEFAULT_MATERIAL_THEME_OPTIONS.sourceColor,
  );
  const [sourceInput, setSourceInput] = useState(sourceColor);
  const [contrastLevel, setContrastLevel] = useState(0);
  const [mode, setMode] = useState<ThemeMode>("light");
  const [target, setTarget] = useState<Workspace>("material");
  const [shadcnView, setShadcnView] = useState<ShadcnView>("Preview");
  const [materialView, setMaterialView] =
    useState<MaterialView>("Semantic roles");
  const theme = useMemo(
    () =>
      createMaterialTheme({
        ...DEFAULT_MATERIAL_THEME_OPTIONS,
        sourceColor,
        contrastLevel,
      }),
    [sourceColor, contrastLevel],
  );
  const shadcnTheme = useMemo(() => createShadcnTheme(theme), [theme]);
  const invalidSource = normalizeHexColor(sourceInput) === undefined;

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = mode;
    root.style.colorScheme = mode;
    applyMaterialScheme(root, theme[mode]);
  }, [theme, mode]);

  const updateSource = (value: string) => {
    setSourceInput(value);
    const normalized = normalizeHexColor(value);
    if (normalized) setSourceColor(normalized);
  };

  const reset = () => {
    updateSource(DEFAULT_MATERIAL_THEME_OPTIONS.sourceColor);
    setContrastLevel(DEFAULT_MATERIAL_THEME_OPTIONS.contrastLevel);
    setMode("light");
  };

  return (
    <>
      <section
        className="flex items-center justify-between gap-10 px-0 pt-14 pb-13 max-[800px]:gap-5 max-[800px]:px-0 max-[800px]:py-9.5 max-[580px]:px-0 max-[580px]:py-8.5 [&>div>p:first-child]:mb-4.5 [&>div>p:first-child]:text-(--md-sys-color-primary) max-[580px]:[&>div>p:first-child]:text-[8px] max-[580px]:[&>div>p:first-child]:tracking-[1.3px]"
        aria-labelledby="page-heading"
      >
        <div>
          <p className="text-[10px] font-[650] tracking-[1.8px] uppercase">
            Semantic color themes from one source
          </p>
          <h1
            className="m-0 text-[clamp(38px,4.25vw,62px)] leading-[1.08] font-medium tracking-[-2.7px] max-[800px]:text-[43px] max-[800px]:tracking-[-2px] max-[580px]:text-[39px] [&_>_span]:text-(--md-sys-color-primary)"
            id="page-heading"
          >
            One color.
            <br />
            <span>A complete theme.</span>
          </h1>
          <p className="mt-5.5 text-[13px] leading-[1.8] text-(--md-sys-color-on-surface-variant) max-[580px]:text-[12px]">
            Choose a source color. Generate coherent light and dark themes.
            <br />
            Inspect Material colors or adapted shadcn tokens, then export what
            your project needs.
          </p>
        </div>
        <div
          className="flex w-75 flex-col items-center gap-5 pr-9.5 max-[800px]:w-35 max-[800px]:p-0 max-[580px]:hidden [&_>_span]:text-[10px] [&_>_span]:tracking-[1.5px] [&_>_span]:text-(--md-sys-color-on-surface-variant) max-[800px]:[&_>_span]:text-[8px] max-[800px]:[&_>_span]:tracking-[0.5px]"
          aria-hidden="true"
        >
          <div className="grid -rotate-12 grid-cols-[repeat(2,80px)] gap-1.25 max-[800px]:grid-cols-[repeat(2,51px)]">
            <div className="h-20 w-20 rounded-[50%_50%_10%_50%] bg-(--md-sys-color-primary) max-[800px]:h-12.75 max-[800px]:w-12.75" />
            <div className="h-20 w-20 rounded-[50%_50%_50%_10%] bg-(--md-sys-color-secondary-container) max-[800px]:h-12.75 max-[800px]:w-12.75" />
            <div className="h-20 w-20 rounded-[50%_10%_50%_50%] bg-(--md-sys-color-tertiary) max-[800px]:h-12.75 max-[800px]:w-12.75" />
            <div className="h-20 w-20 rounded-[10%_50%_50%_50%] bg-(--md-sys-color-primary-container) max-[800px]:h-12.75 max-[800px]:w-12.75" />
          </div>
        </div>
      </section>
      <div className="grid grid-cols-[250px_minmax(0,1fr)] items-start gap-9 max-[1150px]:grid-cols-[224px_minmax(0,1fr)] max-[1150px]:gap-6 max-[800px]:grid-cols-1 min-[1450px]:grid-cols-[270px_minmax(0,1fr)] min-[1450px]:gap-10.5">
        <ThemeControls
          theme={theme}
          sourceColor={sourceColor}
          sourceInput={sourceInput}
          invalidSource={invalidSource}
          contrastLevel={contrastLevel}
          mode={mode}
          onSourceChange={updateSource}
          onSourceInputChange={setSourceInput}
          onContrastChange={setContrastLevel}
          onModeChange={setMode}
          onReset={reset}
        />
        <div className="min-w-0 scroll-mt-5" id="workspace" tabIndex={-1}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium" id="target-label">
              Use with
            </span>
            <ToggleGroup
              aria-labelledby="target-label"
              variant="outline"
              value={[target]}
              onValueChange={(values) => {
                const value = values[0];
                if (value === "material" || value === "shadcn")
                  setTarget(value);
              }}
            >
              <ToggleGroupItem value="material">Material</ToggleGroupItem>
              <ToggleGroupItem value="shadcn">shadcn</ToggleGroupItem>
            </ToggleGroup>
          </div>
          {target === "material" ? (
            <MaterialWorkspace
              theme={theme}
              mode={mode}
              view={materialView}
              onViewChange={setMaterialView}
            />
          ) : (
            <ShadcnWorkspace
              theme={shadcnTheme}
              mode={mode}
              view={shadcnView}
              onViewChange={setShadcnView}
            />
          )}
        </div>
      </div>
    </>
  );
};
