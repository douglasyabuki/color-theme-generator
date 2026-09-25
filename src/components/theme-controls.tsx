import { COLOR_SOURCE_PRESETS } from "@/types-and-consts/colors";
import type { MaterialTheme } from "@/types-and-consts/material-design";
import type { ThemeMode } from "@/types-and-consts/theme-mode";
import { normalizeHexColor } from "@/utils/normalize-hex-color";

interface ThemeControlsProps {
  theme: MaterialTheme;
  sourceColor: string;
  sourceInput: string;
  invalidSource: boolean;
  contrastLevel: number;
  mode: ThemeMode;
  onSourceChange: (value: string) => void;
  onSourceInputChange: (value: string) => void;
  onContrastChange: (value: number) => void;
  onModeChange: (mode: ThemeMode) => void;
  onReset: () => void;
}

export const ThemeControls = ({
  theme,
  sourceColor,
  sourceInput,
  invalidSource,
  contrastLevel,
  mode,
  onSourceChange,
  onSourceInputChange,
  onContrastChange,
  onModeChange,
  onReset,
}: ThemeControlsProps) => (
  <aside
    data-material-workspace=""
    className="sticky top-6 rounded-2xl border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface-container-low) p-5.5 selection:bg-(--md-sys-color-primary-container) selection:text-(--md-sys-color-on-primary-container) max-[1150px]:p-4.5 max-[800px]:static max-[800px]:grid max-[800px]:grid-cols-3 max-[800px]:gap-x-6 max-[800px]:gap-y-0 max-[580px]:grid-cols-2 max-[580px]:gap-x-5 max-[580px]:gap-y-0"
    aria-label="Theme controls"
  >
    <div className="flex items-center justify-between gap-2 pb-6.5 max-[800px]:col-span-full max-[800px]:pb-5 [&_h2]:text-[16px] [&_h2]:font-semibold [&_h2]:tracking-[-0.5px]">
      <h2>Theme settings</h2>
      <button
        className="flex cursor-pointer items-center gap-1.5 border-0 bg-transparent pt-1.5 pr-0 pb-1.5 pl-2 text-[11px] text-(--md-sys-color-primary) transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary) [&:hover]:underline"
        onClick={onReset}
      >
        Reset theme <span aria-hidden="true">↺</span>
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
          onChange={(event) => onSourceChange(event.target.value.toUpperCase())}
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
          onChange={(event) => onSourceInputChange(event.target.value)}
          onBlur={() => {
            const normalized = normalizeHexColor(sourceInput);
            if (normalized) onSourceInputChange(normalized);
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
          : "Material uses this color to generate the full theme. The final primary may differ."}
      </p>
      <div
        className="mt-3 grid grid-cols-[repeat(8,1fr)] gap-0.5 max-[580px]:grid-cols-[repeat(8,minmax(0,25px))] max-[580px]:gap-1.5"
        aria-label="Example source colors"
      >
        {COLOR_SOURCE_PRESETS.map((preset) => (
          <button
            key={preset.color}
            aria-label={`Use ${preset.name}`}
            aria-pressed={sourceColor === preset.color}
            title={preset.name}
            className="aspect-square min-w-0 cursor-pointer rounded-full border border-transparent bg-transparent p-0.75 transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary) aria-pressed:border-(--md-sys-color-primary) [&_span]:block [&_span]:h-full [&_span]:w-full [&_span]:rounded-full [&_span]:border [&_span]:border-(--md-sys-color-outline-variant) [&:hover]:border-(--md-sys-color-primary)"
            onClick={() => onSourceChange(preset.color)}
          >
            <span style={{ background: preset.color }} />
          </button>
        ))}
      </div>
    </div>
    <div className="mb-6.25 max-[800px]:mb-2.5 max-[580px]:mb-5.5 max-[580px]:nth-of-type-2:col-span-full [&_label]:mb-2.5 [&_label]:block [&_label]:text-[12px] [&_label]:font-semibold">
      <span className="mb-2.5 block text-[12px] font-semibold" id="mode-label">
        Preview mode
      </span>
      <div
        className="flex gap-1 rounded-[9px] border border-(--md-sys-color-outline-variant) p-1 [&_button]:w-[50%] [&_button]:rounded-md [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-1 [&_button]:py-2 [&_button]:text-[12px] [&_button]:text-(--md-sys-color-on-surface-variant) [&_button_span]:mr-1 [&_button[aria-pressed=true]]:bg-(--md-sys-color-secondary-container) [&_button[aria-pressed=true]]:text-(--md-sys-color-on-secondary-container)"
        role="group"
        aria-labelledby="mode-label"
      >
        <button
          className="cursor-pointer transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary)"
          aria-pressed={mode === "light"}
          onClick={() => onModeChange("light")}
        >
          <span aria-hidden="true">☀</span> Light
        </button>
        <button
          className="cursor-pointer transition-[background-color,color,border-color] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary)"
          aria-pressed={mode === "dark"}
          onClick={() => onModeChange("dark")}
        >
          <span aria-hidden="true">☾</span> Dark
        </button>
      </div>
    </div>
    <div className="mb-6.25 max-[800px]:mb-2.5 max-[580px]:mb-5.5 max-[580px]:nth-of-type-2:col-span-full [&_label]:mb-2.5 [&_label]:block [&_label]:text-[12px] [&_label]:font-semibold">
      <div className="flex items-baseline justify-between [&_output]:rounded-sm [&_output]:bg-(--md-sys-color-surface-container-high) [&_output]:px-1.5 [&_output]:py-0.5 [&_output]:text-[11px]">
        <label htmlFor="contrast">Material contrast</label>
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
        onChange={(event) => onContrastChange(Number(event.target.value))}
      />
      <div className="flex justify-between text-[10px] text-(--md-sys-color-on-surface-variant)">
        <span>Low</span>
        <span>Standard</span>
        <span>High</span>
      </div>
      <p className="mt-2.25 text-[11px] leading-[1.6] text-(--md-sys-color-on-surface-variant)">
        Adjusts contrast across the generated semantic roles.
      </p>
    </div>
    <details className="border-t border-(--md-sys-color-outline-variant) pt-5 max-[800px]:col-span-full">
      <summary className="cursor-pointer text-[11px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--md-sys-color-primary)">
        Generation details
      </summary>
      <dl className="mt-3.75">
        <div className="mt-2.75 flex justify-between gap-2.5 text-[11px]">
          <dt className="text-(--md-sys-color-on-surface-variant)">Variant</dt>
          <dd className="font-semibold">Tonal Spot</dd>
        </div>
        <div className="mt-2.75 flex justify-between gap-2.5 text-[11px]">
          <dt className="text-(--md-sys-color-on-surface-variant)">
            Specification
          </dt>
          <dd className="font-semibold">{theme.metadata.specVersion}</dd>
        </div>
        <div className="mt-2.75 flex justify-between gap-2.5 text-[11px]">
          <dt className="text-(--md-sys-color-on-surface-variant)">Platform</dt>
          <dd className="font-semibold">Phone</dd>
        </div>
        <div className="mt-2.75 flex justify-between gap-2.5 text-[11px]">
          <dt className="text-(--md-sys-color-on-surface-variant)">
            Color engine
          </dt>
          <dd className="font-semibold">MCU {theme.metadata.packageVersion}</dd>
        </div>
      </dl>
    </details>
    <p className="mt-6.25 text-[10px] leading-[1.7] text-(--md-sys-color-on-surface-variant) max-[800px]:hidden">
      Light and dark schemes are generated independently.
    </p>
  </aside>
);
