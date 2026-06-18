import { CATEGORY_COLORS, CATEGORY_LABELS } from '../constants'
import { formatYen } from '../utils'
import type { Expense } from '../types'

interface Props {
  expenses: Expense[]
  onRemove: (id: string) => void
}

export function ExpenseList({ expenses, onRemove }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="card">
        <h2 className="card-title">支出列表</h2>
        <p className="empty-hint">还没有记录，先添加一笔吧</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="card-title">支出列表</h2>
      <div className="list">
        <div className="list-header">
          <span>日期</span>
          <span>分类</span>
          <span className="col-amount">金额</span>
          <span>备注</span>
          <span className="col-action" />
        </div>
        {expenses.map((e) => (
          <div key={e.id} className="list-row">
            <span className="col-date">{e.date}</span>
            <span>
              <span
                className="badge"
                style={{ background: CATEGORY_COLORS[e.category] }}
              >
                {CATEGORY_LABELS[e.category]}
              </span>
            </span>
            <span className="col-amount amount">{formatYen(e.amount)}</span>
            <span className="col-note">{e.note || '—'}</span>
            <span className="col-action">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onRemove(e.id)}
                aria-label="删除该记录"
              >
                删除
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
