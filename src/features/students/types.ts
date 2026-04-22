import { z } from 'zod'
import {
  UserRole,
  AttendanceStatus,
  FeeStatus,
  Gender,
} from '../../types/base.types'

export { UserRole, AttendanceStatus, FeeStatus, Gender }

import type {
  Student,
  Teacher,
  User,
  FeeRecord,
  Attendance,
  Subject,
  SchoolClass,
} from '../../types/base.types'

// --- RELATIONS ---
export type UserWithProfiles = User & {
  studentProfile?: Student | null
  teacherProfile?: Teacher | null
}

export type StudentWithRelations = Student & {
  user: User
  class: any // Will be typed in specific contexts or use any to break circularity
  attendance: Attendance[]
  fees: FeeRecord[]
}

export type TeacherWithRelations = Teacher & {
  user: User
  subjects: Subject[]
  classTeacherOf?: SchoolClass | null
}

// Note: SchoolClassWithRelations is now authoritative in classes/types.ts
export type { SchoolClassWithRelations } from '../classes/types'

export type SubjectWithRelations = Subject & {
  class: SchoolClass
  teacher: Teacher
}

export type AttendanceWithStudent = Attendance & {
  student: Student
}

export type FeeRecordWithStudent = FeeRecord & {
  student: Student
}

export interface StudentQuery {
  classId?: string
  page?: number
  limit?: number
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
})

export type CreateStudentDto = z.infer<typeof CreateStudentSchema>
export type UpdateStudentDto = Partial<CreateStudentDto>
