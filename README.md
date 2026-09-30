# Household Agent

Armani Courtney and Gillian household scheduling agent.

## Getting started

Requirements: Node.js 24+ and npm 11+.

```sh
npm install
cp .env.example .env
npm run dev
```

The web app is available at [http://localhost:3000](http://localhost:3000). The
workspace layout and current implementation boundaries are described in
[`docs/architecture.md`](docs/architecture.md).

To run the web app and PostgreSQL with Docker Compose:

```sh
docker compose up
```

The app currently provides a scaffold only; calendar integration, household
workflows, and agent behavior are not implemented yet.
