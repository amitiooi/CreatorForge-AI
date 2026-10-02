# CreatorForge AI

A minimal, portable foundation for a future SaaS application. This is not a completed product or a production deployment.

## Repository status and ownership

The required permanent source of truth is a **private GitHub repository named `CreatorForge-AI`**, owned by the project owner. Repository creation and connection are **pending GitHub authorization**. No GitHub repository URL has been verified yet; the editor's internal Git remote is not the requested GitHub repository.

Once authorized, create or connect that private repository, synchronize this history, and replace this paragraph with the verified repository URL and default branch. A local commit or an editor preview is not a GitHub backup. Do not publish the repository publicly.

## Stack

- Node.js 24 LTS, specified by `.nvmrc` and `package.json`.
- pnpm 12.3.4, pinned by `packageManager`; commit `pnpm-lock.yaml` with dependency changes.
- Next.js 16 App Router and React 19.
- TypeScript in strict mode.
- Tailwind CSS 4 with semantic theme tokens and system fonts.
- ESLint with Next.js rules; Node's built-in test runner.

No database, authentication, AI provider, payments, analytics, storage service, or platform-specific runtime SDK is configured. No paid service is needed to run the foundation locally.

## Run outside the original editor

Clone the private repository from GitHub after it is connected. A standard terminal on a developer's machine, GitHub Codespace, or another coding environment can use these commands; they do not require the original AI platform.

Prerequisites: Git, Node.js 24, and pnpm 12.3.4. If pnpm is not installed, install that exact version using the Node package manager available on your machine.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. The only screen identifies the project and states that product features are not configured.

No environment variables are needed. `.env.example` is documentation, not a credentials file; copying it is unnecessary at this stage. When services are added, put local values in ignored `.env.local` and hosting values in a secret manager.

## Verification

```sh
pnpm check
pnpm build
pnpm start
```

`check` runs lint, route type generation plus strict TypeScript checking, and foundation tests. Tests exercise response-header configuration, the type-error build gate, and Git environment-file exclusion. These are foundation checks, not future product or end-to-end coverage.

`build` checks the production build locally; it does not deploy anything. `start` serves that build on port 3000, so stop an existing dev server on that port first. HTTPS must be provided by a reverse proxy or hosting platform before any public release.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Local development with hot reload |
| `pnpm lint` | ESLint; warnings fail the check |
| `pnpm typecheck` | Generate Next.js route types, then run TypeScript |
| `pnpm test` | Node test runner; no hosted services required |
| `pnpm check` | All source/configuration checks |
| `pnpm build` | Production build, without deployment |
| `pnpm start` | Run an existing production build |

## Project structure

```text
app/                         # Next.js routes, root layout, global theme
components/                  # Shared presentation components
lib/                         # Framework-independent shared configuration
public/                      # Future static assets; currently only .gitkeep
tests/                       # Foundation tests
.github/workflows/ci.yml      # Manual-only verification; no deployment
.env.example                 # Non-secret environment documentation
.editorconfig                # Editor consistency
.gitattributes               # Cross-platform line endings
.gitignore                   # Secrets, dependencies, output, editor artifacts
.nvmrc                       # Node major version
ARCHITECTURE.md               # Boundaries, decisions, extension guidance
CHANGELOG.md                  # Notable changes and pending setup
README.md                    # Setup and handoff
eslint.config.mjs            # ESLint flat configuration
next.config.mjs              # Next.js build policy and response headers
next-env.d.ts                # Next.js-managed type declarations
package.json                 # Commands, runtime, dependencies
pnpm-lock.yaml               # Reproducible dependency resolution
pnpm-workspace.yaml          # Package manager policy
postcss.config.mjs           # Tailwind/PostCSS integration
tsconfig.json                # Strict compiler configuration
```

Add feature directories and services only when there is an approved requirement; do not create speculative modules or fake integrations.

## Git and CI workflow

- Keep GitHub as the canonical history once connected, and verify remote commits after pushing.
- Use short-lived branches and reviewed pull requests into `main`.
- Run the checks above, review the diff for secrets, and update documentation before merging.
- The included GitHub Actions workflow is **manual-only** (`workflow_dispatch`), read-only, time-limited, and has no deploy job. It has not been run remotely.
- Before running hosted Actions or enabling push/PR triggers, the owner must confirm included usage and spending limits. Never enable paid overages, upgrades, purchases, or services without explicit approval.
- Configure branch protection/rulesets and required reviews/checks if supported by the owner's current GitHub plan. Do not upgrade a plan automatically.

## Security and portability

Never commit real tokens, keys, passwords, credentialed URLs, or user data, even to a private repository. `.gitignore` prevents common mistakes but cannot detect every secret; inspect changes before committing. If a secret is exposed, revoke/rotate it first and coordinate history cleanup.

Server-only credentials must never use the `NEXT_PUBLIC_` prefix. Production builds must continue failing on TypeScript errors. Baseline response headers are in `next.config.mjs`; HTTPS/HSTS configuration and a suitable CSP must be reviewed before a real launch. `noindex` metadata is temporary and is **not** access control.

The code runs with standard Next.js commands on a compatible Node host. GitHub stores source/history, not hosted database contents, service credentials, uploaded files, or AI chat history. Any future data service needs an owner-controlled account and a documented export/restore procedure.

## Pending owner actions

1. Authorize GitHub access and create/connect **private** `CreatorForge-AI` under the intended account or organization.
2. Verify repository URL, visibility, default branch, remote commit hash, and accessibility from the owner's account; update this document.
3. Review collaborator permissions, branch protection availability, account MFA, and Actions billing/spending limits.
4. Define the first product scope before selecting auth, a database, AI models, or billing providers.
5. Approve any future production deployment separately. No deployment, domain purchase, paid upgrade, or billing action is authorized by this foundation step.

## License

Private/proprietary project; no open-source license is granted by this scaffold. `UNLICENSED` and `private: true` prevent accidental npm publication but do not control GitHub visibility.
