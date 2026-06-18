import { formatYen } from '../utils'

interface Props {
  /** 今日支出（由父组件计算好传入，单一数据源） */
  todayTotal: number
  /** 本月支出（由父组件计算好传入，单一数据源） */
  monthTotal: number
}

export function SummaryCards({ todayTotal, monthTotal }: Props) {
  return (
    <div className="summary">
      <div className="card summary-card">
        <span className="summary-label">今日支出</span>
        <span className="summary-value">{formatYen(todayTotal)}</span>
      </div>
      <div className="card summary-card summary-card-month">
        <span className="summary-label">本月总支出</span>
        <span className="summary-value">{formatYen(monthTotal)}</span>
      </div>
    </div>
  )
}
