import { type StudentFee, FeeStatus } from '../types'

/**
 * Calculates fee statistics for the dashboard
 */
export const calculateFeeStats = (studentFees: StudentFee[]) => {
  const totalCollected = studentFees
    .filter((f) => f.status === FeeStatus.PAID)
    .reduce((sum, f) => sum + Number(f.amount || 0), 0)

  const pendingDues = studentFees
    .filter(
      (f) => f.status === FeeStatus.PENDING || f.status === FeeStatus.OVERDUE,
    )
    .reduce((sum, f) => sum + Number(f.amount || 0), 0)

  const partialCount = studentFees.filter(
    (f) => f.status === FeeStatus.PARTIAL,
  ).length

  return {
    totalCollected,
    pendingDues,
    partialCount,
  }
}

/**
 * Returns Tailwind CSS classes for fee status badges
 */
export const getFeeStatusColor = (status: FeeStatus | string) => {
  switch (status) {
    case FeeStatus.PAID:
    case 'PAID':
      return 'bg-green-50 text-green-600'
    case FeeStatus.PARTIAL:
    case 'PARTIAL':
      return 'bg-blue-50 text-blue-600'
    case FeeStatus.OVERDUE:
    case 'OVERDUE':
      return 'bg-red-50 text-red-600'
    default:
      return 'bg-orange-50 text-orange-600'
  }
}
