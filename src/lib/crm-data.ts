// Static demo dataset for the SuperPilot CRM prototype.
// Workspace: Zephyr Technologies. Operator: Dilith.

export type DealStage =
  | "Discovery"
  | "Qualified"
  | "Proposal"
  | "Proposal Sent"
  | "Demo Scheduled"
  | "Negotiation"
  | "Legal Review"
  | "Closed Won"
  | "Closed Lost";

export type DealHealth = "on-track" | "at-risk" | "stalled" | "hot" | "momentum" | "action-needed" | "won";

export type Deal = {
  id: string;
  company: string;
  logoSeed: string; // for monogram color
  amount: number;
  stage: DealStage;
  health: DealHealth;
  probability: number;
  closeDate: string;
  owner: string;
  primaryContactId: string;
  industry: string;
  lastTouch: string; // relative
  nextStep: string;
};

export type Contact = {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  avatar?: string;
};

export type IntelKind =
  | "signal"
  | "risk"
  | "next-step"
  | "commitment"
  | "win";

export type DraftPayload =
  | {
      kind: "email";
      to: string;
      subject: string;
      body: string;
    }
  | {
      kind: "meeting";
      to: string;
      title: string;
      proposedTimes: string[];
      body: string;
    }
  | {
      kind: "transcript";
      title: string;
      excerpt: string;
      speaker: string;
    };

export type IntelCard = {
  id: string;
  kind: IntelKind;
  dealId: string;
  headline: string;
  detail: string;
  source: string;
  confidence: number;
  cta: { label: string; verb: "draft" | "schedule" | "review" | "open" };
  timestamp: string;
  draft?: DraftPayload;
};

export const contacts: Contact[] = [
  {
    id: "priya-mehta",
    name: "Priya Mehta",
    title: "VP Operations",
    company: "Acme Corp",
    email: "priya@acmecorp.io",
    phone: "+91 98765 43210",
  },
  {
    id: "rohan-shah",
    name: "Rohan Shah",
    title: "IT Lead",
    company: "Acme Corp",
    email: "rohan@acmecorp.io",
    phone: "+91 98765 43211",
  },
  {
    id: "rahul-nair",
    name: "Rahul Nair",
    title: "CTO",
    company: "TechVentures",
    email: "rahul@techventures.in",
    phone: "+91 98765 43212",
  },
  {
    id: "sneha-pillai",
    name: "Sneha Pillai",
    title: "CEO",
    company: "Buildfast",
    email: "sneha@buildfast.io",
    phone: "+91 98765 43213",
  },
  {
    id: "vikram-shetty",
    name: "Vikram Shetty",
    title: "VP Sales",
    company: "NovaPay",
    email: "vikram@novapay.in",
    phone: "+91 98765 43214",
  },
  {
    id: "anita-rao",
    name: "Anita Rao",
    title: "COO",
    company: "FinCore Systems",
    email: "anita@fincore.in",
    phone: "+91 98765 43215",
  },
  {
    id: "karan-mehta",
    name: "Karan Mehta",
    title: "CTO",
    company: "DataBridge",
    email: "karan@databridge.io",
    phone: "+91 98765 43216",
  },
  {
    id: "aditya-kumar",
    name: "Aditya Kumar",
    title: "Head of Ops",
    company: "NovaPay",
    email: "aditya@novapay.in",
    phone: "+91 98765 43217",
  },
  {
    id: "pooja-singh",
    name: "Pooja Singh",
    title: "IT Manager",
    company: "TechVentures",
    email: "pooja@techventures.in",
    phone: "+91 98765 43218",
  },
  {
    id: "mohit-jain",
    name: "Mohit Jain",
    title: "Finance Head",
    company: "Buildfast",
    email: "mohit@buildfast.io",
    phone: "+91 98765 43219",
  },
];

export const deals: Deal[] = [
  {
    id: "acme-corp",
    company: "Acme Corp",
    logoSeed: "AC",
    amount: 840000,
    stage: "Proposal Sent",
    health: "at-risk",
    probability: 45,
    closeDate: "Nov 30, 2025",
    owner: "Dilith",
    primaryContactId: "priya-mehta",
    industry: "Logistics SaaS",
    lastTouch: "4d ago",
    nextStep: "Deliver migration timeline to Priya, loop in CFO",
  },
  {
    id: "techventures",
    company: "TechVentures",
    logoSeed: "TV",
    amount: 1200000,
    stage: "Legal Review",
    health: "momentum",
    probability: 75,
    closeDate: "Dec 15, 2025",
    owner: "Dilith",
    primaryContactId: "rahul-nair",
    industry: "DevTools",
    lastTouch: "Today",
    nextStep: "Send MSA template, confirm legal review timeline",
  },
  {
    id: "buildfast",
    company: "Buildfast",
    logoSeed: "BF",
    amount: 600000,
    stage: "Negotiation",
    health: "action-needed",
    probability: 55,
    closeDate: "Dec 20, 2025",
    owner: "Dilith",
    primaryContactId: "sneha-pillai",
    industry: "Construction Tech",
    lastTouch: "5d ago",
    nextStep: "Send overdue case study to Sneha",
  },
  {
    id: "novapay",
    company: "NovaPay",
    logoSeed: "NP",
    amount: 1500000,
    stage: "Discovery",
    health: "on-track",
    probability: 30,
    closeDate: "Feb 28, 2026",
    owner: "Dilith",
    primaryContactId: "vikram-shetty",
    industry: "Fintech",
    lastTouch: "Yesterday",
    nextStep: "Discovery call with operations lead",
  },
  {
    id: "fincore-systems",
    company: "FinCore Systems",
    logoSeed: "FC",
    amount: 960000,
    stage: "Demo Scheduled",
    health: "on-track",
    probability: 40,
    closeDate: "Jan 15, 2026",
    owner: "Dilith",
    primaryContactId: "anita-rao",
    industry: "Financial Services",
    lastTouch: "2d ago",
    nextStep: "Demo at 2pm Thursday — prep sandbox",
  },
  {
    id: "databridge",
    company: "DataBridge",
    logoSeed: "DB",
    amount: 720000,
    stage: "Closed Won",
    health: "won",
    probability: 100,
    closeDate: "Oct 15, 2025",
    owner: "Dilith",
    primaryContactId: "karan-mehta",
    industry: "Data Infrastructure",
    lastTouch: "1 week ago",
    nextStep: "Implementation handoff complete",
  },
];

