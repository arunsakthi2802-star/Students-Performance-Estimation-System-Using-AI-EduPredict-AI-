import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEstimationDocument extends Document {
  id: string;
  createdAt: Date;
  inputs: {
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
  };
  indicativeScore: number;
  maxScore: number;
  scoreInterpretation: {
    category: string;
    color: string;
    description: string;
  };
  breakdown: Array<{
    key: string;
    label: string;
    rawInputValue: number | null;
    normalizedScore: number;
    weightPercentage: number;
    weightedContribution: number;
    maxContribution: number;
  }>;
  calculationExplanation: string[];
  aiInsights?: {
    summary: string;
    strengths: string[];
    improvementAreas: string[];
    studyRecommendations: string[];
    encouragement: string;
    disclaimer: string;
    isFallback?: boolean;
  } | null;
}

const EstimationSchema = new Schema<IEstimationDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    inputs: {
      studentName: { type: String, required: true },
      course: { type: String, required: true },
      semester: { type: String, required: true },
      previousSemPercentage: { type: Number, required: true },
      internalExamMarks: { type: Number, required: true },
      assignmentMarks: { type: Number, required: true },
      attendancePercentage: { type: Number, required: true },
      studyHoursPerWeek: { type: Number, required: true },
      assignmentCompletionPercentage: { type: Number, required: true },
      practicalMarks: { type: Number, default: null },
    },
    indicativeScore: { type: Number, required: true },
    maxScore: { type: Number, default: 100 },
    scoreInterpretation: {
      category: { type: String, required: true },
      color: { type: String, required: true },
      description: { type: String, required: true },
    },
    breakdown: [
      {
        key: String,
        label: String,
        rawInputValue: Number,
        normalizedScore: Number,
        weightPercentage: Number,
        weightedContribution: Number,
        maxContribution: Number,
      },
    ],
    calculationExplanation: [String],
    aiInsights: {
      summary: String,
      strengths: [String],
      improvementAreas: [String],
      studyRecommendations: [String],
      encouragement: String,
      disclaimer: String,
      isFallback: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const EstimationModel: Model<IEstimationDocument> =
  mongoose.models.Estimation || mongoose.model<IEstimationDocument>('Estimation', EstimationSchema);

export default EstimationModel;
