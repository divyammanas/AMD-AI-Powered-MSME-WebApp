# MSME Subsidy-Capture Agent — Architecture Understanding (from PDF)

## Document: `src/imports/architectural_flow.pdf`
**Title:** MSME Subsidy-Capture Agent — V1 Architecture & Feature Specification
**Status:** Draft for production team review. V1 only, deliberately narrow.

---

### §0 — Scope Note
One product: an AI agent inside a CA firm that watches client business data, matches it against government scheme rules, and helps the CA assemble and file the claim — priced as a **success fee on money actually recovered**. Everything else (compliance deadlines, GeM, community, knowledge graph) is explicitly Section 13 (Phase 2+ backlog).

---

### §1 — Problem Statement
- India has 63–64M MSMEs and a $530B+ credit/subsidy gap.
- Most MSMEs can identify only 1–2 schemes; dozens may apply.
- ~100,000 registered CA firms (72%+ single-partner) already hold the exact data needed (Udyam, GST, turnover, employee count) but have no tooling to act on it proactively.
- **The gap:** nobody is turning "your client already qualifies for ₹X" into a filed, disbursed claim, systematically, for the CA who already serves that client.

---

### §2 — Target Users
| Role | Who | Relationship |
|---|---|---|
| **Primary buyer & user** | CA / compliance consultant, 1–10 partner firm | Logs in, manages clients, reviews AI matches, approves filings |
| **Data subject (indirect)** | MSME business owner | Never uses the product directly. Data enters via CA. |
| **Internal ops (v1)** | Compliance analyst | Manually verifies scheme data, handles low-confidence edge cases |

**Why CA and not MSME directly:** MSME owner has near-zero willingness to pay for standalone software and no time to learn a new tool. The CA already has the client relationship, documents, and a billing relationship to attach a success fee to.

---

### §3 — V1 Scope & Success Metrics (Gate 1)
- **Geographic/category scope:** One state, 1–2 scheme categories (e.g. CGTMSE + PMEGP, or MUDRA + a state capital subsidy). Do NOT launch multi-state.
- **Gate 1 (before any new agent/feature):**
  - 30–50 CA firms onboarded and actively using the dashboard
  - ≥60% of matched schemes result in a filed application within 30 days
  - At least one full disbursement → success fee cycle completed
  - Firms still logging in weekly at day 60 without being chased

---

### §4 — User Personas
- **"Priya, CA, 3-partner firm, Tier-2 city"** — Handles GST/ITR for ~120 clients. Knows 2–3 schemes well. Wants extra billable value from existing clients without extra manual research. *(This is the persona already used in our mock data.)*
- **"Ramesh, machine-parts manufacturer, Priya's client"** — Never logs into anything new. Gives Priya documents once a year. Wants money he's entitled to, with least possible paperwork.

---

### §5 — System Architecture (High-Level Flow)
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
CA rejects / flags                   Draft application + doc checklist
                                                   ↓
                                   CA reviews & submits (human-in-loop, mandatory)
                                                   ↓
                                         Filing & Status Tracking
                                                   ↓
                                   Disbursement confirmed → Success Fee Billing
```

**10 Components:**
1. **Client Data Ingestion** — PDF/photo upload + OCR (Udyam, GST returns, financials). Manual entry as fallback.
2. **Business Profile Engine** — Normalises extracted data into a structured client profile.
3. **Scheme Knowledge Base** — Most critical infrastructure. Versioned, cited DB of scheme rules (central + one state). Retrieved, never hallucinated from model memory.
4. **Eligibility Matching Agent** — RAG-based. Retrieves scheme entries, compares against profile, produces a match only when it can cite the specific clause.
5. **Application Assembly Agent** — Pre-fills known fields, drafts narrative sections, generates missing-document checklist.
6. **Human Review & Approval Layer** — Mandatory gate. No match shown to client, no application filed, without explicit CA sign-off. This is a product requirement, not UI nicety.
7. **Filing & Tracking** — API submission where available (Udyam); otherwise export submission-ready package. Tracked as a status.
8. **Success Fee Billing Engine** — Tracks confirmed disbursement, calculates fee, generates invoice.
9. **CA Dashboard (web app)** — Primary interface (Section 11).
10. **Notification Layer** — Email + optional WhatsApp digest for new matches, deadlines, status changes.

---

### §6 — Data Model (Core Entities)
```
BusinessProfile
  - id, ca_firm_id
  - business_name, udyam_number, gstin
  - sector (manufacturing / service / trading)
  - state, district
  - turnover, investment_in_plant_machinery, employee_count
  - udyam_classification (micro / small / medium)
  - existing_certifications[] (ISO, ZED, etc.)
  - prior_scheme_usage[]
  - documents[] (linked files, OCR status)

