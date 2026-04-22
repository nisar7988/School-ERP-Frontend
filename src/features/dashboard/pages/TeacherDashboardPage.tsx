import { TeacherHero } from "../components/teacher/TeacherHero"
import { QuickActions } from "../components/teacher/QuickActions"
import { TodaysClasses } from "../components/teacher/TodaysClasses"
import { TeacherAttendance } from "../components/teacher/TeacherAttendance"
import { ActionItems } from "../components/teacher/ActionItems"

export function TeacherDashboardPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 p-2">
      <TeacherHero />

      <div className="grid grid-cols-12 gap-8">
        {/* Row 1: Quick Actions & Today's Classes */}
        <div className="col-span-12 lg:col-span-5">
          <QuickActions />
        </div>
        <div className="col-span-12 lg:col-span-7">
          <TodaysClasses />
        </div>

        {/* Row 2: Weekly Attendance & Action Items */}
        <div className="col-span-12 lg:col-span-7">
          <TeacherAttendance />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <ActionItems />
        </div>
      </div>
    </div>
  )
}
