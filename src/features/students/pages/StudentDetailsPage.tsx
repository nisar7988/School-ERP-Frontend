import {
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  MapPin,
  School,
  FileText,
  Clock,
  CircleCheck,
  CreditCard,
  User,
} from 'lucide-react'
import { Link, useParams } from '@tanstack/react-router'
import { useStudent } from '../queries/useStudent'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatsCard } from '@/features/dashboard/components/StatsCard'
import { Button } from '#/components/ui/button'
import { useAuthStore } from '#/features/auth/store'
import { Role } from '#/features/auth/types'

export function StudentDetailsPage() {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === Role.ADMIN
  const isTeacher = user?.role === Role.TEACHER

  const { id } = useParams({ strict: false }) as { id: string }
  const { data: student, isLoading, error } = useStudent(id)

  if (isLoading) {
    return (
      <div className="p-10 text-center font-bold text-gray-500 animate-pulse">
        Loading profile...
      </div>
    )
  }

  if (error || !student) {
    return (
      <div className="p-10 text-center font-bold text-red-500">
        Student not found.
      </div>
    )
  }

  const attendanceRate =
    (student.attendance?.length || 0) > 0
      ? (
          (student.attendance?.filter((a) => a.status === 'PRESENT').length /
            student.attendance?.length) *
          100
        ).toFixed(1)
      : '0'

  const pendingFees =
    student.fees?.filter((f) => f.status === 'PENDING').length || 0

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          to={isAdmin ? '/students' : '/teacher/students'}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Students
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-[2rem] bg-brand-peach flex items-center justify-center text-brand-orange text-4xl shadow-lg font-black italic">
              {student.user?.firstName?.[0] || '?'}
              {student.user?.lastName?.[0] || '?'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  {student.user?.firstName || 'Unknown'}{' '}
                  {student.user?.lastName || 'Student'}
                </h1>
                <Badge variant="brand" className="h-6">
                  Active
                </Badge>
              </div>
              <p className="text-gray-500 font-semibold flex items-center gap-2">
                <School className="w-4 h-4" />{' '}
                {student.class?.name || 'No Class'} • Section{' '}
                {student.class?.section || 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <Badge
                variant="secondary"
                className="px-4 py-2 font-mono text-sm rounded-xl"
              >
                ADM: {student.admissionNo}
              </Badge>
              {student.rollNo && (
                <Badge
                  variant="outline"
                  className="px-4 py-2 font-mono text-sm rounded-xl"
                >
                  ROLL: {student.rollNo}
                </Badge>
              )}
            </div>
            {(isAdmin || isTeacher) && (
              <Link
                to={
                  isAdmin ? '/students/$id/edit' : '/teacher/students/$id/edit'
                }
                params={{ id: student.id }}
              >
                <Button
                  variant="brand"
                  className="gap-2 h-10 px-6 rounded-xl shadow-lg shadow-orange-100 font-bold"
                >
                  Edit Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          label="Attendance Rate"
          value={`${attendanceRate}%`}
          icon={CircleCheck}
          trend="Last 30 days"
        />
        <StatsCard
          label="Pending Fees"
          value={pendingFees.toString()}
          icon={CreditCard}
          trend="Records"
          isPositive={pendingFees === 0}
        />
        <StatsCard
          label="Active Subjects"
          value={student.class?.subjects?.length?.toString() || '0'}
          icon={FileText}
          trend="Enrolled"
        />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Personal Info & Attendance */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-50 p-8">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-brand-orange" /> Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Email
                    </p>
                    <p className="font-semibold text-gray-900">
                      {student.user?.email || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Phone
                    </p>
                    <p className="font-semibold text-gray-900">
                      {student.user?.phone || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Date of Birth
                    </p>
                    <p className="font-semibold text-gray-900">
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Address
                    </p>
                    <p className="font-semibold text-gray-900">
                      {student.address || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Join Date
                    </p>
                    <p className="font-semibold text-gray-900">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance List */}
          <Card className="rounded-[2.5rem] border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-50 p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-orange" /> Recent
                Attendance
              </CardTitle>
              <Button variant="link" className="font-bold">
                View History
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left">
                <thead className="bg-gray-50/30 text-xs font-bold text-gray-400 uppercase">
                  <tr>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {student.attendance?.slice(0, 5).map((record) => (
                    <tr key={record.id}>
                      <td className="px-8 py-4 font-semibold text-gray-700">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-4">
                        <Badge
                          variant={
                            record.status === 'PRESENT'
                              ? 'success'
                              : record.status === 'ABSENT'
                                ? 'warning'
                                : 'outline'
                          }
                        >
                          {record.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-4 text-sm text-gray-500 italic">
                        {record.remarks || '-'}
                      </td>
                    </tr>
                  ))}
                  {(student.attendance?.length || 0) === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-8 py-10 text-center text-gray-400 italic font-semibold"
                      >
                        No attendance records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Family & Fees */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-gray-100 shadow-sm overflow-hidden bg-brand-orange text-white">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <User className="w-5 h-5" /> Family Info
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-white/60 uppercase">
                    Father's Name
                  </p>
                  <p className="font-bold text-lg">
                    {student.fatherName || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/60 uppercase">
                    Mother's Name
                  </p>
                  <p className="font-bold text-lg">
                    {student.motherName || 'N/A'}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs font-bold text-white/60 uppercase italic">
                    Emergency Contact
                  </p>
                  <p className="font-bold text-xl">
                    {student.emergencyContact || 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-50 p-8">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-orange" /> Fee History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {student.fees?.slice(0, 3).map((fee) => (
                <div
                  key={fee.id}
                  className="flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 group-hover:text-brand-orange transition-colors cursor-pointer">
                      {fee.title}
                    </p>
                    <p className="text-xs text-gray-400 font-bold">
                      Due: {new Date(fee.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-black text-gray-900">${fee.amount}</p>
                    <Badge
                      variant={fee.status === 'PAID' ? 'success' : 'warning'}
                      className="text-[10px]"
                    >
                      {fee.status}
                    </Badge>
                  </div>
                </div>
              ))}
              {(student.fees?.length || 0) === 0 && (
                <p className="text-center text-gray-400 italic">
                  No fee records.
                </p>
              )}
              <Button
                variant="outline"
                className="w-full rounded-2xl font-bold h-12 shadow-sm border-gray-100 group"
              >
                Pay Outstanding Fees
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
