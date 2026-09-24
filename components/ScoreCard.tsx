import React from 'react';
import { PerformanceResult } from '@/types/performance';
import { Award, Info, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';

interface ScoreCardProps {
  result: PerformanceResult;
}

export default function ScoreCard({ result }: ScoreCardProps) {
  const [showFormulaDetails, setShowFormulaDetails] = React.useState(false);

  const { indicativeScore, maxScore, scoreInterpretation, breakdown, calculationExplanation } = result;
  
  // SVG stroke-dash offset for circular gauge
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (indicativeScore / maxScore) * circumference;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Score Gauge */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="14"
                fill="transparent"
              />
              {/* Progress arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="transition-all duration-1000 ease-out"
                stroke="currentColor"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  color:
                    indicativeScore >= 85
                      ? '#10b981'
                      : indicativeScore >= 70
                      ? '#3b82f6'
                      : indicativeScore >= 55
                      ? '#f59e0b'
                      : '#ef4444',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-slate-900 tracking-tight">
                {indicativeScore}
              </span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Out of 100
              </span>
            </div>
          </div>

          <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${scoreInterpretation.color}`}>
            {scoreInterpretation.category}
          </div>
        </div>

        {/* Right: Category Interpretation & Key Takeaways */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Indicative Performance Score
              </h3>
              <p className="text-xs text-slate-500">
                Calculated using transparent weighted formula parameters
              </p>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 rounded-2xl p-4 border border-slate-100">
            {scoreInterpretation.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl">
              <span className="text-emerald-700 font-semibold block">Formula Target</span>
              <span className="text-slate-600">Weighted parameters sum to 100%</span>
            </div>
            <div className="bg-indigo-50/60 border border-indigo-100 p-3 rounded-xl">
              <span className="text-indigo-700 font-semibold block">Assessment Status</span>
              <span className="text-slate-600">Calculated & AI Evaluated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion: Transparent Formula Calculation Breakdown */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={() => setShowFormulaDetails(!showFormulaDetails)}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors py-2"
        >
          <span className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-indigo-500" />
            Transparent Calculation Explanation ({breakdown.length} Components)
          </span>
          {showFormulaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showFormulaDetails && (
          <div className="mt-3 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-xs space-y-3 animate-fadeIn">
            <p className="text-slate-500 italic">
              Below is the step-by-step breakdown of how each input value was normalized and multiplied by its weight percentage:
            </p>

            <div className="divide-y divide-slate-200">
              {breakdown.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800">{item.label}</span>
                    <span className="text-slate-500 block text-[11px]">
                      Raw Value: {item.rawInputValue !== null ? item.rawInputValue : 'N/A'} (Normalized: {item.normalizedScore}/100)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-indigo-600 text-sm">+{item.weightedContribution} pts</span>
                    <span className="text-slate-400 block text-[11px]">{item.weightPercentage}% Weight</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 text-slate-600 space-y-1">
              {calculationExplanation.map((line, idx) => (
                <p key={idx} className="text-[11px] font-mono text-slate-500">• {line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
