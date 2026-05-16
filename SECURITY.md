# Security Policy

This repository is published as a portfolio artifact. The deployed
application at **https://buzzards-soft.com** is the production target.

## Reporting a Vulnerability

If you discover a security issue affecting the deployed site or its
back-end (the Firebase Cloud Function that relays the contact form),
please report it privately to **dev.buzzardssoft@gmail.com**.

Please include:

- A clear description of the issue and its potential impact
- Steps to reproduce, ideally a minimal proof-of-concept
- Any relevant logs, URLs, or affected endpoints

I aim to acknowledge reports within **48 hours** and to triage within
one week. There is no formal bug-bounty program — this is a
single-person studio — but credit can be given in the README on request.

## Scope

In scope:

- The deployed site at `https://buzzards-soft.com`
- The contact-form Cloud Function (`functions/`)
- Configuration and dependency-supply-chain issues in this repository

Out of scope:

- Vulnerabilities reachable only through unauthorised forks or
  derivatives. The view-only [`LICENSE`](./LICENSE) does not grant
  the right to deploy this code.
- Reports against third-party assets attributed in [`NOTICE.md`](./NOTICE.md);
  those should be reported to their respective owners.
