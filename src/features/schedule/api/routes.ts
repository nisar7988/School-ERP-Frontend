export const SCHEDULE_ROUTES = {
  BASE: '/schedule',
  BY_ID: (id: string) => `/schedule/${id}`,
  BY_CLASS: (classId: string) => `/schedule/class/${classId}`,
  BY_TEACHER: (teacherId: string) => `/schedule/teacher/${teacherId}`,
};
