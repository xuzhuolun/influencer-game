# {{PROJECT_TITLE}}

**项目 ID:** `{{PROJECT_ID}}`  
**类型:** {{PROJECT_TYPE}}  
**复杂度:** {{COMPLEXITY}}  
**状态:** {{STATUS}}  
**创建时间:** {{CREATED_DATE}}  
**预估周期:** {{ESTIMATED_DURATION}}

---

## 📋 项目概览

{{PROJECT_DESCRIPTION}}

### 元数据
- **SDD 版本:** 2.5
- **PLAN 模式:** 已启用
- **团队规模:** {{TEAM_SIZE}}
- **负责人:** {{ASSIGNEE}}
- **标签:** {{TAGS}}

---

## 📊 进度概览

| 指标 | 数量 | 百分比 |
|------|------|--------|
| **任务总数** | {{TOTAL_TASKS}} | 100% |
| **待处理** | {{TODO_TASKS}} | {{TODO_PERCENTAGE}}% |
| **进行中** | {{IN_PROGRESS_TASKS}} | {{IN_PROGRESS_PERCENTAGE}}% |
| **评审中** | {{REVIEW_TASKS}} | {{REVIEW_PERCENTAGE}}% |
| **已完成** | {{DONE_TASKS}} | {{DONE_PERCENTAGE}}% |
| **已阻塞** | {{BLOCKED_TASKS}} | {{BLOCKED_PERCENTAGE}}% |

**整体完成度:** {{COMPLETION_PERCENTAGE}}%

**工时统计:**
- **预估工时:** {{TOTAL_ESTIMATED_HOURS}}h
- **实际工时:** {{TOTAL_ACTUAL_HOURS}}h
- **差异:** {{HOURS_VARIANCE}}h

---

## 📅 看板面板

### 🔵 待处理 ({{TODO_TASKS}})

{{TODO_TASK_LIST}}

### 🟡 进行中 ({{IN_PROGRESS_TASKS}})

{{IN_PROGRESS_TASK_LIST}}

### 🟣 评审中 ({{REVIEW_TASKS}})

{{REVIEW_TASK_LIST}}

### 🟢 已完成 ({{DONE_TASKS}})

{{DONE_TASK_LIST}}

---

## 🗂️ 任务层级结构

{{TASK_HIERARCHY}}

---

## 🚀 执行指南

### 快速开始

1. **查看路线图:**
   ```bash
   cat specs/todo-roadmap/{{PROJECT_ID}}/roadmap.md
   ```

2. **开始首个任务:**
   ```bash
   /execute-task {{FIRST_TASK_ID}}
   ```

3. **跟踪进度:**
   - 在 roadmap.json 中更新任务状态
   - 查看 execution-log.md 了解历史记录
   - 在本文档中检查进度

### 任务执行命令

{{EXECUTION_COMMANDS}}

---

## 📈 时间线与里程碑

{{TIMELINE}}

---

## 🔗 依赖关系图

{{DEPENDENCIES_GRAPH}}

---

## 📝 备注

{{NOTES}}

---

## 🔄 变更历史

{{CHANGE_HISTORY}}

---

## 📂 文件结构

```
specs/todo-roadmap/{{PROJECT_ID}}/
├── roadmap.json          # 看板数据（兼容 VSCode 扩展）
├── roadmap.md            # 本文件 - 人类可读视图
├── tasks/                # 单个任务 JSON 文件
│   ├── epic-001.json
│   ├── task-001-1.json
│   └── ...
└── execution-log.md      # 任务执行追踪日志
```

---

## 🛠️ 集成

本路线图支持集成:
- ✅ SDD 命令 (`/brief`, `/research`, `/specify`, `/plan`, `/tasks`, `/implement`)
- ✅ VSCode 看板扩展（兼容 Taskr Kanban）
- ✅ `specs/active/` 中的规格文档用于实现细节
- ✅ 所有命令执行均启用 PLAN 模式

---

**创建者:** `/sdd-full-plan` 命令  
**最后更新:** {{LAST_UPDATED}}  
**下次评审:** {{NEXT_REVIEW}}