import { apiClient } from '@/lib/http/client'
import { FEE_ROUTES } from './routes'
import type {
  Payment,
  PaymentDto,
  PaymentQuery,
  PaymentSummary,
  FeeStructure,
  CreateFeeStructureDto,
  UpdateFeeStructureDto,
  StudentFee,
  CreateStudentFeeDto,
  UpdateStudentFeeDto,
  FeeStructureQuery,
  StudentFeeQuery,
  StudentFees,
} from '../types'
import type { PaginatedResponse, SingleResponse } from '@/types/base.types'

// Structures
export const createFeeStructureService = (data: CreateFeeStructureDto) =>
  apiClient.post<SingleResponse<FeeStructure>>(FEE_ROUTES.STRUCTURES, data)

export const updateFeeStructureService = ({
  id,
  data,
}: {
  id: string
  data: UpdateFeeStructureDto
}) =>
  apiClient.patch<SingleResponse<FeeStructure>>(
    FEE_ROUTES.STRUCTURE_BY_ID(id),
    data,
  )

export const deleteFeeStructureService = (id: string) =>
  apiClient.delete(FEE_ROUTES.STRUCTURE_BY_ID(id))

export const getFeeStructuresService = (params?: FeeStructureQuery) =>
  apiClient.get<PaginatedResponse<FeeStructure>>(FEE_ROUTES.STRUCTURES, {
    params,
  })

export const getFeeStructureByClassService = (classId: string) =>
  apiClient.get<SingleResponse<FeeStructure>>(
    FEE_ROUTES.STRUCTURES_BY_CLASS(classId),
  )

// Student Fees
export const createStudentFeeService = (data: CreateStudentFeeDto) =>
  apiClient.post<SingleResponse<StudentFee>>(FEE_ROUTES.STUDENT_FEES, data)

export const updateStudentFeeService = ({
  id,
  data,
}: {
  id: string
  data: UpdateStudentFeeDto
}) =>
  apiClient.patch<SingleResponse<StudentFee>>(
    FEE_ROUTES.STUDENT_FEE_BY_ID(id),
    data,
  )

export const deleteStudentFeeService = (id: string) =>
  apiClient.delete(FEE_ROUTES.STUDENT_FEE_BY_ID(id))

export const getStudentFeesService = (params?: StudentFeeQuery) =>
  apiClient.get<PaginatedResponse<StudentFee>>(FEE_ROUTES.STUDENT_FEES, {
    params,
  })

export const getStudentFeesByStudentService = (studentId: string) =>
  apiClient.get<SingleResponse<StudentFee[]>>(
    FEE_ROUTES.STUDENT_FEES_BY_STUDENT(studentId),
  )

export const getPendingFeesByClassService = (classId: string) =>
  apiClient.get<SingleResponse<StudentFee[]>>(
    FEE_ROUTES.PENDING_FEES_BY_CLASS(classId),
  )

export const getAllFees = () =>
  apiClient.get<SingleResponse<StudentFees[]>>(FEE_ROUTES.STUDENT_FEES)

// Payments
export const createPaymentService = (data: PaymentDto) =>
  apiClient.post<SingleResponse<Payment>>(FEE_ROUTES.PAYMENTS, data)

export const getPaymentsByStudentService = (
  studentId: string,
  params?: PaymentQuery,
) =>
  apiClient.get<PaginatedResponse<Payment>>(
    FEE_ROUTES.PAYMENTS_BY_STUDENT(studentId),
    { params },
  )

export const getStudentPaymentSummaryService = (studentId: string) =>
  apiClient.get<SingleResponse<PaymentSummary>>(
    FEE_ROUTES.STUDENT_PAYMENT_SUMMARY(studentId),
  )

export const deletePaymentService = (id: string) =>
  apiClient.delete(FEE_ROUTES.PAYMENT_BY_ID(id))

export const getPaymentsService = (params?: PaymentQuery) =>
  apiClient.get<PaginatedResponse<Payment>>(FEE_ROUTES.PAYMENTS, { params })

export const generateFeeReportService = (studentId: string) =>
  apiClient.get(FEE_ROUTES.FEE_REPORT(studentId), { responseType: 'blob' })
