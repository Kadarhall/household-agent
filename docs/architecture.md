# Architecture

The repository is organized as an npm workspace monorepo. The Next.js
application lives in `apps/web`; reusable domain capabilities are separated
into packages under `packages/`.

- `agent` owns orchestration and agent-facing message flows.
- `calendar` owns the Google Calendar integration.
- `household` owns household members, rules, and responsibilities.
- `database` owns the Prisma schema and persistence boundary.
- `shared` contains types and utilities shared between packages.
- `mcp/server` is reserved for a future integration and is not active yet.

The web application is only a starting point. Package boundaries are in place
before integrations and application behavior are implemented.
