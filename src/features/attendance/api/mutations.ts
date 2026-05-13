import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createAttendanceService,
  updateAttendanceService,
  deleteAttendanceService,
} from './services'
import type { CreateAttendanceDto, UpdateAttendanceDto } from '../types'
import { toast } from '@/lib/stores/toast.store'

export const useCreateAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAttendanceService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
      toast.success('Attendance record created')
    },
  })
}

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAttendanceDto }) =>
      updateAttendanceService(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
      queryClient.invalidateQueries({ queryKey: ['attendance', variables.id] })
      toast.success('Attendance record updated')
    },
  })
}

export const useDeleteAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAttendanceService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
      toast.success('Attendance record deleted')
    },
  })
}

export const useBulkCreateAttendance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateAttendanceDto[]) => {
      const promises = data.map((item) => createAttendanceService(item))
      return Promise.all(promises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
      toast.success('Batch attendance recorded')
    },
    onError: (error) => {
      console.error('Bulk attendance error:', error)
      toast.error('Failed to record some attendance records')
    },
  })
}
