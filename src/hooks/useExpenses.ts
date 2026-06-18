import { useCallback, useEffect, useState } from 'react'
import type { Expense, NewExpense } from '../types'
import { loadExpenses, saveExpenses } from '../storage'
import { genId } from '../utils'

/**
 * 管理支出列表的增删查，并自动持久化到 localStorage。
 * - 初始加载时从 localStorage 读取
 * - 每次 expenses 变化时写回
 * - @property saveError 保存失败时的错误信息（如配额超限），成功时为 null
 */
export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses())
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    const ok = saveExpenses(expenses)
    setSaveError(ok ? null : '数据保存失败，可能超出浏览器存储配额')
  }, [expenses])

  const addExpense = useCallback((data: NewExpense) => {
    const expense: Expense = { ...data, id: genId(), createdAt: Date.now() }
    setExpenses((prev) => [expense, ...prev])
  }, [])

  const removeExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setExpenses([])
  }, [])

  return { expenses, addExpense, removeExpense, clearAll, saveError }
}
