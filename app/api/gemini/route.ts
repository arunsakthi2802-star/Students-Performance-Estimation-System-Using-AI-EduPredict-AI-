import { NextRequest, NextResponse } from 'next/server';
import { generateAIInsights } from '@/lib/gemini';
import { AcademicInputs } from '@/types/performance';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { inputs, indicativeScore } = body as {
      inputs: AcademicInputs;
      indicativeScore: number;
    };

    if (!inputs || typeof indicativeScore !== 'number') {
      return NextResponse.json(
        { error: 'Invalid payload. Academic inputs and indicative score are required.' },
        { status: 400 }
      );
    }

    const aiInsights = await generateAIInsights(inputs, indicativeScore);

    return NextResponse.json({ success: true, insights: aiInsights });
  } catch (error: any) {
    console.error('API Error in /api/gemini:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate AI insights',
        details: error?.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
