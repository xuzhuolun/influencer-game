# 路线图格式规范

**版本:** 1.0.0  
**兼容性:** SDD 2.5, Taskr Kanban, VSCode 扩展, Cursor 2.1+  
**最后更新:** 2025-10-21

## Cursor 2.1 集成

此格式与 Cursor 2.1 功能无缝配合：

- **多代理执行** - 并行执行多个任务
- **后台规划** - 在工作时生成路线图
- **团队命令** - 通过团队命令共享路线图
- **交互式 UI** - 更好的路线图创建过程中的问题处理

---

## 概述

本文档指定了 SDD 路线图的 JSON 格式，设计为与 VSCode 看板扩展兼容，同时为规范驱动开发工作流提供增强功能。

## 文件结构

```
specs/todo-roadmap/
├── index.json                    # 所有路线图的注册表
└── [project-id]/
    ├── roadmap.json              # 主看板数据
    ├── roadmap.md                # 人类可读的 markdown 视图
    ├── tasks/                    # 单个任务详情
    │   ├── epic-001.json
    │   ├── task-001-1.json
    │   └── ...
    └── execution-log.md          # 执行历史
```

---

## JSON 模式

### 根对象 (roadmap.json)

```typescript
interface Roadmap {
  // 核心标识
  id: string;                     // 唯一项目标识符
  title: string;                  // 项目标题
  description: string;            // 项目描述
  type: ProjectType;              // "application" | "feature" | "system" | "platform"
  
  // 时间戳
  created: ISO8601DateTime;       // 路线图创建时间
  updated: ISO8601DateTime;       // 最后更新时间戳
  
  // 状态
  status: RoadmapStatus;          // "planning" | "active" | "on-hold" | "completed" | "archived"
  
  // 元数据
  metadata: {
    sddVersion: string;           // SDD 版本（例如 "2.5"）
    planMode: boolean;            // 是否启用 PLAN 模式
    estimatedDuration: string;    // 例如 "8 weeks"
    complexity: Complexity;       // "simple" | "medium" | "complex" | "enterprise"
    teamSize: number;             // 团队成员数量
    assignee: string | null;      // 主要负责人
    tags: string[];               // 自定义标签
  };
  
  // 看板列
  columns: Column[];
  
  // 任务
  tasks: Record<string, Task>;    // 任务 ID → 任务对象
  
  // 统计数据
  statistics: {
    totalTasks: number;           // 总任务数
    todoTasks: number;            // 待办任务数
    inProgressTasks: number;      // 进行中任务数
    reviewTasks: number;          // 审核中任务数
    doneTasks: number;            // 已完成任务数
    blockedTasks: number;         // 被阻塞任务数
    totalEstimatedHours: number;  // 总预估工时
    totalActualHours: number;     // 总实际工时
    completionPercentage: number; // 完成百分比
  };
  
  // 历史记录
  history: HistoryEntry[];
}
```

### 列对象

```typescript
interface Column {
  id: string;                     // "todo" | "in-progress" | "review" | "done" | 自定义
  title: string;                  // 显示名称
  order: number;                  // 列顺序（从 0 开始）
  tasks: string[];                // 此列中的任务 ID 数组
}
```

### 任务对象

