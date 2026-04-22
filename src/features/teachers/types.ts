import { z } from 'zod';
import type { 
  User, 
  Subject, 
  SchoolClass, 
  PaginatedResponse, 
  SingleResponse 
} from '@/features/students/types';

export type Teacher = {
  id: string;
  employeeId: string;
  qualification: string;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type TeacherWithRelations = Teacher & {
  user: User;
  subjects: Subject[];
  classTeacherOf?: SchoolClass | null;
};

// --- SCHEMAS ---
export const CreateTeacherSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  gender: z.string().min(1, 'Gender is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  qualification: z.string().min(1, 'Qualification is required'),
  joiningDate: z.string().optional().nullable(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  classId: z.string().optional().nullable(),
});

export type CreateTeacherDto = z.infer<typeof CreateTeacherSchema>;
export type UpdateTeacherDto = Partial<CreateTeacherDto>;

export type { PaginatedResponse, SingleResponse };