export const intelFeed: IntelCard[] = [
  {
    id: "intel-acme-risk",
    kind: "risk",
    dealId: "acme-corp",
    headline: "Proposal opened 4 times. No response in 4 days.",
    detail:
      "CFO not engaged. Day 9 at proposal stage (avg: 5). Priya opened the proposal on Oct 12, 15, 19, and 22 — but hasn't replied. Call today. Ask if CFO has reviewed. Offer a 15-min exec summary call.",
    source: "Email analytics · Doc tracking",
    confidence: 91,
    cta: { label: "View deal", verb: "open" },
    timestamp: "3h ago",
  },
  {
    id: "intel-techventures-momentum",
    kind: "signal",
    dealId: "techventures",
    headline: "Champion replied within 2hrs. IT approved vendor.",
    detail:
      "Rahul replied to the proposal within 2 hours of receipt. IT team approved vendor status this morning. Legal review is starting — ready to move stage. Send MSA template now.",
    source: "Email thread · IT approval notification",
    confidence: 89,
    cta: { label: "View deal", verb: "open" },
    timestamp: "2h ago",
  },
  {
    id: "intel-buildfast-action",
    kind: "next-step",
    dealId: "buildfast",
    headline: "Case study promised Tuesday. Not sent. 3 days overdue.",
    detail:
      "You committed to send the construction sector case study on Tuesday's call with Sneha. She hasn't followed up yet but Negotiation stage is stalling — send now before momentum drops.",
    source: "Call · Oct 19 · 22 min",
    confidence: 95,
    cta: { label: "Draft email", verb: "draft" },
    timestamp: "Yesterday",
    draft: {
      kind: "email",
      to: "sneha@buildfast.io",
      subject: "Case study — as promised from Tuesday's call",
      body: `Hi Sneha,

Apologies for the delay — attached is the construction sector case study I mentioned on our call.

Key highlights for your use case:
  • Mid-size contractor with similar project complexity: 38% reduction in procurement overhead
  • Integrated with existing ERP in under 3 weeks, zero downtime
  • Field team onboarded within the first sprint

Happy to walk through the specifics on a quick call if it helps your internal review. Let me know.

Dilith`,
    },
  },
  {
    id: "intel-databridge-signal",
    kind: "signal",
    dealId: "databridge",
    headline: "DataBridge handoff completed successfully",
    detail:
      "Implementation team confirmed go-live last week. Karan sent a positive note on the onboarding experience — worth capturing as a reference case.",
    source: "Email · Oct 15",
    confidence: 94,
    cta: { label: "Review transcript", verb: "review" },
    timestamp: "1 week ago",
    draft: {
      kind: "transcript",
      title: "DataBridge — Go-live confirmation",
      speaker: "Karan Mehta · Oct 15",
      excerpt: `…the migration was cleaner than anything we've done before. Your team actually finished 4 days ahead of schedule, which gave us runway to do a proper UAT before we went live.

The data team is already running reports they couldn't run before. That's the real measure for us.

I'm happy to be a reference for you — just let me know what format works best.`,
    },
  },
  {
    id: "intel-fincore-risk",
    kind: "risk",
    dealId: "fincore-systems",
    headline: "Demo is Thursday — prep sandbox with FinCore's data shape",
    detail:
      "Anita confirmed the COO and two VPs will be on the Thursday demo. This is the decision call — generic demo will not land. Build a financial services sandbox before Wed EOD.",
    source: "Email · 2d ago",
    confidence: 87,
    cta: { label: "Schedule prep", verb: "schedule" },
    timestamp: "2d ago",
    draft: {
      kind: "meeting",
      to: "anya@zephyrtech.io",
      title: "FinCore demo prep — sandbox build",
      proposedTimes: [
        "Wed, Oct 22 · 2:00–3:30pm IST",
        "Wed, Oct 22 · 4:00–5:00pm IST",
      ],
      body: `Hi Anya,

Need your help building the FinCore sandbox before Thursday. They're bringing their COO and two VPs to the demo — this is the decision call.

Key data shapes to replicate:
  • Multi-entity chart of accounts (they have 4 subsidiaries)
  • FX reconciliation workflow
  • Compliance reporting (RBI format)

Sending two slots — pick one and I'll block it.

Dilith`,
    },
  },
];

// ---- helpers

export function getDeal(id: string) {
  return deals.find((d) => d.id === id);
}

export function getContact(id: string) {
  return contacts.find((c) => c.id === id);
}

export function getDealsForContact(contactId: string) {
  return deals.filter((d) => d.primaryContactId === contactId);
}

export function getContactBrief(id: string) {
  return contactBriefs[id];
}

// ---- contact brief ----

export type ContactBrief = {
  contactId: string;
  relationship: string;
  role: "Economic Buyer" | "Champion" | "Technical Evaluator" | "Blocker" | "Influencer";
  sentiment: "warm" | "neutral" | "cold";
  lastInteraction: string;
  knownFor: string[];
  watchOuts: string[];
  recentMoments: { at: string; what: string }[];
};

