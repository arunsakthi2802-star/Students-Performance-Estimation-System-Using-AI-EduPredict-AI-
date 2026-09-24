import { GoogleGenAI } from '@google/genai';
import { AcademicInputs, AIInsightsData } from '@/types/performance';

/**
 * Generates structured AI educational insights using Google Gemini API or fallback rules.
 */
export async function generateAIInsights(
  inputs: AcademicInputs,
  indicativeScore: number
): Promise<AIInsightsData> {
  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback handler if no API key is provided or if key is placeholder
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn('Gemini API key is missing or default. Returning heuristic fallback insights.');
    return generateFallbackInsights(inputs, indicativeScore);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are an educational guidance assistant. Analyze the provided academic information and calculated indicative score.
Give supportive, realistic, and easy-to-understand academic guidance.
Do not claim that the estimate is guaranteed.
Do not make unsupported judgments about the student's intelligence, motivation, personal circumstances, or future.
Identify strengths, areas for improvement, and practical study recommendations. Use only the supplied information.

Student Context:
- Student Name: ${inputs.studentName}
- Course & Semester: ${inputs.course}, ${inputs.semester}
- Previous Semester Percentage: ${inputs.previousSemPercentage}%
- Internal Exam Marks: ${inputs.internalExamMarks}/100
- Assignment Marks: ${inputs.assignmentMarks}/100
- Attendance Percentage: ${inputs.attendancePercentage}%
- Study Hours Per Week: ${inputs.studyHoursPerWeek} hours
- Assignment Completion: ${inputs.assignmentCompletionPercentage}%
${inputs.practicalMarks !== undefined && inputs.practicalMarks !== null ? `- Practical Marks: ${inputs.practicalMarks}/100` : ''}
- Calculated Indicative Score: ${indicativeScore}/100

Respond strictly with valid JSON format matching this JSON Schema (no markdown codeblock wrapping if possible, just raw JSON):
{
  "summary": "Short concise synthesis of academic progress",
  "strengths": ["Strength 1", "Strength 2"],
  "improvementAreas": ["Area 1", "Area 2"],
  "studyRecommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
  "encouragement": "Supportive closing motivational phrase",
  "disclaimer": "AI-generated guidance is informational and should not be treated as a guaranteed academic prediction."
}
`;

    // Call gemini model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '';
    
    // Clean codeblock formatting if present
    const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsedJSON = JSON.parse(cleanedText);

    if (
      typeof parsedJSON.summary === 'string' &&
      Array.isArray(parsedJSON.strengths) &&
      Array.isArray(parsedJSON.improvementAreas) &&
      Array.isArray(parsedJSON.studyRecommendations)
    ) {
      return {
        summary: parsedJSON.summary,
        strengths: parsedJSON.strengths,
        improvementAreas: parsedJSON.improvementAreas,
        studyRecommendations: parsedJSON.studyRecommendations,
        encouragement: parsedJSON.encouragement || 'Keep pressing forward with consistent effort!',
        disclaimer:
          parsedJSON.disclaimer ||
          'AI-generated guidance is informational and should not be treated as a guaranteed academic prediction.',
        isFallback: false,
      };
    } else {
      throw new Error('Invalid JSON structure returned by Gemini API');
    }
  } catch (err: any) {
    console.error('Gemini API call error:', err?.message || err);
    return generateFallbackInsights(inputs, indicativeScore);
  }
}

/**
 * Robust fallback generator when Gemini API is unavailable, offline, or returns error.
 */
export function generateFallbackInsights(
  inputs: AcademicInputs,
  indicativeScore: number
): AIInsightsData {
  const strengths: string[] = [];
  const improvementAreas: string[] = [];
  const studyRecommendations: string[] = [];

  if (inputs.attendancePercentage >= 85) {
    strengths.push(`High attendance rate (${inputs.attendancePercentage}%), demonstrating active classroom engagement.`);
  } else {
    improvementAreas.push(`Attendance is currently ${inputs.attendancePercentage}%. Aiming for 85%+ will improve concept retention.`);
    studyRecommendations.push('Prioritize regular lecture attendance to avoid missing foundational topic explanations.');
  }

  if (inputs.internalExamMarks >= 75) {
    strengths.push(`Strong internal examination performance (${inputs.internalExamMarks}/100).`);
  } else {
    improvementAreas.push(`Internal exam score (${inputs.internalExamMarks}/100) indicates key concept gaps in mid-term topics.`);
    studyRecommendations.push('Review past exam papers and clarify unresolved doubts with subject teachers.');
  }

  if (inputs.assignmentCompletionPercentage >= 80) {
    strengths.push(`Consistent assignment submission pace (${inputs.assignmentCompletionPercentage}% completed).`);
  } else {
    improvementAreas.push(`Assignment submission rate (${inputs.assignmentCompletionPercentage}%) can be boosted.`);
    studyRecommendations.push('Create a weekly assignment calendar to submit work well before deadlines.');
  }

  if (inputs.studyHoursPerWeek < 12) {
    improvementAreas.push(`Weekly self-study time (${inputs.studyHoursPerWeek} hrs/week) may be insufficient for complex subjects.`);
    studyRecommendations.push(`Increase active self-study by 3–5 hours per week using structured Pomodoro sessions.`);
  } else {
    strengths.push(`Dedicated study routine with ${inputs.studyHoursPerWeek} self-study hours per week.`);
  }

  if (strengths.length === 0) {
    strengths.push('Demonstrated willingness to evaluate and improve academic performance through self-assessment.');
  }

  return {
    summary: `${inputs.studentName} has achieved an indicative score of ${indicativeScore}/100 in ${inputs.course} (${inputs.semester}). Focus on balanced study habits will support steady growth.`,
    strengths,
    improvementAreas: improvementAreas.length > 0 ? improvementAreas : ['Maintain current momentum across all subject modules.'],
    studyRecommendations:
      studyRecommendations.length > 0
        ? studyRecommendations
        : ['Form weekly revision groups with peers.', 'Maintain organized notes after each class lecture.'],
    encouragement: 'Consistent daily effort and structured revision are the keys to unlocking your full potential!',
    disclaimer: 'AI-generated guidance is informational and should not be treated as a guaranteed academic prediction.',
    isFallback: true,
  };
}
