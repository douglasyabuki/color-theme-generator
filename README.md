# Chroma — Material color studio

Material 3 color themes generated with Material Color Utilities.

A React 19 / TypeScript / Vite / Tailwind app for exploring a single source color as light and dark Material schemes. Inspect semantic role pairs, mode-specific HCT reference palettes, and copy or download CSS and JSON. A separate shadcn adapter derives standard semantic color tokens from the same resolved Material theme.

## Run

```sh
npm install
npm run dev
npm run build
npm run lint
```

On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`. If the default npm cache is not writable, append `--cache node_modules/.cache/npm` to the installation command.

## Generation defaults

| Setting       | Value                                                    |
| ------------- | -------------------------------------------------------- |
| Color engine  | @material/material-color-utilities, pinned to **0.4.0**  |
| Source        | #6750A4                                                  |
| Variant       | Tonal Spot (tonal-spot)                                  |
| Specification | Explicitly 2025                                          |
| Platform      | Explicitly phone                                         |
| Contrast      | 0 by default; continuous range -1 to 1                   |
| Output        | Hex CSS; unsigned opaque ARGB integers in the JSON model |

The UI contrast slider uses increments of 0.05; the engine accepts any finite number in the supported range. Material recomputes roles and their relationships. Contrast is not a uniform adjustment to lightness, and individual roles need not change at every slider step.

Enter three- or six-digit opaque hex, with or without #. Input is normalized to uppercase six-digit hex. Invalid or incomplete input keeps the last valid theme visible and shows an inline explanation. Reset restores the default source, contrast, and light preview.

Tonal Spot derives coordinated palettes from the source. The source is not an instruction to use that exact hex as the primary role. Neutral sources can still produce colored palettes; this is upstream Tonal Spot behavior.

## Architecture and API

```text
source hex → Material HCT → independent light/dark DynamicSchemes
                         → MaterialDynamicColors role resolution
                         → serializable MaterialColorTheme
                           ├─ DOM adapter / semantic previews
                           ├─ semantic CSS / reference CSS
                           ├─ JSON
                           └─ shadcn adapter → preview / token audit / exports
```

- **src/utils/**: Material theme generation, DOM application, CSS declarations and serializers, plus the shadcn adapter and its token utilities. Files use domain names such as `material-theme.ts` and `shadcn-chart-colors.ts`.
- **src/lib/**: small adapters around external color libraries, including ARGB-to-hex and the Culori-specific ARGB-to-OKLCH formatter.
- **src/types-and-consts/**: shared theme types and behavior-defining constants, including the Material role manifest and resolvers.
- **src/lib/utils.ts**: the shared `cn` class-name utility used by the shadcn components and configured through `components.json`.
- **src/components/**: semantic role preview, palette inspector, and export UI.

```ts
import { createMaterialTheme } from "./src/utils/material-theme";
import { applyMaterialScheme } from "./src/utils/material-dom";

const theme = createMaterialTheme({
  sourceColor: "#6750A4",
  variant: "tonal-spot",
  contrastLevel: 0,
});

