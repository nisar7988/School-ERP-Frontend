import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createStudentService, updateStudentService, deleteStudentService } from './services'
import type { UpdateStudentDto } from '../types'
import { toast } from '@/lib/stores/toast.store'
import type { AxiosError } from 'axios'

export const useCreateStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createStudentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Student profile created')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to create student')
    }
  })
}

export const useUpdateStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudentDto }) =>
      updateStudentService(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['students', variables.id] })
      toast.success('Student profile updated')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to update student')
    }
  })
}

export const useDeleteStudent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteStudentService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Student profile deleted')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to delete student')
    }
  })
}
