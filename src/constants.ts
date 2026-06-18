import type { Category } from './types'

/** 所有分类及其对应的中文标签 */
export const CATEGORY_LABELS: Record<Category, string> = {
  rent: '房租',
  food: '饮食',
  transport: '交通',
  study: '学习',
  game: '游戏',
  daily: '日用品',
  other: '其他',
}

/** 下拉/筛选用的分类顺序 */
export const CATEGORY_LIST: Category[] = [
  'rent',
  'food',
  'transport',
  'study',
  'game',
  'daily',
  'other',
]

/** 每个分类的代表色（用于统计条与标签） */
export const CATEGORY_COLORS: Record<Category, string> = {
  rent: '#e57373',
  food: '#ffb74d',
  transport: '#64b5f6',
  study: '#4db6ac',
  game: '#9575cd',
  daily: '#81c784',
  other: '#90a4ae',
}

/** localStorage 中存储支出列表所用的 key */
export const STORAGE_KEY = 'japan-expense-tracker:expenses'

/** localStorage 中存储每月预算所用的 key（单独存储，与支出列表解耦） */
export const BUDGET_STORAGE_KEY = 'japan-expense-tracker:budget'
