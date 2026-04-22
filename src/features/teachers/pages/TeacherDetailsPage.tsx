import React from 'react'
import { useParams, Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  School,
  Calendar,
  Edit2,
  Trash2,
  BadgeCheck,
  MapPin,
  Fingerprint,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useTeacher, useTeacherMutations } from '../hooks/useTeacherMutations'
import { StatsCard } from '@/features/dashboard/components/StatsCard'

export function TeacherDetailsPage() {
  const { id } = useParams({ from: '/_admin/faculty/$id' })
  const { data: teacherResponse, isLoading, error } = useTeacher(id)
  const { deleteTeacher } = useTeacherMutations()

  const teacher = teacherResponse?.data

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4 animate-pulse">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div className="h-4 w-32 bg-gray-100 rounded" />
      </div>
    )
  }

  if (error || !teacher) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6 text-center bg-gray-50 rounded-[2.5rem] border border-gray-100 p-8">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
          <GraduationCap className="w-10 h-10 text-gray-300" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
            Faculty Member Not Found
          </h2>
          <p className="text-gray-500 font-semibold italic">
            This member may have been offboarded or the ID is incorrect.
          </p>
        </div>
        <Link to="/faculty">
          <Button
            variant="outline"
            className="rounded-2xl h-12 px-8 font-bold border-gray-200"
          >
            Back to Faculty
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Breadcrumbs and Actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/faculty"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-gray-400 hover:text-brand-orange transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Faculty Management
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/faculty/$id/edit" params={{ id: teacher.id }}>
            <Button
              variant="outline"
              className="h-11 rounded-xl px-5 font-bold border-gray-200 hover:border-blue-200 hover:text-blue-600 gap-2"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="h-11 rounded-xl px-5 font-bold hover:bg-red-50 hover:text-red-600 gap-2"
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to offboard this faculty member?',
                )
              ) {
                deleteTeacher.mutate(id)
              }
            }}
          >
            <Trash2 className="w-4 h-4" /> Offboard
          </Button>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-[3rem] border border-gray-100 p-12 shadow-2xl shadow-orange-50/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full -mr-48 -mt-48 blur-3xl" />

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 relative z-10">
          <div className="relative">
            <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-br from-brand-peach to-white border-[6px] border-white shadow-2xl flex items-center justify-center text-brand-orange text-5xl font-black group-hover:scale-105 transition-transform duration-500">
              {teacher.user.firstName[0]}
              {teacher.user.lastName[0]}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-2xl shadow-lg border-4 border-white">
              <BadgeCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <h1 className="text-5xl font-black text-gray-900 tracking-tight">
                  {teacher.user.firstName} {teacher.user.lastName}
                </h1>
                <Badge className="bg-brand-orange text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest pointer-events-none">
                  Active Faculty
                </Badge>
              </div>
              <p className="text-xl text-gray-500 font-semibold italic flex items-center justify-center lg:justify-start gap-2">
                <GraduationCap className="w-5 h-5 text-brand-orange" />
                {teacher.qualification}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl mx-auto lg:mx-0">
              <div className="flex items-center gap-3 text-gray-600 font-bold">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-sm">{teacher.user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-bold">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-sm">
                  {teacher.user.phone || 'No phone set'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 font-bold">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-sm font-mono tracking-wider">
                  {teacher.employeeId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Grid Sections */}
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left: Academic Assignments */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-brand-orange" />
              Teaching Schedule
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teacher.subjects?.map((subject) => (
                <div
                  key={subject.id}
                  className="p-6 rounded-3xl bg-gray-50/50 border border-transparent hover:border-brand-peach hover:bg-white hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 group/item"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-orange bg-brand-peach/40 px-3 py-1 rounded-full">
                      {subject.code}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-gray-900 mb-1 group-hover/item:text-brand-orange transition-colors">
                    {subject.name}
                  </h4>
                  <p className="text-sm text-gray-500 font-bold flex items-center gap-2">
                    <School className="w-4 h-4" />
                    Standard Level: High School
                  </p>
                </div>
              ))}
              {teacher.subjects?.length === 0 && (
                <div className="col-span-2 py-12 text-center text-gray-400 italic bg-gray-50/30 rounded-3xl border border-dashed border-gray-200">
                  No subjects assigned to this member yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Leadership & History */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {teacher.classTeacherOf && (
            <div className="bg-brand-orange rounded-[2.5rem] p-8 text-white shadow-2xl shadow-orange-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <BadgeCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-orange-100">
                    Class In-Charge
                  </p>
                  <h4 className="text-3xl font-black">
                    {teacher.classTeacherOf.name}
                  </h4>
                  <p className="text-sm font-bold text-orange-200 italic mt-1 pb-4 border-b border-white/10">
                    Section {teacher.classTeacherOf.section}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 hover:bg-white/10 text-white font-bold p-0"
                >
                  Manage Class Dashboard{' '}
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              Activity Log
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-px h-12 bg-gray-100 relative mt-2">
                  <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-brand-orange shadow-sm shadow-orange-100" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black text-gray-400 tracking-tighter">
                    OCT 12, 2024
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    Onboarded as Senior Faculty
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-px h-12 bg-gray-100 relative mt-2">
                  <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-gray-300" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black text-gray-400 tracking-tighter">
                    OCT 15, 2024
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    Assigned Primary 5 Math
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
