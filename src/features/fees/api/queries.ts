import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getPaymentsService,
  getPaymentService,
  getStudentPaymentSummaryService,
  getPaymentsByStudentService,
  createPaymentService,
  deletePaymentService
} from './services';
import type { PaymentQuery, PaymentDto } from '../types';
import { toast } from '@/lib/stores/toast.store';

export const usePayments = (params?: PaymentQuery) => {
  return useQuery({
    queryKey: ['payments', params],
    queryFn: async () => {
      const response = await getPaymentsService(params);
      return response.data.data;
    },
  });
};

export const useStudentPaymentSummary = (studentId: string | undefined) => {
  return useQuery({
    queryKey: ['payments', 'summary', studentId],
    queryFn: async () => {
      if (!studentId) return null;
      const response = await getStudentPaymentSummaryService(studentId);
      return response.data.data;
    },
    enabled: !!studentId,
  });
};

export const useStudentPayments = (studentId: string | undefined) => {
  return useQuery({
    queryKey: ['payments', 'student', studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const response = await getPaymentsByStudentService(studentId);
      return response.data.data;
    },
    enabled: !!studentId,
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPaymentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Payment recorded successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to record payment');
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePaymentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Payment deleted successfully');
    },
  });
};
