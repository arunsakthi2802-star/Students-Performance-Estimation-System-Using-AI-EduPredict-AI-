import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Calculator,
  Brain,
  BarChart3,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  Award,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-100/80 border border-indigo-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-800 shadow-xs">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>AI-Powered Educational Guidance Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                AI-Powered Student <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800">
                  Performance Estimation
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Understand your academic progress, explore your strengths, and discover personalized learning recommendations with AI.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/estimate"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:-translate-y-0.5"
                >
                  <Calculator className="w-5 h-5 text-indigo-200" />
                  <span>Estimate Performance</span>
                </Link>

                <Link
                  href="#features"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base px-6 py-3.5 rounded-xl border border-slate-200 shadow-xs transition-colors"
                >
                  <span>Explore Features</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Transparent Scoring Formula</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span>Google Gemini Integration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Instant Browser Local Storage</span>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Interactive Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>

              <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Sample Student Estimation</h3>
                      <p className="text-xs text-slate-500">Computer Science & Engineering</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Outstanding
                  </span>
                </div>

                {/* Score Widget */}
                <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-5 text-white flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-indigo-200 font-medium block">
                      Indicative Score
                    </span>
                    <span className="text-4xl font-extrabold tracking-tight">86.5</span>
                    <span className="text-xs text-indigo-200 font-normal"> / 100 max</span>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-indigo-500/30 border-4 border-indigo-400/40 flex items-center justify-center font-bold text-xl">
                    87%
                  </div>
                </div>

                {/* Micro Input breakdown */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-600">Internal Examination Marks</span>
                    <span className="font-semibold text-slate-900">85 / 100</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-600">Attendance Percentage</span>
                    <span className="font-semibold text-slate-900">92%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span className="text-slate-600">Self-Study Hours</span>
                    <span className="font-semibold text-slate-900">18 hrs/week</span>
                  </div>
                </div>

                {/* Micro AI snippet */}
                <div className="bg-indigo-50/70 rounded-xl p-3.5 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <p className="leading-tight">
                    <strong>Gemini AI Tip:</strong> Excellent attendance & test scores! Maintaining study discipline will support top honors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">
            Core Application Modules
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Academic Support & Insights
          </p>
          <p className="text-slate-600 text-sm sm:text-base">
            Designed specifically for student clarity, transparent scoring, and actionable educational recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">1. Performance Estimation</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Calculate a transparent indicative score from normalized academic parameters using configurable weights.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">2. AI-Powered Insights</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Leverage Google Gemini API to analyze academic inputs and generate tailored feedback and encouraging suggestions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">3. Academic Analytics</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Track progress over time using interactive Recharts visualization tools, trend lines, and input comparisons.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">4. Personalized Guidance</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Discover prioritized areas for improvement, customized study techniques, and weekly routine optimizations.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              How EduPredict AI Works
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Get your indicative academic score and AI guidance report in less than 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Enter Academic Details</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Provide your previous semester %, internal exam marks, assignment score, attendance, study hours, and optional practical marks.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-white">Calculate Indicative Estimate</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                The transparent formula normalizes each metric and computes a weighted composite performance score out of 100.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-4 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Get AI-Generated Insights</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Receive Google Gemini educational feedback highlighting strengths, improvement priorities, and practical study strategies.
              </p>
            </div>
          </div>

          <div className="text-center pt-12">
            <Link
              href="/estimate"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-900/50 transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span>Start Your Free Performance Estimation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Owner Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              Academic Project Demonstration
            </span>
            <h3 className="text-2xl font-extrabold">Students Performance Estimation System Using AI</h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Project Owner: <strong className="text-white">Nithyasri S</strong> | Built with Next.js & Google Gemini API
            </p>
          </div>

          <Link
            href="/about"
            className="bg-white text-indigo-900 hover:bg-slate-100 font-bold px-6 py-3 rounded-xl text-sm transition-colors flex-shrink-0"
          >
            Learn More About Project
          </Link>
        </div>
      </section>
    </div>
  );
}
