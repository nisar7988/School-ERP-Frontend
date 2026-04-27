import { z } from 'zod'
import type {
  StudentWithRelations,
  TeacherWithRelations,
} from '../students/types'
import type { SchoolClass as BaseSchoolClass } from '../../types/base.types'
import type { PaginatedResponse, SingleResponse, BaseQuery } from '../../types/base.types'
import type { Subject } from '../../types/base.types'

export enum ClassRole {
  INCHARGE = 'INCHARGE',
  SUBJECT_TEACHER = 'SUBJECT_TEACHER',
}

export const StaffDtoSchema = z.object({
  teacherId: z.string().min(1, 'Teacher selection is required'),
  role: z.nativeEnum(ClassRole),
})

export type StaffDto = z.infer<typeof StaffDtoSchema>

export type AcademicYear = {
  id: string
  year: string
  classes?: {
    id: string
    name: string
    section: string
  }[]
}

// Re-using base class but adding the new staff relation
export type SchoolClass = BaseSchoolClass

export type ClassStaff = {
  id: string
  classId: string
  teacherId: string
  role: ClassRole
  teacher?: TeacherWithRelations
}

export type SchoolClassWithRelations = SchoolClass & {
  students: StudentWithRelations[]
  subjects: Subject[]
  staff: ClassStaff[]
  academicYear?: AcademicYear
}

export const CreateClassSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  section: z.string().min(1, 'Section is required'),
  academicYearId: z.string().nullable().optional().transform(val => (val === '' || val === null) ? undefined : val),
  staff: z.array(StaffDtoSchema).optional(),
})

export type CreateClassDto = z.infer<typeof CreateClassSchema>
export type UpdateClassDto = Partial<CreateClassDto>

export interface ClassQuery extends BaseQuery {
  academicYearId?: string
  teacherId?: string
}

export type { PaginatedResponse, SingleResponse, PaginatedMeta } from '../../types/base.types'
