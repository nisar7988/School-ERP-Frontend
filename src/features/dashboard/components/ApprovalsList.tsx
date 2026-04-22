import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CalendarRange } from "lucide-react"

const approvals = [
  {
    icon: FileText,
    title: "New Course Syllabus",
    subtitle: "Prof. Davis • History 101",
    iconBg: "bg-brand-peach/40",
    iconColor: "text-brand-orange"
  },
  {
    icon: CalendarRange,
    title: "Event Request",
    subtitle: "Science Fair • Main Hall",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600"
  }
]

export function ApprovalsList() {
  return (
    <Card className="h-full">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8 space-y-4">
        {approvals.map((item) => (
          <div key={item.title} className="flex items-center justify-between p-4 bg-brand-peach/10 rounded-2xl border border-gray-50/50">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${item.iconBg}`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                <p className="text-xs font-semibold text-gray-400">{item.subtitle}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-brand-orange-hover font-bold">
              Review
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
