'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AcademicInputs } from '@/types/performance';
import { validateAcademicInputs, FormErrors } from '@/lib/validation';
import { calculatePerformanceScore } from '@/lib/performance';
import { saveEstimation, getStudentProfile } from '@/lib/storage';
import { Sparkles, Calculator, HelpCircle, CheckCircle2, User, BookOpen, Clock, Award, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PerformanceForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [includePractical, setIncludePractical] = useState(false);

  const [formData, setFormData] = useState<Partial<AcademicInputs>>({
    studentName: '',
    course: 'Computer Science & Engineering',
    semester: 'Semester 4',
    previousSemPercentage: 78,
    internalExamMarks: 82,
    assignmentMarks: 85,
    attendancePercentage: 90,
    studyHoursPerWeek: 15,
    assignmentCompletionPercentage: 88,
    practicalMarks: null,
  });

  // Pre-fill profile if available
  useEffect(() => {
    const profile = getStudentProfile();
    if (profile.studentName && profile.studentName !== 'Alex Student') {
      setFormData(prev => ({
        ...prev,
        studentName: profile.studentName,
        course: profile.course || prev.course,
        semester: profile.semester || prev.semester,
      }));
    }
  }, []);

  const handleInputChange = (field: keyof AcademicInputs, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const preparedInputs: AcademicInputs = {
      studentName: formData.studentName || '',
      course: formData.course || '',
      semester: formData.semester || '',
      previousSemPercentage: Number(formData.previousSemPercentage) || 0,
      internalExamMarks: Number(formData.internalExamMarks) || 0,
      assignmentMarks: Number(formData.assignmentMarks) || 0,
      attendancePercentage: Number(formData.attendancePercentage) || 0,
      studyHoursPerWeek: Number(formData.studyHoursPerWeek) || 0,
      assignmentCompletionPercentage: Number(formData.assignmentCompletionPercentage) || 0,
      practicalMarks: includePractical && formData.practicalMarks !== null && formData.practicalMarks !== undefined && `${formData.practicalMarks}`.trim() !== ''
        ? Number(formData.practicalMarks)
        : null,
    };

    const validationErrors = validateAcademicInputs(preparedInputs);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      // 1. Calculate transparent indicative score locally
      const calculatedResult = calculatePerformanceScore(preparedInputs);

      // 2. Fetch Gemini AI Insights via API route handler
      try {
        const response = await fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inputs: preparedInputs,
            indicativeScore: calculatedResult.indicativeScore,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.insights) {
            calculatedResult.aiInsights = data.insights;
          }
        }
      } catch (aiErr) {
        console.warn('API call failed, falling back to local heuristic insights:', aiErr);
      }

      // 3. Save to localStorage
      saveEstimation(calculatedResult);

      // 4. Navigate to Results page
      router.push(`/results?id=${calculatedResult.id}`);
    } catch (err) {
      console.error('Error during score estimation process:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-indigo-200 border border-indigo-400/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            Transparent AI Guidance Formula
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Estimate Your Academic Performance
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
            Enter your academic marks, attendance, and study routine. Our system calculates a transparent indicative score and provides Gemini AI educational feedback.
          </p>
        </div>
      </div>

      {/* Section 1: Student Context */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Student Profile & Details</h2>
            <p className="text-xs text-slate-500">Provide basic identity details for your report summary.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Student Name */}
          <div>
            <label htmlFor="studentName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Student Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="studentName"
              type="text"
              placeholder="e.g. Nithya Sharma"
              value={formData.studentName || ''}
              onChange={e => handleInputChange('studentName', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                errors.studentName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300 bg-white'
              }`}
            />
            {errors.studentName && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.studentName}</p>}
          </div>

          {/* Course */}
          <div>
            <label htmlFor="course" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Course / Major <span className="text-rose-500">*</span>
            </label>
            <input
              id="course"
              type="text"
              placeholder="e.g. B.Tech Computer Science"
              value={formData.course || ''}
              onChange={e => handleInputChange('course', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                errors.course ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300 bg-white'
              }`}
            />
            {errors.course && <p className="text-xs text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.course}</p>}
          </div>

          {/* Semester */}
          <div>
            <label htmlFor="semester" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Current Semester / Year <span className="text-rose-500">*</span>
            </label>
            <select
              id="semester"
              value={formData.semester || 'Semester 4'}
              onChange={e => handleInputChange('semester', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            >
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
              <option value="Semester 4">Semester 4</option>
              <option value="Semester 5">Semester 5</option>
              <option value="Semester 6">Semester 6</option>
              <option value="Semester 7">Semester 7</option>
              <option value="Semester 8">Semester 8</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Academic & Attendance Inputs */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Academic Metrics & Marks (0 – 100 Scale)</h2>
            <p className="text-xs text-slate-500">Each parameter contributes a specific weight to your indicative calculation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Previous Semester % */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="prevSem" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Previous Semester % (Weight: 25%) <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {formData.previousSemPercentage}%
              </span>
            </div>
            <input
              id="prevSem"
              type="number"
              min="0"
              max="100"
              value={formData.previousSemPercentage ?? ''}
              onChange={e => handleInputChange('previousSemPercentage', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                errors.previousSemPercentage ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
              }`}
            />
            {errors.previousSemPercentage && <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.previousSemPercentage}</p>}
          </div>

          {/* Internal Exam Marks */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="internalMarks" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Internal Examination Marks (Weight: 25%) <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {formData.internalExamMarks}/100
              </span>
            </div>
            <input
              id="internalMarks"
              type="number"
              min="0"
              max="100"
              value={formData.internalExamMarks ?? ''}
              onChange={e => handleInputChange('internalExamMarks', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                errors.internalExamMarks ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
              }`}
            />
            {errors.internalExamMarks && <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.internalExamMarks}</p>}
          </div>

          {/* Assignment Marks */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="assignmentMarks" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Assignment Score Marks (Weight: 15%) <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {formData.assignmentMarks}/100
              </span>
            </div>
            <input
              id="assignmentMarks"
              type="number"
              min="0"
              max="100"
              value={formData.assignmentMarks ?? ''}
              onChange={e => handleInputChange('assignmentMarks', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                errors.assignmentMarks ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
              }`}
            />
            {errors.assignmentMarks && <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.assignmentMarks}</p>}
          </div>

          {/* Attendance Percentage */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="attendance" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Attendance Percentage % (Weight: 15%) <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {formData.attendancePercentage}%
              </span>
            </div>
            <input
              id="attendance"
              type="number"
              min="0"
              max="100"
              value={formData.attendancePercentage ?? ''}
              onChange={e => handleInputChange('attendancePercentage', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                errors.attendancePercentage ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
              }`}
            />
            {errors.attendancePercentage && <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.attendancePercentage}</p>}
          </div>

          {/* Assignment Completion Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="assignCompletion" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Assignment Completion % (Weight: 10%) <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {formData.assignmentCompletionPercentage}%
              </span>
            </div>
            <input
              id="assignCompletion"
              type="number"
              min="0"
              max="100"
              value={formData.assignmentCompletionPercentage ?? ''}
              onChange={e => handleInputChange('assignmentCompletionPercentage', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                errors.assignmentCompletionPercentage ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
              }`}
            />
            {errors.assignmentCompletionPercentage && <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.assignmentCompletionPercentage}</p>}
          </div>

          {/* Study Hours Per Week */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="studyHours" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Self-Study Hours / Week (0 – 168) <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {formData.studyHoursPerWeek} hrs
              </span>
            </div>
            <input
              id="studyHours"
              type="number"
              min="0"
              max="168"
              value={formData.studyHoursPerWeek ?? ''}
              onChange={e => handleInputChange('studyHoursPerWeek', e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                errors.studyHoursPerWeek ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
              }`}
            />
            {errors.studyHoursPerWeek && <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.studyHoursPerWeek}</p>}
          </div>
        </div>

        {/* Optional Practical Marks Toggle */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                id="togglePractical"
                type="checkbox"
                checked={includePractical}
                onChange={e => {
                  setIncludePractical(e.target.checked);
                  if (!e.target.checked) {
                    handleInputChange('practicalMarks', null);
                  } else if (formData.practicalMarks === null) {
                    handleInputChange('practicalMarks', 75);
                  }
                }}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <label htmlFor="togglePractical" className="text-sm font-semibold text-slate-800 cursor-pointer">
                Include Practical Examination Marks (10% Weight)
              </label>
            </div>
            <span className="text-xs text-slate-500 italic">Optional field</span>
          </div>

          {includePractical && (
            <div className="pl-7 animate-fadeIn">
              <div className="space-y-1.5 max-w-md">
                <label htmlFor="practicalMarks" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Practical Marks (0 – 100)
                </label>
                <input
                  id="practicalMarks"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.practicalMarks ?? ''}
                  onChange={e => handleInputChange('practicalMarks', e.target.value)}
                  className={`w-full px-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    errors.practicalMarks ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                  }`}
                />
                {errors.practicalMarks && <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.practicalMarks}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button & Disclaimer */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <span>
            Calculation runs transparently. Gemini AI provides educational study feedback based solely on your submitted details.
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing AI Estimation...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span>Calculate & Generate AI Insights</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
