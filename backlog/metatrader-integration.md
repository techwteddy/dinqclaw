# MetaTrader Integration via MetaApi

**Status:** Research  
**Priority:** Medium  
**Project:** DinqClaw — Personal tier feature

## What
Connect MetaTrader MT4/MT5 accounts via MetaApi.cloud  
Lucy can check balances, positions, history, and execute trades via Telegram

## Package
`@metaapi.cloud/metaapi-node.js-sdk`

> **Research note (2026-09-09):** That scoped package name is **not on npm** (404). The current official package is:
>
> ```bash
> npm install metaapi.cloud-sdk
> ```
>
> - **Name:** `metaapi.cloud-sdk`  
> - **Version checked:** `29.3.3`  
> - **Docs:** https://metaapi.cloud/docs/client/  
> - **GitHub SDK:** https://github.com/metaapi/metaapi-javascript-sdk  
> - Related: `metaapi.cloud-metastats-sdk`, `metaapi.cloud-copyfactory-sdk`, `metaapi.cloud-risk-management-sdk`

## Required env vars
```
METAAPI_TOKEN=
METAAPI_ACCOUNT_ID=
```

Token: generate at https://app.metaapi.cloud/api-access/generate-token  
Account ID: from https://app.metaapi.cloud/accounts after provisioning the MT4/MT5 account (Provisioning API also available).

Auth header for REST: `auth-token: <METAAPI_TOKEN>`  
Region base URL example: `https://mt-client-api-v1.<region>.agiliumtrade.ai` (pick region from API Access page).

## Lucy commands to build
- Check balance
- List open positions
- Get trade history
- Set price alert
- Close position

---

## Research notes (no code yet)

### How connection works (Next.js / TypeScript)
1. User adds MT4/MT5 login in MetaApi cloud UI (or Provisioning API) → gets `accountId`.
2. Server-side only: instantiate SDK with token, load account, wait until connected/synchronized.
3. Prefer **RPC/REST for Lucy read commands** (balance, positions, history). Prefer **Websocket streaming** for live prices / alerts and lower-latency trading.
4. Keep MetaApi client in `src/server/clients/` (never in client components) — same pattern as Telegram/Composio.

SDK entry (Node ESM, for later implementation):
```ts
import MetaApi from "metaapi.cloud-sdk/esm-node";
const api = new MetaApi(process.env.METAAPI_TOKEN!);
const account = await api.metatraderAccountApi.getAccount(accountId);
await account.waitConnected();
const connection = account.getRPCConnection();
await connection.connect();
await connection.waitSynchronized();
```

### REST / RPC endpoint map

| Capability | REST | SDK (RPC) |
|---|---|---|
| **Account info** (balance, equity, margin, freeMargin, leverage) | `GET /users/current/accounts/:accountId/account-information` | `connection.getAccountInformation()` |
| **Open positions** | `GET .../positions` | `connection.getPositions()` / `getPosition(id)` |
| **Pending orders** | `GET .../orders` | `connection.getOrders()` / `getOrder(id)` |
| **Trade history (orders)** | `GET .../history-orders/time/:startTime/:endTime` (also by ticket/position) | `getHistoryOrdersByTimeRange` / `ByTicket` / `ByPosition` |
| **Trade history (deals)** | `GET .../deals/time/:startTime/:endTime` | `getDealsByTimeRange` / `ByTicket` / `ByPosition` |
| **Place / modify / close** | `POST .../trade` with `actionType` | streaming/RPC trade helpers |

### Trade `actionType` values (place / close)
Via `POST .../trade`:
- Market: `ORDER_TYPE_BUY`, `ORDER_TYPE_SELL`
- Pending: `ORDER_TYPE_BUY_LIMIT`, `SELL_LIMIT`, `BUY_STOP`, `SELL_STOP`, `BUY_STOP_LIMIT`, `SELL_STOP_LIMIT`
- Close: `POSITION_CLOSE_ID`, `POSITION_PARTIAL`, `POSITIONS_CLOSE_SYMBOL`, `POSITION_CLOSE_BY`
- Modify: `POSITION_MODIFY`, `ORDER_MODIFY`, `ORDER_CANCEL`

### Price alerts / subscriptions
MetaApi does **not** ship a dedicated “price alert” CRUD API. Alerts are app-owned:
- Subscribe to real-time quotes/candles/ticks via **Websocket streaming API**
- DinqClaw stores alert thresholds (DB) and notifies Telegram when price crosses them
- Optional: MetaStats / risk-management SDKs for equity-style monitoring, not symbol price alerts

### Lucy command → API mapping (planned)
| Lucy command | API |
|---|---|
| Check balance | `getAccountInformation()` → balance, equity, margin, freeMargin |
| List open positions | `getPositions()` |
| Get trade history | `getDealsByTimeRange` / `getHistoryOrdersByTimeRange` |
| Set price alert | Streaming quotes + DinqClaw-owned alert store + Telegram notify |
| Close position | `POST .../trade` with `POSITION_CLOSE_ID` |

### Next.js integration caveats (for later)
- Server-only usage; long-lived websocket connections do not fit Vercel serverless well — use RPC/REST for Telegram-triggered commands first; host a small persistent worker if streaming alerts are required.
- MetaApi is a **paid** cloud service; confirm pricing before Personal-tier rollout.
- Demo vs live: account `type` field distinguishes modes; gate live trade execution behind explicit user confirmation in Telegram.
