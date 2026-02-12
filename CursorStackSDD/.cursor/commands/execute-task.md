# /execute-task 命令

从项目路线图执行特定任务，自动确定合适的 SDD 命令并更新路线图状态。

**支持 `--until-finish` 标志** 用于自动按顺序执行 epic 中的所有任务。

---

## 角色定义

通过运行合适的 SDD 命令并跟踪进度来执行项目路线图中的任务：
- 读取路线图并定位指定任务
- 验证依赖是否完成
- 确定并执行合适的 SDD 命令
- 更新路线图状态并记录执行
- **使用 `--until-finish`:** 自动继续下一个任务直到 epic 完成

---

## 使用方法

```
/execute-task [task-id] [--until-finish]
```

**示例：**
```
/execute-task epic-001
/execute-task task-001-1
/execute-task epic-001 --until-finish  # 自动按顺序执行
```

**`--until-finish` 标志:** 按顺序执行 epic/子任务，不停止。出错时停止并报告以便修复。

---

## 执行流程

### 阶段 1：分析

1. **查找路线图:** 在 `./docs/specs/roadmap/*/roadmap.json` 中查找
2. **查找任务:** 在路线图中按 ID 定位任务
3. **验证依赖:** 确保所有依赖状态为 "done"
4. **确定 SDD 命令:** 将任务阶段映射到命令：
   - `research` → `/research`
   - `brief` → `/brief`
   - `specification` → `/specify`
   - `planning` → `/plan`
   - `tasks` → `/tasks`
   - `implementation` → `/implement`
   - `evolution` → `/evolve`

### 阶段 2：规划

展示执行计划并等待批准（除非使用 `--until-finish`）。

### 阶段 3：执行

1. **更新状态:** 在 roadmap.json 中将任务状态设为 "in-progress"
2. **执行命令:** 运行合适的 SDD 命令
3. **链接规格:** 用链接的规格路径更新任务
4. **更新状态:** 改为 "review"（或使用 `--until-finish` 时改为 "done"）
5. **记录执行:** 添加条目到 execution-log.md
6. **检查解除阻塞:** 识别现在可以继续的任务

---

## 输出格式

### 标准输出

```
✅ 任务已执行: [task-id]

**摘要：**
- 命令: `/[command] [task-id]`
- 输出: `./docs/specs/active/[task-id]/[file]`
- 状态: review
- 解除阻塞: [数量] 个任务就绪

**下一步:** 审查输出或继续 `/execute-task [next-task]`
```

### `--until-finish` 输出

**每个任务:** `✅ [N/Total] [task-id] 已完成 | 状态: done | 继续中...`

**最终:** 所有任务的摘要表、创建的文件和路线图状态。

**出错时:** 停止并报告错误，提供恢复说明。

---

## `--until-finish` 工作流

1. **识别任务:** 构建按依赖排序的执行队列
2. **预检:** 展示执行计划和预估时间
3. **按顺序执行:** 对每个任务，检查依赖 → 执行 → 标记完成 → 继续
4. **处理错误:** 立即停止，报告错误，等待修复后恢复
5. **完成:** 更新 epic 状态，生成摘要，记录执行时间

---

## 状态流

`todo → in-progress → review → done`（带 `blocked`、`on-hold`、`archived` 变体）

## 依赖管理

- 执行前检查所有依赖状态为 "done"
- 任务完成时，自动解除阻塞依赖任务（从 "blocked" 更新为 "todo"）

## 常见问题

- **循环依赖:** 检测并要求用户打破循环
- **任务进行中:** 询问是继续、重启还是标记完成
- **命令失败:** 记录错误，回滚状态，提供恢复选项
- **错误的任务类型:** 处理 epic 时执行子任务

---

## 相关命令

- `/sdd-full-plan [project-id] --until-finish` - 创建路线图并执行所有任务
- `/brief`、`/research`、`/specify`、`/plan`、`/tasks`、`/implement`、`/evolve`、`/audit`
