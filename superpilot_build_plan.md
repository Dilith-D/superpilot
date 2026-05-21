# SuperPilot — Complete Build Plan
## Prototype Development Specification
**Version:** 1.0 | **Stack:** React + Tailwind + Framer Motion | **Hosting:** Vercel

---

## Overview

A fully interactive web application that functions as both a marketing landing page
and a working CRM demo. The evaluator lands on a product website, logs in, gets a
guided tour of SuperPilot, then explores the CRM freely.

**URL structure:**
```
/              → Landing page (The Story)
/login         → Dummy login screen
/crm           → CRM home (Deal Intelligence Feed)
/crm/deals     → Pipeline view
/crm/deals/:id → Deal record (SuperPilot features live here)
/crm/contacts  → Contacts list
/crm/contacts/:id → Contact record
```

---

## Build Sequence

### Phase 1 — Lovable (Days 1–2, first pass)
Get structure, layout, navigation, and dummy data in place fast.

1. Landing page full build
2. Login screen
3. CRM shell — sidebar, header, navigation routing
4. All CRM pages with dummy data populated
5. Basic styling aligned to Superleap dark theme

### Phase 2 — Claude Code (Days 2–3, refinement)
Build the SuperPilot components precisely and wire the guided tour.

1. SuperPilot Pre-Call Brief component
2. SuperPilot Post-Call Actions component
3. SuperPilot Deal Intelligence Feed component
4. SuperPilot Handoff Brief component
5. Guided tour overlay system
6. Animations and micro-interactions
7. Polish and QA

---

## Page 1 — Landing Page (`/`)

### Purpose
Tell the story. Problem → insight → solution → CTA.
Feels like a real product website. Superleap brand aesthetic.

### Sections

**1.1 Navigation Bar**
```
Logo: [Superleap wordmark] + [SuperPilot badge]
Links: Features | How it works | Pricing (non-functional)
CTA button: "See it in action →" → scrolls to bottom CTA
```

**1.2 Hero Section**
```
Headline:
"Your sales team remembers the pitch.
SuperPilot remembers everything else."

Subheadline:
"The institutional memory layer for B2B revenue teams.
Built natively inside Superleap."

Visual:
Animated preview of the pre-call brief card appearing
on a blurred CRM background. 
Subtle floating elements — deal cards, task chips, 
AI insight badges.

CTA:
Primary: "Try the demo →" → /login
Secondary: "Watch how it works" → scrolls to feature section
```

**1.3 Problem Section**
```
Header: "B2B deals die at handoffs. Not because of bad selling."

Three stat cards (animated on scroll):
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   6 handoffs    │  │  2+ hours/day   │  │  60% of time    │
│  in one deal    │  │  lost to admin  │  │  not selling    │
│  lifecycle      │  │  & context prep │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘

Below stats:
"The SDR qualifies the lead. The AE runs the demo.
The SE handles technical eval. Implementation takes over.
The CSM manages renewal. At every transition —
context leaks. Promises are forgotten.
The customer has to start over."

Visual: Animated handoff diagram showing the B2B SaaS
sales journey with red "memory loss" indicators at each arrow.
```

**1.4 Insight Section**
```
Header: "The data exists. It just hasn't been interpreted."

Split layout:
Left: List of data sources
  Gmail · VoIP calls · Google Meet · Deal history ·
  Contact records · Meeting notes

Right: "These sources contain everything your team
needs to never start a conversation from scratch.
SuperPilot reads all of it. Synthesizes it.
Hands it to the rep at the moment it matters."

Visual: Animated data flow — multiple source icons 
converging into a single SuperPilot card.
```

