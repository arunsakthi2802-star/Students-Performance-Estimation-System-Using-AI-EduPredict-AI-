import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'EduPredict AI | Students Performance Estimation System Using AI',
  description:
    'Beginner-friendly AI-powered web application helping students and teachers estimate academic performance using transparent weighted formulas and Gemini AI insights.',
  keywords: [
    'Student Performance Estimation',
    'Gemini AI',
    'EduPredict AI',
    'Academic Performance Analytics',
    'Next.js AI App',
    'Nithyasri S',
  ],
  authors: [{ name: 'Nithyasri S' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