export const contactBriefs: Record<string, ContactBrief> = {
  "priya-mehta": {
    contactId: "priya-mehta",
    relationship:
      "Strong relationship but stalling on a critical decision. Priya is the champion — she's internally aligned but the CFO hasn't been looped in yet. She responds well to specifics and data.",
    role: "Champion",
    sentiment: "warm",
    lastInteraction: "Email · Oct 22 (no reply yet)",
    knownFor: [
      "Decides on time-to-value, not lowest price",
      "Background in operations — speaks in workflow terms, not features",
      "Opened the proposal 4 times — she's reviewing, not ignoring",
    ],
    watchOuts: [
      "CFO approval required — Priya cannot sign alone",
      "You owe her 2 open commitments: migration timeline + Chargebee doc",
    ],
    recentMoments: [
      { at: "Oct 22", what: "Sent follow-up email asking about migration timeline estimate." },
      { at: "Oct 18", what: "Arjun sent post-call notes. Priya acknowledged but no action yet." },
      { at: "Oct 16", what: "Google Meet (34 min) — Rohan joined, Chargebee integration discussed." },
      { at: "Oct 14", what: "Google Meet (47 min) — Proposal walkthrough, migration commitment made." },
    ],
  },
  "rohan-shah": {
    contactId: "rohan-shah",
    relationship:
      "Technical evaluator who is engaged and positive. Rohan needs infra sign-off before Priya can move — keep him informed and give him clear documentation.",
    role: "Technical Evaluator",
    sentiment: "warm",
    lastInteraction: "Google Meet · Oct 16",
    knownFor: [
      "IT Lead — controls infra approval process",
      "Systematic and documentation-driven",
      "Responded positively to Chargebee integration discussion",
    ],
    watchOuts: [
      "IT approval can add 1 week to any timeline — factor this in",
      "Needs Chargebee integration doc before he'll sign off",
    ],
    recentMoments: [
      { at: "Oct 16", what: "Joined Google Meet. Asked detailed questions about Chargebee integration." },
      { at: "Oct 10", what: "Introduced by Priya on Discovery call as the technical evaluator." },
    ],
  },
  "rahul-nair": {
    contactId: "rahul-nair",
    relationship:
      "Fast-moving technical buyer. Rahul replied to the proposal within 2 hours — strong positive signal. IT has approved vendor status. He wants a clean path to legal sign-off.",
    role: "Champion",
    sentiment: "warm",
    lastInteraction: "Email reply · Today",
    knownFor: [
      "CTO — owns technical and vendor decisions",
      "Replies fast when interested — 2hr response is a strong buy signal",
      "IT team approval already secured",
    ],
    watchOuts: [
      "Legal review may take 2–3 weeks — set expectation early",
      "Needs MSA template sent today to keep momentum",
    ],
    recentMoments: [
      { at: "Today", what: "Replied to proposal email within 2 hours. IT approved vendor." },
      { at: "Oct 18", what: "Received proposal — forwarded to IT team for review." },
      { at: "Oct 14", what: "Demo call — asked technical architecture questions." },
    ],
  },
  "sneha-pillai": {
    contactId: "sneha-pillai",
    relationship:
      "CEO-level champion who moves fast but needs follow-through on commitments. Sneha is frustrated the case study wasn't sent on time — re-engage with it immediately.",
    role: "Economic Buyer",
    sentiment: "neutral",
    lastInteraction: "Call · Oct 19 (5d ago)",
    knownFor: [
      "CEO — makes final calls quickly once she has what she needs",
      "Holds vendors accountable to commitments made on calls",
      "Actively comparing 2 vendors in parallel",
    ],
    watchOuts: [
      "Case study commitment was 3 days ago — every day of delay erodes credibility",
      "Competitor may be moving faster — don't lose the window",
    ],
    recentMoments: [
      { at: "Oct 19", what: "Call (22 min) — Arjun promised to send case study by Tuesday." },
      { at: "Oct 15", what: "Negotiation call — pricing discussion, near agreement on terms." },
      { at: "Oct 08", what: "Demo — Sneha brought in CFO for second half." },
    ],
  },
  "vikram-shetty": {
    contactId: "vikram-shetty",
    relationship:
      "Curious, well-aligned. Vikram is exploring and sees the value — but this is early stage. He needs to bring in Aditya (Head of Ops) to validate the workflow fit.",
    role: "Influencer",
    sentiment: "neutral",
    lastInteraction: "Email · Yesterday",
    knownFor: [
      "VP Sales — sees the problem from revenue ops angle",
      "Has internal political capital but isn't the budget owner",
      "Brought Aditya into the thread proactively",
    ],
    watchOuts: [
      "No exec sponsor yet — fintech procurement is slow without one",
      "Aditya will evaluate fit from an ops workflow perspective",
    ],
    recentMoments: [
      { at: "Yesterday", what: "Email thread — Vikram added Aditya Kumar to the conversation." },
      { at: "Oct 18", what: "Intro call (30 min) — framed it as \"too many tools, not enough visibility.\"" },
    ],
  },
  "anita-rao": {
    contactId: "anita-rao",
    relationship:
      "Decisive COO who runs a tight evaluation process. Thursday is the decision demo — she's bringing two VPs. This is not a discovery call, it's the shortlist presentation.",
    role: "Economic Buyer",
    sentiment: "warm",
    lastInteraction: "Email · 2d ago",
    knownFor: [
      "COO — owns vendor decisions across operations",
      "Runs structured evaluations with scorecards",
      "Confirmed Thursday demo is a decision-making session",
    ],
    watchOuts: [
      "Two VPs will be on the call — need the sandbox to reflect their data shape",
      "FinCore is a regulated entity — compliance reporting is a must-have, not a nice-to-have",
    ],
    recentMoments: [
      { at: "2d ago", what: "Confirmed Thursday demo. Said COO and two VPs will attend." },
      { at: "Oct 16", what: "Discovery call (45 min) — detailed requirements on multi-entity reporting." },
    ],
  },
  "karan-mehta": {
    contactId: "karan-mehta",
    relationship:
      "Deal is won. Karan was the technical champion and confirmed go-live last week. Strong reference potential — he is on record praising the onboarding speed.",
    role: "Champion",
    sentiment: "warm",
    lastInteraction: "Email · Oct 15 (go-live)",
    knownFor: [
      "CTO — drove the technical evaluation and sign-off",
      "Happy reference — cited 4-day-ahead delivery on go-live",
      "Good for case study and peer reference calls",
    ],
    watchOuts: [
      "Relationship is warm — nurture for expansion and referrals",
      "CSM handoff is complete; maintain light-touch contact",
    ],
    recentMoments: [
      { at: "Oct 15", what: "Go-live confirmed. Sent positive note on onboarding experience." },
      { at: "Oct 08", what: "Implementation kickoff — introduced the internal team." },
    ],
  },
  "aditya-kumar": {
    contactId: "aditya-kumar",
    relationship:
      "Recently pulled into the NovaPay evaluation by Vikram. Aditya is the ops lead who will live with the product day-to-day — his buy-in is required before the deal advances.",
    role: "Influencer",
    sentiment: "neutral",
    lastInteraction: "Added to email thread · Yesterday",
    knownFor: [
      "Head of Ops — manages the workflows SuperPilot would automate",
      "Practical evaluator — cares about day-to-day usability, not strategy",
      "New to the conversation; hasn't seen a demo yet",
    ],
    watchOuts: [
      "First impression hasn't happened yet — next interaction is critical",
      "Won't commit without seeing the product handle a workflow he recognizes",
    ],
    recentMoments: [
      { at: "Yesterday", what: "Added to email thread by Vikram. No response yet." },
    ],
  },
  "pooja-singh": {
    contactId: "pooja-singh",
    relationship:
      "IT Manager at TechVentures who handles vendor security and integration review. Pooja was part of the IT approval this morning — she's a positive signal in the legal review stage.",
    role: "Technical Evaluator",
    sentiment: "warm",
    lastInteraction: "IT approval · Today",
    knownFor: [
      "IT Manager — runs vendor security review and integration approvals",
      "Fast turnaround on approvals when documentation is clean",
      "Part of the team that approved vendor status today",
    ],
    watchOuts: [
      "May want a security architecture walkthrough during legal review",
      "Keep SOC 2 doc accessible — likely to ask for it",
    ],
    recentMoments: [
      { at: "Today", what: "Approved vendor status alongside Rahul's IT team review." },
    ],
  },
  "mohit-jain": {
    contactId: "mohit-jain",
    relationship:
      "Finance Head at Buildfast who will need to approve the final contract terms. Not yet engaged — Sneha will bring him in once the case study clears the initial review.",
    role: "Influencer",
    sentiment: "neutral",
    lastInteraction: "Not yet engaged",
    knownFor: [
      "Finance Head — approves vendor contracts and payment terms",
      "Not in active conversations yet",
      "Will need to sign off on Negotiation stage pricing",
    ],
    watchOuts: [
      "Engagement timing unknown — Sneha controls when he's looped in",
      "Likely to push back on payment terms if not structured clearly",
    ],
    recentMoments: [],
  },
};