**1.5 Feature Highlights Section**
```
Header: "Three moments. One continuous memory."

Three feature cards with interactive preview:

Card 1 — Before the call
Icon: Clock
"SuperPilot assembles a contextual brief before
every conversation — last touchpoint, open commitments,
stakeholder map, suggested focus.
Read it in 60 seconds. Walk in prepared."
[Mini preview of pre-call brief UI]

Card 2 — After the call
Icon: Checkmark
"When the call ends, SuperPilot reads the transcript.
Tasks created. Commitments captured. Follow-up drafted.
15 minutes of admin done in 90 seconds."
[Mini preview of post-call actions UI]

Card 3 — Between calls
Icon: Pulse/radar
"SuperPilot watches every deal for risk signals.
Not on a timer — contextually. Surfaces the right
action at the right moment."
[Mini preview of deal intelligence feed]
```

**1.6 Handoff Section**
```
Header: "The feature your CSM will thank you for."

"When a deal moves from AE to Implementation,
SuperPilot generates a complete handoff brief —
every commitment made, every concern raised,
every stakeholder mapped. The new owner walks in
knowing everything the AE knew."

Visual: Handoff brief card mockup with
realistic data populated.
```

**1.7 Bottom CTA Section**
```
Dark background, centered:

"See SuperPilot inside a real CRM."
"No setup. Just log in and explore."

[Enter the demo →]  → /login

Small text: "Pre-loaded with a fictional B2B SaaS
sales team. All data is illustrative."
```

**1.8 Footer**
```
Superleap logo | SuperPilot
"Built for Superleap PM Assignment — Dilith Dinesh"
Links: GitHub (optional) | LinkedIn
```

### Design Spec — Landing Page
```
Background: #0A0A0F (near black)
Primary text: #F5F5F5
Secondary text: #8B8B9A
Accent (SuperPilot AI): #6366F1 (indigo)
Accent (Superleap): #10B981 (emerald) — matches their brand
Card backgrounds: #12121A
Border: #1E1E2E
Font: 
  Display — Clash Display or Cal Sans (headings)
  Body — DM Sans or Geist (readable, modern)
```

---

## Page 2 — Login Screen (`/login`)

### Purpose
Create the transition moment from marketing to product.
Makes the demo feel real, not like a mockup.

### Layout
```
Split screen:

Left panel (40%):
  Superleap + SuperPilot logo
  "Welcome back to Superleap"
  "Signing in as Arjun Sharma, AE at Zephyr Technologies"

Right panel (60%):
  Login form
  Email field: pre-filled "arjun@zephyrtech.io"
  Password field: pre-filled "••••••••"
  [Sign in →] button
  
  Small note below button:
  "Demo account — click Sign in to continue"

Animation on sign in:
  Button shows loading state (1 second)
  Screen fades out
  CRM home fades in
```

### Design Spec
```
Background: #0A0A0F
Left panel: subtle gradient mesh
Right panel: #12121A with border
Input fields: dark fill, indigo focus ring
Button: indigo → emerald gradient
```

---

## Page 3 — CRM Home (`/crm`)

### Purpose
First CRM screen after login. Shows the SuperPilot
Deal Intelligence Feed as the default home view.

### Layout — Overall CRM Shell
```
┌────────────────────────────────────────────────────┐
│ HEADER                                              │
│ [≡] Superleap logo    Search bar    [🔔] [Avatar]  │
├──────────┬─────────────────────────────────────────┤
│          │                                         │
│ SIDEBAR  │  MAIN CONTENT AREA                      │
│          │                                         │
│ ○ Home   │                                         │
│ ○ Deals  │                                         │
│ ○ Leads  │                                         │
│ ○ Contacts│                                       │
│ ○ Activities│                                     │
│ ○ Reports│                                        │
│          │                                         │
│ ──────── │                                         │
│ ✦ SuperPilot│                                     │
│   Active │                                         │
│          │                                         │
│ [Avatar] │                                         │
│ Arjun S. │                                         │
└──────────┴─────────────────────────────────────────┘
```

### Sidebar Spec
```
Width: 240px
Background: #0D0D14
Active item: indigo left border + lighter background
SuperPilot badge: pulsing green dot "Active"
All nav items are clickable and route correctly
```