applyMaterialScheme(document.documentElement, theme.light);
```

**createMaterialTheme** requires those three options. Invalid hex or an unsupported variant throws TypeError; non-finite or out-of-range contrast throws RangeError. DEFAULT_THEME_OPTIONS supplies the documented defaults. A typed factory holds supported variants; currently only Tonal Spot is exposed.

The model contains:

```text
metadata: sourceColor, variant, contrastLevel, packageVersion, specVersion, platform
light: resolved semantic role → ARGB
dark: resolved semantic role → ARGB
palettes.light: palette name → { keyColor, tones }
palettes.dark: palette name → { keyColor, tones }
```

Each mode preserves its own primary, secondary, tertiary, neutral, neutral-variant, and error palettes, even where values match. Samples use Material TonalPalette.tone() at 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, and 100. All six palette key colors are preserved separately from semantic roles.

Generation uses Material public APIs, without copied algorithms, OKLCH ramps, fixed tone-role tables, or custom foreground selection. The stable MATERIAL_COLOR_ROLES manifest and typed resolver object explicitly define the supported contract; there is no library introspection.

## Supported semantic roles

53 explicitly supported roles are available with the current configuration. A resolver that returns undefined is simply omitted from the scheme, previews, and exports; no placeholder color is created.

| Family              | Roles                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Primary             | primary, primaryDim, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary                                                             |
| Primary fixed       | primaryFixed, primaryFixedDim, onPrimaryFixed, onPrimaryFixedVariant                                                                             |
| Secondary           | secondary, secondaryDim, onSecondary, secondaryContainer, onSecondaryContainer                                                                   |
| Secondary fixed     | secondaryFixed, secondaryFixedDim, onSecondaryFixed, onSecondaryFixedVariant                                                                     |
| Tertiary            | tertiary, tertiaryDim, onTertiary, tertiaryContainer, onTertiaryContainer                                                                        |
| Tertiary fixed      | tertiaryFixed, tertiaryFixedDim, onTertiaryFixed, onTertiaryFixedVariant                                                                         |
| Error               | error, errorDim, onError, errorContainer, onErrorContainer                                                                                       |
| Surfaces            | surface, surfaceDim, surfaceBright, surfaceContainerLowest, surfaceContainerLow, surfaceContainer, surfaceContainerHigh, surfaceContainerHighest |
| Surface foregrounds | onSurface, onSurfaceVariant                                                                                                                      |
| Outlines            | outline, outlineVariant                                                                                                                          |
| Inverse             | inverseSurface, inverseOnSurface                                                                                                                 |
| Effects             | shadow, scrim, surfaceTint                                                                                                                       |
| Compatibility       | background, onBackground, surfaceVariant                                                                                                         |

Compatibility roles remain exported and visible in the complete token reference. New preview components favor surface, onSurface, and surface containers. Dim roles are resolved from the package, not guessed from other roles; availability is version-dependent if the engine is extended later.

**Fixed role behavior:** the published 2025 engine may generate different palettes for each mode. Its primary fixed colors can therefore differ across modes, and can also respond to contrast. For the default source at contrast 0, upstream resolves primaryFixed to #D4C3FD in light and #DED0FE in dark. This app preserves those exact upstream results rather than forcing equality or imposing older static tone rules.

## Exports

All targets include both modes, independent of the active preview mode:

| Target        | File                  | Contents                                                                                        |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| Semantic CSS  | material-theme.css    | `--md-sys-color-*` variables                                                                    |
| Reference CSS | material-palettes.css | Mode-specific `--md-ref-palette-<palette>-<tone>` variables                                     |
| Theme JSON    | material-theme.json   | Metadata, both semantic schemes, separate light/dark palettes and key colors, in canonical ARGB |

CSS uses light values under :root and dark values under [data-mode="dark"]. Apply the dark attribute to the root element for an entire dark-themed page. No short-name aliases or legacy CSS contracts are provided.

Example excerpt generated with the defaults:

```css
:root {
  --md-sys-color-primary: #655789;
  --md-sys-color-on-primary: #fdf7ff;
  --md-sys-color-primary-container: #d4c3fd;
  --md-sys-color-on-primary-container: #493c6c;
  --md-sys-color-surface: #fdf7fe;
  --md-sys-color-on-surface: #34313a;
  --md-sys-color-on-surface-variant: #615d68;
}

[data-mode="dark"] {
  --md-sys-color-primary: #cdc0ec;
  --md-sys-color-on-primary: #443a5f;
  --md-sys-color-primary-container: #574d72;
  --md-sys-color-on-primary-container: #e9deff;
  --md-sys-color-surface: #0f0d12;
  --md-sys-color-on-surface: #eae3ef;
  --md-sys-color-on-surface-variant: #aea9b4;
}

