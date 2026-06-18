import { useCallback, useEffect, useState } from 'react'
import { loadBudget, saveBudget } from '../storage'

/**
 * 管理每月预算的状态与持久化。
 * 与 useExpenses 对称：初始从 localStorage 读取，每次变更写回。
 * 预算为 0 视为"未设置"。
 * @property saveError 保存失败时的错误信息，成功时为 null
 */
export function useBudget() {
  const [budget, setBudget] = useState<number>(() => loadBudget())
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    const ok = saveBudget(budget)
    setSaveError(ok ? null : '预算保存失败，可能超出浏览器存储配额')
  }, [budget])

  const updateBudget = useCallback((value: number) => {
    setBudget(Math.max(0, Math.floor(value)))
  }, [])

  return { budget, updateBudget, saveError }
}
