import { apiClient } from '@/lib/http/client';
import { SUBJECT_ROUTES } from './routes';
import type { Subject, SubjectDto, UpdateSubjectDto, SubjectQuery } from '../types';
import type { PaginatedResponse, SingleResponse } from '@/types/base.types';

export const getSubjectsService = (params?: SubjectQuery) =>
  apiClient.get<PaginatedResponse<Subject>>(SUBJECT_ROUTES.BASE, { params });



export const createSubjectService = (data: SubjectDto) =>
  apiClient.post<SingleResponse<Subject>>(SUBJECT_ROUTES.BASE, data);

export const updateSubjectService = (id: string, data: UpdateSubjectDto) =>
  apiClient.patch<SingleResponse<Subject>>(SUBJECT_ROUTES.BY_ID(id), data);

export const deleteSubjectService = (id: string) =>
  apiClient.delete(SUBJECT_ROUTES.BY_ID(id));
