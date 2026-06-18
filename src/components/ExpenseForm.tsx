import { useState, type FormEvent } from 'react'
import type { Category, NewExpense } from '../types'
import { CATEGORY_LABELS, CATEGORY_LIST } from '../constants'
import { todayStr } from '../utils'

interface Props {
  onAdd: (data: NewExpense) => void
}

interface FormErrors {
  date?: string
  amount?: string
}

export function ExpenseForm({ onAdd }: Props) {
  const [date, setDate] = useState<string>(todayStr())
  const [amount, setAmount] = useState<string>('')
  const [category, setCategory] = useState<Category>('food')
  const [note, setNote] = useState<string>('')
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!date) next.date = '请选择日期'
    const n = Number(amount)
    if (amount.trim() === '' || !Number.isFinite(n)) {
      next.amount = '请输入大于 0 的金额'
    } else if (n <= 0) {
      next.amount = '金额必须大于 0'
    }
    return next
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    onAdd({
      date,
      amount: Number(amount),
      category,
      note: note.trim(),
    })

    // 提交后重置金额与备注，保留日期与分类，方便连续记账
    setAmount('')
    setNote('')
    setErrors({})
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2 className="card-title">添加支出</h2>

      <div className="form-row">
        <label className="form-field">
          <span className="form-label">日期</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <span className="form-error">{errors.date}</span>}
        </label>

        <label className="form-field">
          <span className="form-label">金额（日元）</span>
          <input
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            placeholder="例如 1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {errors.amount && (
            <span className="form-error">{errors.amount}</span>
          )}
        </label>
      </div>

      <div className="form-row">
        <label className="form-field">
          <span className="form-label">分类</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {CATEGORY_LIST.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">备注</span>
          <input
            type="text"
            placeholder="可选"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        添加记录
      </button>
    </form>
  )
}
