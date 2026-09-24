'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardCard from '@/components/DashboardCard';
import { ScoreTrendChart } from '@/components/PerformanceChart';
import {
  getEstimations,
  deleteEstimation,
  getStudentProfile,
  saveStudentProfile,
} from '@/lib/storage';
import { PerformanceResult, StudentProfile } from '@/types/performance';
import {
  Award,
  Clock,
  BookOpen,
  Calendar,
  Sparkles,
  Calculator,
  Trash2,
  Eye,
  Plus,
  BarChart3,
  Edit2,
  Check,
  Database,
  RefreshCw,
} from 'lucide-react';

export default function DashboardPage() {
  const [estimations, setEstimations] = useState<PerformanceResult[]>([]);
  const [profile, setProfile] = useState<StudentProfile>({
    studentName: 'Nithyasri S',
    course: 'Computer Science & Engineering',
    semester: 'Semester 6',
  });
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [dbStatusMsg, setDbStatusMsg] = useState<string | null>(null);

  const fetchDbEstimations = async () => {
    try {
      const res = await fetch('/api/estimations');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setEstimations(json.data);
          if (typeof window !== 'undefined') {
            window.localStorage.setItem('edupredict_estimations_v1', JSON.stringify(json.data));
          }
          return;
        }
      }
    } catch (err) {
      console.warn('DB fetch info:', err);
    }
    setEstimations(getEstimations());
  };

  useEffect(() => {
    const loadedProfile = getStudentProfile();
    setProfile(loadedProfile);
    setNameInput(loadedProfile.studentName);
    fetchDbEstimations();
  }, []);

  const handleSaveName = () => {
    if (nameInput.trim()) {
      const updated = { ...profile, studentName: nameInput.trim() };
      setProfile(updated);
      saveStudentProfile(updated);
    }
    setEditingName(false);
  };

  const handleSeedDatabase = async () => {
    setSeeding(true);
    setDbStatusMsg(null);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setDbStatusMsg('MongoDB Collection Seeded Successfully! (' + json.count + ' records created)');
        await fetchDbEstimations();
      } else {
        setDbStatusMsg('Seed error: ' + (json.details || json.error));
      }
    } catch (err: any) {
      setDbStatusMsg('Seed failed: ' + err.message);
    } finally {
      setSeeding(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this estimation record?')) {
      deleteEstimation(id);
      setEstimations(prev => prev.filter(item => item.id !== id));
    }
  };

  const latestEst = estimations.length > 0 ? estimations[0] : null;

  // Calculate stats
  const avgScore =
    estimations.length > 0
      ? Math.round(
          (estimations.reduce((sum, item) => sum + item.indicativeScore, 0) / estimations.length) * 10
        ) / 10
      : 0;

  const latestAttendance = latestEst ? latestEst.inputs.attendancePercentage : 0;
  const latestAssignment = latestEst ? latestEst.inputs.assignmentMarks : 0;
  const latestStudyHours = latestEst ? latestEst.inputs.studyHoursPerWeek : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Student Dashboard
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-emerald-600" /> MongoDB Atlas Connected
            </span>
          </div>

          <div className="flex items-center gap-3">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="px-3 py-1.5 border border-indigo-300 rounded-xl text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSaveName}
                  className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Welcome, {profile.studentName}!
                </h1>
                <button
                  onClick={() => setEditingName(true)}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Edit Name"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <p className="text-slate-500 text-xs sm:text-sm">
            Course: <strong>{profile.course}</strong> | {profile.semester}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-3 rounded-xl shadow-sm transition-colors disabled:opacity-50"
          >
            {seeding ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Database className="w-4 h-4 text-emerald-400" />
            )}
            <span>Seed MongoDB Demo Data</span>
          </button>

          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all"
          >
            <Calculator className="w-4 h-4 text-indigo-200" />
            <span>New Performance Estimation</span>
          </Link>
        </div>
      </div>

      {dbStatusMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl p-4 flex items-center justify-between">
          <span>{dbStatusMsg}</span>
          <button onClick={() => setDbStatusMsg(null)} className="text-emerald-600 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Average Score"
          value={estimations.length > 0 ? `${avgScore} / 100` : 'N/A'}
          subtitle={`Based on ${estimations.length} total estimation runs`}
          icon={Award}
          badgeText={estimations.length > 0 ? `${estimations.length} Runs` : 'No Data'}
          badgeColor="bg-indigo-50 text-indigo-700"
          iconBgColor="bg-indigo-600 text-white"
        />

        <DashboardCard
          title="Latest Attendance"
          value={latestEst ? `${latestAttendance}%` : 'N/A'}
          subtitle="Target threshold: 85%+"
          icon={Calendar}
          badgeText={latestAttendance >= 85 ? 'Optimal' : latestAttendance > 0 ? 'Needs Boost' : 'N/A'}
          badgeColor={latestAttendance >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}
          iconBgColor="bg-emerald-600 text-white"
        />

        <DashboardCard
          title="Assignment Score"
          value={latestEst ? `${latestAssignment}/100` : 'N/A'}
          subtitle="Latest assignment score mark"
          icon={BookOpen}
          badgeText={latestAssignment >= 75 ? 'Good' : latestAssignment > 0 ? 'Average' : 'N/A'}
          badgeColor="bg-blue-50 text-blue-700"
          iconBgColor="bg-blue-600 text-white"
        />

        <DashboardCard
          title="Weekly Study Hours"
          value={latestEst ? `${latestStudyHours} hrs` : 'N/A'}
          subtitle="Self-study routine hours"
          icon={Clock}
          badgeText={latestStudyHours >= 12 ? 'Dedicated' : latestStudyHours > 0 ? 'Moderate' : 'N/A'}
          badgeColor="bg-purple-50 text-purple-700"
          iconBgColor="bg-purple-600 text-white"
        />
      </div>

      {/* Main Content Split: Score Trend Chart & Latest Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Trend Line Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Indicative Score History & Trends
              </h2>
              <p className="text-xs text-slate-500">Track your calculated scores across multiple estimation sessions.</p>
            </div>
            {estimations.length > 0 && (
              <Link href="/analytics" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                Full Analytics →
              </Link>
            )}
          </div>

          <ScoreTrendChart estimations={estimations} />
        </div>

        {/* Right: Latest Score Snapshot Widget */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Latest Result Summary
          </h2>

          {latestEst ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-5 text-white space-y-2">
                <span className="text-xs text-indigo-300 font-medium">Indicative Performance</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-extrabold">{latestEst.indicativeScore}</span>
                  <span className="text-xs bg-indigo-500/30 text-indigo-200 px-2.5 py-1 rounded-full border border-indigo-400/30 font-semibold">
                    {latestEst.scoreInterpretation.category}
                  </span>
                </div>
                <p className="text-xs text-indigo-200 pt-1 line-clamp-2">
                  {latestEst.scoreInterpretation.description}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/results?id=${latestEst.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold py-2.5 rounded-xl text-xs transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Full Report & AI Insights
                </Link>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-500">No performance estimations recorded yet.</p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={handleSeedDatabase}
                  className="inline-flex items-center gap-1.5 bg-slate-900 text-white font-semibold text-xs px-3 py-2 rounded-xl"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  Seed Demo Data
                </button>
                <Link
                  href="/estimate"
                  className="inline-flex items-center gap-1.5 bg-indigo-600 text-white font-semibold text-xs px-3 py-2 rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Run Estimation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estimation History Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Estimation Records</h2>
            <p className="text-xs text-slate-500">Synced live with MongoDB Atlas collection (`estimations`)</p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Total: {estimations.length}
          </span>
        </div>

        {estimations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Student Name</th>
                  <th className="px-4 py-3">Course / Semester</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Interpretation</th>
                  <th className="px-4 py-3">Attendance</th>
                  <th className="px-4 py-3">AI Guidance</th>
                  <th className="px-4 py-3 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {estimations.map(est => (
                  <tr key={est.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-slate-900 whitespace-nowrap">
                      {est.inputs.studentName}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {est.inputs.course} ({est.inputs.semester})
                    </td>
                    <td className="px-4 py-3.5 font-extrabold text-slate-900 text-sm">
                      {est.indicativeScore} <span className="text-[10px] font-normal text-slate-400">/ 100</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full font-semibold ${est.scoreInterpretation.color}`}>
                        {est.scoreInterpretation.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700">
                      {est.inputs.attendancePercentage}%
                    </td>
                    <td className="px-4 py-3.5">
                      {est.aiInsights ? (
                        <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                          <Sparkles className="w-3 h-3" />
                          Generated
                        </span>
                      ) : (
                        <span className="text-slate-400">Basic</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-2">
                      <Link
                        href={`/results?id=${est.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(est.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-semibold transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <p className="text-sm text-slate-500 font-medium">No estimations in MongoDB collection yet.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleSeedDatabase}
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
              >
                <Database className="w-4 h-4 text-emerald-400" />
                Seed Demo Data
              </button>
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Estimate Academic Performance Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
