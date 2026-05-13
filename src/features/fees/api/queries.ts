import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import {
  getPaymentsService,
  getStudentPaymentSummaryService,
  getPaymentsByStudentService,
  createPaymentService,
  deletePaymentService,
  getFeeStructuresService,
  createFeeStructureService,
  updateFeeStructureService,
  deleteFeeStructureService,
  getStudentFeesService,
  getStudentFeesByStudentService,
  createStudentFeeService,
  updateStudentFeeService,
  deleteStudentFeeService,
  getPendingFeesByClassService,
  getFeeStructureByClassService,
} from './services'
import type { PaymentQuery, StudentFee, FeeStructure, Payment, FeeStructureQuery, StudentFeeQuery } from '../types'
import type { PaginatedData, PaginatedMeta } from '@/types/base.types'
import { toast } from '@/lib/stores/toast.store'

// --- STRUCTURES ---

export const useFeeStructures = (params?: FeeStructureQuery) => {
  return useQuery<PaginatedData<FeeStructure>, Error>({
    queryKey: ['fees', 'structures', params],
    queryFn: async () => {
      const response = await getFeeStructuresService(params)
      return response.data.data
    },
  })
}

export const useFeeStructureByClass = (classId: string | undefined) => {
  return useQuery({
    queryKey: ['fees', 'structures', 'class', classId],
    queryFn: async () => {
      if (!classId) return null
      const response = await getFeeStructureByClassService(classId)
      return response.data.data
    },
    enabled: !!classId,
  })
}

export const useCreateFeeStructure = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createFeeStructureService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees', 'structures'] })
      toast.success('Fee structure created successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || 'Failed to create fee structure',
      )
    },
  })
}

export const useUpdateFeeStructure = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateFeeStructureService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees', 'structures'] })
      toast.success('Fee structure updated successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || 'Failed to update fee structure',
      )
    },
  })
}

export const useDeleteFeeStructure = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteFeeStructureService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees', 'structures'] })
      toast.success('Fee structure deleted successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || 'Failed to delete fee structure',
      )
    },
  })
}

// --- STUDENT FEES ---

export const useStudentFeesList = (params?: StudentFeeQuery) => {
  return useQuery<PaginatedData<StudentFee>, Error>({
    queryKey: ['fees', 'student-fees', params],
    queryFn: async () => {
      const response = await getStudentFeesService(params)
      return response.data.data
    },
  })
}

export const useStudentFees = (studentId: string | undefined) => {
  return useQuery({
    queryKey: ['fees', 'student-fees', 'student', studentId],
    queryFn: async () => {
      if (!studentId) return []
      const response = await getStudentFeesByStudentService(studentId)
      return response.data.data
    },
    enabled: !!studentId,
  })
}

export const usePendingFeesByClass = (classId: string | undefined) => {
  return useQuery({
    queryKey: ['fees', 'pending', 'class', classId],
    queryFn: async () => {
      if (!classId) return []
      const response = await getPendingFeesByClassService(classId)
      return response.data.data
    },
    enabled: !!classId,
  })
}

export const useCreateStudentFee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createStudentFeeService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees', 'student-fees'] })
      queryClient.invalidateQueries({ queryKey: ['fees', 'pending'] })
      toast.success('Student fee recorded successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || 'Failed to create student fee',
      )
    },
  })
}

export const useUpdateStudentFee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateStudentFeeService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees', 'student-fees'] })
      queryClient.invalidateQueries({ queryKey: ['fees', 'pending'] })
      toast.success('Student fee updated successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || 'Failed to update student fee',
      )
    },
  })
}

export const useDeleteStudentFee = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteStudentFeeService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fees', 'student-fees'] })
      toast.success('Student fee deleted successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || 'Failed to delete student fee',
      )
    },
  })
}

// --- PAYMENTS ---

export const usePayments = (params?: PaymentQuery) => {
  return useQuery<PaginatedData<Payment>, Error>({
    queryKey: ['payments', params],
    queryFn: async () => {
      const response = await getPaymentsService(params)
      return response.data.data
    },
  })
}

export const useStudentPaymentSummary = (studentId: string | undefined) => {
  return useQuery({
    queryKey: ['payments', 'summary', studentId],
    queryFn: async () => {
      if (!studentId) return null
      const response = await getStudentPaymentSummaryService(studentId)
      return response.data.data
    },
    enabled: !!studentId,
  })
}

export const useStudentPayments = (
  studentId: string | undefined,
  params?: PaymentQuery,
) => {
  return useQuery<PaginatedData<Payment>, Error>({
    queryKey: ['payments', 'student', studentId, params],
    queryFn: async () => {
      if (!studentId)
        return { data: [], meta: { total: 0, page: 1, lastPage: 1 } }
      const response = await getPaymentsByStudentService(studentId, params)
      return response.data.data
    },
    enabled: !!studentId,
  })
}

export const useCreatePayment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPaymentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
      queryClient.invalidateQueries({ queryKey: ['fees', 'student-fees'] })
      toast.success('Payment recorded successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to record payment')
    },
  })
}

export const useDeletePayment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePaymentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
      queryClient.invalidateQueries({ queryKey: ['fees', 'student-fees'] })
      toast.success('Payment deleted successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to delete payment')
    },
  })
}
