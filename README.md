# SubsidySetu — AI-Powered MSME Subsidy Capture Agent

**Live demo:** https://amd-ai-powered-msme-web-app.vercel.app/

> *"Setu"* means "bridge." SubsidySetu is the bridge between the ₹530B+ in unclaimed Indian MSME government subsidies and the businesses that already qualify for them — they just don't know it yet.

---

## Table of Contents

- [The Problem](#the-problem)
- [What SubsidySetu Does](#what-subsidysetu-does)
- [Who It's For](#who-its-for)
- [How It Works](#how-it-works)
- [Feature Walkthrough](#feature-walkthrough)
- [AI Reliability Principles](#ai-reliability-principles)
- [Tech Stack](#tech-stack)
- [Getting Started Locally](#getting-started-locally)
- [Accessing the Live App](#accessing-the-live-app)
- [Roadmap](#roadmap)
- [Accessibility](#accessibility)
- [Credits & Attributions](#credits--attributions)

---

## The Problem

India has **63–64 million MSMEs** and a **$530B+ credit/subsidy gap**. Most first-time business owners can identify only one or two government schemes they qualify for, out of dozens that may apply based on their state, sector, and size. Discovery portals like Jan Samarth, Udyam, and CHAMPIONS exist, but they're fragmented across departments and never cross-matched against a specific business's full profile.

Meanwhile, India's ~100,000 registered CA (Chartered Accountant) firms — 72%+ of them single-partner practices — already hold the exact data needed to do this matching (Udyam registration, GST returns, turnover, employee count), but have no time or tooling to act on it proactively for every client.

**The gap SubsidySetu closes:** nobody is turning *"your client already qualifies for ₹X"* into a filed, disbursed claim — systematically, for the CA who already serves that client.

## What SubsidySetu Does

SubsidySetu is an AI agent that sits inside a small CA firm or MSME compliance consultancy. It's designed to:

1. Ingest a client's registered business data (documents or manual entry)
2. Match that profile against a versioned, citation-backed government scheme knowledge base
3. Surface only eligibility matches the AI can justify with a specific clause reference
4. Help the CA draft and assemble the application, flagging missing documents
5. Track the filing through to disbursement
6. Bill a **success fee on money actually recovered for the client** — not a subscription

This is deliberately narrow by design: no compliance-deadline monitoring, no tender/GeM matching, no community features, no multi-agent negotiation. See [Roadmap](#roadmap) for what's intentionally deferred.

## Who It's For

| Role | Who | Relationship to the product |
|---|---|---|
| **Primary buyer & user** | CA / compliance consultant at a 1–10 partner firm | Logs in, manages clients, reviews AI matches, approves filings |
| **Data subject (indirect)** | The MSME business owner | Never needs to use the product directly — their data enters via the CA |
| **Internal ops** | Compliance analyst | Manually verifies scheme data, handles low-confidence edge cases the AI flags |

**Why the CA and not the MSME owner directly?** The MSME owner has near-zero willingness to pay for standalone software and no time to learn a new tool. The CA already has the client relationship, the underlying documents, and a billing relationship to attach a success fee to.

The app also includes a secondary **business-owner-facing portal** (financial analysis, market intelligence, operational optimization, compliance assistant, supplier management), reached via a separate login mode.

## How It Works

```
CA uploads/links client documents (Udyam cert, GST returns, financials)
                    ↓
        Business Profile Engine  ──→  structured client profile
                    ↓
        Eligibility Matching Agent  ←──  Scheme Knowledge Base (versioned, cited)
                    ↓
        Match results (ranked by ₹ value, with citation + confidence)
                    ↓
CA reviews in dashboard  ──→ approves ──→  Application Assembly Agent
        ↓                                          ↓
CA rejects / flags                   Draft application + missing-doc checklist
                                                   ↓
                                   CA reviews & submits (human-in-loop, mandatory)
                                                   ↓
                                         Filing & Status Tracking
                                                   ↓
                                   Disbursement confirmed → Success Fee Billing
```

**Core building blocks:**

1. **Client Data Ingestion** — document upload (PDF/photo) + OCR extraction for Udyam certificate, GST returns, financial statements, with manual entry as fallback.
2. **Business Profile Engine** — normalizes extracted data into a structured client profile.
3. **Scheme Knowledge Base** — a maintained, versioned database of scheme rules (central + state), each entry sourced to an official document with a "last verified" date. Retrieved from, never generated from model memory.
4. **Eligibility Matching Agent** — RAG-based: retrieves relevant scheme entries, compares against the structured client profile, and produces a match only when it can cite the specific clause justifying it.
5. **Application Assembly Agent** — pre-fills known fields, drafts required narrative sections, generates a missing-document checklist.
6. **Human Review & Approval Layer** — mandatory gate. No match is shown to the client, and no application is filed, without explicit CA sign-off.
7. **Filing & Tracking** — programmatic submission where an API exists (e.g. Udyam); otherwise a submission-ready export, tracked as a status.
8. **Success Fee Billing Engine** — tracks confirmed disbursement, calculates the agreed success fee, generates an invoice.
9. **CA Dashboard** — the primary interface (see below).
10. **Notification Layer** — email + optional WhatsApp digest for new matches, deadlines, and status changes.

> **Current state:** this is a frontend prototype. The flow above describes the intended product; today, all client/match/invoice data is realistic seeded mock data, and the AI panels render illustrative responses. There's no backend, OCR pipeline, or live LLM wired in yet — that's the next phase of the build.

## Feature Walkthrough

### CA Dashboard
| Screen | Purpose |
|---|---|
| **Overview** | Home dashboard — key numbers, recent activity |
| **Clients** | Client list + detail view — profile, documents, OCR status |
| **Eligibility Matches** | Card per match: scheme name, ₹ benefit estimate, confidence badge (High/Medium/Needs Review — never colour-only), one-line reason, expandable citation, Approve/Reject |
| **Applications** | Per-approved-match drafted application preview + missing-document checklist |
| **Status Tracker** | Kanban-style: Matched → Drafted → Submitted → Approved → Disbursed |
| **Success Fee** | Per-client ledger: disbursed amount, fee %, fee amount, invoice status |
| **AI Chat** | Conversational assistant panel |
| **Notifications** | New matches, deadlines, status changes |
| **Firm Settings** | Firm name, contact, state of practice (sets default scheme scope) |

### Business/MSME Portal
| Screen | Purpose |
|---|---|
| **Dashboard** | Business-owner overview |
| **AI Advisor** | Chat-based advisory on financial/operational questions |
| **Financial Analysis** | Working capital, receivables, cash flow insights |
| **Market Intelligence** | Market/sector positioning insights |
| **Operational Optimization** | Inventory/operations efficiency suggestions |
| **Compliance Assistant** | Compliance-related guidance |
| **Supplier Management** | Supplier tracking |

## AI Reliability Principles

The core risk in this product category is *a confident, wrong answer about money a small business owner is counting on.* These are treated as launch blockers for any real AI layer added on top of this UI, not nice-to-haves:

1. **No eligibility claim without a citation** — every match must reference the specific scheme clause that justifies it.
2. **Grounded retrieval only** — the matching agent must reason over the Scheme Knowledge Base via retrieval, never from a model's parametric memory (scheme rules like turnover thresholds and loan caps change over time).
3. **Confidence thresholds with an honest fallback** — below a defined threshold, the correct output is "needs manual verification," not a guessed match.
4. **Versioned knowledge base with visible freshness** — every scheme entry shows a "last verified" date.
5. **Mandatory human-in-loop before filing** — no application is submitted without explicit CA approval.
6. **Full audit trail** — every claim, its source, its confidence, and the human decision on it must be logged and retrievable.
7. **Adversarial/edge-case testing before launch** — specifically borderline-eligible businesses, schemes with recently changed thresholds, and OCR-error-prone documents.

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend framework | React 18 + Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Component library | shadcn/ui (Radix UI primitives) |
| Icons | lucide-react |
| Charts | Recharts |
| Animation | Framer Motion (`motion`) |
| Notifications/toasts | Sonner |
| Package manager | pnpm |
| Deployment | Vercel |

**Planned for the production build (not yet implemented):** FastAPI backend, PostgreSQL + pgvector for scheme retrieval, an OCR service for document ingestion, and a RAG layer over the Scheme Knowledge Base using any current strong LLM.

## Getting Started Locally

### Prerequisites
- Node.js 18+ (LTS recommended)
- [pnpm](https://pnpm.io/installation) (npm also works)

### Clone & install

```bash
git clone https://github.com/divyammanas/AMD-AI-Powered-MSME-WebApp.git
cd AMD-AI-Powered-MSME-WebApp
pnpm install   # or: npm i
```

### Run the app

```bash
pnpm dev       # or: npm run dev
```

Visit the local dev server (default: `http://localhost:5173`).

### Build for production

```bash
pnpm run build
```

### Environment variables

None required to run today — this is a frontend prototype seeded with mock data, no API keys needed. Once a backend is wired in, expect variables such as:

```bash
VITE_API_BASE_URL=
VITE_LLM_API_KEY=
VITE_OCR_SERVICE_KEY=
```
(Prefix any client-exposed variable with `VITE_`, and keep real keys in a git-ignored `.env.local`, never committed.)

## Accessing the Live App

**Live demo:** https://amd-ai-powered-msme-web-app.vercel.app/

1. Land on the marketing page — introduces SubsidySetu's value prop and the 7-step process (Ingest → Match → Review → Draft → Submit → Track → Fee).
2. Click **Sign In** or **Sign Up** and choose a role: **CA** or **Business**.
3. You'll land on the dashboard for that role:
   - **CA** → the full SubsidySetu dashboard: Overview, Clients, Eligibility Matches, Applications, Status Tracker, Success Fee ledger, AI Chat, Notifications, Firm Settings.
   - **Business** → the MSME-facing portal: Dashboard, AI Advisor, Financial Analysis, Market Intelligence, Operations, Compliance Assistant, Supplier Management.

> Auth is currently a session-based stub for demo purposes, not a production auth system.

## Roadmap

Listed for visibility only — not built until the core product proves itself with real CA usage:

- Additional scheme categories / additional states
- Compliance-deadline monitoring agent (GST/MCA filing reminders)
- Tender/GeM matching agent
- Procurement/supplier discovery agent
- Voice-first "business journal" input layer
- Persistent "business memory" beyond scheme matching
- Credit/lending agent (a separate, regulated OCEN/Account-Aggregator product)
- Community features (founder groups, matchmaking, expert booking)
- Multi-agent "board meeting" simulation
- Business Knowledge Graph

## Accessibility

- WCAG 2.1 AA as the baseline, not an afterthought
- Colour is never the only signal for status — always paired with icon shape + text label
- All interactive elements keyboard-navigable; screen-reader labels on icon-only controls
- Minimum 4.5:1 text contrast; no text-in-image for anything functional
- Adjustable font sizes; no fixed-px text that breaks browser zoom

## Credits & Attributions

- UI components from [shadcn/ui](https://ui.shadcn.com/) — MIT license
- Photos from [Unsplash](https://unsplash.com) — used under the Unsplash license
- Prototyped and iterated using Figma Make
- Built by [Divyam Manas](https://github.com/divyammanas)
