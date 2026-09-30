# Project principles

1. Never put secrets in source control.
2. Never allow the LLM to bypass authorization.
3. Google Calendar is the scheduling source of truth.
4. Calendar mutations must go through application tools.
5. Destructive actions require confirmation.
6. Household rules belong in application state, not solely in prompts.
7. All external integrations must be abstracted.
8. Write tests for calendar mutations.

## Implementation notes

- Treat the member context passed into server-side services as trusted only
  after authentication and membership lookup. Never derive permissions from
  LLM output or client-supplied role fields.
- Keep calendar events in Google Calendar; persist only application-owned
  household state and confirmation records in PostgreSQL.
- Check `npm test`, `npm run lint`, `npm run build`, and `npm run db:validate`
  when changing the related code.
