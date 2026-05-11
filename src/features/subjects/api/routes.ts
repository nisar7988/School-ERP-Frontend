export const SUBJECT_ROUTES = {
  BASE: '/subjects',
  BY_ID: (id: string) => `/subjects/${id}`,
  BY_CLASS: (classId: string) => `/subjects/class/${classId}`,
};
