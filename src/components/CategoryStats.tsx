import { CATEGORY_COLORS, CATEGORY_LABELS } from '../constants'
import { formatYen, sumByCategory, type CategoryStat } from '../utils'
import type { Expense } from '../types'

interface Props {
  expenses: Expense[]
}

export function CategoryStats({ expenses }: Props) {
  const stats: CategoryStat[] = sumByCategory(expenses)

  if (stats.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title">分类统计</h2>
        <p className="empty-hint">暂无支出数据</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="card-title">分类统计</h2>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.category} className="stat-row">
            <div className="stat-head">
              <span
                className="stat-dot"
                style={{ background: CATEGORY_COLORS[s.category] }}
              />
              <span className="stat-name">{CATEGORY_LABELS[s.category]}</span>
              <span className="stat-amount">{formatYen(s.total)}</span>
              <span className="stat-ratio">
                {(s.ratio * 100).toFixed(1)}%
              </span>
            </div>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${Math.max(s.ratio * 100, 1)}%`,
                  background: CATEGORY_COLORS[s.category],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
