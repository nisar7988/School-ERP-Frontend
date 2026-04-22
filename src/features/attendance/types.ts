import { z } from 'zod';
import { AttendanceStatus } from '../students/types';
import type { Student } from '../students/types';

export { AttendanceStatus };

export interface Attendance {
  id: string;
  date: string | Date;
  status: AttendanceStatus;
  remarks: string | null;
  studentId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface AttendanceWithStudent extends Attendance {
  student: Student & {
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export const CreateAttendanceSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  status: z.nativeEnum(AttendanceStatus),
  remarks: z.string().optional().nullable(),
  studentId: z.string().min(1, 'Student ID is required'),
  classId: z.string().min(1, 'Class ID is required').uuid(),
});

export const UpdateAttendanceSchema = CreateAttendanceSchema.partial();

export type CreateAttendanceDto = z.infer<typeof CreateAttendanceSchema>;
export type UpdateAttendanceDto = z.infer<typeof UpdateAttendanceSchema>;

export interface AttendanceFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  status?: AttendanceStatus;
}
