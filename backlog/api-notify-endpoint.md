# /api/notify — Lead Notification Endpoint

**Status:** In Progress
**Priority:** High
**Project:** DinqClaw — Widget Tier

## What
POST endpoint that receives lead data from DinqDigital client websites and sends a Telegram notification to the right client via the Telegram bot.

## Endpoint
POST /api/notify
Headers: x-api-key, Content-Type: application/json
Body: user_id, name, email, message, source_url
Responses: 200, 401, 404, 500