### CRM Home Content
```
Header row:
"Good morning, Arjun. Here's your day." 
[Date] · [Zephyr Technologies]

SuperPilot Deal Intelligence Feed:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✦ SUPERPILOT — DEAL INTELLIGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ HIGH RISK — Acme Corp
Proposal opened 4 times. No response in 4 days.
CFO not engaged. Day 9 at proposal stage (avg: 5).
→ Call Priya today. Ask if CFO has reviewed.
[View Deal →]  [Log Call →]

⚡ MOMENTUM — TechVentures
Champion replied within 2hrs. IT approved vendor.
Legal review starting.
→ Move to Legal Review. Send MSA template.
[View Deal →]  [Update Stage →]

○ ACTION NEEDED — Buildfast
Case study promised Tuesday. Not sent. 3 days overdue.
→ Send now.
[Draft Email →]  [View Deal →]

✓ HEALTHY — NovaPay (3 deals)
On track. No action needed today.
[View all →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Below feed:
Today's tasks section (3-5 tasks with due dates)
Recent activity timeline
Upcoming calls (pulled from calendar)
```

---

## Page 4 — Pipeline / Deals (`/crm/deals`)

### Purpose
Shows the full deal pipeline. Makes the CRM feel real.
All deals visible, multiple stages.

### Layout
```
Page header:
"Deals" + [+ New Deal] button + [Filter] + [Sort]
Stage selector tabs: All | Qualification | Discovery | 
Demo | Proposal | Negotiation | Legal | Closed Won

Kanban OR list view toggle (default: list)

List view columns:
Deal Name | Company | Stage | Value | Owner | 
Last Activity | Health | Next Action
```

### Deals Data
```
6 active deals:

1. Acme Corp
   Stage: Proposal Sent
   Value: ₹8,40,000/yr
   Contact: Priya Mehta (VP Ops)
   Health: ⚠ At Risk
   Last activity: 4 days ago
   SuperPilot badge: active

2. TechVentures
   Stage: Legal Review
   Value: ₹12,00,000/yr  
   Contact: Rahul Nair (CTO)
   Health: ⚡ Momentum
   Last activity: Today

3. Buildfast
   Stage: Negotiation
   Value: ₹6,00,000/yr
   Contact: Sneha Pillai (CEO)
   Health: ○ Action needed
   Last activity: 5 days ago

4. NovaPay
   Stage: Discovery
   Value: ₹15,00,000/yr
   Contact: Vikram Shetty (VP Sales)
   Health: ✓ Healthy
   Last activity: Yesterday

5. FinCore Systems
   Stage: Demo Scheduled
   Value: ₹9,60,000/yr
   Contact: Anita Rao (COO)
   Health: ✓ Healthy
   Last activity: 2 days ago

6. DataBridge
   Stage: Closed Won
   Value: ₹7,20,000/yr
   Contact: Karan Mehta (CTO)
   Health: ✓ Won
   Last activity: 1 week ago
```

---

## Page 5 — Deal Record (`/crm/deals/acme-corp`)

### Purpose
The hero screen. Full deal record for Acme Corp.
All three SuperPilot features live here.
This is the most important screen in the entire prototype.

### Layout
```
┌────────────────────────────────────────────────────┐
│ DEAL HEADER                                        │
│ Acme Corp · ₹8,40,000/yr · Proposal Sent          │
│ Priya Mehta · priya@acmecorp.io · +91 98765 43210 │
│ [📞 Log Call] [✉ Send Email] [📅 Schedule Meet]    │
│ [Move Stage ▼]                                     │
├───────────────────────────┬────────────────────────┤
│ LEFT COLUMN (65%)         │ RIGHT COLUMN (35%)     │
│                           │                        │
│ ✦ SUPERPILOT BRIEF        │ Deal Details           │
│   [Pre-call card]         │ Stage progress bar     │
│                           │ Owner: Arjun Sharma    │
│ Activity Timeline         │ Created: Sep 12        │
│ [All interactions]        │ Close date: Nov 30     │
│                           │                        │
│                           │ Contacts               │
│                           │ [Priya Mehta card]     │
│                           │ [Rohan Shah card]      │
│                           │                        │
│                           │ Tasks                  │
│                           │ [Task list]            │
│                           │                        │
│                           │ Files                  │
│                           │ [Proposal PDF]         │
│                           │ [NDA]                  │
└───────────────────────────┴────────────────────────┘
```

