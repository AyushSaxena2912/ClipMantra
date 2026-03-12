# ClipMantra

> **Auto-generate viral short clips from long videos using AI.**  
> Paste a YouTube URL → Gemini AI detects the best moments → FFmpeg renders ready-to-post clips for Shorts, Reels & TikTok.

---

## What It Does

ClipMantra takes a long-form YouTube video URL, downloads it, transcribes the audio using **Faster-Whisper**, sends the transcript to **Google Gemini 2.5 Flash** to detect the most viral moments, and automatically renders short clips — all through a fully async, queue-driven pipeline with real-time status updates via **Server-Sent Events (SSE)**.

---

## How the Pipeline Works

```
User submits YouTube URL
        ↓
Download Worker  →  yt-dlp downloads video, ffmpeg extracts audio
        ↓
Transcribe Worker  →  Python + Faster-Whisper transcribes audio to text
        ↓
Render Worker  →  Gemini AI detects highlights → ffmpeg cuts clips
        ↓
SSE Stream  →  Frontend receives real-time status updates
        ↓
Cleanup Worker  →  Files auto-deleted 24hrs after completion
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend Runtime** | Node.js + TypeScript |
| **Backend Framework** | Express.js |
| **Frontend** | React + Vite |
| **Database** | PostgreSQL (via `pg` pool) |
| **Queue / Cache** | Redis (via `ioredis`) |
| **AI Highlights** | Google Gemini 2.5 Flash |
| **Transcription** | Python + Faster-Whisper (tiny model, CPU/int8) |
| **Video Processing** | `yt-dlp/Rapid API` + `ffmpeg` |
| **Auth** | JWT + bcrypt + Google OAuth2 |
| **Email** | Resend (SDK) |
| **Real-time** | Server-Sent Events (SSE) + Redis Pub/Sub |
| **Containerization** | Docker |
| **Deployment** | Railway + Vercel |

---

## Project Structure

```
├── src/                            # Backend (TypeScript)
│   ├── config/
│   │   └── env.ts                  # Environment config
│   ├── db/
│   │   └── pool.ts                 # PostgreSQL connection pool
│   ├── queue/
│   │   ├── redis.ts                # Redis clients (main + subscriber)
│   │   └── worker.ts               # Multi-role queue worker (download | transcribe | render)
│   ├── ai/
│   │   └── gemini.ts               # Gemini AI highlight detection
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts  # Register, login, OAuth, password flows
│   │   │   ├── auth.service.ts     # User DB queries
│   │   │   ├── auth.middleware.ts  # JWT authentication middleware
│   │   │   └── auth.routes.ts      # Auth routes
│   │   └── jobs/
│   │       ├── job.controller.ts   # Job CRUD + SSE stream
│   │       ├── job.service.ts      # Job DB queries + Redis queue push
│   │       └── job.routes.ts       # Job routes
│   ├── utils/
│   │   ├── jwt.ts                  # JWT generate & verify
│   │   ├── mailer.ts               # OTP email sender
│   │   ├── loginRateLimiter.ts     # Login brute-force protection (Redis)
│   │   └── jobRateLimiter.ts       # Job submission rate limiter (Redis)
│   ├── cleanup/
│   │   └── cleanup.worker.ts       # Auto-delete expired job files after 24hrs
│   ├── app.ts                      # Express app setup, routes, CORS
│   └── server.ts                   # Entry point
│
├── scripts/
│   └── transcribe.py               # Faster-Whisper transcription script
│
├── frontend/                       # React + Vite frontend
│   ├── src/
│   │   ├── api.js                  # API client, token helpers
│   │   ├── App.jsx                 # Root component, auth state
│   │   ├── components/
│   │   │   ├── Input.jsx           # Reusable input field
│   │   │   ├── JobRow.jsx          # Job list item
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   ├── StatusBadge.jsx     # Animated status indicator
│   │   │   └── Toast.jsx           # Toast notification system
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx        # Login / Register / Forgot / Reset
│   │   │   ├── Dashboard.jsx       # Main layout with page routing
│   │   │   ├── HomePage.jsx        # Stats overview + recent jobs
│   │   │   ├── JobsPage.jsx        # Full job history list
│   │   │   ├── NewJobPage.jsx      # Submit new job form
│   │   │   ├── JobDetailPage.jsx   # Job detail + clip downloads
│   │   │   └── SettingsPage.jsx    # Profile + change password
│   │   └── hooks/
│   │       └── useToast.js         # Toast state hook
│   └── .env                        # VITE_API_BASE
│
├── storage/                        # Auto-created at runtime
│   ├── videos/
│   ├── audio/
│   ├── transcripts/
│   ├── highlights/
│   └── clips/
│
├── venv/                           # Python virtual environment
├── Dockerfile
└── .env
```

---

## Installation & Setup

### Prerequisites

- Node.js v18+
- Python 3.9+
- PostgreSQL
- Redis
- `ffmpeg` installed and in PATH
- `yt-dlp` installed and in PATH

### 1. Clone the repository

```bash
git clone https://github.com/your-username/clipmantra.git
cd clipmantra
```

### 2. Install Node dependencies

```bash
npm install
```

### 3. Set up Python environment

```bash
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install faster-whisper bgutil-ytdlp-pot-provider
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values (see [Environment Variables](#-environment-variables) below).

### 5. Set up the database

Run the following SQL to create required tables:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  provider TEXT DEFAULT 'local',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE jobs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  url TEXT NOT NULL,
  status TEXT DEFAULT 'queued',
  clip_count INTEGER DEFAULT 3,
  video_path TEXT,
  audio_path TEXT,
  transcript_path TEXT,
  highlights_path TEXT,
  clips_path JSONB,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE password_resets (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6. Build and run the backend

```bash
npm run build
node dist/server.js
```

### 7. Start the workers (3 separate terminals)

```bash
node dist/queue/worker.js download
node dist/queue/worker.js transcribe
node dist/queue/worker.js render
```

### 8. Set up and run the frontend

```bash
cd frontend
npm install
# Create .env with: VITE_API_BASE=http://localhost:8000/api
npm run dev
```

---

## Docker

A `Dockerfile` is included for containerized deployment. It installs all system dependencies including `ffmpeg`, `yt-dlp`, and `faster-whisper` automatically.

```bash
docker build -t clipmantra .
docker run -p 8000:8000 --env-file .env clipmantra
```

> The Docker image is based on `node:22-slim` and includes `ffmpeg`, `python3`, `yt-dlp`, and `faster-whisper` out of the box.

---

## Environment Variables

### Backend `.env`

```env
# Server
PORT=8000
HOST=127.0.0.1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/clipmantra

# Redis
REDIS_URL=redis://127.0.0.1:6379

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_oauth_client_id

# Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key

# Email (Gmail SMTP)
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_gmail_app_password
```

### Frontend `.env`

```env
VITE_API_BASE=http://localhost:8000/api
```

> **Note:** For `MAIL_PASS`, use a [Gmail App Password](https://support.google.com/accounts/answer/185833), not your regular Gmail password.

---

## 📡 API Reference

All protected routes require the header:
```
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login with email & password |
| `POST` | `/api/auth/google` | ❌ | Login / register with Google OAuth |
| `POST` | `/api/auth/forgot-password` | ❌ | Send OTP to email |
| `POST` | `/api/auth/reset-password` | ❌ | Reset password using OTP |
| `PATCH` | `/api/auth/change-password` | ✅ | Change password (logged in) |

### Jobs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/jobs` | ✅ | Submit a new video URL |
| `GET` | `/api/jobs` | ✅ | Get all jobs for the user |
| `GET` | `/api/jobs/:id` | ✅ | Get a single job by ID |
| `GET` | `/api/jobs/:id/stream` | ✅ | Real-time SSE status stream |

### Other

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/api/test` | API connectivity test |
| `GET` | `/storage/*` | Serve static clip/video files |

---

## 💡 Usage Examples

### Register

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Secret@123",
    "confirmPassword": "Secret@123"
  }'
```

### Create a Job

```bash
curl -X POST http://localhost:8000/api/jobs \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.youtube.com/watch?v=example",
    "count": 3
  }'
```

### Stream Job Progress (SSE)

```javascript
const eventSource = new EventSource(
  `http://localhost:8000/api/jobs/${jobId}/stream`,
  { headers: { Authorization: `Bearer ${token}` } }
);

eventSource.onmessage = (e) => {
  const { status } = JSON.parse(e.data);
  console.log("Status:", status);
  // queued → downloading → transcribing → rendering → completed | failed
};
```

### Job Status Flow

```
queued → downloading → transcribing → rendering → completed
                                                 ↘ failed
```

---

## Security Features

- **Password rules:** 8–15 chars, requires uppercase, lowercase, number & special character (`@$!%*?&`)
- **Bcrypt hashing:** All passwords hashed with salt rounds of 10
- **Login rate limiting:** Max 7 failed attempts → 30-minute block (Redis-backed)
- **Job rate limiting:** Max 10 jobs per hour per user (Redis-backed)
- **JWT auth:** 7-day expiry tokens, verified on all protected routes
- **OTP security:** Cryptographically secure 6-digit OTP, bcrypt-hashed before storage, expires in 10 minutes
- **User enumeration prevention:** Forgot password always returns the same response regardless of whether the email exists

---

## Cleanup Worker

ClipMantra automatically deletes stored files (video, audio, transcript, clips) **24 hours** after a job completes to free up disk space. Job metadata is preserved in the database with file paths set to `NULL`. The cleanup worker checks every 60 seconds on startup.

---

## Frontend Pages

| Page | Description |
|---|---|
| **Auth** | Login, Register, Forgot Password, Reset via OTP |
| **Dashboard** | Stats overview (total, completed, processing, failed) + recent jobs |
| **New Job** | Submit YouTube URL, choose clip count (1–10) with pipeline preview |
| **All Jobs** | Full job history with animated status badges |
| **Job Detail** | Live SSE progress updates + clip download links |
| **Settings** | Profile info + change password + sign out |

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please make sure your code follows the existing structure and includes appropriate error handling.

---

## 📄 License

MIT License — free to use, modify and distribute.
