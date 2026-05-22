import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  lastPage: number
  total: number
  limit?: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  lastPage,
  total,
  limit = 10,
  onPageChange,
  className,
}: PaginationProps) {
  const startRange = (currentPage - 1) * limit + 1
  const endRange = Math.min(currentPage * limit, total)

  if (total === 0) return null

  return (
    <div
      className={cn(
        'flex  flex-col md:flex-row items-center justify-between  ',
        className,
      )}
    >
      <div className="text-sm  font-sans">
        Showing{' '}
        <span className="font-semibold ">
          {startRange}–{endRange}
        </span>{' '}  
        of{' '}
        <span className="font-semibold ">
          {total.toLocaleString()}
        </span>{' '}
        results
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-10 rounded-xl px-4 border-gray-100 hover:bg-brand-peach hover:text-brand-orange disabled:opacity-50 transition-all font-bold"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Previous
        </Button>

        <div className="flex items-center ">
          {Array.from({ length: lastPage }, (_, i) => i + 1)
            .filter((p) => {
              // Show current, first, last, and pages around current
              return (
                p === 1 ||
                p === lastPage ||
                (p >= currentPage - 1 && p <= currentPage + 1)
              )
            })
            .map((p, i, arr) => {
              const showEllipsis = i > 0 && p - arr[i - 1] > 1
              return (
                <div key={p} className="flex items-center gap-1">
                  {showEllipsis && (
                    <span className="px-2 text-gray-400 text-4xl pb-3"> . . .</span>
                  )}
                  <Button
                    variant={currentPage === p ? 'brand' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(p)}
                    className={cn(
                      ' rounded-xl font-bold transition-all',
                      currentPage !== p &&
                        'border-gray-100 hover:bg-brand-peach hover:text-brand-orange',
                    )}
                  >
                    {p}
                  </Button>
                </div>
              )
            })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= lastPage}
          className="h-10 rounded-xl px-4 border-gray-100 hover:bg-brand-peach hover:text-brand-orange disabled:opacity-50 transition-all font-bold"
        >
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
