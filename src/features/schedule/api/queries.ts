import { useQuery } from '@tanstack/react-query';
import { 
  getSchedulesService, 
  getScheduleByIdService, 
  getSchedulesByClassService, 
  getSchedulesByTeacherService 
} from './services';
import type { ScheduleQueryFilters } from '../types';
import { useAuthStore } from '@/features/auth/store';
import { Role } from '@/features/auth/types';

export const useSchedules = (params?: ScheduleQueryFilters) => {
  return useQuery({
    queryKey: ['schedules', params],
    queryFn: async () => {
      const response = await getSchedulesService(params);
      return response.data.data.data;
    },
  });
};

export const useScheduleById = (id: string) => {
  return useQuery({
    queryKey: ['schedules', id],
    queryFn: async () => {
      const response = await getScheduleByIdService(id);
      return response.data.data;
    },
    enabled: !!id,
  });
};

export const useSchedulesByClass = (classId: string) => {
  return useQuery({
    queryKey: ['schedules', 'class', classId],
    queryFn: async () => {
      const response = await getSchedulesByClassService(classId);
      return response.data.data.data;
    },
    enabled: !!classId,
  });
};

export const useSchedulesByTeacher = (teacherId: string) => {
  return useQuery({
    queryKey: ['schedules', 'teacher', teacherId],
    queryFn: async () => {
      const response = await getSchedulesByTeacherService(teacherId);
      return response.data.data.data;
    },
    enabled: !!teacherId,
  });
};

export const useSchedulesByMe = () => {
  const user = useAuthStore((state) => state.user);
  
  return useQuery({
    queryKey: ['schedules', 'me', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('Not authenticated');
      
      // TEACHER: Use teacher-specific schedules
      if (user.role === Role.TEACHER && user.teacherProfile) {
        const response = await getSchedulesByTeacherService(user.teacherProfile.id);
        return response.data.data.data;
      }
      
      // STUDENT: Use class-specific schedules via /api/schedule/class/{classId}
      if (user.role === Role.STUDENT && user.studentProfile) {
        // Attempt to find classId from profile or enrollments
        const student = user.studentProfile as any;
        const classId = student.classId || student.enrollments?.[0]?.classId || student.currentClassId;
        
        if (classId) {
          const response = await getSchedulesByClassService(classId);
          return response.data.data.data;
        }
      }
      
      // ADMIN or FALLBACK: Get all (or filter by generic params)
      const response = await getSchedulesService();
      return response.data.data.data;
    },
    enabled: !!user,
  });
};
