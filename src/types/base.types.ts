// --- ENUMS ---
export enum Role {
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

export enum ClassRole {
  INCHARGE = 'INCHARGE',
  SUBJECT_TEACHER = 'SUBJECT_TEACHER',
}

// --- BASE MODELS ---
export type User = {
  id: string
  email: string
  password?: string
  role: Role
  firstName: string
  lastName: string
  phone: string | null
  profileImage?: string | null
  gender?: Gender | null
  isActive: boolean
  createdAt: string | Date
  updatedAt: string | Date
}

export type UserWithProfiles = User & {
  studentProfile?: Student | null
  teacherProfile?: Teacher | null
}

export type Student = {
  id: string
  admissionNo: string
  rollNo: string | null
  dateOfBirth: string | Date
  address: string | null
  gender: Gender | null
  fatherName: string | null
  motherName: string | null
  emergencyContact: string | null
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
  enrollments?: (Enrollment & { class: SchoolClass })[]
}

export type Teacher = {
  id: string
  employeeId: string
  qualification: string
  gender: Gender | null
  userId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type AcademicYear = {
  id: string
  year: string
}

export type SchoolClass = {
  id: string
  name: string
  section: string
  academicYearId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type Enrollment = {
  id: string
  studentId: string
  classId: string
  startDate: string | Date
  endDate: string | Date | null
  class?: SchoolClass
}

export type Subject = {
  id: string
  name: string
  code: string
  classId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type SubjectTeacher = {
  id: string
  subjectId: string
  teacherId: string
}

export type ClassStaff = {
  id: string
  classId: string
  teacherId: string
  role: ClassRole
}

export type Attendance = {
  id: string
  date: string | Date
  status: AttendanceStatus
  remarks: string | null
  studentId: string
  classId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type FeeRecord = {
  id: string
  amount: number | string
  dueDate: string | Date
  status: FeeStatus
  title: string
  studentId: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type Payment = {
  id: string
  amount: number | string
  paidAt: string | Date
  feeId: string
  createdAt: string | Date
}

// --- COMMON RESPONSE TYPES ---
export interface PaginatedMeta {
  total: number
  page: number
  lastPage: number
  limit?: number
}

export interface PaginatedData<T> {
  data: T[]
  meta: PaginatedMeta
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: PaginatedData<T>
}

export interface SingleResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface BaseQuery {
  page?: number
  limit?: number
  search?: string
}