export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const pipelineTotal = deals
  .filter((d) => d.stage !== "Closed Lost" && d.stage !== "Closed Won")
  .reduce((sum, d) => sum + d.amount, 0);

export const weightedTotal = deals
  .filter((d) => d.stage !== "Closed Lost" && d.stage !== "Closed Won")
  .reduce((sum, d) => sum + d.amount * (d.probability / 100), 0);

// ---- deal record ----

export type TimelineEvent = {
  id: string;
  kind: "call" | "email" | "meeting" | "note" | "doc" | "stage" | "signal";
  title: string;
  detail: string;
  actor: string;
  at: string;
  highlight?: boolean; // true = AI badge (SuperPilot processed)
};

export type PreCallBrief = {
  callIn: string;
  goal: string;
  talkingPoints: string[];
  risks: string[];
  opener: string;
  // Spec layout fields — when present, renders spec sections above the existing layout
  lastTouchpoint?: { summary: string; date: string; viewLink?: string };
  openCommitments?: { text: string; date: string }[];
  keyConcerns?: { text: string; freq: number }[];
  stakeholders?: { name: string; title: string; role: string; engaged: boolean }[];
  suggestedFocus?: string;
};

export type DealRecord = {
  dealId: string;
  brief?: PreCallBrief;
  summary: string;
  competitors: string[];
  champions: string[];
  blockers: string[];
  timeline: TimelineEvent[];
  contactIds: string[];
};

