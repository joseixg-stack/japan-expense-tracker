import { useMemo, useState } from 'react'
import type { Category } from './types'
import { useExpenses } from './hooks/useExpenses'
import { sortByDateDesc } from './utils'
import { ExpenseForm } from './components/ExpenseForm'
import { SummaryCards } from './components/SummaryCards'
import { CategoryFilter } from './components/CategoryFilter'
import { CategoryStats } from './components/CategoryStats'
import { ExpenseList } from './components/ExpenseList'

export default function App() {
  const { expenses, addExpense, removeExpense } = useExpenses()
  const [filter, setFilter] = useState<Category | 'all'>('all')

  // 分类统计始终基于全部数据，不受筛选影响
  const visibleList = useMemo(() => {
    const filtered =
      filter === 'all'
        ? expenses
        : expenses.filter((e) => e.category === filter)
    return sortByDateDesc(filtered)
  }, [expenses, filter])

  return (
    <div className="app">
      <header className="app-header">
        <h1>日本留学生生活费记账</h1>
        <p className="subtitle">简单记录每一笔日元支出</p>
      </header>

      <main className="app-main">
        <div className="top-grid">
          <SummaryCards expenses={expenses} />
          <ExpenseForm onAdd={addExpense} />
        </div>

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
