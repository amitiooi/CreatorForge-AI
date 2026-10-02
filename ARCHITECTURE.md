# Architecture

## Status and scope

CreatorForge AI is at the foundation stage. The only route is a non-interactive scaffold notice. There are no users, stored records, product workflows, AI calls, payments, or production deployment.

The intended permanent source of truth is the owner's private GitHub repository `CreatorForge-AI`. At foundation creation, GitHub credentials were unavailable; remote creation, connection, and synchronization remain unverified. Documentation in Git, rather than AI conversation history, carries project decisions forward.

## Decisions

| Decision | Reason and constraint |
| --- | --- |
| Single Next.js application | Avoid monorepo overhead before distinct deployable products exist. |
| App Router, React Server Components by default | Keep server code and rendering close; only add client components for browser interactivity. |
| TypeScript strict mode | Make contracts discoverable and catch errors before release. |
| Node 24 and pinned pnpm/lockfile | Reproduce the development and verification environment. |
| Tailwind 4, semantic tokens, system fonts | Portable styling without external font requests or a UI framework dependency. |
| Native Node tests and ESLint | Establish checks without adding a product test framework prematurely. |
| No service integrations yet | Avoid costs, unnecessary credentials, vendor commitments, and speculative schema design. |
| Standard Node deployment contract | No dependency on v0, Vercel analytics, or the original editor at runtime. |
| Manual-only CI | Prepare verification without triggering hosted usage before the owner reviews billing limits. |

The starter's unused UI tooling, icons, sample images, and analytics are removed. Dependencies should only be added when needed by implemented code or a quality check.

ESLint is pinned to 9.39.5 because the React plugin included by `eslint-config-next` 16.3.3 fails with ESLint 10's removed context APIs. ESLint 9 is deprecated; it is development-only, but upgrading to a supported compatible lint stack is a tracked maintenance item. Do not force a major-version upgrade or suppress lint rules to hide this incompatibility. pnpm explicitly permits only the required `unrs-resolver` native postinstall script; review new lifecycle scripts before approving them.

## Current dependency direction

```text
app/page.tsx -> components/foundation-status.tsx -> lib/app-config.ts
app/layout.tsx ---------------------------------> lib/app-config.ts
app/layout.tsx -> app/globals.css
```

- `app/`: Route composition, document metadata, and global styles. Keep route files thin.
- `components/`: Reusable presentation. It must not contain database credentials or direct privileged service access.
- `lib/`: Shared configuration and small utilities. `app-config.ts` intentionally contains only public, non-secret values.
- `tests/`: Executable foundation assertions using `node:test`.
- `public/`: Static, publicly accessible files only. Never put private documents or secrets here.
- `.github/workflows/`: Verification configuration only; no deployment credentials or jobs.

## Extension rules for future work

Create these boundaries only when the corresponding capability is approved:

1. Feature-specific UI and domain behavior can live under `features/<feature>/`; promote code to shared components only when it is actually shared.
2. Put database clients, provider adapters, and privileged operations under a clearly server-only module boundary. Add `server-only` protection when such modules are introduced.
3. Route Handlers and Server Actions validate all untrusted inputs and enforce authentication and authorization on the server. A hidden button or client redirect is not access control.
4. Choose a real database before implementing persisted product data. Do not substitute browser storage or fake authentication for a backend.
5. Every user-owned data operation must be scoped to the authenticated user/tenant, with transactions and database-level constraints where appropriate.
6. Keep provider calls behind small interfaces so future migrations do not require rewriting the product UI.
7. Store schema migrations, environment-variable documentation, and data export/restore instructions alongside the feature that introduces them.
8. Add behavioral tests with each feature. Introduce a browser test framework when real flows justify it; current foundation tests do not replace integration or end-to-end coverage.

No specific database, auth system, AI SDK/model, payment provider, queue, or storage service is selected by this document.

## Security baseline

- The repository must remain private, independently of `package.json`'s npm `private` flag.
- `.env` and `.env.*` are ignored except the non-secret `.env.example`; common private-key files, local npm credentials, generated artifacts, and editor scaffolding are ignored as well.
- Builds must fail on TypeScript errors. ESLint warnings fail checks.
- Next.js does not emit its `X-Powered-By` header.
- Response headers set `nosniff`, a strict-origin referrer policy, and disable unused camera/microphone/geolocation APIs. Revisit those permissions if product features need them.
- Production-mode responses set HSTS without `includeSubDomains`; a public deployment must provide HTTPS and review subdomain ownership.
- Frame restrictions and CSP are intentionally deferred until there are authenticated/state-changing routes and known integration origins. Before launch, design and test an appropriate CSP and clickjacking policy rather than silently breaking legitimate embeds.
- The foundation uses `noindex, nofollow` metadata, which discourages indexing but provides no security protection.
- Do not send credentials, user content, or personal data to logs.

## Execution and deployment contract

A clean clone plus Node 24 and pnpm 12.3.4 can install dependencies with the committed lockfile and run `pnpm check`, `pnpm build`, and `pnpm start`. The foundation requires no application-specific environment variables, network service credentials, or editor-injected runtime modules.

A future host must support the selected Next.js/Node versions, route HTTP requests to the process, and terminate HTTPS. Vercel is optional; a compatible Node host can run the same application. Container packaging or static export should only be added if the selected deployment target calls for it.

No production project, automatic deploy hook, DNS configuration, or domain purchase is established here. Build verification is not a deployment.

## Handoff checklist

- Confirm the private repository URL and remote commit match the approved source.
- Read README, this document, and CHANGELOG before editing.
- Install from the committed lockfile; run checks and the build.
- Review the scoped feature request, trace existing callers, and preserve unrelated behavior.
- Record architectural decisions and environment changes in these documents.
- Keep source, service accounts, billing ownership, and future data backups under the project owner's control.
- Obtain explicit approval for paid services/upgrades, domain purchases, billing actions, destructive data operations, and production deployment.