### SuperPilot Pre-Call Brief Card
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✦ SUPERPILOT — PRE-CALL BRIEF
Acme Corp · Next call: Today 3:00 PM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⟳ Updated 2 hours ago from 4 sources

Last touchpoint [→ view]
Oct 18 · Email · Priya asked about Salesforce
migration timeline. You said you'd follow up
with an estimate. Not sent yet.

Open commitments
• Migration timeline estimate (promised Oct 14) [→]
• Chargebee integration doc (promised Oct 16) [→]

Key concerns raised (click to view source)
• Data migration complexity [×3] [→]
• Chargebee billing integration [×2] [→]
• IT approval requirement [×1] [→]

Stakeholders
✓ Priya Mehta — VP Ops · Champion
✓ Rohan Shah — IT Lead · Evaluator
✗ CFO — Economic buyer · Not yet engaged

Suggested focus
Address migration timeline gap. CFO needs
to be looped in before deal can advance.

[Prepare for call →]  [Dismiss]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Activity Timeline (left column, below brief)
```
Shows chronological interactions:

Oct 22 · Email (Gmail) · Priya: "Following up on..."
Oct 18 · Email (Gmail) · Arjun: "Thanks for the call..."
Oct 16 · Call · 34min · Google Meet [→ transcript]
Oct 14 · Call · 47min · Google Meet [→ transcript]  ← SuperPilot active
Oct 12 · Email (Gmail) · Arjun: "Proposal attached..."
Oct 10 · Meeting · Discovery Call · Notes [→]
Oct 05 · Email · Inbound inquiry
```

Each call entry shows: duration, channel icon, 
SuperPilot badge if processed, [View transcript] link.

### Post-Call Actions Panel
```
Triggered when user clicks [Log Call] or after 
"completing" a simulated call.

Slides in from right:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✦ SUPERPILOT — POST-CALL ACTIONS
Oct 22 · Discovery Call · 34 min
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Call summary
Discussed migration timeline. Priya confirmed
Chargebee is critical. Rohan needs to approve
infra changes. CFO presentation needed.

Tasks created (review & confirm)
☐ Send migration estimate doc
  Due: Tomorrow · You
☐ Share Chargebee integration guide  
  Due: Friday · You
☐ Get bulk export timeline
  Due: This week · [Product Team ✦ tagged]
☐ Schedule CFO intro call
  Due: Next week · You

Commitment added to memory
"Migration live in 3–4 weeks from contract sign"
Oct 22 · 00:24:13 [→ transcript]

Follow-up email
[To: Priya Mehta]
"Hi Priya, great speaking today..."
[Preview full draft →]

[Confirm all →]  [Edit tasks]  [Dismiss]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Handoff Brief Panel
```
Triggered when user clicks [Move Stage → Implementation]

Modal appears:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✦ SUPERPILOT — HANDOFF BRIEF GENERATED
AE → Implementation · Acme Corp
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Why they bought
Migration from Salesforce blocking ops
reporting. Priya owns this internally.
Decision driven by timeline and Chargebee fit.

Commitments made
• 3–4 week migration [Oct 22 call → view]
• Chargebee integration OOB [Oct 16 email → view]
• Finance custom report in week 2 [Oct 21 call → view]

Stakeholders
• Priya Mehta (VP Ops) — champion, main contact
• Rohan Shah (IT) — infra approvals
• CFO — signed off, not day-to-day

Watch out for
• IT approval adds ~1 week to timeline
• Finance report scope not finalized
• Priya expects weekly status updates

Success metric
"Live and operational within 6 weeks of sign"

[Assign to Implementation →]  [Edit brief]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Page 6 — Contact Record (`/crm/contacts/priya-mehta`)

