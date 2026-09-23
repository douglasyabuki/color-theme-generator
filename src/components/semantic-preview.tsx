import type { CSSProperties } from "react";

import { formatArgbHex } from "@/lib/format-argb-hex";
import {
  formatMaterialTokenName,
  getMaterialRoleVariable,
} from "@/utils/material-css";

import type { MaterialColorRole } from "../types-and-consts/material-design";
import type { MaterialColorScheme } from "../types-and-consts/material-design";
import {
  ACCENT_PAIRS,
  FIXED_PAIRS,
  SURFACES,
} from "../types-and-consts/material-design";
import { MATERIAL_COLOR_ROLES } from "../types-and-consts/material-design";

const roleStyle = (
  background: MaterialColorRole,
  foreground: MaterialColorRole,
): CSSProperties => {
  return {
    background: `var(${getMaterialRoleVariable(background)})`,
    color: `var(${getMaterialRoleVariable(foreground)})`,
  };
};

const RolePair = ({
  background,
  foreground,
  scheme,
}: {
  background: MaterialColorRole;
  foreground: MaterialColorRole;
  scheme: MaterialColorScheme;
}) => {
  if (scheme[background] === undefined || scheme[foreground] === undefined)
    return null;
  return (
    <div
      className="min-w-0 px-3.5 pt-3.75 pb-3"
      style={roleStyle(background, foreground)}
    >
      <div className="flex flex-wrap justify-between gap-1 text-[10px] leading-normal wrap-anywhere min-[1450px]:text-[11px] [&_>_span]:font-[650] [&_code]:text-[9px] min-[1450px]:[&_code]:text-[10px]">
        <span>{formatMaterialTokenName(background)}</span>
        <code>{formatArgbHex(scheme[background])}</code>
      </div>
      <span
        className="mx-0 my-5.25 block text-[40px] leading-none font-medium tracking-[-2px]"
        aria-hidden="true"
      >
        Aa
      </span>
      <div className="flex flex-wrap justify-between gap-1 text-[9px] wrap-anywhere min-[1450px]:text-[11px] [&_code]:text-[9px] min-[1450px]:[&_code]:text-[10px]">
        <span>{formatMaterialTokenName(foreground)}</span>
        <code>{formatArgbHex(scheme[foreground])}</code>
      </div>
    </div>
  );
};

