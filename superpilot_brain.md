# SuperPilot — Project Brain
## Complete Product & Technical Specification
**Sector:** B2B | **Industry:** SaaS / Technology
**Feature for:** Superleap AI CRM
**Author:** Dilith Dinesh

---

# PART 1 — THE PROBLEM

## The Industry Context

B2B SaaS companies run on relationships and pipeline velocity. A sales rep manages 20–40 active deals simultaneously. Each deal involves multiple stakeholders on both sides, runs 6–12 weeks, and touches a prospect across 15–25 interactions spanning emails, calls, demos, and meetings.

The CRM is supposed to be the system of record for all of this. In practice, it is a system of burden.

## The B2B SaaS Sales Journey

A complete B2B SaaS deal moves through 9 distinct stages, owned by different roles:

```
Lead Generated
      ↓
[SDR/BDR] — Cold outreach, qualification, BANT
      ↓ ← HANDOFF 1
[Account Executive] — Discovery, Demo, Solutioning
      ↓ ← HANDOFF 2
[Solutions Engineer] — Integration, feasibility, security
      ↓ ← HANDOFF 3
[Legal / Finance] — MSA, DPA, pricing
      ↓ ← HANDOFF 4
[Implementation Consultant] — Configuration, migration, training
      ↓ ← HANDOFF 5
[Customer Success Manager] — Adoption, renewal, expansion
```

**Every arrow is a memory gap.**

Six handoffs in a single deal lifecycle. At each one:
- Context discussed in previous stage is not fully passed forward
- Commitments made verbally are undocumented
- The prospect has to repeat themselves
- The new owner starts from zero

The prospect experiences this as one continuous relationship. The selling team experiences it as a relay race where the baton is dropped at every exchange.

## Where Memory Actually Breaks Down

| Handoff | What gets lost |
|---|---|
| SDR → AE | Qualification context, initial objections, exact prospect language |
| AE → SE | Business pain, what was promised in demo, feature requests made |
| AE → Legal | Informal pricing discussions, discount rationale, timeline commitments |
| AE → Implementation | Workflow requirements, migration concerns, promised timelines |
| AE → CSM | Success metrics agreed on, expansion signals, relationship context |

## The Compounded Cost

**Per rep, per day:**
- Pre-call context reconstruction: 10–15 minutes × 5 calls = 45–75 minutes
- Post-call administration: 10–15 minutes × 5 calls = 45–75 minutes
- Total non-selling time from these two tasks alone: ~2 hours daily

**At team level (10 reps):**
- 20 hours of selling time lost daily to context reconstruction and admin
- Equivalent to 2.5 full-time roles doing zero-value work

**Beyond time — the invisible cost:**
- Deals lost at handoffs due to context gaps
- Customers who churn because onboarding felt like starting over
- New reps who take 3–4 months to ramp because deal history isn't accessible
- Trust erosion when a rep doesn't remember what was promised

## The Data

- 60% of a B2B sales rep's time is non-selling (Salesforce State of Sales, 2026)
- 18% of the average week spent manually entering CRM data
- 32% of reps spend 1+ hour per day on data entry alone
- Teams average 8–10 standalone tools with no unified context layer
- 46% of sales professionals say data quality issues directly hurt sales outcomes

## The Core Insight

The data to fix this already exists — in Gmail, VoIP systems, Google Meet, Fathom, the CRM pipeline, and contact records.

**The problem is not missing data. The problem is no system synthesizes it into memory.**

The CRM stores activity. It does not preserve memory. There is a difference.

---

# PART 2 — THE FEATURE

## What SuperPilot Is

**SuperPilot is Superleap's institutional memory layer for B2B revenue teams.**

It is not a chatbot. It is not a dashboard. It is not a workflow automation.

It is a proactive AI co-worker embedded inside Superleap that:
- Captures everything said across every channel at every deal stage
- Structures it into living deal memory that persists across handoffs
- Surfaces the right context to the right person at the right moment
- Takes administrative action automatically so the rep doesn't have to

