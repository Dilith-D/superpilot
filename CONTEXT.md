# SuperPilot — Full Project Context

> Handoff document for the next developer or AI agent continuing this work.
> Written after completing Phase 9. Covers everything built, every decision made,
> and what comes next.

---

## What This Is

A fully interactive PM prototype submitted as a take-home assignment for the
Product Manager role at Superleap AI CRM. The brief was: design an AI-powered
feature inside Superleap CRM that increases rep productivity by cutting low-value
work.

The output is a dual-purpose artifact:
- **Product marketing site** (`/`) — sells the idea to a PM evaluator
- **Working CRM prototype** (`/crm/*`) — demonstrates the feature as if it were real

Not a production app. All data is fictional. AI features are simulated UI.

**Candidate:** Dilith Dinesh  
**Repo:** https://github.com/Dilith-D/superpilot  
**Live:** https://superpilot-1t02pes2o-dilith-ds-projects.vercel.app (check Vercel for latest URL)  
**Vercel project:** `prj_NUpa4AtAzb3dh2JPw34Ung81zy6r` / team `team_ZVRroM68Upj1RV04nWgnnFh0`

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React 19 | |
| Router | TanStack Router v1.168 | File-based, auto route tree generation |
| Build | Vite + `@lovable.dev/vite-tanstack-config` | Custom preset |
| Animation | Framer Motion (`motion/react` v12) | `motion.div`, `useInView`, `AnimatePresence` |
| Styling | Tailwind CSS v4 | Light theme via CSS custom properties |
| Icons | Lucide React | |
| Language | TypeScript (strict) | |
| Deployment | Vercel (GitHub auto-deploy on push to `master`) | |

No backend. No database. No real auth. Fully static prototype.

---

## Running Locally

```bash
npm install
npm run dev        # Vite dev server — also regenerates routeTree.gen.ts
npx tsc --noEmit   # Type check
```

**Critical:** After adding any new route file (`src/routes/_app.crm.xxx.tsx`),
you MUST run `npm run dev` (or `npx vite build`) once to trigger
`@tanstack/router-plugin` to regenerate `src/routeTree.gen.ts`. TypeScript
will error until this happens. The route generator parses route files with
Babel before the TS compiler sees them.

---

## Design System

### Light theme (app shell, landing page)
Uses CSS custom properties defined in the global stylesheet. All Tailwind
classes like `text-[var(--text-primary)]`, `bg-[var(--surface-card)]`, etc.
Components in `src/components/crm/` use these tokens.

