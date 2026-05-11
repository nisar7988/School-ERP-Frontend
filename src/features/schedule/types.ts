export interface ScheduleItem {
  id: string;
  subjectId: string;
  subject?: {
    id: string;
    name: string;
    code: string;
  };
  subjectName?: string;
  teacherId: string;
  teacher?: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
    }
  };
  teacherName?: string;
  classId: string;
  class?: {
    id: string;
    name: string;
    section: string;
  };
  className?: string;
  room: string;
  dayOfWeek: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  startTime: string; 
  endTime: string;   
}

export interface CreateScheduleDto {
  subjectId: string;
  teacherId: string;
  classId: string;
  room: string;
  dayOfWeek: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  startTime: string;
  endTime: string;
}

export type UpdateScheduleDto = Partial<CreateScheduleDto>;

export interface ScheduleQueryFilters {
  classId?: string;
  teacherId?: string;
}
