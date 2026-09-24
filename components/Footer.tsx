import React from 'react';
import Link from 'next/link';
import { Brain, Heart, ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Brain className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                EduPredict <span className="text-indigo-400">AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              <strong>Students Performance Estimation System Using AI</strong> — A modern, transparent AI-guided platform helping students explore academic strengths and personalized study guidance.
            </p>
            <div className="flex items-center text-xs text-slate-400 gap-1.5 pt-1">
              <span>Project Owner:</span>
              <span className="font-semibold text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/50">
                Nithyasri S
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">
                  Home Landing Page
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-400 transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/estimate" className="hover:text-indigo-400 transition-colors">
                  Performance Estimator
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-indigo-400 transition-colors">
                  Performance Analytics
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Disclaimer & Notice */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Academic Disclaimer
            </h3>
            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
                <ShieldAlert className="w-4 h-4" />
                <span>Indicative Estimation</span>
              </div>
              <p className="leading-snug">
                Calculated scores use a weighted demonstration formula. Gemini AI suggestions are informational and not institutional exam predictions.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} EduPredict AI. All rights reserved. Developed for college project demonstration.
          </p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-300">Privacy Notice: Data processed locally in your browser</span>
            <span className="hover:text-slate-300">Powered by Next.js & Google Gemini</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
