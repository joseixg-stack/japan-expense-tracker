// 支出记录的类型定义

export type Category =
  | 'rent'      // 房租
  | 'food'      // 饮食
  | 'transport' // 交通
  | 'study'     // 学习
  | 'game'      // 游戏
  | 'daily'     // 日用品
  | 'other'     // 其他

export interface Expense {
  id: string
  /** 日期，格式 YYYY-MM-DD */
  date: string
  /** 金额（日元），必须 > 0 */
  amount: number
  /** 分类 */
  category: Category
  /** 备注，可为空 */
  note: string
}

/** 新增记录时表单提交的载荷（不含 id） */
export type NewExpense = Omit<Expense, 'id'>
