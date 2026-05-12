import { useState } from 'react'
import { useStudentFeesList } from '../api/queries'
import { useStudents } from '@/features/students/api/queries'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { Eye } from 'lucide-react'

import { FeeStatus } from '../types'

export function StudentFeesTab() {
  const { data: studentFees, isLoading } = useStudentFeesList()
  const { data: studentsResponse } = useStudents({ limit: 100 })
  const students = studentsResponse?.data || []

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

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 overflow-hidden">
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
                  className="py-6 text-center text-gray-400 font-bold"
                >
                  Loading student fees...
                </td>
              </tr>
            ) : studentFees?.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-6 text-center text-gray-400 font-bold"
                >
                  No student fees found.
                </td>
              </tr>
            ) : (
              studentFees?.map((fee: any) => (
                <tr
                  key={fee.id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-6">
                    <span className="font-bold text-gray-900">
                      {fee.student?.firstName} {fee.student?.lastName}
                    </span>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      ID: {fee.studentId.slice(0, 8)}
                    </span>
                  </td>
                  <td className="py-6">
                    <span className="text-sm font-bold text-gray-700">
                      {fee.feeStructure?.title ||
                        fee.feeStructureId.slice(0, 8)}
                    </span>
                  </td>
                  <td className="py-6">
                    <span className="font-black text-gray-900">
                      ${fee.amount}
                    </span>
                  </td>
                  <td className="py-6 text-sm font-bold text-gray-400">
                    {new Date(fee.dueDate).toLocaleDateString()}
                  </td>
                  <td className="py-6">
                    <Badge
                      variant="secondary"
                      className={`border-none font-bold ${
                        fee.status === 'PAID'
                          ? 'bg-green-50 text-green-600'
                          : fee.status === 'PARTIAL'
                            ? 'bg-blue-50 text-blue-600'
                            : fee.status === 'OVERDUE'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-orange-50 text-orange-600'
                      }`}
                    >
                      {fee.status}
                    </Badge>
                  </td>
                  <td className="py-6 text-right">
                    <Link to="/admin/students/$id" params={{ id: fee.studentId }}>
                      <Button
                        variant="ghost"
                        className="h-8 p-2 text-blue-500 hover:bg-blue-50 font-bold text-xs"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
