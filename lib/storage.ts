import { PerformanceResult, StudentProfile } from '@/types/performance';

const STORAGE_KEY_ESTIMATIONS = 'edupredict_estimations_v1';
const STORAGE_KEY_PROFILE = 'edupredict_profile_v1';

export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

export function saveEstimation(estimation: PerformanceResult): void {
  // 1. Save to local storage for immediate UI response
  if (isLocalStorageAvailable()) {
    try {
      const current = getEstimations();
      const updated = [estimation, ...current.filter(item => item.id !== estimation.id)];
      window.localStorage.setItem(STORAGE_KEY_ESTIMATIONS, JSON.stringify(updated));

      saveStudentProfile({
        studentName: estimation.inputs.studentName,
        course: estimation.inputs.course,
        semester: estimation.inputs.semester,
      });
    } catch (err) {
      console.error('Failed to save estimation to localStorage:', err);
    }
  }

  // 2. Async sync with MongoDB API Endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/estimations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estimation),
    })
      .then(res => res.json())
      .then(data => console.log('Synced estimation to MongoDB:', data?.success))
      .catch(err => console.warn('MongoDB API sync warning:', err));
  }
}

export function getEstimations(): PerformanceResult[] {
  if (!isLocalStorageAvailable()) return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEY_ESTIMATIONS);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse estimations from localStorage:', err);
    return [];
  }
}

export function getEstimationById(id: string): PerformanceResult | null {
  const estimations = getEstimations();
  return estimations.find(item => item.id === id) || null;
}

export function deleteEstimation(id: string): void {
  if (isLocalStorageAvailable()) {
    try {
      const current = getEstimations();
      const updated = current.filter(item => item.id !== id);
      window.localStorage.setItem(STORAGE_KEY_ESTIMATIONS, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to delete estimation from localStorage:', err);
    }
  }

  if (typeof window !== 'undefined') {
    fetch(`/api/estimations/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => console.log('Deleted record from MongoDB:', data?.success))
      .catch(err => console.warn('MongoDB delete sync error:', err));
  }
}

export function clearAllEstimations(): void {
  if (isLocalStorageAvailable()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY_ESTIMATIONS);
    } catch (err) {
      console.error('Failed to clear estimations from localStorage:', err);
    }
  }

  if (typeof window !== 'undefined') {
    fetch('/api/estimations', { method: 'DELETE' })
      .then(res => res.json())
      .then(data => console.log('Cleared MongoDB collection:', data?.success))
      .catch(err => console.warn('MongoDB clear sync error:', err));
  }
}

export function saveStudentProfile(profile: StudentProfile): void {
  if (!isLocalStorageAvailable()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile to localStorage:', err);
  }
}

export function getStudentProfile(): StudentProfile {
  if (!isLocalStorageAvailable()) {
    return { studentName: 'Nithyasri S', course: 'Computer Science & Engineering', semester: 'Semester 6' };
  }
  try {
    const data = window.localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!data) {
      return { studentName: 'Nithyasri S', course: 'Computer Science & Engineering', semester: 'Semester 6' };
    }
    return JSON.parse(data);
  } catch (err) {
    return { studentName: 'Nithyasri S', course: 'Computer Science & Engineering', semester: 'Semester 6' };
  }
}
