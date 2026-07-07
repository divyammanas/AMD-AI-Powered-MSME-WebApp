export type MatchStatus = "suggested" | "approved" | "rejected" | "drafted" | "submitted" | "disbursed";

export interface Client {
  id: string;
  name: string;
  sector: "manufacturing" | "service" | "trading";
  state: string;
  district: string;
  udyam: string;
  gstin: string;
  classification: "micro" | "small" | "medium";
  turnover: number;
  investment: number;
  employees: number;
  matchCount: number;
  potentialValue: number;
  status: "onboarded" | "matched" | "in-progress" | "disbursed";
  documents: { name: string; type: string; ocr: "success" | "review" | "pending" }[];
}

export interface Match {
  id: string;
  clientId: string;
  scheme: string;
  issuingBody: string;
  benefit: number;
  confidence: "high" | "medium" | "review";
  reason: string;
  citation: string;
  clauseRef: string;
  lastVerified: string;
  status: MatchStatus;
}

export interface Invoice {
  id: string;
  clientId: string;
  disbursed: number;
  feePct: number;
  fee: number;
  status: "pending" | "sent" | "paid";
  date: string;
}

export const clients: Client[] = [
  {
    id: "c1", name: "Ramesh Machine Parts Pvt Ltd", sector: "manufacturing",
    state: "Maharashtra", district: "Pune", udyam: "UDYAM-MH-25-0012345",
    gstin: "27ABCDE1234F1Z5", classification: "small", turnover: 42000000,
    investment: 8500000, employees: 24, matchCount: 4, potentialValue: 2850000,
    status: "in-progress",
    documents: [
      { name: "Udyam Certificate.pdf", type: "Registration", ocr: "success" },
      { name: "GSTR-9 FY24.pdf", type: "GST Return", ocr: "success" },
      { name: "Balance Sheet FY24.pdf", type: "Financial", ocr: "review" },
    ],
  },
  {
    id: "c2", name: "Krishna Textiles", sector: "manufacturing",
    state: "Maharashtra", district: "Nashik", udyam: "UDYAM-MH-25-0089221",
    gstin: "27KRISH5678G1Z2", classification: "micro", turnover: 8500000,
    investment: 1200000, employees: 9, matchCount: 3, potentialValue: 1420000,
    status: "matched",
    documents: [
      { name: "Udyam Certificate.pdf", type: "Registration", ocr: "success" },
      { name: "GSTR-3B.pdf", type: "GST Return", ocr: "success" },
    ],
  },
  {
    id: "c3", name: "Deshmukh Trading Co.", sector: "trading",
    state: "Maharashtra", district: "Mumbai", udyam: "UDYAM-MH-25-0044120",
    gstin: "27DESHM9911H1Z8", classification: "small", turnover: 62000000,
    investment: 4200000, employees: 18, matchCount: 2, potentialValue: 950000,
    status: "disbursed",
    documents: [
      { name: "Udyam Certificate.pdf", type: "Registration", ocr: "success" },
      { name: "ITR FY24.pdf", type: "Tax", ocr: "success" },
    ],
  },
  {
    id: "c4", name: "Saraswati Foods", sector: "manufacturing",
    state: "Maharashtra", district: "Aurangabad", udyam: "UDYAM-MH-25-0071009",
    gstin: "27SARAS3344J1Z1", classification: "micro", turnover: 5400000,
    investment: 800000, employees: 6, matchCount: 5, potentialValue: 3120000,
    status: "matched",
    documents: [
      { name: "Udyam Certificate.pdf", type: "Registration", ocr: "success" },
    ],
  },
  {
    id: "c5", name: "Ankit Digital Services", sector: "service",
    state: "Maharashtra", district: "Pune", udyam: "UDYAM-MH-25-0102993",
    gstin: "27ANKIT7788K1Z4", classification: "small", turnover: 18500000,
    investment: 2400000, employees: 14, matchCount: 2, potentialValue: 680000,
    status: "onboarded",
    documents: [],
  },
];