The rep's experience: open Superleap, know everything, spend time selling.

## Naming

**SuperPilot.**

Not an agent that replaces the rep. A co-pilot that flies alongside them. Consistent with Superleap's naming convention — SuperFill, SuperSense, SuperDash, SuperFlows. One word. One idea.

## The Three Moments

SuperPilot operates across three critical moments in the revenue workflow:

---

### Moment 1 — Pre-Conversation Brief

**Trigger:** Meeting scheduled, or rep opens a deal record after 3+ days of inactivity.

**What the rep sees:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUPERPILOT — PRE-CALL BRIEF
Acme Corp · Discovery Call · 3:00 PM today
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Last touchpoint: Email, 4 days ago [→ view]
Priya (VP Ops) asked about Salesforce migration
timeline. You said you'd follow up with an estimate.
Not sent yet.

Key concerns raised so far:
• Data migration complexity (mentioned 3x) [→ source]
• Integration with Chargebee billing tool [→ source]
• IT approval required before sign-off [→ source]

Stakeholders engaged:
✓ Priya Mehta — VP Operations (champion)
✓ Rohan Shah — IT Lead (evaluator)
✗ CFO — not yet engaged (required for approval)

Suggested focus today:
Address the migration timeline gap.
Propose looping in SE for Chargebee integration.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Every claim links to its source interaction. Rep can verify in one click. Trust through transparency.

---

### Moment 2 — Post-Conversation Intelligence

**Trigger:** Call ends or meeting completes.

**What auto-generates within 3 minutes:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUPERPILOT — POST-CALL ACTIONS
Acme Corp · Discovery Call · Completed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Call summary logged to deal record ✓

Tasks created:
□ Send Salesforce migration estimate
  Due: Tomorrow · Owner: You
□ Share Chargebee integration doc
  Due: Friday · Owner: You
□ Confirm IT approval process with Rohan
  Due: Next week · Owner: You
□ Get feature timeline for bulk export
  Due: This week · Owner: [Product Team] ← tagged

Commitment added to deal memory:
"Told Priya migration timeline is 3–4 weeks"
[Oct 14, 2025 · Discovery Call · 00:24:13]

