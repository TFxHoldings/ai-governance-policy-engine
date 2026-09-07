# TFx AI Governance Policy Engine

> From AI use case to explainable governance decision.

A public, dependency-free web application demonstrating **AI governance policy-as-code**. It converts a structured AI use-case profile into a deterministic governance posture, control plan and rule-by-rule audit trace.

## Why this exists

Many governance tools hide the decision logic behind a model, questionnaire score or proprietary workflow. This demonstrator takes the opposite approach:

- **Deterministic** — the same inputs produce the same output.
- **Explainable** — every score increment and required control maps to a visible policy.
- **Auditable** — policies are version-controlled source code.
- **Self-contained** — no database, API key, cloud service, framework or package install is required to run the app.
- **Portable** — deploy as static files on GitHub Pages or any static web host.

## Demo capabilities

- Structured AI use-case assessment
- Risk and governance posture from `STANDARD CONTROLS` through `DO NOT DEPLOY`
- Explicit blocking conditions
- Required-control generation
- Policy trace showing *why* each rule fired
- High-level NIST AI RMF, ISO/IEC 42001 and EU AI Act screening signals
- Downloadable JSON assessment record
- Responsive TFx-branded UI
- Automated unit tests for core policy behaviour

## Run locally

No dependency installation is required.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

You can also use:

```bash
npm run serve
```

## Run tests

Tests use Node's built-in test runner and have no third-party dependencies:

```bash
npm test
```

## Architecture

```text
Browser
  |
  +-- index.html              UI shell
  +-- styles.css              responsive presentation
  |
  +-- src/app.js              form state + rendering + report download
      |
      +-- src/policy-engine.js deterministic evaluation
          |
          +-- src/policies.js policy catalogue + framework signals
```

No input is transmitted off-device.

## Policy model

A policy is intentionally explicit:

```js
{
  id: "HITL-001",
  title: "Human approval for high-impact action",
  severity: "critical",
  score: 22,
  blocker: true,
  when: (useCase) =>
    useCase.impact === "high" &&
    useCase.autonomy === "autonomous" &&
    !useCase.humanApproval,
  controls: [
    "Human approval gate",
    "Override mechanism",
    "Escalation and appeal process"
  ]
}
```

This makes governance logic inspectable, testable and change-controlled.

## Framework positioning

The project is informed by governance concerns reflected in:

- **NIST AI Risk Management Framework** — Govern, Map, Measure and Manage.
- **ISO/IEC 42001** — organisational AI management-system governance, risk and continual improvement.
- **EU AI Act** — risk-based obligations and transparency considerations.

This project **does not claim to implement or certify compliance** with any of those frameworks. Its framework output is a screening aid only.

## Branding

The application uses the TFx Holdings visual identity throughout the web interface. The supplied logo is included under `assets/` for use by this project. The UI palette is derived from the logo's deep navy, teal and lime-green tones.

## Security and privacy

The app runs entirely in the browser and contains no telemetry, cookies, analytics, remote fonts or API calls. See [`SECURITY.md`](./SECURITY.md).

## Roadmap

Potential future increments:

1. JSON-defined policy DSL instead of JavaScript predicates
2. Policy schema validation
3. Jurisdiction/profile packs
4. Evidence register
5. Assessment history using optional local browser storage
6. Signed policy releases and changelog
7. WCAG accessibility review
8. Import/export of use-case profiles

## Contributing

Contributions are welcome. See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Licence

Mozilla Public License 2.0 (MPL-2.0). See [`LICENSE`](./LICENSE).

The TFx Holdings name, logo, branding and trademarks are not licensed for reuse.

## Disclaimer

This software is an educational and portfolio demonstrator. It is not legal advice, certification, an audit, a conformity assessment, or an automated determination of obligations under the EU AI Act, ISO/IEC 42001, NIST AI RMF, or any other law, standard or framework.

---

**TFx Holdings**  
AI Value Realisation · Operating Models · Organisational Intelligence