### Purpose
Shows contact-level context. SuperPilot surfaces
a contact-level summary across all deals.

### Layout
```
Contact header:
Priya Mehta · VP Operations · Acme Corp
priya@acmecorp.io · +91 98765 43210
[LinkedIn] [Email] [Call]

SuperPilot Contact Summary (top of page):
━━━━━━━━━━━━━━━━━━━━━━━━━━━
✦ SUPERPILOT — CONTACT BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Last interaction: Email, 4 days ago
Key concern: Migration complexity (×3)
Open commitments to her: 2
Relationship health: Warm
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Below: All deals with this contact
Activity timeline across all deals
```

---

## Page 7 — Contacts List (`/crm/contacts`)

### Purpose
Shows all contacts. Makes CRM feel populated.

### Layout
```
List with columns:
Name | Company | Role | Last Contact | 
Deals | SuperPilot Status

10 contacts pre-populated with realistic data.
```

---

## The Guided Tour

### Trigger
Auto-starts on first CRM load after login.
Can be dismissed at any point.
"Replay tour" button available in header.

### Tour Steps (7 steps)

```
Step 1 — Welcome
Overlay on CRM home
"Welcome to Superleap with SuperPilot active.
This is Arjun's CRM — a B2B SaaS sales rep
managing 6 active deals.
Let's show you what SuperPilot does."
[Next →]

Step 2 — Deal Intelligence Feed
Highlight: SuperPilot feed on home screen
"Every morning, SuperPilot surfaces which deals
need attention today — not based on timers,
but based on context across emails, calls,
and meetings.
Acme Corp is flagged as high risk. Let's see why."
[Go to Acme Corp →]

Step 3 — Pre-Call Brief
Highlight: SuperPilot brief card on deal record
"SuperPilot assembled this brief automatically.
It pulled from 3 emails, 2 call transcripts,
and a Google Meet recording.
Arjun reads this in 60 seconds before his call.
He walks in knowing everything."
[Next →]

Step 4 — Source Links
Highlight: [→ view] links on brief
"Every insight links back to its source.
Click any claim to see the exact transcript
line or email it came from.
No hallucinations. Full transparency."
[Next →]

Step 5 — Post-Call Actions
Highlight: [Log Call] button, then trigger panel
"When a call ends, SuperPilot reads the
transcript and does the admin automatically.
Tasks created. Commitments captured.
Follow-up email drafted.
15 minutes of work in 90 seconds."
[See it in action →] — triggers post-call panel

Step 6 — Cross-functional tagging
Highlight: Product Team tag in task
"When the prospect asked about a roadmap feature,
SuperPilot flagged it and tagged the product team.
No dropped balls. No manual coordination."
[Next →]

Step 7 — Handoff Brief
Highlight: [Move Stage] button
"When the deal moves to Implementation,
SuperPilot generates a complete handoff brief.
The new owner knows everything the AE knew.
The customer never has to repeat themselves."
[Try it →] — triggers handoff modal

End of tour:
"That's SuperPilot. Now explore freely.
Every deal has data. Every feature is live."
[Start exploring →] — dismisses tour
```

### Tour UI Spec
```
Backdrop: dark overlay 70% opacity
Spotlight: highlighted element has white border
  + slightly lighter background
Tooltip: positioned near highlighted element
  Dark card, white text, step counter
  [Back] [Next] [Skip tour]
Progress: dots at bottom (7 dots)
```

---

## Dummy Data Specification

### The Fictional Superleap Customer
```
Company: Zephyr Technologies
Industry: B2B SaaS (HR Tech)
Size: 80 employees, 8-rep sales team
Location: Bengaluru
CRM admin: Arjun Sharma (logged-in user)
```

### The Logged-In Rep
```
Name: Arjun Sharma
Role: Account Executive
Email: arjun@zephyrtech.io
Avatar: initials "AS" in indigo circle
Team: Enterprise Sales
Manager: Neha Kapoor (Sales Manager)
```

### Full Deal Data

