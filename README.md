# 🧠 AI Changelog Generator

A local-first, AI-powered tool that automatically summarizes your Git commits into professional changelogs using LLaMA3 via Ollama.

## ✨ Features

- 🧾 Summarizes Git commits using a fine-tuned LLaMA3 prompt
- 🖥️ Web dashboard (Next.js + Tailwind)
- 🧠 Local AI via Ollama (no OpenAI dependency)
- 🔌 Express + MongoDB API backend
- 🛠 CLI for one-command changelog generation
- 🔁 Git hook or cron job automation support

---

## 🚀 Stack

- **Frontend**: Next.js + TailwindCSS
- **Backend**: Express.js + MongoDB (via Mongoose)
- **AI Engine**: LLaMA3 via Ollama
- **Infra**: Turborepo monorepo

---

## 🛠 Setup Instructions

### 🔧 1. Prerequisites

- Node.js 18+
- Git
- Docker (for MongoDB or use Atlas)
- [Ollama](https://ollama.com)

### 🧩 2. Clone & Install

```bash
git clone https://github.com/your-username/ai-changelog-gen.git
cd ai-changelog-gen
npm install
```

### 🧪 3. Run MongoDB (Local or Atlas)

```bash
docker run -d -p 27017:27017 --name mongo mongo
# OR use MongoDB Atlas and update .env
```

### ⚙️ 4. Start Ollama

```bash
ollama run llama3.2
```

### 📂 5. .env Example

``` bash
MONGO_URI=mongodb://localhost:27017/changelogdb
```

### ▶️ 6. Run Apps

```bash
# Start backend
cd apps/api && npm run dev

# Start frontend
cd apps/web && npm run dev
```

---

## 🔁 Git Hook / Cron Job Automation

### 🔗 Git Hook (Pre-commit)

Add this to `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
node apps/api/scripts/generateAndPostChangelog.js
```

### ⏰ Daily Cron Job

```bash
0 19 * * * node /full/path/to/generateAndPostChangelog.js
```

(Use `crontab -e` to schedule it)

---

## 🚀 Deployment Guide

### 🌐 Frontend (Vercel)

1. Push `apps/web` to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Set env `NEXT_PUBLIC_API_URL=https://your-api-url`

### ⚙️ API Backend (Render)

1. Deploy `apps/api` to [Render](https://render.com)
2. Add `MONGO_URI` as environment variable
3. Set port to `4000`

### 💾 Database (MongoDB Atlas)

1. Create free cluster
2. Whitelist your IP and generate credentials
3. Copy connection string to `.env`

---

## 📄 License

MIT © Prakash Raut
