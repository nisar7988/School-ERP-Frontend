import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function RevenueCard() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Fee Collection</CardTitle>
        <Badge variant="brand" className="px-3 py-1">Target: 85%</Badge>
      </CardHeader>
      <CardContent className="px-8 pb-8 space-y-6">
        <div>
           <p className="text-sm font-semibold text-gray-500 mb-2">Current Term Revenue</p>
           <div className="flex items-baseline gap-2">
             <span className="text-5xl font-black text-brand-orange">$1.2M</span>
             <span className="text-sm font-bold text-gray-400">of $1.5M expected</span>
           </div>
        </div>
        
        <div className="space-y-2">
          <Progress value={80} className="h-3 bg-brand-peach/30" />
        </div>
      </CardContent>
    </Card>
  )
}