export const dealRecords: Record<string, DealRecord> = {
  "acme-corp": {
    dealId: "acme-corp",
    summary:
      "Acme Corp is migrating from Salesforce to handle a new fulfillment network. Priya (VP Ops) is the champion; CFO approval is the remaining gate. Proposal has been sent — deal is at risk due to no response in 4 days.",
    competitors: ["Salesforce", "Zoho CRM"],
    champions: ["Priya Mehta — VP Operations"],
    blockers: ["CFO not yet engaged", "2 open commitments undelivered (migration timeline, Chargebee doc)"],
    contactIds: ["priya-mehta", "rohan-shah"],
    brief: {
      callIn: "Today 3:00 PM · 30 min",
      goal: "Deliver the migration timeline estimate, address Chargebee integration, and propose a CFO intro call to unblock the deal.",
      talkingPoints: [
        "Acknowledge Priya's Oct 22 email — apologise for the delay on the timeline estimate, deliver it on this call.",
        "Walk through the 3–4 week migration plan week by week — make it concrete, not a range.",
        "Share the Chargebee integration doc proactively — Rohan needs this before IT can approve.",
        "Propose a 15-min exec summary call with the CFO before end of next week.",
      ],
      risks: [
        "Migration timeline estimate is 4 days overdue — credibility is at stake.",
        "CFO has not been engaged after 9 days at proposal stage (avg: 5 days).",
      ],
      opener:
        "Hey Priya — I have the migration timeline ready. Let me walk you through it, and then let's figure out the best way to loop in your CFO.",
      // Spec layout fields
      lastTouchpoint: {
        summary: "Priya asked about Salesforce migration timeline. You said you'd follow up with an estimate. Not sent yet.",
        date: "Oct 18 · Email",
      },
      openCommitments: [
        { text: "Migration timeline estimate", date: "promised Oct 14" },
        { text: "Chargebee integration doc", date: "promised Oct 16" },
      ],
      keyConcerns: [
        { text: "Data migration complexity", freq: 3 },
        { text: "Chargebee billing integration", freq: 2 },
        { text: "IT approval requirement", freq: 1 },
      ],
      stakeholders: [
        { name: "Priya Mehta", title: "VP Operations", role: "Champion", engaged: true },
        { name: "Rohan Shah", title: "IT Lead", role: "Evaluator", engaged: true },
        { name: "CFO", title: "Economic buyer", role: "Economic Buyer", engaged: false },
      ],
      suggestedFocus:
        "Address migration timeline gap. CFO needs to be looped in before deal can advance.",
    },
    timeline: [
      {
        id: "t-1",
        kind: "email",
        title: "Priya followed up on migration timeline",
        detail:
          "Inbound: \"Hi Arjun, just checking in on the migration timeline estimate you mentioned on our last call. Any update?\" No reply sent yet.",
        actor: "Priya Mehta",
        at: "Oct 22",
        highlight: false,
      },
      {
        id: "t-2",
        kind: "email",
        title: "Post-call follow-up sent",
        detail:
          "Outbound: \"Hi Priya, great speaking on Thursday. Notes and next steps attached. Will follow up on the migration timeline by end of week.\"",
        actor: "Dilith",
        at: "Oct 18",
        highlight: false,
      },
      {
        id: "t-3",
        kind: "call",
        title: "Google Meet · 34 min · SuperPilot processed",
        detail:
          "Participants: Dilith, Priya Mehta, Rohan Shah. Chargebee integration discussed in detail. SuperPilot extracted 4 action items and 1 commitment.",
        actor: "Dilith ↔ Priya Mehta ↔ Rohan Shah",
        at: "Oct 16",
        highlight: true,
      },
      {
        id: "t-4",
        kind: "call",
        title: "Google Meet · 47 min · SuperPilot processed",
        detail:
          "Participants: Dilith, Priya Mehta. Proposal walkthrough. Arjun committed to 3–4 week migration timeline from contract sign. SuperPilot captured 3 commitments.",
        actor: "Dilith ↔ Priya Mehta",
        at: "Oct 14",
        highlight: true,
      },
      {
        id: "t-5",
        kind: "doc",
        title: "Proposal sent — ₹8,40,000/yr",
        detail:
          "Outbound email: \"Priya, as discussed, please find the proposal attached.\" Proposal PDF attached. Opened 4 times (Oct 12, 15, 19, 22).",
        actor: "Dilith",
        at: "Oct 12",
        highlight: false,
      },
      {
        id: "t-6",
        kind: "meeting",
        title: "Discovery Call · 52 min · SuperPilot processed",
        detail:
          "Google Meet. Data migration complexity flagged as primary concern (mentioned 3×). SuperPilot processed transcript and updated deal memory.",
        actor: "Dilith ↔ Priya Mehta",
        at: "Oct 10",
        highlight: true,
      },
      {
        id: "t-7",
        kind: "email",
        title: "Post-discovery summary sent",
        detail:
          "Outbound: \"Thanks for your time yesterday. Here's a summary of what we discussed and the proposed next steps.\"",
        actor: "Dilith",
        at: "Oct 07",
        highlight: false,
      },
      {
        id: "t-8",
        kind: "email",
        title: "Inbound inquiry from Priya",
        detail:
          "Inbound: \"Hi, I came across Superleap and wanted to learn more about how it handles data migration from Salesforce. We're a team of 50 reps.\"",
        actor: "Priya Mehta",
        at: "Oct 05",
        highlight: false,
      },
    ],
  },
  "techventures": {
    dealId: "techventures",
    summary:
      "TechVentures is evaluating Superleap as their primary sales intelligence layer. Rahul (CTO) is the champion; IT approved vendor status today and legal review is starting.",
    competitors: ["Gong", "Chorus"],
    champions: ["Rahul Nair — CTO"],
    blockers: ["Legal review timeline (2–3 weeks)"],
    contactIds: ["rahul-nair", "pooja-singh"],
    brief: {
      callIn: "No call scheduled · send MSA today",
      goal: "Keep momentum — send MSA template, confirm legal reviewer name, and set a signature target of Dec 5.",
      talkingPoints: [
        "Congratulate Rahul on fast IT approval — reinforce that we move at the pace they move.",
        "Send the MSA template immediately after this interaction.",
        "Ask for the legal contact name so we can work directly with their team.",
        "Propose Dec 5 as signature target — gives legal 2 weeks.",
      ],
      risks: [
        "Legal review can stall if we don't stay proactive with the legal team.",
        "Board review pressure may create artificial urgency — don't over-push.",
      ],
      opener:
        "Rahul — IT approval came through faster than expected. I'm sending the MSA now. Who on your legal team should I copy?",
    },
    timeline: [
      {
        id: "tv-1",
        kind: "signal",
        title: "IT approved vendor — champion replied within 2hrs",
        detail: "Rahul replied to proposal email within 2 hours. IT vendor approval confirmed this morning.",
        actor: "SuperPilot",
        at: "Today",
        highlight: true,
      },
      {
        id: "tv-2",
        kind: "doc",
        title: "Proposal sent — ₹12,00,000/yr",
        detail: "Proposal v1 sent. Rahul acknowledged receipt.",
        actor: "Dilith",
        at: "Oct 18",
      },
      {
        id: "tv-3",
        kind: "meeting",
        title: "Demo call · 45 min",
        detail: "Technical demo with Rahul and Pooja. Strong positive signals.",
        actor: "Dilith",
        at: "Oct 14",
      },
    ],
  },
  "buildfast": {
    dealId: "buildfast",
    summary:
      "Buildfast is in active negotiation but stalling due to a missed follow-up. Sneha (CEO) is the decision-maker and is comparing two vendors. The overdue case study is a credibility risk.",
    competitors: ["Salesforce", "Freshsales"],
    champions: ["Sneha Pillai — CEO"],
    blockers: ["Overdue case study (3 days)", "Mohit Jain (Finance Head) not yet engaged"],
    contactIds: ["sneha-pillai", "mohit-jain"],
    brief: {
      callIn: "No call scheduled · async outreach",
      goal: "Re-establish credibility by sending the overdue case study today. Propose a quick call to walk through pricing terms.",
      talkingPoints: [
        "Lead with the case study — don't reference the delay, just deliver.",
        "Attach a one-paragraph personalisation connecting the case study to Buildfast's use case.",
        "Propose a 20-min call to walk through any questions on pricing terms.",
      ],
      risks: [
        "3-day delay on a promised deliverable at Negotiation stage is a trust risk.",
        "Competing vendor may not have this gap — act today.",
      ],
      opener:
        "Hi Sneha — sending the case study I mentioned on Tuesday. Let me know if a 20-min call to walk through pricing makes sense this week.",
    },
    timeline: [
      {
        id: "bf-1",
        kind: "signal",
        title: "Case study commitment overdue — 3 days",
        detail: "Committed on Oct 19 call. Not sent. SuperPilot flagged re-engage urgency.",
        actor: "SuperPilot",
        at: "Today",
        highlight: true,
      },
      {
        id: "bf-2",
        kind: "call",
        title: "Negotiation call · 22 min",
        detail: "Pricing near agreement. Sneha asked for construction case study. Arjun committed to send by Tuesday.",
        actor: "Dilith ↔ Sneha Pillai",
        at: "Oct 19",
      },
      {
        id: "bf-3",
        kind: "meeting",
        title: "Demo · 60 min",
        detail: "Sneha brought CFO (Mohit) for second half. Strong interest in negotiation workflow features.",
        actor: "Dilith",
        at: "Oct 08",
      },
    ],
  },
  "novapay": {
    dealId: "novapay",
    summary:
      "Early discovery stage. Vikram (VP Sales) is exploring and has looped in Aditya (Head of Ops). Good signals but no exec sponsor yet.",
    competitors: [],
    champions: ["Vikram Shetty — VP Sales"],
    blockers: ["No exec sponsor yet", "Aditya Kumar not yet seen product"],
    contactIds: ["vikram-shetty", "aditya-kumar"],
    brief: {
      callIn: "No call scheduled · follow-up email",
      goal: "Welcome Aditya to the conversation and propose a product walkthrough tailored to ops workflows.",
      talkingPoints: [
        "Acknowledge Vikram adding Aditya — good sign of internal momentum.",
        "Offer a 30-min workflow-focused walkthrough specifically for Aditya.",
        "Float pricing range early to qualify — deals like this typically land ₹12–18L.",
      ],
      risks: [
        "No exec sponsor means this could stay at VP level indefinitely.",
        "Healthcare-style long procurement cycles if no CFO engagement soon.",
      ],
      opener:
        "Hi Vikram and Aditya — great to have you both on this thread. Aditya, would a 30-min ops workflow walkthrough be useful before we go further?",
    },
    timeline: [
      {
        id: "np-1",
        kind: "signal",
        title: "Aditya Kumar added to email thread",
        detail: "Vikram looped in Head of Ops unprompted — positive multi-threading signal.",
        actor: "SuperPilot",
        at: "Yesterday",
        highlight: true,
      },
      {
        id: "np-2",
        kind: "email",
        title: "Intro thread — Vikram framed the problem",
        detail: "\"Too many tools, not enough visibility across the sales org.\"",
        actor: "Vikram Shetty",
        at: "Oct 18",
      },
    ],
  },
  "fincore-systems": {
    dealId: "fincore-systems",
    summary:
      "FinCore Systems has a Thursday demo scheduled that is effectively the shortlist decision. Anita (COO) is bringing two VPs — this is the decision call.",
    competitors: ["Salesforce Financial Services Cloud"],
    champions: ["Anita Rao — COO"],
    blockers: ["Demo must land — no sandbox built yet for their data shape"],
    contactIds: ["anita-rao"],
    brief: {
      callIn: "Thursday 2:00 PM · 60 min",
      goal: "Win technical conviction from the COO and two VPs. Show a FinCore-shaped sandbox with multi-entity reporting and compliance workflows.",
      talkingPoints: [
        "Open with the multi-entity chart of accounts — this is the primary differentiator from Salesforce FSC.",
        "Show RBI-format compliance reports live — not a slide, the actual output.",
        "Surface the 3-week integration timeline — FinCore has been burned by long implementations before.",
        "Close with a clear next step: send MSA by Friday for Dec 15 close.",
      ],
      risks: [
        "If sandbox isn't built with FinCore's data shape, the demo will feel generic.",
        "COO and two VPs means multiple decision criteria in the room — have answers ready.",
      ],
      opener:
        "Anita — I've preloaded a sandbox with a multi-entity chart of accounts that mirrors your structure. Let's start there.",
    },
    timeline: [
      {
        id: "fc-1",
        kind: "signal",
        title: "Thursday demo confirmed — COO and 2 VPs attending",
        detail: "This is a decision-making session, not a discovery call. Build the sandbox today.",
        actor: "SuperPilot",
        at: "2d ago",
        highlight: true,
      },
      {
        id: "fc-2",
        kind: "meeting",
        title: "Discovery call · 45 min",
        detail: "Anita detailed multi-entity reporting requirements and RBI compliance needs.",
        actor: "Dilith ↔ Anita Rao",
        at: "Oct 16",
      },
    ],
  },
  "databridge": {
    dealId: "databridge",
    summary:
      "DataBridge closed on Oct 15. Karan (CTO) confirmed go-live with strong positive feedback. Implementation completed 4 days ahead of schedule. Strong reference and expansion candidate.",
    competitors: [],
    champions: ["Karan Mehta — CTO"],
    blockers: [],
    contactIds: ["karan-mehta"],
    timeline: [
      {
        id: "db-1",
        kind: "stage",
        title: "Go-live confirmed — 4 days ahead of schedule",
        detail: "Karan sent a positive go-live confirmation. Team is running reports they couldn't run before.",
        actor: "Karan Mehta",
        at: "Oct 15",
        highlight: true,
      },
      {
        id: "db-2",
        kind: "meeting",
        title: "Implementation kickoff",
        detail: "Internal team introduced. Migration started on schedule.",
        actor: "Dilith + Implementation Team",
        at: "Oct 08",
      },
      {
        id: "db-3",
        kind: "stage",
        title: "Contract signed — Closed Won",
        detail: "₹7,20,000/yr ARR. MSA and DPA signed.",
        actor: "SuperPilot",
        at: "Oct 01",
      },
    ],
  },
};

