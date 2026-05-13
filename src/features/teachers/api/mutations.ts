import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTeacherService, updateTeacherService, deleteTeacherService } from './services'
import type { UpdateTeacherDto } from '../types'
import { toast } from '@/lib/stores/toast.store'
import type { AxiosError } from 'axios'

export const useCreateTeacher = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createTeacherService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      toast.success('Teacher profile created')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to create teacher')
    }
  })
}

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTeacherDto }) =>
      updateTeacherService(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      queryClient.invalidateQueries({ queryKey: ['teachers', variables.id] })
      toast.success('Teacher profile updated')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to update teacher')
    }
  })
}

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteTeacherService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] })
      toast.success('Teacher profile deleted')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to delete teacher')
    }
  })
}
