# claude-relay-service (Personal Fork)

A self-hosted multi-account relay service for Claude / Gemini / Codex (OpenAI Responses), with an admin panel, API keys, rate limits, and usage stats.

> Note: This repository is a maintained fork (`xuxinyue18-dot/claude-relay-service`). The README and default UI branding have been cleaned up from upstream promotional content and are now driven by env vars and OEM settings.

- Repo (SSH): `git@github.com:xuxinyue18-dot/claude-relay-service.git`
- Admin UI (admin-spa): `http://<host>:3000/admin-next/login`
- Public stats page: `http://<host>:3000/admin-next/api-stats`
- Health check: `http://<host>:3000/health`

---

## Features

- Multi account pools: Claude / Antigravity / Gemini
- Clients: Claude Code, Gemini CLI, Codex CLI (Responses)
- API key management: per-key limits (rate/concurrency/model/client) and usage tracking
- Deployment: Docker or manual (Node + Redis)
- OEM branding: site title & favicon

---

## Why does the UI still show the “old author title”?

The UI title comes from **OEM settings** (stored in Redis as `oem:settings`) or env defaults:

- Option 1 (recommended): `Settings -> Branding` in the admin panel
- Option 2: set `WEB_TITLE` in your environment (Docker: in `docker-compose.yml`)
- Option 3: if you already ran the service before, Redis may already contain `oem:settings` — reset it in the UI or delete the key and restart

---

## Quick Start (Docker)

1) Clone (SSH)

```bash
git clone git@github.com:xuxinyue18-dot/claude-relay-service.git
cd claude-relay-service
```

2) Prepare `.env`

```bash
cp .env.example .env
```

Required:

- `JWT_SECRET` (>= 32 chars)
- `ENCRYPTION_KEY` (32 chars)

Optional branding:

- `WEB_TITLE=claude-relay-service`

3) Start

```bash
docker compose up -d --build
```

4) Open admin UI

- `http://<host>:3000/admin-next/login`

First boot initializes admin credentials into `data/init.json` (or use `ADMIN_USERNAME / ADMIN_PASSWORD`).

---

## Manual Deployment (Node + Redis)

```bash
git clone git@github.com:xuxinyue18-dot/claude-relay-service.git
cd claude-relay-service
npm install

cp config/config.example.js config/config.js
cp .env.example .env

npm run install:web
npm run build:web

npm run setup
npm run service:start:daemon
```

---

## Client Examples

### Claude Code (standard pool)

```bash
export ANTHROPIC_BASE_URL="http://<host>:3000/api/"
export ANTHROPIC_AUTH_TOKEN="API key created in the admin panel"
```

### Claude Code (Antigravity pool)

```bash
export ANTHROPIC_BASE_URL="http://<host>:3000/antigravity/api/"
export ANTHROPIC_AUTH_TOKEN="API key created in the admin panel"
export ANTHROPIC_MODEL="claude-opus-4-5"
```

### Gemini CLI (Gemini Assist API)

```bash
CODE_ASSIST_ENDPOINT="http://<host>:3000/gemini"
GOOGLE_CLOUD_ACCESS_TOKEN="API key created in the admin panel"
GOOGLE_GENAI_USE_GCA="true"
GEMINI_MODEL="gemini-2.5-pro"
```

### Codex CLI (OpenAI Responses)

In `~/.codex/config.toml`:

```toml
model_provider = "crs"
model = "gpt-5.1-codex-max"
preferred_auth_method = "apikey"

[model_providers.crs]
name = "crs"
base_url = "http://<host>:3000/openai"
wire_api = "responses"
requires_openai_auth = true
env_key = "CRS_OAI_KEY"
```

Then:

```bash
export CRS_OAI_KEY="API key created in the admin panel"
```

---

## Gemini OAuth (Important)

This fork does **not** ship any hardcoded OAuth client IDs/secrets. If you need Gemini/Antigravity OAuth flows, provide these env vars:

- `GEMINI_OAUTH_CLIENT_ID` / `GEMINI_OAUTH_CLIENT_SECRET`
- `ANTIGRAVITY_OAUTH_CLIENT_ID` / `ANTIGRAVITY_OAUTH_CLIENT_SECRET`

See `.env.example` comments.

---

## Disclaimer

This project is for self-hosting and technical learning. Using third-party services/APIs may carry ToS/compliance risks — evaluate your own usage.

