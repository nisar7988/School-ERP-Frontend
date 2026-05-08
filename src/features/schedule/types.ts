export interface ScheduleItem {
  id: string;
  subject: string;
  teacherId: string;
  teacherName?: string;
  classId: string;
  className?: string;
  room: string;
  dayOfWeek: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  startTime: string; // HH:mm format, e.g., '08:00'
  endTime: string;   // HH:mm format, e.g., '09:30'
}

export interface CreateScheduleDto {
  subject: string;
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
