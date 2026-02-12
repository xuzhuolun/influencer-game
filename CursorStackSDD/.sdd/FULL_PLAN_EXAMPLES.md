# SDD 全面计划示例

本文档提供了在不同复杂度级别使用 `/sdd-full-plan` 和 `/pecut-all-in-one` 命令的全面示例。

---

## 目录

1. [简单功能示例](#示例-1简单功能---用户通知)
2. [中等应用示例](#示例-2中等应用---博客平台)
3. [复杂系统示例](#示例-3复杂系统---电商市场)
4. [执行模式示例](#执行模式示例)
5. [任务执行流程](#任务执行流程)
6. [技巧和最佳实践](#技巧和最佳实践)

## Cursor 2.1 功能

本指南利用 Cursor 2.1 增强功能：

- **交互式问题** - 问题显示在 UI 中（更快的工作流程）
- **计划搜索** - 使用 ⌘+F 在计划内搜索
- **AI 代码审查** - 实现后自动审查
- **即时 Grep** - 更快的代码库搜索
- **后台规划** - 工作时创建计划
- **多代理** - 并行任务执行
- **团队命令** - 共享的团队命令

---

## 示例 1：简单功能 - 用户通知

### 场景
向现有应用程序添加邮件和推送通知。

### 命令
```bash
/sdd-full-plan user-notifications 添加带用户偏好的邮件和推送通知
```

### AI 分析阶段

```
分析项目...
- 类型：功能添加
- 复杂度：简单
- 预估时间：2 周
- 团队：1-2 名开发者
- 方法：SDD 2.5（简报）

问题：
1. 什么类型的通知？（邮件、推送、应用内？）
2. 现有的通知基础设施？
3. 需要用户偏好管理吗？
```

### 用户回复
```
1. 目前只需邮件和推送
2. 我们有 SendGrid 用于邮件，需要设置推送
3. 是的，用户应该能控制通知类型
```

### AI 计划展示

```markdown
# /sdd-full-plan user-notifications 的计划

## 项目分析
- **类型：** 功能
- **复杂度：** 简单
- **时间：** 2 周（80 小时）
- **团队：** 1-2 名开发者
- **方法：** SDD 2.5 简报

## 路线图结构

### 史诗 1：通知基础设施（第 1 周）
- 子任务：研究通知模式（8小时）
- 子任务：设置推送通知服务（16小时）
- 子任务：设计通知偏好模型（8小时）
- 子任务：创建通知 API（16小时）

### 史诗 2：用户偏好和测试（第 2 周）
- 子任务：构建偏好 UI（16小时）
- 子任务：实现通知触发器（8小时）
- 子任务：测试和优化（8小时）

**总计：3 个史诗，7 个子任务，80 小时**

## 文件结构
```
specs/todo-roadmap/user-notifications/
├── roadmap.json
├── roadmap.md
├── tasks/
│   ├── epic-001.json
│   ├── task-001-1.json
│   └── ...
└── execution-log.md
```

## 集成
- 史诗 1 任务 → /brief（快速规格）
- 实现 → /implement
- 更新 → /evolve

批准此计划？
```

### 用户批准
```
批准！开始吧。
```

### 执行模式选择

**AI 询问：**
```
你想如何继续任务创建？

选项 A：逐个处理（推荐用于学习）
- 在创建每个任务时审查和批准
- 在继续前理解每个阶段
- 交互式、逐步了解你的项目
- 最适合：新项目、学习、彻底审查

选项 B：立即执行
- 在路线图批准后一次生成所有任务
- 快速、自动化的任务创建
- 为有经验的用户快速设置
- 最适合：充分理解的项目、有经验的团队

你更喜欢哪种模式？（A/B 或 '逐个'/'立即'）
```

**用户回复 - 逐个模式：**
```
选项 A - 逐个
我想在进行中了解每个阶段。
```

**用户回复 - 立即模式：**
```
选项 B - 立即
我很了解这个项目，一次创建所有内容。
```

### 生成的路线图（roadmap.json 摘录）

```json
{
  "id": "user-notifications",
  "title": "用户通知系统",
  "description": "添加带用户偏好的邮件和推送通知",
  "type": "feature",
  "complexity": "simple",
  "metadata": {
    "sddVersion": "2.5",
    "planMode": true,
    "estimatedDuration": "2 weeks",
    "complexity": "simple"
  },
  "tasks": {
    "epic-001": {
      "id": "epic-001",
      "title": "通知基础设施",
      "type": "epic",
      "priority": "high",
      "estimatedHours": 48,
      "subtasks": ["task-001-1", "task-001-2", "task-001-3", "task-001-4"],
      "sdd": {
        "phase": "brief",
        "commands": ["/brief"],
        "executeCommand": "/execute-task epic-001"
      }
    },
    "task-001-1": {
      "id": "task-001-1",
      "title": "研究通知模式",
      "description": "研究现有的通知实现和最佳实践",
      "type": "subtask",
      "parentId": "epic-001",
      "priority": "high",
      "complexity": "low",
      "estimatedHours": 8,
      "dependencies": [],
      "sdd": {
        "phase": "research",
        "commands": ["/research"],
        "linkedSpec": null,
        "executeCommand": "/execute-task task-001-1"
      }
    }
  }
}
```

### 执行流程

```bash
# 步骤 1：开始第一个任务
/execute-task task-001-1

# AI 运行研究阶段
# 创建：specs/active/task-001-1/research.md
# 更新：roadmap.json 状态 → review

# 步骤 2：继续下一个任务
/execute-task task-001-2

# 以此类推...
```

---

## 示例 2：中等应用 - 博客平台

### 场景
从头构建一个功能齐全的博客平台。

### 命令
```bash
/sdd-full-plan blog-platform 带 CMS、用户管理、评论和分析的完整博客
```

### AI 分析阶段

```
分析项目...
- 类型：应用程序
- 复杂度：中等
- 预估时间：6 周
- 团队：3-4 名开发者
- 方法：混合 SDD（2.5 + 2.0）

问题：
1. 目标用户？（博主、组织、两者？）
2. 首选技术栈？
3. 关键功能优先级？
4. 托管/部署目标？
5. 预算/时间限制？
```

### 用户回复
```
1. 主要是个人博主
2. 首选 Node.js/React
3. 必须有：帖子、评论、基本分析
4. AWS 部署
5. 6 周内上线
```

### AI 计划展示

```markdown
# /sdd-full-plan blog-platform 的计划

## 项目分析
- **类型：** 应用程序
- **复杂度：** 中等
- **时间：** 6 周（240 小时）
- **团队：** 3-4 名开发者
- **方法：** 混合 SDD

## 路线图结构

### 史诗 1：研究与基础（第 1 周）
- 研究 CMS 模式（8小时）
- 定义系统架构（16小时）
- 创建技术规格（16小时）
- 数据库架构设计（8小时）

### 史诗 2：核心博客功能（第 2-3 周）
- 用户认证系统（24小时）
- 帖子创建和编辑（32小时）
- 富文本编辑器集成（16小时）
- 媒体上传处理（16小时）

### 史诗 3：互动功能（第 4 周）
- 评论系统（24小时）
- 用户资料（16小时）
- 基本分析（16小时）

### 史诗 4：管理员和 CMS（第 5 周）
- 管理员仪表板（24小时）
- 内容管理（16小时）
- 用户管理（16小时）

### 史诗 5：部署和上线（第 6 周）
- AWS 设置（8小时）
- 性能优化（16小时）
- 安全加固（8小时）
- 文档（8小时）

**总计：5 个史诗，20 个子任务，240 小时**

## 每个史诗的 SDD 方法
- 史诗 1：完整 SDD 2.0（研究 → 规格 → 计划）
- 史诗 2-4：每个主要功能的简报
- 史诗 5：专注于实现

批准此计划？
```

### 生成的路线图（roadmap.json 摘录）

```json
{
  "id": "blog-platform",
  "title": "功能齐全的博客平台",
  "description": "带 CMS、用户管理和分析的完整博客平台",
  "type": "application",
  "complexity": "medium",
  "metadata": {
    "sddVersion": "2.5",
    "estimatedDuration": "6 weeks",
    "teamSize": 3
  },
  "columns": [
    {
      "id": "todo",
      "title": "待办",
      "tasks": ["epic-001", "epic-002"]
    },
    {
      "id": "in-progress",
      "title": "进行中",
      "tasks": []
    },
    {
      "id": "review",
      "title": "审查",
      "tasks": []
    },
    {
      "id": "done",
      "title": "完成",
      "tasks": []
    }
  ],
  "tasks": {
    "epic-001": {
      "id": "epic-001",
      "title": "研究与基础",
      "type": "epic",
      "priority": "critical",
      "estimatedHours": 48,
      "subtasks": ["task-001-1", "task-001-2", "task-001-3", "task-001-4"],
      "sdd": {
        "phase": "research",
        "commands": ["/research", "/specify", "/plan"],
        "executeCommand": "/execute-task epic-001"
      },
      "dependencies": []
    },
    "epic-002": {
      "id": "epic-002",
      "title": "核心博客功能",
      "type": "epic",
      "priority": "high",
      "estimatedHours": 88,
      "subtasks": ["task-002-1", "task-002-2", "task-002-3", "task-002-4"],
      "dependencies": ["epic-001"],
      "sdd": {
        "phase": "implementation",
        "commands": ["/brief", "/implement"],
        "executeCommand": "/execute-task epic-002"
      }
    }
  },
  "statistics": {
    "totalTasks": 20,
    "todoTasks": 20,
    "totalEstimatedHours": 240,
    "completionPercentage": 0
  }
}
```

### 任务依赖示例

```json
{
  "task-002-1": {
    "id": "task-002-1",
    "title": "用户认证系统",
    "dependencies": ["task-001-3"],
    "status": "blocked",
    "blockers": [
      {
        "id": "blocker-001",
        "description": "等待数据库架构设计完成",
        "blockedBy": "task-001-3"
      }
    ]
  }
}
```

---

## 示例 3：复杂系统 - 电商市场

### 场景
构建一个带支付、物流和供应商管理的多供应商市场。

### 命令
```bash
/pecut-all-in-one ecommerce-marketplace 带支付处理、物流集成、供应商管理和分析的多供应商市场平台
```

### AI 分析阶段

```
分析项目...
- 类型：系统/平台
- 复杂度：复杂
- 预估时间：16 周
- 团队：8-10 名开发者
- 方法：完整 SDD 2.0

问题：
1. 目标市场？（B2C、B2B、两者？）
2. 支付提供商？（Stripe、PayPal 等）
3. 需要物流集成吗？
4. 供应商入驻流程？
5. 合规要求？（PCI、GDPR 等）
6. 需要移动应用吗？
7. 国际支持？
```

### 用户回复
```
1. 主要 B2C，之后 B2B
2. Stripe + PayPal + Apple Pay
3. 是 - FedEx、UPS、USPS
4. 带审批流程的自助服务
5. PCI SAQ A-EP，GDPR 合规
6. 第 2 阶段
7. 是 - 多币种、多语言
```

### AI 计划展示

```markdown
# /pecut-all-in-one ecommerce-marketplace 的计划

## 项目分析
- **类型：** 平台
- **复杂度：** 复杂
- **时间：** 16 周（640 小时）
- **团队：** 8-10 名开发者
- **方法：** 完整 SDD 2.0

## 关键考虑事项
- PCI 合规要求
- 多供应商复杂性
- 支付提供商集成
- 国际支持

## 路线图结构

### 阶段 1：研究与架构（第 1-2 周）
**史诗 1：系统研究**（40小时）
- 研究市场模式
- 支付提供商比较
- 物流集成分析
- 合规要求研究

**史诗 2：系统架构**（40小时）
- 多租户架构设计
- 支付处理架构
- 数据模型设计
- 安全架构

### 阶段 2：核心平台（第 3-6 周）
**史诗 3：用户管理**（64小时）
- 客户认证
- 供应商认证
- 管理员角色
- 权限系统

**史诗 4：产品管理**（80小时）
- 产品目录
- 库存管理
- 分类系统
- 搜索和筛选

**史诗 5：供应商门户**（64小时）
- 供应商仪表板
- 产品管理
- 订单管理
- 分析

### 阶段 3：交易处理（第 7-10 周）
**史诗 6：购物车**（48小时）
- 购物车功能
- 结账流程
- 多供应商购物车处理

**史诗 7：支付处理**（80小时）
- Stripe 集成
- PayPal 集成
- Apple Pay 集成
- PCI 合规实现

**史诗 8：订单管理**（64小时）
- 订单处理
- 订单跟踪
- 供应商订单分发

### 阶段 4：履约（第 11-12 周）
**史诗 9：物流集成**（64小时）
- FedEx API 集成
- UPS API 集成
- USPS API 集成
- 运费计算
- 标签生成

### 阶段 5：平台功能（第 13-14 周）
**史诗 10：评价与评分**（32小时）
**史诗 11：通知**（32小时）
**史诗 12：分析仪表板**（48小时）

### 阶段 6：部署与上线（第 15-16 周）
**史诗 13：基础设施设置**（40小时）
**史诗 14：安全加固**（40小时）
**史诗 15：性能优化**（40小时）
**史诗 16：文档与培训**（24小时）

**总计：16 个史诗，60+ 个子任务，640 小时**

## 开发阶段
1. **基础**（第 1-2 周）：研究 + 架构
2. **核心**（第 3-6 周）：用户 + 产品 + 供应商
3. **交易**（第 7-10 周）：购物车 + 支付 + 订单
4. **履约**（第 11-12 周）：物流
5. **功能**（第 13-14 周）：评价 + 分析
6. **上线**（第 15-16 周）：部署

## 团队结构建议
- **2 名后端开发** - API 和服务
- **2 名前端开发** - 客户 UI
- **1 名前端开发** - 供应商门户
- **1 名 DevOps 工程师** - 基础设施
- **1 名安全工程师** - 合规与安全
- **1 名 QA 工程师** - 测试
- **1 名项目经理** - 协调

## 关键路径
```
史诗 1 → 史诗 2 → 史诗 3 → 史诗 4 → 史诗 6 → 史诗 7 → 史诗 8 → 史诗 9
```

批准此计划？
```

### 生成的路线图结构

```json
{
  "id": "ecommerce-marketplace",
  "title": "多供应商电商市场",
  "type": "platform",
  "complexity": "complex",
  "metadata": {
    "sddVersion": "2.5",
    "estimatedDuration": "16 weeks",
    "teamSize": 8,
    "tags": ["ecommerce", "marketplace", "payments", "shipping", "pci-compliance"]
  },
  "tasks": {
    "epic-001": {
      "id": "epic-001",
      "title": "系统研究",
      "type": "epic",
      "priority": "critical",
      "complexity": "complex",
      "estimatedHours": 40,
      "subtasks": [
        "task-001-1",
        "task-001-2",
        "task-001-3",
        "task-001-4"
      ],
      "sdd": {
        "phase": "research",
        "commands": ["/research"],
        "executeCommand": "/execute-task epic-001"
      },
      "dependencies": [],
      "tags": ["phase-1", "foundation", "research"]
    },
    "epic-007": {
      "id": "epic-007",
      "title": "支付处理",
      "type": "epic",
      "priority": "critical",
      "complexity": "complex",
      "estimatedHours": 80,
      "subtasks": [
        "task-007-1",
        "task-007-2",
        "task-007-3",
        "task-007-4",
        "task-007-5"
      ],
      "dependencies": ["epic-006"],
      "sdd": {
        "phase": "specification",
        "commands": ["/specify", "/plan", "/tasks", "/implement"],
        "executeCommand": "/execute-task epic-007"
      },
      "tags": ["phase-3", "critical", "payment", "pci-compliance"],
      "markdown": "## 支付处理系统\n\n**关键功能**\n\n实现具有 PCI 合规性的安全多提供商支付处理。\n\n### 提供商\n- Stripe（主要）\n- PayPal（备选）\n- Apple Pay（便捷）\n\n### 合规\n- PCI SAQ A-EP\n- 安全令牌化\n- 不存储原始卡数据\n\n### 安全\n- 3D Secure\n- 欺诈检测\n- 速率限制\n- 审计日志"
    }
  }
}
```

---

## 执行模式示例

### 逐个模式演练

**用户选择选项 A：**

```
AI：你想如何继续？
    - 选项 A：逐个处理
    - 选项 B：立即执行

用户：选项 A - 我想逐步学习

AI：太好了！让我们一次创建一个史诗的任务。

📋 史诗 1/5：研究与基础

此史诗包括：
- 任务 1-1：研究 CMS 模式（8小时）
- 任务 1-2：定义架构（16小时）
- 任务 1-3：创建规格（16小时）

总计：3 个任务，40 小时
SDD 阶段：研究 → 规格

创建此史诗？（是/否/跳过）

用户：是

AI：✅ 史诗 1 已创建！
    - 添加了 3 个任务到 roadmap.json
    - 创建了任务 JSON 文件
    - 更新了 roadmap.md

    进度：1/5 史诗（20%）
    任务：3/20 已创建
    小时：40/240 预估

    准备好史诗 2：核心博客功能了吗？

用户：是，继续

AI：📋 史诗 2/5：核心博客功能
    ...
```

**展示的优势：**
- 在创建前了解每个阶段
- 在学习中调整方法
- 增量审查进度
- 随时切换到立即模式

### 立即模式演练

**用户选择选项 B：**

```
AI：你想如何继续？
    - 选项 A：逐个处理
    - 选项 B：立即执行

用户：选项 B - 一次创建所有内容

AI：正在生成完整路线图...

✅ 路线图已创建！

史诗总数：5
任务总数：20
子任务总数：45
预估时间：6 周
预估工作量：240 小时

创建的文件：
- roadmap.json（包含所有任务）
- roadmap.md（完整视图）
- tasks/epic-001.json 到 epic-005.json
- tasks/task-001-1.json 到 task-020.json
- execution-log.md（模板）

所有任务准备好执行！
从以下开始：/execute-task epic-001
```

**展示的优势：**
- 立即获得完整路线图
- 从一开始所有任务可见
- 为有经验的用户快速设置
- 准备好团队协作

## 任务执行流程

### 示例：执行研究任务

```bash
# 步骤 1：执行任务
/execute-task task-001-1
```

**AI 响应：**
```
分析任务 task-001-1...

任务：研究市场模式
阶段：研究
状态：待办
依赖：✅ 全部满足

执行计划：
1. 运行：/research task-001-1 "研究现有市场平台"
2. 创建：specs/active/task-001-1/research.md
3. 更新：roadmap.json
4. 记录：execution-log.md

批准执行？
```

**用户：** `是`

**AI 执行：**
```
运行 /research task-001-1...

[使用 PLAN 模式的研究阶段]
→ 创建 research.md
→ 记录发现的模式
→ 添加建议

✅ 研究完成！

更新路线图：
- task-001-1：待办 → 审查
- linkedSpec：specs/active/task-001-1
- 列移动：待办 → 审查

下一个可用：task-001-2（准备执行）
```

### 示例：带依赖的执行

```bash
# 尝试执行有未满足依赖的任务
/execute-task task-002-1
```

**AI 响应：**
```
❌ 无法执行 task-002-1

原因：依赖未满足
- 依赖于：task-001-3（状态：进行中）

建议：
1. 先完成 task-001-3
2. 或检查 task-001-3 是否实际完成并更新状态

可用任务：
- task-001-2（无依赖）
- task-001-4（无依赖）
```

---

## 技巧和最佳实践

### 0. 选择执行模式

**选择逐个模式当：**
- ✅ 学习项目结构
- ✅ 想在创建前理解每个阶段
- ✅ 需要在学习中调整方法
- ✅ 首次使用完整规划
- ✅ 复杂或不熟悉的项目领域

**选择立即模式当：**
- ✅ 充分理解的项目
- ✅ 有 SDD 工作流程经验
- ✅ 需要快速设置
- ✅ 准备好与团队协作
- ✅ 想立即获得完整路线图

**记住：** 如果需要，你可以在过程中切换模式！

### 1. 选择正确的复杂度

**使用简单** 当：
- 单个功能添加
- 1-2 周时间线
- 1-2 名开发者
- 充分理解的领域
- 示例：添加导出功能

**使用中等** 当：
- 完整应用程序
- 4-8 周时间线
- 3-5 名开发者
- 一些未知数
- 示例：博客平台

**使用复杂** 当：
- 平台/系统
- 10+ 周时间线
- 6+ 名开发者
- 许多未知数
- 合规要求
- 示例：市场

### 2. 任务粒度

**良好的任务大小：** 4-16 小时（0.5-2 天）
**太小：** 1-2 小时（创建开销）
**太大：** 40+ 小时（难以跟踪）

**示例 - 良好：**
```
- 实现用户认证（16小时）
  ├── 设置认证服务（8小时）
  └── 创建登录/注册 UI（8小时）
```

**示例 - 太细：**
```
- 创建登录按钮（1小时）
- 添加点击处理器（1小时）
- 样式按钮（1小时）
```

### 3. 依赖管理

**清晰的依赖：**
```json
{
  "task-003": {
    "dependencies": ["task-001", "task-002"],
    "description": "依赖于认证（task-001）和数据库（task-002）"
  }
}
```

**避免循环：**
```json
// ❌ 错误
{
  "task-A": {"dependencies": ["task-B"]},
  "task-B": {"dependencies": ["task-A"]}
}
```

### 4. 有效使用 SDD 命令

**研究阶段：**
- 用于新领域
- 模式发现
- 技术评估

**简报阶段：**
- 快速功能
- 充分理解的范围
- 快速迭代

**完整 SDD：**
- 复杂功能
- 合规要求
- 多团队协调

### 5. 进度跟踪

**定期更新：**
```bash
# 标记任务完成
/execute-task task-001-1
# 系统自动更新状态

# 跟踪小时
# 在 roadmap.json 中更新 actualHours

# 记录阻塞
# 添加到 task.blockers 数组
```

### 6. 团队协作

**分配任务：**
```json
{
  "task-001": {
    "assignee": "developer-1",
    "priority": "high"
  }
}
```

**跟踪评论：**
```json
{
  "comments": [
    {
      "author": "developer-2",
      "content": "需要澄清 API 结构",
      "created": "2025-10-21T10:00:00Z"
    }
  ]
}
```

---

## 与 VSCode 扩展集成

### 未来扩展功能

**阶段 1：只读视图**
```typescript
// 从 roadmap.json 显示看板
showKanbanBoard(projectId);
```

**阶段 2：交互式**
```typescript
// 在列之间拖动任务
moveTask(taskId, fromColumn, toColumn);

// 通过 UI 执行任务
executeTaskFromUI(taskId);
```

**阶段 3：实时**
```typescript
// 跨团队同步更改
syncRoadmapChanges();
```

---

## 常见模式

### 模式 1：向现有应用添加功能

```bash
/sdd-full-plan feature-name 简要描述
→ 简单复杂度
→ 1-2 个史诗
→ SDD 2.5 方法
```

### 模式 2：新应用程序

```bash
/pecut-all-in-one app-name 包含关键功能的全面描述
→ 中等复杂度
→ 4-8 个史诗
→ 混合 SDD 方法
```

### 模式 3：平台/系统

```bash
/sdd-full-plan platform-name 包含集成和合规的详细描述
→ 复杂复杂度
→ 10+ 个史诗
→ 完整 SDD 2.0 工作流程
```

---

## 下一步

1. **尝试你的第一个路线图：**
   ```bash
   /sdd-full-plan test-project 完整规划功能的简单测试
   ```

2. **审查生成的文件：**
   - `specs/todo-roadmap/test-project/roadmap.md`
   - `specs/todo-roadmap/test-project/roadmap.json`

3. **执行第一个任务：**
   ```bash
   /execute-task epic-001
   ```

4. **跟踪进度：**
   - 检查 roadmap.md 中的看板
   - 审查 execution-log.md
   - 监控完成百分比

---

**有问题？**
- 查看 [sdd-full-plan.md](../.cursor/commands/sdd-full-plan.md) 获取命令详情
- 查看 [ROADMAP_FORMAT_SPEC.md](./ROADMAP_FORMAT_SPEC.md) 获取 JSON 架构
- 查看 [guidelines.md](./guidelines.md) 获取 SDD 方法论

