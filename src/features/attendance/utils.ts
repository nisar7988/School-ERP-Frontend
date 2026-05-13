import { AttendanceStatus } from '../types'
import { CheckCircle2, XCircle, Clock, Info } from 'lucide-react'
import React from 'react'

/**
 * Returns configuration for attendance status badges
 */
export const getAttendanceStatusConfig = (status: AttendanceStatus | string) => {
  switch (status) {
    case AttendanceStatus.PRESENT:
    case 'PRESENT':
      return {
        label: 'Present',
        color: 'bg-green-50 text-green-600 border-green-100',
        icon: React.createElement(CheckCircle2, { className: 'w-3.5 h-3.5' }),
      }
    case AttendanceStatus.ABSENT:
    case 'ABSENT':
      return {
        label: 'Absent',
        color: 'bg-red-50 text-red-600 border-red-100',
        icon: React.createElement(XCircle, { className: 'w-3.5 h-3.5' }),
      }
    case AttendanceStatus.LATE:
    case 'LATE':
      return {
        label: 'Late',
        color: 'bg-amber-50 text-amber-600 border-amber-100',
        icon: React.createElement(Clock, { className: 'w-3.5 h-3.5' }),
      }
    case AttendanceStatus.EXCUSED:
    case 'EXCUSED':
      return {
        label: 'Excused',
        color: 'bg-blue-50 text-blue-600 border-blue-100',
        icon: React.createElement(Info, { className: 'w-3.5 h-3.5' }),
      }
    default:
      return {
        label: status,
        color: 'bg-gray-50 text-gray-600 border-gray-100',
        icon: null,
      }
  }
}
