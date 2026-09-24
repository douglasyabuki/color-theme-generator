import { useLayoutEffect, useMemo, useState } from "react";

import { ExportPreview } from "@/components/export-preview";
import { PalettePreview } from "@/components/palette-preview";
import { SemanticPreview } from "@/components/semantic-preview";
import { ShadcnWorkspace } from "@/components/shadcn/shadcn-workspace";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  SOURCE_PRESETS,
  type ThemeTarget,
  type View,
  VIEWS,
} from "@/types-and-consts/home";
import { DEFAULT_THEME_OPTIONS } from "@/types-and-consts/material-design";
import type { ShadcnView } from "@/types-and-consts/shadcn-workspace";
import type { ThemeMode } from "@/types-and-consts/theme-mode";
import { applyMaterialScheme } from "@/utils/material-dom";
import { createMaterialTheme } from "@/utils/material-theme";
import { normalizeHexColor } from "@/utils/normalize-hex-color";
import { createShadcnTheme } from "@/utils/shadcn-theme";

export const Home = () => {
  const [sourceColor, setSourceColor] = useState(
    DEFAULT_THEME_OPTIONS.sourceColor,
  );
  const [sourceInput, setSourceInput] = useState(sourceColor);
  const [contrastLevel, setContrastLevel] = useState(0);
  const [mode, setMode] = useState<ThemeMode>("light");
  const [target, setTarget] = useState<ThemeTarget>("material");
  const [shadcnView, setShadcnView] = useState<ShadcnView>("Preview");
  const [view, setView] = useState<View>("Semantic roles");
  const theme = useMemo(
    () =>
      createMaterialTheme({
        ...DEFAULT_THEME_OPTIONS,
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
    updateSource(DEFAULT_THEME_OPTIONS.sourceColor);
    setContrastLevel(DEFAULT_THEME_OPTIONS.contrastLevel);
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
            From a single color to a whole system
          </p>
          <h1
            className="m-0 text-[clamp(38px,4.25vw,62px)] leading-[1.08] font-medium tracking-[-2.7px] max-[800px]:text-[43px] max-[800px]:tracking-[-2px] max-[580px]:text-[39px] [&_>_span]:text-(--md-sys-color-primary)"
            id="page-heading"
          >
            One color.
            <br />
            <span>Endless possibilities.</span>
          </h1>
          <p className="mt-5.5 text-[13px] leading-[1.8] text-(--md-sys-color-on-surface-variant) max-[580px]:text-[12px]">
            Explore the relationships that make a theme.
            <br />
            Material 3 and shadcn colors, powered by Material Color Utilities.
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
          <span>HCT → your color system</span>
        </div>
      </section>
      <div className="grid grid-cols-[250px_minmax(0,1fr)] items-start gap-9 max-[1150px]:grid-cols-[224px_minmax(0,1fr)] max-[1150px]:gap-6 max-[800px]:grid-cols-1 min-[1450px]:grid-cols-[270px_minmax(0,1fr)] min-[1450px]:gap-10.5">
        <aside
          data-material-workspace=""
          className="sticky top-6 rounded-2xl border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface-container-low) p-5.5 selection:bg-(--md-sys-color-primary-container) selection:text-(--md-sys-color-on-primary-container) max-[1150px]:p-4.5 max-[800px]:static max-[800px]:grid max-[800px]:grid-cols-3 max-[800px]:gap-x-6 max-[800px]:gap-y-0 max-[580px]:grid-cols-2 max-[580px]:gap-x-5 max-[580px]:gap-y-0"
          aria-label="Theme controls"
        >
          <div className="flex items-center justify-between gap-2 pb-6.5 max-[800px]:col-span-full max-[800px]:pb-5 [&_h2]:text-[16px] [&_h2]:font-semibold [&_h2]:tracking-[-0.5px]">
            <h2>Your theme</h2>
            <button
              className="flex cursor-pointer items-center gap-1.5 border-0 bg-transparent pt-1.5 pr-0 pb-1.5 pl-2 text-[11px] text-(--md-sys-color-primary) transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary) [&:hover]:underline"
              onClick={reset}
            >
              Reset <span aria-hidden="true">↺</span>
            </button>
          </div>
          <div className="mb-6.25 max-[800px]:mb-2.5 max-[580px]:mb-5.5 max-[580px]:nth-of-type-2:col-span-full [&_label]:mb-2.5 [&_label]:block [&_label]:text-[12px] [&_label]:font-semibold">
            <label htmlFor="source-color">Source color</label>
            <div className="flex items-center gap-2 rounded-[9px] border border-(--md-sys-color-outline) bg-(--md-sys-color-surface-container-lowest) p-1.25 focus-within:[outline:2px_solid_var(--md-sys-color-primary)] focus-within:outline-offset-2 [&_input:focus-visible]:[outline:0]">
              <input
                className="h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-[6px] [background:none]"
                id="source-picker"
                aria-label="Choose source color"
                type="color"
                value={sourceColor}
                onChange={(event) =>
                  updateSource(event.target.value.toUpperCase())
                }
              />
              <input
                className="w-full min-w-0 px-0 py-1.25 font-[Cascadia_Code,Consolas,monospace] text-[14px] text-(--md-sys-color-on-surface) [background:none]"
                id="source-color"
                type="text"
                value={sourceInput}
                spellCheck={false}
                autoComplete="off"
                aria-invalid={invalidSource}
                aria-describedby="source-help"
                onChange={(event) => updateSource(event.target.value)}
                onBlur={() => {
                  const normalized = normalizeHexColor(sourceInput);
                  if (normalized) setSourceInput(normalized);
                }}
              />
            </div>
            <p
              id="source-help"
              className={
                invalidSource
                  ? "mt-2.25 text-[11px] leading-[1.6] text-(--md-sys-color-error)"
                  : "mt-2.25 text-[11px] leading-[1.6] text-(--md-sys-color-on-surface-variant)"
              }
            >
              {invalidSource
                ? "Enter a 3- or 6-digit hex color. Showing your last valid theme."
                : "A starting point, not a fixed primary color."}
            </p>
            <div
              className="mt-3 grid grid-cols-[repeat(8,1fr)] gap-0.5 max-[580px]:grid-cols-[repeat(8,minmax(0,25px))] max-[580px]:gap-1.5"
              aria-label="Example source colors"
            >
              {SOURCE_PRESETS.map((preset) => (
                <button
                  key={preset.color}
                  aria-label={`Use ${preset.name}`}
                  aria-pressed={sourceColor === preset.color}
                  title={preset.name}
                  className="aspect-square min-w-0 cursor-pointer rounded-full border border-transparent bg-transparent p-0.75 transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary) aria-pressed:border-(--md-sys-color-primary) [&_span]:block [&_span]:h-full [&_span]:w-full [&_span]:rounded-full [&_span]:border [&_span]:border-(--md-sys-color-outline-variant) [&:hover]:border-(--md-sys-color-primary)"
                  onClick={() => updateSource(preset.color)}
                >
                  <span style={{ background: preset.color }} />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6.25 max-[800px]:mb-2.5 max-[580px]:mb-5.5 max-[580px]:nth-of-type-2:col-span-full [&_label]:mb-2.5 [&_label]:block [&_label]:text-[12px] [&_label]:font-semibold">
            <span
              className="mb-2.5 block text-[12px] font-semibold"
              id="mode-label"
            >
              Appearance
            </span>
            <div
              className="flex gap-1 rounded-[9px] border border-(--md-sys-color-outline-variant) p-1 [&_button]:w-[50%] [&_button]:rounded-md [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-1 [&_button]:py-2 [&_button]:text-[12px] [&_button]:text-(--md-sys-color-on-surface-variant) [&_button_span]:mr-1 [&_button[aria-pressed=true]]:bg-(--md-sys-color-secondary-container) [&_button[aria-pressed=true]]:text-(--md-sys-color-on-secondary-container)"
              role="group"
              aria-labelledby="mode-label"
            >
              <button
                className="cursor-pointer transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary)"
                aria-pressed={mode === "light"}
                onClick={() => setMode("light")}
              >
                <span aria-hidden="true">☀</span> Light
              </button>
              <button
                className="cursor-pointer transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary)"
                aria-pressed={mode === "dark"}
                onClick={() => setMode("dark")}
              >
                <span aria-hidden="true">☾</span> Dark
              </button>
            </div>
          </div>
          <div className="mb-6.25 max-[800px]:mb-2.5 max-[580px]:mb-5.5 max-[580px]:nth-of-type-2:col-span-full [&_label]:mb-2.5 [&_label]:block [&_label]:text-[12px] [&_label]:font-semibold">
            <div className="flex items-baseline justify-between [&_output]:rounded-sm [&_output]:bg-(--md-sys-color-surface-container-high) [&_output]:px-1.5 [&_output]:py-0.5 [&_output]:text-[11px]">
              <label htmlFor="contrast">Contrast</label>
              <output
                className="font-[Cascadia_Code,SFMono-Regular,Consolas,monospace] tabular-nums"
                htmlFor="contrast"
              >
                {contrastLevel.toFixed(2)}
              </output>
            </div>
            <input
              className="my-2.25 h-4.5 w-full cursor-pointer accent-(--md-sys-color-primary) focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary)"
              id="contrast"
              type="range"
              min="-1"
              max="1"
              step="0.05"
              value={contrastLevel}
              onChange={(event) => setContrastLevel(Number(event.target.value))}
            />
            <div className="flex justify-between text-[10px] text-(--md-sys-color-on-surface-variant)">
              <span>Less</span>
              <span>Default</span>
              <span>More</span>
            </div>
            <p className="mt-2.25 text-[11px] leading-[1.6] text-(--md-sys-color-on-surface-variant)">
              Recomputes Material foregrounds and backgrounds together.
            </p>
          </div>
          <div className="border-t border-t-(--md-sys-color-outline-variant) pt-5 max-[800px]:col-span-full max-[800px]:mt-2.5 max-[800px]:pt-3.5 max-[580px]:mt-0 max-[800px]:[&_dl]:m-0 max-[800px]:[&_dl]:flex max-[800px]:[&_dl]:flex-wrap max-[800px]:[&_dl]:gap-x-6.5 max-[800px]:[&_dl]:gap-y-2.5 max-[580px]:[&_dl]:grid max-[580px]:[&_dl]:grid-cols-2 max-[580px]:[&_dl]:gap-x-5 max-[580px]:[&_dl]:gap-y-0 max-[800px]:[&_dl_>_div]:gap-2 max-[580px]:[&_dl_>_div]:justify-between [&>span:first-child]:text-[9px] [&>span:first-child]:tracking-[1.1px] [&>span:first-child]:text-(--md-sys-color-on-surface-variant) max-[800px]:[&>span:first-child]:hidden">
            <span className="text-[10px] font-[650] tracking-[1.8px] uppercase">
              Generation settings
            </span>
            <dl className="mt-3.75">
              <div className="mt-2.75 flex justify-between gap-2.5 text-[11px]">
                <dt className="text-(--md-sys-color-on-surface-variant)">
                  Variant
                </dt>
                <dd className="font-semibold">Tonal Spot</dd>
              </div>
              <div className="mt-2.75 flex justify-between gap-2.5 text-[11px]">
                <dt className="text-(--md-sys-color-on-surface-variant)">
                  Specification
                </dt>
                <dd className="font-semibold">{theme.metadata.specVersion}</dd>
              </div>
              <div className="mt-2.75 flex justify-between gap-2.5 text-[11px]">
                <dt className="text-(--md-sys-color-on-surface-variant)">
                  Platform
                </dt>
                <dd className="font-semibold">Phone</dd>
              </div>
              <div className="mt-2.75 flex justify-between gap-2.5 text-[11px]">
                <dt className="text-(--md-sys-color-on-surface-variant)">
                  Color engine
                </dt>
                <dd className="font-semibold">
                  MCU {theme.metadata.packageVersion}
                </dd>
              </div>
            </dl>
          </div>
          <p className="mt-6.25 text-[10px] leading-[1.7] text-(--md-sys-color-on-surface-variant) max-[800px]:hidden">
            One source. Two independent schemes.
            <br />
            Every role resolved by Material.
          </p>
        </aside>
        <div className="min-w-0 scroll-mt-5" id="workspace" tabIndex={-1}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium" id="target-label">
              Theme target
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
          {target === "shadcn" ? (
            <ShadcnWorkspace
              theme={shadcnTheme}
              mode={mode}
              view={shadcnView}
              onViewChange={setShadcnView}
            />
          ) : (
            <div
              data-material-workspace=""
              className="selection:bg-(--md-sys-color-primary-container) selection:text-(--md-sys-color-on-primary-container)"
            >
              <div className="flex min-h-12.75 items-center justify-between gap-3 border-b border-b-(--md-sys-color-outline-variant) max-[580px]:min-h-10.5">
                <nav
                  className="flex gap-6 self-stretch max-[1150px]:gap-4.5 max-[580px]:w-full max-[580px]:justify-between max-[580px]:gap-3 [&_button]:relative [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-0 [&_button]:pt-1 [&_button]:pb-4 [&_button]:text-[12px] [&_button]:whitespace-nowrap [&_button]:text-(--md-sys-color-on-surface-variant) max-[580px]:[&_button]:text-[11px] [&_button[aria-pressed=true]]:font-[650] [&_button[aria-pressed=true]]:text-(--md-sys-color-primary) [&_button[aria-pressed=true]::after]:absolute [&_button[aria-pressed=true]::after]:right-0 [&_button[aria-pressed=true]::after]:-bottom-px [&_button[aria-pressed=true]::after]:left-0 [&_button[aria-pressed=true]::after]:h-0.5 [&_button[aria-pressed=true]::after]:bg-(--md-sys-color-primary) [&_button[aria-pressed=true]::after]:content-['']"
                  aria-label="Theme views"
                >
                  {VIEWS.map((name, index) => (
                    <button
                      className="cursor-pointer transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary)"
                      key={name}
                      aria-pressed={view === name}
                      onClick={() => setView(name)}
                    >
                      <span className="mr-1.5 text-[9px] max-[580px]:hidden">
                        0{index + 1}
                      </span>
                      {name}
                    </button>
                  ))}
                </nav>
                <span className="mb-2.5 rounded-[20px] bg-(--md-sys-color-surface-container) px-2.25 py-1.25 text-[10px] whitespace-nowrap capitalize max-[1150px]:hidden max-[800px]:block max-[580px]:hidden">
                  {mode} scheme
                </span>
              </div>
              {view === "Semantic roles" && (
                <SemanticPreview scheme={theme[mode]} />
              )}
              {view === "Reference palettes" && (
                <PalettePreview palettes={theme.palettes[mode]} mode={mode} />
              )}
              {view === "Export" && <ExportPreview theme={theme} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
