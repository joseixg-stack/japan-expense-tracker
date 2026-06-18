import { useEffect, useState, type FormEvent } from 'react'
import { formatYen } from '../utils'

interface Props {
  /** 本月预算，0 表示未设置 */
  budget: number
  /** 本月已花费 */
  monthSpent: number
  /** 更新预算 */
  onUpdate: (value: number) => void
}

export function BudgetPanel({ budget, monthSpent, onUpdate }: Props) {
  const [input, setInput] = useState<string>(budget > 0 ? String(budget) : '')
  const [error, setError] = useState<string>('')

  // 外部 budget 变化时同步输入框（多标签页同步等场景）
  useEffect(() => {
    setInput(budget > 0 ? String(budget) : '')
  }, [budget])

  const isSet = budget > 0
  const remaining = budget - monthSpent
  const overBudget = isSet && remaining < 0
  const ratioPercent = isSet ? (monthSpent / budget) * 100 : 0

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const n = Number(input)
    if (input.trim() === '' || !Number.isFinite(n) || n < 0) {
      setError('请输入大于等于 0 的金额')
      return
    }
    setError('')
    onUpdate(n)
  }

  return (
    <div className="card budget-panel">
      <h2 className="card-title">本月预算</h2>

      <form className="budget-form" onSubmit={handleSubmit} noValidate>
        <input
          type="number"
          min={0}
          step={1}
          inputMode="numeric"
          placeholder="设置本月预算，例如 120000"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          保存预算
        </button>
        {error && <span className="form-error budget-form-error">{error}</span>}
      </form>

      <div className="budget-grid">
        <div className="budget-item">
          <span className="budget-item-label">本月预算</span>
          <span className="budget-item-value">
            {isSet ? formatYen(budget) : '未设置'}
          </span>
        </div>
        <div className="budget-item">
          <span className="budget-item-label">本月已花费</span>
          <span className="budget-item-value">{formatYen(monthSpent)}</span>
        </div>
        <div className="budget-item">
          <span className="budget-item-label">剩余预算</span>
          <span
            className={`budget-item-value ${
              overBudget ? 'budget-value-danger' : ''
            }`}
          >
            {isSet ? formatYen(remaining) : '—'}
          </span>
        </div>
      </div>

      {isSet && (
        <>
          <div className="budget-bar">
            <div
              className={`budget-bar-fill ${
                overBudget ? 'budget-bar-over' : ''
              }`}
              style={{ width: `${Math.min(ratioPercent, 100)}%` }}
            />
          </div>
          <div
            className={`budget-bar-meta ${
              overBudget ? 'budget-bar-meta-danger' : ''
            }`}
          >
            已使用 {ratioPercent.toFixed(1)}%
          </div>
        </>
      )}

      {overBudget && (
        <div className="budget-warn">
          ⚠ 本月已超支 {formatYen(-remaining)}，请控制支出！
        </div>
      )}
    </div>
  )
}
