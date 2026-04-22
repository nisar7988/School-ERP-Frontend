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
    iconColor: "text-brand-orange/70",
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
    <Card className="h-full border-none shadow-none bg-brand-peach/20 rounded-[32px] p-8">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-2xl font-bold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.href}
            className="w-full group flex items-center justify-between p-4 bg-white rounded-2xl hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-300`}>
                <action.icon className={`w-6 h-6 ${action.iconColor}`} />
              </div>
              <span className="font-bold text-gray-700">{action.title}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
