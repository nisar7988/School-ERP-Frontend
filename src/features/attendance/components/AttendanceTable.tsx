import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, User } from 'lucide-react'
import type { AttendanceWithStudent } from '../types'
import { AttendanceStatus } from '../types'

interface AttendanceTableProps {
  records: AttendanceWithStudent[]
  onEdit: (record: AttendanceWithStudent) => void
  onDelete: (id: string) => void
  isAdmin?: boolean
}

export function AttendanceTable({ records, onEdit, onDelete, isAdmin }: AttendanceTableProps) {
  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return 'bg-green-50 text-green-600 border-green-100'
      case AttendanceStatus.ABSENT:
        return 'bg-red-50 text-red-600 border-red-100'
      case AttendanceStatus.LATE:
        return 'bg-amber-50 text-amber-600 border-amber-100'
      case AttendanceStatus.EXCUSED:
        return 'bg-blue-50 text-blue-600 border-blue-100'
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100'
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/30">
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Remarks
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {records.map((record) => (
              <tr key={record.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-peach/30 flex items-center justify-center text-brand-orange font-bold">
                      {record.student?.user?.firstName?.[0] || '?'}
                      {record.student?.user?.lastName?.[0] || ''}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {record.student?.user?.firstName || 'Unknown'} {record.student?.user?.lastName || 'Student'}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">
                        ID: {record.student?.admissionNo || 'N/A'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-gray-600 font-medium">
                  {new Date(record.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-6 py-5">
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(record.status)} font-bold px-3 py-1 rounded-lg border-none`}
                  >
                    {record.status}
                  </Badge>
                </td>
                <td className="px-6 py-5 text-gray-500 text-sm italic max-w-xs truncate">
                  {record.remarks || 'No remarks'}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(record)}
                      className="h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(record.id)}
                      className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {records.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 italic">
          <User className="w-12 h-12 mb-4 opacity-20" />
          No attendance records found.
        </div>
      )}
    </div>
  )
}