Key tokens:
- `--sp` / `--sp-glow` — indigo accent (#6366F1)
- `--surface-base`, `--surface-card`, `--surface-sidebar`, `--surface-sp`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--border-default`
- `--amber` — warning/attention color

### Dark theme (SuperPilot intelligence pages)
The architecture, ROI, roadmap, GTM, and industries pages are full-page dark
overrides using **inline styles with hardcoded hex constants**. This avoids
fighting the CSS custom properties that resolve to light values.

Copy these constants verbatim into every new dark page:

```ts
const IND = "#6366F1"; const EME = "#10B981"; const AMB = "#F59E0B"; const RED = "#EF4444";
const BLUE = "#3B82F6";
const CARD = "#12121A"; const SPC = "#0F0F1C"; const BOR = "#1E1E2E";
const TX1 = "#F5F5F5"; const TX2 = "#8B8B9A"; const MUT = "#4B4B5A"; const BG = "#0A0A0F";
const SG = '"Space Grotesk", system-ui, sans-serif';
const DM = '"DM Sans", system-ui, sans-serif';
const JB = '"JetBrains Mono", ui-monospace, monospace';
```

### FadeIn scroll animation (reused on every dark page)
```tsx
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}
```

### Typography conventions
- **Space Grotesk** (`SG`) — headings, section labels
- **DM Sans** (`DM`) — body copy, descriptions
- **JetBrains Mono** (`JB`) — labels, metadata, code, pill tags, numeric outputs

---

## File Structure

```
src/
├── routes/
│   ├── __root.tsx                      # Root layout
│   ├── index.tsx                       # Landing page (/)
│   ├── login.tsx                       # Login page (/login)
│   ├── _app.tsx                        # App shell (auth guard, Sidebar, Header, CommandBar, GuidedTour)
│   ├── _app.crm.tsx                    # CRM layout (just <Outlet />)
│   ├── _app.crm.index.tsx              # CRM home (/crm) — Deal Intelligence Feed
│   ├── _app.crm.briefing.tsx           # Morning briefing (/crm/briefing)
│   ├── _app.crm.deals.tsx              # Deals layout
│   ├── _app.crm.deals.index.tsx        # Pipeline view (/crm/deals)
│   ├── _app.crm.deals.$dealId.tsx      # Deal record (/crm/deals/:dealId) — hero screen
│   ├── _app.crm.contacts.tsx           # Contacts layout
│   ├── _app.crm.contacts.index.tsx     # Contacts list (/crm/contacts)
│   ├── _app.crm.contacts.$contactId.tsx # Contact record (/crm/contacts/:contactId)
│   ├── _app.crm.tasks.tsx              # Tasks layout
│   ├── _app.crm.tasks.index.tsx        # Task list (/crm/tasks)
│   ├── _app.crm.roi.tsx                # ROI Calculator page (dark) (/crm/roi)
│   ├── _app.crm.roadmap.tsx            # Product Roadmap page (dark) (/crm/roadmap)
│   ├── _app.crm.gtm.tsx                # GTM Strategy page (dark) (/crm/gtm)
│   ├── _app.crm.industries.tsx         # Industries page (dark) (/crm/industries)
│   └── _app.crm.architecture.tsx       # Architecture page (dark) (/crm/architecture)
│
├── components/crm/
│   ├── Sidebar.tsx                     # Icon sidebar — two nav groups
│   ├── Header.tsx                      # Top bar with search + tour replay button
│   ├── GuidedTour.tsx                  # 7-step narrative tour overlay
│   ├── CommandBar.tsx                  # Cmd+K palette
│   ├── ROICalculator.tsx               # Shared interactive calculator (landing + /crm/roi)
│   ├── PostCallPanel.tsx               # Post-call extraction slide-in panel
│   ├── HandoffModal.tsx                # Handoff brief modal
│   ├── DraftModal.tsx                  # Email/meeting draft modal
│   ├── JoinCallModal.tsx               # Join call modal
│   └── StubPage.tsx                    # Placeholder for unbuilt pages
│
├── lib/
│   ├── crm-data.ts                     # All static demo data (deals, contacts, tasks, intel feed)
│   ├── session.ts                      # Tiny sessionStorage auth (no real backend)
│   ├── crm-logos.ts                    # Logo color seeds for monograms
│   ├── utils.ts                        # Utility functions
│   ├── error-capture.ts                # Error boundary helpers
│   └── error-page.ts                   # Error page component
│
├── assets/
│   └── priya-mehta.jpg                 # Only real image in the prototype (hero contact avatar)
│
├── routeTree.gen.ts                    # AUTO-GENERATED — never edit manually
└── router.tsx                          # Router setup
```

---

## Route Map

| Route | File | Theme | Notes |
|-------|------|-------|-------|
| `/` | `index.tsx` | Light | Landing page — problem narrative, relay race, intelligence surfaces, dark ROI band, CTA |
| `/login` | `login.tsx` | Light | Pre-filled dummy login, click Sign In |
| `/crm` | `_app.crm.index.tsx` | Light | Deal Intelligence Feed — the "morning briefing" home screen |
| `/crm/briefing` | `_app.crm.briefing.tsx` | Light | Prioritised deal alerts, risk flags, follow-up queue |
| `/crm/deals` | `_app.crm.deals.index.tsx` | Light | Pipeline kanban/list view, all 6 deals |
| `/crm/deals/acme-corp` | `_app.crm.deals.$dealId.tsx` | Light | **Hero screen** — full SuperPilot feature set |
| `/crm/contacts` | `_app.crm.contacts.index.tsx` | Light | Contacts list, 10 contacts |
| `/crm/contacts/priya-mehta` | `_app.crm.contacts.$contactId.tsx` | Light | Contact record with SuperPilot brief |
| `/crm/tasks` | `_app.crm.tasks.index.tsx` | Light | Task list with open/completed management |
| `/crm/roi` | `_app.crm.roi.tsx` | **Dark** | Before/after table, interactive calculator, impact cards |
| `/crm/roadmap` | `_app.crm.roadmap.tsx` | **Dark** | V1/V2/V3 phase timeline, feature cards, adoption strategy |
| `/crm/gtm` | `_app.crm.gtm.tsx` | **Dark** | ICP, wedge, competitive table, pricing, expansion funnel |
| `/crm/industries` | `_app.crm.industries.tsx` | **Dark** | 5 industry cards (B2B SaaS, EdTech, BFSI, Real Estate, Healthcare) |
| `/crm/architecture` | `_app.crm.architecture.tsx` | **Dark** | Capability audit, 3-layer arch, 4 AI components, orchestration, tech stack |

---

## Data Model (`src/lib/crm-data.ts`)

Everything is static TypeScript — no API calls, no database.

**Deals (6 total):**
- `acme-corp` — hero deal, fully detailed (Negotiation stage, ₹8.4L ARR, at-risk)
- `techventures`, `buildfast`, `novapay`, `fincore`, `databridge` — supporting deals

**Contacts (10 total):**
- `priya-mehta` — hero contact (VP Sales Ops, Acme Corp, avatar image)
- 9 others across all deals

**Intel feed:** `intelFeed[]` — typed as `IntelCard[]` with `kind: "signal" | "risk" | "next-step" | "commitment" | "win"`

**Tasks:** `tasks[]` — typed with `status: "open" | "done"`, `openTaskCount` exported for sidebar badge

**Helper functions:** `getDeal(id)`, `getContact(id)`, `formatCurrency(n)`, `pipelineTotal`, `weightedTotal`

---

## Authentication

Not real. `src/lib/session.ts` uses `sessionStorage` with key `superpilot_user`.

- `signIn(email)` — sets the session
- `signOut()` — clears it
- `getSession()` — returns the email or null

The `_app.tsx` route has a `beforeLoad` guard: if no session, redirects to `/login`.
The login page (`login.tsx`) is pre-filled with `arjun@zephyrtech.io` — user just clicks Sign In.

**Demo persona:**
- Company: Zephyr Technologies (B2B SaaS, HR Tech, Bengaluru)
- Logged-in user: Arjun Sharma, Account Executive

---

## App Shell (`_app.tsx`)

Wraps all CRM routes. Renders:
1. `<Sidebar />` — icon sidebar (14px wide, sticky)
2. `<Header />` — top bar with workspace name + search + tour replay
3. `<Outlet />` — current route content
4. `<CommandBar />` — Cmd+K command palette (global)
5. `<GuidedTour />` — 7-step overlay, auto-starts on first login

---

## Sidebar (`src/components/crm/Sidebar.tsx`)

Two nav groups separated by dividers and a SuperPilot status indicator:

**Group 1 — Core CRM:**
Home (`/crm`), Briefing, Deals, Contacts, Tasks (with open task count badge)

**Divider → SP pulsing status dot → Divider**

**Group 2 — SuperPilot Intelligence:**
ROI (`TrendingUp` icon), Roadmap (`GitBranch`), GTM (`Target`), Industries (`Globe`), Architecture (`Cpu`)

Icons are 18px, hover shows tooltip label. Active state uses `--surface-sp` background + `--sp` color.

---

## GuidedTour (`src/components/crm/GuidedTour.tsx`)

7-step narrative tour. Auto-starts on first app load after login. Replayable from
a button in the Header. State lives in React useState (not persisted).

**Step 1** — Full-screen centered modal (`max-w-[560px]`):
- Three sections: "The Problem", "What We Built", "3 Core Moments"
- CTAs: [Skip] and [Start demo →]
- Framer Motion: scale spring animation in/out

**Steps 2–7** — Bottom card (`max-w-[420px]`, bottom-right):
- Chapter label (tiny monospace uppercase)
- Amber pain chip (`bg-amber/10 text-amber border-amber/20`) — one-line problem statement
- Main heading + body copy
- [Back] / [Next] / [Done] navigation

Step structure in the `steps` array:
```ts
type Step = {
  target?: string;       // CSS selector to highlight (unused in current impl)
  chapter?: string;      // e.g. "Chapter 1 · Before the call"
  pain?: string;         // Amber chip text
  heading: string;
  body: string;
};
```

Tour steps cover: Product Brief (Step 1) → Deal Feed → Pre-Call Brief →
Post-Call Panel → Handoff Brief → Contact Intel → Command Bar.

---

## Hero Screen (`/crm/deals/acme-corp`)

The centrepiece of the prototype. Shows all 4 SuperPilot capabilities live:

1. **Pre-Call Brief card** — assembled brief with stakeholder map, open commitments, landmines, suggested focus
2. **Post-Call Panel** (`PostCallPanel.tsx`) — slide-in from right: extracted action items, accept/edit/dismiss flow, email draft button, CRM sync simulation
3. **Handoff Brief** (`HandoffModal.tsx`) — modal with full deal memory: why they bought, commitments, stakeholder map, watch-outs, success metrics
4. **Deal Memory Timeline** — chronological event log (calls, emails, meetings, stage changes)
5. **Transcript Modal** (`JoinCallModal.tsx`) — simulated call transcript view

The deal record also shows: deal vitals, activity feed, contact card, next steps,
and a "SuperPilot is watching" status bar.

---

## Landing Page (`/`)

Structure (top to bottom):
1. `<SiteNav />` — fixed top nav with "Try the demo" CTA
2. `<Hero />` — headline, subhead, two CTAs, social proof badges
3. `<RelayRace />` — 5-step handoff diagram + 3 stat cards (dark `#problem`)
4. `<IntelligenceSurfaces />` — sticky left narrative + 3 intelligence cards (PreCallCard, ContactCard, PostCallCard)
5. **`<ROISection />`** — dark band (#0A0A0F background): 4 stat chips + `<ROICalculator />` + CTA → `/login`
6. `<FinalCTA />` — full-width centred CTA section
7. `<SiteFooter />`

The ROI section is a dark island within the otherwise light page — same pattern
as the `RelayRace` section which uses `border-zinc-900`.

---

## ROI Calculator (`src/components/crm/ROICalculator.tsx`)

Shared component used in both the landing page (`<ROISection />`) and `/crm/roi`.
No props needed — both usages are dark-themed inline style.

**Inputs (state):**
- `reps` — slider 1–100, default 10
- `callsPerDay` — slider 1–15, default 5
- `dealValue` — number input ₹1L–₹50L, default ₹5L

**Fixed constant:** `savedPerCall = 24` minutes (12 min pre-call + 12 min post-call, research-backed)

**Computed outputs (derived, no state):**
```ts
timeSavedRepDay   = (callsPerDay * 24) / 60           // hours/rep/day
timeSavedTeamDay  = timeSavedRepDay * reps             // hours/team/day
additionalCalls   = (callsPerDay * 24) / 20            // extra calls/rep/day
addRevMonth       = additionalCalls * reps * 22 * 0.08 * dealValue
annualImpact      = addRevMonth * 12
```

**Currency formatting:** `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })` — Indian locale.
Large values use `fmtCr()`: shows "X.XCr+" for ≥1Cr, "X.XL+" for ≥1L.

---

## Dark Pages — Structure Pattern

All 5 dark pages (`/crm/roi`, `/crm/roadmap`, `/crm/gtm`, `/crm/industries`, `/crm/architecture`) follow the same template:

```tsx
export const Route = createFileRoute("/_app/crm/xxx")({ component: XxxPage });

// Constants (copy verbatim — see Design System section above)
const IND = "#6366F1"; // ...etc

// FadeIn component (copy verbatim)
function FadeIn(...) { ... }

// Helper components specific to this page

function XxxPage() {
  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 32px 96px", display: "flex", flexDirection: "column", gap: 56 }}>
        {/* motion.header for the page header (no FadeIn — animates immediately) */}
        {/* FadeIn-wrapped sections */}
      </div>
    </div>
  );
}
```

Page header pattern:
```tsx
<motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
  <Pill label="Badge text" ... />
  <h1 style={{ fontFamily: SG, fontSize: 32, fontWeight: 700, color: TX1, margin: "14px 0 10px", letterSpacing: "-0.02em" }}>Page Title</h1>
  <p style={{ fontFamily: DM, fontSize: 16, color: TX2, lineHeight: 1.65, maxWidth: 600, margin: 0 }}>Subheading.</p>
</motion.header>
```

---

## Commit History

| Hash | What |
|------|------|
| `89a2c51` | Initial commit — full prototype (landing, login, CRM shell, all core CRM pages) |
| `5b56745` | `/crm/architecture` page + GuidedTour narrative redesign (Step 1 full-screen modal) |
| `2b6024e` | `llms.txt` added |
| `16e4f1b` | Phase 9: ROI, Roadmap, GTM, Industries pages + ROI landing section + sidebar restructure |
| `b540dd2` | `llms.txt` updated with full navigation map |

---

## Key Design Decisions

### Why inline styles for dark pages?
The app uses CSS custom properties (`var(--surface-base)` etc.) that resolve to light
theme values at runtime. Dark pages need hardcoded dark colors that won't be
overridden. Inline styles win over CSS vars because there's no theming toggle in this
prototype — dark pages are always dark, light pages are always light.

### Why no `dark` prop on ROICalculator?
Both the landing page ROI section and `/crm/roi` are dark-themed. A `dark` prop
would add conditional branching for no real benefit in this single-theme prototype.
Both just consume the component as-is with dark backgrounds.

### Why FadeIn is a local component (not shared)?
Each dark page copies the identical 10-line `FadeIn` function locally rather than
importing from a shared file. This keeps each page self-contained and avoids adding
abstraction overhead for what is ultimately a prototype. Three similar lines is
better than a premature abstraction.

### Why is the guided tour state ephemeral (not persisted)?
`localStorage` persistence would mean the tour only auto-shows once per browser.
For a PM demo prototype viewed by an evaluator on a fresh session, it's better
for the tour to appear every time. An evaluator demoing to their team shouldn't
have to clear storage to show it again.

### Why sessionStorage for auth?
Tab-scoped, clears on browser close, no conflicts across multiple demo sessions.
Simpler than localStorage for a stateless demo.

### String quoting gotcha
Route files parsed by `@tanstack/router-generator` use Babel. Regular ASCII
double-quotes inside double-quoted JS strings cause "Unexpected token" errors
during route tree generation (not TypeScript — the router generator stage).
Fix: use single-quote delimiters for strings containing double-quotes,
or escape them with `\"`.

Example of the bug that surfaced:
```ts
// BAD — Babel sees the inner " as string terminator
"Reps complain about "too much admin""

// GOOD
'Reps complain about "too much admin"'
```

### Sidebar badge count
`openTaskCount` is a computed constant exported from `crm-data.ts` (number of
tasks with `status: "open"`). It's a static number — not reactive state. For a
real app this would be a query.

---

## What Is Complete

- [x] Landing page with full product narrative
- [x] Auth flow (dummy, sessionStorage)
- [x] CRM shell (sidebar, header, command bar, guided tour)
- [x] CRM home — Deal Intelligence Feed with proactive intel cards
- [x] Morning Briefing page
- [x] Deals pipeline view (all 6 deals)
- [x] Deal record hero screen (Acme Corp) — all 4 SuperPilot features live
- [x] Contacts list + contact record (Priya Mehta)
- [x] Tasks list with badge count
- [x] ROI Calculator page (interactive, team-size adjustable)
- [x] Product Roadmap page (V1/V2/V3 visual timeline)
- [x] GTM Strategy page (ICP, wedge, competitive, pricing, expansion, moat)
- [x] Industries page (5 verticals with personas and impact)
- [x] Architecture page (3-layer diagram, 4 AI components, orchestration patterns)
- [x] Landing page ROI section (dark band with live sliders)
- [x] Sidebar restructured into two groups (core CRM + SuperPilot intelligence)
- [x] GuidedTour narrative redesign (Step 1 full-screen modal + pain chips)
- [x] `llms.txt` for AI crawler discoverability
- [x] Vercel deployment (GitHub auto-deploy on push to master)
- [x] TypeScript clean (0 errors)

---

## What Could Be Built Next

These are natural extensions in rough priority order:

### High value for the PM pitch
1. **Mobile responsiveness** — all dark pages and the landing page assume 1280px+.
   The grid layouts (`gridTemplateColumns: "1fr 1fr"`) break on mobile. Add responsive
   breakpoints or `@media` fallbacks.

2. **More deal records** — only Acme Corp is fully detailed. Other 5 deals
   (`techventures`, `buildfast`, etc.) show the shell but not the full SuperPilot
   feature set. Add pre-call briefs and activity history for 1–2 more deals.

3. **Contact records for non-hero contacts** — only `priya-mehta` has a full record.
   Other 9 contacts show a stub. Add at least 2–3 more full contact records.

4. **Briefing page content** — `/crm/briefing` exists in the sidebar but its content
   depth may not match the other pages. Audit and flesh out if thin.

### Nice to have
5. **Command Bar functionality** — `CommandBar.tsx` likely has a UI but the commands
   may be stubs. Wire up navigation commands (e.g. "Go to Acme Corp deal" → navigate).

6. **Animated deal stage progression** — the pipeline view shows static stages.
   A subtle animation showing a deal moving from Proposal → Negotiation on the
   hero deal would make the intelligence feel more live.

7. **Post-call panel persistence** — currently the panel state resets on navigation.
   Persisting it to sessionStorage would let an evaluator leave and come back mid-flow.

8. **Dark/light toggle** — all dark pages use hardcoded hex; all light pages use
   CSS vars. Adding a toggle would require either: (a) migrating dark pages to
   CSS vars with a `[data-theme=dark]` selector, or (b) a React context that
   overrides the inline style constants. Non-trivial.

9. **`/crm/tasks` — deeper content** — the task list page exists but could show
   a grouped view (by deal, by due date) with task assignment and completion simulation.

---

## Files NOT to Edit Manually

- `src/routeTree.gen.ts` — auto-generated by `@tanstack/router-plugin` on every
  `vite dev` or `vite build` run. Any manual edit will be overwritten.
- `llms.txt` — update this whenever new routes or major features are added.
  It's indexed by AI crawlers for context.

---

## Environment / Deployment

No environment variables. No `.env` file required. Fully static.

Vercel auto-deploys on every push to `master`. No build configuration needed —
Vite config is handled by `@lovable.dev/vite-tanstack-config`. Build output is
standard Vite static site.

To check deployment status without the Vercel CLI, use the Vercel MCP plugin
(available in Claude Code) — authenticate once via browser OAuth, then use
`list_deployments` with:
- `projectId`: `prj_NUpa4AtAzb3dh2JPw34Ung81zy6r`
- `teamId`: `team_ZVRroM68Upj1RV04nWgnnFh0`
