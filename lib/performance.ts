import { AcademicInputs, PerformanceResult, ScoreComponentBreakdownItem } from '@/types/performance';

interface WeightDefinition {
  key: keyof AcademicInputs;
  label: string;
  defaultWeight: number;
}

const DEFAULT_WEIGHTS: WeightDefinition[] = [
  { key: 'previousSemPercentage', label: 'Previous Semester %', defaultWeight: 25 },
  { key: 'internalExamMarks', label: 'Internal Exam Marks', defaultWeight: 25 },
  { key: 'assignmentMarks', label: 'Assignment Marks', defaultWeight: 15 },
  { key: 'attendancePercentage', label: 'Attendance %', defaultWeight: 15 },
  { key: 'assignmentCompletionPercentage', label: 'Assignment Completion %', defaultWeight: 10 },
  { key: 'practicalMarks', label: 'Practical Marks', defaultWeight: 10 },
];

/**
 * Calculates a transparent indicative performance score (0-100) based on weighted academic inputs.
 */
export function calculatePerformanceScore(inputs: AcademicInputs): PerformanceResult {
  const hasPractical = inputs.practicalMarks !== undefined && inputs.practicalMarks !== null && !isNaN(Number(inputs.practicalMarks));

  // Determine active weights
  const activeComponents = DEFAULT_WEIGHTS.filter(comp => {
    if (comp.key === 'practicalMarks') {
      return hasPractical;
    }
    return true;
  });

  const totalRawWeight = activeComponents.reduce((sum, item) => sum + item.defaultWeight, 0);

  // Normalize weights so they sum to 100%
  const breakdown: ScoreComponentBreakdownItem[] = [];
  let calculatedScore = 0;
  const explanationLines: string[] = [];

  activeComponents.forEach(comp => {
    const rawVal = inputs[comp.key] as number;
    // Ensure input is bounded between 0 and 100
    const normalizedScore = Math.max(0, Math.min(100, Number(rawVal) || 0));
    
    // Adjusted weight percentage
    const adjustedWeight = (comp.defaultWeight / totalRawWeight) * 100;
    const weightedContribution = (normalizedScore * adjustedWeight) / 100;
    
    calculatedScore += weightedContribution;

    breakdown.push({
      key: comp.key,
      label: comp.label,
      rawInputValue: rawVal,
      normalizedScore: Math.round(normalizedScore * 10) / 10,
      weightPercentage: Math.round(adjustedWeight * 10) / 10,
      weightedContribution: Math.round(weightedContribution * 10) / 10,
      maxContribution: Math.round(adjustedWeight * 10) / 10,
    });

    explanationLines.push(
      `${comp.label}: Input ${normalizedScore} × ${Math.round(adjustedWeight * 10) / 10}% weight = ${Math.round(weightedContribution * 10) / 10} points`
    );
  });

  const finalScore = Math.round(calculatedScore * 10) / 10;

  if (!hasPractical) {
    explanationLines.unshift('Note: Practical marks were omitted. Remaining 5 component weights were normalized proportionally to sum to 100%.');
  }

  // Interpretation category
  let category: 'Outstanding' | 'Good' | 'Moderate' | 'Needs Improvement' = 'Moderate';
  let color = 'text-amber-600 bg-amber-50 border-amber-200';
  let description = 'Moderate academic standing with room for steady progress.';

  if (finalScore >= 85) {
    category = 'Outstanding';
    color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    description = 'Excellent performance indicating strong concept mastery and consistency.';
  } else if (finalScore >= 70) {
    category = 'Good';
    color = 'text-blue-700 bg-blue-50 border-blue-200';
    description = 'Solid academic standing with good foundation across core parameters.';
  } else if (finalScore >= 55) {
    category = 'Moderate';
    color = 'text-amber-700 bg-amber-50 border-amber-200';
    description = 'Satisfactory performance. Targeted effort in weak areas can yield significant growth.';
  } else {
    category = 'Needs Improvement';
    color = 'text-rose-700 bg-rose-50 border-rose-200';
    description = 'Performance requires immediate academic guidance and focused study strategies.';
  }

  return {
    id: `est_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    inputs,
    indicativeScore: finalScore,
    maxScore: 100,
    scoreInterpretation: {
      category,
      color,
      description,
    },
    breakdown,
    calculationExplanation: explanationLines,
  };
}
