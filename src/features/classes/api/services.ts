import { apiClient as http } from '@/lib/http/client'
import { CLASS_ROUTES } from './routes'
import type {
  SchoolClassWithRelations,
  CreateClassDto,
  UpdateClassDto,
  ClassQuery,
  AcademicYear
} from '../types'
import type { SchoolClass, PaginatedResponse, SingleResponse } from '@/types/base.types'

export const getClassesService = (params?: ClassQuery) =>
  http.get<PaginatedResponse<SchoolClassWithRelations>>(CLASS_ROUTES.BASE, { params });

export const getClassService = (id: string) =>
  http.get<SingleResponse<SchoolClassWithRelations>>(CLASS_ROUTES.BY_ID(id));

export const createClassService = (data: CreateClassDto) =>
  http.post<SingleResponse<SchoolClass>>(CLASS_ROUTES.BASE, data);

export const updateClassService = (id: string, data: UpdateClassDto) =>
  http.put<SingleResponse<SchoolClass>>(CLASS_ROUTES.BY_ID(id), data);

export const deleteClassService = (id: string) => 
  http.delete(CLASS_ROUTES.BY_ID(id));

export const getAcademicYearsService = () =>
  http.get<PaginatedResponse<AcademicYear>>(CLASS_ROUTES.ACADEMIC_YEARS);