.action {
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}
```

Copy requires the browser clipboard API, normally available on HTTPS and localhost. If copying fails, the app keeps selectable code visible and offers a file download.

## Boundaries and upstream behavior

- This is a Material **color** system, not a complete implementation of typography, shape, motion, elevation, or component tokens.
- The published 0.4.0 package exposes the 2021 and 2025 specifications. This app explicitly uses 2025, not its older default and not the 2026 implementation on the upstream main branch. See [Material Color Utilities](https://github.com/material-foundation/material-color-utilities) and the [published specification types](https://unpkg.com/@material/material-color-utilities@0.4.0/dynamiccolor/color_spec.d.ts).
- There are no intentional color-algorithm deviations from the selected upstream configuration. Differences from older fixed-role/static tone expectations are kept, not corrected locally.
- The package is consumed through Vite's bundler. Its published extensionless internal imports require bundling for Node/SSR consumers as well.
- Independent palette overrides, custom colors, multiple source colors, other variants, and persistence are deferred. The shadcn adapter consumes the normalized theme without changing Material semantics; Material exports retain their existing hex/ARGB formats.

## shadcn color themes

Choose **Material | shadcn** above the workspace. Material is the default; each target remembers its selected view for the session. shadcn offers **Preview**, **Tokens**, and **Export**. Source and contrast controls drive the same memoized Material theme. Appearance selects a resolved scheme for display only; neither switching target nor switching appearance changes exported data. Invalid source input keeps the last valid theme; reset still restores the default source, contrast, and light appearance without changing the selected target/view. Tonal Spot remains the supported Material variant.

### Adapter and token contract

`src/utils/shadcn-theme.ts` exposes `createShadcnTheme(materialTheme): ShadcnTheme`. This pure adapter has no React or DOM dependency. It reads each mode's resolved roles and reference palettes directly, retaining canonical unsigned ARGB colors. Metadata records `sourceColor`, `materialVariant`, `contrastLevel`, and `adapter: "shadcn"`.

`SHADCN_TOKEN_MANIFEST` is Chroma's canonical shadcn color API, based on the [main shadcn theming contract](https://ui.shadcn.com/docs/theming). Token types, ordering, groups, source-role mapping, generation, audit, and serializers all follow the manifest. Its token count is not a separate public contract. The current Base UI destructive variant uses `text-destructive` over a translucent destructive background; it does not require `destructive-foreground`.

| shadcn token | Material source role |
| --- | --- |
| `background` | `surface` |
| `foreground` | `onSurface` |
| `card` | `surfaceContainerLow` |
| `card-foreground` | `onSurface` |
| `popover` | `surfaceContainer` |
| `popover-foreground` | `onSurface` |
| `primary` | `primary` |
| `primary-foreground` | `onPrimary` |
| `secondary` | `secondaryContainer` |
| `secondary-foreground` | `onSecondaryContainer` |
| `muted` | `surfaceContainer` |
| `muted-foreground` | `onSurfaceVariant` |
| `accent` | `surfaceContainerHigh` |
| `accent-foreground` | `onSurface` |
| `destructive` | `error` |
| `border` | `outlineVariant` |
| `input` | `outline` |
| `ring` | `primary` |
| `sidebar` | `surfaceContainerLow` |
| `sidebar-foreground` | `onSurface` |
| `sidebar-primary` | `primary` |
| `sidebar-primary-foreground` | `onPrimary` |
| `sidebar-accent` | `surfaceContainerHigh` |
| `sidebar-accent-foreground` | `onSurface` |
| `sidebar-border` | `outlineVariant` |
| `sidebar-ring` | `primary` |

### Chart colors

Charts are derived in `src/utils/shadcn-chart-colors.ts` from resolved Material roles and each mode's reference palettes. This mapping does not generate separate palettes:

| Token | Light | Dark |
| --- | --- | --- |
| chart-1 | resolved primary | resolved primary |
| chart-2 | resolved tertiary | resolved tertiary |
| chart-3 | resolved secondary | resolved secondary |
| chart-4 | primary palette tone 60 | primary palette tone 50 |
| chart-5 | tertiary palette tone 60 | tertiary palette tone 50 |

Each lookup uses its mode's own reference palette. The initial dark tone 70 was too close to resolved primary/tertiary colors at reduced contrast, so both extra dark colors were changed globally to tone 50 after swatch review. There are no source-color-specific rules. The palette remains deliberately related; primary and secondary can look similar, especially at extreme contrast. It is not a guarantee of categorical or color-vision-deficiency separation. Use labels or other visual cues in charts.

### OKLCH output

`formatArgbOklch` is the single presentation conversion path: ARGB channel extraction ? normalized sRGB ? Culori OKLCH. No OKLCH value feeds back into generation. Lightness/chroma use four decimals and hue uses three, with trailing zeros removed, negative zero normalized, and achromatic hue set to zero. Preview variables, audit values, and serializers use this same formatter.

### Preview behavior

The project's shadcn Base UI components provide buttons, cards, fields, badges, menus, tabs, toggles, and an embedded sidebar. They use normal semantic utilities such as `bg-primary`, `bg-card`, `text-muted-foreground`, `border-border`, and `ring-ring`, with standard component variants.

Local component presentation is a neutral Chroma style. Colors use standard shadcn theme tokens; preview styling is illustrative. The existing `base-vega` CLI setting describes component scaffolding, not the generated color theme or the locally customized preview style. No named preset is applied, and `ShadcnTheme` has no preset dependency. Optional preview styles may be added later without changing the adapter or exports.

`applyShadcnScheme(element, scheme)` applies generated variables only to the shadcn workspace, with a local `.dark` class. The dropdown accepts `portalContainer`; every portalled component used by the preview mounts inside the workspace's portal host. The sidebar is embedded and non-collapsing, so it opens no mobile sheet or tooltip portal and registers no global shortcut. Material component CSS is scoped positively under `[data-material-workspace]`, covering the shared Material controls and Material content, with the shadcn workspace outside those selectors.

The token audit groups Base, Surfaces, Actions, Muted / Accent, Borders / Focus, Charts, and Sidebar. Each entry shows its name, swatch, OKLCH value, and Material source role or mode-specific chart derivation.

### Color exports

| File | Contents |
| --- | --- |
| `shadcn-theme.css` | Variables only: light under `:root`, dark under `.dark` |
| `shadcn-tailwind-theme.css` | Tailwind v4 `@theme inline` color mappings plus generated variables |
| `shadcn-theme.json` | Native `registry:theme` item with `cssVars.light` and `cssVars.dark` |

Every export includes both modes in deterministic manifest order, independently of the selected preview mode. Registry names are `chroma-<source-hex>`, with lowercase hex and no `#`. Copy and download are available for every format; unavailable clipboard access leaves selectable code and file downloads available.

