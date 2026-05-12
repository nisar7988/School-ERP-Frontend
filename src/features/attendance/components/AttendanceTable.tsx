import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, CheckCircle2, XCircle, Clock, Info } from 'lucide-react'
import type { AttendanceWithStudent } from '../types'
import { AttendanceStatus } from '../types'

interface AttendanceTableProps {
  records: AttendanceWithStudent[]
  onEdit?: (record: AttendanceWithStudent) => void
  onDelete?: (id: string) => void
  isAdmin?: boolean
  showStudent?: boolean
  showActions?: boolean
}

export function AttendanceTable({
  records,
  onEdit: _onEdit,
  onDelete: _onDelete,
  isAdmin: _isAdmin,
  showStudent = true,
  showActions: _showActions = true,
}: AttendanceTableProps) {
  const getStatusConfig = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return {
          label: 'Present',
          color: 'bg-green-50 text-green-600 border-green-100',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        }
      case AttendanceStatus.ABSENT:
        return {
          label: 'Absent',
          color: 'bg-red-50 text-red-600 border-red-100',
          icon: <XCircle className="w-3.5 h-3.5" />,
        }
      case AttendanceStatus.LATE:
        return {
          label: 'Late',
          color: 'bg-amber-50 text-amber-600 border-amber-100',
          icon: <Clock className="w-3.5 h-3.5" />,
        }
      case AttendanceStatus.EXCUSED:
        return {
          label: 'Excused',
          color: 'bg-blue-50 text-blue-600 border-blue-100',
          icon: <Info className="w-3.5 h-3.5" />,
        }
      default:
        return {
          label: status,
          color: 'bg-gray-50 text-gray-600 border-gray-100',
          icon: null,
        }
    }
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#fef9f6]">
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em]">
                Date
              </th>
              {showStudent && (
                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em]">
                  Student
                </th>
              )}
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em]">
                Subject
              </th>
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em]">
                Status
              </th>
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em]">
                Remarks
              </th>
              <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em] text-right">
                
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {records.map((record) => {
              const status = getStatusConfig(record.status)
              return (
                <tr key={record.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                  <td className="px-8 py-6 text-gray-900 font-bold">
                    {new Date(record.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  {showStudent && (
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-peach flex items-center justify-center text-brand-orange font-bold text-sm">
                          {record.student?.user?.firstName?.[0] || '?'}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            {record.student?.user?.firstName} {record.student?.user?.lastName}
                          </div>
                          <div className="text-[10px] text-gray-400 font-black uppercase tracking-wider">
                            ID: {record.student?.admissionNo || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="px-8 py-6 text-gray-600 font-bold">
                    {(record as any).class?.name || (record as any).subject?.name || 'Academic Session'}
                  </td>
                  <td className="px-8 py-6">
                    <Badge
                      variant="outline"
                      className={`${status.color} font-bold px-3 py-1.5 rounded-xl border-none flex items-center gap-1.5 w-fit shadow-sm`}
                    >
                      {status.icon}
                      {status.label}
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-gray-400 text-sm italic font-medium max-w-xs truncate">
                    {record.remarks || '—'}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl hover:bg-gray-100 text-gray-400 transition-all"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {records.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 italic">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
             <Info className="w-8 h-8 opacity-20" />
          </div>
          No attendance records found.
        </div>
      )}
    </div>
  )
}
