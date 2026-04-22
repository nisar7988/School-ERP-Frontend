import {
  ArrowLeft,
  Users,
  BookOpen,
  User,
  Calendar,
  Plus,
  Trash2,
  Edit2,
} from 'lucide-react'
import { Link, useParams } from '@tanstack/react-router'
import { useClass } from '../queries/useClass'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatsCard } from '@/features/dashboard/components/StatsCard'
import { ClassRole } from '../types'

export function ClassDetailsPage() {
  const { id } = useParams({ from: '/_admin/classes/$id' })
  const { data: cls, isLoading, error } = useClass(id)

  if (isLoading) {
    return (
      <div className="p-10 text-center font-bold text-gray-500 animate-pulse">
        Loading class details...
      </div>
    )
  }

  if (error || !cls) {
    return (
      <div className="p-10 text-center font-bold text-red-500">
        Class not found.
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Classes
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-brand-peach flex items-center justify-center text-brand-orange text-3xl shadow-lg font-black italic">
              {cls.name?.[0] || 'C'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  {cls.name}
                </h1>
                <Badge variant="brand" className="h-6">
                  Section {cls.section}
                </Badge>
              </div>
              <p className="text-gray-500 font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />
                {cls.staff?.find((s) => s.role === ClassRole.INCHARGE)?.teacher
                  ? `Class Teacher: ${cls.staff.find((s) => s.role === ClassRole.INCHARGE)?.teacher?.user.firstName} ${cls.staff.find((s) => s.role === ClassRole.INCHARGE)?.teacher?.user.lastName}`
                  : 'No Class Teacher Assigned'}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/classes/$id/edit" params={{ id }}>
              <Button variant="outline" className="gap-2 rounded-xl font-bold">
                <Edit2 className="w-4 h-4" /> Edit Class
              </Button>
            </Link>
            <Button
              variant="destructive"
              className="gap-2 rounded-xl font-bold"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          label="Total Students"
          value={cls.students?.length.toString() || '0'}
          icon={Users}
          trend="Enrolled"
        />
        <StatsCard
          label="Subjects"
          value={cls.subjects?.length.toString() || '0'}
          icon={BookOpen}
          trend="Curriculum"
        />
        <StatsCard
          label="Created On"
          value={new Date(cls.createdAt).toLocaleDateString()}
          icon={Calendar}
          trend="Date"
        />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Students List */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="rounded-[2.5rem] border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-50 p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-orange" /> Students in this
                Class
              </CardTitle>
              <Button
                size="sm"
                variant="ghost"
                className="font-bold text-brand-orange"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-left">
                <thead className="bg-gray-50/30 text-xs font-bold text-gray-400 uppercase">
                  <tr>
                    <th className="px-8 py-4">Name</th>
                    <th className="px-8 py-4">Admission No</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cls.students?.map((student) => (
                    <tr key={student.id} className="group hover:bg-gray-50/50">
                      <td className="px-8 py-4">
                        <div className="font-bold text-gray-900">
                          {student.user.firstName} {student.user.lastName}
                        </div>
                      </td>
                      <td className="px-8 py-4 font-mono text-sm text-gray-500">
                        {student.admissionNo}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <Link to="/students/$id" params={{ id: student.id }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {(cls.students?.length || 0) === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-8 py-10 text-center text-gray-400 italic"
                      >
                        No students enrolled in this class yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Subjects */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-50 p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-orange" /> Subjects
              </CardTitle>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-brand-orange rounded-full bg-brand-peach"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              {cls.subjects?.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-brand-peach hover:bg-white transition-all group"
                >
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                      {subject.name}
                    </p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                      {subject.code}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    Core
                  </Badge>
                </div>
              ))}
              {(cls.subjects?.length || 0) === 0 && (
                <p className="text-center text-gray-400 italic">
                  No subjects assigned.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Class Staff */}
          <Card className="rounded-[2.5rem] border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-50 p-8">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-brand-orange" /> Class Staff
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-4">
              {cls.staff?.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-brand-peach hover:bg-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-peach/30 flex items-center justify-center text-brand-orange font-bold text-sm">
                      {assignment.teacher?.user.firstName?.[0]}
                      {assignment.teacher?.user.lastName?.[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-brand-orange transition-colors">
                        {assignment.teacher?.user.firstName} {assignment.teacher?.user.lastName}
                      </p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                        {assignment.role.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={assignment.role === ClassRole.INCHARGE ? 'brand' : 'outline'} 
                    className="h-6"
                  >
                    {assignment.role === ClassRole.INCHARGE ? 'In-charge' : 'Staff'}
                  </Badge>
                </div>
              ))}
              {(cls.staff?.length || 0) === 0 && (
                <p className="text-center text-gray-400 italic">
                  No staff members assigned.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