Scheme
  - id, name, issuing_body, category
  - eligibility_rules (structured, machine-checkable where possible)
  - benefit_type, benefit_amount_or_formula
  - source_document_url, source_clause_reference
  - last_verified_date
  - application_requirements[]
  - status (active / closed / superseded)

Match
  - id, business_profile_id, scheme_id
  - confidence_score
  - citation (which rule/clause triggered the match)
  - status (suggested / ca_approved / ca_rejected / applied / disbursed)

Application
  - id, match_id
  - draft_document_url
  - missing_documents[]
  - submission_method (api / manual)
  - submitted_date, status, disbursed_amount, disbursed_date

SuccessFeeTransaction
  - id, application_id, ca_firm_id
  - fee_percentage, fee_amount, invoice_status

AuditLog
  - every AI-generated claim: what was claimed, source cited, confidence, who approved/rejected it, when
```
*(Note: Our current mock-data.ts already mirrors this schema closely — Client ≈ BusinessProfile, Match ≈ Match, Invoice ≈ SuccessFeeTransaction.)*

---

### §7 — AI Agent Reliability Requirements (launch blockers, not nice-to-haves)
1. **No eligibility claim without a citation.** Every match must reference the specific scheme clause. If it can't cite, it doesn't show.
2. **Grounded retrieval only.** Matching agent reasons over the KB via retrieval, not model parametric memory. Scheme rules change — the model must never "recall" a rule from training data.
3. **Confidence thresholds with honest fallback.** Below threshold, correct output is "needs manual verification," not a guessed match.
4. **Versioned KB with visible freshness.** Every scheme entry shows a "last verified" date to the CA.
5. **Mandatory human-in-loop before filing.** No application submitted without explicit CA approval. Trust + liability boundary.
6. **Full audit trail.** Every claim, its source, confidence, and human decision logged and retrievable — for CA's own liability protection.
7. **Adversarial/edge-case testing before launch.** Specifically: borderline-eligible businesses, recently-changed thresholds, documents with OCR errors.

---

### §8 — Integrations
| Integration | Purpose | Notes |
|---|---|---|
| Udyam Registration | Pull/verify business classification | Check current API/portal access terms |
| GSTN | Turnover/filing verification | May require GSP/ASP partnership |
| DigiLocker | Document verification | Certificate authenticity |
| WhatsApp Business API | Notification digest to CA | Nudge channel only in v1 |
| Payment/invoicing | Success-fee billing | Razorpay/similar sufficient for v1 |

**Not in v1:** OCEN/Account Aggregator, GeM/tender APIs, ONDC.

---

### §9 — V1 Feature List
**Must-have (launch blockers):**
1. Client onboarding — document upload + manual entry fallback
2. Business profile auto-extraction (OCR) with manual correction
3. Scheme Knowledge Base for chosen state + 1–2 categories, fully cited and versioned
4. Eligibility matching with citation and confidence score
5. CA approval/rejection workflow for each match
6. Application drafting with missing-document checklist
7. Manual filing support (submission-ready package export) — API filing is a stretch
8. Status tracking (matched → drafted → submitted → disbursed)
9. Success fee calculation and basic invoicing
10. Audit log

**Should-have (can slip past launch):**
- WhatsApp notification digest
- Multi-client bulk view / sort by highest-value match
- Basic analytics (total value recovered across clients)

---

### §10 — UI/UX Principles
**Accessibility (WCAG 2.1 AA):**
- Colour is never the only status signal — pair with icon shape + text label
- All interactive elements keyboard-navigable
- Minimum 4.5:1 text contrast; no fixed-px text

**Simplicity:**
- One primary action per screen
- Progressive disclosure: show match + ₹ value first; citation/confidence one click away
- No vanity dashboards — every number must change what the CA does next
- Default to highest-value, highest-confidence matches at top of every list

---

### §11 — Screen-by-Screen Specification (from doc)
1. **Login / Firm Setup** — firm name, primary contact, state of practice (sets default scheme scope)
2. **Client List** — table: name, sector, # matched schemes, total potential ₹, status; "Add Client" button
3. **Client Profile Detail** — OCR-extracted fields with edit affordance on each; document list with extraction status
4. **Eligibility Matches** — card per match: scheme name, ₹ benefit, confidence badge (never colour-only), one-line reason, "View citation" expandable, Approve/Reject buttons
5. **Application Workspace** — per approved match: drafted application preview, missing-doc checklist, "Mark ready to file", manual filing instructions or API-submit
6. **Status Tracker** — Kanban: Matched → Drafted → Submitted → Approved → Disbursed, per client
7. **Success Fee Ledger** — per client: disbursed amount, fee %, fee amount, invoice status
8. **Notifications** — new matches, approaching deadlines, status changes; WhatsApp opt-in toggle

---

### §12 — Suggested Tech Stack
- **Backend:** Python (FastAPI) — plays well with RAG/LLM orchestration
- **Database:** PostgreSQL for structured entities; pgvector for scheme-document retrieval
- **Frontend:** React web dashboard (no native app for v1 — CA works at a desk) ← **this is what we're building**
- **Document processing:** OCR via existing service (not in-house)
- **LLM layer:** Any strong model via API, constrained to RAG over Scheme KB per §7
- **Hosting:** Any major cloud

---

### §13 — Explicit Phase 2+ Backlog (do not build until Gate 1 hit)
- Additional scheme categories / states
- Compliance-deadline monitoring agent
- Tender/GeM matching agent
- Procurement/supplier discovery agent
- Voice-first "business journal" input
- Persistent "business memory" beyond scheme matching
- Credit/lending agent (OCEN/Account Aggregator — regulated)
- Community features
- Multi-agent "board meeting" simulation
- Business Knowledge Graph

---

### §14 — Open Questions (from doc, for production team)
1. Which state and which 1–2 scheme categories are we launching with?
2. Do we have (or can we get) API access to Udyam/GSTN, or is v1 manual-document-based only?
3. Who owns keeping the Scheme Knowledge Base current — a person, a process, or both?
4. What's the actual success-fee percentage and how is it contractually structured with pilot CA firms?
5. Who are the first 5 CA firms for the pilot, and how are they being recruited?

---

## Alignment with Current Codebase

| Spec concept | Current implementation status |
|---|---|
| CA Dashboard (§11) | ✅ All 8 screens built (Overview, Clients, Matches, Applications, Tracker, Billing, Chat, Notifications, Settings) |
| BusinessProfile data model (§6) | ✅ `src/app/lib/mock-data.ts` — `Client` type mirrors this closely |
| Match + confidence + citation (§6, §7) | ✅ Mock data has `confidence`, `citation`, `clauseRef`, `lastVerified` |
| CA approval/rejection workflow (§9.5) | ✅ Approve/Reject buttons on Client Detail page |
| Application drafting + doc checklist (§9.6) | ✅ Applications page has draft preview + missing docs |
| Status tracker Kanban (§11.6) | ✅ Tracker page (matched/drafted/submitted/disbursed columns) |
| Success Fee Ledger (§11.7) | ✅ Billing page + SuccessFeeLedger component |
| Audit log (§9.10) | ✅ Audit trail section on Client Detail page |
| Human-in-loop gate (§7.5) | ✅ Approve/Reject required before filing — reflected in UI |
| Citation always visible (§7.1) | ✅ "View citation" expandable `<details>` on every match card |
| Confidence badge not colour-only (§10 accessibility) | ⚠️ Badges have icons (CheckCircle, HelpCircle, AlertCircle) but should audit contrast ratios |
| OCR extraction status visible (§11.3) | ✅ Document list shows OCR status pill |
| Notification layer (§5.10) | ✅ Notifications page, WhatsApp opt-in toggle in Settings |
| Client View (MSME owner portal) | ✅ Built (simpler Client View with step banner, scheme cards, doc checklist) — though spec says MSME never uses product directly in v1 |
| Login / Firm Setup screen (§11.1) | ❌ Not yet built |
| "Add Client" onboarding form (§11.2) | ❌ Not yet built (button exists, no modal/form) |
| Versioned KB "last verified" dates | ✅ `lastVerified` field present on every match in mock data |

---

# Black + Poppy Pastel Palette

## Palette
| Token | Value | Use |
|---|---|---|
| Background | `#000000` | Page, sidebar |
| Surface | `#0f0f0f` | Sidebar, header |
| Card | `rgba(255,255,255,0.04)` | GlowCard |
| Border | `rgba(255,255,255,0.09)` | All borders |
| Pink (primary) | `#ff79c6` | Active nav, primary buttons, eyebrow badges |
| Mint (secondary) | `#50fa7b` | Success, disbursed, trend up |
| Cyan | `#8be9fd` | In-progress, secondary accent |
| Yellow | `#f1fa8c` | Submitted, medium confidence |
| Orange | `#ffb86c` | Drafted, warning |
| Purple | `#bd93f9` | Approved, matched |
| Red | `#ff5555` | Rejected, destructive |
| Text primary | `#ffffff` | Headings, values |
| Text secondary | `#888888` | Labels, subtitles |

