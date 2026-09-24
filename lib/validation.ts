import { AcademicInputs } from '@/types/performance';

export interface FormErrors {
  studentName?: string;
  course?: string;
  semester?: string;
  previousSemPercentage?: string;
  internalExamMarks?: string;
  assignmentMarks?: string;
  attendancePercentage?: string;
  studyHoursPerWeek?: string;
  assignmentCompletionPercentage?: string;
  practicalMarks?: string;
}

export function validateAcademicInputs(inputs: Partial<AcademicInputs>): FormErrors {
  const errors: FormErrors = {};

  if (!inputs.studentName || !inputs.studentName.trim()) {
    errors.studentName = 'Student name is required.';
  }

  if (!inputs.course || !inputs.course.trim()) {
    errors.course = 'Course name is required.';
  }

  if (!inputs.semester || !inputs.semester.trim()) {
    errors.semester = 'Semester details are required.';
  }

  const checkPercentage = (val: number | undefined, fieldName: keyof FormErrors, label: string) => {
    if (val === undefined || val === null || isNaN(Number(val))) {
      errors[fieldName] = `${label} is required.`;
    } else if (val < 0 || val > 100) {
      errors[fieldName] = `${label} must be between 0% and 100%.`;
    }
  };

  const checkMarks = (val: number | undefined, fieldName: keyof FormErrors, label: string) => {
    if (val === undefined || val === null || isNaN(Number(val))) {
      errors[fieldName] = `${label} is required.`;
    } else if (val < 0 || val > 100) {
      errors[fieldName] = `${label} must be between 0 and 100.`;
    }
  };

  checkPercentage(inputs.previousSemPercentage, 'previousSemPercentage', 'Previous Semester Percentage');
  checkMarks(inputs.internalExamMarks, 'internalExamMarks', 'Internal Examination Marks');
  checkMarks(inputs.assignmentMarks, 'assignmentMarks', 'Assignment Marks');
  checkPercentage(inputs.attendancePercentage, 'attendancePercentage', 'Attendance Percentage');
  checkPercentage(inputs.assignmentCompletionPercentage, 'assignmentCompletionPercentage', 'Assignment Completion Percentage');

  if (inputs.studyHoursPerWeek === undefined || inputs.studyHoursPerWeek === null || isNaN(Number(inputs.studyHoursPerWeek))) {
    errors.studyHoursPerWeek = 'Study hours per week is required.';
  } else if (inputs.studyHoursPerWeek < 0 || inputs.studyHoursPerWeek > 168) {
    errors.studyHoursPerWeek = 'Study hours per week must be between 0 and 168.';
  }

  if (inputs.practicalMarks !== undefined && inputs.practicalMarks !== null && `${inputs.practicalMarks}`.trim() !== '') {
    const pMarks = Number(inputs.practicalMarks);
    if (isNaN(pMarks) || pMarks < 0 || pMarks > 100) {
      errors.practicalMarks = 'Practical marks must be between 0 and 100.';
    }
  }

  return errors;
}
