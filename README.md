# VEX Match Schedule

A simple single-page app for viewing upcoming VEX Robotics match schedules, built for use with the [RobotEvents API](https://www.robotevents.com/api/v2).

## Usage

Open `index.html` in a browser (or deploy to Vercel). On first load you'll be prompted for:

| Setting | Description |
|---|---|
| **API Token** | Your RobotEvents Bearer token (JWT) |
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

1. Log in at [robotevents.com](https://www.robotevents.com)
2. Go to **Account → Developer → API Keys**
3. Generate a token and paste it into Settings

## Deployment

No build step required — deploy the single `index.html` file directly to Vercel, GitHub Pages, or any static host.