## Files to change
- `src/styles/theme.css` — dark vars: bg=`#000`, primary=`#ff79c6`, all accents
- `src/styles/globals.css` — glow orbs: pink top-left, mint bottom-right; body bg `#000`
- `src/app/components/AppShell.tsx` — replace all `#7c3aed`→`#ff79c6`, `#06b6d4`→`#50fa7b`, `#0d0f1e`→`#0a0a0a`, `#94a3b8` icon color stays
- `src/app/components/glow-card.tsx` — `PrimaryButton` gradient `#ff79c6→#50fa7b`; `VioletBadge` → pink
- `src/app/components/ui-bits.tsx` — eyebrow badge pink; `Stat` top glow pink; `StatusPill` map uses pastel palette; `ConfidenceBadge` high=mint, medium=yellow
- All page files — replace remaining violet/indigo accent references

## Text → White pass (from previous approved plan, apply same time)
All `#334155`, `#475569` labels → `#888` (visible grey, not invisible dark slate)

# Text → White Pass

## Context
Screenshot shows stat card labels ("CLIENTS UNDER MANAGEMENT") rendering in near-invisible dark slate (`#334155`) and hint text ("Across 11 matches") in `#475569`. User wants all text made white/near-white throughout the app.

## What to change

### `src/app/components/ui-bits.tsx`
- `Stat` label: `#334155` → `#ffffff`
- `Stat` hint text: `#475569` → `#cbd5e1`
- `PageHeader` subtitle: `#64748b` → `#94a3b8`
- `SectionLabel` eyebrow: already violet, keep
- `EmptyState` hint: `#64748b` → `#94a3b8`

