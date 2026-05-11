import { apiClient } from '@/lib/http/client';
import { SCHEDULE_ROUTES } from './routes';
import type { ScheduleItem, CreateScheduleDto, UpdateScheduleDto, ScheduleQueryFilters } from '../types';
import type { PaginatedResponse, SingleResponse } from '@/types/base.types';

export const getSchedulesService = (params?: ScheduleQueryFilters) => 
  apiClient.get<PaginatedResponse<ScheduleItem>>(SCHEDULE_ROUTES.BASE, { params });

export const getScheduleByIdService = (id: string) =>
  apiClient.get<SingleResponse<ScheduleItem>>(SCHEDULE_ROUTES.BY_ID(id));

export const createScheduleService = (data: CreateScheduleDto) =>
  apiClient.post<SingleResponse<ScheduleItem>>(SCHEDULE_ROUTES.BASE, data);

export const updateScheduleService = (id: string, data: UpdateScheduleDto) =>
  apiClient.put<SingleResponse<ScheduleItem>>(SCHEDULE_ROUTES.BY_ID(id), data);

export const deleteScheduleService = (id: string) =>
  apiClient.delete<SingleResponse<void>>(SCHEDULE_ROUTES.BY_ID(id));

export const getSchedulesByClassService = (classId: string) =>
  apiClient.get<PaginatedResponse<ScheduleItem>>(SCHEDULE_ROUTES.BY_CLASS(classId));

export const getSchedulesByTeacherService = (teacherId: string) =>
  apiClient.get<PaginatedResponse<ScheduleItem>>(SCHEDULE_ROUTES.BY_TEACHER(teacherId));
