# claude-relay-service（个人 Fork）

一个可自建的多账户 Claude / Gemini / Codex（OpenAI Responses）中转服务，带管理后台、API Key、限流与统计。

> 说明：本仓库为 `xuxinyue18-dot/claude-relay-service` 的维护版本（Fork）。README 与默认界面标题已去除上游宣传/引流内容，并改为以环境变量与自定义品牌（OEM）配置为主。

- 仓库地址：`git@github.com:xuxinyue18-dot/claude-relay-service.git`
- 管理后台（新版 admin-spa）：`http://<host>:3000/admin-next/login`
- 公开统计页（无需登录）：`http://<host>:3000/admin-next/api-stats`
- 健康检查：`http://<host>:3000/health`

---

## 功能概览

- 多账户池：Claude / Antigravity / Gemini
- 多客户端接入：Claude Code、Gemini CLI、Codex CLI（Responses）
- API Key 管理：独立 Key、限流/并发/模型/客户端限制
- 使用统计：按 Key / 模型 / 时间维度查看
- 部署方式：Docker / 手动部署
- 品牌（OEM）：自定义网站名称与图标

---

## 界面为什么还是“原作者标题”？

管理后台标题来自 **OEM 设置**（存储在 Redis 的 `oem:settings`）或环境变量默认值：

- 方式 1（推荐）：后台 `设置 -> 品牌` 中修改“网站名称/图标”
- 方式 2：设置环境变量 `WEB_TITLE`（Docker 用 `docker-compose.yml` 的 `WEB_TITLE=...`）
- 方式 3：如果你以前跑过旧配置，Redis 里已经保存了旧的 `oem:settings`，需要在后台点“重置/保存”，或手动删除该键后重启

---

## 快速开始（Docker，推荐）

1) 克隆代码（SSH）

```bash
git clone git@github.com:xuxinyue18-dot/claude-relay-service.git
cd claude-relay-service
```

2) 准备 `.env`

```bash
cp .env.example .env
```

至少需要填写（**必填**）：

- `JWT_SECRET`：不少于 32 字符
- `ENCRYPTION_KEY`：32 字符

（可选）修改站点标题：

- `WEB_TITLE=claude-relay-service`

3) 启动（构建镜像并运行）

```bash
docker compose up -d --build
```

4) 打开后台

- `http://<host>:3000/admin-next/login`

首次启动会初始化管理员账号信息并写入 `data/init.json`（或使用 `ADMIN_USERNAME / ADMIN_PASSWORD` 预设）。

---

## 手动部署（Node + Redis）

```bash
git clone git@github.com:xuxinyue18-dot/claude-relay-service.git
cd claude-relay-service
npm install

cp config/config.example.js config/config.js
cp .env.example .env

# 构建前端（admin-spa）
npm run install:web
npm run build:web

# 初始化 + 启动
npm run setup
npm run service:start:daemon
```

---

## 客户端接入示例

### Claude Code（标准 Claude 账号池）

```bash
export ANTHROPIC_BASE_URL="http://<host>:3000/api/"
export ANTHROPIC_AUTH_TOKEN="后台创建的 API Key（默认 cr_ 开头）"
```

### Claude Code（Antigravity 账号池）

```bash
export ANTHROPIC_BASE_URL="http://<host>:3000/antigravity/api/"
export ANTHROPIC_AUTH_TOKEN="后台创建的 API Key"
export ANTHROPIC_MODEL="claude-opus-4-5"
```

### Gemini CLI（通过 Gemini Assist API）

```bash
CODE_ASSIST_ENDPOINT="http://<host>:3000/gemini"
GOOGLE_CLOUD_ACCESS_TOKEN="后台创建的 API Key"
GOOGLE_GENAI_USE_GCA="true"
GEMINI_MODEL="gemini-2.5-pro"
```

### Codex CLI（OpenAI Responses）

在 `~/.codex/config.toml` 设置：

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

再设置环境变量：

```bash
export CRS_OAI_KEY="后台创建的 API Key"
```

---

## Gemini OAuth（重要）

本 Fork **不再在代码中内置任何 OAuth Client Secret/Client ID**。如需使用 Gemini / Antigravity OAuth 相关能力，请在环境变量中提供：

- `GEMINI_OAUTH_CLIENT_ID` / `GEMINI_OAUTH_CLIENT_SECRET`
- `ANTIGRAVITY_OAUTH_CLIENT_ID` / `ANTIGRAVITY_OAUTH_CLIENT_SECRET`

可参考 `.env.example` 中的注释。

---

## 免责声明

本项目仅供技术学习与自建使用；使用第三方服务/接口可能涉及服务条款风险。请自行评估合规性与使用风险。

---

## 致谢

本仓库基于上游项目演进而来；如你需要查看上游实现与历史，请参考原项目仓库与作者说明。

