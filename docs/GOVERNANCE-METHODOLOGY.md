# Governance Methodology

The engine demonstrates a simple governance-by-design pattern:

1. **Context first** — purpose, domain, autonomy, impact and affected users.
2. **Risk signals** — data sensitivity, generative behaviour, external interaction and autonomy.
3. **Control evidence** — human approval, logging, monitoring, vendor assessment and disclosure.
4. **Deterministic rules** — explicit policies translate conditions into risks and controls.
5. **Decision posture** — aggregate signals determine whether the use case requires proportionate review, conditional pilot, enhanced governance or should not deploy until a blocker is resolved.
6. **Traceability** — the report retains the input, engine version, triggered policies and controls.

## Framework inspiration

The project uses high-level concepts consistent with established AI governance practice:

- NIST AI RMF's Govern, Map, Measure and Manage lifecycle functions.
- ISO/IEC 42001's management-system approach to policies, objectives, risk/opportunity management and continual improvement.
- The EU AI Act's risk-based regulatory model and transparency obligations.

No copyrighted standards text is reproduced and no clause-level compliance claim is made.

## Scoring

Policy scores are intentionally transparent and capped at 100. The score is a triage aid only.

- 0–14: Standard controls
- 15–39: Proportionate review
- 40–69: Conditional pilot
- 70–100: Enhanced governance
- Any blocking rule: Do not deploy until resolved

These thresholds are a product-design choice, not regulatory thresholds.