**Deal 1 — Acme Corp (HERO DEAL — fully built)**
```
Value: ₹8,40,000/yr
Stage: Proposal Sent (Day 9, avg 5)
Health: ⚠ High Risk
Contacts:
  - Priya Mehta · VP Operations · champion
  - Rohan Shah · IT Lead · evaluator
  - [CFO name TBD] · economic buyer · not engaged
Activity: 8 interactions (emails + calls + meetings)
Commitments: 3 open (migration timeline, Chargebee doc, case study)
SuperPilot: active, all features live
```

**Deal 2 — TechVentures**
```
Value: ₹12,00,000/yr
Stage: Legal Review
Health: ⚡ Momentum
Contact: Rahul Nair · CTO
Activity: 6 interactions
SuperPilot: active, brief available
```

**Deal 3 — Buildfast**
```
Value: ₹6,00,000/yr  
Stage: Negotiation
Health: ○ Action needed
Contact: Sneha Pillai · CEO
Activity: 5 interactions
Overdue: case study not sent (3 days)
```

**Deal 4 — NovaPay**
```
Value: ₹15,00,000/yr
Stage: Discovery
Health: ✓ Healthy
Contact: Vikram Shetty · VP Sales
Activity: 3 interactions
```

**Deal 5 — FinCore Systems**
```
Value: ₹9,60,000/yr
Stage: Demo Scheduled
Health: ✓ Healthy
Contact: Anita Rao · COO
Next action: Demo at 2pm Thursday
```

**Deal 6 — DataBridge**
```
Value: ₹7,20,000/yr
Stage: Closed Won
Contact: Karan Mehta · CTO
Won: Oct 15
SuperPilot: handoff brief generated and visible
```

### Acme Corp Full Activity Log
```
Oct 22 · Email inbound · Priya: "Hi Arjun, just checking in
  on the migration timeline estimate you mentioned..."

Oct 18 · Email outbound · Arjun: "Hi Priya, great speaking
  on Thursday. Notes and next steps attached..."

Oct 16 · Google Meet · 34 min
  Participants: Arjun, Priya, Rohan
  Transcript available
  SuperPilot processed: tasks + commitments extracted

Oct 14 · Google Meet · 47 min  
  Participants: Arjun, Priya
  Transcript available
  SuperPilot processed: proposal walkthrough

Oct 12 · Email outbound · Arjun: "Priya, as discussed,
  please find the proposal attached..."
  [Proposal PDF attached]
  Email opened: 4 times (Oct 12, 15, 19, 22)

Oct 10 · Google Meet · 52 min
  Discovery call
  Transcript available

Oct 07 · Email outbound · Arjun: "Thanks for your time
  yesterday. Here's a summary of what we discussed..."

Oct 05 · Email inbound · Priya: "Hi, I came across
  Superleap and wanted to learn more about..."
```

### Contacts List (10 contacts)
```
1. Priya Mehta · VP Operations · Acme Corp
2. Rohan Shah · IT Lead · Acme Corp
3. Rahul Nair · CTO · TechVentures
4. Sneha Pillai · CEO · Buildfast
5. Vikram Shetty · VP Sales · NovaPay
6. Anita Rao · COO · FinCore Systems
7. Karan Mehta · CTO · DataBridge (won)
8. Aditya Kumar · Head of Ops · NovaPay
9. Pooja Singh · IT Manager · TechVentures
10. Mohit Jain · Finance Head · Buildfast
```

---

## Component Library

### SuperPilot Visual Language
```
All SuperPilot components share:
- Left border: 2px solid #6366F1 (indigo)
- Header: "✦ SUPERPILOT" label in indigo
- Background: #0F0F1C (slightly different from CRM cards)
- Subtle glow: box-shadow: 0 0 20px rgba(99,102,241,0.1)
- AI badge: small "AI" pill in top right corner
- Typing animation on first load (content appears character by character)

This makes SuperPilot elements visually distinct from
standard CRM elements — the AI layer is visible.
```

### CRM Card Component
```
Background: #12121A
Border: 1px solid #1E1E2E
Border-radius: 8px
Padding: 16px
Hover: border-color: #2E2E4E
```

