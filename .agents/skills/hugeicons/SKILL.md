---
name: hugeicons
description: Use Hugeicons correctly in React apps. Use this skill when adding or updating icons so imports, sizing, accessibility, and state handling match the project's Hugeicons setup.
---

## Overview

This project uses Hugeicons through:

- `@hugeicons/react` for the `HugeiconsIcon` renderer
- `@hugeicons/core-free-icons` for the free icon set

The free package provides the Stroke Rounded style. Do not use deprecated Hugeicons packages, and do not introduce `lucide-icons` when Hugeicons should be used instead.

## Standard Usage

Import the renderer and only the icons you need:

```tsx
import { Settings02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

;<HugeiconsIcon icon={Settings02Icon} className="size-4" />
```

This is the default pattern already used across the app.

## Common Props

`HugeiconsIcon` accepts normal SVG props plus these common Hugeicons props:

- `icon`: required icon object from an icon package
- `size`: numeric or string size, default `24`
- `color`: defaults to `currentColor`
- `strokeWidth`: override line weight when needed
- `absoluteStrokeWidth`: keeps stroke visually consistent when scaling by `size`
- `altIcon`: alternate icon for another state
- `showAlt`: toggles `altIcon`
- `primaryColor` and `secondaryColor`: optional explicit colors
- `disableSecondaryOpacity`: disables built-in secondary opacity handling

In this codebase, `className` sizing is the usual default and `strokeWidth` is only added when a design needs a lighter or heavier mark.

## Project Conventions

- Import icons directly from `@hugeicons/core-free-icons`; avoid wildcard imports so tree-shaking keeps bundles smaller.
- Use `HugeiconsIcon` inline in JSX instead of wrapping it unless the repo already has a shared wrapper.
- Prefer `className` utilities like `size-4`, `size-5`, or `size-[1em]` so icons inherit layout naturally.
- Prefer inherited color via `currentColor` and parent text classes. Use explicit icon color only when the icon must differ from nearby text.
- Keep icon names explicit and readable, for example `Delete02Icon`, `Settings02Icon`, `Loading03Icon`.
- Use Hugeicons for loading visuals too. Prefer a spinner icon such as `Loading03Icon` with `animate-spin` instead of `...` text.

## Accessibility

Decorative icons can live beside visible text:

```tsx
<Button>
  <HugeiconsIcon icon={PlusSignIcon} className="size-4" />
  Add Profile
</Button>
```

Icon-only controls need an accessible label on the interactive element:

```tsx
<button type="button" aria-label="Delete profile">
  <HugeiconsIcon icon={Delete02Icon} className="size-4" />
</button>
```

Do not rely on icon shape alone for critical meaning when text, tooltip, or label can clarify the action.

## State Patterns

When the icon itself changes with state, prefer `altIcon` and `showAlt` over duplicating two separate `HugeiconsIcon` elements.

```tsx
<HugeiconsIcon
  icon={SquareIcon}
  altIcon={RemoveSquareIcon}
  showAlt={isMaximized}
  className="size-4"
/>
```

This keeps sizing and styling consistent across both states.

## Examples From This Project

Text-sized icon inside a larger visual block:

```tsx
<HugeiconsIcon icon={CpuIcon} className="size-[1em]" strokeWidth={1} />
```

Simple inline label icon:

```tsx
<HugeiconsIcon icon={Settings02Icon} className="size-4" />
```

Loading spinner:

```tsx
<HugeiconsIcon icon={Loading03Icon} className="size-7 shrink-0 animate-spin" />
```

## Selection Guidance

- Pick icons that match the action literally before choosing something decorative.
- Reuse icon choices already present in the codebase when the action is the same.
- Keep a consistent optical size in a section; adjust `strokeWidth` only when an icon feels too heavy or too faint next to nearby elements.
- If you need to browse icons, search Hugeicons docs first, then import the exact icon by name from `@hugeicons/core-free-icons`.
