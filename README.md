# Students Performance Estimation System Using AI (EduPredict AI)

**Project Owner:** Nithyasri S  
**Technology Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, `@google/genai` (Google Gemini API), Recharts, Lucide React, Vercel

---

## 📌 About the Project

**EduPredict AI** is a modern, beginner-friendly web application designed to assist students and teachers in evaluating academic progress. The application combines a transparent weighted scoring model with Google Gemini AI educational guidance to help students identify academic strengths, target areas for improvement, and structure effective study routines.

---

## ✨ Features

- **Transparent Performance Estimation:** Calculates an indicative score out of 100 based on previous semester %, internal exam marks, assignment score, attendance %, self-study hours, assignment completion %, and optional practical marks.
- **Google Gemini AI Guidance:** Uses the official `@google/genai` SDK on the server side to generate structured feedback, strengths, improvement areas, and study recommendations.
- **Interactive Visual Analytics:** Visualizes raw scores and weighted score contributions with Recharts bar and line charts.
- **Student Dashboard:** View quick KPIs, recent estimation history, and track score trends over time.
- **Local Browser Storage:** Saves estimations locally in your browser (`localStorage`) for instant access without requiring complex database setup.
- **Responsive & Accessible Design:** Styled with Tailwind CSS, featuring soft indigo/blue aesthetics, glassmorphism accents, and desktop/mobile responsiveness.

---

## 🛠️ Project Structure

```text
student-performance-ai/
├── app/
│   ├── layout.tsx            # Global Root Layout (Navbar & Footer)
│   ├── page.tsx              # Landing Page (Hero, Features, How It Works)
│   ├── dashboard/page.tsx    # Student Dashboard & KPIs
│   ├── estimate/page.tsx     # Performance Estimation Form Page
│   ├── results/page.tsx      # Estimation Report, Score Gauge & Gemini AI Insights
│   ├── analytics/page.tsx    # Statistical Summaries & Score Progression Trend Chart
│   ├── about/page.tsx        # Project Details, Owner Info & System Disclaimers
│   └── api/
│       └── gemini/
│           └── route.ts      # Server-side Route Handler calling @google/genai
├── components/
│   ├── Navbar.tsx            # Sticky Header Navigation Bar
│   ├── Footer.tsx            # Footer with Owner Credits (Nithyasri S)
│   ├── DashboardCard.tsx     # Reusable Metric & KPI Card Widget
│   ├── PerformanceForm.tsx   # Academic Input Form with Validation
│   ├── ScoreCard.tsx         # Circular Progress Score Gauge & Breakdown Accordion
│   ├── PerformanceChart.tsx  # Recharts Visualizations
│   └── AIInsights.tsx        # Gemini AI Structured Insights Component
├── lib/
│   ├── gemini.ts             # Server-side Gemini AI & Fallback Generator
│   ├── performance.ts        # Transparent Score Formula Calculator
│   ├── storage.ts            # LocalStorage Operations (SSR Safe)
│   └── validation.ts         # Input Validation Schema & Boundary Rules
├── types/
│   └── performance.ts        # TypeScript Interfaces
├── .env.example              # Environment Variable Template
├── .env.local                # Local Environment Variables (Git Ignored)
└── README.md                 # Project Documentation & Vercel Deployment Guide
```

---

## 🚀 Local Setup & Installation

### Step 1: Clone or Navigate to Project Directory
```bash
cd "student-performance-ai"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Gemini API Key
1. Obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).
2. Create a `.env.local` file in the root folder:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: Never commit `.env.local` to public GitHub repositories.)*

### Step 4: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Vercel Deployment Guide

Deploying EduPredict AI on Vercel takes less than 3 minutes:

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Deploy Students Performance Estimation System Using AI"
git push origin main
```

### Step 2: Import Repository in Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** → **Project**.
3. Select your GitHub repository (`student-performance-ai`).

### Step 3: Configure Environment Variables
In the **Environment Variables** section during project import, add:

| Key | Value |
| :--- | :--- |
| `GEMINI_API_KEY` | *Your Gemini API Key from Google AI Studio* |

### Step 4: Deploy
Click **Deploy**. Vercel will build and host your web application automatically.

---

## ⚠️ Academic Disclaimer & Limitations

1. **Indicative Estimate:** The calculated score uses a transparent weighted demonstration formula. It is not an institutionally validated machine learning prediction model.
2. **AI Guidance:** Gemini AI suggestions provide educational study guidance and should not be used for high-stakes academic decisions.
3. **Local Storage:** All estimation history is stored locally in your browser's `localStorage`. Clearing browser data will reset history.

---

## 👤 Project Owner

**Nithyasri S**  
*Students Performance Estimation System Using AI*