```typescript
interface Task {
  // 核心标识
  id: string;                     // 唯一任务标识符
  title: string;                  // 任务标题
  description: string;            // 详细描述
  
  // 任务层级
  type: TaskType;                 // "epic" | "task" | "subtask"
  parentId: string | null;        // 父任务 ID（用于子任务）
  
  // 优先级与复杂度
  priority: Priority;             // "low" | "medium" | "high" | "critical"
  complexity: Complexity;         // "simple" | "medium" | "complex"
  
  // 状态管理
  status: TaskStatus;             // "todo" | "in-progress" | "review" | "done" | "blocked" | "on-hold"
  column: string;                 // 当前列 ID
  
  // 关系
  dependencies: string[];         // 此任务依赖的任务 ID
  subtasks: string[];             // 子任务 ID（用于史诗任务）
  
  // 工作量跟踪
  estimatedHours: number;         // 预估工时（小时）
  actualHours: number;            // 实际花费时间
  
  // 分类
  tags: string[];                 // 自定义标签
  
  // SDD 集成
  sdd: {
    phase: SDDPhase;              // SDD 阶段: "research" | "brief" | "specification" | "planning" | "tasks" | "implementation"
    commands: string[];           // 要运行的 SDD 命令: ["/research", "/specify", 等]
    linkedSpec: string | null;    // specs/active/ 中的规格路径
    executeCommand: string;       // 执行此任务的命令: "/execute-task task-id"
    executedAt: ISO8601DateTime | null;     // 任务执行时间
    completedAt: ISO8601DateTime | null;    // 任务完成时间
    executedBy: string | null;              // 执行者
  };
  
  // Markdown 内容
  markdown: string;               // 完整的 markdown 任务描述
  
  // 分配
  assignee: string | null;        // 分配给
  reporter: string | null;        // 创建者
  
  // 时间戳
  created: ISO8601DateTime;       // 创建时间
  updated: ISO8601DateTime;       // 更新时间
  startedAt: ISO8601DateTime | null;  // 开始时间
  completedAt: ISO8601DateTime | null; // 完成时间
  dueDate: ISO8601DateTime | null;     // 截止日期
  
  // 阻塞项与评论
  blockers: Blocker[];            // 阻塞项列表
  comments: Comment[];            // 评论列表
  attachments: Attachment[];      // 附件列表
  
  // 历史记录
  history: HistoryEntry[];
}
```

### 支持类型

```typescript
type ProjectType = "application" | "feature" | "system" | "platform";

type RoadmapStatus = "planning" | "active" | "on-hold" | "completed" | "archived";

type TaskType = "epic" | "task" | "subtask";

type TaskStatus = "todo" | "in-progress" | "review" | "done" | "blocked" | "on-hold" | "archived";

type Priority = "low" | "medium" | "high" | "critical";

type Complexity = "simple" | "medium" | "complex" | "enterprise";

type SDDPhase = 
  | "research"      // 研究
  | "brief"         // 简报
  | "specification" // 规格
  | "planning"      // 规划
  | "tasks"         // 任务
  | "implementation"// 实现
  | "evolution"     // 演进
  | "upgrade";      // 升级

interface Blocker {
  id: string;                      // 唯一标识符
  description: string;             // 描述
  blockedBy: string | null;        // 任务 ID 或外部引用
  created: ISO8601DateTime;        // 创建时间
  resolved: ISO8601DateTime | null; // 解决时间
}

interface Comment {
  id: string;                      // 唯一标识符
  author: string;                  // 作者
  content: string;                 // 内容
  created: ISO8601DateTime;        // 创建时间
  updated: ISO8601DateTime | null; // 更新时间
}

interface Attachment {
  id: string;                      // 唯一标识符
  filename: string;                // 文件名
  path: string;                    // 路径
  type: string;                    // 类型
  size: number;                    // 大小
  uploaded: ISO8601DateTime;       // 上传时间
}

interface HistoryEntry {
  timestamp: ISO8601DateTime;      // 时间戳
  action: string;                  // 操作，例如 "task_created", "status_changed", "assigned"
  description: string;             // 描述
  user: string;                    // 用户
  metadata?: Record<string, any>;  // 元数据（可选）
}

type ISO8601DateTime = string;     // 格式: "2025-10-21T10:30:00Z"
```

---

## 任务层级

### 史诗任务 (Epic)
- **类型:** `"epic"`
- **用途:** 高级阶段或里程碑
- **包含:** 多个子任务
- **执行:** 通常不直接执行
- **状态:** 从子任务自动计算

### 常规任务 (Task)
- **类型:** `"task"`
- **用途:** 独立工作项
- **包含:** 可能有子任务
- **执行:** 映射到 SDD 命令
- **状态:** 手动管理

### 子任务 (Subtask)
- **类型:** `"subtask"`
- **用途:** 较大任务/史诗的一部分
- **父级:** 必需（parentId 字段）
- **执行:** 单独的 SDD 命令
- **状态:** 影响父级状态

---

## 状态流转

