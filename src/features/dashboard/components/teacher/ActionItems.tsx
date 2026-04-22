import { AlertCircle, FileStack, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const items = [
  {
    title: "Submit Mid-term Grades",
    desc: "Due in 2 days for Advanced Physics 301.",
    icon: AlertCircle,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
    status: "Review",
    statusColor: "text-orange-600 border-orange-100"
  },
  {
    title: "Review 12 Lab Reports",
    desc: "From yesterday's Quantum Mechanics class.",
    icon: FileStack,
    iconColor: "text-gray-600",
    iconBg: "bg-gray-100",
    status: "Grade",
    statusColor: "text-orange-400 border-orange-50"
  },
  {
    title: "Approve Syllabus Changes",
    desc: "Completed yesterday.",
    icon: CheckCircle2,
    iconColor: "text-brand-orange",
    iconBg: "bg-orange-50",
    status: "Completed",
    statusColor: "text-gray-400 border-gray-100 line-through decoration-gray-300"
  }
]

export function ActionItems() {
  return (
    <Card className="h-full border-none shadow-none bg-brand-peach/20 rounded-[32px] p-8">
      <CardHeader className="p-0 mb-8">
        <CardTitle className="text-2xl font-bold text-gray-900">Action Items</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="group bg-white rounded-[24px] p-5 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-50 flex items-start justify-between"
          >
            <div className="flex gap-4">
              <div className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <div className="space-y-1">
                <h4 className={`font-bold text-gray-900 leading-tight ${item.status === 'Completed' ? 'text-gray-400' : ''}`}>
                  {item.title}
                </h4>
                <p className="text-xs font-medium text-gray-500 line-clamp-1">{item.desc}</p>
              </div>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border mt-1 ${item.statusColor}`}>
              {item.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
