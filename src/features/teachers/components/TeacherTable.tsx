import React, { useState } from 'react'
import {
  Eye,
  Edit2,
  Trash2,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Fingerprint,
  School
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import type { TeacherWithRelations } from '../types'
import { useTeacherMutations } from '../hooks/useTeacherMutations'
import { Dialog } from '@/components/ui/Dialog'

interface TeacherTableProps {
  teachers: TeacherWithRelations[]
}

export function TeacherTable({ teachers }: TeacherTableProps) {
  const { deleteTeacher } = useTeacherMutations()

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean
    id: string
    name: string
  }>({
    isOpen: false,
    id: '',
    name: '',
  })

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteDialog({ isOpen: true, id, name })
  }

  const handleConfirmDelete = () => {
    deleteTeacher.mutate(deleteDialog.id, {
      onSuccess: () => {
        setDeleteDialog({ ...deleteDialog, isOpen: false })
      }
    })
  }

  return (
    <>
      <div className="overflow-hidden bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-orange-50/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Faculty Member
              </th>
              <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Employee ID
              </th>
              <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Qualification
              </th>
              <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
                Assigned Classes
              </th>
              <th className="px-8 py-6 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {teachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="hover:bg-gray-50/30 transition-all group"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-peach to-white border border-brand-orange/20 flex items-center justify-center text-brand-orange font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
                      {teacher.user.firstName[0]}
                      {teacher.user.lastName[0]}
                    </div>
                    <div>
                      <div className="font-extrabold text-gray-900 group-hover:text-brand-orange transition-colors">
                        {teacher.user.firstName} {teacher.user.lastName}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5 font-medium mt-1">
                        <Mail className="w-3.5 h-3.5 text-gray-400" /> {teacher.user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-brand-orange/40" />
                    <Badge variant="outline" className="font-mono bg-white border-gray-200 text-gray-600 px-3 py-1 rounded-lg">
                      {teacher.employeeId}
                    </Badge>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-gray-700 text-sm">
                      {teacher.qualification}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                    {teacher.classTeacherOf ? (
                      <div className="flex items-center gap-2 text-brand-orange font-bold">
                        <School className="w-4 h-4" />
                        <span>{teacher.classTeacherOf.name} - {teacher.classTeacherOf.section}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400 font-medium italic">
                        <School className="w-4 h-4 opacity-40" />
                        <span>No Class Assigned</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                        {teacher.subjects?.length || 0} Subjects
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <Link to="/faculty/$id" params={{ id: teacher.id }}>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-brand-peach hover:text-brand-orange">
                        <Eye className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/faculty/$id/edit" params={{ id: teacher.id }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
                      onClick={() =>
                        handleDeleteClick(
                          teacher.id,
                          `${teacher.user.firstName} ${teacher.user.lastName}`,
                        )
                      }
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-32 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                       <GraduationCap className="w-10 h-10 text-gray-200" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-extrabold text-xl text-gray-900">No Faculty Found</p>
                      <p className="text-gray-500 font-semibold italic">
                        Start by onboarding your first educator to The Atelier.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ ...deleteDialog, isOpen: false })}
        title="Offboard Faculty"
        message={`Are you sure you want to offboard ${deleteDialog.name}? This will remove them from all assigned classes and subjects.`}
        onConfirm={handleConfirmDelete}
        confirmText="Offboard Member"
        variant="danger"
      />
    </>
  )
}
