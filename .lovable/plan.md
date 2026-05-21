
# SuperPilot — Apple-grade redesign

You picked the taste:
- **Palette** — Cloud White: `#fafbfc` canvas, `#e8ecf1` surfaces, `#94a3b8` muted, `#3b82f6` single intelligent accent
- **Type** — Sora (display) + Manrope (UI/body), tight tracking, generous line-height
- **Layout** — Single column focus: one thing at a time, generous whitespace, no dashboard density

Design north star: it should feel like a tool the Apple Human Interface team would ship — quiet, confident, almost invisible chrome, and AI presence felt through subtle motion and language, not glow effects or chatbot bubbles.

## Design principles

1. **One focal subject per screen.** No multi-pane dashboards. The briefing, a deal, a contact — each gets the stage.
2. **Calm intelligence.** AI shows up as soft inline suggestions, a single accent dot, and a thin progress hairline. Never a purple gradient, never "✨".
3. **Typographic hierarchy does the work.** 48–64px Sora display headings, 15px Manrope body, 11px uppercase mono-style labels in muted slate. Color is mostly absence of color.
4. **Hairlines, not boxes.** 1px `#e8ecf1` dividers replace card borders where possible. Cards get `rgba(0,0,0,0.04)` shadows, never heavy borders.
5. **Motion is breath.** 200–400ms ease-out fades and 8–16px translate-ins. No bounce, no parallax.

## Token system (src/styles.css)

```text
--background: oklch(0.99 0.002 250)        /* #fafbfc */
--surface:    oklch(0.96 0.005 250)        /* #e8ecf1 */
--border:     oklch(0.93 0.006 250)
--text:       oklch(0.18 0.01 250)
--muted:      oklch(0.62 0.012 250)        /* slate-400 */
--accent:     oklch(0.62 0.18 258)         /* #3b82f6 */
--accent-soft:oklch(0.96 0.04 258)
--radius:     14px
--shadow-1:   0 1px 2px rgba(15,23,42,0.04)
--shadow-2:   0 8px 24px -12px rgba(15,23,42,0.10)
```

Sidebar/app dark surfaces from the current build are removed. Everything is light. AI accent is a single blue; "hot" / "risk" use slate weight + a small filled dot, not red/orange chips.

## Screen-by-screen redesign

### App shell (`_app.crm.tsx` + `Sidebar.tsx` + `Header.tsx`)
- Replace the persistent dark sidebar with a **thin 56px rail** on the left: just icons, no labels. Workspace switcher collapses to a single avatar at the top. Labels appear on hover as a quiet tooltip.
- Top of the content area gets a **floating breadcrumb bar** (route name in Sora, current entity in Manrope, ⌘K hint on the right). No background, just hairline below.
- Content is centered in a **max-w-[880px]** column with `px-10 py-14`.

```text
┌──┬───────────────────────────────────────────────┐
│  │  Briefing · Thursday, May 21        ⌘K        │
│ ◐│  ─────────────────────────────────────────    │
│ ◧│                                                │
│ ◑│         [ single-column content ]              │
│ ◰│                                                │
└──┴───────────────────────────────────────────────┘
```

### Daily Briefing (`/crm/briefing`) — the hero screen
- **Greeting** in 56px Sora light: "Good morning, Dilith." Subline in 17px muted: "Three things deserve your attention today."
- **Today's focus** as a single hairline-bordered card, no icons, no chips. Just: meeting name in Sora medium, time + attendees in muted Manrope, two text buttons ("Join", "Prep notes") with no fill.
- **Numbered list** (1–3) of priorities instead of KPI tiles. Each row: bold number in muted slate, deal name in text, one-line AI rationale in italic muted, hover reveals action chips.
- **"What changed overnight"** as a vertical timeline with a 1px rail and dots. No card backgrounds.
- Remove the four KPI tiles entirely — the numbered priorities replace them.
- Motion: each section fades + 12px-up on mount, staggered 80ms.

### Deals index (`/crm/deals`)
- Table → **list of rows** separated by hairlines. Each row: company name (Sora 18), stage label (mono uppercase 10px muted), ARR right-aligned in tabular Manrope, a tiny 80px sparkline of activity in accent blue.
- Filter bar collapses into a single search input with inline pill filters that appear as you type.

### Deal detail (`/crm/deals/$dealId`)
- Hero: company logo (40px), name in 40px Sora, one-sentence AI summary directly under it in muted italic ("Late-stage enterprise opportunity, momentum slowing — see thread from May 18.").
- Below: three stacked sections (**Signal**, **People**, **History**), each opened by a hairline header. No tabs.
- "Insights" become inline annotations attached to history events, not a separate panel.

### Contact detail (`/crm/contacts/$contactId`)
- Same single-column treatment. 64px avatar, name in Sora, title + company in muted.
- **Conversations** becomes a clean threaded list: subject in text, snippet in muted, timestamp right-aligned. Hover reveals "Draft reply" as a text link with a blue dot.

### Tasks (`/crm/tasks`)
- Vertical list, one task per row, checkbox is a hairline circle that fills with the accent blue on complete.
- Due date is small mono text on the right; overdue uses a single filled blue dot, never red.

### Login / landing
- Landing hero stays single column, Sora display, accent reserved for one verb in the headline (currently "never" — keep that pattern). Replace neon green with `--accent` blue. Dark mode is dropped; everything light.

## AI presence (the "AI-centric" part, done quietly)

- A persistent **⌘K command bar** opens a centered sheet (Linear-style) with a single input. Suggestions appear underneath in muted text grouped by "Jump to / Draft / Ask". This is the primary AI entry point.
- A **thin 2px progress hairline** at the very top of the viewport appears whenever a background AI task is running. Replaces toasts.
- Inline "ask" affordance: select any text in a deal/contact view → a small floating "Ask SuperPilot" pill appears next to selection. No modal.

## Implementation order

1. **Tokens & globals** — rewrite `src/styles.css` with the Cloud White token set; wire Sora + Manrope via Google Fonts in `__root.tsx`; remove dark-mode tokens.
2. **Shell** — refactor `Sidebar.tsx` to 56px icon rail, add new `Breadcrumb.tsx`, replace `_app.crm.tsx` wrapper to provide the centered column.
3. **Briefing** — rewrite `_app.crm.briefing.tsx` with greeting + focus card + numbered priorities + timeline.
4. **Deals + Deal detail** — rewrite list rows and the detail hero/sections.
5. **Contacts + Contact detail** — same single-column treatment, threaded conversations.
6. **Tasks** — hairline list.
7. **Command bar** — new `CommandBar.tsx` mounted in `_app.tsx`, opens on ⌘K, searches deals/contacts/tasks.
8. **Landing + Login** — swap accent to blue, keep composition.
9. **Motion** — add Motion for React fade-up to top-level sections (200ms, 80ms stagger).

## Technical notes

- Plain Tailwind v4 via `src/styles.css` `@theme` tokens — no config file needed.
- Use `motion/react` (already idiomatic for this stack) for entry animations only; no layout/AnimatePresence usage required.
- Keep all existing routes, data files (`crm-data.ts`, `crm-logos.ts`), and session logic intact — this is a presentation-layer rewrite.
- Sora + Manrope loaded via `<link>` in `__root.tsx` head; set `font-display: swap`.

## Out of scope

- No new backend, no Lovable Cloud, no data model changes.
- No new routes — only visual rewrites of existing ones.
- Pipeline/Kanban, Reports, and global search beyond the ⌘K shell are deferred to later phases.

Approve this and I'll execute steps 1–9 in order.
