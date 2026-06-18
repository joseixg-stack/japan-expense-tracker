import type { Category } from '../types'
import { CATEGORY_LABELS, CATEGORY_LIST } from '../constants'

interface Props {
  value: Category | 'all'
  onChange: (value: Category | 'all') => void
}

export function CategoryFilter({ value, onChange }: Props) {
  const options: Array<Category | 'all'> = ['all', ...CATEGORY_LIST]

  return (
    <div className="filter">
      <span className="filter-label">筛选：</span>
      <div className="filter-buttons">
        {options.map((opt) => {
          const active = value === opt
          const label = opt === 'all' ? '全部' : CATEGORY_LABELS[opt]
          return (
            <button
              key={opt}
              type="button"
              className={`chip ${active ? 'chip-active' : ''}`}
              onClick={() => onChange(opt)}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
