import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StatsCardProps {
  label: string
  value: string
  icon: LucideIcon
  trend: string
  isPositive?: boolean
}

export function StatsCard({ label, value, icon: Icon, trend, isPositive = true }: StatsCardProps) {
  return (
    <Card className="flex-1">
      <CardContent className="p-8 flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-brand-peach/50 rounded-xl">
               <Icon className="w-5 h-5 text-brand-orange" />
             </div>
             <p className="text-sm font-bold text-gray-500">{label}</p>
          </div>
          <h3 className="text-4xl font-extrabold text-gray-900">{value}</h3>
        </div>
        <Badge variant={isPositive ? "brand" : "warning"} className="text-xs">
          {isPositive ? "+" : "-"}{trend}
        </Badge>
      </CardContent>
    </Card>
  )
}
