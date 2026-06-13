# Joynt AI Clone — Backend Setup

## Prerequisites
- Docker Desktop (running)
- Node.js 18+

## Quick Start

```bash
# 1. Start Supabase (Docker containers)
cd landing-page
npx supabase start

# 2. Copy .env.local.example → .env.local and fill keys
# (Keys shown after `npx supabase start`)

# 3. Start development server
npm run dev

# 4. Open Studio to manage data
# http://127.0.0.1:54323
```

## Supabase Services

| Service | URL |
|---------|-----|
| Studio (Admin UI) | http://127.0.0.1:54323 |
| API | http://127.0.0.1:54321 |
| Database | postgresql://postgres:postgres@127.0.0.1:54322/postgres |
| Auth | http://127.0.0.1:54321/auth/v1 |
| Storage | http://127.0.0.1:54321/storage/v1 |

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST/PUT | `/api/users` | User management |
| GET/POST/PUT/DELETE | `/api/branches` | Branch management |
| GET/POST/PUT/DELETE | `/api/templates` | Template CRUD |
| GET/POST/PUT | `/api/inspections` | Inspection CRUD |
| GET/POST/PUT | `/api/issues` | Issue management |
| GET/POST/PUT | `/api/tasks` | Task management |
| GET/PUT | `/api/notifications` | Notifications |
| GET | `/api/reports?type=*` | Reports (5 types) |
| POST | `/api/upload` | File upload |

## Database Migration

```bash
# After changing migration SQL:
npx supabase db reset

# Dump current data:
npx supabase db dump --local --data-only --file supabase/seed.sql
```

## Test Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@tamayuz.sa | demo123456 | Org Admin |
| manager@tamayuz.sa | demo123456 | Manager |
| inspector@tamayuz.sa | demo123456 | Inspector |
