# 规格驱动开发指南 v3.0

## 概览

本项目采用 **Agentic-First 规格驱动开发（Spec-Driven Development, SDD）** 方法论。所有斜杠命令都是给你（AI）的直接指令，你需要使用 Cursor 的原生工具来执行。

## Agentic-First 架构

### 核心原则

1. **斜杠命令即代理指令**：不是描述，而是给你的执行指令  
2. **必须有状态声明**：每条命令开头都要声明当前模式和边界  
3. **自纠协议**：内置错误检测与恢复机制  
4. **计划-批准-执行模式**：创建/修改文件前先展示计划

### 每个命令模板都应包含

| 组件 | 作用 |
|------|------|
| **角色声明（Role Declaration）** | `"You are a [role]. Your job is [purpose]."` |
| **状态声明（State Assertion）** | 当前模式、目的、是否允许实现 |
| **模式边界（Mode Boundaries）** | 明确你会做 / 不会做什么 |
| **自纠协议（Self-Correction）** | 错误检测和恢复流程 |
| **检查点（Checkpoints）** | 完成前的验证关卡 |
| **固定输出（Literal Output）** | 最终输出的精确格式 |

### 自纠协议

当你发现自己犯错时：

```
DETECT: 如果你发现自己在做 [错误类型]...
STOP: 立刻停止错误行为
CORRECT: 输出 "我刚才在 [错误点] 偏离了流程，我会回到 [正确模式]。"
RESUME: 回到正确的工作流
```

需要重点检测的常见错误：
- 在规划模式写实现代码  
- 跳过计划展示直接改文件  
- 信息不足时不提问  
- 未告知用户就进行关键假设  
- 没有检查就声称“文件/功能不存在”

## Cursor 模式集成

### 模式映射

| SDD 命令 | Cursor 模式 | 可用工具 |
|----------|-------------|----------|
| `/brief` | Plan | Codebase, Read, Terminal |
| `/research` | Ask | 仅搜索（只读） |
| `/specify` | Plan | Codebase, Read, Terminal |
| `/plan` | Plan | Codebase, Read, Terminal |
| `/tasks` | Plan | Codebase, Read, Terminal |
| `/implement` | Agent | 所有工具 |
| `/evolve` | Plan | Codebase, Read, Terminal |
| `/upgrade` | Plan | Codebase, Read, Terminal |
| `/refine` | Plan | Codebase, Read, Terminal |
| `/generate-prd` | Plan | Codebase, Read, Terminal |
| `/debug` | Custom (Debug) | 所有搜索、终端、编辑 |
| `/execute-task` | Agent | 所有工具 |
| `/generate-rules` | Plan | Codebase, Read, Terminal |

### 模式切换

用户可以通过 `Cmd+.`（Mac）或 `Ctrl+.`（Windows/Linux）切换模式。

在合适的时候你可以建议切换模式，例如：
- “`/research` 在 Ask 模式下作为只读探索效果最好”
- “`/implement` 需要 Agent 模式才能完整修改文件”

## PLAN 模式集成

### 通用工作流

```
用户命令 → 分析（只读） → 制定计划 → 用户批准 → 执行 → 记录文档
```

### 四个阶段

**阶段 1：分析（只读）**
- 阅读相关文件和上下文
- 在信息不足时提问澄清
- 分析需要完成的工作
- 不进行任何文件修改

**阶段 2：规划（展示计划）**
- 展示详细计划
- 解释思路和方案
- 展示结构与内容预览
- 等待用户确认

**阶段 3：执行（确认后）**
- 按计划创建或修改文件
- 严格遵循模板与规范
- 持续跟踪执行进度

**阶段 4：验证**
- 验证文件已按预期创建/更新  
- 更新追踪/进度文件  
- 输出最终完成摘要

## 工作流层级

### SDD 2.5：轻量级（覆盖约 80% 功能）

#### `/brief` - 30 分钟规划
- **用途**：为快速开发做轻量规划  
- **输出**：`feature-brief.md`  
- **适用**：标准功能、需求相对清晰

#### `/evolve` - 活文档
- **用途**：开发过程中更新规格  
- **输出**：附带变更日志的更新文档  
- **适用**：小范围变更、发现和澄清

#### `/refine` - 交互式打磨
- **用途**：通过对话迭代改进已有文档  
- **输出**：优化后的规格/简报  
- **适用**：优化现有设计和描述

### SDD 2.0：完整规划（约 20% 的复杂功能）

#### `/research` → `/specify` → `/plan` → `/tasks` → `/implement`

适用于复杂、高风险或多团队协作特性：
- 多个团队或角色参与  
- 需要架构级别的调整  
- 有合规/安全/性能等高要求  
- 预计开发周期 ≥ 3 周

### 新增命令

#### `/generate-prd` - 生成 PRD
通过苏格拉底式提问生成产品需求文档：
- **输出**：`full-prd.md` + `quick-prd.md`  
- **适用**：全新产品或重大功能

