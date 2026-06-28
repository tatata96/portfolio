# Photify PDF Print Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable the Photify case study to be exported as a clean PDF via browser print (`⌘P`), with the sidebar hidden, all interactive elements replaced by static equivalents, and each section on its own page.

**Architecture:** All print behaviour lives in a single `@media print {}` block appended to `work_detail_page.css`. The only JS change is a print button in `WorkDetailPage.tsx` and a static phone-strip block inside `FeatureWalkthrough.tsx` (hidden on screen, shown in print).

**Tech Stack:** React, CSS `@media print`, no new dependencies.

## Global Constraints

- No new libraries or dependencies.
- Do not touch any case study data (`caseStudies.ts`).
- Preserve all existing screen styles — print overrides are additive only.
- `@media print` block is appended at the end of `work_detail_page.css`, after all existing rules.

---

### Task 1: Print foundation — layout, sidebar, page breaks, and print button

**Files:**
- Modify: `src/pages/work-detail/work_detail_page.css` — append `@media print` block
- Modify: `src/pages/work-detail/WorkDetailPage.tsx` — add print button element
- Modify: `src/pages/work-detail/work_detail_page.css` — add `.work-detail-print-btn` screen style

**Interfaces:**
- Produces: `.work-detail-print-btn` class (used in WorkDetailPage.tsx), `@media print` base rules (extended in Tasks 2–3)

- [ ] **Step 1: Add the print button to WorkDetailPage.tsx**

In `WorkDetailPage.tsx`, inside the `<div className="work-detail-content">`, add the button as the **first child**, before the snapshot `<section>`:

```tsx
<div className="work-detail-content">
  <button
    className="work-detail-print-btn"
    type="button"
    onClick={() => window.print()}
  >
    Print / Save as PDF
  </button>

  <section className="work-detail-snapshot" aria-label="Project snapshot">
```

- [ ] **Step 2: Add the print button screen styles to `work_detail_page.css`**

Add after `.work-detail-content` styles (around line 143), before `.work-detail-snapshot`:

```css
.work-detail-print-btn {
  justify-self: end;
  padding: 9px 16px;
  border: 1px solid var(--project-accent);
  border-radius: 6px;
  background: var(--project-accent-soft);
  color: var(--project-accent-text);
  cursor: pointer;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1;
  text-transform: uppercase;
  transition: box-shadow 160ms ease;
}

.work-detail-print-btn:hover {
  box-shadow: 0 6px 18px rgba(var(--project-shadow-rgb), 0.18);
}
```

- [ ] **Step 3: Append `@media print` block to `work_detail_page.css`**

Add at the very end of the file (after the last `@media` block):

```css
@media print {
  /* ── Layout ── */
  .work-detail-page {
    --work-detail-sidebar-width: 0px;
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .work-detail-content {
    --work-detail-content-x: 40px;
    padding: 32px 40px 64px;
  }

  /* ── Sidebar ── */
  .work-detail-sidebar {
    display: none;
  }

  /* ── Print button ── */
  .work-detail-print-btn {
    display: none;
  }

  /* ── Floating visual ── */
  .work-detail-section__floating-visual,
  .work-detail-section__floating-visual--visible {
    display: none;
  }

  /* ── Sticky removal ── */
  .development-role-pair__visuals {
    position: relative;
    top: auto;
  }

  /* ── Page breaks ── */
  .work-detail-snapshot {
    break-before: page;
  }

  .work-detail-section {
    break-before: page;
  }

  .reflection-card,
  .development-role-card,
  .product-design-insight__standalone,
  .project-role-takeaway {
    break-inside: avoid;
  }
}
```

- [ ] **Step 4: Verify in browser print preview**

