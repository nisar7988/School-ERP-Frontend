import { apiClient as http } from '@/lib/http/client'
import { TEACHER_ROUTES } from './routes'
import type {
  TeacherWithRelations,
  CreateTeacherDto,
  UpdateTeacherDto,
  TeacherQuery,
} from '../types'
import type {
  Teacher,
  PaginatedResponse,
  SingleResponse,
} from '@/types/base.types'
import type { SchoolClassWithRelations } from '@/features/classes/types'

export const getTeachersService = (params?: TeacherQuery) =>
  http.get<PaginatedResponse<TeacherWithRelations>>(TEACHER_ROUTES.BASE, {
    params,
  })

export const getTeacherService = (id: string) =>
  http.get<SingleResponse<TeacherWithRelations>>(TEACHER_ROUTES.BY_ID(id))

export const createTeacherService = (data: CreateTeacherDto) =>
  http.post<SingleResponse<Teacher>>(TEACHER_ROUTES.BASE, data)

export const updateTeacherService = (id: string, data: UpdateTeacherDto) =>
  http.patch<SingleResponse<Teacher>>(TEACHER_ROUTES.BY_ID(id), data)

export const deleteTeacherService = (id: string) =>
  http.delete(TEACHER_ROUTES.BY_ID(id))

export const getClassesByTeacherService = () =>
  http.get<PaginatedResponse<SchoolClassWithRelations>>(TEACHER_ROUTES.CLASSES)

export const getScheduleService = () =>
  // Mocking the schedule response to match the dashboard data structure
  Promise.resolve({
    data: {
      data: {
        brand: 'Amber Atelier ERP',
        date: { weekday: 'Monday', month: 'OCT', day: 23 },
        page: {
          title: 'Academic Schedule',
          subtitle: "Curating today's intellectual discourse.",
        },
        viewModes: ['Daily', 'Weekly'],
        scheduleItems: [
          {
            id: 'cls-001',
            type: 'class',
            section: 'SEC-A',
            room: 'ROOM 302',
            startTime: '09:00',
            period: 'AM',
            label: 'START',
            title: 'Advanced Mathematics II',
            topic: 'Stochastic Processes & Probability Theory',
            durationMins: 90,
            status: 'available',
            actions: [],
          },
          {
            id: 'cls-002',
            type: 'priority',
            section: null,
            room: null,
            startTime: '11:00',
            endTime: '12:30',
            label: 'PRIORITY EVENT',
            title: 'Student Consultation Hours',
            topic:
              'Dedicated time for thesis reviews and academic guidance in the Faculty Lounge.',
            durationMins: 90,
            status: 'scheduled',
            actions: [],
          },
          {
            id: 'cls-003',
            type: 'class',
            section: 'LAB-B',
            room: 'ROOM 105',
            startTime: '02:00',
            period: 'PM',
            label: 'START',
            title: 'Physics Laboratory',
            topic: 'Practical: Quantum Interference & Wave Dynamics',
            durationMins: 120,
            status: 'locked',
            lockedUntil: '1:45 PM',
            actions: [],
          },
        ],
      },
    },
  })
