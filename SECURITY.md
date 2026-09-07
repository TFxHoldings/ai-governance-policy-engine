# Security Policy

## Data handling

This application is intentionally static and client-side:

- no backend;
- no database;
- no authentication;
- no API keys;
- no telemetry;
- no analytics;
- no cookies;
- no third-party JavaScript;
- no remote fonts;
- no network submission of assessment data.

Downloaded JSON reports are created locally in the browser.

## Reporting a vulnerability

Please avoid including sensitive production data in a public GitHub issue. Use the repository owner's published security contact channel where available.

## Threat-model notes

The current release is a demonstrator. Hosting operators should still configure appropriate HTTP security headers where their static hosting platform permits them.