1. Run `npm run dev` (or the project's dev command) and open `/work/photify`.
2. Click "Print / Save as PDF" button — the browser print dialog should open.
3. Confirm in the preview:
   - Left sidebar is gone.
   - Content fills the full page width.
   - Diagonal stripe background is visible.
   - Each section (Snapshot, Context, Solution, Features, My Role, Reflection) starts on a new page.
   - Print button itself does not appear in the preview.

- [ ] **Step 5: Commit**

```bash
git add src/pages/work-detail/WorkDetailPage.tsx src/pages/work-detail/work_detail_page.css
git commit -m "feat: add print button and @media print foundation for Photify PDF export"
```

---

### Task 2: Static polaroids in print

**Files:**
- Modify: `src/pages/work-detail/work_detail_page.css` — extend the `@media print` block

**Interfaces:**
- Consumes: `@media print` block created in Task 1
- Produces: static scattered polaroid layout for print

- [ ] **Step 1: Add polaroid print overrides inside the `@media print` block**

Append inside the existing `@media print { }` block at the end of `work_detail_page.css`:

```css
  /* ── Polaroids — static with fixed rotations, no transitions ── */
  .solution-polaroids {
    height: clamp(300px, 36vw, 400px);
  }

  .solution-polaroid {
    transition: none;
  }

  .solution-polaroid:nth-child(1) {
    --polaroid-top: 38px;
    --polaroid-left: 0%;
    --polaroid-x: 0;
    --polaroid-y: 0;
    --polaroid-rotate: -5deg;
  }

  .solution-polaroid:nth-child(2) {
    --polaroid-top: 76px;
    --polaroid-left: 50%;
    --polaroid-x: -50%;
    --polaroid-y: 0;
    --polaroid-rotate: -12deg;
  }

  .solution-polaroid:nth-child(3) {
    --polaroid-top: 38px;
    --polaroid-left: calc(100% - clamp(160px, 22vw, 240px));
    --polaroid-x: 0;
    --polaroid-y: 0;
    --polaroid-rotate: 15deg;
  }
```

- [ ] **Step 2: Verify in print preview**

Open the print dialog and navigate to the **Solution** page (page 3).
Confirm:
- Three polaroid photos appear scattered with rotations (−5°, −12°, +15°).
- No animation or transition artefacts.
- Photos are legible.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work-detail/work_detail_page.css
git commit -m "feat: static polaroid rotations for print layout"
```

---

### Task 3: Static phone strip in FeatureWalkthrough for print

**Files:**
- Modify: `src/pages/work-detail/FeatureWalkthrough.tsx` — wrap interactive content, add static print strip
- Modify: `src/pages/work-detail/work_detail_page.css` — add `.solution-walkthrough-print` screen styles and print overrides

**Interfaces:**
- Consumes: `walkthrough.steps[]` (already available in the component)
- Produces: `.solution-walkthrough-screen` (hidden in print), `.solution-walkthrough-print` (shown in print only)

- [ ] **Step 1: Update `FeatureWalkthrough.tsx`**

Replace the entire file with the following (all existing logic preserved, interactive content wrapped in `.solution-walkthrough-screen`, static strip added as `.solution-walkthrough-print`):

```tsx
import {useState} from "react";
import type {CaseStudy} from "./caseStudies";

type FeatureWalkthroughProps = {
  walkthrough: NonNullable<CaseStudy["walkthrough"]>;
};

function FeatureWalkthrough({walkthrough}: FeatureWalkthroughProps) {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = walkthrough.steps[activeStep] ?? walkthrough.steps[0];

  return (
    <div className="solution-walkthrough">
      <p className="solution-walkthrough__intro">{walkthrough.intro}</p>

      {walkthrough.steps.length > 0 ? (
        <>
          {/* ── Interactive version (screen only) ── */}
          <div className="solution-walkthrough-screen">
            <div
              className="solution-walkthrough__steps"
              aria-label={walkthrough.ariaLabel}
            >
              {walkthrough.steps.map((step, stepIndex) => (
                <button
                  className={
                    stepIndex === activeStep
                      ? "solution-step solution-step--active"
                      : "solution-step"
                  }
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(stepIndex)}
                >
                  <span>{step.number}</span>
                  <div>
                    <strong>{step.label}</strong>
                    <p>{step.screenBody}</p>
                  </div>
                </button>
              ))}
            </div>

            {currentStep ? (
              <div className="solution-phone" aria-live="polite">
                <div className="solution-phone__device">
                  <div className="solution-phone__screen">
                    <div className="solution-phone__island" />
                    <img
                      src={currentStep.image}
                      alt={`${currentStep.screenTitle} screen`}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* ── Static strip (print only) ── */}
          <div className="solution-walkthrough-print" aria-hidden="true">
            {walkthrough.steps.map((step) => (
              <div className="solution-walkthrough-print__step" key={step.number}>
                <div className="solution-phone solution-phone--print">
                  <div className="solution-phone__device">
                    <div className="solution-phone__screen">
                      <div className="solution-phone__island" />
                      <img
                        src={step.image}
                        alt={`${step.screenTitle} screen`}
                      />
                    </div>
                  </div>
                </div>
                <div className="solution-walkthrough-print__caption">
                  <span className="solution-walkthrough-print__number">
                    {step.number}
                  </span>
                  <strong>{step.label}</strong>
                  <p>{step.screenBody}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default FeatureWalkthrough;
```

- [ ] **Step 2: Add screen styles for `.solution-walkthrough-screen` and `.solution-walkthrough-print`**

In `work_detail_page.css`, add after `.solution-walkthrough__intro` (around line 1474):

```css
.solution-walkthrough-screen {
  display: contents;
}

.solution-walkthrough-print {
  display: none;
}

.solution-walkthrough-print__step {
  display: grid;
  gap: 10px;
  align-content: start;
}

.solution-walkthrough-print__caption {
  display: grid;
  gap: 5px;
}

.solution-walkthrough-print__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--text-h);
  color: var(--bg);
  font-size: 11px;
  font-weight: 650;
  line-height: 1;
}

.solution-walkthrough-print__caption strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-h);
  line-height: 1.2;
}

.solution-walkthrough-print__caption p {
  margin: 0;
  color: var(--text);
  font-size: 11px;
  line-height: 1.4;
}

.solution-phone--print {
  min-height: auto;
  padding: 0;
}

.solution-phone--print .solution-phone__device {
  width: 100%;
}
```

- [ ] **Step 3: Extend the `@media print` block for the walkthrough**

Append inside the existing `@media print { }` block:

```css
  /* ── Feature walkthrough ── */
  .solution-walkthrough {
    display: block;
  }

  .solution-walkthrough-screen {
    display: none;
  }

  .solution-walkthrough-print {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 14px;
    padding-top: 18px;
  }

  .solution-phone--print .solution-phone__device {
    width: 100%;
    border-radius: 28px;
  }

  .solution-phone--print .solution-phone__screen {
    border-radius: 22px;
  }

  .solution-phone--print .solution-phone__island {
    width: 64px;
    height: 18px;
    top: 10px;
  }
```

- [ ] **Step 4: Verify in browser print preview**

Open the print dialog and navigate to the **Features** page.
Confirm:
- The interactive step list and single phone are gone.
- Five phone mockups appear in a horizontal row, each with the device frame rendered.
- Below each phone: numbered circle, bold step label, description text.
- All 5 screens (Phone Verification, Upload Selfie, Scan QR, Join Event, Personal Gallery) are visible.

Also confirm the screen view is unchanged (interactive walkthrough still works normally outside print mode).

- [ ] **Step 5: Commit**

```bash
git add src/pages/work-detail/FeatureWalkthrough.tsx src/pages/work-detail/work_detail_page.css
git commit -m "feat: static phone strip in FeatureWalkthrough for print layout"
```
