import { Users, GraduationCap, School } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsCard } from '../components/StatsCard'
import { AttendanceTrends } from '../components/AttendanceTrends'
import { RevenueCard } from '../components/RevenueCard'
import { ApprovalsList } from '../components/ApprovalsList'
import { RecentActivity } from '../components/RecentActivity'
import { useStudents } from '@/features/students/api/queries'
import { useTeachers } from '@/features/teachers/api/queries'
import { useClasses } from '@/features/classes/api/queries'
import { usePayments, useStudentFeesList } from '@/features/fees/api/queries'
import { useAttendance } from '@/features/attendance/api/queries'
import { formatDistanceToNow } from 'date-fns'

export function DashboardPage() {
  const { data: studentsData, isLoading: isLoadingStudents } = useStudents({
    limit: 1,
  })
  const { data: teachersData, isLoading: isLoadingTeachers } = useTeachers({
    limit: 1,
  })
  const { data: classesData, isLoading: isLoadingClasses } = useClasses({
    limit: 1,
  })
  const { data: paymentsData, isLoading: isLoadingPayments } = usePayments({
    limit: 5,
  })
  const { data: allFees, isLoading: isLoadingFees } = useStudentFeesList()
  const { isLoading: isLoadingAttendance } = useAttendance({ limit: 100 })

  const totalStudents = studentsData?.meta.total ?? 0
  const totalTeachers = teachersData?.meta.total ?? 0
  const totalClasses = classesData?.meta.total ?? 0
  
  // Revenue Calculations
  const collectedRevenue =
    paymentsData?.data?.reduce((sum, p) => sum + Number(p.amount), 0) ?? 0
  const expectedRevenue = Array.isArray((allFees as any)?.data)
    ? (allFees as any).data.reduce(
        (sum: number, f: any) => sum + Number(f.amount),
        0,
      )
    : Array.isArray(allFees)
      ? allFees.reduce((sum: number, f: any) => sum + Number(f.amount), 0)
      : 0

  // Recent Activity from Payments
  const recentActivities =
    paymentsData?.data?.map((p: any) => {
      const student = p.studentFee?.student
      const user = student?.user
      const firstName = user?.firstName || 'Student'
      const lastName = user?.lastName || ''

      return {
        user: `${firstName} ${lastName}`,
        role: 'Student',
        action: `Paid ${p.studentFee?.feeStructure?.title || 'Fee'} - $${p.amount}`,
        status: 'PAID',
        time: p.paidAt
          ? formatDistanceToNow(new Date(p.paidAt), { addSuffix: true })
          : 'Recently',
        initials: `${firstName[0]}${lastName[0] || ''}`,
        avatarBg: 'bg-brand-peach text-brand-orange',
      }
    }) || []

  // Attendance Trends Calculation (Simplified for demo)
  const days = ['M', 'T', 'W', 'T', 'F', 'S']
  const trendData = days.map((day, idx) => {
    // This is a placeholder logic. In a real app, you'd filter attendance by day.
    const baseHeight = 40 + ((idx * 10) % 50)
    return { day, height: `${baseHeight}%` }
  })

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Overview
          </h1>
          <p className="text-gray-500 font-semibold">
            Welcome back. Here's what's happening at The Atelier today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Generate Report</Button>
          <Button variant="brand" className="gap-2">
            <span className="text-xl">+</span> New Class
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Stats & Trends */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="flex gap-8 ">
            <StatsCard
              label="Total Students"
              value={isLoadingStudents ? '...' : totalStudents.toLocaleString()}
              icon={Users}
            />
            <StatsCard
              label="Active Faculty"
              value={isLoadingTeachers ? '...' : totalTeachers.toLocaleString()}
              icon={GraduationCap}
            />
            <StatsCard
              label="Active Classes"
              value={isLoadingClasses ? '...' : totalClasses.toLocaleString()}
              icon={School}
            />
          </div>

          <div className="h-[400px]">
            <AttendanceTrends
              data={trendData}
              isLoading={isLoadingAttendance}
            />
          </div>
        </div>

        {/* Right Column - Revenue & Approvals */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="h-1/2">
            <RevenueCard
              collected={collectedRevenue}
              expected={expectedRevenue}
              isLoading={isLoadingPayments || isLoadingFees}
            />
          </div>
          <div className="h-1/2">
            <ApprovalsList />
          </div>
        </div>

        {/* Bottom Section - Recent Activity */}
        <div className="col-span-12">
          <RecentActivity
            activities={recentActivities}
            isLoading={isLoadingPayments}
          />
        </div>
      </div>
    </div>
  )
}
