# Household Agent

Hearth is a starting point for a household coordination assistant. It pairs a
Next.js interface with application-owned authorization and calendar mutation
rules. Google Calendar is intended to remain the scheduling source of truth;
the UI currently contains clearly labeled preview data and is not connected to
an account or calendar.

## Stack

- Next.js and TypeScript
- OpenAI API for suggestions (no calendar tools are exposed to the model)
- Google Calendar API behind an application gateway
- PostgreSQL with Prisma for household membership, rules, and confirmations

## Run locally

1. Install Node.js 20.9 or newer and PostgreSQL.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill in credentials locally. Never commit
   `.env` or real credentials.
4. Run `npm run db:generate`, then `npm run db:migrate`.
5. Run `npm run dev` and open `http://localhost:3000`.

`npm test`, `npm run lint`, `npm run build`, and `npm run db:validate` run the
available checks.

## Safety boundaries

- Calendar events are mutated through `src/lib/calendar/service.ts` and an
  injected calendar gateway; the Google adapter is in
  `src/lib/calendar/google-calendar.ts`.
- The mutation service requires an application-supplied trusted member context
  and checks household scope and calendar permissions before calling a
  provider.
- Updates and deletes require a confirmation ID that the application verifies
  against its persisted confirmation state. The model cannot confirm actions.
- The Prisma schema stores household rules and confirmation state, not a
  second copy of calendar events.
- `src/lib/assistant/reasoning.ts` supplies the model only with caller-provided
  schedule context and rules. Its output is a suggestion, never an executable
  calendar mutation.

Authentication, confirmation persistence, and calendar account linking must
be connected by the application before exposing schedule operations through an
HTTP route. Until then, the dashboard is only a sample preview.
