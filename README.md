# household-agent

A household scheduling agent for Armani Courtney and Gillian.

## Repository layout

- `apps/web` — Next.js web interface
- `packages/agent` — agent orchestration
- `packages/calendar` — Google Calendar integration
- `packages/household` — household rules, members, and responsibilities
- `packages/database` — Prisma schema and database setup
- `packages/shared` — shared types and utilities
- `mcp/server` — reserved for a future household MCP server
- `docs` — architecture, agent behavior, and design decisions

## Getting started

Use Node.js 20.9 or newer. Copy `.env.example` to `.env`, then start the
database and web app:

```sh
npm install
docker compose up -d
npm run dev
```

The web app is available at <http://localhost:3000>.
