# Engineering Academic Chatbot

Full-stack chatbot platform for engineering students (CSE, ECE, EE, Mechanical, Civil, Instrumentation).

## Stack
- Frontend: React + Tailwind + Markdown/KaTeX + PWA service worker
<!-- - Backend: Node.js + Express + MongoDB + JWT auth + role-based admin routes -->
- AI: Gemini API key integration point via `GEMINI_API_KEY`

## Run

<!--
### Backend
```bash
cd backend
npm install
npm run dev
```

Create `.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/engineering_chatbot
JWT_SECRET=super_secret
GEMINI_API_KEY=your_gemini_key
```
-->

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Set optional `.env` in frontend:
```env
VITE_GEMINI_API_KEY=your_gemini_key
# Optional fallback if backend routes are still used:
VITE_API_URL=http://localhost:5000/api
```

## Core Features
- Command-center three panel UI
- Branch-wise themes and responsive layout
- Markdown + Math rendering (KaTeX)
- Chat intent detection (explanation, numerical, viva, revision)
- Depth control (simple/intermediate/advanced)
- Notes with offline fallback cache + service worker
- REST APIs for branches, subjects, units, chat, notes
- Student/Admin role-based updates for syllabus and notes
