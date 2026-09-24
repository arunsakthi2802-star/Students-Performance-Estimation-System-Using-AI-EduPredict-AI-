import React from 'react';
import { AIInsightsData } from '@/types/performance';
import { Sparkles, CheckCircle2, TrendingUp, Lightbulb, Heart, ShieldAlert, Cpu } from 'lucide-react';

interface AIInsightsProps {
  insights: AIInsightsData;
}

export default function AIInsights({ insights }: AIInsightsProps) {
  const { summary, strengths, improvementAreas, studyRecommendations, encouragement, disclaimer, isFallback } = insights;

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-800/60 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Gemini AI Educational Guidance
            </h2>
            <p className="text-xs text-indigo-300">
              Personalized learning synthesis generated from academic inputs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isFallback ? (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Rule-Based Guidance Mode
            </span>
          ) : (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              Powered by Google Gemini
            </span>
          )}
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-indigo-950/60 rounded-2xl p-5 border border-indigo-800/40 text-sm text-indigo-100 leading-relaxed backdrop-blur-sm">
        <p className="font-medium text-indigo-200 mb-1 text-xs uppercase tracking-wider">
          Executive Synthesis
        </p>
        <p>{summary}</p>
      </div>

      {/* 3 Grid Cards: Strengths, Areas for Improvement, Study Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Strengths */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-emerald-500/30 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Key Academic Strengths</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: Areas for Improvement */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-amber-500/30 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <TrendingUp className="w-5 h-5 flex-shrink-0" />
            <span>Target Improvement Areas</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {improvementAreas.map((area, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Actionable Recommendations */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-blue-500/30 space-y-3">
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
            <Lightbulb className="w-5 h-5 flex-shrink-0" />
            <span>Practical Recommendations</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {studyRecommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Encouragement Quote */}
      {encouragement && (
        <div className="bg-gradient-to-r from-indigo-900/60 to-blue-900/60 rounded-2xl p-4 border border-indigo-700/40 flex items-center gap-3">
          <Heart className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <p className="text-xs text-indigo-100 italic font-medium">
            "{encouragement}"
          </p>
        </div>
      )}

      {/* Standard Notice / Disclaimer */}
      <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-400">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span>
          {disclaimer || 'AI-generated guidance is informational and should not be treated as a guaranteed academic prediction.'}
        </span>
      </div>
    </div>
  );
}
