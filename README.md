# VEX Match Schedule

A simple single-page app for viewing upcoming VEX Robotics match schedules, built for use with the [RobotEvents API](https://www.robotevents.com/api/v2).

## Usage

Open `index.html` in a browser (or deploy to Vercel). On first load you'll be prompted for:

| Setting | Description |
|---|---|
| **API Token** | The `x-api-token` secret (matches the `API_TOKEN` env var on the server) |
| **Team ID** | Numeric team ID from RobotEvents (e.g. `96957`) |
| **Event ID** | Numeric event ID from RobotEvents (e.g. `64025`) |

All three values are cached in `localStorage` so you only need to enter them once.

## Features

- Match grid grouped by day
- Blue/red alliance display with your team highlighted
- Scores for completed matches, win highlight
- Practice vs Qualifier vs Upcoming status badges
- Manual refresh button + optional 30-second auto-refresh

## Getting an API Token

The token entered in Settings must match the `API_TOKEN` env var set on your Vercel deployment. Choose any secret string and set it in both places.

## API Endpoints

Both endpoints require an `x-api-token` request header matching the `API_TOKEN` env var.

`GET /api/matches?teamId=96957&eventId=64025`

Returns the full array of matches for the given team and event. Used by the front-end UI.

`GET /api/next-match?teamId=96957&eventId=64025`

Returns an array containing the single next upcoming match, or an empty array if none.

### Environment Variables

| Variable | Description |
|---|---|
| `ROBOTEVENTS_TOKEN` | RobotEvents Bearer token (set in Vercel project settings) |
| `API_TOKEN` | Secret for the API endpoints (pass as `x-api-token` header) |

## Deployment

No build step required. Deploy to Vercel; the `api/` directory is automatically served as serverless functions. Set `ROBOTEVENTS_TOKEN` under **Project → Settings → Environment Variables**.
