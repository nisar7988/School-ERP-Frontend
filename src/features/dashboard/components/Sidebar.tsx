import {
  LayoutDashboard,
  BookOpen,
  Users,
  UserSquare2,
  Calendar,
  BarChart3,
  LogOut,
  LifeBuoy,
  ClipboardList,
  CreditCard,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from '@tanstack/react-router'
import { Role } from '@/features/auth/types'
import { useAuthStore } from '#/features/auth/store'
import { useState } from 'react'
import { Dialog } from '@/components/ui/Dialog'

interface SidebarProps {
  role?: Role
}

const adminNavItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
  },
  { icon: Users, label: 'Students', href: '/students' },
  { icon: UserSquare2, label: 'Faculty', href: '/faculty' },
  { icon: Calendar, label: 'Schedule', href: '/schedule' },
  { icon: BarChart3, label: 'Reports', href: '/reports' },
  { icon: BookOpen, label: 'Classes', href: '/classes' },
]

const studentNavItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/student/dashboard',
  },
  { icon: Calendar, label: 'Schedule', href: '/student/schedule' },
  { icon: ClipboardList, label: 'Assignments', href: '/student/assignments' },
  { icon: CreditCard, label: 'Fees & Finance', href: '/student/fees' },
  { icon: Award, label: 'Grades', href: '/student/grades' },
  { icon: BookOpen, label: 'Classes', href: '/student/classes' },
]

const teacherNavItems = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/teacher/dashboard',
  },
  { icon: Users, label: 'Students', href: '/teacher/students' },
  { icon: Calendar, label: 'Schedule', href: '/teacher/schedule' },
  { icon: BookOpen, label: 'Classes', href: '/teacher/classes' },
]

export function Sidebar({ role: overrideRole }: SidebarProps) {
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()

  const currentRole = overrideRole || user?.role || Role.STUDENT

  const [logoutDialog, setLogoutDialog] = useState<{
    isOpen: boolean
    id: string
    name: string
  }>({
    isOpen: false,
    id: '',
    name: '',
  })

  const handleLogout = () => {
    setLogoutDialog({ isOpen: true, id: 'logout', name: 'your account' })
  }

  const handleConfirmLogout = () => {
    logout()
    navigate({ to: '/auth/login' })
  }

  const navItems =
    currentRole === Role.ADMIN
      ? adminNavItems
      : currentRole === Role.TEACHER
        ? teacherNavItems
        : studentNavItems

  const portalName =
    currentRole === Role.ADMIN
      ? 'Admin Portal'
      : currentRole === Role.TEACHER
        ? 'Teacher Portal'
        : 'Student Portal'

  return (
    <>
      <aside className="w-72 h-screen flex flex-col bg-brand-peach/30 border-r border-gray-100 p-8 fixed left-0 top-0 z-40">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <div>
            <h2 className="display-title text-lg font-bold text-gray-900 leading-tight">
              The Atelier
            </h2>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {portalName}
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              activeProps={{
                className:
                  'bg-brand-orange text-white shadow-lg shadow-orange-100',
              }}
              inactiveProps={{
                className: 'text-gray-500 hover:bg-white hover:text-gray-900',
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all"
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`}
                  />
                  {item.label}
                </>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-3 h-10">
              <LifeBuoy className="w-5 h-5" />
              Support
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
      <Dialog
        isOpen={logoutDialog.isOpen}
        onClose={() => setLogoutDialog({ ...logoutDialog, isOpen: false })}
        title="Sign Out"
        message="Are you sure you want to sign out of the Academic Atelier? You will need to log in again to access your dashboard."
        onConfirm={handleConfirmLogout}
        confirmText="Sign Out"
        variant="danger"
      />
    </>
  )
}
