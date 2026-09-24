export interface AcademicInputs {
  studentName: string;
  course: string;
  semester: string;
  previousSemPercentage: number;
  internalExamMarks: number;
  assignmentMarks: number;
  attendancePercentage: number;
  studyHoursPerWeek: number;
  assignmentCompletionPercentage: number;
  practicalMarks?: number | null;
}

export interface ScoreComponentBreakdownItem {
  key: keyof AcademicInputs | 'practicalMarks';
  label: string;
  rawInputValue: number | null;
  normalizedScore: number;
  weightPercentage: number;
  weightedContribution: number;
  maxContribution: number;
}

export interface PerformanceResult {
  id: string;
  createdAt: string;
  inputs: AcademicInputs;
  indicativeScore: number;
  maxScore: number; // 100
  scoreInterpretation: {
    category: 'Outstanding' | 'Good' | 'Moderate' | 'Needs Improvement';
    color: string;
    description: string;
  };
  breakdown: ScoreComponentBreakdownItem[];
  calculationExplanation: string[];
  aiInsights?: AIInsightsData | null;
}

export interface AIInsightsData {
  summary: string;
  strengths: string[];
  improvementAreas: string[];
  studyRecommendations: string[];
  encouragement: string;
  disclaimer: string;
  isFallback?: boolean;
}

export interface StudentProfile {
  studentName: string;
  course: string;
  semester: string;
}