export function getDealRecord(id: string): DealRecord | undefined {
  return dealRecords[id];
}

// ---- tasks ----

export type TaskKind = "commitment" | "follow-up" | "risk" | "next-step" | "note";

export type TaskPriority = "critical" | "high" | "medium" | "low";

export type TaskStatus = "open" | "done" | "snoozed";

export type Task = {
  id: string;
  dealId: string;
  headline: string;
  detail: string;
  kind: TaskKind;
  priority: TaskPriority;
  status: TaskStatus;
  dueGroup: "today" | "this-week" | "later";
  dealLabel: string;
  contactLabel?: string;
};

export const tasks: Task[] = [
  {
    id: "task-1",
    dealId: "acme-corp",
    headline: "Deliver migration timeline estimate to Priya",
    detail:
      "Committed on Oct 14 call. Overdue by 4 days. Priya followed up on Oct 22. Send before today's 3pm call.",
    kind: "commitment",
    priority: "critical",
    status: "open",
    dueGroup: "today",
    dealLabel: "Acme Corp",
    contactLabel: "Priya Mehta",
  },
  {
    id: "task-2",
    dealId: "acme-corp",
    headline: "Send Chargebee integration doc to Rohan",
    detail:
      "Committed on Oct 16 call. Rohan needs this before IT can approve. Overdue — send today.",
    kind: "commitment",
    priority: "critical",
    status: "open",
    dueGroup: "today",
    dealLabel: "Acme Corp",
    contactLabel: "Rohan Shah",
  },
  {
    id: "task-3",
    dealId: "buildfast",
    headline: "Send overdue case study to Sneha",
    detail:
      "Promised on Oct 19 call. 3 days overdue. Sneha is comparing two vendors — delay is a credibility risk.",
    kind: "commitment",
    priority: "high",
    status: "open",
    dueGroup: "today",
    dealLabel: "Buildfast",
    contactLabel: "Sneha Pillai",
  },
  {
    id: "task-4",
    dealId: "techventures",
    headline: "Send MSA template to Rahul",
    detail:
      "IT approved vendor status today. Momentum is high — send MSA today to keep legal review moving.",
    kind: "next-step",
    priority: "high",
    status: "open",
    dueGroup: "today",
    dealLabel: "TechVentures",
    contactLabel: "Rahul Nair",
  },
  {
    id: "task-5",
    dealId: "acme-corp",
    headline: "Propose CFO intro call to Priya",
    detail:
      "CFO not engaged after 9 days. Deal cannot advance without CFO sign-off — raise this on today's 3pm call.",
    kind: "next-step",
    priority: "high",
    status: "open",
    dueGroup: "today",
    dealLabel: "Acme Corp",
    contactLabel: "Priya Mehta",
  },
  {
    id: "task-6",
    dealId: "fincore-systems",
    headline: "Build FinCore sandbox before Thursday demo",
    detail:
      "Multi-entity chart of accounts, RBI compliance reporting. COO and 2 VPs will be on the call — generic demo will not land.",
    kind: "next-step",
    priority: "critical",
    status: "open",
    dueGroup: "this-week",
    dealLabel: "FinCore Systems",
    contactLabel: "Anita Rao",
  },
  {
    id: "task-7",
    dealId: "novapay",
    headline: "Welcome Aditya Kumar — propose ops walkthrough",
    detail:
      "Vikram looped in Head of Ops. First impression with Aditya matters — send a personalised intro today.",
    kind: "follow-up",
    priority: "medium",
    status: "open",
    dueGroup: "this-week",
    dealLabel: "NovaPay",
    contactLabel: "Aditya Kumar",
  },
  {
    id: "task-8",
    dealId: "techventures",
    headline: "Get legal contact name from Rahul",
    detail:
      "Need the legal reviewer's name to work directly with TechVentures legal team and keep the review moving.",
    kind: "follow-up",
    priority: "medium",
    status: "open",
    dueGroup: "this-week",
    dealLabel: "TechVentures",
    contactLabel: "Rahul Nair",
  },
  {
    id: "task-9",
    dealId: "databridge",
    headline: "Request reference from Karan Mehta",
    detail:
      "Go-live confirmed. Karan offered to be a reference — formalise this while sentiment is high.",
    kind: "follow-up",
    priority: "medium",
    status: "open",
    dueGroup: "later",
    dealLabel: "DataBridge",
    contactLabel: "Karan Mehta",
  },
  {
    id: "task-10",
    dealId: "buildfast",
    headline: "Schedule pricing walkthrough with Sneha",
    detail:
      "After case study is sent, propose a 20-min call to walk through contract terms and get Mohit (Finance) engaged.",
    kind: "next-step",
    priority: "medium",
    status: "open",
    dueGroup: "this-week",
    dealLabel: "Buildfast",
    contactLabel: "Sneha Pillai",
  },
];

