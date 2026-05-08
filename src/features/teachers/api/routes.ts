export const TEACHER_ROUTES = {
  BASE: '/teachers',
  CLASSES: '/teachers/classes',
  SCHEDULE: '/teachers/schedule',
  BY_ID: (id: string) => `/teachers/${id}`,
};