### `src/app/components/AppShell.tsx`
- All `#334155`, `#475569`, `#64748b` text colors → `#ffffff` or `#cbd5e1`
- Breadcrumb "SubsidyDesk" label, `·` separator, nav section label, user sub-text

### All page files (`src/app/pages/*.tsx`)
Pattern: replace every instance of:
- `color: "#334155"` → `color: "#ffffff"`
- `color: "#475569"` → `color: "#cbd5e1"`
- `color: "#64748b"` → `color: "#94a3b8"`
- `text-slate-500`, `text-slate-600` classes → `text-slate-200` or `text-white`

Files: `overview.tsx`, `clients-list.tsx`, `client-detail.tsx`, `matches.tsx`, `applications.tsx`, `tracker.tsx`, `billing.tsx`, `chat.tsx`, `notifications.tsx`, `settings.tsx`

### `src/app/components/glow-card.tsx`
- `GhostButton` text: `text-slate-300` → `text-white`

## Verification
All labels, hints, subtitles, table headers, and muted text render in white or light slate — nothing invisible against the dark background.

---

# Ripple-Inspired UI Redesign Plan

## Context
The user wants the existing SubsidyDesk app redesigned to adopt the visual language of the **Ripple Webflow HTML template** (land-book.com/websites/65528). All content, data, navigation, and functionality from the architectural spec stay intact — only the UI/UX treatment changes.