### Health Badge Component
```
⚠ At Risk: amber background, amber text
⚡ Momentum: emerald background, emerald text
○ Action: blue background, blue text
✓ Healthy: gray background, gray text
✓ Won: indigo background, white text
```

### Stage Progress Bar
```
Linear progress across deal stages:
Qualification → Discovery → Demo → 
Proposal → Negotiation → Legal → Won

Current stage highlighted in indigo.
```

---

## Interactions & Animations

### Page Transitions
```
Login → CRM: full page fade (0.4s)
CRM navigation: content area fade (0.2s)
```

### SuperPilot Brief Card
```
On deal record load:
- Card fades in with slight upward motion (0.3s delay)
- Content appears with typewriter effect on first view
- "Updated X hours ago" timestamp pulses once
```

### Post-Call Panel
```
Slides in from right (0.3s ease-out)
Tasks appear staggered (0.1s delay each)
Checkboxes are interactive — can be checked off
```

### Tour Overlay
```
Backdrop fades in (0.2s)
Spotlight expands around target element (0.3s)
Tooltip slides in from bottom (0.2s)
```

### Deal Feed
```
Each card slides in staggered on home load
Health indicators pulse once on load
[View Deal] hover: subtle scale + border brighten
```

---

## Responsive Behavior

Primary target: desktop (1280px+)
Minimum viable: 1024px (laptop)
Mobile: not required for this prototype
(Note this in the submission if asked)

---

## Tech Stack

```
Framework: React 18 + Vite
Styling: Tailwind CSS + custom CSS variables
Routing: React Router v6
Animations: Framer Motion
Icons: Lucide React
Fonts: 
  Display — Cal Sans (free, modern)
  Body — DM Sans (Google Fonts)
State: React useState/useContext (no Redux needed)
Hosting: Vercel
```

---

## Lovable Prompt (Phase 1)

Use this prompt to generate the first pass in Lovable:

---

Build a dark-themed B2B SaaS CRM web application called "Superleap" 
with an AI feature called "SuperPilot" for a PM assignment prototype.

