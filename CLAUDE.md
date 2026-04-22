# CLAUDE.md

## Writing style

- Never use em dashes in any output, comments, or documentation. Use commas, colons, parentheses, or reword instead.

## Project structure

- `index.html` - single-page front-end, no build step
- `api/matches.js` - proxy endpoint returning all matches for a team/event
- `api/next-match.js` - endpoint returning only the next upcoming match
- `api/_utils.js` - shared helpers for auth, env var checks, and RobotEvents fetch

## API conventions

- Both endpoints are protected by an optional `x-api-token` header checked against `API_TOKEN` env var.
- The RobotEvents JWT is kept server-side in `ROBOTEVENTS_TOKEN` and never exposed to the browser.
- Shared logic (auth check, env var guard, upstream fetch) lives in `api/_utils.js`.

## Environment variables

- `ROBOTEVENTS_TOKEN` - RobotEvents Bearer token
- `API_TOKEN` - secret for protecting the API endpoints (optional; if unset, endpoints are open)

## Deployment

Deploys to Vercel as a static site with serverless functions in `api/`. No build configuration needed.
