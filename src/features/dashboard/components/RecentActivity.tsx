import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const activity = [
  {
    user: "Sarah Jenkins",
    role: "Registrar",
    action: "Processed Fall Enrollments",
    status: "Completed",
    time: "10 mins ago",
    initials: "SJ",
    avatarBg: "bg-orange-50 text-orange-600"
  },
  {
    user: "Michael Reed",
    role: "Faculty",
    action: "Updated Grades - CS201",
    status: "In Progress",
    time: "1 hour ago",
    initials: "MR",
    avatarBg: "bg-brand-peach text-brand-orange"
  }
]

export function RecentActivity() {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between p-0 mb-6">
        <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
        <Button variant="ghost" className="text-brand-orange font-bold">View All</Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-peach/20 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">User</th>
                <th className="px-8 py-5">Action</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activity.map((item) => (
                <tr key={item.user} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${item.avatarBg}`}>
                        {item.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.user}</p>
                        <p className="text-xs font-semibold text-gray-400">{item.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-600">
                    {item.action}
                  </td>
                  <td className="px-8 py-6">
                    <Badge variant={item.status === 'Completed' ? 'success' : 'brand'} className="rounded-lg px-3 py-1 font-bold">
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-right text-sm font-semibold text-gray-400">
                    {item.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
