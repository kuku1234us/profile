## Introduction

This document is a step-by-step guide for building the “Dashboard UI entrance animation” used in the Pumpkin landing page hero. The effect we want is the same *kind* of effect you noticed on Linear’s homepage: a 3D-tilted dashboard “stage” with UI elements that appear once on page load, moving into place with staggered timing, subtle blur/fade, and a polished “assembled” feeling.

This guide is written to train junior developers. That means we will not just list steps—we will explain *why* each step exists, what it controls on screen, and how to debug the most common failure modes (for example: “why is everything blurry?”, “why does the animation not trigger?”, and “why does it stutter on low-end devices?”).

---

## What we are building (the target effect)

When the Pumpkin landing page loads:

1. A “dashboard” (the big hero visual) is already present in the layout, but starts in an **initial hidden state** (slightly offset, slightly blurred, lower opacity).
2. Several UI sub-elements (cards, list rows, badges, avatars, chips, etc.) animate **into their final positions**, not all at once, but in a **staggered** sequence.
3. The animation plays **once** per page load (we do not need it to loop).
4. After the entrance is complete, the dashboard can optionally respond to pointer movement with a subtle **3D tilt/parallax** (this is separate from the entrance).

Visually, think of the hero like a theatre stage:

```text
  [Viewport]
    |
    |  perspective + camera
    v
  +--------------------------------------------------+
  | Scene (perspective)                              |
  |  +--------------------------------------------+  |
  |  | Dashboard Plane (tilted 3D surface)        |  |
  |  |  - Base UI layer (background)              |  |
  |  |  - Floating elements (translateZ)          |  |
  |  |  - Entrance animation states               |  |
  |  +--------------------------------------------+  |
  +--------------------------------------------------+
```

---

## The core technique (high level)

The effect is a **hybrid of layout + 3D styling + animation orchestration**:

1. **Layout**: We render a normal HTML structure (divs, text, images). This keeps text crisp and accessible.
2. **3D framing**: We apply `perspective` on a parent, and `transform: rotateX(...) rotateY(...)` on a child plane so the dashboard looks like it sits in 3D space.
3. **Entrance animation**: We give each element two states:
   - **Initial state**: offscreen/offset + lower opacity + optional blur
   - **Final state**: the desired resting position + full opacity + no blur

We then flip a single boolean like `entered = true` after the component mounts. That boolean is the “start gun” for the whole sequence.

---

## Dependencies

You can build this with **CSS only** (recommended first) and optionally add a motion library later.

### Required (already in our stack)

- **React / Next.js**: for rendering components and triggering the “entered” state after mount.
- **Tailwind CSS** (or CSS Modules): for styling and responsive behavior.

### Optional (nice-to-have)

- **Framer Motion**: if you want a declarative timeline and variants, but it is not required.
- **A small utility library** like `clsx` / `tailwind-merge`: helps compose conditional class names cleanly.

### Accessibility requirement

We must support `prefers-reduced-motion`. In reduced-motion mode we should:

- Skip the entrance animation (render final state immediately), and
- Disable pointer-based tilt/parallax.

---

## Suggested file structure (Pumpkin)

Keep the hero as a page-level section, but move the dashboard animation into a reusable component so it’s easy to iterate.

Example structure:

```text
app/pumpkin/page.tsx
components/pumpkin/pumpkin-hero-design1.tsx
components/pumpkin/dashboard/
  DashboardScene.tsx
  DashboardPlane.tsx
  DashboardElements.tsx
  useEntranceOnce.ts
  useTiltParallax.ts
  dashboard.module.css   (optional if you prefer CSS Modules)
```

---

## Step-by-step implementation

### Step 1 — Decide what is “real UI” vs “image”

Before animating anything, decide what the dashboard is made of.

There are two common approaches:

1. **Screenshot-based plane** (fastest to ship): use a single image as the base UI and animate only a few “floating” elements on top.
2. **Component-based plane** (more flexible): build the dashboard plane out of actual HTML elements and animate many subparts.

For Pumpkin, start with (1) to get the motion and quality right quickly, then migrate parts to (2) if you need dynamic content.

---

### Step 2 — Build the 3D scene wrapper (the “camera”)

The scene wrapper sets the “camera lens” using CSS `perspective`. Without perspective, 3D rotation looks flat.

```tsx
// components/pumpkin/dashboard/DashboardScene.tsx
import { useMemo } from "react";
import { DashboardPlane } from "./DashboardPlane";

export function DashboardScene() {
  return (
    <div
      className={[
        // The “camera”
        "relative",
        "w-full",
        "max-w-[1100px]",
        "mx-auto",
        "perspective-[1400px]", // Tailwind arbitrary value: sets perspective distance
      ].join(" ")}
    >
      <DashboardPlane />
    </div>
  );
}
```

