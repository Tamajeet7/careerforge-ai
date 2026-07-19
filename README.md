# CareerForge AI

An AI-powered career assistant that helps you optimize your resume for ATS (Applicant Tracking Systems), practice interviews, and discover job opportunities.

## Tech Stack

**Frontend:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4, Recharts, Framer Motion  
**Backend:** Node.js, Express 5, TypeScript, Prisma ORM, PostgreSQL  
**AI:** Google Gemini API  

## Features

- **Resume Upload & Parsing** — Upload PDF/DOCX resumes; auto-extract contact info, skills, education, experience, projects, and more
- **ATS Score Analyzer** — AI-driven evaluation of your resume's ATS compatibility with detailed breakdown and actionable suggestions
- **ATS Score Gauge** — Animated circular gauge with color-coded score visualization
- **Resume Preview** — In-browser PDF viewer with page navigation and zoom controls
- **Skill Detection** — Automatically detects technical skills from your resume against a comprehensive keyword list
- **Interactive Dashboard** — Overview of resume score, ATS match, quick actions, and career insights

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Gemini API key (optional, for AI analysis)

### Installation

```bash
# Clone the repository
git clone https://github.com/Tamajeet7/careerforge-ai.git
cd careerforge-ai

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL="postgresql://..."
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
PORT=5000
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
```

### Database

```bash
cd backend
npx prisma generate
npx prisma db push
```

### Run the App

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

## Project Structure

```
careerforge-ai/
├── backend/
│   └── src/
│       ├── modules/
│       │   ├── auth/        # Authentication (register, login, JWT)
│       │   ├── resume/      # Resume upload, parsing, extraction
│       │   └── ats/         # ATS scoring rules, calculators, AI analysis
│       ├── middleware/      # Auth middleware, error handler
│       ├── shared/         # Utilities, errors, JWT helpers
│       └── config/         # Environment config, Prisma client
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── charts/      # ScoreGauge (animated radial chart)
│       │   ├── dashboard/   # Dashboard widgets
│       │   ├── layout/      # DashboardLayout, Sidebar, Navbar
│       │   ├── resume/      # Resume upload, preview, parsing display
│       │   └── ui/          # Reusable UI primitives
│       ├── pages/           # Route pages (Dashboard, ATSAnalyzer, etc.)
│       └── routes/          # React Router configuration
└── README.md
```

## ATS Scoring

The ATS score is calculated using either:
1. **Google Gemini AI** — When `GEMINI_API_KEY` is set, the AI analyzes the parsed resume and provides a score with detailed suggestions
2. **Static Rules** — Falls back to rule-based evaluation across six categories: contact, skills, projects, experience, education, and formatting

Scores are normalized to a 0–100 scale with realistic distribution (typical range: 40–65).
