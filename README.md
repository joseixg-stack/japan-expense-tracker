# Japan Student Expense Tracker 🇯🇵

> 日本留学生生活费记账工具 —— 一个简洁的浏览器记账应用，用日元（¥）记录每一笔支出。

数据保存在浏览器本地（localStorage），**无需后端、无需数据库、无需注册**。刷新页面数据不会丢失。

---

## ✨ 功能特性

- 📝 **添加支出记录**：日期、金额、分类、备注
- 🗑️ **删除记录**：列表中一键删除任意一笔
- 📊 **自动统计**
  - 今日支出
  - 本月总支出
  - 分类支出统计（含占比可视化条）
- 🏷️ **按分类筛选**：房租 / 饮食 / 交通 / 学习 / 游戏 / 日用品 / 其他
- 💾 **本地持久化**：刷新页面、关闭浏览器，数据都在
- ✅ **输入校验**：金额必须大于 0，否则给出明确提示

## 🛠️ 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 18 |
| 语言 | TypeScript |
| 构建 | Vite 5 |
| 存储 | 浏览器 localStorage |
| 样式 | 原生 CSS（CSS 变量） |

> 不依赖任何 UI 框架、状态管理库或日期库，保持轻量。

## 🚀 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) ≥ 18
- npm（随 Node 安装）

### 安装与运行

```bash
# 1. 克隆仓库
git clone https://github.com/joseixg-stack/japan-expense-tracker.git
cd japan-expense-tracker

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

启动后在浏览器打开终端提示的地址（默认 http://127.0.0.1:5173/）。

### 其他命令

```bash
npm run build     # 类型检查 + 生产构建，输出到 dist/
npm run preview   # 本地预览生产构建
```

## 📁 项目结构

```
japan-expense-tracker/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx                  # 入口
    ├── App.tsx                   # 根组件，组合各模块
    ├── style.css                 # 全部样式
    ├── types.ts                  # 类型定义（Expense / Category）
    ├── constants.ts              # 分类标签、颜色、存储 key
    ├── storage.ts                # localStorage 读写（带异常保护）
    ├── utils.ts                  # 金额格式化、日期工具、统计计算
    ├── hooks/
    │   └── useExpenses.ts        # 支出数据的增删查 + 自动持久化
    └── components/
        ├── ExpenseForm.tsx       # 添加表单（含金额 > 0 校验）
        ├── ExpenseList.tsx       # 支出列表 + 删除
        ├── SummaryCards.tsx      # 今日 / 本月 总支出卡片
        ├── CategoryFilter.tsx    # 分类筛选
        └── CategoryStats.tsx     # 分类统计（占比条）
```

## 📐 设计说明

- **货币单位**：日元 ¥，使用 `Intl.NumberFormat('ja-JP', ...)` 格式化（如 `¥1,234`）
- **分类**：房租、饮食、交通、学习、游戏、日用品、其他，每类有独立配色
- **持久化**：每次数据变更自动写回 localStorage；读取时对脏数据做防御性过滤，避免应用崩溃
- **校验**：金额为空、非数字或 ≤ 0 时表单下方显示红色提示，拒绝提交
- **排序**：列表按日期降序，方便查看最新支出

## 🔒 数据说明

- 所有数据仅保存在**当前浏览器**的 localStorage 中
- 清除浏览器数据 / 隐私模式 / 换设备都不会保留记录
- 不会向任何服务器发送数据

## 📜 License

MIT
