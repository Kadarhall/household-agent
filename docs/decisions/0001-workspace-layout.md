# 0001: Use an npm workspace monorepo

- Status: Accepted

## Context

The application needs a web interface, separable domain and integration
packages, a database package, and a future MCP server.

## Decision

Use npm workspaces to keep the app and packages in one repository while
preserving clear boundaries between them.

## Consequences

Workspace packages can be developed together without publishing. Packages
should remain independently understandable and avoid reaching into another
workspace's internal files.
