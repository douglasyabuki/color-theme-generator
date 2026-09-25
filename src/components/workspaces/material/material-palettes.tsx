import { formatArgbHex } from "@/lib/format-argb-hex";
import { formatMaterialTokenName } from "@/utils/material-css";

import type { MaterialPaletteMap } from "../../../types-and-consts/material-design";
import {
  MATERIAL_PALETTE_NAMES,
  MATERIAL_PALETTE_TONES,
} from "../../../types-and-consts/material-design";
import type { ThemeMode } from "../../../types-and-consts/theme-mode";

interface MaterialPalettesProps {
  palettes: MaterialPaletteMap;
  mode: ThemeMode;
}

export const MaterialPalettes = ({ palettes, mode }: MaterialPalettesProps) => {
  return (
    <section
      className="pt-6.75 [&_>_section+section]:mt-10"
      aria-labelledby="palette-heading"
    >
      <div className="mb-4.75 flex items-end justify-between gap-5.5 max-[1150px]:block [&_>_p]:max-w-60 [&_>_p]:text-right [&_>_p]:text-[11px] [&_>_p]:leading-[1.6] [&_>_p]:text-(--md-sys-color-on-surface-variant) max-[1150px]:[&_>_p]:mt-2 max-[1150px]:[&_>_p]:max-w-none max-[1150px]:[&_>_p]:text-left [&_h2]:text-[22px] [&_h2]:leading-tight [&_h2]:font-medium [&_h2]:tracking-[-0.6px] [&>div>p:first-child]:mb-1.75 [&>div>p:first-child]:text-[9px] [&>div>p:first-child]:tracking-[1.4px] [&>div>p:first-child]:text-(--md-sys-color-on-surface-variant)">
        <div>
          <p className="text-[10px] font-[650] tracking-[1.8px] uppercase">
            Reference / {mode} scheme
          </p>
          <h2 id="palette-heading">The tones behind the theme.</h2>
        </div>
        <p>HCT reference colors. Use semantic roles to style components.</p>
      </div>
      <p className="mb-5 text-[11px] leading-[1.6] text-(--md-sys-color-on-surface-variant)">
        A key color represents the hue and chroma of a palette; its tones vary
        in lightness.
      </p>
      <div className="flex flex-col gap-5">
        {MATERIAL_PALETTE_NAMES.map((name) => (
          <article
            className="rounded-xl border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface-container-low) p-4.75 max-[580px]:p-4"
            key={name}
          >
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 [&_h3]:text-[16px] [&_h3]:font-medium [&_h3]:capitalize">
              <h3>{formatMaterialTokenName(name).replaceAll("-", " ")}</h3>
              <span className="flex items-center gap-1.75 text-[10px] text-(--md-sys-color-on-surface-variant)">
                <span
                  className="inline-block h-4.5 w-4.5 shrink-0 rounded-[5px] border border-(--md-sys-color-outline-variant)"
                  style={{ background: formatArgbHex(palettes[name].keyColor) }}
                />
                Key color{" "}
                <code className="font-[Cascadia_Code,SFMono-Regular,Consolas,monospace] tabular-nums">
                  {formatArgbHex(palettes[name].keyColor)}
                </code>
              </span>
            </div>
            <div className="grid grid-cols-13 gap-1.25 max-[1150px]:grid-cols-7 max-[1150px]:gap-x-1.5 max-[1150px]:gap-y-3 max-[580px]:grid-cols-4">
              {MATERIAL_PALETTE_TONES.map((tone) => (
                <div
                  className="min-w-0 text-center [&_>_span]:mb-1.25 [&_>_span]:block [&_>_span]:text-[10px] [&_code]:block [&_code]:text-[8px] [&_code]:text-(--md-sys-color-on-surface-variant) max-[580px]:[&_code]:text-[9px] min-[1450px]:[&_code]:text-[9px]"
                  key={tone}
                >
                  <div
                    className="mb-1.75 h-16.5 rounded-[5px] border border-(--md-sys-color-outline-variant)"
                    style={{
                      background: formatArgbHex(palettes[name].tones[tone]),
                    }}
                  />
                  <span>{tone}</span>
                  <code className="font-[Cascadia_Code,SFMono-Regular,Consolas,monospace] tabular-nums">
                    {formatArgbHex(palettes[name].tones[tone])}
                  </code>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="mt-5.5 text-[11px] leading-[1.6] text-(--md-sys-color-on-surface-variant)">
        Material may generate different reference palettes for light and dark
        schemes.
      </p>
    </section>
  );
};
