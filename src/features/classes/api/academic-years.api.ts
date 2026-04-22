import { apiClient as http } from '@/lib/http/client'
import type { AcademicYear } from '../types'
import type { PaginatedResponse } from '@/features/students/types'

export const academicYearsApi = {
  getAcademicYears: () =>
    http.get<PaginatedResponse<AcademicYear>>('/academic-years'),
}
