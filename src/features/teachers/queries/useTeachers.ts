import { useQuery } from '@tanstack/react-query'
import { teachersApi } from '../api/teachers.api'

export const useTeachers = () => {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const response = await teachersApi.getTeachers()
      return response.data.data.data
    },
  })
}

export const useTeacher = (id: string | undefined) => {
  return useQuery({
    queryKey: ['teachers', id],
    queryFn: async () => {
      if (!id) return null
      const response = await teachersApi.getTeacher(id)
      return response.data.data
    },
    enabled: !!id,
  })
}
