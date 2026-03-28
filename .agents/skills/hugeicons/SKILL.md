---
name: hugeicons
description: Use Hugeicons in React. Use this skill when importing and rendering Hugeicons.
---

Use `@hugeicons/react` to render icons and `@hugeicons/core-free-icons` to import them.

## Usage

```tsx
import { Settings02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
;<HugeiconsIcon icon={Settings02Icon} className="size-4" />
```

## Required props

- `icon` - The icon component imported from `@hugeicons/core-free-icons`.

## Patterns

Size with Tailwind classes:

```tsx
<HugeiconsIcon icon={Settings02Icon} className="size-4" />
<HugeiconsIcon icon={CpuIcon} className="size-[1em]" strokeWidth={1} />
```

Use a spinner icon for loading:

```tsx
<HugeiconsIcon icon={Loading03Icon} className="size-7 animate-spin" />
```

For icon-only buttons, label the button:

```tsx
<button type="button" aria-label="Close">
  <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
</button>
```