Paste the variables into an existing shadcn stylesheet, replacing its color variables. Use the Tailwind export when adding the color mappings as well. These are color definitions, not a replacement application stylesheet: preserve your fonts, radius, imports, animations, base styles, and other configuration. Existing projects should already configure a `.dark` Tailwind variant.

```css
/* Example excerpt; copy the complete generated output from Chroma. */
:root {
  --primary: oklch(0.4915 0.0798 296.213);
  --primary-foreground: oklch(0.983 0.0123 317.743);
}
.dark {
  --primary: oklch(0.8328 0.0623 298.56);
  --primary-foreground: oklch(0.3757 0.0631 295.638);
}
```

```tsx
// Components consume the generated colors through their existing variants.
<Button>Create project</Button>
<Button variant="secondary">Save draft</Button>
```

Use `.dark` on your application's root for dark mode. The JSON output follows the [native registry theme format](https://ui.shadcn.com/docs/registry/examples#registrytheme). For a downloaded item, validate without installing a test framework:

```js
import { readFileSync } from "node:fs";
import { registryItemSchema } from "shadcn/schema";

const item = JSON.parse(readFileSync("shadcn-theme.json", "utf8"));
const result = registryItemSchema.safeParse(item);
console.log(result.success ? "Valid registry theme" : result.error);
```

## Manual verification

No automated test suite or test framework is included.

- Check all eight source presets at contrast 0 in light and dark modes.
- Check Material purple, gray, near-white, and near-black at contrasts -1, 0.5, and 1 in both modes.
- Inspect token completeness and provenance, chart separation, action variants, surfaces, input borders, focus rings, sidebar states, and agreement between preview/audit/export values.
- Check local menu portal inheritance in both modes, arrow-key navigation, Escape and focus restoration, narrow layouts, copy/download, clipboard fallback, invalid input retention, and reset.
- Confirm target switches leave Material values unchanged and appearance changes leave every export unchanged.
- Validate a representative item using `registryItemSchema.safeParse()` from `shadcn/schema`, then run `npm run build` and `npm run lint`.

Implementation verification: the generated color matrix was inspected for the configurations above; adapter completeness, deterministic output, unchanged Material input, formatting, and registry/CSS agreement were checked through one-off local inspection. Representative registry validation, `npm run build`, and `npm run lint` passed. Chart swatches were rendered and visually reviewed in both modes. Live browser interaction and responsive-layout checks remain unverified because no browser surface was available to the implementation environment.
