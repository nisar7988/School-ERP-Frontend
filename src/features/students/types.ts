import { z } from 'zod'
import {
  Role,
  AttendanceStatus,
  FeeStatus,
  Gender,
} from '../../types/base.types'

import type {
  Student,
  User,
  FeeRecord,
  Attendance,
  SchoolClass,
  Enrollment,
  BaseQuery,
  Subject,
} from '../../types/base.types'

export { Role, AttendanceStatus, FeeStatus, Gender }

// --- RELATIONS ---
export type StudentWithRelations = Student & {
  user: User
  attendance: Attendance[]
  fees: FeeRecord[]
  enrollments: (Enrollment & { class: SchoolClass & { subjects: Subject[] } })[]
}

// Note: SchoolClassWithRelations is now authoritative in classes/types.ts
export type { SchoolClassWithRelations } from '../classes/types'

export interface StudentQuery extends BaseQuery {
  classId?: string
}

// --- SCHEMAS ---
export const CreateStudentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  gender: z.string().min(1, 'Gender is required'),
  phone: z.string().optional().nullable(),
  admissionNo: z.string().min(1, 'Admission number is required'),
  rollNo: z.string().optional().nullable(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.string().optional().nullable(),
  fatherName: z.string().optional().nullable(),
  motherName: z.string().optional().nullable(),
  emergencyContact: z.string().optional().nullable(),
  classId: z.string().min(1, 'Class is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional()
    .or(z.literal('')),
    profileImage: z.instanceof(File).optional(),  
})

export type CreateStudentDto = z.infer<typeof CreateStudentSchema>
export type UpdateStudentDto = Partial<CreateStudentDto>

export interface FeeData {
  header: {
    title: string;
    description: string;
    nextDueDate: string;
  };
  balance: {
    amount: string;
    description: string;
  };
  status: {
    standing: string;
    totalPaid: string;
    scholarship: string;
    message: string;
  };
  payments: Array<{
    date: string;
    title: string;
    sub: string;
    amount: string;
    status: 'Paid' | 'Pending' | 'Overdue';
    ref: string;
  }>;
  installments: Array<{
    label: string;
    due: string;
    amount: string;
  }>;
  documents: Array<{
    name: string;
    sub: string;
  }>;
}
