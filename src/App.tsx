import { useMemo, useState } from 'react'
import type { Category } from './types'
import { useExpenses } from './hooks/useExpenses'
import { useBudget } from './hooks/useBudget'
import { getMonthTotal, getTodayTotal, sortByDateDesc } from './utils'
import { ExpenseForm } from './components/ExpenseForm'
import { SummaryCards } from './components/SummaryCards'
import { BudgetPanel } from './components/BudgetPanel'
import { CategoryFilter } from './components/CategoryFilter'
import { CategoryStats } from './components/CategoryStats'
import { ExpenseList } from './components/ExpenseList'

export default function App() {
  const { expenses, addExpense, removeExpense, saveError: expenseSaveError } =
    useExpenses()
  const { budget, updateBudget, saveError: budgetSaveError } = useBudget()
  const [filter, setFilter] = useState<Category | 'all'>('all')

  // 分类统计始终基于全部数据，不受筛选影响
  const visibleList = useMemo(() => {
    const filtered =
      filter === 'all'
        ? expenses
        : expenses.filter((e) => e.category === filter)
    return sortByDateDesc(filtered)
  }, [expenses, filter])

  // 统一计算口径：今日/本月支出只算一次，各组件共享
  const todaySpent = useMemo(() => getTodayTotal(expenses), [expenses])
  const monthSpent = useMemo(() => getMonthTotal(expenses), [expenses])

  const saveError = expenseSaveError || budgetSaveError

  return (
    <div className="app">
      <header className="app-header">
        <h1>日本留学生生活费记账</h1>
        <p className="subtitle">简单记录每一笔日元支出</p>
      </header>

      {saveError && <div className="global-warn">{saveError}</div>}

      <main className="app-main">
        <div className="top-grid">
          <SummaryCards todayTotal={todaySpent} monthTotal={monthSpent} />
          <ExpenseForm onAdd={addExpense} />
        </div>

        <BudgetPanel
          budget={budget}
          monthSpent={monthSpent}
          onUpdate={updateBudget}
        />

        <CategoryStats expenses={expenses} />

        <CategoryFilter value={filter} onChange={setFilter} />

        <ExpenseList expenses={visibleList} onRemove={removeExpense} />
      </main>

      <footer className="app-footer">
        数据保存在浏览器本地（localStorage），清除浏览器数据会丢失记录
      </footer>
    </div>
  )
}
