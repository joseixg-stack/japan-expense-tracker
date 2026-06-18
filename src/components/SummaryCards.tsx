import { getMonthTotal, getTodayTotal, formatYen } from '../utils'
import type { Expense } from '../types'

interface Props {
  expenses: Expense[]
}

export function SummaryCards({ expenses }: Props) {
  const today = getTodayTotal(expenses)
  const month = getMonthTotal(expenses)

  return (
    <div className="summary">
      <div className="card summary-card">
        <span className="summary-label">今日支出</span>
        <span className="summary-value">{formatYen(today)}</span>
      </div>
      <div className="card summary-card summary-card-month">
        <span className="summary-label">本月总支出</span>
        <span className="summary-value">{formatYen(month)}</span>
      </div>
    </div>
  )
}
