# /execute-parallel 命令

使用原生 Cursor 子代理进行协调，并行执行多个任务。

**依赖：** 原生子代理（Cursor 2.4+），无需外部 MCP

---

## 使用方法

```
/execute-parallel [project-id]
/execute-parallel [project-id] --epic [epic-id]
/execute-parallel [project-id] --until-finish
```

**示例：**
```
/execute-parallel blog-platform
/execute-parallel saas-dashboard --epic epic-002
/execute-parallel my-project --until-finish
```

---

## 执行流程

### 阶段 1：加载并分析路线图

**步骤 1：读取路线图 DAG**

读取 `./docs/specs/roadmap/[project-id]/roadmap.json` 并提取：
- `dag.roots` - 无依赖的起始任务
- `dag.parallelGroups` - 可同时运行的任务
- 所有任务及其 `dependencies` 和 `status` 字段

**步骤 2：识别就绪任务**

任务就绪的条件：
- 状态为 "todo"
- 所有依赖状态为 "done"
- `canParallelize: true` 允许并行执行

**步骤 3：规划执行批次**

根据以下条件将任务分组为并行批次：
- 依赖满足情况
- 资源需求（文件冲突）
- 预估工作量

### 阶段 2：使用子代理并行执行

**对于每个并行批次：**

使用 Task 工具同时启动多个子代理。每个子代理处理一个任务。

**任务到子代理映射：**

| 任务阶段 | 子代理 | 模型 |
|----------|--------|------|
| research | sdd-explorer | fast |
| brief | sdd-planner | inherit |
| specify | sdd-planner | inherit |
| plan | sdd-planner | inherit |
| tasks | sdd-planner | inherit |
| implement | sdd-implementer | inherit |
| review | sdd-reviewer | fast |
| verify | sdd-verifier | fast |

**执行模式：**

```markdown
## 批次 1（并行）

启动子代理: task-001, task-003, task-005

[Task 工具调用 - 全部在单条消息中以并行执行]

Task: sdd-implementer 处理 task-001
Task: sdd-implementer 处理 task-003  
Task: sdd-explorer 处理 task-005
```

**每个子代理接收：**
- 来自路线图的任务详情
- 相关 spec/plan 文件路径
- 预期交付物
- 状态更新说明

### 阶段 3：进度跟踪

**每个批次完成后：**

1. **收集结果** 从子代理响应
2. **更新 roadmap.json** 状态：
   - `todo` → `in-progress`（开始时）
   - `in-progress` → `review`（实现完成时）
   - `review` → `done`（验证通过时）
3. **使用 sdd-verifier 验证** 实现任务
4. **识别下一批就绪任务** 基于已完成的依赖

**进度报告格式：**

```markdown
## 批次 1 完成

| 任务 | 状态 | 耗时 | 备注 |
|------|------|------|------|
| task-001 | done | 2分 | 文件: src/auth.ts |
| task-003 | done | 3分 | 文件: src/api.ts |
| task-005 | done | 1分 | 调研完成 |

## 下一批就绪
- task-002（依赖满足: task-001）
- task-004（依赖满足: task-003）
```

### 阶段 4：自动验证

**实现任务完成后：**

始终启动 `sdd-verifier` 子代理确认：
- 实现存在且可运行
- 测试通过
- 满足规格需求
- 未完成的工作未标记为完成

```markdown
task-001 验证:
[Task 工具: sdd-verifier 带实现上下文]
```

### 阶段 5：完成

**所有任务完成时：**

1. **最终 roadmap.json 更新：**
   - 所有任务状态: "done"
   - `dag.parallelGroups`: 空
   - 更新统计数据

2. **生成完成报告：**

```markdown
## 并行执行完成

**项目:** [project-id]
**已执行任务:** [N]
**并行批次:** [M]
**总耗时:** [时间]

### 执行时间线
| 批次 | 任务 | 耗时 | 并行度 |
|------|------|------|--------|
| 1 | task-001, task-003, task-005 | 3分 | 3x |
| 2 | task-002, task-004 | 4分 | 2x |
| 3 | task-006 | 2分 | 1x |

### 创建/修改的文件
- `src/auth.ts`: 用户认证
- `src/api.ts`: API 接口
- [...]

### 验证摘要
- 所有实现已验证: 是
- 测试通过: 是
- 规格符合度: 100%

### 下一步
- 在 IDE 中审查变更
- 运行完整测试套件
- 部署到预发布环境
```

---

## 子代理编排

### 启动并行子代理

在单条消息中使用多个 Task 工具调用：

```
Task 1: {
  subagent_type: "generalPurpose",
  prompt: "执行 task-001: [详情]。使用 sdd-implementation skill...",
  model: "inherit"
}

Task 2: {
  subagent_type: "generalPurpose", 
  prompt: "执行 task-003: [详情]。使用 sdd-implementation skill...",
  model: "inherit"
}
```

### 处理阻塞

如果子代理报告阻塞：

1. 在路线图中标记任务为 `blocked`
2. 继续处理非依赖任务
3. 报告阻塞以供用户解决
4. 使用 `--resume` 标志恢复

### 文件冲突预防

当多个任务修改相同文件时：
1. 在批次内按顺序执行这些任务
2. 或重新组织到不同批次
3. 并行执行前验证无冲突

---

## 标志

| 标志 | 描述 |
|------|------|
| `--epic [id]` | 仅执行指定 epic 中的任务 |
| `--until-finish` | 持续执行直到所有任务完成或阻塞 |
| `--resume` | 从最后未完成批次恢复 |
| `--verify` | 每次实现后运行验证 |
| `--dry-run` | 展示执行计划但不运行 |

---

## 错误处理

**如果子代理失败：**
1. 任务在路线图中标记为 `blocked`
2. 捕获错误详情
3. 依赖任务保持阻塞
4. 继续处理独立任务
5. 结束时报告失败

**恢复：**
```
/execute-parallel [project] --resume
```

---

## 相关命令

- `/sdd-full-plan` - 创建带 DAG 的路线图
- `/execute-task` - 按顺序执行单个任务
- `sdd-orchestrator` 子代理 - 详细编排逻辑
- `sdd-verifier` 子代理 - 实现验证
