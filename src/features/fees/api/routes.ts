export const FEE_ROUTES = {
  // Structures
  STRUCTURES: '/fees/structures',
  STRUCTURE_BY_ID: (id: string) => `/fees/structures/${id}`,
  STRUCTURES_BY_CLASS: (classId: string) => `/fees/structures/class/${classId}`,

  // Student Fees
  STUDENT_FEES: '/fees/student-fees',
  STUDENT_FEE_BY_ID: (id: string) => `/fees/student-fees/${id}`,
  STUDENT_FEES_BY_STUDENT: (studentId: string) => `/fees/student-fees/student/${studentId}`,
  FEES_BY_STUDENT: (studentId: string) => `/fees/student/${studentId}`,
  PENDING_FEES_BY_CLASS: (classId: string) => `/fees/pending/class/${classId}`,

  // Payments
  PAYMENTS: '/payments',
  PAYMENT_BY_ID: (id: string) => `/payments/${id}`,
  PAYMENTS_BY_STUDENT_FEE: (studentFeeId: string) => `/payments/student-fee/${studentFeeId}`,
  PAYMENTS_BY_STUDENT: (studentId: string) => `/payments/student/${studentId}`,
  STUDENT_PAYMENT_SUMMARY: (studentId: string) => `/payments/student/${studentId}/summary`,
};