The Ripple template is a modern SaaS/fintech dark-theme design system characterised by:

### Ripple Design Language (key tokens)
| Attribute | Value |
|---|---|
| **Background** | Near-black deep navy: `#07080f` / `#0b0c16` |
| **Surface cards** | Glassmorphism: `rgba(255,255,255,0.04)` + `backdrop-blur-md` + `border: rgba(255,255,255,0.08)` |
| **Primary accent** | Electric violet → cyan gradient: `#7c3aed → #06b6d4` |
| **Secondary accent** | Indigo-blue: `#4f46e5` |
| **Success** | Emerald `#10b981` |
| **Warning** | Amber `#f59e0b` |
| **Heading text** | Pure white `#ffffff`, weight 700–800, tracking tight |
| **Body text** | Slate-400 `#94a3b8` |
| **Muted text** | Slate-500 `#64748b` |
| **Gradient text** | `bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent` |
| **Glow orbs** | Large radial gradients positioned absolutely behind content |
| **Grid overlay** | Subtle `bg-[size:40px_40px] bg-[image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)...]` |
| **Border** | `rgba(255,255,255,0.08)` — very subtle white at 8% opacity |
| **Radius** | Cards `rounded-2xl`, buttons `rounded-full` or `rounded-xl` |
| **Font** | Inter / system-ui, tight letter-spacing on headings |

### Ripple Layout Patterns
- **Sidebar** — narrow (56px icon-only) or 220px with labels; very dark, near invisible border; logo at top with glowing dot; nav items with violet active state; user avatar at bottom
- **Header** — frosted glass `bg-white/5 backdrop-blur-xl border-b border-white/8`; breadcrumb left; search center; notification + avatar right
- **Stat cards** — glassmorphism surface; `text-3xl` bold number with gradient fill; small label above; trend indicator below; subtle glow on hover; animated border on active
- **Table rows** — very low contrast borders, row hover `bg-white/4`, no zebra stripes
- **Match/scheme cards** — full-width cards with left accent bar in accent color; scheme name in white, reason in slate-400; ₹ value right-aligned in gradient text; confidence badge pill with icon
- **Buttons** — primary: `bg-gradient-to-r from-violet-600 to-cyan-500` with `shadow-lg shadow-violet-500/25`; ghost: `border border-white/15 hover:bg-white/8`
- **Badges/pills** — `bg-violet-500/15 text-violet-300 border border-violet-500/25`
- **Section headers** — small ALL-CAPS label in violet above, large heading below, muted subtitle below that
- **Glow accents** — `box-shadow: 0 0 60px rgba(124,58,237,0.15)` on key cards
- **Kanban columns** — `bg-white/3 border border-white/8 rounded-2xl`; cards inside are `bg-white/6`

---

## Implementation Plan

### 1. Update `src/styles/theme.css` — dark tokens
Override the dark mode variables to match Ripple palette:
- `--background: #07080f`
- `--card: rgba(255,255,255,0.03)` (rendered as oklab approximate)
- `--border: rgba(255,255,255,0.08)`
- `--muted: rgba(255,255,255,0.06)`
- `--muted-foreground: #64748b` (slate-500)
- `--primary: #7c3aed` (violet-600) — replaces white as primary CTA
- `--primary-foreground: #ffffff`
- `--radius: 1rem` (rounded-2xl for cards)
- Add custom CSS vars: `--accent-violet: #7c3aed`, `--accent-cyan: #06b6d4`, `--glow-violet: rgba(124,58,237,0.2)`

