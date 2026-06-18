import type { Expense } from './types'
import { STORAGE_KEY } from './constants'

/**
 * 从 localStorage 读取支出列表。
 * 解析失败（脏数据）时清除 key 并返回空数组，避免整个应用崩溃。
 */
export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      localStorage.removeItem(STORAGE_KEY)
      return []
    }
    // 只保留结构合法的条目，做一层防御
    return parsed.filter(isValidExpense)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

/** 把支出列表写回 localStorage */
export function saveExpenses(expenses: Expense[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  } catch {
    // 写入失败（例如超出配额）时静默失败，不打断用户操作
  }
}

/** 运行时结构校验，过滤掉损坏的数据 */
function isValidExpense(value: unknown): value is Expense {
  if (!value || typeof value !== 'object') return false
  const e = value as Record<string, unknown>
  return (
    typeof e.id === 'string' &&
    typeof e.date === 'string' &&
    typeof e.amount === 'number' &&
    Number.isFinite(e.amount) &&
    typeof e.category === 'string' &&
    typeof e.note === 'string'
  )
}
