# Learnify starter

A self-contained, responsive Learnify MVP prototype. It has a complete demo journey from a user question through intelligence, evidence, verification, AI advisory, human advisory, comparison, and final decision.

## Open locally

Open `index.html` in a browser. No build tooling is required.

## Moving it into Lovable

Use this as the visual and interaction baseline. The prototype routes are hash-based (`#ask`, `#intelligence`, `#evidence`, `#advisory`, `#compare`, and `#decision`) so it requires no server.

All Jabi records, dates, evidence, verification states, contributor counts, and advisor content are clearly labelled illustrative **demo data**. Replace them with authenticated, auditable records before releasing.

### Essential product data model

- `questions`: prompt, location, category, urgency, status, requester
- `intelligence_records`: claim, location, confidence, status, expiry
- `evidence`: record, type, source, date, location, submitter, verification status
- `verifications`: evidence/claim, reviewer, outcome, notes
- `contributions`: user, question, type (answer/confirm/dispute/evidence), reputation effect
- `comparisons`: question, selected options, criteria, recommendation

### Non-negotiable UI rule

Every result page must explicitly separate **Fact**, **Evidence**, **Verification**, **Analysis**, **Advisory**, and **Decision**. This prevents an AI explanation from appearing as a verified observation.

### Recommended implementation order

1. Home and Ask Question flow
2. Question Detail + evidence submission / confirmation
3. Intelligence Results with the six-layer trust model
4. Community/open requests and user dashboard
5. Advisory, comparison, verification queue, and admin areas