### 2. Add global background effects to `src/styles/globals.css`
- Body: `background: #07080f`
- Grid overlay via `::before` pseudo on a wrapper: subtle dot/grid pattern at 2% opacity
- Two positioned glow orbs (blurred radial gradients) fixed in viewport

### 3. Redesign `AppShell.tsx`
**Sidebar changes:**
- Background: `bg-[#0b0c16]/90 backdrop-blur border-r border-white/8`
- Logo: gradient icon with glow + "SubsidyDesk" in gradient text
- Nav items: icon + label; active = `bg-violet-500/15 text-violet-300 border-l-2 border-violet-500`; inactive = `text-slate-500 hover:text-slate-200 hover:bg-white/5`
- Bottom user section: avatar with gradient ring, name + firm in slate
- "Growth Plan" badge: `bg-violet-500/15 text-violet-300` pill

**Header changes:**
- `bg-[#07080f]/80 backdrop-blur-xl border-b border-white/8`
- Breadcrumb with chevron separator (not just an icon)
- Search: `bg-white/5 border-white/10 rounded-full` with kbd shortcut hint
- Bell with violet dot indicator
- Avatar with gradient ring

### 4. Redesign `src/app/components/ui-bits.tsx`
- `Stat` card: glassmorphism surface, number in gradient text (`from-violet-400 to-cyan-400`), glow on hover, trend arrow
- `PageHeader`: small violet ALL-CAPS eyebrow label above title
- `ConfidenceBadge`: pill with icon, violet/amber/slate palette matching Ripple
- `StatusPill`: rounded-full, translucent colored backgrounds
- `EmptyState`: dashed `border-white/15`, centered with icon

### 5. Redesign `src/app/pages/overview.tsx`
- 4 stat cards with gradient numbers + glow
- "Highest-value matches" panel: glassmorphism card, each row has left violet accent bar, scheme + confidence badge, gradient ₹ value, "Review" ghost button
- "Disbursements & billing" panel: glassmorphism, each invoice has ₹ in gradient text, status pill, trending icon in emerald

### 6. Redesign `src/app/pages/clients-list.tsx`
- Table in glassmorphism card, row hover `bg-white/4`, potential value in gradient text, status pills

### 7. Redesign `src/app/pages/client-detail.tsx`
- Stat cards with gradient numbers
- Business profile: `<dl>` in glassmorphism card, edit pencil on hover per field
- Match cards: left accent border in violet/amber/slate per confidence, citation in collapsible with violet underline link
- Approve/Reject buttons: gradient primary / ghost secondary
- Document list: file icon + OCR status pill

### 8. Redesign `src/app/pages/matches.tsx`
- 2-col grid of glassmorphism cards
- Each card: client name as muted eyebrow, scheme name in white semibold, ₹ in gradient text right-aligned, confidence + status pills, reason in slate-400, citation `<details>` with violet summary link

### 9. Redesign `src/app/pages/applications.tsx`
- Each application: full-width glassmorphism panel with violet left border
- Draft preview in monospace `bg-white/5 rounded-xl` block
- Missing docs checklist with icons
- Action buttons: gradient primary, ghost secondary

### 10. Redesign `src/app/pages/tracker.tsx`
- 4 Kanban columns: `bg-white/3 border border-white/8 rounded-2xl`
- Column headers with count badge
- Cards: `bg-white/6 rounded-xl` with scheme name + ₹ + clause ref

### 11. Redesign `src/app/pages/billing.tsx`
- 3 stat cards at top with gradient numbers
- Table in glassmorphism card, fee values in gradient text, status pills

### 12. Redesign `src/app/pages/chat.tsx`
- Chat bubble: user = gradient bg, assistant = `bg-white/8` with violet AI avatar
- Input: `bg-white/5 rounded-full border-white/10`

### 13. Redesign `src/app/pages/notifications.tsx` + `settings.tsx`
- Notification rows with violet/amber/emerald icon backgrounds per type
- Settings fields: `bg-white/5 border-white/10 rounded-xl` inputs

