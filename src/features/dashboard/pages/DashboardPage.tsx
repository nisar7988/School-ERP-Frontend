import { Users, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatsCard } from "../components/StatsCard"
import { AttendanceTrends } from "../components/AttendanceTrends"
import { RevenueCard } from "../components/RevenueCard"
import { ApprovalsList } from "../components/ApprovalsList"
import { RecentActivity } from "../components/RecentActivity"

export function DashboardPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-gray-500 font-semibold">Welcome back. Here's what's happening at The Atelier today.</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatsCard 
              label="Total Students" 
              value="2,845" 
              icon={Users} 
              trend="4.2%" 
            />
            <StatsCard 
              label="Active Faculty" 
              value="142" 
              icon={GraduationCap} 
              trend="1.1%" 
            />
          </div>
          
          <div className="h-[400px]">
            <AttendanceTrends />
          </div>
        </div>

        {/* Right Column - Revenue & Approvals */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="h-1/2">
            <RevenueCard />
          </div>
          <div className="h-1/2">
            <ApprovalsList />
          </div>
        </div>

        {/* Bottom Section - Recent Activity */}
        <div className="col-span-12">
           <RecentActivity />
        </div>
      </div>
    </div>
  )
}