export const openTaskCount = tasks.filter((t) => t.status === "open").length;
export const todayTaskCount = tasks.filter((t) => t.status === "open" && t.dueGroup === "today").length;

// ---- inbox / comms ----

export type CommsChannel = "email" | "call" | "sms" | "slack" | "meeting";
export type CommsDirection = "inbound" | "outbound";

export type CommsMessage = {
  id: string;
  channel: CommsChannel;
  direction: CommsDirection;
  from: string;
  fromHandle?: string;
  to?: string;
  timestamp: string;
  subject?: string;
  body: string;
  attachments?: { name: string; size: string }[];
  durationSec?: number;
};

export type CommsThread = {
  id: string;
  dealId: string;
  contactId: string;
  subject: string;
  channel: CommsChannel;
  preview: string;
  participants: string[];
  lastActivity: string;
  lastActivityRank: number;
  unreadCount: number;
  hasAttachment?: boolean;
  starred?: boolean;
  pinned?: boolean;
  superpilotSummary?: string;
  superpilotNextStep?: string;
  messages: CommsMessage[];
};

export const commsThreads: CommsThread[] = [
  {
    id: "thread-acme-followup",
    dealId: "acme-corp",
    contactId: "priya-mehta",
    subject: "Re: Superleap proposal — migration timeline",
    channel: "email",
    preview:
      "Priya: \"Hi Arjun, just checking in on the migration timeline estimate you mentioned on our last call.\"",
    participants: ["Priya Mehta", "Dilith"],
    lastActivity: "4d ago",
    lastActivityRank: 1,
    unreadCount: 1,
    pinned: true,
    superpilotSummary:
      "Priya is waiting on 2 deliverables: migration timeline (promised Oct 14) and Chargebee integration doc (promised Oct 16). Both are overdue. CFO has not been engaged.",
    superpilotNextStep:
      "Deliver migration timeline and Chargebee doc before today's 3pm call. Raise CFO loop-in on the call.",
    messages: [
      {
        id: "m1",
        channel: "email",
        direction: "inbound",
        from: "Priya Mehta",
        fromHandle: "priya@acmecorp.io",
        to: "dilith@zephyrtech.io",
        timestamp: "Oct 22",
        subject: "Re: Superleap proposal — migration timeline",
        body: "Hi Arjun,\n\nJust checking in on the migration timeline estimate you mentioned on our last call. We're getting internal questions about the implementation schedule and it would help to have something concrete.\n\nAlso — Rohan is still waiting on the Chargebee integration doc.\n\nLooking forward to connecting Thursday.\n\nPriya",
      },
      {
        id: "m0",
        channel: "email",
        direction: "outbound",
        from: "Dilith",
        fromHandle: "dilith@zephyrtech.io",
        to: "priya@acmecorp.io",
        timestamp: "Oct 18",
        subject: "Great speaking Thursday — next steps",
        body: "Hi Priya,\n\nGreat speaking on Thursday. A few things from the call:\n\n1. Migration timeline estimate — I'll get this to you by end of week.\n2. Chargebee integration doc — Rohan, I'll send this directly to you.\n3. CFO intro call — happy to set up a 15-min exec summary when timing works.\n\nLet me know if anything else came up.\n\nDilith",
      },
    ],
  },
  {
    id: "thread-acme-oct16-call",
    dealId: "acme-corp",
    contactId: "priya-mehta",
    subject: "Call transcript — Oct 16 · 34 min",
    channel: "call",
    preview:
      "Priya: \"The Chargebee piece is actually more critical than I made it sound. Rohan needs that doc before he'll approve anything.\"",
    participants: ["Priya Mehta", "Rohan Shah", "Dilith"],
    lastActivity: "Oct 16",
    lastActivityRank: 2,
    unreadCount: 0,
    pinned: true,
    superpilotSummary:
      "34-min call. Rohan flagged Chargebee integration as a blocker for IT approval. Priya confirmed CFO needs to be looped in. SuperPilot extracted 4 action items.",
    superpilotNextStep:
      "Send Chargebee integration doc to Rohan. Schedule CFO intro call with Priya.",
    messages: [
      {
        id: "c1",
        channel: "call",
        direction: "inbound",
        from: "Priya Mehta",
        fromHandle: "+91 98765 43210",
        timestamp: "Oct 16 · 3:00pm",
        body: "Transcript excerpt (08:14 → 10:32):\n\nROHAN: The Chargebee piece is actually more critical than I made it sound on the last call. Our billing is fully on Chargebee and if we can't migrate the subscription data cleanly, we have a problem.\n\nDILITH: That's completely native — we have a Chargebee connector that handles subscription sync, billing history, and renewal data. I'll send the integration doc directly to you, Rohan.\n\nROHAN: That would help a lot. Once I've reviewed it I can give Priya the green light on IT approval.\n\nPRIYA: And separately — for the CFO conversation, it would help to have a one-page exec summary. He's not going to read a full proposal.\n\nDILITH: Absolutely. I'll put together a one-pager with the business case, timeline, and ROI estimate.",
        durationSec: 34 * 60,
      },
    ],
  },
  {
    id: "thread-techventures-momentum",
    dealId: "techventures",
    contactId: "rahul-nair",
    subject: "Re: Superleap proposal — IT approved",
    channel: "email",
    preview:
      "Rahul: \"IT has given us the green light on vendor approval. Ready to move to legal review when you send the MSA.\"",
    participants: ["Rahul Nair", "Pooja Singh", "Dilith"],
    lastActivity: "Today",
    lastActivityRank: 3,
    unreadCount: 1,
    superpilotSummary:
      "Strong buy signal. Rahul replied within 2 hours, IT approved vendor status. Deal is ready to move to legal review — send MSA template immediately.",
    superpilotNextStep:
      "Send MSA template today. Ask for legal contact name. Set Dec 5 as target signature date.",
    messages: [
      {
        id: "tv1",
        channel: "email",
        direction: "inbound",
        from: "Rahul Nair",
        fromHandle: "rahul@techventures.in",
        to: "dilith@zephyrtech.io",
        timestamp: "Today · 10:42am",
        subject: "Re: Superleap proposal — IT approved",
        body: "Dilith,\n\nIT has given us the green light on vendor approval — Pooja ran the security review and everything checked out.\n\nReady to move to legal review on our end. Send the MSA when you have it and I'll get it to our legal team.\n\nWho should they reach out to on your side for any questions?\n\nRahul",
      },
      {
        id: "tv0",
        channel: "email",
        direction: "outbound",
        from: "Dilith",
        fromHandle: "dilith@zephyrtech.io",
        to: "rahul@techventures.in",
        timestamp: "Oct 18",
        subject: "TechVentures × Superleap — proposal",
        body: "Hi Rahul,\n\nAttached is the proposal for ₹12,00,000/yr. Let me know if you'd like to discuss the terms or if there's anything your IT team needs from us for the vendor approval process.\n\nDilith",
        attachments: [{ name: "TechVentures_Proposal_v1.pdf", size: "380 KB" }],
      },
    ],
  },
  {
    id: "thread-buildfast-silence",
    dealId: "buildfast",
    contactId: "sneha-pillai",
    subject: "Re: Case study — as discussed",
    channel: "email",
    preview:
      "Sneha hasn't replied since the Oct 19 call. Case study was promised but not sent. 3 days overdue.",
    participants: ["Sneha Pillai", "Dilith"],
    lastActivity: "5d ago",
    lastActivityRank: 4,
    unreadCount: 0,
    superpilotSummary:
      "Case study committed on Oct 19, not sent. Sneha is comparing two vendors. Every day of delay risks losing credibility at Negotiation stage.",
    superpilotNextStep:
      "Send the case study today with a one-paragraph personalisation for construction sector. Propose a 20-min call for pricing finalisation.",
    messages: [
      {
        id: "bf1",
        channel: "email",
        direction: "outbound",
        from: "Dilith",
        fromHandle: "dilith@zephyrtech.io",
        to: "sneha@buildfast.io",
        timestamp: "5d ago",
        subject: "Next steps after our call",
        body: "Hi Sneha,\n\nGreat call on Tuesday. As discussed, I'll get you the construction sector case study by end of week.\n\nA few things to confirm from our side:\n1. Pricing — we're aligned on ₹6,00,000/yr with quarterly billing\n2. Implementation — 3-week timeline with dedicated onboarding lead\n3. Case study — will send by Thursday\n\nLet me know if anything else came up after the call.\n\nDilith",
      },
    ],
  },
  {
    id: "thread-novapay-intro",
    dealId: "novapay",
    contactId: "vikram-shetty",
    subject: "Superleap — exploring for NovaPay",
    channel: "email",
    preview:
      "Vikram: \"Adding Aditya Kumar (Head of Ops) to this thread — he'll be the one evaluating workflow fit.\"",
    participants: ["Vikram Shetty", "Aditya Kumar", "Dilith"],
    lastActivity: "Yesterday",
    lastActivityRank: 5,
    unreadCount: 1,
    superpilotSummary:
      "Vikram looped in Aditya without being asked — strong buy signal. Aditya is the ops evaluator who needs to be won over before the deal advances.",
    superpilotNextStep:
      "Welcome Aditya directly. Offer a 30-min ops workflow walkthrough tailored to fintech sales operations.",
    messages: [
      {
        id: "np1",
        channel: "email",
        direction: "inbound",
        from: "Vikram Shetty",
        fromHandle: "vikram@novapay.in",
        to: "dilith@zephyrtech.io",
        timestamp: "Yesterday",
        subject: "Re: Superleap — exploring for NovaPay",
        body: "Dilith,\n\nAdding Aditya Kumar (Head of Ops) to this thread — he'll be the one whose team actually uses this day-to-day, so his input matters more than mine on workflow fit.\n\nAditya, Dilith is from Superleap — they're the AI-native CRM we've been looking at. Take a look at the earlier thread.\n\nVikram",
      },
      {
        id: "np0",
        channel: "email",
        direction: "inbound",
        from: "Vikram Shetty",
        fromHandle: "vikram@novapay.in",
        to: "dilith@zephyrtech.io",
        timestamp: "Oct 18",
        subject: "Superleap — exploring for NovaPay",
        body: "Hi Dilith,\n\nCame across Superleap through a peer — interested in exploring for our 35-rep sales team. Too many tools, not enough visibility across the org.\n\nCan we set up a 30-min intro?\n\nVikram",
      },
    ],
  },
  {
    id: "thread-databridge-golive",
    dealId: "databridge",
    contactId: "karan-mehta",
    subject: "DataBridge — Go-live confirmed",
    channel: "email",
    preview:
      "Karan: \"Migration was cleaner than anything we've done before. Team finished 4 days ahead of schedule.\"",
    participants: ["Karan Mehta", "Dilith"],
    lastActivity: "Oct 15",
    lastActivityRank: 6,
    unreadCount: 0,
    superpilotSummary:
      "Successful go-live 4 days ahead of schedule. Karan offered to be a reference. Strong candidate for case study and peer reference calls.",
    superpilotNextStep:
      "Formalise reference request. Propose a case study co-authoring opportunity.",
    messages: [
      {
        id: "db1",
        channel: "email",
        direction: "inbound",
        from: "Karan Mehta",
        fromHandle: "karan@databridge.io",
        to: "dilith@zephyrtech.io",
        timestamp: "Oct 15",
        subject: "Go-live confirmed — thank you",
        body: "Dilith,\n\nWanted to let you know we went live this morning — 4 days ahead of schedule.\n\nThe migration was cleaner than anything we've done before. The team is already running reports they couldn't run before, and the data team is happy.\n\nI'm happy to be a reference for you. Let me know what format works best — reference call, case study, whatever is useful.\n\nKaran",
      },
    ],
  },
  {
    id: "thread-fincore-demo",
    dealId: "fincore-systems",
    contactId: "anita-rao",
    subject: "Thursday demo — confirmed",
    channel: "email",
    preview:
      "Anita: \"Confirmed for Thursday 2pm. I'm bringing our VP Finance and VP Operations — come prepared.\"",
    participants: ["Anita Rao", "Dilith"],
    lastActivity: "2d ago",
    lastActivityRank: 7,
    unreadCount: 0,
    superpilotSummary:
      "COO is bringing two VPs to Thursday's demo — this is the decision-making session. Multi-entity reporting and RBI compliance are the critical requirements to demonstrate.",
    superpilotNextStep:
      "Build a FinCore-shaped sandbox today. Pre-load multi-entity chart of accounts and RBI compliance reports.",
    messages: [
      {
        id: "fc1",
        channel: "email",
        direction: "inbound",
        from: "Anita Rao",
        fromHandle: "anita@fincore.in",
        to: "dilith@zephyrtech.io",
        timestamp: "2d ago",
        subject: "Re: Demo scheduling",
        body: "Dilith,\n\nConfirmed for Thursday 2pm. I'm bringing our VP Finance and VP Operations — we want to make a decision this week, so come prepared.\n\nKey things we need to see:\n1. Multi-entity consolidation and reporting\n2. RBI-compliant audit trail\n3. Integration with our existing Salesforce data\n\nAnita",
      },
    ],
  },
];

export const inboxUnreadCount = commsThreads.reduce((n, t) => n + t.unreadCount, 0);

export function getThreadsForDeal(dealId: string): CommsThread[] {
  return commsThreads.filter((t) => t.dealId === dealId);
}

export function getThreadsForContact(contactId: string): CommsThread[] {
  return commsThreads.filter((t) => t.contactId === contactId);
}