export const matches: Match[] = [
  {
    id: "m1", clientId: "c1", scheme: "CGTMSE — Collateral-Free Credit Guarantee",
    issuingBody: "Ministry of MSME", benefit: 15000000, confidence: "high",
    reason: "Small enterprise, manufacturing, turnover under ₹50Cr, no existing collateral-backed loan.",
    citation: "CGTMSE Scheme Guidelines 2024, Clause 4.2: 'Micro & Small Enterprises engaged in manufacturing or service activities are eligible for credit facility up to ₹5 crore per borrower.'",
    clauseRef: "§4.2", lastVerified: "2026-06-14", status: "approved",
  },
  {
    id: "m2", clientId: "c1", scheme: "PMEGP — Margin Money Subsidy",
    issuingBody: "KVIC", benefit: 850000, confidence: "high",
    reason: "Manufacturing unit in Tier-2 area, project cost within ₹25L limit.",
    citation: "PMEGP Guidelines 2023, §3.1: 'Margin money subsidy at 15-35% depending on category and area.'",
    clauseRef: "§3.1", lastVerified: "2026-05-22", status: "drafted",
  },
  {
    id: "m3", clientId: "c1", scheme: "Maharashtra Industrial Promotion Subsidy",
    issuingBody: "Govt. of Maharashtra", benefit: 1200000, confidence: "medium",
    reason: "Registered manufacturing unit in eligible zone. Requires ZED certification (missing).",
    citation: "MH IPS Policy 2023, Schedule II",
    clauseRef: "Sch. II", lastVerified: "2026-04-30", status: "suggested",
  },
  {
    id: "m4", clientId: "c1", scheme: "TEQUP — Technology Upgradation",
    issuingBody: "Ministry of MSME", benefit: 400000, confidence: "review",
    reason: "May qualify — needs energy audit report for verification.",
    citation: "TEQUP Scheme §2.4",
    clauseRef: "§2.4", lastVerified: "2026-03-18", status: "suggested",
  },
  {
    id: "m5", clientId: "c2", scheme: "MUDRA — Kishor Loan",
    issuingBody: "MUDRA / SIDBI", benefit: 500000, confidence: "high",
    reason: "Micro-enterprise, turnover under ₹1Cr, no existing MUDRA loan.",
    citation: "MUDRA Guidelines §2.1: 'Kishor category covers loans between ₹50,000 to ₹5 lakh.'",
    clauseRef: "§2.1", lastVerified: "2026-06-01", status: "suggested",
  },
  {
    id: "m6", clientId: "c2", scheme: "PMEGP — Margin Money Subsidy",
    issuingBody: "KVIC", benefit: 620000, confidence: "high",
    reason: "Rural micro unit, textiles category eligible for 35% margin subsidy.",
    citation: "PMEGP Guidelines 2023, §3.1", clauseRef: "§3.1",
    lastVerified: "2026-05-22", status: "suggested",
  },
  {
    id: "m7", clientId: "c2", scheme: "TUFS — Technology Upgradation Fund",
    issuingBody: "Ministry of Textiles", benefit: 300000, confidence: "medium",
    reason: "Textile SSI eligible for 10% capital subsidy on new machinery.",
    citation: "ATUFS §5.3", clauseRef: "§5.3",
    lastVerified: "2026-04-11", status: "suggested",
  },
  {
    id: "m8", clientId: "c3", scheme: "CGTMSE — Collateral-Free Credit Guarantee",
    issuingBody: "Ministry of MSME", benefit: 700000, confidence: "high",
    reason: "Trading enterprise, no collateral-backed working capital line.",
    citation: "CGTMSE Guidelines §4.2", clauseRef: "§4.2",
    lastVerified: "2026-06-14", status: "disbursed",
  },
  {
    id: "m9", clientId: "c3", scheme: "Interest Subvention Scheme (MSE)",
    issuingBody: "Ministry of MSME", benefit: 250000, confidence: "high",
    reason: "GST-registered, incremental turnover qualifies.",
    citation: "ISS §2.2", clauseRef: "§2.2",
    lastVerified: "2026-05-05", status: "submitted",
  },
  {
    id: "m10", clientId: "c4", scheme: "PMFME — Food Processing Micro Enterprise",
    issuingBody: "MoFPI", benefit: 1000000, confidence: "high",
    reason: "Food processing micro-unit, eligible for 35% capital subsidy up to ₹10L.",
    citation: "PMFME Guidelines §4.1", clauseRef: "§4.1",
    lastVerified: "2026-06-02", status: "approved",
  },
  {
    id: "m11", clientId: "c4", scheme: "PMEGP — Margin Money Subsidy",
    issuingBody: "KVIC", benefit: 800000, confidence: "high",
    reason: "Rural food manufacturing, eligible for 35% margin subsidy.",
    citation: "PMEGP §3.1", clauseRef: "§3.1",
    lastVerified: "2026-05-22", status: "suggested",
  },
];

export const invoices: Invoice[] = [
  { id: "inv-001", clientId: "c3", disbursed: 700000, feePct: 8, fee: 56000, status: "paid", date: "2026-06-12" },
  { id: "inv-002", clientId: "c1", disbursed: 850000, feePct: 8, fee: 68000, status: "sent", date: "2026-06-28" },
];

export const notifications = [
  { id: "n1", type: "match", title: "3 new matches for Saraswati Foods", time: "2h ago", unread: true },
  { id: "n2", type: "deadline", title: "PMEGP application draft ready for review — Ramesh Machine Parts", time: "5h ago", unread: true },
  { id: "n3", type: "status", title: "Disbursement confirmed: Deshmukh Trading — ₹7,00,000", time: "1d ago", unread: false },
  { id: "n4", type: "deadline", title: "ZED certification needed for MH IPS match", time: "2d ago", unread: false },
  { id: "n5", type: "match", title: "Scheme knowledge base updated — 4 rules revised", time: "3d ago", unread: false },
];

export const inr = (n: number) =>
  n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr`
  : n >= 100000 ? `₹${(n / 100000).toFixed(2)} L`
  : `₹${n.toLocaleString("en-IN")}`;

export const getClient = (id: string) => clients.find((c) => c.id === id);
export const getMatchesFor = (clientId: string) => matches.filter((m) => m.clientId === clientId);