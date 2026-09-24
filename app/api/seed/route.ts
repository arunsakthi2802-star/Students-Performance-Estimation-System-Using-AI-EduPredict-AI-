import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import EstimationModel from '@/models/Estimation';
import { calculatePerformanceScore } from '@/lib/performance';
import { generateFallbackInsights } from '@/lib/gemini';

const SAMPLE_STUDENTS = [
  {
    studentName: 'Nithyasri S',
    course: 'Computer Science & Engineering',
    semester: 'Semester 6',
    previousSemPercentage: 88,
    internalExamMarks: 92,
    assignmentMarks: 95,
    attendancePercentage: 96,
    studyHoursPerWeek: 20,
    assignmentCompletionPercentage: 98,
    practicalMarks: 94,
  },
  {
    studentName: 'Arun Kumar',
    course: 'Artificial Intelligence & Data Science',
    semester: 'Semester 4',
    previousSemPercentage: 76,
    internalExamMarks: 80,
    assignmentMarks: 85,
    attendancePercentage: 88,
    studyHoursPerWeek: 14,
    assignmentCompletionPercentage: 90,
    practicalMarks: 82,
  },
  {
    studentName: 'Priya Sharma',
    course: 'Information Technology',
    semester: 'Semester 4',
    previousSemPercentage: 64,
    internalExamMarks: 68,
    assignmentMarks: 72,
    attendancePercentage: 75,
    studyHoursPerWeek: 10,
    assignmentCompletionPercentage: 78,
    practicalMarks: 70,
  },
];

export async function POST() {
  try {
    await connectToDatabase();

    await EstimationModel.deleteMany({});

    const seededRecords = [];

    for (const sample of SAMPLE_STUDENTS) {
      const calculated = calculatePerformanceScore(sample);
      calculated.aiInsights = generateFallbackInsights(sample, calculated.indicativeScore);

      const record = await EstimationModel.create(calculated);
      seededRecords.push(record);
    }

    return NextResponse.json({
      success: true,
      message: 'Database collection seeded successfully with sample student records!',
      count: seededRecords.length,
      data: seededRecords,
    });
  } catch (error: any) {
    console.error('Database seeding error:', error?.message || error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to seed database. Verify network access or MongoDB Atlas IP whitelist.',
        details: error?.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
