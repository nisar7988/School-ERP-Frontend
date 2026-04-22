import { TeacherHero } from '../components/teacher/TeacherHero'
import { QuickActions } from '../components/teacher/QuickActions'
import { TodaysClasses } from '../components/teacher/TodaysClasses'
import { TeacherAttendance } from '../components/teacher/TeacherAttendance'
import { ActionItems } from '../components/teacher/ActionItems'

export function TeacherDashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto">
      {/* Hero */}
      <TeacherHero />

      {/* Row 1: Quick Actions & Today's Classes */}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <QuickActions />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <TodaysClasses />
        </div>
      </div>

      {/* Row 2: Weekly Attendance & Action Items */}
    </div>
  )
}
