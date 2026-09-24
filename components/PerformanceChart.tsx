'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
} from 'recharts';
import { ScoreComponentBreakdownItem, PerformanceResult } from '@/types/performance';

interface ComponentBreakdownChartProps {
  breakdown: ScoreComponentBreakdownItem[];
}

export function InputComparisonChart({ breakdown }: ComponentBreakdownChartProps) {
  const chartData = breakdown.map(item => ({
    name: item.label.replace(' Percentage', ' %').replace(' Examination Marks', ' Marks'),
    score: item.normalizedScore,
    weight: item.weightPercentage,
  }));

  const COLORS = ['#6366f1', '#3b82f6', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              border: 'none',
              color: '#ffffff',
              fontSize: '12px',
            }}
            formatter={(value: any) => [`${value} / 100`, 'Score']}
          />
          <Bar dataKey="score" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ComponentContributionChartProps {
  breakdown: ScoreComponentBreakdownItem[];
}

export function ComponentContributionChart({ breakdown }: ComponentContributionChartProps) {
  const chartData = breakdown.map(item => ({
    name: item.label.replace(' Percentage', ' %').replace(' Examination Marks', ' Marks'),
    value: item.weightedContribution,
    maxPossible: item.maxContribution,
  }));

  const COLORS = ['#4f46e5', '#2563eb', '#0284c7', '#059669', '#d97706', '#db2777'];

  return (
    <div className="w-full h-72 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 10, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              border: 'none',
              color: '#ffffff',
              fontSize: '12px',
            }}
            formatter={(val: any, name: any, item: any) => [
              `${val} pts (Max ${item.payload.maxPossible} pts)`,
              'Weighted Contribution',
            ]}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ScoreTrendChartProps {
  estimations: PerformanceResult[];
}

export function ScoreTrendChart({ estimations }: ScoreTrendChartProps) {
  // Sort oldest to newest
  const sorted = [...estimations].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const chartData = sorted.map((est, index) => ({
    label: `Run ${index + 1} (${new Date(est.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })})`,
    score: est.indicativeScore,
    attendance: est.inputs.attendancePercentage,
    internal: est.inputs.internalExamMarks,
  }));

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 text-sm italic">
        No estimations recorded yet. Create an estimation to view trend charts.
      </div>
    );
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: -10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderRadius: '12px',
              border: 'none',
              color: '#ffffff',
              fontSize: '12px',
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            name="Indicative Score"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 5, fill: '#4f46e5' }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="attendance"
            name="Attendance %"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="4 4"
          />
          <Line
            type="monotone"
            dataKey="internal"
            name="Internal Marks"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
