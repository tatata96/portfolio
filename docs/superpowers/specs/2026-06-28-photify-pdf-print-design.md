# Photify Case Study — Print / PDF Design

## Goal

Enable the Photify case study page (`/work/photify`) to be exported as a PDF via browser print (`⌘P`). Only the right-side content is needed; the left sidebar is interactive-only and excluded.

---

## Mechanism

Browser `@media print` CSS + a print button that calls `window.print()`. No new libraries, no separate route.

---

## Components changed

### `WorkDetailPage.tsx`
- Add a **print button** rendered inside `.work-detail-content`, positioned top-right.  
- Button calls `window.print()`. Hidden in print via `@media print { display: none }`.

### `FeatureWalkthrough.tsx`
- Add a sibling `.solution-walkthrough-print` block that renders all 5 steps as a **horizontal strip of phone mockups**.  
  - Each item: phone device frame with screen image + step number pill + label + description below as caption.  
  - Hidden on screen (`display: none`), shown in print.  
- Wrap existing interactive markup in `.solution-walkthrough-screen`, hidden in print.

### `work_detail_page.css`
All print overrides live in a single `@media print { }` block appended to the file.

---

## Print styles — section by section

### Global
- Hide `.work-detail-sidebar`.
- Reset `.work-detail-page` grid to single column; remove sidebar-width offset.
- Keep diagonal stripe background.
- Remove `min-height` constraints that could force whitespace.

### Page breaks
- `break-before: page` on `.work-detail-snapshot` and every `.work-detail-section`.
- `break-inside: avoid` on `.reflection-card`, `.development-role-card`, `.product-design-insight__standalone`, `.project-role-takeaway`.

### Print button
- `display: none`.

### Sidebar
- `display: none`.

### Floating visual (camera)
- `display: none` (animation-dependent, irrelevant on paper).

### Solution polaroids
- Remove `transition` (no animation in print).  
- Apply fixed rotations directly in `@media print`:  
  - Polaroid 1: `rotate(-5deg)`, translate reset  
  - Polaroid 2: `rotate(-12deg)`, translate reset  
  - Polaroid 3: `rotate(15deg)`, translate reset  
- Container keeps `position: relative` and fixed height so the scattered layout renders correctly.

### Features walkthrough (interactive)
- `.solution-walkthrough-screen`: `display: none` in print.
- `.solution-walkthrough-print`: `display: grid` in print (5-column horizontal strip).  
  - Each column: phone device frame (width ~130px) + step caption block below.  
  - Step caption: step number pill (small circle) + bold label + description text.

### Sticky / dynamic states
- Remove `position: sticky` from `.development-role-pair__visuals`.
- Remove `position: absolute` from `.work-detail-section__floating-visual`.

### Scroll-based composed state
- No action needed — `--composed` class is only added via JS scroll handler, which doesn't run in a print snapshot.

---

## Layout sketch — Features section (print)

```
[  Phone 1  ] [  Phone 2  ] [  Phone 3  ] [  Phone 4  ] [  Phone 5  ]
  ① Phone         ② Upload      ③ Scan QR     ④ Join        ⑤ Gallery
  Verification    Selfie                      Event
  Users create…   Users upload…  Attendees…   After joining… Once matching…
```

---

## Out of scope
- Other case studies (Brik, Algorand) — same print styles will apply but are not the target.
- PDF metadata, headers/footers, custom page size — left to browser defaults.
