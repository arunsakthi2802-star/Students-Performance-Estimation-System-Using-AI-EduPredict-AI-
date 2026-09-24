'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ScoreCard from '@/components/ScoreCard';
import AIInsights from '@/components/AIInsights';
import { InputComparisonChart, ComponentContributionChart } from '@/components/PerformanceChart';
import { getEstimationById, getEstimations } from '@/lib/storage';
import { PerformanceResult } from '@/types/performance';
import {
  Printer,
  RotateCcw,
  LayoutDashboard,
  CheckCircle,
  Calendar,
  User,
  BookOpen,
  Sparkles,
  BarChart2,
  ShieldCheck,
  Award,
} from 'lucide-react';

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const [result, setResult] = useState<PerformanceResult | null>(null);
  const [copiedNotice, setCopiedNotice] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getEstimationById(id);
      if (found) {
        setResult(found);
        return;
      }
    }

    // Fallback to latest estimation if no valid id query param
    const all = getEstimations();
    if (all.length > 0) {
      setResult(all[0]);
    }
  }, [id]);

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">No Estimation Report Found</h2>
        <p className="text-slate-500 text-sm">
          Please run a new estimation calculation to generate your academic score report and AI insights.
        </p>
        <Link
          href="/estimate"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>Estimate Performance Now</span>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 3000);
    }
  };

  const { inputs, indicativeScore, scoreInterpretation, breakdown, aiInsights, createdAt } = result;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Result Header & Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Academic Estimation Report
            </span>
            <span className="text-xs text-slate-400">
              ID: {result.id}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {inputs.studentName}&apos;s Academic Estimation
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Course: <strong>{inputs.course}</strong> ({inputs.semester})
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Date: <strong>{new Date(createdAt).toLocaleDateString()}</strong>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 no-print">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Estimate Again</span>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Main Score Card */}
      <ScoreCard result={result} />

      {/* Performance Overview Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          Academic Input Breakdown (0 – 100 Scale)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Prev Sem %
            </span>
            <span className="text-2xl font-extrabold text-slate-900">{inputs.previousSemPercentage}%</span>
            <span className="text-[10px] text-slate-400 block">25% Weight</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Internal Marks
            </span>
            <span className="text-2xl font-extrabold text-slate-900">{inputs.internalExamMarks}</span>
            <span className="text-[10px] text-slate-400 block">25% Weight</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Assignment Score
            </span>
            <span className="text-2xl font-extrabold text-slate-900">{inputs.assignmentMarks}</span>
            <span className="text-[10px] text-slate-400 block">15% Weight</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Attendance %
            </span>
            <span className="text-2xl font-extrabold text-slate-900">{inputs.attendancePercentage}%</span>
            <span className="text-[10px] text-slate-400 block">15% Weight</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Completion Rate
            </span>
            <span className="text-2xl font-extrabold text-slate-900">{inputs.assignmentCompletionPercentage}%</span>
            <span className="text-[10px] text-slate-400 block">10% Weight</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Practical Marks
            </span>
            <span className="text-2xl font-extrabold text-slate-900">
              {inputs.practicalMarks !== undefined && inputs.practicalMarks !== null ? inputs.practicalMarks : 'N/A'}
            </span>
            <span className="text-[10px] text-slate-400 block">10% Weight</span>
          </div>
        </div>
      </div>

      {/* Visual Recharts Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Raw Input Comparison */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            1. Raw Academic Input Scores
          </h3>
          <InputComparisonChart breakdown={breakdown} />
        </div>

        {/* Chart 2: Weighted Contribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            2. Weighted Score Point Contribution
          </h3>
          <ComponentContributionChart breakdown={breakdown} />
        </div>
      </div>

      {/* Gemini AI Insights Section */}
      {aiInsights && <AIInsights insights={aiInsights} />}

      {/* Sticky Action Footer Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-indigo-600 flex-shrink-0" />
          <p className="text-xs text-slate-600">
            Estimation report saved locally in browser memory. You can view or compare this anytime in your Dashboard.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-sm transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading estimation report...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
