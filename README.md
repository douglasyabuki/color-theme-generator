# Chroma

**Generate a semantic color theme from one source color.**

Chroma uses Google Material Color Utilities and HCT to generate coordinated light and dark color systems. You can inspect the resulting semantic roles and palettes, then export them for Material or adapt the same theme to shadcn.

[Open Chroma](https://douglasyabuki-chroma.vercel.app/)

## What Chroma does

Choose a source color and Chroma generates a complete light and dark color system around it.

Instead of producing only a palette of swatches, Chroma generates colors with semantic purposes:

- primary actions
- containers and surfaces
- foreground text
- borders and outlines
- error states
- elevated surfaces
- inverse colors
- light and dark modes

The generated theme can then be used through different output targets.

### Material

Explore the theme as a Material 3 color system.

Chroma exposes:

- semantic Material color roles
- light and dark schemes
- HCT reference palettes
- contrast adjustment
- CSS system tokens
- reference palette tokens
- structured JSON

### shadcn

The same generated Material theme can be adapted to shadcn's semantic color model.

Chroma maps Material roles to tokens such as:

```css
--background
--foreground

--primary
--primary-foreground

--secondary
--secondary-foreground

--muted
--muted-foreground

--accent
--accent-foreground

--card
--popover

--border
--input
--ring

--sidebar
--chart-1
```

The shadcn workspace includes a live preview, token inspection, and exports ready to integrate into a shadcn project.

## Why Material Color Utilities?

Chroma uses Material Color Utilities as its color-generation engine.

The flow is:

```text
Source color
    ↓
HCT
    ↓
Material dynamic color scheme
    ↓
Semantic light and dark themes
    ↓
┌──────────────────┬──────────────────┐
│ Material output  │ shadcn adapter   │
└──────────────────┴──────────────────┘
```

HCT provides the color model used by Material's dynamic color system. Material Color Utilities then resolves the source color into coordinated palettes and semantic roles while accounting for appearance mode and contrast.

Chroma does not generate a custom approximation of Material colors.

## Material configuration

Chroma currently uses:

| Setting          | Value                                |
| ---------------- | ------------------------------------ |
| Engine           | `@material/material-color-utilities` |
| Version          | `0.4.0`                              |
| Specification    | Material 2025                        |
| Variant          | Tonal Spot                           |
| Platform         | Phone                                |
| Default contrast | `0`                                  |
| Contrast range   | `-1` to `1`                          |
| Default source   | `#6750A4`                            |

Tonal Spot uses the source color as input for a coordinated color system. The source color is not necessarily used directly as the final `primary` color.

This is especially noticeable with neutral source colors. Gray, near-black, and near-white inputs can produce similar themes because their HCT chroma is very low.

## Exports

### Material

#### `material-theme.css`

Semantic Material system colors:

```css
:root {
  --md-sys-color-primary: ...;
  --md-sys-color-on-primary: ...;
  --md-sys-color-surface: ...;
  --md-sys-color-on-surface: ...;
}

[data-mode="dark"] {
  --md-sys-color-primary: ...;
  --md-sys-color-on-primary: ...;
}
```

#### `material-palettes.css`

Reference palette samples:

```css
--md-ref-palette-primary-40: ...;
--md-ref-palette-primary-50: ...;
--md-ref-palette-primary-60: ...;
```

Light and dark palettes are exported separately because Material's generated palettes can differ between modes.

#### `material-theme.json`

Contains:

- theme metadata
- semantic light scheme
- semantic dark scheme
- reference palettes
- palette key colors

Colors remain canonical Material ARGB values in the theme model.

### shadcn

#### `shadcn-theme.css`

Generated shadcn color variables:

```css
:root {
  --background: ...;
  --foreground: ...;
  --primary: ...;
  --primary-foreground: ...;
}

.dark {
  --background: ...;
  --foreground: ...;
  --primary: ...;
  --primary-foreground: ...;
}
```

#### `shadcn-tailwind-theme.css`

Includes the generated variables plus Tailwind v4 `@theme inline` mappings.

#### `shadcn-theme.json`

Exports a native shadcn `registry:theme` item with separate light and dark values.

shadcn colors are formatted as OKLCH.

Typography, radius, spacing, animations, and other project settings remain owned by the consuming application.

## Material → shadcn

shadcn has a smaller semantic color system than Material.

Chroma therefore uses an adapter rather than generating an unrelated second theme.

Some examples:

| shadcn                 | Material               |
| ---------------------- | ---------------------- |
| `background`           | `surface`              |
| `foreground`           | `onSurface`            |
| `card`                 | `surfaceContainerLow`  |
| `primary`              | `primary`              |
| `primary-foreground`   | `onPrimary`            |
| `secondary`            | `secondaryContainer`   |
| `secondary-foreground` | `onSecondaryContainer` |
| `muted`                | `surfaceContainer`     |
| `muted-foreground`     | `onSurfaceVariant`     |
| `accent`               | `surfaceContainerHigh` |
| `border`               | `outlineVariant`       |
| `input`                | `outline`              |
| `ring`                 | `primary`              |

Chart colors are derived separately from the generated Material roles and reference palettes because Material does not define a five-color categorical chart palette equivalent to shadcn's `chart-1` through `chart-5`.

## Architecture

The Material theme is the source of truth.

```text
Source color
      │
      ▼
Material Color Utilities
      │
      ▼
MaterialColorTheme
      │
      ├── Material preview
      ├── Material CSS
      ├── Material palettes
      ├── Material JSON
      │
      └── shadcn adapter
              │
              ▼
          ShadcnTheme
              │
              ├── Preview
              ├── Token audit
              ├── CSS
              └── registry:theme
```

Theme generation is independent from React and DOM state.

Preview mode only determines which resolved theme is displayed. It does not change exported light or dark values.

## Run locally

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Material Color Utilities
- Culori
- Base UI
- shadcn

## Project structure

```text
src/
├── components/          UI and theme previews
├── components/ui/       shared UI components
├── lib/                 formatting and utility adapters
├── types-and-consts/    theme types and token manifests
└── utils/               theme engines, adapters and serializers
```

The important separation is:

```text
Material generation
        ↓
normalized Material theme
        ↓
target adapters
        ↓
target-specific exports
```

This allows other token systems to be supported later without changing the Material color engine.

## Scope

Chroma is currently focused on **color**.

It generates and adapts semantic color themes. It does not generate a complete design system.

Typography, spacing, shape, motion, component layout, and other design decisions remain outside the color engine.

## Direction

The next useful additions are:

- shareable themes through URL parameters
- additional Material scheme variants
- contrast/accessibility inspection
- improved source-color presets
- richer real-world theme previews

The goal remains simple:

> Pick a color, get a coherent light and dark theme, understand the resulting tokens, and export them for the UI system you use.