```
        ┌──────────┐
        │   todo   │
        └────┬─────┘
             │
             ▼
     ┌──────────────┐
     │ in-progress  │
     └──────┬───────┘
            │
            ▼
      ┌──────────┐
      │  review  │
      └────┬─────┘
           │
           ▼
       ┌──────┐
       │ done │
       └──────┘

交叉状态:
- blocked（阻塞）- 可从任何状态进入
- on-hold（暂停）- 可从任何状态进入
- archived（归档）- 终态
```

### 状态含义

| 状态 | 描述 | 允许的转换 |
|--------|-------------|---------------------|
| **todo** | 准备开始，所有依赖已满足 | in-progress, blocked |
| **in-progress** | 正在进行中 | review, blocked, on-hold |
| **review** | 已完成，等待审核 | done, in-progress（需要修改时）, blocked |
| **done** | 已审核通过 | archived |
| **blocked** | 无法继续，有阻塞项 | todo, in-progress（解除阻塞后） |
| **on-hold** | 临时暂停 | todo, in-progress |
| **archived** | 已取消或已过时 | （终态） |

---

## SDD 命令映射

### 阶段 → 命令映射

| SDD 阶段 | 命令 | 输出文件 | 规格位置 |
|-----------|---------|--------------|---------------|
| research（研究） | `/research` | research.md | specs/active/[task-id]/ |
| brief（简报） | `/brief` | feature-brief.md | specs/active/[task-id]/ |
| specification（规格） | `/specify` | spec.md | specs/active/[task-id]/ |
| planning（规划） | `/plan` | plan.md | specs/active/[task-id]/ |
| tasks（任务） | `/tasks` | tasks.md | specs/active/[task-id]/ |
| implementation（实现） | `/implement` | todo-list.md + 代码 | specs/active/[task-id]/ |
| evolution（演进） | `/evolve` | 更新的文档 | specs/active/[task-id]/ |
| upgrade（升级） | `/upgrade` | 完整套件 | specs/active/[task-id]/ |

### 命令执行流程

```
1. 用户运行: /execute-task task-001
2. 系统读取: roadmap.json → tasks.task-001
3. 确定: task-001.sdd.phase = "research"
4. 映射到: /research task-001 [描述]
5. 执行: 使用 PLAN 模式的 SDD 命令
6. 创建: specs/active/task-001/research.md
7. 更新: task-001.sdd.linkedSpec = "specs/active/task-001"
8. 变更: task-001.status = "review"
9. 记录: execution-log.md 条目
10. 移动: task-001 从 "todo" 到 "review" 列
```

---

## 依赖管理

### 依赖规则

1. **任务无法开始**直到所有依赖完成
2. **阻塞状态**在依赖未完成时自动设置
3. **自动解除阻塞**当依赖完成时
4. **循环依赖**不允许
5. **跨史诗依赖**支持

### 依赖链示例

```json
{
  "tasks": {
    "task-001": {
      "id": "task-001",
      "title": "Research patterns",
      "dependencies": [],
      "status": "done"
    },
    "task-002": {
      "id": "task-002",
      "title": "Create specification",
      "dependencies": ["task-001"],
      "status": "in-progress"
    },
    "task-003": {
      "id": "task-003",
      "title": "Implement feature",
      "dependencies": ["task-002"],
      "status": "blocked"
    }
  }
}
```

在此示例中:
- task-002 可以继续（依赖 task-001 已完成）
- task-003 被阻塞（依赖 task-002 正在进行中）
- 当 task-002 → done 时，task-003 自动解除阻塞

---

## VSCode 扩展集成

### Taskr Kanban 兼容性

路线图格式设计为与 Taskr Kanban 扩展兼容：

**必需字段（Taskr）:**
- ✅ id, title, description
- ✅ status, column
- ✅ dependencies, subtasks
- ✅ tags, priority
- ✅ created, updated 时间戳

**增强字段（SDD）:**
- ✅ sdd.phase, sdd.commands
- ✅ sdd.linkedSpec
- ✅ sdd.executeCommand
- ✅ markdown 内容
- ✅ estimatedHours, complexity
- ✅ 历史跟踪

### 扩展 API

未来的 VSCode 扩展可以：

1. **读取 roadmap.json** - 加载看板
2. **显示列** - 渲染任务列
3. **显示任务详情** - 显示完整任务信息
4. **拖放** - 在列之间移动任务
5. **执行任务** - 通过命令运行 `/execute-task`
6. **更新状态** - 同步更改回 JSON
7. **跟踪进度** - 计算完成百分比

