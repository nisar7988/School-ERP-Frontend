import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createClassService,
  updateClassService,
  deleteClassService,
} from './services'
import type { UpdateClassDto } from '../types'
import { toast } from '@/lib/stores/toast.store'
import type { AxiosError } from 'axios'

export const useCreateClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createClassService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      toast.success('Class created successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to create class')
    }
  })
}

export const useUpdateClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClassDto }) =>
      updateClassService(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      queryClient.invalidateQueries({ queryKey: ['classes', variables.id] })
      toast.success('Class updated successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to update class')
    }
  })
}

export const useDeleteClass = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteClassService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] })
      toast.success('Class deleted successfully')
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Failed to delete class')
    }
  })
}