If your Tailwind config does not support `perspective-[...]`, use a CSS module:

```css
/* dashboard.module.css */
.scene {
  perspective: 1400px;
}
```

---

### Step 3 — Create the dashboard “plane” (tilted surface)

This is the 3D surface that looks like the angled dashboard.

Key properties:

- `transform-style: preserve-3d` so children can use `translateZ(...)`.
- A base `transform` like rotateX/rotateY plus scale/translate.

```tsx
// components/pumpkin/dashboard/DashboardPlane.tsx
"use client";

import { useEntranceOnce } from "./useEntranceOnce";
import { useTiltParallax } from "./useTiltParallax";
import { DashboardElements } from "./DashboardElements";

export function DashboardPlane() {
  const entered = useEntranceOnce();
  const tilt = useTiltParallax({ enabled: entered });

  return (
    <div
      ref={tilt.ref}
      data-entered={entered ? "true" : "false"}
      className={[
        "relative",
        "h-[520px]",
        "w-full",
        "rounded-2xl",
        "overflow-hidden",
        "will-change-transform",
        // 3D stacking context
        "[transform-style:preserve-3d]",
        // Base tilt (static framing). The parallax hook will add small deltas.
        "[transform:translateZ(0)_rotateX(50deg)_rotateY(20deg)_rotateZ(-8deg)_scale(1.05)]",
        // Optional: subtle border / glass
        "border border-white/10 bg-white/5",
      ].join(" ")}
    >
      {/* Base UI (image or background) */}
      <div
        className={[
          "absolute inset-0",
          "bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(255,255,255,0.12),transparent_60%)]",
          "bg-[#0b0b0f]",
        ].join(" ")}
      />

      {/* Floating animated pieces */}
      <DashboardElements entered={entered} />
    </div>
  );
}
```

---

### Step 4 — Define an “entrance contract” for every element

Every animated element must answer two questions:

1. Where does it start (position/opacity/blur)?
2. Where does it end (final position/opacity/no blur)?

The easiest way to keep this consistent is to make a small helper that applies:

- Initial styles when `entered = false`
- Final styles + transition when `entered = true`

Example for a floating card:

```tsx
// components/pumpkin/dashboard/DashboardElements.tsx
type Props = { entered: boolean };

export function DashboardElements({ entered }: Props) {
  return (
    <>
      <div
        className={[
          "absolute left-10 top-14",
          "rounded-xl border border-white/10 bg-black/40 backdrop-blur-md",
          "px-4 py-3 text-white",
          // 3D depth: push forward
          "[transform:translateZ(60px)]",
          // Entrance animation
          "transition-[transform,opacity,filter] duration-700 ease-out",
          entered
            ? "opacity-100 [filter:blur(0px)]"
            : "opacity-0 [filter:blur(8px)] [transform:translateZ(60px)_translateY(18px)]",
        ].join(" ")}
      >
        Refactor sonic crawler
      </div>
    </>
  );
}
```

Notice the pattern: we keep the final `translateZ(...)` in both states, and only add/remove small offsets like `translateY(...)`. That prevents “depth popping”.

---

### Step 5 — Stagger the entrance (the “sequence”)

Staggering is where the animation starts to feel “designed” rather than “generic”.

We want a rule like:

\[
delay = baseDelay + index \times step
\]

We can implement this with a CSS variable. Each element gets `style={{ '--i': index }}` and we compute delay in CSS.

```tsx
// Example: a list of rows that enter one by one
const rows = ["Inbox", "My issues", "Initiatives", "Projects", "Views"];

export function StaggeredList({ entered }: { entered: boolean }) {
  return (
    <div className="absolute left-10 bottom-10 w-[320px] [transform:translateZ(30px)]">
      <ul className="space-y-2">
        {rows.map((label, i) => (
          <li
            key={label}
            style={{ ["--i" as any]: i }}
            className={[
              "rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90",
              "transition-[transform,opacity,filter] duration-700 ease-out",
              // stagger: base 200ms, step 70ms
              "[transition-delay:calc(200ms+var(--i)*70ms)]",
              entered
                ? "opacity-100 [filter:blur(0px)] [transform:translateZ(0)_translateY(0px)]"
                : "opacity-0 [filter:blur(8px)] [transform:translateY(14px)]",
            ].join(" ")}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

This is the same *style* of technique Linear uses for a staggered sequence: a CSS variable per item and a computed delay.

---

### Step 6 — (Optional) The “swap” animation like Linear (blur out / blur in)

Linear uses a neat trick to make a list feel “alive”: it renders two versions and crossfades them with blur, staggered per row using `--index`.

From our inspection of Linear’s published CSS, the pattern is:

- Stack two lists (grid overlay)
- Animate old list items: `opacity 1 -> 0` and `filter none -> blur(4px)`
- Animate new list items: `opacity 0 -> 1` and `filter blur(4px) -> none`
- Stagger each row with `animation-delay: calc(base + var(--index) * step)`

You can reproduce that in Pumpkin like this:

```css
/* Example CSS module (or global) */
.listAnimation {
  display: grid;
  grid-template-columns: 1fr;
}
.listAnimation > * {
  grid-area: 1 / 1;
}

