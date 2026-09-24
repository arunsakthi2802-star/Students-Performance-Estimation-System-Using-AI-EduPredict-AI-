import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badgeText?: string;
  badgeColor?: string;
  iconBgColor?: string;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  badgeText,
  badgeColor = 'bg-indigo-50 text-indigo-700',
  iconBgColor = 'bg-indigo-500 text-white',
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${iconBgColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </span>
        {badgeText && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>
            {badgeText}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-slate-500 mt-1.5">{subtitle}</p>}
    </div>
  );
}
