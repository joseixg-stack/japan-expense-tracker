import type { Category, Expense } from './types'
import { STORAGE_KEY, BUDGET_STORAGE_KEY, CATEGORY_LIST } from './constants'

/**
 * 从 localStorage 读取支出列表。
 * 解析失败或脏数据时过滤非法条目并返回合法部分，不会因脏数据导致应用崩溃。
 */
export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      console.warn(`[storage] ${STORAGE_KEY} 的值不是数组，已忽略`)
      return []
    }
    const valid = parsed.filter(isValidExpense)
    if (valid.length !== parsed.length) {
      console.warn(
        `[storage] ${STORAGE_KEY} 中有 ${parsed.length - valid.length} 条脏数据被过滤`,
      )
    }
    return valid
  } catch (err) {
    // 不再在 catch 里访问 localStorage（隐私模式/禁用时二次抛错会导致白屏）
    console.warn(`[storage] 读取支出列表失败:`, err)
    return []
  }
}

/**
 * 把支出列表写回 localStorage。
 * @returns true 写入成功，false 写入失败（通常因为配额不足）
 */
export function saveExpenses(expenses: Expense[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
    return true
  } catch (err) {
    console.warn(`[storage] 保存支出列表失败（可能超出配额）:`, err)
    return false
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
    e.amount > 0 &&
    typeof e.category === 'string' &&
    CATEGORY_LIST.includes(e.category as Category) &&
    typeof e.note === 'string'
  )
}

/**
 * 从 localStorage 读取每月预算。
 * 解析失败或为非法值时返回 0（视为未设置）。
 */
export function loadBudget(): number {
  try {
    const raw = localStorage.getItem(BUDGET_STORAGE_KEY)
    if (!raw) return 0
    const n = Number(raw)
    if (!Number.isFinite(n) || n < 0) {
      console.warn(`[storage] ${BUDGET_STORAGE_KEY} 的值非法，已忽略`)
      return 0
    }
    return n
  } catch (err) {
    console.warn(`[storage] 读取预算失败:`, err)
    return 0
  }
}

/**
 * 把每月预算写回 localStorage。
 * @returns true 写入成功，false 写入失败
 */
export function saveBudget(budget: number): boolean {
  try {
    localStorage.setItem(BUDGET_STORAGE_KEY, String(budget))
    return true
  } catch (err) {
    console.warn(`[storage] 保存预算失败:`, err)
    return false
  }
}
