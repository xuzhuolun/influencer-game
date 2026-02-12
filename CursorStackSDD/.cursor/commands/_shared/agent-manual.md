# SDD 代理手册 (v4.1)

SDD 工作流的综合代理协议。**需要 Cursor 2.4+** 以支持子代理和技能。

---

## 核心原则

1. **计划-批准-执行** - 创建文件前先展示计划
2. **保存输出到 `./docs/specs/`** - 所有规格保存到 specs 目录
3. **验证文件操作** - 确认文件已创建
4. **不确定时提问** - 不要猜测，要澄清
5. **适当委托** - 使用子代理进行上下文隔离

---

## 文件系统结构

```
./docs/specs/
├── 00-overview.md              # 项目整体规格
├── index.md                    # 导航和状态
├── active/                     # 开发中的功能
│   └── [task-id]/
│       ├── feature-brief.md    # 轻量级简报 (SDD 2.5)
│       ├── research.md         # 调研发现 (SDD 2.0)
│       ├── spec.md             # 需求规格 (SDD 2.0)
│       ├── plan.md             # 技术方案 (SDD 2.0)
│       ├── tasks.md            # 任务分解 (SDD 2.0)
│       ├── todo-list.md        # 实现清单
│       └── progress.md         # 开发跟踪
├── todo-roadmap/               # 项目路线图
│   └── [project-id]/
│       ├── roadmap.json        # 看板数据
│       ├── roadmap.md          # 人类可读视图
│       └── tasks/              # 单独任务文件
├── completed/                  # 已交付功能
└── backlog/                    # 未来功能

.cursor/
├── agents/                     # 委托用子代理
├── skills/                     # 领域知识包
├── commands/                   # 斜杠命令
└── hooks/                      # 迭代钩子
```

---

## 子代理 (Cursor 2.4+)

子代理运行在**隔离上下文**中 - 用于会使主对话膨胀的操作。

### 可用子代理

| 子代理 | 用途 | 模型 | 何时使用 |
|--------|------|------|----------|
| `sdd-explorer` | 代码库发现 | fast | 调研前、模式调查 |
| `sdd-planner` | 架构设计 | inherit | 创建方案、任务分解 |
| `sdd-implementer` | 代码生成 | inherit | 执行待办、长实现 |
| `sdd-verifier` | 验证 | fast | 实现后、质量检查 |
| `sdd-reviewer` | 代码审查 | fast | 安全/性能审查 |
| `sdd-orchestrator` | 协调 | inherit | 并行执行、DAG 遍历 |

### 委托指南

**委托给子代理的情况：**
- 需要深度代码库探索（使用 `sdd-explorer`）
- 会消耗大量上下文的长实现（使用 `sdd-implementer`）
- 独立任务可并行运行（使用多个子代理）
- 验证已完成的工作（使用 `sdd-verifier`）
- 完成前的代码审查（使用 `sdd-reviewer`）

**保持在主上下文的情况：**
- 简单、快速的操作（少量工具调用）
- 任务中途需要用户交互
- 需要共享上下文的顺序依赖步骤
- 需要直接用户通信

### 启动子代理

使用 Task 工具启动子代理：

```markdown
[使用 Task 工具：]
- subagent_type: "generalPurpose" 或 "explore"
- prompt: 带上下文的详细指令
- model: "fast" 用于探索，"inherit" 用于复杂工作
```

**并行执行：** 在单条消息中发送多个 Task 工具调用。

### 自动验证

每个实现阶段后，启动 `sdd-verifier`：

```
sdd-implementer 完成 → 启动 sdd-verifier → 验证工作
```

这在标记任务完成前捕获不完整的实现。

---

## 技能 (Cursor 2.4+)

技能根据上下文自动调用或通过 `/skill-name` 手动调用。

### 可用技能

| 技能 | 位置 | 自动调用场景 |
|------|------|-------------|
| `sdd-research` | `.cursor/skills/sdd-research/` | 技术方案不清晰时 |
| `sdd-planning` | `.cursor/skills/sdd-planning/` | 有规格需要方案时 |
| `sdd-implementation` | `.cursor/skills/sdd-implementation/` | 方案准备好执行时 |
| `sdd-audit` | `.cursor/skills/sdd-audit/` | 请求代码审查时 |
| `sdd-evolve` | `.cursor/skills/sdd-evolve/` | 开发中有发现时 |

### 技能结构

技能使用渐进式加载 - 保持主 SKILL.md 聚焦：

```
.cursor/skills/[skill-name]/
├── SKILL.md          # 核心指令（约 50 行）
├── references/       # 按需加载
├── scripts/          # 可执行辅助工具
└── assets/           # 模板、图表
```

### 在子代理中使用技能

子代理可以通过在提示中包含来调用技能：
```
"使用 sdd-implementation 技能来执行 todo-list..."
```

---

## 基于 DAG 的执行

任务组织为有向无环图，带依赖：

- **EPIC 0**: 功能工作前必须完成的前置条件
- **dependencies**: 必须先完成的任务 ID 数组
- **canParallelize**: 任务是否可与同级并行运行
- **parallelGroups**: 可同时执行的任务组

### 并行执行模式

1. 加载 `roadmap.json` 并识别就绪任务
2. 为每个就绪任务启动子代理（并行 Task 工具调用）
3. 收集结果，更新路线图状态
4. 用 `sdd-verifier` 验证实现
5. 识别下一批就绪任务，重复

```markdown
批次 1（并行）: task-001, task-003, task-005
├── sdd-implementer → task-001
├── sdd-implementer → task-003
└── sdd-explorer → task-005

[等待完成]

sdd-verifier → 验证所有实现

批次 2（依赖满足）: task-002, task-004
...
```

---

## 问题处理

| 问题类型 | 行动 |
|----------|------|
| 文件夹缺失 | 自动创建 |
| 任务未找到 | 展示可用选项 |
| 权限拒绝 | 简单解释，建议修复 |
| 子代理阻塞 | 报告阻塞，继续其他 |
| 验证失败 | 报告差距，不标记完成 |

**黄金法则：** 
- 自己修复小问题
- 不确定时提问
- 不要让用户卡住
- 始终验证实现完整性

---

## 命令到子代理映射

| 命令 | 主要子代理 | 使用的技能 |
|------|-----------|-----------|
| `/research` | sdd-explorer | sdd-research |
| `/specify` | sdd-planner | sdd-planning |
| `/plan` | sdd-planner | sdd-planning |
| `/tasks` | sdd-planner | - |
| `/implement` | sdd-implementer | sdd-implementation |
| `/audit` | sdd-reviewer | sdd-audit |
| `/evolve` | - | sdd-evolve |
| `/execute-task` | sdd-implementer | 视情况 |
| `/execute-parallel` | sdd-orchestrator | 视情况 |

---

## 钩子 (Cursor 2.3+)

通过 `.cursor/hooks/` 的简单迭代循环：
- 运行测试直到通过
- 迭代 UI 直到匹配设计
- 修复 linter 错误直到干净

---

## 最佳实践

### 上下文管理
- 使用子代理进行探索以避免上下文膨胀
- 保持主对话聚焦于决策和用户通信
- 让子代理处理冗长操作（测试输出、大型代码库）

### 并行效率
- 尽早识别独立任务
- 在单条消息中启动多个子代理
- 探索任务使用 `model: fast`
- 复杂推理保留 `model: inherit`

### 验证
- 实现后始终验证
- 不检查就不信任"完成"声明
- 可用时运行测试
- 将代码与规格需求对比

---

*SDD 代理手册 v4.1 - Cursor 2.4+（子代理 + 技能）*
