import React, { useState } from 'react'
import {
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Calendar,
  School,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import type { StudentWithRelations } from '../types'
import { useDeleteStudent } from '../hooks/useStudentMutations'
import { Dialog } from '@/components/ui/Dialog'

import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'

interface StudentTableProps {
  students: StudentWithRelations[]
}

export function StudentTable({ students }: StudentTableProps) {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === Role.ADMIN
  const { mutate: deleteStudent } = useDeleteStudent()

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
    deleteStudent(deleteDialog.id)
  }

  if (!students) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No students found</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm animate-in fade-in duration-500">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Admission/Roll
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-peach/30 flex items-center justify-center text-brand-orange font-bold text-sm">
                      {student.user.firstName[0]}
                      {student.user.lastName[0]}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {student.user.firstName} {student.user.lastName}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {student.user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <Badge variant="secondary" className="font-mono">
                      {student.admissionNo}
                    </Badge>
                    {student.rollNo && (
                      <div className="text-xs text-gray-400 font-mono pl-1">
                        Roll: {student.rollNo}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <School className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-700">
                      {student?.class?.name} - {student?.class?.section}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs space-y-1 text-gray-600">
                    {student.user.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />{' '}
                        {student.user.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" /> Born{' '}
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      to={isAdmin ? '/students/$id' : '/teacher/students/$id'} 
                      params={{ id: student.id }}
                    >
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-brand-peach/20 hover:text-brand-orange">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    {(isAdmin || (user?.role === Role.TEACHER)) && (
                      <Link 
                        to={isAdmin ? '/students/$id/edit' : '/teacher/students/$id/edit'} 
                        params={{ id: student.id }}
                      >
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                        onClick={() =>
                          handleDeleteClick(
                            student.id,
                            `${student.user.firstName} ${student.user.lastName}`,
                          )
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-20 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <School className="w-12 h-12 text-gray-200" />
                    <p className="font-semibold">No students found</p>
                    <p className="text-sm">
                      Start by adding your first student to the atelier.
                    </p>
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
        title="Delete Student"
        message={`Are you sure you want to delete ${deleteDialog.name}? This action cannot be undone and will remove all associated records.`}
        onConfirm={handleConfirmDelete}
        confirmText="Delete Student"
        variant="danger"
      />
    </>
  )
}
