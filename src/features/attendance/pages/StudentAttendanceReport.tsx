import { useState } from 'react'
import { Calendar, Search, Filter } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { StudentAttendanceStats } from '../components/StudentAttendanceStats'
import { AttendanceTable } from '../components/AttendanceTable'
import { useStudentAttendance } from '../api/queries'
import { Pagination } from '@/components/ui/Pagination'
import { AttendanceStatus } from '../types'

interface StudentAttendanceReportProps {
  studentId: string
  studentName?: string
}

export function StudentAttendanceReport({
  studentId,
  studentName: _studentName,
}: StudentAttendanceReportProps) {
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<
    AttendanceStatus | undefined
  >()
  const [dateFilter, _setDateFilter] = useState<string>('')
  const [monthFilter, setMonthFilter] = useState<string>('')

  const { data: response, isLoading } = useStudentAttendance(studentId, {
    page,
    status: statusFilter,
    date: dateFilter || undefined,
    month: monthFilter || undefined,
  })

  console.log('student attenndence', response)

  const records = response?.data || []
  const meta = response?.meta
  const stats = response?.stats

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">
            Attendance Overview
          </h1>
          <p className="text-gray-500 font-bold text-lg leading-relaxed max-w-2xl">
            Detailed tracking of your academic presence and participation.
          </p>
        </div>
      </div>

      {stats && <StudentAttendanceStats stats={stats} />}

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
              <select
                className="h-14 pl-12 pr-10 rounded-[1.5rem] border-none bg-brand-peach/30 hover:bg-brand-peach/50 focus:ring-2 focus:ring-brand-orange/20 appearance-none font-bold text-gray-600 outline-none transition-all cursor-pointer min-w-[180px]"
                value={statusFilter || ''}
                onChange={(e) => {
                  setStatusFilter(
                    (e.target.value as AttendanceStatus) || undefined,
                  )
                  setPage(1)
                }}
              >
                <option value="">All Subjects</option>
                {/* We use status filter for subjects for now as a placeholder in UI if subjects aren't separate */}
                {Object.values(AttendanceStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative group">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
              <Input
                type="month"
                className="h-14 pl-12 pr-6 rounded-[1.5rem] border-none bg-brand-peach/30 hover:bg-brand-peach/50 focus:ring-2 focus:ring-brand-orange/20 font-bold text-gray-600 outline-none transition-all min-w-[180px]"
                value={monthFilter}
                onChange={(e) => {
                  setMonthFilter(e.target.value)
                  setPage(1)
                }}
              />
            </div>
          </div>

          <div className="relative group flex-1 max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
            <Input
              type="text"
              placeholder="Search by date or remark..."
              className="h-14 pl-12 pr-6 rounded-[1.5rem] border-none bg-brand-peach/30 hover:bg-brand-peach/50 focus:ring-2 focus:ring-brand-orange/20 font-bold text-gray-600 outline-none transition-all w-full"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-40">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-brand-orange/10 border-t-brand-orange rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-brand-peach rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <AttendanceTable
              records={records as any}
              showStudent={false}
              showActions={false}
              isAdmin={false}
            />

            <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="text-sm font-black text-gray-400 uppercase tracking-widest">
                Showing {records.length} of {meta?.total || 0} entries
              </div>
              {meta && meta.lastPage > 1 && (
                <Pagination
                  currentPage={meta.page}
                  lastPage={meta.lastPage}
                  total={meta.total}
                  limit={meta.limit}
                  onPageChange={setPage}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