Follow-up email drafted:
[Review & Send →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

15 minutes of post-call admin reduced to 90 seconds. The rep reviews, edits if needed, approves.

---

### Moment 3 — Proactive Deal Intelligence

**Trigger:** Continuous background monitoring, surfaces to rep home feed.

**What the rep sees each morning:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUPERPILOT — DEAL FEED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠ HIGH RISK — Acme Corp
Proposal opened 4 times in 2 days. No response.
CFO not engaged. Day 9 at proposal stage (avg: 5).
→ Call Priya today. Ask if CFO has reviewed.
  Offer 15-min exec summary call.

⚡ MOMENTUM — TechVentures
Champion replied within 2hrs. IT approved.
Legal review starting. Ready to move stage.
→ Update deal to Legal Review. Send MSA template.

○ ACTION NEEDED — Buildfast
Case study promised Tuesday. Not sent. 3 days overdue.
→ Send case study now. [Draft email →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Not "X days since last activity." Contextual judgment across multiple signals with a specific recommended action.

---

### The Handoff Layer

At every role transition, SuperPilot auto-generates a structured handoff brief visible to the incoming owner:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUPERPILOT — HANDOFF BRIEF
AE → Implementation · Acme Corp
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Why they bought:
Migration complexity from Salesforce was blocking
ops reporting. Priya owns this internally.

Commitments made by AE:
• 3–4 week migration timeline [Oct 14 call]
• Chargebee integration supported out of box [Oct 18 email]
• Custom report for finance team in week 2 [Oct 21 call]

Key stakeholders:
• Priya Mehta (VP Ops) — champion, main contact
• Rohan Shah (IT Lead) — needs to approve infra changes
• CFO — signed off commercially, not day-to-day

Watch out for:
• IT approval process can add 1 week to timeline
• Finance report requirement not yet scoped
• Priya wants weekly status updates (she mentioned this twice)

Success metric agreed:
"Live and operational within 6 weeks of contract sign"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

The Implementation Consultant walks in knowing everything the AE knew. The customer doesn't repeat themselves. The promise made 3 months ago is visible and accountable.

---

## What SuperPilot Is Not

| What it's not | What it is instead |
|---|---|
| A chatbot you query | Proactive — surfaces context without being asked |
| A dashboard you open | Ambient — embedded in existing workflow surfaces |
| A reporting tool | Rep-facing — built for the person doing the work |
| A generic reminder | Context-aware — recommendations tied to deal specifics |
| A workflow automation | Intelligent — judgment, not if/then rules |

## Why This Is AI, Not a Workflow

A workflow fires on one condition: if 5 days since last activity → send reminder.

SuperPilot synthesizes context: given email engagement, stakeholder coverage, stage velocity, overdue commitments, and sentiment signals — here is what's actually happening on this deal and the one specific action to take right now.

The difference is judgment. Multiple signals weighted simultaneously. Output specific to this deal's situation, not a generic trigger applied to all deals.

---

# PART 3 — AI ARCHITECTURE

## Honest Capability Audit

| Feature | What it actually is |
|---|---|
| Pre-call brief assembly | LLM summarization across unified context |
| Post-call task extraction | LLM entity extraction + classification |
| Cross-functional tagging | LLM intent detection |
| Follow-up email draft | LLM generation with context injection |
| Deal health scoring | Rule-based signals + LLM interpretation |
| Proactive nudges | Deterministic triggers + LLM reasoning |
| Handoff brief generation | LLM summarization of full deal history |
| "Proposal opened 4x" signal | Webhook event — not AI |
| Task due date suggestion | Pattern matching — not AI |

Being precise about this matters. The AI is in the interpretation layer, not every feature.

---

## The Three-Layer Architecture

### Layer 1 — Data Ingestion & Unification

This is the plumbing. Not AI, but everything depends on it.

**Data sources and connectors:**

```
Gmail API          → Email threads, metadata, open/reply tracking
VoIP webhooks      → Call recordings → transcription pipeline
Google Meet API    → Meeting recordings + auto-transcripts
Fathom webhook     → Pre-structured meeting notes (if connected)
CRM native data    → Deal stages, activity logs, contact records
WhatsApp API       → Message history via Gallabox/Wati (V2)
Calendar API       → Meeting schedules, upcoming calls
```

**Normalization:**

Every event from every source is normalized into a unified interaction object:

```json
{
  "deal_id": "acme_corp_001",
  "workspace_id": "superleap_ws_xyz",
  "event_id": "evt_20251014_call_001",
  "event_type": "call",
  "channel": "google_meet",
  "timestamp": "2025-10-14T15:00:00Z",
  "duration_seconds": 2847,
  "participants": [
    {"name": "Priya Mehta", "role": "prospect", "title": "VP Operations"},
    {"name": "Dilith", "role": "rep", "title": "Account Executive"}
  ],
  "raw_transcript": "...",
  "transcript_url": "...",
  "metadata": {
    "recording_url": "...",
    "meeting_id": "gmeet_xyz"
  }
}
```

This unified timeline is the memory substrate. Every AI component reads from this structure — not from raw API responses.

**Transcription pipeline:**

Audio from VoIP and Meet goes through:
```
Raw audio
    ↓
Speaker diarization (identify who said what)
    ↓
Transcription — Whisper (self-hosted) or Deepgram (API)
    ↓
Structured transcript with timestamps and speaker labels
    ↓
Stored in interaction object
```

Deepgram for latency-sensitive paths (post-call needs to be fast). Whisper for batch processing where cost matters more than speed.

---

### Layer 2 — The Intelligence Engine

**Component A — Contextual Summarization (Pre-Call Brief)**

```
Input:
- Stored deal summary (pre-computed)
- Last 3–5 raw interactions (recent context)
- Upcoming meeting metadata (who, when, what type)

Prompt structure:
System: You are a sales intelligence assistant for a B2B SaaS 
company. Given the deal context and interaction history below, 
produce a structured pre-call brief. Return JSON only.

Output schema:
{
  "last_touchpoint": { "summary": "...", "source_event_id": "..." },
  "open_commitments": [
    { "commitment": "...", "made_on": "...", "source_event_id": "..." }
  ],
  "key_concerns": [
    { "concern": "...", "frequency": 3, "source_event_ids": [...] }
  ],
  "stakeholder_map": [
    { "name": "...", "role": "...", "engaged": true/false }
  ],
  "missing_stakeholders": [...],
  "suggested_focus": "..."
}

Model: Claude Sonnet (cost-performance balance)
Max tokens: 800 output
Temperature: 0.2 (deterministic, factual)
```

Every field in the output carries a `source_event_id`. The UI renders source links automatically — no hallucination risk hidden from the user.

---

**Component B — Entity & Action Extraction (Post-Call)**

```
Input:
- Full call transcript with speaker labels
- Current deal stage and open tasks
- Existing deal memory (to detect new vs repeated items)

Prompt structure:
System: Extract structured information from this B2B sales call 
transcript. Return JSON only. Do not infer — only extract what 
was explicitly discussed.

Output schema:
{
  "call_summary": "3-4 sentence summary",
  "action_items": [
    {
      "action": "Send Salesforce migration estimate",
      "owner": "rep",
      "due_date_suggestion": "next_day",
      "cross_functional": false,
      "tag_team": null
    },
    {
      "action": "Get feature timeline for bulk export",
      "owner": "rep",
      "due_date_suggestion": "this_week",
      "cross_functional": true,
      "tag_team": "product",
      "context": "Prospect asked if bulk export is on roadmap"
    }
  ],
  "commitments_made": [
    {
      "commitment": "Migration timeline is 3-4 weeks",
      "made_by": "rep",
      "timestamp_in_transcript": "00:24:13",
      "verbatim_quote": "..."
    }
  ],
  "new_concerns_raised": [...],
  "new_stakeholders_mentioned": [...],
  "deal_stage_signal": "no_change | advance | risk"
}

Model: Claude Sonnet
Temperature: 0.1 (maximally deterministic)
```

Cross-functional detection works by maintaining a simple mapping:
```
"check with product" → tag: product team
"confirm with legal" → tag: legal team
"ask engineering" → tag: engineering team
"verify with finance" → tag: finance team
```

The LLM identifies the intent, the mapping handles the routing.

---

**Component C — Deal Intelligence Scoring**

Two sub-components working together:

**Signal computation (rules — cheap, runs on every deal):**

```python
def compute_deal_signals(deal):
    return {
        "days_since_last_activity": days_since(deal.last_activity),
        "days_in_current_stage": days_since(deal.stage_entered),
        "avg_days_in_stage_historical": get_historical_avg(deal.stage),
        "stage_velocity_ratio": days_in_stage / avg_days_in_stage,
        "proposal_open_count": get_email_opens(deal.proposal_email_id),
        "committed_followups_overdue": count_overdue_tasks(deal),
        "economic_buyer_engaged": has_economic_buyer_interaction(deal),
        "days_since_champion_contact": days_since_role_contact(deal, "champion"),
        "repeated_objection_count": count_repeated_objections(deal),
        "response_rate_last_5": compute_response_rate(deal, last=5)
    }
```

**Risk threshold gate (cheap filter before expensive LLM call):**

```python
def needs_llm_interpretation(signals):
    # Only call LLM if at least one signal exceeds threshold
    return (
        signals["days_since_last_activity"] > 5 or
        signals["stage_velocity_ratio"] > 1.5 or
        signals["committed_followups_overdue"] > 0 or
        signals["economic_buyer_engaged"] == False and 
            signals["days_in_current_stage"] > 7 or
        signals["proposal_open_count"] > 2 and 
            signals["days_since_last_activity"] > 2
    )
```

**LLM interpretation (only for flagged deals):**

```
Input:
- Computed signals
- Last 3 interactions summary
- Deal stage and history

Prompt:
Given these deal signals and recent interaction context, provide:
1. Risk level: low / medium / high
2. Primary risk reason (one sentence, specific)
3. Recommended action (one sentence, specific and actionable)
4. Urgency: call_today / this_week / monitor

Return JSON only.
```

This gate means in a healthy pipeline of 30 deals, maybe 6–8 get LLM calls per batch run. Not 30. Cost scales with risk, not with deal count.

---

**Component D — Incremental Deal Memory**

The memory substrate stays fresh without reprocessing full history:

```
New interaction event fires
    ↓
Fetch current stored deal summary
    ↓
Prompt:
"Given the existing deal summary below and this new interaction,
produce an updated summary that:
- Preserves all prior commitments and concerns
- Incorporates new information from this interaction
- Flags any contradictions with prior commitments
- Is under 500 words

Existing summary: [stored summary]
New interaction: [normalized event object]"
    ↓
Store updated summary
    ↓
Archive previous version (audit trail)
```

History grows, cost stays flat. Each update processes one new event against a stored summary — not the full raw history.

---

### Layer 3 — Delivery & Surfacing

**How intelligence reaches the rep without them asking:**

```
Triggered delivery:
Calendar event detected → pre-call brief auto-generates
Deal record opened after 3+ days → brief auto-generates

Event-driven delivery:
Call end webhook → post-call pipeline starts immediately
Processing complete → rep sees review card in Superleap

Continuous monitoring:
Scheduled batch job every 6 hours →
  deal intelligence runs across all active deals →
  flagged deals generate nudges →
  nudges appear in rep home feed ranked by urgency
```

**The floating widget:**

A lightweight overlay accessible from anywhere in Superleap — deal record, pipeline view, contact page, home screen. It's a UI shell, not a separate architecture component. It calls the same APIs as the embedded views but renders in a compact format.

---

# PART 4 — ORCHESTRATION

## Overview

SuperPilot is not a single LLM call. It is a pipeline of steps that need to run in order, handle failures gracefully, retry on errors, and coordinate across multiple data sources. The orchestration layer manages this.

Three distinct orchestration patterns — one per moment.

---

## Pattern 1 — Post-Call Processing
*Sequential, event-triggered, latency-tolerant (2–3 min acceptable)*

```
Call end webhook received
    ↓
[Job queued in BullMQ / Celery]
    ↓
Step 1: Fetch recording from VoIP provider
    ↓
Step 2: Transcription — Deepgram API
    ↓
Step 3: Fetch deal context
  (last 5 interactions + stored summary + open tasks)
    ↓
Step 4: LLM extraction
  (tasks, commitments, cross-functional tags, summary)
    ↓
Step 5: Write to CRM
  (create tasks, log call summary, update activity)
    ↓
Step 6: Update deal memory
  (incremental summarization, archive previous)
    ↓
Step 7: Generate follow-up email draft
    ↓
Step 8: Surface review card to rep in Superleap
```

**Failure handling:**
- Each step is independently retryable
- If Step 2 (transcription) fails → retry with backoff, do not proceed
- If Step 7 (email draft) fails → pipeline still completes, email draft skipped
- Dead letter queue for jobs that fail after 3 retries → alert engineering

**Technology:** BullMQ (Node.js) or Celery (Python). Simple, observable, sufficient for V1.

---

## Pattern 2 — Pre-Call Brief
*Parallel fan-out, on-demand, latency-critical (< 10 seconds)*

```
Trigger: meeting scheduled or deal record opened
    ↓
[Orchestrator fires parallel fetches simultaneously]
    ├─ Fetch last 3 email threads — Gmail API (timeout: 3s)
    ├─ Fetch last 2 call transcripts — VoIP API (timeout: 3s)
    ├─ Fetch last meeting notes — Meet/Fathom (timeout: 3s)
    ├─ Fetch deal stage history — CRM internal (timeout: 1s)
    └─ Fetch stored deal summary — Cache (timeout: 0.5s)
    ↓
Wait for all — or proceed at 3s with whatever arrived
    ↓
Merge results into context object
    ↓
LLM summarization — structured JSON output
    ↓
Return to UI
```

**What makes this fast:**

1. **Parallel fetches** — all 5 sources hit simultaneously, not sequentially
2. **Cached deal summary** — LLM doesn't reprocess full history, reads stored summary
3. **Hard timeout at 3s** — if a source is slow, brief generates without it, notes what's missing
4. **UI optimistic loading** — skeleton card shows immediately, content fills in as ready

**Graceful degradation:**
```
Gmail timeout → Brief generated without email context
               Note shown: "Email context unavailable"
VoIP unavailable → Brief generated from CRM + meetings only
All external sources fail → Brief from CRM data + stored summary
                            Still useful, clearly scoped
```

**Technology:** Async/await with Promise.all + timeout wrappers. No heavy framework needed for V1. LangGraph or Temporal as it scales.

---

## Pattern 3 — Deal Intelligence Monitoring
*Scheduled batch, fan-out across deals, cost-optimized*

```
Cron job fires every 6 hours
    ↓
Fetch all active deals for workspace
    ↓
[Fan-out: process each deal in parallel — up to 50 concurrent]
    ↓
For each deal:
  ├─ Compute rule-based signals (cheap — milliseconds)
  ├─ Check threshold gate
  │   ├─ Below threshold → skip, score as "healthy", done
  │   └─ Above threshold →
  │       ├─ Fetch recent interactions (last 7 days)
  │       ├─ Fetch stored deal summary
  │       └─ LLM interpretation → risk level + recommendation
  ↓
Write health score to deal record
Write nudges to rep feed (if action needed)
Log batch run metadata
```

**Cost optimization — the threshold gate:**

```
Without gate: 30 deals × 6 runs/day = 180 LLM calls/day/workspace
With gate: ~20% of deals flagged = 36 LLM calls/day/workspace

At 100 workspaces: 18,000 vs 3,600 LLM calls/day
At Claude Sonnet pricing: significant cost difference at scale
```

The gate is the key engineering decision. Cheap rules first. LLM only when justified.

**Concurrency control:**
Large workspaces with 500+ active deals need rate limiting. Process in batches of 50 concurrent deals. Respect LLM API rate limits. Queue overflow to next batch run.

**Technology:** Cron scheduler (node-cron or Celery beat) + BullMQ for the fan-out jobs.

---

## The Memory Architecture

Deal memory is the foundation everything else reads from. It must stay fresh, stay accurate, and not grow unboundedly expensive.

**The incremental update pattern:**

```
New interaction detected (any channel)
    ↓
Retrieve current stored summary for deal
    ↓
Run delta summarization:

Prompt:
"You are maintaining a running memory document for a B2B sales deal.
Given the existing memory and one new interaction, update the memory.
Preserve all prior commitments. Note any contradictions.
Do not exceed 600 words. Return the full updated memory as JSON."

    ↓
Store updated memory
    ↓
Archive previous version with timestamp
```

**Memory schema:**

```json
{
  "deal_id": "acme_corp_001",
  "last_updated": "2025-10-22T09:00:00Z",
  "version": 14,
  "summary": "Mid-market fintech, 50 reps, migrating from Salesforce...",
  "business_pain": "Ops reporting blocked by migration complexity",
  "commitments_made": [
    {
      "commitment": "3–4 week migration timeline",
      "made_by": "rep",
      "date": "2025-10-14",
      "source_event_id": "evt_001",
      "verbatim": "We can get you live in 3 to 4 weeks from contract sign"
    }
  ],
  "recurring_concerns": [
    { "concern": "Data migration complexity", "frequency": 3 }
  ],
  "stakeholders": [
    { "name": "Priya Mehta", "role": "champion", "last_contact": "2025-10-18" },
    { "name": "Rohan Shah", "role": "technical_evaluator", "last_contact": "2025-10-16" },
    { "name": "CFO", "role": "economic_buyer", "last_contact": null }
  ],
  "success_metrics": ["Live within 6 weeks of contract sign"],
  "open_questions": ["Finance custom report scope not finalized"]
}
```

This is what the pre-call brief, handoff generator, and deal intelligence all read from. One source of truth per deal.

---

## Technology Stack Summary

| Layer | Technology | Why |
|---|---|---|
| Job queue | BullMQ (Node) / Celery (Python) | Simple, observable, retry-native |
| Transcription | Deepgram (real-time) / Whisper (batch) | Speed vs cost tradeoff |
| LLM | Claude Sonnet (primary) | Cost-performance balance |
| Orchestration V1 | Async/await + Promise.all | Sufficient, no overhead |
| Orchestration V2 | Temporal or LangGraph | Durability at scale |
| Memory storage | PostgreSQL + JSONB | Queryable, versioned |
| Cache | Redis | Pre-call brief speed |
| Cron | node-cron / Celery beat | Deal monitoring scheduler |

---

# PART 5 — WHY SUPERLEAP

## Building on Existing Capabilities

SuperPilot is not a new product. It is the connective tissue between capabilities Superleap already has:

| Existing Superleap capability | How SuperPilot extends it |
|---|---|
| SuperFill — post-call notes | Extended to all channels, adds task extraction + cross-functional tagging |
| SuperSense — sentiment detection | Extended across full deal lifecycle, not just single calls |
| Google Meet integration — pre-call context | Extended to every conversation type, every channel |
| Gmail integration — email capture | AI interpretation layer added on top |
| Workflow automations | Replaced by contextual intelligence for deal monitoring |
| Voice Intelligence — transcription | Feeds into unified memory rather than isolated call record |

No new data infrastructure required for V1. The data exists. It just hasn't been interpreted.

## Competitive Positioning

| What exists today | The gap SuperPilot fills |
|---|---|
| Gong — conversation intelligence | Single-call focused, doesn't span full deal lifecycle, $500+/user/yr, US-enterprise priced |
| Clari — deal forecasting | Manager-facing, not rep-facing, forecasting not memory |
| HubSpot AI / Salesforce Einstein | Basic, siloed within their own data, no cross-channel synthesis |
| Superleap SuperFill | Call-level only, not unified across channels |

SuperPilot's wedge: **cross-channel, cross-role institutional memory**, natively inside the CRM, at Indian mid-market pricing.

---

# PART 6 — V1 SCOPE

## What Ships First

| Capability | V1 | V2 |
|---|---|---|
| Pre-call brief (Meet + VoIP) | ✅ | |
| Pre-call brief (email context) | ✅ | |
| Post-call task extraction | ✅ | |
| Cross-functional tagging | ✅ | |
| Follow-up email draft | ✅ | |
| Deal intelligence feed | ✅ | |
| Handoff brief generation | ✅ | |
| Incremental deal memory | ✅ | |
| WhatsApp context synthesis | | ✅ |
| Stakeholder sentiment tracking | | ✅ |
| Predictive deal risk scoring (ML) | | ✅ |
| Manager team-level view | | ✅ |
| Slack/Teams delivery of nudges | | ✅ |

## Data Dependencies

| Signal | Required integration | Status in Superleap |
|---|---|---|
| Call transcripts | VoIP (Ozonetel, Ameyo) | ✅ Integrated |
| Meeting notes | Google Meet | ✅ Integrated |
| Email content | Gmail | ✅ Integrated |
| Deal history | CRM native | ✅ Native |
| Meeting notes (external) | Fathom webhook | Needs connector |
| WhatsApp history | Gallabox/Wati API | ✅ Partner integrated |

---

# PART 7 — THE BUSINESS CASE

## Rep-Level Impact

```
Before SuperPilot:
  Pre-call prep:    15 min × 5 calls = 75 min/day
  Post-call admin:  15 min × 5 calls = 75 min/day
  Total lost:       150 min/day = 2.5 hours

After SuperPilot:
  Pre-call prep:    1 min × 5 calls  = 5 min/day
  Post-call admin:  2 min × 5 calls  = 10 min/day
  Total saved:      ~2 hours/day returned to selling
```

## Team-Level Impact

```
10-rep sales team:
  20 hours of selling time recovered daily
  = 2.5 additional full-time equivalent selling hours
  
At ₹5L average deal value, 3-month sales cycle:
  1 additional deal closed per rep per month from recovered time
  = ₹50L additional revenue potential per rep per year
```

## Beyond Productivity

- Fewer deals lost at handoffs → higher win rate
- Customer doesn't repeat themselves → higher trust, lower churn
- New rep ramp time cut from 3–4 months → 6–8 weeks (deal history accessible from day 1)
- Manager visibility without asking reps for updates

---

# PART 8 — THE PROTOTYPE PLAN

## Four Screens That Tell the Complete Story

**Screen 1 — Rep Home Feed**
Morning view. Prioritized deal list with AI reasons. Three deals: one high risk with specific recommendation, one momentum signal, one overdue action. Floating SuperPilot widget visible.

**Screen 2 — Pre-Call Brief**
Deal record view, 10 minutes before a call. Full brief card: last touchpoint, open commitments with source links, stakeholder map, suggested focus. One-click to start call from same screen.

**Screen 3 — Post-Call Actions**
Review screen after call completes. Auto-generated: call summary, tasks with due dates, cross-functional tag to product team, commitment flagged to deal memory, follow-up email draft. Rep approves in 90 seconds.

**Screen 4 — Handoff Brief**
Deal moved to Implementation stage. New owner sees structured handoff card: why they bought, commitments made with dates, stakeholder map, watch-outs, success metric agreed.

These four screens show the complete workflow: before → during handoff → after → across roles. No architecture diagrams needed in the prototype. The workflow tells the story.

---

*The best CRM doesn't ask the rep to remember everything. It remembers for them.*

---
**SuperPilot — Superleap AI CRM**
*Document version: 1.0 | For internal review and prototype development*

---

# PART 9 — PROTOTYPE BUILD PLAN

## Approach

A fully interactive web application — not a mockup, not a Figma file.
One URL that functions as both a product marketing page and a working CRM demo.

## Stack
React 18 + Vite · Tailwind CSS · Framer Motion · React Router v6 · Vercel

## Build Sequence
- **Phase 1 (Lovable):** Landing page, login, CRM shell, all pages, dummy data, base styling
- **Phase 2 (Claude Code):** SuperPilot components, guided tour, animations, polish

## URL Structure
```
/                    → Landing page (The Story)
/login               → Dummy login
/crm                 → CRM home (Deal Intelligence Feed)
/crm/deals           → Pipeline view
/crm/deals/acme-corp → Deal record (SuperPilot hero screen)
/crm/contacts        → Contacts list
/crm/contacts/:id    → Contact record
```

## The Four Hero Screens
1. CRM home — Deal intelligence feed (morning briefing)
2. Deal record — Pre-call brief (hero moment)
3. Deal record — Post-call actions panel (slide-in)
4. Stage change — Handoff brief modal

## Guided Tour
7-step overlay tour auto-starts after login.
Walks evaluator through every SuperPilot feature in sequence.
Dismissible. Replayable from header.

## Fictional Company
Zephyr Technologies — B2B SaaS (HR Tech), Bengaluru
Logged-in rep: Arjun Sharma, Account Executive
6 active deals, 10 contacts, full activity history

## Full specification
See: superpilot_build_plan.md
