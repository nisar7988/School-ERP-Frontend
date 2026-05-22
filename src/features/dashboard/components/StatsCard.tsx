import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface StatsCardProps {
  label: string
  value: string
  icon: LucideIcon
  isPositive?: boolean
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  isPositive = true,
}: StatsCardProps) {
  return (
    <Card className="flex-1 p-2 w-1/2 shadow-sm">
      <CardContent className="p-8 flex items-center justify-center">
        <div className="space-y-4 flex flex-col items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-peach/50 rounded-xl">
              <Icon className="w-5 h-5 text-brand-orange" />
            </div>
            <p className="text-sm font-bold text-gray-500">{label}</p>
          </div>
          <h3 className="text-4xl font-extrabold text-gray-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
