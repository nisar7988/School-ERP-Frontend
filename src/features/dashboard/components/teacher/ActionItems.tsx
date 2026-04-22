import { AlertCircle, FileStack, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const items = [
  {
    title: "Submit Mid-term Grades",
    desc: "Due in 2 days for Advanced Physics 301.",
    icon: AlertCircle,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    status: "Review",
    statusColor: "text-orange-500",
    done: false,
  },
  {
    title: "Review 12 Lab Reports",
    desc: "From yesterday's Quantum Mechanics class.",
    icon: FileStack,
    iconColor: "text-gray-500",
    iconBg: "bg-gray-100",
    status: "Grade",
    statusColor: "text-orange-400",
    done: false,
  },
  {
    title: "Approve Syllabus Changes",
    desc: "Completed yesterday.",
    icon: CheckCircle2,
    iconColor: "text-brand-orange",
    iconBg: "bg-orange-50",
    status: "Completed",
    statusColor: "text-gray-400",
    done: true,
  },
]

export function ActionItems() {
  return (
    <Card className="h-full border border-gray-100 shadow-sm bg-white rounded-2xl p-6">
      <CardHeader className="p-0 mb-5">
        <CardTitle className="text-lg font-bold text-gray-900">Action Items</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group bg-gray-50/60 rounded-xl p-4 hover:bg-white hover:shadow-sm transition-all duration-200 border border-transparent hover:border-gray-100 flex items-start justify-between gap-3"
          >
            <div className="flex gap-3">
              <div
                className={`w-9 h-9 ${item.iconBg} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}
              >
                <item.icon className={`w-4.5 h-4.5 ${item.iconColor}`} />
              </div>
              <div className="space-y-0.5">
                <h4
                  className={`font-semibold text-sm leading-tight ${
                    item.done ? "text-gray-400 line-through decoration-gray-300" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
              </div>
            </div>
            <span
              className={`text-[11px] font-bold shrink-0 mt-0.5 ${item.statusColor} ${
                item.done ? "line-through decoration-gray-300" : ""
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
