import type { Category, Expense } from './types'
import { CATEGORY_LIST } from './constants'

/** 生成唯一 id：优先使用 crypto.randomUUID，老浏览器回退 */
export function genId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

/** 当前日期的 YYYY-MM-DD（本地时区） */
export function todayStr(): string {
  return toDateString(new Date())
}

/** 把任意 Date 转成 YYYY-MM-DD（本地时区） */
export function toDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** 把金额格式化为日元显示，例如 ¥1,234 */
const yenFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
  maximumFractionDigits: 0,
})

export function formatYen(amount: number): string {
  if (!Number.isFinite(amount)) return '¥0'
  return yenFormatter.format(Math.round(amount))
}

/** 今日总支出 */
export function getTodayTotal(expenses: Expense[]): number {
  const today = todayStr()
  return expenses
    .filter((e) => e.date === today)
    .reduce((sum, e) => sum + e.amount, 0)
}

/** 本月总支出 */
export function getMonthTotal(expenses: Expense[]): number {
  const now = new Date()
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-`
  return expenses
    .filter((e) => e.date.startsWith(prefix))
    .reduce((sum, e) => sum + e.amount, 0)
}

/** 各分类金额统计，返回有支出的分类按金额降序排列 */
export interface CategoryStat {
  category: Category
  total: number
  ratio: number // 占比 0~1
}

export function sumByCategory(expenses: Expense[]): CategoryStat[] {
  const totals = new Map<Category, number>()
  for (const e of expenses) {
    totals.set(e.category, (totals.get(e.category) ?? 0) + e.amount)
  }
  const grandTotal = [...totals.values()].reduce((a, b) => a + b, 0)

  return CATEGORY_LIST
    .filter((c) => totals.has(c))
    .map((c) => ({
      category: c,
      total: totals.get(c) ?? 0,
      ratio: grandTotal > 0 ? (totals.get(c) ?? 0) / grandTotal : 0,
    }))
    .sort((a, b) => b.total - a.total)
}

/** 列表按日期降序、同日期按创建时间降序排列 */
export function sortByDateDesc(expenses: Expense[]): Expense[] {
  return [...expenses].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1
    return a.id < b.id ? 1 : -1
  })
}
