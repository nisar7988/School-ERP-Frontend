import { StudentHero } from "../components/student/StudentHero"
import { StudentProfileCard } from "../components/student/StudentProfileCard"
import { TodaySchedule } from "../components/student/TodaySchedule"
import { OverallAttendance } from "../components/student/OverallAttendance"
import { FeeStatus } from "../components/student/FeeStatus"

export function StudentDashboardPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <StudentHero />

      <div className="grid grid-cols-12 gap-8 items-stretch">
        {/* Left Section - Profile and Schedule */}
        <div className="col-span-12 lg:col-span-8 space-y-8 flex flex-col">
          <StudentProfileCard />
          <div className="flex-1">
            <TodaySchedule />
          </div>
        </div>

        {/* Right Section - Attendance and Fees */}
        <div className="col-span-12 lg:col-span-4 space-y-8 flex flex-col">
          <div className="flex-1">
            <OverallAttendance />
          </div>
          <div className="flex-1">
            <FeeStatus />
          </div>
        </div>
      </div>
    </div>
  )
}
