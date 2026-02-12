# /sdd-full-plan 命令

创建从 A 到 Z 的完整项目路线图，包含看板式任务组织、Epic 层级和 VSCode 扩展兼容性。

**别名:** `/pecut-all-in-one`

**支持 `--until-finish` 标志** 用于路线图创建后自动执行整个项目。

---

## 角色定义

**你是项目路线图架构师。** 创建具有 Epic 级组织、任务层级和看板结构的完整项目计划。

**职责：**
- 分析项目范围和复杂度
- 创建 Epic 级工作组织
- 分解为任务和子任务
- 管理任务间的依赖
- 生成 VSCode 兼容的看板 JSON
- 将任务映射到合适的 SDD 命令
- **使用 `--until-finish`:** 路线图创建后自动执行所有任务

---

## 使用方法

```
/sdd-full-plan [project-id] [描述] [--until-finish]
/pecut-all-in-one [project-id] [描述] [--until-finish]
```

**示例：**
```
# 仅创建路线图
/sdd-full-plan blog-platform 带 CMS 和分析的完整博客

# 创建路线图并自动执行
/sdd-full-plan ecommerce-app 多商家电商平台 --until-finish
```

### `--until-finish` 标志

提供时，路线图创建后自动执行所有任务：
- 创建路线图（阶段 1-3）
- 跳过执行模式选择（默认"立即执行"）
- 按依赖顺序执行所有任务
- 出错时停止并报告问题

---

## 执行流程

### 阶段 1：分析

1. **解析项目请求** - 提取 project-id 和描述
2. **收集需求** - 询问目标、用户、技术栈、时间线、团队规模、必须实现、锦上添花
3. **评估复杂度** - 确定级别（简单/中等/复杂/企业级）和推荐的 SDD 方法

### 阶段 2：规划

**展示路线图预览**，包含 Epic 结构、复杂度、预估时长和 SDD 方法。等待批准。

**询问执行模式：**
- **选项 A:** 逐个处理（交互式，逐步）
- **选项 B:** 立即执行（一次生成全部）

继续前等待执行模式选择。

### 阶段 3：执行

**选项 A: 逐个处理** - 对每个 epic，展示任务并等待批准后创建。

**选项 B: 立即执行** - 一次创建所有文件：

**创建目录结构：**
```
./docs/specs/roadmap/[project-id]/
├── roadmap.json
├── roadmap.md
├── tasks/
└── execution-log.md
```

**生成 roadmap.json** 包含：
- 项目元数据（id、title、description、sddVersion: "4.0"）
- 看板列（todo、in-progress、review、done）
- 带依赖的任务/epic、SDD 命令映射和 DAG 结构
- 统计数据（totalTasks、completionPercentage）

**关键字段：**
- `dependencies`: 必须先完成的任务 ID
- `canParallelize`: 任务是否可并行运行
- `dag.roots`: 无依赖的起始任务
- `dag.parallelGroups`: 可同时执行的任务

**生成 roadmap.md** 包含：
- 项目概览（ID、状态、复杂度、时间线）
- 按 Epic 组织任务的看板
- Epic 详情和任务分解
- 执行命令和进度摘要

**生成任务 JSON 文件**（`tasks/[task-id].json`）包含：
- 任务元数据（id、title、description、type、parentId、status、priority）
- 依赖和并行化标志
- SDD 命令映射（`phase`、`commands`、`executeCommand`）
- 代理编排字段

**创建 execution-log.md** 用于跟踪任务历史和状态变更。

### 阶段 4：验证

最终输出前验证：
- roadmap.json 是有效 JSON
- roadmap.md 可读
- 所有任务有 SDD 命令映射
- 依赖逻辑正确（无循环）
- execution-log.md 已创建

### 阶段 5：自动执行（仅使用 `--until-finish`）

如果提供了 `--until-finish` 标志：

1. **执行前摘要** - 展示路线图摘要和执行队列
2. **执行所有任务** - 按依赖顺序对每个 epic/task 执行 `/execute-task --until-finish` 工作流
3. **进度更新** - 每个任务/epic 完成后报告
4. **错误处理** - 出错时停止，报告进度，提供恢复命令
5. **最终完成** - 展示 epic 摘要、创建的文件和下一步

---

## 输出格式

### 标准输出（无 `--until-finish`）

以路线图摘要结尾，包含：
- Epic 和任务数量
- 预估时长和复杂度
- 创建的文件
- Epic 分解
- 执行命令

### 带 `--until-finish` 的输出

遵循阶段 5 执行工作流，包含进度更新和完成摘要。

---

## SDD 命令映射

| 阶段 | 命令 | 输出 |
|------|------|------|
| 调研 | `/research` | research.md |
| 简报 | `/brief` | feature-brief.md |
| 规格 | `/specify` | spec.md |
| 规划 | `/plan` | plan.md |
| 任务 | `/tasks` | tasks.md |
| 实现 | `/implement` | 代码 + todo-list.md |

## 复杂度指南

| 复杂度 | Epic 数 | 任务数 | 方法 |
|--------|---------|--------|------|
| 简单 | 2-3 | 5-10 | SDD 2.5（Brief） |
| 中等 | 3-5 | 10-20 | 混合 |
| 复杂 | 5-8 | 20-40 | SDD 2.0（Full） |
| 企业级 | 8+ | 40+ | 多阶段 SDD 2.0 |

## 相关命令

- `/execute-task [task-id] --until-finish` - 执行任务/epic 直到完成
- `/brief`、`/research`、`/specify`、`/plan`、`/tasks`、`/implement`、`/audit`