export const SemanticPreview = ({
  scheme,
}: {
  scheme: MaterialColorScheme;
}) => {
  return (
    <div className="pt-6.75 [&_>_section+section]:mt-10">
      <section aria-labelledby="accent-heading">
        <div className="mb-4.75 flex items-end justify-between gap-5.5 max-[1150px]:block [&_>_p]:max-w-60 [&_>_p]:text-right [&_>_p]:text-[11px] [&_>_p]:leading-[1.6] [&_>_p]:text-(--md-sys-color-on-surface-variant) max-[1150px]:[&_>_p]:mt-2 max-[1150px]:[&_>_p]:max-w-none max-[1150px]:[&_>_p]:text-left [&_h2]:text-[22px] [&_h2]:leading-tight [&_h2]:font-medium [&_h2]:tracking-[-0.6px] [&>div>p:first-child]:mb-1.75 [&>div>p:first-child]:text-[9px] [&>div>p:first-child]:tracking-[1.4px] [&>div>p:first-child]:text-(--md-sys-color-on-surface-variant)">
          <div>
            <p className="text-[10px] font-[650] tracking-[1.8px] uppercase">
              01 / Accent colors
            </p>
            <h2 id="accent-heading">Color with a purpose.</h2>
          </div>
          <p>Backgrounds paired with their Material foregrounds.</p>
        </div>
        <div className="grid grid-cols-4 gap-2.5 max-[1150px]:grid-cols-2 max-[800px]:grid-cols-4 max-[580px]:grid-cols-2">
          {ACCENT_PAIRS.map(([base, onBase, container, onContainer]) => (
            <article
              className="overflow-hidden rounded-xl"
              key={base}
              aria-label={`${base} role pairs`}
            >
              <RolePair background={base} foreground={onBase} scheme={scheme} />
              <RolePair
                background={container}
                foreground={onContainer}
                scheme={scheme}
              />
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="surface-heading">
        <div className="mb-4.75 flex items-end justify-between gap-5.5 max-[1150px]:block [&_>_p]:max-w-60 [&_>_p]:text-right [&_>_p]:text-[11px] [&_>_p]:leading-[1.6] [&_>_p]:text-(--md-sys-color-on-surface-variant) max-[1150px]:[&_>_p]:mt-2 max-[1150px]:[&_>_p]:max-w-none max-[1150px]:[&_>_p]:text-left [&_h2]:text-[22px] [&_h2]:leading-tight [&_h2]:font-medium [&_h2]:tracking-[-0.6px] [&>div>p:first-child]:mb-1.75 [&>div>p:first-child]:text-[9px] [&>div>p:first-child]:tracking-[1.4px] [&>div>p:first-child]:text-(--md-sys-color-on-surface-variant)">
          <div>
            <p className="text-[10px] font-[650] tracking-[1.8px] uppercase">
              02 / Surfaces
            </p>
            <h2 id="surface-heading">A little depth. No overlays.</h2>
          </div>
          <p>Each surface is a resolved color in its own right.</p>
        </div>
        <div className="grid grid-cols-4 overflow-hidden rounded-xl border border-(--md-sys-color-outline-variant) max-[580px]:grid-cols-2">
          {SURFACES.map((role) => (
            <div
              key={role}
              className="flex min-h-30.5 flex-col gap-1.5 p-3.5 max-[580px]:min-h-27 [&_>_span:not(:first-child)]:text-[10px] [&_code]:text-[9px]"
              style={roleStyle(role, "onSurface")}
            >
              <span className="mb-2 text-[20px]" aria-hidden="true">
                ↗
              </span>
              <span>
                {formatMaterialTokenName(role).replace("surface-", "")}
              </span>
              <code>{formatArgbHex(scheme[role])}</code>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-[1.2fr_1fr_1fr] gap-3 max-[1150px]:grid-cols-2 max-[580px]:grid-cols-1 max-[580px]:gap-3.5">
          <article className="rounded-xl bg-(--md-sys-color-surface-container-low) p-5.5 max-[580px]:p-6 [&_h3]:text-[19px] [&_h3]:leading-tight [&_h3]:font-medium [&_h3]:tracking-[-0.5px] [&>p:first-of-type]:mb-2.25 [&>p:first-of-type]:text-[8px] [&>p:first-of-type]:tracking-[1px] [&>p:first-of-type]:text-(--md-sys-color-on-surface-variant)">
            <div
              className="mb-5 grid h-9.5 w-9.5 place-items-center rounded-xl bg-(--md-sys-color-tertiary-container) text-[24px] text-(--md-sys-color-on-tertiary-container)"
              aria-hidden="true"
            >
              ✳
            </div>
            <p className="text-[10px] font-[650] tracking-[1.8px] uppercase">
              A theme in use
            </p>
            <h3>Room for a new idea.</h3>
            <p className="mt-3 text-[11px] leading-[1.7] text-(--md-sys-color-on-surface-variant)">
              Supporting text uses on-surface-variant. Containers give the
              content its own space.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center justify-center gap-3 rounded-3xl bg-(--md-sys-color-primary) px-3.5 py-2.5 text-[10px] font-semibold text-(--md-sys-color-on-primary)">
                Create something <span aria-hidden="true">↗</span>
              </span>
              <span className="inline-flex items-center justify-center gap-3 rounded-3xl border border-(--md-sys-color-outline) px-3.5 py-2.5 text-[10px] font-semibold text-(--md-sys-color-primary)">
                Keep exploring
              </span>
            </div>
            <p className="mt-4.5 text-[9px] text-(--md-sys-color-on-surface-variant)">
              Component styling preview
            </p>
          </article>
          <article className="rounded-xl border border-(--md-sys-color-outline-variant) p-1.25 max-[580px]:[&_>div:first-child]:p-5">
            <RolePair
              background="surface"
              foreground="onSurface"
              scheme={scheme}
            />
            <div className="mx-2.25 mt-0 mb-3.5 flex flex-wrap justify-between gap-1.25 text-[10px] text-(--md-sys-color-on-surface-variant) [&_code]:text-[9px]">
              on-surface-variant{" "}
              <code>{formatArgbHex(scheme.onSurfaceVariant)}</code>
            </div>
            <div className="mx-2.25 mt-0 mb-2.25 flex flex-col gap-2 [&_>_div]:flex [&_>_div]:flex-wrap [&_>_div]:justify-between [&_>_div]:gap-1 [&_>_div]:rounded-[5px] [&_>_div]:border [&_>_div]:border-(--md-sys-color-outline) [&_>_div]:px-2 [&_>_div]:py-3 [&_>_div]:text-[10px] [&_>_div+div]:border-(--md-sys-color-outline-variant) [&_code]:text-[9px]">
              <div>
                outline <code>{formatArgbHex(scheme.outline)}</code>
              </div>
              <div>
                outline-variant{" "}
                <code>{formatArgbHex(scheme.outlineVariant)}</code>
              </div>
            </div>
          </article>
          <article
            className="flex flex-col items-start gap-4 rounded-xl px-4.5 py-5.75 max-[1150px]:col-span-full max-[580px]:p-6.25 [&_code]:text-[9px] [&_h3]:mt-3.75 [&_h3]:text-[19px] [&_h3]:leading-tight [&_h3]:font-medium [&_h3]:tracking-[-0.5px] max-[1150px]:[&_h3]:mt-0 [&_p]:text-[10px] [&>span:first-child]:text-[8px] [&>span:first-child]:tracking-[1px]"
            style={roleStyle("inverseSurface", "inverseOnSurface")}
          >
            <span className="text-[10px] font-[650] tracking-[1.8px] uppercase">
              A different perspective
            </span>
            <h3>Inverse surface</h3>
            <p>inverse-on-surface</p>
            <code>
              {formatArgbHex(scheme.inverseSurface)} /{" "}
              {formatArgbHex(scheme.inverseOnSurface)}
            </code>
            <span className="mt-auto pt-3.75 text-[11px] text-(--md-sys-color-inverse-primary)">
              inverse-primary <span aria-hidden="true">↗</span>
            </span>
          </article>
        </div>
      </section>

      <section aria-labelledby="fixed-heading">
        <div className="mb-4.75 flex items-end justify-between gap-5.5 max-[1150px]:block [&_>_p]:max-w-60 [&_>_p]:text-right [&_>_p]:text-[11px] [&_>_p]:leading-[1.6] [&_>_p]:text-(--md-sys-color-on-surface-variant) max-[1150px]:[&_>_p]:mt-2 max-[1150px]:[&_>_p]:max-w-none max-[1150px]:[&_>_p]:text-left [&_h2]:text-[22px] [&_h2]:leading-tight [&_h2]:font-medium [&_h2]:tracking-[-0.6px] [&>div>p:first-child]:mb-1.75 [&>div>p:first-child]:text-[9px] [&>div>p:first-child]:tracking-[1.4px] [&>div>p:first-child]:text-(--md-sys-color-on-surface-variant)">
          <div>
            <p className="text-[10px] font-[650] tracking-[1.8px] uppercase">
              03 / Fixed colors
            </p>
            <h2 id="fixed-heading">The fixed families.</h2>
          </div>
          <p>Fixed and fixed-dim, resolved by Material.</p>
        </div>
        <div className="grid grid-cols-3 gap-2.5 max-[580px]:grid-cols-1 max-[580px]:[&_article]:grid max-[580px]:[&_article]:grid-cols-2 [&_article>div>span]:mx-0 [&_article>div>span]:my-3.75 [&_article>div>span]:text-[28px]">
          {FIXED_PAIRS.map(([base, onBase, dim, onDim]) => (
            <article className="overflow-hidden rounded-xl" key={base}>
              <RolePair background={base} foreground={onBase} scheme={scheme} />
              <RolePair background={dim} foreground={onDim} scheme={scheme} />
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="inventory-heading">
        <div className="mb-4.75 flex items-end justify-between gap-5.5 max-[1150px]:block [&_>_p]:max-w-60 [&_>_p]:text-right [&_>_p]:text-[11px] [&_>_p]:leading-[1.6] [&_>_p]:text-(--md-sys-color-on-surface-variant) max-[1150px]:[&_>_p]:mt-2 max-[1150px]:[&_>_p]:max-w-none max-[1150px]:[&_>_p]:text-left [&_h2]:text-[22px] [&_h2]:leading-tight [&_h2]:font-medium [&_h2]:tracking-[-0.6px] [&>div>p:first-child]:mb-1.75 [&>div>p:first-child]:text-[9px] [&>div>p:first-child]:tracking-[1.4px] [&>div>p:first-child]:text-(--md-sys-color-on-surface-variant)">
          <div>
            <p className="text-[10px] font-[650] tracking-[1.8px] uppercase">
              04 / Token reference
            </p>
            <h2 id="inventory-heading">Every supported role.</h2>
          </div>
          <p>Including dim colors and compatibility roles.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-6.25 gap-y-0 max-[580px]:grid-cols-1">
          {MATERIAL_COLOR_ROLES.map((role) => {
            const color = scheme[role];
            if (color === undefined) return null;
            return (
              <div
                className="flex min-w-0 items-center gap-2.25 border-b border-b-(--md-sys-color-outline-variant) px-0 py-3 text-[10px] max-[580px]:text-[11px] [&_>_span:nth-child(2)]:wrap-anywhere [&_code]:ml-auto [&_code]:text-[10px]"
                key={role}
              >
                <span
                  className="inline-block h-4.5 w-4.5 shrink-0 rounded-[5px] border border-(--md-sys-color-outline-variant)"
                  style={{
                    background: `var(${getMaterialRoleVariable(role)})`,
                  }}
                />
                <span>{formatMaterialTokenName(role)}</span>
                <code>{formatArgbHex(color)}</code>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
