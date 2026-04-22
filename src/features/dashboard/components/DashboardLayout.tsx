import React from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { Outlet } from '@tanstack/react-router'

import { useAuthStore } from '@/features/auth/store'
import { Role } from '@/features/auth/types'

interface DashboardLayoutProps {
  children?: React.ReactNode
  role?: Role
  topbarTitle?: string
  user?: {
    name: string
    role: string
    avatar?: string
  }
}

export function DashboardLayout({
  children,
  role: overrideRole,
  topbarTitle,
  user: userProp,
}: DashboardLayoutProps) {
  const { user: authUser } = useAuthStore()
  
  const currentRole = overrideRole || authUser?.role || Role.STUDENT
  const displayUser = userProp || {
    name: authUser ? `${authUser.firstName} ${authUser.lastName}` : 'Guest',
    role: currentRole.charAt(0) + currentRole.slice(1).toLowerCase(),
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
  }

  return (
    <div className="min-h-screen bg-[#fefefe] flex">
      <Sidebar role={currentRole} />
      <div className="flex-1 ml-72 flex flex-col">
        <Topbar title={topbarTitle} user={displayUser} showSearch={currentRole === Role.ADMIN} />
        <main className="flex-1 p-10 overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}
