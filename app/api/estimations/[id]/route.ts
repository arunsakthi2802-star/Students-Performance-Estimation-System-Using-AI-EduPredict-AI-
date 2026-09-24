import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import EstimationModel from '@/models/Estimation';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const record = await EstimationModel.findOne({ id }).lean();

    if (!record) {
      return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    console.error('Error fetching single estimation:', error);
    return NextResponse.json(
      { success: false, error: 'Fetch failed', details: error?.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deleted = await EstimationModel.findOneAndDelete({ id });

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Record deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting single estimation:', error);
    return NextResponse.json(
      { success: false, error: 'Delete failed', details: error?.message },
      { status: 500 }
    );
  }
}
