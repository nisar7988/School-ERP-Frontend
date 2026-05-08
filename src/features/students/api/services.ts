import { apiClient as http } from '@/lib/http/client'
import { STUDENT_ROUTES } from './routes'
import type {
  StudentWithRelations,
  CreateStudentDto,
  UpdateStudentDto,
  StudentQuery,
  FeeData,
} from '../types'
import type {
  Student,
  PaginatedResponse,
  SingleResponse,
} from '@/types/base.types'

export const getStudentsService = (params?: StudentQuery) =>
  http.get<PaginatedResponse<StudentWithRelations>>(STUDENT_ROUTES.BASE, {
    params,
  })

export const getStudentService = (id: string) =>
  http.get<SingleResponse<StudentWithRelations>>(STUDENT_ROUTES.BY_ID(id))

export const createStudentService = (data: CreateStudentDto) =>
  http.post<SingleResponse<Student>>(STUDENT_ROUTES.BASE, data)

export const updateStudentService = (id: string, data: UpdateStudentDto) =>
  http.patch<SingleResponse<Student>>(STUDENT_ROUTES.BY_ID(id), data)

export const deleteStudentService = (id: string) =>
  http.delete(STUDENT_ROUTES.BY_ID(id))

// export const getFeeDetailsService = (studentId: string) =>
//   http.get<SingleResponse<FeeData>>(STUDENT_ROUTES.FEE_DETAILS(studentId));
const MOCK_FEE_DATA: FeeData = {
  header: {
    title: 'Fees & Finance',
    description:
      'Manage your tuition installments, laboratory fees, and view your complete financial history for the 2024 academic cycle.',
    nextDueDate: 'October 16, 2024',
  },
  balance: {
    amount: '$4,250.00',
    description: 'Academic Tuition (Q3) & Resource Access',
  },
  status: {
    standing: 'Good Standing',
    totalPaid: '$18,400.00',
    scholarship: '$2,000.00',
    message: 'No overdue payments on record for the current term.',
  },
  payments: [
    {
      date: 'Sept 01, 2024',
      title: 'Tuition Installment #1',
      sub: 'Quarterly Academic Fee',
      amount: '$6,000.00',
      status: 'Paid',
      ref: 'TRX-10291',
    },
    {
      date: 'Aug 14, 2024',
      title: 'Laboratory & Research Fee',
      sub: 'Studio Lab Access',
      amount: '$450.00',
      status: 'Paid',
      ref: 'TRX-10182',
    },
    {
      date: 'Aug 18, 2024',
      title: 'Campus Facility Access',
      sub: 'Annual Facility Services',
      amount: '$250.00',
      status: 'Pending',
      ref: 'TRX-11422',
    },
  ],
  installments: [
    {
      label: 'October Installment',
      due: 'Due Oct 16, 2024',
      amount: '$2,125.00',
    },
    {
      label: 'November Installment',
      due: 'Due Nov 16, 2024',
      amount: '$2,125.00',
    },
  ],
  documents: [
    { name: 'Tax Statement 2023', sub: 'Form 1098-T' },
    { name: 'Fee Structure 2024', sub: 'Annual Breakdown' },
  ],
}
export const getFeeDetailsService = (id: string) => {
  return {
    data: {
      data: MOCK_FEE_DATA,
    },
  }
}
