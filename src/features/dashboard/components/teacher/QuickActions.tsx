import { ClipboardCheck, FileEdit, MessageSquare, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"

const actions = [
  {
    title: "Mark Attendance",
    icon: ClipboardCheck,
    color: "bg-orange-100",
    iconColor: "text-brand-orange",
    href: "/teacher/attendance"
  },
  {
    title: "Grade Assignments",
    icon: FileEdit,
    color: "bg-orange-50",
    iconColor: "text-brand-orange/80",
    href: "/teacher/assignments"
  },
  {
    title: "Message Students",
    icon: MessageSquare,
    color: "bg-gray-100",
    iconColor: "text-gray-600",
    href: "/teacher/messages"
  },
]

export function QuickActions() {
  return (
    <Card className="h-full border border-gray-100 shadow-sm bg-white rounded-2xl p-6">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.href}
            className="w-full group flex items-center justify-between p-4 bg-gray-50/60 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}>
                <action.icon className={`w-5 h-5 ${action.iconColor}`} />
              </div>
              <span className="font-semibold text-gray-700 text-sm">{action.title}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
