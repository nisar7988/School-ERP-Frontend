import { apiClient } from '@/lib/http/client';
import { FEE_ROUTES } from './routes';
import type { Payment, PaymentDto, PaymentQuery, PaymentSummary } from '../types';
import type { PaginatedResponse, SingleResponse } from '@/types/base.types';

export const createPaymentService = (data: PaymentDto) =>
  apiClient.post<SingleResponse<Payment>>(FEE_ROUTES.PAYMENTS, data);

export const getPaymentService = (id: string) =>
  apiClient.get<SingleResponse<Payment>>(FEE_ROUTES.PAYMENT_BY_ID(id));

export const getPaymentsByFeeService = (feeId: string) =>
  apiClient.get<SingleResponse<Payment[]>>(FEE_ROUTES.PAYMENTS_BY_FEE(feeId));

export const getPaymentsByStudentService = (studentId: string) =>
  apiClient.get<SingleResponse<Payment[]>>(FEE_ROUTES.PAYMENTS_BY_STUDENT(studentId));

export const getStudentPaymentSummaryService = (studentId: string) =>
  apiClient.get<SingleResponse<PaymentSummary>>(FEE_ROUTES.STUDENT_PAYMENT_SUMMARY(studentId));

export const deletePaymentService = (id: string) =>
  apiClient.delete(FEE_ROUTES.PAYMENT_BY_ID(id));

// General payments search for admin dashboard
export const getPaymentsService = (params?: PaymentQuery) =>
  apiClient.get<PaginatedResponse<Payment>>(FEE_ROUTES.PAYMENTS, { params });