### 14. New reusable component: `src/app/components/glow-card.tsx`
A wrapper `<div>` applying:
- `bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl`
- Hover: `border-white/[0.14] shadow-lg shadow-violet-500/10 transition-all`
- Used by all card-like surfaces throughout the app

---

## Files to Modify
| File | Change |
|---|---|
| `src/styles/theme.css` | New dark palette tokens |
| `src/styles/globals.css` | Body bg, glow orbs, grid overlay |
| `src/app/components/AppShell.tsx` | Full sidebar + header redesign |
| `src/app/components/ui-bits.tsx` | All shared components |
| `src/app/pages/overview.tsx` | Ripple-style stats + panels |
| `src/app/pages/clients-list.tsx` | Table redesign |
| `src/app/pages/client-detail.tsx` | Detail page redesign |
| `src/app/pages/matches.tsx` | Card grid redesign |
| `src/app/pages/applications.tsx` | Application panel redesign |
| `src/app/pages/tracker.tsx` | Kanban redesign |
| `src/app/pages/billing.tsx` | Ledger table redesign |
| `src/app/pages/chat.tsx` | Chat bubble + input redesign |
| `src/app/pages/notifications.tsx` | Notification list redesign |
| `src/app/pages/settings.tsx` | Settings fields redesign |
| `src/app/components/glow-card.tsx` | **New** — shared glass card wrapper |

## What Does NOT Change
- All mock data (`src/app/lib/mock-data.ts`)
- Navigation structure and `NavContext` (`src/app/lib/nav.ts`)
- Business logic: match citations, confidence badges, audit trails, approval/rejection flows
- Compliance content: scheme names, ₹ values, clause references, OCR status indicators
- Human-in-loop gates (Approve/Reject remain mandatory before filing)

## Verification
- Preview in browser: sidebar active state is violet, stat numbers show gradient text, background shows glow orbs
- Click through all 9 nav items — no layout breaks
- Check client detail page — match cards have left accent bars, citation expandables work
- Tracker Kanban: 4 glassmorphism columns visible with correct card counts
- Notifications: icon backgrounds show correct color per type (match=violet, deadline=amber, status=emerald)

---

# B2B SaaS Compliance Dashboard for Chartered Accountants

## Context
Build a single dashboard screen for a compliance SaaS used by CAs managing MSME clients. The spec is fully specified — dark mode, dark blue/grey palette, Linear/Mercury aesthetic. No landing page, no routing, no backend.

## Approach
Single-screen React app rendered from `src/app/App.tsx`, composed of small presentational components. Use the `@make-kits` design system for primitives (Card, Button, Badge, Input, Avatar) and Tailwind for layout. Icons from `lucide-react`.

Before coding, invoke `make:make-kit` and `make:aesthetic-stance` skills to lock down tokens/components, then verify which primitives (Card, Badge, Input, Button, Avatar, Progress) are provided by `@make-kits/*` and use them directly.

## Files
- `src/app/App.tsx` — top-level layout: header + sidebar + main
- `src/app/components/header.tsx` — logo, centered search, notifications + avatar
- `src/app/components/sidebar.tsx` — vertical nav (Dashboard, Clients, Schemes, Applications, Reports, Settings) with lucide icons
- `src/app/components/client-card.tsx` — business name, status badge, progress indicator
- `src/app/components/add-client-card.tsx` — dashed-border "+ Add New Client" tile, same footprint as client cards
- `src/app/components/dashboard-grid.tsx` — grid holding the Add card (top-right position) + 4 client cards
- `src/styles/theme.css` — only if design-system tokens don't already deliver the dark blue/grey palette; otherwise leave alone

## Content (mock data)
4 MSME clients with Indian business names, each with a status badge (e.g. "3 schemes eligible", "1 application in review", "Docs pending", "All up to date") and a 0–100 progress value.

## Verification
- Confirm dev server renders the dashboard with header, sidebar, and a 4-card grid + Add card in the top-right slot.
- Visual check: dark blue/grey palette, rounded corners, generous spacing, medium-weight headings, no light-mode leakage.
- Responsive check at desktop widths (primary target for B2B dashboard).