.listAnimation .oldList > li {
  animation: blurOut 0.48s cubic-bezier(.2,.9,.2,1) both;
  animation-delay: calc(0.5s + var(--index) * 0.1s);
}
.listAnimation .newList > li {
  animation: blurIn 0.48s cubic-bezier(.2,.9,.2,1) both;
  animation-delay: calc(0.7s + var(--index) * 0.1s);
}

@keyframes blurOut {
  from { opacity: 1; filter: none; }
  to   { opacity: 0; filter: blur(4px); }
}
@keyframes blurIn {
  from { opacity: 0; filter: blur(4px); }
  to   { opacity: 1; filter: none; }
}
```

This is not required for the initial Pumpkin hero, but it’s a great “phase 2” polish.

---

### Step 7 — Trigger the entrance once (reliably)

The most common bug with entrance animations is: “I set state to `true`, but no animation happens.”

That happens when the browser never sees the “initial” styles—because React renders only the final state.

To fix this, we:

1. Render with `entered=false` on first paint.
2. In `useEffect`, wait for the next animation frame.
3. Then set `entered=true`.

```tsx
// components/pumpkin/dashboard/useEntranceOnce.ts
"use client";

import { useEffect, useState } from "react";

export function useEntranceOnce() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      setEntered(true);
      return;
    }

    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return entered;
}
```

---

### Step 8 — Add mouse tilt/parallax (optional, after entrance)

Parallax is a “nice extra”, but it can also destroy performance if you update styles too often.

Rules of thumb:

- Use **CSS variables** instead of rerendering React.
- Update in **requestAnimationFrame** (so you never exceed the screen refresh rate).
- Keep rotation deltas small (±2–4 degrees feels premium; ±10 looks like a toy).

```tsx
// components/pumpkin/dashboard/useTiltParallax.ts
"use client";

import { useEffect, useRef } from "react";

export function useTiltParallax({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      // Normalize to [-1, 1]
      const nx = (e.clientX - cx) / (r.width / 2);
      const ny = (e.clientY - cy) / (r.height / 2);

      targetX = Math.max(-1, Math.min(1, nx));
      targetY = Math.max(-1, Math.min(1, ny));

      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          const ry = targetX * 2; // degrees
          const rx = -targetY * 2;
          // Apply small deltas as CSS variables or inline style
          el.style.setProperty("--tilt-rx", `${rx}deg`);
          el.style.setProperty("--tilt-ry", `${ry}deg`);
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return { ref };
}
```

Then incorporate those variables into the plane transform:

```css
/* Example (CSS module) */
.plane {
  transform:
    translateZ(0)
    rotateX(calc(50deg + var(--tilt-rx, 0deg)))
    rotateY(calc(20deg + var(--tilt-ry, 0deg)))
    rotateZ(-8deg)
    scale(1.05);
  transform-style: preserve-3d;
}
```

---

## Performance checklist (especially for t2.nano-class devices)

Entrance animations can get expensive fast. Use this checklist:

- Prefer animating **opacity** and **transform**. Use **blur** sparingly; `filter: blur(...)` is GPU-heavy.
- Add `will-change: transform` on the main plane (not on hundreds of children).
- Reduce element count inside the dashboard. Fewer layers = smoother.
- Keep shadows subtle. Big blurred shadows can be expensive.

---

## Debugging guide

### “Nothing animates”

Most commonly:

- You render `entered=true` immediately (no initial frame). Fix by using `requestAnimationFrame` as in `useEntranceOnce`.

### “Animation jitters or stutters”

Most commonly:

- You update React state on every mouse move. Fix by writing CSS variables in `requestAnimationFrame`.

### “The dashboard looks flat”

Most commonly:

- You forgot `perspective` on the parent. Add it to the scene wrapper.

### “translateZ does nothing”

Most commonly:

- You forgot `transform-style: preserve-3d` on the plane.

---

## Summary

To reproduce a premium dashboard entrance animation:

1. Create a **scene** with `perspective`.
2. Render a **plane** with `transform-style: preserve-3d` and a base 3D transform.
3. Give each animated element an **initial** and **final** state.
4. Trigger the entrance **once** after mount.
5. Add **staggering** with CSS variables for a “designed” timeline.
6. Respect `prefers-reduced-motion` and keep performance constraints in mind.