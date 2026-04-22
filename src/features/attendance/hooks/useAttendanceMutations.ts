import { useMutation, useQueryClient } from '@tanstack/react-query'
import { attendanceApi } from '../api/attendance.api'
import type { CreateAttendanceDto, UpdateAttendanceDto } from '../types'
import { toast } from '@/lib/stores/toast.store'

export const useAttendanceMutations = () => {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (data: CreateAttendanceDto) => attendanceApi.createAttendance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
      toast.success('Attendance recorded')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAttendanceDto }) =>
      attendanceApi.updateAttendance(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
      queryClient.invalidateQueries({ queryKey: ['attendance', response.data.data.id] })
      toast.success('Attendance record updated')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => attendanceApi.deleteAttendance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] })
      toast.success('Attendance record deleted')
    },
  })

  const bulkCreateMutation = useMutation({
    mutationFn: async (data: CreateAttendanceDto[]) => {
      // Since backend doesn't support bulk yet, we loop
      const promises = data.map((item) => attendanceApi.createAttendance(item));
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast.success('Batch attendance recorded');
    },
    onError: (error) => {
      console.error('Bulk attendance error:', error);
      toast.error('Failed to record some attendance records');
    }
  });

  return {
    createAttendance: createMutation.mutate,
    isCreating: createMutation.isPending,
    bulkCreateAttendance: bulkCreateMutation.mutateAsync, // Using async variant for better control in the component if needed
    isBulkCreating: bulkCreateMutation.isPending,
    updateAttendance: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteAttendance: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  }
}
