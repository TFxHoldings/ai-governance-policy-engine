# Architecture

## Objective

Keep the first public release inspectable and dependency-free while separating presentation from policy evaluation.

## Components

### `index.html`
Semantic UI, assessment form and result presentation.

### `styles.css`
Responsive design system with no external font or asset dependency.

### `src/app.js`
Browser adapter. Collects form input, invokes the engine, safely renders output and exports the result as JSON.

### `src/policy-engine.js`
Pure deterministic orchestration:
1. evaluate policies;
2. sum capped risk score;
3. identify blockers;
4. deduplicate controls;
5. determine governance posture;
6. return a serialisable assessment record.

### `src/policies.js`
Versioned rule catalogue. Each policy has a stable identifier, trigger predicate, rationale, score, severity and control set.

## Trust boundary

All user input remains in the browser. There is no server component, remote persistence or third-party API.

## Deliberate limitations

- The numeric score is an illustrative governance triage mechanism, not a regulatory risk classification.
- Framework mappings are screening signals, not clause-level mappings.
- JavaScript predicates are used in v0.1 for clarity. A future release may introduce a validated data-driven policy DSL.