#### `/debug` - 规格驱动调试/审计
通过对比代码与规格来调查问题：
- **输出**：带严重等级的调试/审计报告  
- **适用**：Bug 调查、质量审计

#### `/generate-rules` - 生成编码规则
基于技术栈检测自动生成 Cursor 规则：
- **输出**：`.cursor/rules/*.mdc`  
- **适用**：新项目、规范初始化

### 项目级规划

#### `/sdd-full-plan`（或 `/pecut-all-in-one`）
创建从 A 到 Z 的完整项目路线图：
- **输出**：`specs/todo-roadmap/` 下的看板数据与任务  
- **适用**：应用级/系统级项目

#### `/execute-task`
执行路线图上的单个任务：
- **输出**：由任务类型决定  
- **适用**：按 DAG 顺序推进实现

## 目录结构

```text
specs/
├── 00-overview.md              # 项目级规格概览
├── active/                     # 开发中的功能
│   └── [task-id]/
│       ├── feature-brief.md    # SDD 2.5 简报
│       ├── research.md         # SDD 2.0 调研
│       ├── spec.md             # SDD 2.0 规格
│       ├── plan.md             # SDD 2.0 技术方案
│       ├── tasks.md            # SDD 2.0 任务分解
│       ├── todo-list.md        # 实现清单
│       └── progress.md         # 开发进度跟踪
├── todo-roadmap/               # 项目路线图
│   └── [project-id]/
│       ├── roadmap.json        # 看板数据
│       ├── roadmap.md          # 人类可读视图
│       ├── tasks/              # 单独任务文件
│       └── execution-log.md    # 执行日志
├── completed/                  # 已完成功能
└── backlog/                    # 未来功能

.cursor/
├── commands/                   # SDD 斜杠命令
│   ├── _shared/                # 共享代理协议
│   │   ├── agent-manual.md     # 通用说明
│   │   ├── self-correction.md  # 自纠协议
│   │   └── cursor-modes.md     # Cursor 模式参考
│   ├── brief.md
│   ├── research.md
│   ├── specify.md
│   ├── plan.md
│   ├── tasks.md
│   ├── implement.md
│   ├── evolve.md
│   ├── upgrade.md
│   ├── refine.md
│   ├── generate-prd.md
│   ├── debug.md
│   ├── generate-rules.md
│   ├── sdd-full-plan.md
│   └── execute-task.md
└── rules/
    └── sdd-system.mdc          # 全局 SDD 规则（alwaysApply）
```

## Task ID 约定

- **使用语义化 slug**：如 `user-auth-system`、`payment-integration`、`dashboard-redesign`  
- **避免纯编号**：如 `feat-001`（仅作为遗留方式）  
- **重点是可读、可搜索、能表达业务含义**

## 质量标准

### 规格应包含
- 清晰的用户故事 + 验收标准  
- 业务需求与约束  
- 成功指标（业务/技术）  
- 边界情况与错误场景  
- 明确的不在范围（Out of Scope）

### 方案应包含
- 架构图（文本或 Mermaid）  
- 技术栈及其选择理由  
- 数据模型与 API 契约  
- 安全与性能方面的考虑  
- 风险评估与缓解策略

### 任务应包含
- 清晰、可执行的描述  
- 预估工作量  
- 依赖关系  
- 每个任务的完成标准（验收条件）

## 实现规则

**对 AI 助手来说是硬性要求：**  
Todo-list 不是“建议”，而是**必须系统化执行的清单**。

### Todo 执行规则
1. **开始前完整阅读整个列表**  
2. **按顺序执行**——严格尊重依赖关系  
3. **完成后立刻标记**：`- [ ]` → `- [x]`  
4. **有阻塞必须记录**——使用 `[BLOCKED: 原因]`，不能悄悄跳过  
5. **持续更新进度**——包括进度文件/日志

### 需要避免的反模式
- 不说明原因就跳过任务  
- 未完成就标记为已完成  
- 未记录原因就偏离既定方案实现  
- 完成工作后忘记更新复选框

## 最佳实践

1. **选择正确的起点：**  
   - `/brief`：80% 的一般功能  
   - `/sdd-full-plan`：完整应用或大项目  
   - `/research` + `/specify`：高复杂度/高风险功能  

2. **用 `/evolve` 实时维护规格**，确保文档与实现同步  

3. **用 `/refine` 进行迭代打磨**，而不是反复从零写文档  

4. **当发现复杂度升级时，使用 `/upgrade`** 把 brief 升级成完整 SDD 2.0 套件  

5. **用 `/debug` 做系统化问题排查与审计**，而不是零散查看代码  

6. **新项目使用 `/generate-rules` 生成编码规则**，统一团队约束  

## 参考

- **共享协议**：`.cursor/commands/_shared/`  
- **实现指南**：`.sdd/IMPLEMENTATION_GUIDE.md`  
- **路线图格式规范**：`.sdd/ROADMAP_FORMAT_SPEC.md`  
