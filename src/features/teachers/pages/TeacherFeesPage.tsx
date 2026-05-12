import { useState } from 'react'
import { useClassesByTeacher } from '@/features/classes/api/queries'
import {
  useFeeStructureByClass,
  usePendingFeesByClass,
} from '@/features/fees/api/queries'
import { useStudents } from '@/features/students/api/queries'
import { useAuthStore } from '@/features/auth/store'
import {
  DollarSign,
  AlertCircle,
  Clock,
  CheckCircle2,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export function TeacherFeesPage() {
  const { user } = useAuthStore()
  const { data: classesResponse, isLoading: isLoadingClasses } =
    useClassesByTeacher(user?.teacherProfile?.id, { limit: 100 })
  const classes = classesResponse?.data || []

  const [selectedClassId, setSelectedClassId] = useState<string>('')
  const [activeTab, setActiveTab] = useState<
    'overview' | 'pending' | 'students'
  >('overview')

  const { data: structures = [], isLoading: isLoadingStructure } =
    useFeeStructureByClass(selectedClassId)
  const { data: pendingFees = [], isLoading: isLoadingPending } =
    usePendingFeesByClass(selectedClassId)
  const { data: studentsResponse, isLoading: isLoadingStudents } = useStudents(
    { classId: selectedClassId, limit: 100 },
    { enabled: !!selectedClassId },
  )

  const students = studentsResponse?.data || []

  const totalStudents = students.length
  const pendingCount = pendingFees.length
  const paidCount = totalStudents - pendingCount // Approximate
  const totalPendingAmount = pendingFees.reduce(
    (sum: number, fee: any) =>
      sum + (Number(fee.amount) - Number(fee.paidAmount)),
    0,
  )

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <DollarSign className="w-10 h-10 text-brand-orange" />
            Class Fees Overview
          </h1>
          <p className="text-gray-500 font-semibold italic">
            Monitor fee structures, pending payments, and student financial
            standing for your classes.
          </p>
        </div>

        <div>
          <select
            className="h-14 rounded-2xl border-gray-100 bg-white px-6 text-sm font-bold focus:bg-white transition-all outline-none border shadow-sm w-64"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            disabled={isLoadingClasses}
          >
            <option value="">Select a class to view fees</option>
            {classes.map((cls: any) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} - {cls.section}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!selectedClassId ? (
        <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <DollarSign className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Select a Class
          </h2>
          <p className="text-gray-400 font-semibold max-w-md">
            Please select a class from the dropdown menu above to view its fee
            structure and monitor student payments.
          </p>
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-6 h-14 bg-white border border-gray-100 p-1 rounded-2xl w-fit shadow-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`rounded-xl px-6 font-bold text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`rounded-xl px-6 font-bold text-sm transition-colors ${
                activeTab === 'pending'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Pending Dues
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`rounded-xl px-6 font-bold text-sm transition-colors ${
                activeTab === 'students'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              All Students
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Total Students
                  </span>
                  <div className="text-3xl font-black text-gray-900 mt-1">
                    {totalStudents}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Fully Paid
                  </span>
                  <div className="text-3xl font-black text-gray-900 mt-1">
                    {paidCount > 0 ? paidCount : 0}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Pending Students
                  </span>
                  <div className="text-3xl font-black text-gray-900 mt-1">
                    {pendingCount}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Total Pending
                  </span>
                  <div className="text-3xl font-black text-gray-900 mt-1">
                    ${totalPendingAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Fee Structure Summary */}
              <div className="lg:col-span-4 bg-brand-orange/5 rounded-[2.5rem] p-8 border border-brand-orange/10 relative overflow-hidden mt-2">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-orange/10 blur-[80px] rounded-full" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Current Fee Structures
                      </h2>
                      {!isLoadingStructure && Array.isArray(structures) && structures.length > 0 && (
                        <div className="bg-brand-orange text-white px-4 py-2 rounded-xl font-black text-lg shadow-sm shadow-brand-orange/20">
                          Total: ${structures.reduce((sum: number, s: any) => sum + Number(s.amount), 0).toLocaleString()}
                        </div>
                      )}
                    </div>
                    {isLoadingStructure ? (
                      <div className="flex gap-4">
                        <Skeleton className="h-24 w-48 bg-brand-orange/20 rounded-2xl" />
                        <Skeleton className="h-24 w-48 bg-brand-orange/20 rounded-2xl" />
                      </div>
                    ) : Array.isArray(structures) && structures.length > 0 ? (
                      <div className="flex flex-wrap gap-4">
                        {structures.map((s: any) => (
                          <div key={s.id} className="bg-white/80 backdrop-blur-md border border-brand-orange/20 rounded-2xl p-5 min-w-[200px] shadow-sm">
                            <div className="flex justify-between items-start mb-2 gap-4">
                              <div className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em] break-words">
                                {s.title}
                              </div>
                              {s.mandatory && (
                                <Badge className="bg-brand-orange text-white border-none font-bold text-[8px] py-0 px-2 h-4 shrink-0 shadow-sm shadow-brand-orange/20">
                                  Mandatory
                                </Badge>
                              )}
                            </div>
                            <div className="text-3xl font-bold tracking-tighter text-gray-900">
                              ${s.amount}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 font-semibold">
                        No fee structures found for this class.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pending' && (
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-brand-orange" />
                  Pending Student Payments
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-left">
                        Student
                      </th>
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-left">
                        Fee Type
                      </th>
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-center">
                        Amount Due
                      </th>
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-center">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {isLoadingPending ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-gray-400 font-bold"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : pendingFees.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-12 text-center">
                          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <DollarSign className="w-8 h-8 text-green-500" />
                          </div>
                          <p className="text-gray-900 font-bold">
                            All caught up!
                          </p>
                          <p className="text-gray-400 font-semibold text-sm">
                            No pending fees for this class.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      pendingFees.map((fee: any) => (
                        <tr
                          key={fee.id}
                          className="group hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-4">
                            <div className="font-bold text-gray-900">
                              {fee.student?.firstName} {fee.student?.lastName}
                            </div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                              ID: {fee.studentId?.slice(0, 8) || 'N/A'}
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="font-semibold text-gray-700">
                              {fee.feeStructure?.title || 'Fee'}
                            </div>
                            <Badge
                              variant="secondary"
                              className={`mt-1 text-[10px] ${fee.status === 'OVERDUE' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}
                            >
                              {fee.status}
                            </Badge>
                          </td>
                          <td className="py-4 text-center">
                            <span className="text-base font-bold text-gray-900">
                              ${Number(fee.amount) - Number(fee.paidAmount)}
                            </span>
                          </td>
                          <td className="py-4 text-center text-sm font-semibold text-gray-400">
                            {new Date(fee.dueDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-orange" />
                  Class Roster & Fee Status
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-left">
                        Student Name
                      </th>
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-left">
                        Roll No
                      </th>
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-center">
                        Contact
                      </th>
                      <th className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-4 text-center">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {isLoadingStudents ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-gray-400 font-bold"
                        >
                          Loading students...
                        </td>
                      </tr>
                    ) : students.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-12 text-center text-gray-400 font-bold"
                        >
                          No students found in this class.
                        </td>
                      </tr>
                    ) : (
                      students.map((student: any) => {
                        const hasPending = pendingFees.some(
                          (f: any) => f.studentId === student.id,
                        )
                        return (
                          <tr
                            key={student.id}
                            className="group hover:bg-gray-50/50 transition-colors"
                          >
                            <td className="py-4">
                              <div className="font-bold text-gray-900">
                                {student.user.firstName} {student.user.lastName}
                              </div>
                              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                ID: {student.id?.slice(0, 8) || 'N/A'}
                              </div>
                            </td>
                            <td className="py-4 font-semibold text-gray-700">
                              {student.rollNo || 'N/A'}
                            </td>
                            <td className="py-4 text-center text-sm font-semibold text-gray-500">
                              {student.user.email || 'No email'}
                            </td>
                            <td className="py-4 text-center">
                              {hasPending ? (
                                <Badge
                                  variant="secondary"
                                  className="bg-orange-50 text-orange-600 text-[10px]"
                                >
                                  Pending Dues
                                </Badge>
                              ) : (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-50 text-green-600 text-[10px]"
                                >
                                  Paid / No Dues
                                </Badge>
                              )}
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
