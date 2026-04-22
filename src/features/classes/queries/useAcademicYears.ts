import { useQuery } from '@tanstack/react-query'
import { academicYearsApi } from '../api/academic-years.api'

export const useAcademicYears = () => {
  return useQuery({
    queryKey: ['academic-years'],
    queryFn: async () => {
      const response = await academicYearsApi.getAcademicYears()
      return response.data.data.data
    },
  })
}
