import { MoreHorizontal } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const data = [
  { day: 'M', height: '50%' },
  { day: 'T', height: '70%' },
  { day: 'W', height: '90%' },
  { day: 'T', height: '65%' },
  { day: 'F', height: '55%' },
  { day: 'S', height: '30%' },
]

export function AttendanceTrends() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-gray-900">
            Attendance Trends
          </CardTitle>
          <CardDescription className="font-semibold">
            Weekly average across all classes
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="px-8 pb-8 pt-6">
        <div className="flex items-end justify-between h-48 gap-4 px-2">
          {data.map((item) => (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center gap-4"
            >
              <div
                className="w-full bg-brand-peach/40 hover:bg-brand-orange/20 transition-all rounded-xl relative group active:scale-95 cursor-pointer"
                style={{ height: item.day === 'W' ? '100%' : item.height }}
              >
                {item.day === 'W' && (
                  <div className="absolute inset-x-0 bottom-0 bg-brand-orange/10 rounded-xl h-full" />
                )}
              </div>
              <span className="text-xs font-bold text-gray-400">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
