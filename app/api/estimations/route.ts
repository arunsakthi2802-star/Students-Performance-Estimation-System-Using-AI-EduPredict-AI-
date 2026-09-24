import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import EstimationModel from '@/models/Estimation';

export async function GET() {
  try {
    await connectToDatabase();
    const records = await EstimationModel.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, count: records.length, data: records });
  } catch (error: any) {
    console.error('Error fetching estimations from MongoDB:', error);
    return NextResponse.json(
      { success: false, error: 'Database fetch failed', details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.id || !body.inputs || typeof body.indicativeScore !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid payload. Record ID, inputs, and score required.' },
        { status: 400 }
      );
    }

    const created = await EstimationModel.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating estimation in MongoDB:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create record in database', details: error?.message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await connectToDatabase();
    const result = await EstimationModel.deleteMany({});
    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (error: any) {
    console.error('Error clearing estimations in MongoDB:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear database collection', details: error?.message },
      { status: 500 }
    );
  }
}
