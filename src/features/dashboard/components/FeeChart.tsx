import type { StudentFees } from '#/features/fees/types'
import { BarChart } from '@mui/x-charts/BarChart'

interface FeesDataResponse {
  data: StudentFees[]
  meta?: {
    total: number
    page: number
    lastPage: number
  }
}

const FeeChart = ({
  feesData,
}: {
  feesData: StudentFees[] | FeesDataResponse | null | undefined
}) => {
  const currentMonth = new Date().getMonth()
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const categories = monthNames.slice(0, currentMonth + 1)

  // Extract fees array from response
  const fees = Array.isArray(feesData)
    ? feesData
    : feesData?.data
      ? feesData.data
      : null

  if (!fees || !Array.isArray(fees) || fees.length === 0) return null

  // Calculate fee collection for each month
  const monthlyCollections = categories.map((month, index) => {
    const monthNumber = index // 0-based month index
    const totalCollectionForMonth = fees.reduce((sum, fee) => {
      const paymentForMonth = fee.payments?.find((payment) => {
        const paidDate = new Date(payment.paidAt)
        return paidDate.getMonth() === monthNumber
      })
      return sum + (paymentForMonth ? Number(paymentForMonth.amount) : 0)
    }, 0)
    return totalCollectionForMonth
  })

  // Calculate additional metrics
  const totalPaid = fees.reduce(
    (sum, fee) => sum + Number(fee.paidAmount || 0),
    0,
  )
  const totalPending = fees.reduce(
    (sum, fee) => sum + Number(fee.pendingAmount || 0),
    0,
  )
  const totalFees = fees.reduce((sum, fee) => sum + Number(fee.amount), 0)

  return (
    <div>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: categories,
            height: 50,
          },
        ]}
        series={[
          {
            data: monthlyCollections,
            color: '#EA580C',
            label: 'Fee Collections',
          },
        ]}
        height={300}
      />
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-4 shadow-lg rounded-lg">
          <p className="text-sm text-gray-600">Total Paid</p>
          <p className="text-xl font-bold">₹{totalPaid.toLocaleString()}</p>
        </div>
        <div className="p-4 shadow-lg rounded-lg">
          <p className="text-sm text-gray-600">Total Pending</p>
          <p className="text-xl font-bold">₹{totalPending.toLocaleString()}</p>
        </div>
        <div className="p-4 shadow-lg rounded-lg">
          <p className="text-sm text-gray-600">Total Fees</p>
          <p className="text-xl font-bold">₹{totalFees.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default FeeChart