DESIGN: Dark theme. Background #0A0A0F. Cards #12121A. 
Accent color indigo (#6366F1). Secondary accent emerald (#10B981).
Font: DM Sans for body. Modern, enterprise, clean.

PAGES TO BUILD:

1. Landing page (/) — Marketing page for SuperPilot feature.
Hero: "Your sales team remembers the pitch. SuperPilot remembers 
everything else." CTA button "Try the demo →" links to /login.
Include sections: problem stats (60% non-selling time, 6 handoffs, 
2hrs admin daily), three feature cards (before call / after call / 
between calls), bottom CTA.

2. Login page (/login) — Split screen. Left: logo and tagline. 
Right: login form pre-filled with email "arjun@zephyrtech.io" 
and password dots. "Sign in →" button navigates to /crm.
Add note: "Demo account — click Sign in to continue"

3. CRM shell — Sidebar navigation (Home, Deals, Contacts, 
Activities, Reports). Header with search bar, notification bell, 
avatar "AS". All pages share this shell.

4. CRM Home (/crm) — Deal Intelligence Feed. 
Show "Good morning, Arjun." header.
Show a SuperPilot card with indigo left border labeled 
"✦ SUPERPILOT — DEAL INTELLIGENCE" containing 3 deal alerts:
- ⚠ HIGH RISK: Acme Corp with reason and suggested action
- ⚡ MOMENTUM: TechVentures with reason  
- ○ ACTION NEEDED: Buildfast with overdue item
Below: Today's tasks list (4 items). Upcoming calls section.

5. Deals list (/crm/deals) — Table with 6 deals:
Acme Corp (Proposal, ₹8.4L, At Risk), TechVentures (Legal, ₹12L, 
Momentum), Buildfast (Negotiation, ₹6L, Action needed), 
NovaPay (Discovery, ₹15L, Healthy), FinCore (Demo, ₹9.6L, Healthy),
DataBridge (Closed Won, ₹7.2L, Won).
Each row has health badge, [View] button.

6. Deal record (/crm/deals/acme-corp) — Full deal page for Acme Corp.
Header: deal name, value, stage, contact name.
Action buttons: Log Call, Send Email, Schedule Meet, Move Stage.
Left column (65%): SuperPilot brief card (indigo border, 
"✦ SUPERPILOT — PRE-CALL BRIEF" header, shows last touchpoint, 
open commitments list, key concerns with frequency count, 
stakeholder map with ✓/✗ indicators, suggested focus).
Below brief: activity timeline with 8 interactions.
Right column (35%): deal details, contacts (Priya Mehta, Rohan Shah), 
tasks list, files section.

7. Contacts list (/crm/contacts) — Table with 10 contacts, 
realistic Indian names, companies, roles, last contact dates.

8. Contact record (/crm/contacts/priya-mehta) — Priya Mehta profile.
Top: SuperPilot contact brief card. Below: linked deals, 
activity timeline.

Make all navigation functional. Use realistic dummy data throughout.
Style SuperPilot components with: indigo left border, 
"✦ SUPERPILOT" label, slightly different background (#0F0F1C),
subtle indigo glow.

---

## Claude Code Tasks (Phase 2)

After Lovable generates the base, use Claude Code for:

```
1. SuperPilot Post-Call Actions panel
   - Slide-in panel from right
   - Triggered by [Log Call] button
   - All interactive elements (checkboxes, confirm button)
   - Realistic transcript data

2. SuperPilot Handoff Brief modal
   - Triggered by [Move Stage → Implementation]
   - Full data populated
   - [Assign to Implementation] action

3. Guided tour system
   - 7-step overlay tour
   - Spotlight effect on target elements
   - Step-by-step navigation
   - Auto-starts on first CRM load

4. Animations
   - Brief card typewriter effect
   - Staggered deal feed load
   - Panel slide animations
   - Page transitions

5. Source link interactions
   - [→ view] links on brief open transcript modal
   - Transcript modal with highlighted relevant line

6. Email draft preview
   - [Preview full draft →] opens email modal
   - Realistic email content pre-populated

7. Polish
   - Consistent spacing and typography
   - Hover states on all interactive elements
   - Loading states where appropriate
   - Mobile-friendly warning if < 1024px
```

---

## Quality Checklist Before Submission

### Functionality
- [ ] All navigation routes work
- [ ] Login flow completes correctly
- [ ] Guided tour completes all 7 steps
- [ ] Post-call panel opens and closes
- [ ] Handoff brief modal opens and closes
- [ ] All deal rows link to correct records
- [ ] All contact rows link to correct records
- [ ] SuperPilot feed items link to deal records
- [ ] Tour can be replayed from header

### Data
- [ ] All 6 deals have realistic data
- [ ] All 10 contacts have realistic data
- [ ] Acme Corp activity log has 8 entries
- [ ] SuperPilot brief has populated data
- [ ] Post-call panel has populated tasks
- [ ] Handoff brief has populated commitments

### Design
- [ ] Dark theme consistent throughout
- [ ] SuperPilot components visually distinct
- [ ] Indigo accent used consistently for AI elements
- [ ] Typography hierarchy clear
- [ ] No broken layouts at 1280px
- [ ] Health badges correct colors

### Submission
- [ ] Deployed to Vercel with clean URL
- [ ] URL works without login (auto-redirect handles it)
- [ ] No console errors
- [ ] Page load under 3 seconds

---

## Submission Notes to Include

When submitting the URL, include:

"The prototype is a fully interactive CRM demo.
Start at the landing page and click 'Try the demo →'.
Login is pre-filled — just click Sign in.
A guided tour starts automatically — follow it for
the full SuperPilot walkthrough, then explore freely.
Best viewed on desktop at 1280px or wider."

---

*Build plan v1.0 — SuperPilot for Superleap CRM*
*PM Assignment — Dilith Dinesh*
