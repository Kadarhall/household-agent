# Architecture

The repository is an npm workspace monorepo. The web app lives in `apps/web`;
domain packages live in `packages/`; and the future Model Context Protocol
(MCP) server lives in `mcp/server`.

## Workspace boundaries

- `apps/web` — Next.js App Router interface.
- `packages/agent` — agent and orchestration logic.
- `packages/calendar` — Google Calendar integration.
- `packages/household` — household members, rules, and responsibilities.
- `packages/database` — Prisma schema and generated client entry point.
- `packages/shared` — types and utilities shared across workspaces.
- `mcp/server` — future MCP server interface.

The packages are intentionally small scaffolds. Keep business logic in the
domain packages rather than coupling it to the web app. The database schema is
the persistence boundary, and integrations should be accessed through their
own packages.

## Local development

Run `npm install` followed by `npm run dev` to start the web app. Set
`DATABASE_URL` in `.env` before generating the Prisma client with
`npm run db:generate`. `docker compose up` starts the web app and a local
PostgreSQL instance.
