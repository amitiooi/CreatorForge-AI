# Changelog

Notable project changes are recorded here. Update this file alongside implementation changes; do not treat AI conversation history as the project record.

## [0.1.0] - 2026-10-02

### Added

- CreatorForge AI identity and a minimal foundation-only screen.
- Strict TypeScript, Node 24 runtime policy, pinned pnpm, and reproducible dependency locking.
- ESLint, type checking, native Node foundation tests, and shared verification commands.
- A manual-only GitHub Actions verification workflow with no deployment job.
- README, architecture guidance, changelog, and a non-secret environment template.
- Editor conventions, cross-platform Git line endings, and stronger secret/artifact exclusions.
- Baseline security headers and temporary non-indexing metadata.

### Changed

- Removed the starter's TypeScript build-error bypass.
- Removed editor branding, analytics, unused UI dependencies, and sample assets.
- Kept runtime dependencies limited to Next.js, React, and React DOM.

### Pending

- Create/connect the owner's private GitHub repository `CreatorForge-AI`; GitHub credentials were unavailable during local foundation setup.
- Verify remote visibility, URL, default branch, commit synchronization, and owner access.
- Review GitHub repository safeguards and Actions usage/spending limits before executing hosted CI.
- Upgrade the deprecated development-only ESLint 9 once the Next.js React lint plugin supports ESLint 10; the current compatible version is pinned and checked.

### Out of scope

- Product features, persistence, authentication, AI integrations, payment processing, and production deployment.
- Paid service provisioning, upgrades, domain purchases, and billing changes.
