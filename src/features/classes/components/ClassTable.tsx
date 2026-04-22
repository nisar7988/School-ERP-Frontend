import { useState } from 'react'
import {
  Eye,
  Edit2,
  Trash2,
  Users,
  BookOpen,
  ClipboardCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ClassRole,
  type SchoolClass,
  type SchoolClassWithRelations,
} from '../types'
import { Link } from '@tanstack/react-router'
import { useDeleteClass } from '../hooks/useClassMutations'
import { Dialog } from '@/components/ui/Dialog'
import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'

interface ClassTableProps {
  classes: SchoolClassWithRelations[]
}

export function ClassTable({ classes }: ClassTableProps) {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === Role.ADMIN
  const { mutate: deleteClass } = useDeleteClass()
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      deleteClass(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Class Name
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Section
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Teacher
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {classes.map((cls: SchoolClassWithRelations) => (
              <tr
                key={cls.id}
                className="group hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-5">
                  <div className="font-bold text-gray-900 group-hover:text-brand-orange transition-colors font-sans">
                    {cls.name}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <Badge
                    variant="outline"
                    className="bg-white text-gray-600 border-gray-200 font-sans"
                  >
                    {cls.section}
                  </Badge>
                </td>
                <td className="px-6 py-5 text-gray-600 font-medium italic font-sans">
                  {cls.staff?.find((s) => s.role === ClassRole.INCHARGE)
                    ?.teacher ? (
                    `${cls.staff.find((s) => s.role === ClassRole.INCHARGE)?.teacher?.user.firstName} ${cls.staff.find((s) => s.role === ClassRole.INCHARGE)?.teacher?.user.lastName}`
                  ) : (
                    <span className="text-gray-400 italic font-sans">
                      Not Assigned
                    </span>
                  )}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-gray-600 font-bold font-sans">
                    <Users className="w-4 h-4 text-brand-orange/60" />
                    {cls.students?.length || 0}
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to="/teacher/attendance" search={{ classId: cls.id }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all"
                        title="Take Attendance"
                      >
                        <ClipboardCheck className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/classes/$id" params={{ id: cls.id }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-brand-peach hover:text-brand-orange transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    {isAdmin && (
                      <>
                        <Link to="/classes/$id/edit" params={{ id: cls.id }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(cls.id)}
                          className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {classes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 italic">
          <BookOpen className="w-12 h-12 mb-4 opacity-20" />
          No classes found. Add one to get started.
        </div>
      )}

      <Dialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Class"
        message="Are you sure you want to delete this class? This action cannot be undone and may affect assigned students and teachers."
        confirmText="Delete Class"
        variant="danger"
      />
    </div>
  )
}
