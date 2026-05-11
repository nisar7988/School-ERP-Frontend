import { z } from 'zod';
import type { BaseQuery, Payment } from '@/types/base.types';

export const PaymentSchema = z.object({
  studentFeeId: z.string().min(1, 'Fee ID is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  transactionId: z.string().optional(),
  receiptNo: z.string().optional(),
  installmentNo: z.number().optional(),
});

export type PaymentDto = z.infer<typeof PaymentSchema>;

export interface PaymentQuery extends BaseQuery {
  studentId?: string;
  feeId?: string;
  status?: 'PAID' | 'PENDING' | 'PARTIAL';
}

export type { Payment };

export interface PaymentSummary {
  totalFee: number;
  paidAmount: number;
  remainingAmount: number;
  status: string;
}
