export const ATTENDANCE_ROUTES = {
  BASE: '/attendance',
  BY_ID: (id: string) => `/attendance/${id}`,
  BY_STUDENT: (studentId: string) => `/attendance/student/${studentId}`,
};
