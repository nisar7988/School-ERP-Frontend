export const FEE_ROUTES = {
  PAYMENTS: '/payments',
  PAYMENT_BY_ID: (id: string) => `/payments/${id}`,
  PAYMENTS_BY_FEE: (feeId: string) => `/payments/fee/${feeId}`,
  PAYMENTS_BY_STUDENT: (studentId: string) => `/payments/student/${studentId}`,
  STUDENT_PAYMENT_SUMMARY: (studentId: string) => `/payments/student/${studentId}/summary`,
};
