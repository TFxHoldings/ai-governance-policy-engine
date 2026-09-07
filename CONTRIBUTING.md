# Contributing

Contributions that improve policy clarity, tests, accessibility, architecture or documentation are welcome.

## Principles

1. Keep the core engine deterministic.
2. Every new policy requires a stable ID, rationale and test coverage.
3. Do not describe an illustrative rule as a legal determination.
4. Avoid external runtime dependencies unless there is a clear architectural reason.
5. Do not add telemetry or data transmission without explicit design review.

## Development

```bash
python3 -m http.server 8000
npm test
```

## Pull requests

Explain:
- the governance problem addressed;
- the policy/control change;
- expected behaviour;
- tests added or updated;
- any framework references used.
