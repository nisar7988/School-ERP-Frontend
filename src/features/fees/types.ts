import { z } from 'zod'
import type { BaseQuery, Student, SchoolClass } from '@/types/base.types'

export enum FeeStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE',
  PARTIAL = 'PARTIAL',
}

export enum PaymentMethod {
  CASH = 'CASH',
  UPI = 'UPI',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export interface FeeStructure {
  id: string
  classId: string
  title: string
  amount: number | string
  mandatory: boolean
  class?: SchoolClass
  createdAt: string
}

export const CreateFeeStructureSchema = z.object({
  classId: z.string().min(1, 'Class is required'),
  title: z.string().min(1, 'Title is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  mandatory: z.boolean().optional(),
})

export type CreateFeeStructureDto = z.infer<typeof CreateFeeStructureSchema>
export type UpdateFeeStructureDto = Partial<CreateFeeStructureDto>

export interface StudentFee {
  id: string
  studentId: string
  feeStructureId: string
  amount: number | string
  dueDate: string
  paidAmount: number | string
  pendingAmount: number | string
  status: FeeStatus
  student?: Student
  feeStructure?: FeeStructure
  payments?: Payment[]
}

export const CreateStudentFeeSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  feeStructureId: z.string().min(1, 'Fee Structure is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  dueDate: z.string().min(1, 'Due date is required'),
  status: z.nativeEnum(FeeStatus).optional(),
})

export type CreateStudentFeeDto = z.infer<typeof CreateStudentFeeSchema>
export type UpdateStudentFeeDto = Partial<CreateStudentFeeDto>

export interface Payment {
  id: string
  studentFeeId: string
  amount: number | string
  method: PaymentMethod
  referenceNo?: string | null
  paidAt: string
  studentFee?: StudentFee
  student?: Student
}

export const PaymentSchema = z.object({
  studentFeeId: z.string().min(1, 'Fee ID is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  method: z.nativeEnum(PaymentMethod),
  referenceNo: z.string().optional(),
  paidAt: z.string().optional(),
})

export type PaymentDto = z.infer<typeof PaymentSchema>

export interface PaymentQuery extends BaseQuery {
  studentId?: string
  studentFeeId?: string
  status?: FeeStatus
}

export interface FeeStructureQuery extends BaseQuery {
  classId?: string
}

export interface StudentFeeQuery extends BaseQuery {
  studentId?: string
  classId?: string
  status?: FeeStatus
}
export interface StudentFees {
  id: string
  studentId: string
  feeStructureId: string
  amount: number | string
  dueDate: string
  paidAmount: number | string
  pendingAmount: number | string
  status: FeeStatus
  createdAt: string
  updatedAt: string
  student?: Student
  feeStructure?: FeeStructure
  payments?: Payment[]
}

export interface PaymentSummary {
  totalFees: number
  totalPaid: number
  remainingAmount: number
  status: string
}
