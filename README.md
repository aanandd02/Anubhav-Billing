# Anubhav Medical Billing

React + Express app for generating A4 medical bill PDFs with Playwright. The project is split into a backend API and a frontend SPA.

## Structure
```
backend/   # Express API, PDF generation
frontend/  # React + Vite SPA
```

## Prereqs
- Node.js 18+
- npm 9+
- Playwright Chromium deps (for PDF rendering)

## Backend setup
```bash
cd backend
npm install
npm run build           # installs Playwright Chromium
cp .env.example .env    # set ADMIN_USERNAME/ADMIN_PASSWORD/etc
npm start               # runs on PORT (default 3000)
```

Key env vars (`backend/.env`):
- ADMIN_USERNAME / ADMIN_PASSWORD (required)
- ADMIN_NAME (optional display name)
- SESSION_SECRET (required)
- FRONTEND_ORIGIN (for CORS, default http://localhost:5173)
- PORT (optional, default 3000)

## Frontend setup
```bash
cd frontend
npm install
npm run dev             # Vite dev server on http://localhost:5173
```

API base: defaults to `http://localhost:3000`. Override in `frontend/index.html`:
```html
<script>window.__API_BASE__ = "https://your-backend.example.com";</script>
```

## API endpoints
- POST /auth/login
- POST /auth/logout
- GET  /auth/me
- POST /api/generate-pdf   # returns application/pdf (requires session)

## Typical workflow
1) Start backend (`npm start` in backend/).
2) Start frontend (`npm run dev` in frontend/).
3) Open http://localhost:5173/login, sign in, fill patient + medicines, generate PDF.

## Troubleshooting
- 401: session missing/expired → sign in again; ensure fetch uses `credentials: "include"`.
- CORS error: add your frontend origin to `FRONTEND_ORIGIN`.
- PDF fails: run `npm run build` in backend to ensure Chromium is installed.
