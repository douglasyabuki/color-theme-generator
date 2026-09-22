# Chroma — Material color studio

Material 3 color themes generated with Material Color Utilities.

A React 19 / TypeScript / Vite / Tailwind app for exploring a single source color as light and dark Material schemes. Inspect semantic role pairs, mode-specific HCT reference palettes, and copy or download CSS and JSON.

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
                           └─ JSON / future independent adapters
```

- **src/material/**: pure generation, explicit role manifest/resolvers, types, and hex formatting. No DOM access.
- **src/theme/**: applies an already resolved scheme to an element.
- **src/export/**: serializes the model directly. The same semantic declaration formatter serves CSS exports and the DOM adapter.
- **src/components/**: semantic role preview, palette inspector, and export UI.

```ts
import { createMaterialTheme } from "./src/material/create-material-theme";
import { applyMaterialScheme } from "./src/theme/apply-theme-to-dom";

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
- Independent palette overrides, custom colors, multiple source colors, other variants, RGB/OKLCH formatting, persistence, and shadcn mapping are deferred. A future shadcn adapter should consume the normalized theme without changing Material semantics.
- legacy/ is historical reference only. The active app neither imports it nor migrates its storage or CSS contracts.

## Manual verification

No automated tests or test framework are included.

Use the eight source presets (purple, blue, red, yellow, green, gray, near-black, near-white) in both modes at contrasts -1, 0, 0.5, and 1. Inspect foreground/background pairs, fixed families, surface hierarchy, and per-mode palettes. Also inspect narrow layouts, keyboard access, invalid input retention, reset, all export formats, clipboard behavior, and downloads. Exports should remain unchanged when only preview mode changes.

Implementation verification: installation, production build, and lint passed. Runtime generation was exercised for all eight sources, both modes, and all four contrast values; representative role values and the default CSS/JSON output were inspected. Browser visual/interaction checks remain unverified because no browser or app surface was connected in the implementation environment.
