import { MapPin, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useClassesByTeacher } from '../../../classes/queries/useClassesByTeacher'
import { useAuthStore } from '@/features/auth/store'

export function TodaysClasses() {
  const user = useAuthStore((state) => state.user)
  const { data: myClasses = [], isLoading } = useClassesByTeacher(user?.id)

  if (isLoading) {
    return (
      <Card className="h-full border-none shadow-none bg-brand-peach/20 rounded-[32px] p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </Card>
    )
  }

  if (!myClasses) {
    return (
      <Card className="h-full border-none shadow-none bg-brand-peach/20 rounded-[32px] p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </Card>
    )
  }
  return (
    <Card className="h-full border-none shadow-none bg-brand-peach/20 rounded-[32px] p-8">
      <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Assigned Classes
        </CardTitle>
        <Button
          variant="link"
          className="text-brand-orange font-bold hover:no-underline px-0"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        {myClasses.length === 0 ? (
          <div className="bg-white rounded-[24px] p-8 text-center border-2 border-dashed border-gray-100">
            <p className="text-gray-500 font-medium font-sans">
              No classes assigned to you yet.
            </p>
          </div>
        ) : (
          myClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-[24px] p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border border-gray-100">
                    <span className="text-sm font-bold text-brand-orange leading-none">
                      CLS
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">
                      {cls.section}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {cls.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium font-sans">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      Section: {cls.section}
                    </div>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-orange-50 text-brand-orange border-none px-3 py-1 font-bold text-xs rounded-lg"
                >
                  Active
                </Badge>
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-50">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl font-bold bg-gray-50/50 hover:bg-white text-gray-600 border-gray-100 h-9 px-4"
                >
                  Take Attendance
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl font-bold bg-gray-50/50 hover:bg-white text-gray-600 border-gray-100 h-9 px-4"
                >
                  View Students
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
