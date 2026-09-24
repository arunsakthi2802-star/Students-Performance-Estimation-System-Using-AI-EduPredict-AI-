'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardCard from '@/components/DashboardCard';
import { ScoreTrendChart } from '@/components/PerformanceChart';
import { getEstimations, clearAllEstimations } from '@/lib/storage';
import { PerformanceResult } from '@/types/performance';
import {
  BarChart3,
  Award,
  TrendingUp,
  TrendingDown,
  Calculator,
  Trash2,
  Sparkles,
  Plus,
  ShieldAlert,
  Calendar,
  Layers,
} from 'lucide-react';

export default function AnalyticsPage() {
  const [estimations, setEstimations] = useState<PerformanceResult[]>([]);

  useEffect(() => {
    const loaded = getEstimations();
    setEstimations(loaded);
  }, []);

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all local estimation records? This action cannot be undone.')) {
      clearAllEstimations();
      setEstimations([]);
    }
  };

  // Metrics
  const totalEstimations = estimations.length;

  const avgScore =
    totalEstimations > 0
      ? Math.round(
          (estimations.reduce((sum, item) => sum + item.indicativeScore, 0) / totalEstimations) * 10
        ) / 10
      : 0;

  const highestScore =
    totalEstimations > 0
      ? Math.max(...estimations.map(item => item.indicativeScore))
      : 0;

  const latestScore = totalEstimations > 0 ? estimations[0].indicativeScore : 0;

  // Highest performing input factor across estimations
  let topFactor = 'N/A';
  if (totalEstimations > 0) {
    const latest = estimations[0];
    const sortedInputs = [...latest.breakdown].sort((a, b) => b.normalizedScore - a.normalizedScore);
    if (sortedInputs.length > 0) {
      topFactor = sortedInputs[0].label;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Performance Analytics & Trends
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Academic Performance Analytics
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm">
            Statistical breakdown of saved estimations in local browser storage.
          </p>
        </div>

        {totalEstimations > 0 && (
          <button
            onClick={handleClearHistory}
            className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold text-xs px-4 py-2.5 rounded-xl border border-rose-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Average Score"
          value={totalEstimations > 0 ? `${avgScore} / 100` : 'N/A'}
          subtitle="Mean of all calculated indicative scores"
          icon={Award}
          badgeText={totalEstimations > 0 ? `${totalEstimations} Sessions` : 'Empty'}
          iconBgColor="bg-indigo-600 text-white"
        />

        <DashboardCard
          title="Highest Score"
          value={totalEstimations > 0 ? `${highestScore} / 100` : 'N/A'}
          subtitle="Peak estimated score recorded"
          icon={TrendingUp}
          badgeText={highestScore >= 85 ? 'Outstanding' : 'Recorded'}
          badgeColor="bg-emerald-50 text-emerald-700"
          iconBgColor="bg-emerald-600 text-white"
        />

        <DashboardCard
          title="Latest Score"
          value={totalEstimations > 0 ? `${latestScore} / 100` : 'N/A'}
          subtitle="Most recent estimation output"
          icon={Calendar}
          badgeText={totalEstimations > 0 ? 'Recent' : 'N/A'}
          badgeColor="bg-blue-50 text-blue-700"
          iconBgColor="bg-blue-600 text-white"
        />

        <DashboardCard
          title="Top Metric Driver"
          value={topFactor}
          subtitle="Highest scoring input parameter"
          icon={Layers}
          badgeText="Strength"
          badgeColor="bg-amber-50 text-amber-700"
          iconBgColor="bg-amber-600 text-white"
        />
      </div>

      {/* Main Trend Line Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Score Progression Trend Over Time
            </h2>
            <p className="text-xs text-slate-500">
              Line chart comparing score evolution against attendance and internal test parameters.
            </p>
          </div>
        </div>

        {totalEstimations > 0 ? (
          <ScoreTrendChart estimations={estimations} />
        ) : (
          <div className="py-16 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
              <Calculator className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Analytics Data Available</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Run performance estimations to view historical trend charts, statistical distributions, and comparative metric insights.
            </p>
            <Link
              href="/estimate"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create Performance Estimation
            </Link>
          </div>
        )}
      </div>

      {/* Statistical Context Notice */}
      <div className="bg-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Academic Distinction Notice</span>
          </div>
          <p className="text-sm text-indigo-100 max-w-2xl leading-relaxed">
            Indicative performance scores and AI educational guidance are transparent calculations designed for study planning and self-assessment. They do not constitute official university examination results.
          </p>
        </div>

        <Link
          href="/estimate"
          className="bg-white text-indigo-900 hover:bg-slate-100 font-bold text-xs px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
        >
          Run New Estimation
        </Link>
      </div>
    </div>
  );
}
