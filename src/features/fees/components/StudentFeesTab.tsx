import { useState, useEffect } from 'react'
import { useStudentFeesList } from '../api/queries'
import { getFeeStatusColor } from '../utils/fee-utils'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { Eye, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/Pagination'
import { useClasses } from '@/features/classes/api/queries'

export function StudentFeesTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const [classId, setClassId] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const { data: response, isLoading } = useStudentFeesList({
    search: debouncedSearch,
    page,
    classId,
  })
  const { data: classesResponse } = useClasses()

  const classes = classesResponse?.data || []

  const studentFees = response?.data || []
  const meta = response?.meta

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Fees</h2>
          <p className="text-gray-500 font-semibold">
            Track student fee payments and dues
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
          <Input
            placeholder="Search students by name or admission number..."
            className="pl-12 h-14 rounded-2xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 font-sans"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="h-14 bg-white px-6 rounded-2xl border-gray-100 bg-white shadow-sm focus:ring-brand-orange/10 font-sans outline-none cursor-pointer hover:bg-gray-50 transition-colors"
          value={classId}
          onChange={(e) => {
            setClassId(e.target.value)
            setPage(1)
          }}
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name} - {cls.section}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-50">
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Student
                </th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Fee Type
                </th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Amount
                </th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Due Date
                </th>
                <th className="pb-4 font-black text-gray-400 text-[10px] tracking-widest uppercase">
                  Status
                </th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-gray-400 font-bold"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
                      Loading student fees...
                    </div>
                  </td>
                </tr>
              ) : studentFees?.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-gray-400 font-bold italic"
                  >
                    No student fees found matching your search.
                  </td>
                </tr>
              ) : (
                studentFees.map((fee) => (
                  <tr
                    key={fee.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-6">
                      <span className="font-bold text-gray-900 block">
                        {fee.student?.user?.firstName}{' '}
                        {fee.student?.user?.lastName}
                      </span>
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                        {fee.student?.admissionNo || 'N/A'}
                      </span>
                    </td>
                    <td className="py-6">
                      <span className="text-sm font-bold text-gray-700">
                        {fee.feeStructure?.title || 'Fee'}
                      </span>
                    </td>
                    <td className="py-6">
                      <span className="font-black text-gray-900">
                        ${fee.amount}
                      </span>
                    </td>
                    <td className="py-6 text-sm font-bold text-gray-400 italic">
                      {new Date(fee.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-6">
                      <Badge
                        variant="secondary"
                        className={`border-none font-bold ${getFeeStatusColor(fee.status)}`}
                      >
                        {fee.status}
                      </Badge>
                    </td>
                    <td className="py-6 text-right">
                      <Link to="/students/$id" params={{ id: fee.studentId }}>
                        <Button
                          variant="ghost"
                          className="h-10 rounded-xl text-brand-orange hover:bg-brand-orange/5 font-bold text-xs gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Profile
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {meta && meta.lastPage > 1 && (
          <div className="mt-8 pt-8 border-t border-gray-50">
            <Pagination
              currentPage={meta.page}
              lastPage={meta.lastPage}
              total={meta.total}
              limit={meta.limit}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}
