import React from 'react';
import Link from 'next/link';
import {
  Brain,
  User,
  Code2,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
  Globe,
  Database,
  Lock,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-200">
          <Sparkles className="w-4 h-4 text-indigo-300" />
          <span>Academic Project Demonstration</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Students Performance Estimation System Using AI
        </h1>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-indigo-200">
          <span className="flex items-center gap-1.5 bg-indigo-950/80 px-3 py-1 rounded-xl border border-indigo-700/50">
            <User className="w-4 h-4 text-indigo-400" />
            Project Owner: <strong className="text-white">Nithyasri S</strong>
          </span>
          <span className="flex items-center gap-1.5 bg-indigo-950/80 px-3 py-1 rounded-xl border border-indigo-700/50">
            <Globe className="w-4 h-4 text-indigo-400" />
            Deployment: <strong className="text-white">Vercel Ready</strong>
          </span>
        </div>
      </div>

      {/* Project Description */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
          <Brain className="w-6 h-6 text-indigo-600" />
          Project Overview & Purpose
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          <strong>EduPredict AI</strong> (Students Performance Estimation System Using AI) is a beginner-friendly educational web application built to help students and educators evaluate academic performance patterns. The application combines a transparent weighted scoring model with Google Gemini AI to provide supportive, understandable study feedback and actionable learning recommendations.
        </p>
      </div>

      {/* Technology Stack Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
          <Code2 className="w-6 h-6 text-indigo-600" />
          Technology Stack
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">Frontend Framework</span>
            <p className="text-xs text-slate-600">Next.js 15+ (App Router), React 19, TypeScript</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">Styling & UI</span>
            <p className="text-xs text-slate-600">Tailwind CSS, Lucide React Icons</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">Charts & Visualization</span>
            <p className="text-xs text-slate-600">Recharts (Responsive Bar, Line, and Gauge Charts)</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">AI Integration</span>
            <p className="text-xs text-slate-600">Google Gemini API (`@google/genai` SDK)</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">Backend API Route</span>
            <p className="text-xs text-slate-600">Next.js Route Handler (`/api/gemini` Server-side)</p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <span className="font-bold text-slate-900 text-sm block">Local Storage Layer</span>
            <p className="text-xs text-slate-600">Browser `localStorage` with SSR compatibility</p>
          </div>
        </div>
      </div>

      {/* System Limitations & Transparency */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2.5">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          System Methodology & Limitations
        </h2>

        <ul className="space-y-3 text-xs sm:text-sm text-amber-950">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Indicative Calculation:</strong> The score is calculated using a transparent weighted formula (Previous Sem 25%, Internal Exam 25%, Assignment Marks 15%, Attendance 15%, Assignment Completion 10%, Practical Marks 10%). It is not a black-box machine learning model.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>No Machine Learning Claims:</strong> The initial version uses a demonstration formula and does not claim to be a scientifically validated predictive machine learning model.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>AI Guidance Nature:</strong> Gemini AI suggestions provide educational guidance based on submitted data. Output should not be used for high-stakes academic decisions or treated as guaranteed exam predictions.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Privacy & Security:</strong> API keys are kept strictly on the server environment side (`GEMINI_API_KEY`) and are never exposed to the client browser.
            </span>
          </li>
        </ul>
      </div>

      {/* Footer Call to Action */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Ready to test performance estimation?</h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Try entering your academic details and generate your first AI report.
        </p>
        <Link
          href="/estimate"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>Estimate Performance Now</span>
        </Link>
      </div>
    </div>
  );
}