### Cursor 2.1 多代理支持

**并行执行:**
- 同时执行多个独立任务
- 最多 8 个代理可并行运行
- 每个代理在隔离环境中运行
- 并行执行之间无文件冲突

**任务独立性检测:**
```typescript
function canExecuteInParallel(task1: Task, task2: Task): boolean {
  // 检查任务是否有依赖关系
  if (task1.dependencies.includes(task2.id)) return false;
  if (task2.dependencies.includes(task1.id)) return false;
  
  // 检查是否修改相同文件
  if (hasFileOverlap(task1, task2)) return false;
  
  return true;
}
```

**用法:**
```bash
# 并行执行 3 个独立任务
/execute-task task-001  # 代理 1
/execute-task task-002  # 代理 2
/execute-task task-003  # 代理 3
```

### 扩展开发

```typescript
// 示例: 在 VSCode 扩展中读取路线图
import * as fs from 'fs';
import * as path from 'path';

interface RoadmapData {
  // 使用上述模式中的类型
}

function loadRoadmap(projectId: string): RoadmapData {
  const roadmapPath = path.join(
    'specs',
    'todo-roadmap',
    projectId,
    'roadmap.json'
  );
  
  const data = fs.readFileSync(roadmapPath, 'utf-8');
  return JSON.parse(data);
}

function executeTask(taskId: string): void {
  // 发送命令到 Cursor
  vscode.commands.executeCommand(
    'cursor.runCommand',
    `/execute-task ${taskId}`
  );
}
```

---

## 验证规则

### 模式验证

1. **必需字段**必须存在
2. **任务 ID**必须唯一
3. **依赖**必须引用存在的任务
4. **列**必须有唯一 ID
5. **时间戳**必须是有效的 ISO 8601 格式
6. **状态**必须是有效的枚举值
7. **循环依赖**必须检测并阻止

### 业务规则

1. **列中的任务**必须匹配 task.column 字段
2. **子任务**必须引用有效父级
3. **依赖**必须是无环的
4. **史诗子任务**必须存在于 tasks 对象中
5. **已完成的任务**必须有 completedAt 时间戳
6. **链接的规格**必须存在于路径中

---

## 统计计算

### 自动统计

```typescript
function calculateStatistics(roadmap: Roadmap): Statistics {
  const tasks = Object.values(roadmap.tasks);
  
  return {
    totalTasks: tasks.length,
    todoTasks: tasks.filter(t => t.status === 'todo').length,
    inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    reviewTasks: tasks.filter(t => t.status === 'review').length,
    doneTasks: tasks.filter(t => t.status === 'done').length,
    blockedTasks: tasks.filter(t => t.status === 'blocked').length,
    totalEstimatedHours: tasks.reduce((sum, t) => sum + t.estimatedHours, 0),
    totalActualHours: tasks.reduce((sum, t) => sum + t.actualHours, 0),
    completionPercentage: Math.round(
      (tasks.filter(t => t.status === 'done').length / tasks.length) * 100
    )
  };
}
```

---

## 示例

参见 [FULL_PLAN_EXAMPLES.md](./FULL_PLAN_EXAMPLES.md) 获取完整示例：
- 简单功能路线图
- 中型应用程序路线图
- 复杂系统路线图
- 任务执行流程

---

## 版本控制

**当前版本:** 1.0.0

**版本历史:**
- **1.0.0** (2025-10-21): 初始规范
  - Taskr Kanban 兼容性
  - SDD 命令集成
  - PLAN 模式支持

**未来版本:**
- **1.1.0**: 添加时间跟踪功能
- **1.2.0**: 添加自定义字段支持
- **2.0.0**: 添加实时协作功能

---

## 参考资料

- [Taskr Kanban 扩展](https://marketplace.visualstudio.com/items?itemName=DavidMaliglowka.taskr-kanban)
- [JSON Schema](https://json-schema.org/)
- [ISO 8601 日期时间](https://en.wikipedia.org/wiki/ISO_8601)
- [SDD 指南](./guidelines.md)

---

**维护者:** SDD 系统  
**最后更新:** 2025-10-21  
**状态:** 稳定

