# Decision 0001: Monorepo layout

- Status: accepted

## Context

The web interface, agent orchestration, calendar integration, household
domain, and persistence need clear ownership while remaining easy to develop
together.

## Decision

Use an npm workspace monorepo with the Next.js application in `apps/web` and
reusable capabilities in `packages/`. Keep the future MCP server under
`mcp/server` without making it an active workspace package.

## Consequences

Packages can be developed independently while sharing a single repository and
dependency installation. Integrations and operational behavior can be added
within their owning packages as requirements are defined.
