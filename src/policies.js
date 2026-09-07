/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. */
export const POLICY_VERSION = "0.1.0";

export const policies = [
  {
    id: "GOV-001",
    title: "Named human accountability",
    severity: "medium",
    score: 8,
    when: (x) => x.impact !== "low",
    reason: "Material AI-enabled outcomes require clear human accountability and an escalation path.",
    controls: ["Named business owner", "Escalation path", "Decision authority documented"]
  },
  {
    id: "HITL-001",
    title: "Human approval for high-impact action",
    severity: "critical",
    score: 22,
    blocker: true,
    when: (x) => x.impact === "high" && x.autonomy === "autonomous" && !x.humanApproval,
    reason: "The use case can produce high-impact outcomes without human approval.",
    controls: ["Human approval gate", "Override mechanism", "Escalation and appeal process"]
  },
  {
    id: "DATA-001",
    title: "Personal data governance",
    severity: "high",
    score: 14,
    when: (x) => x.personalData,
    reason: "The system processes personal data and therefore needs explicit data governance controls.",
    controls: ["Data inventory", "Purpose and retention controls", "Access control", "Privacy review"]
  },
  {
    id: "DATA-002",
    title: "Sensitive data safeguards",
    severity: "critical",
    score: 18,
    when: (x) => x.sensitiveData,
    reason: "Sensitive data materially increases the consequence of misuse, leakage, bias or inappropriate access.",
    controls: ["Sensitive-data handling standard", "Least-privilege access", "Enhanced impact assessment", "Data minimisation"]
  },
  {
    id: "LOG-001",
    title: "Decision traceability",
    severity: "high",
    score: 12,
    when: (x) => x.impact !== "low" && !x.auditLogging,
    reason: "Material AI-supported decisions are not currently captured in an audit trail.",
    controls: ["Decision logging", "Input/output traceability", "Retention schedule"]
  },
  {
    id: "MON-001",
    title: "Post-deployment monitoring",
    severity: "high",
    score: 12,
    when: (x) => x.impact !== "low" && !x.monitoring,
    reason: "The use case lacks defined post-deployment monitoring for performance, incidents or control drift.",
    controls: ["Monitoring KPIs", "Incident thresholds", "Periodic control review", "Rollback / suspension criteria"]
  },
  {
    id: "TPRM-001",
    title: "Third-party AI assurance",
    severity: "medium",
    score: 9,
    when: (x) => !x.vendorAssessed,
    reason: "No supplier/model assurance has been recorded for the AI capability.",
    controls: ["Vendor due diligence", "Model/service documentation", "Contractual AI controls", "Exit / substitution plan"]
  },
  {
    id: "GEN-001",
    title: "Generative AI output controls",
    severity: "medium",
    score: 8,
    when: (x) => x.generativeAI && x.impact !== "low",
    reason: "Generative output can introduce hallucination, inappropriate content, provenance and reliability risks.",
    controls: ["Output validation", "Grounding / source controls", "Content safeguards", "Known-limitations statement"]
  },
  {
    id: "TRANS-001",
    title: "AI interaction transparency",
    severity: "medium",
    score: 8,
    when: (x) => x.generativeAI && ["customers", "both"].includes(x.audience) && !x.aiDisclosure,
    reason: "External users may interact with AI-generated content without an appropriate disclosure control.",
    controls: ["AI interaction disclosure", "User guidance", "Human support route"]
  },
  {
    id: "DOMAIN-EMP-001",
    title: "Employment decision safeguards",
    severity: "critical",
    score: 20,
    when: (x) => x.domain === "employment" && x.impact === "high",
    reason: "AI used in high-impact employment contexts warrants enhanced fairness, contestability and oversight controls.",
    controls: ["Bias and fairness testing", "Human review", "Candidate/employee contestability", "Impact assessment"]
  },
  {
    id: "DOMAIN-FIN-001",
    title: "Financial outcome safeguards",
    severity: "critical",
    score: 20,
    when: (x) => x.domain === "financial" && x.impact === "high",
    reason: "High-impact financial outcomes require enhanced governance, validation and customer protection controls.",
    controls: ["Model validation", "Human review", "Outcome monitoring", "Customer challenge route"]
  },
  {
    id: "DOMAIN-HLTH-001",
    title: "Healthcare safety safeguards",
    severity: "critical",
    score: 20,
    when: (x) => x.domain === "healthcare" && x.impact === "high",
    reason: "High-impact healthcare use cases can affect safety and require enhanced clinical and operational oversight.",
    controls: ["Safety assessment", "Qualified human review", "Clinical/operational validation", "Incident management"]
  },
  {
    id: "AUTO-001",
    title: "Autonomous action governance",
    severity: "high",
    score: 13,
    when: (x) => x.autonomy === "autonomous",
    reason: "Autonomous action increases the need for defined authority boundaries, safe failure and intervention controls.",
    controls: ["Action boundaries", "Kill / suspend control", "Rate and scope limits", "Human intervention path"]
  }
];

export const frameworkSignals = (x, triggered) => {
  const ids = new Set(triggered.map(p => p.id));
  return [
    {
      name: "NIST AI RMF",
      signal: "Govern / Map / Measure / Manage",
      detail: ids.size
        ? "The result emphasises governance ownership, contextual risk mapping, measurable controls and ongoing management."
        : "No material risk signals were triggered, but lifecycle governance remains applicable."
    },
    {
      name: "ISO/IEC 42001",
      signal: "AI management system concerns",
      detail: "The assessment surfaces accountability, risk treatment, operational controls, monitoring and continual-review considerations."
    },
    {
      name: "EU AI Act screening",
      signal: "Risk-based screening only",
      detail: x.generativeAI || x.impact === "high"
        ? "The use case has characteristics that warrant formal EU AI Act applicability and obligation screening by a qualified owner."
        : "No elevated indicator is asserted here; formal applicability still depends on role, system purpose and deployment context."
    }
  ];
};
