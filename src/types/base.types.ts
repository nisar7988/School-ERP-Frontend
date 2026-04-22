// --- ENUMS ---
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
}

export enum FeeStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE',
  PARTIAL = 'PARTIAL',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

// --- BASE MODELS ---
export type User = {
  id: string
  email: string
  password?: string
  role: UserRole
  firstName: string
  lastName: string
  phone: string | null
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
  gender: Gender
}

export type Student = {
  id: string
  admissionNo: string
  rollNo: string | null
  dateOfBirth: string | Date
  address: string | null
  fatherName: string | null
  motherName: string | null
  emergencyContact: string | null
  userId: string
  classId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type Teacher = {
  id: string
  employeeId: string
  qualification: string
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type SchoolClass = {
  id: string
  name: string
  section: string
  academicYearId: string
  teacherId: string | null
  createdAt: string | Date
  updatedAt: string | Date
}

export type Subject = {
  id: string
  name: string
  code: string
  classId: string
  teacherId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type Attendance = {
  id: string
  date: string | Date
  status: AttendanceStatus
  remarks: string | null
  studentId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type FeeRecord = {
  id: string
  amount: number | string
  dueDate: string | Date
  paidDate: string | Date | null
  status: FeeStatus
  title: string
  studentId: string
  createdAt: string | Date
  updatedAt: string | Date
}

// --- COMMON RESPONSE TYPES ---
export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: {
    data: T[]
    meta: {
      total: number
      page: number
      lastPage: number
    }
  }
}

export interface SingleResponse<T> {
  success: boolean
  message: string
  data: T
}
