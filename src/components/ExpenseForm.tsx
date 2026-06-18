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

/** 校验金额，返回错误信息（合法时返回空字符串） */
function validateAmount(raw: string): string {
  const trimmed = raw.trim()
  if (trimmed === '') return '请输入金额'
  const n = Number(trimmed)
  if (!Number.isFinite(n)) return '请输入有效的数字'
  if (n <= 0) return '金额必须大于 0'
  return ''
}

export function ExpenseForm({ onAdd }: Props) {
  const [date, setDate] = useState<string>(todayStr())
  const [amount, setAmount] = useState<string>('')
  const [category, setCategory] = useState<Category>('food')
  const [note, setNote] = useState<string>('')
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // 提交时统一校验：日期非空 + 金额合法
    const next: FormErrors = {
      date: date ? undefined : '请选择日期',
      amount: validateAmount(amount) || undefined,
    }
    setErrors(next)
    if (next.date || next.amount) return

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

  // 输入时清除该字段的错误，让提示随修正即时消失
  function handleDateChange(value: string) {
    setDate(value)
    if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }))
  }

  function handleAmountChange(value: string) {
    setAmount(value)
    if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }))
  }

  // 离开金额框时校验：已有值但非法则即时提示（空着不打扰，留到提交时校验）
  function handleAmountBlur() {
    if (amount.trim() === '') return
    const err = validateAmount(amount)
    setErrors((prev) => ({ ...prev, amount: err || undefined }))
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
            onChange={(e) => handleDateChange(e.target.value)}
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
            onChange={(e) => handleAmountChange(e.target.value)}
            onBlur={handleAmountBlur}
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
