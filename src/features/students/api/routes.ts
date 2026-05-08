export const STUDENT_ROUTES = {
  BASE: '/students',
  BY_ID: (id: string) => `/students/${id}`,
  FEE_DETAILS: (studentId: string) => `/fees/${studentId}`,
};
