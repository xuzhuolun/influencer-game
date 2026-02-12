# /implement 命令

执行已规划的实现，通过系统化的 Todo 列表执行和持续进度跟踪。

---

## 角色定义

**你是一个实现代理。** 系统化地执行已规划的实现：
- 阅读所有规划文档（plan.md, tasks.md, spec.md）
- 如果不存在则生成 todo-list
- 按顺序执行 todo，尊重依赖关系
- 完成后立即标记每项
- 记录阻塞和偏差
- 编写生产质量的代码

**推荐 Cursor 模式：** Agent

---

## 前置条件

- `./docs/specs/active/[task-id]/` 中有 `plan.md` 文件
- 可选：`tasks.md` 提供详细分解

## 使用方法

```
/implement [task-id]
```

**示例：**
```
/implement user-auth-system
/implement checkout-flow
```

---

## 执行流程

### 阶段 1：分析

按顺序阅读规划文档：
1. `./docs/specs/active/[task-id]/plan.md`（必需）
2. `./docs/specs/active/[task-id]/spec.md`（如存在）
3. `./docs/specs/active/[task-id]/tasks.md`（如存在）
4. `./docs/specs/active/[task-id]/research.md`（如存在）
5. `./docs/specs/active/[task-id]/feature-brief.md`（如存在）

**如果 plan.md 不存在：** 建议先运行 `/plan [task-id]` 或 `/brief [task-id]`。

检查任务目录中是否有现有的 `todo-list.md`。

### 阶段 2：规划

开始前展示实现计划：
- 将要构建什么
- 执行顺序/阶段
- 要创建/修改的文件
- 要遵循的模式
- Todo 列表预览（5-10 个关键项）

**等待用户确认后再继续。**

### 阶段 3：执行

**创建或更新 todo-list.md**，包含：
- 任务阶段
- 带依赖的单项 todo
- 进度日志表

**系统化执行 todo：**
1. 开始前阅读整个 todo-list
2. 按顺序执行，尊重依赖
3. 每项完成后标记：`- [ ]` → `- [x]`
4. 记录阻塞 - 绝不静默跳过
5. 更新进度日志

**对于每个 todo：**
- 展示当前在做什么
- 实现该项
- 标记完成并更新 todo-list
- 进入下一项

**处理阻塞项：**
- 报告原因和需要什么
- 提供选项：跳过、暂停或标记阻塞
- 在 todo-list 中添加 `[BLOCKED: 原因]` 标签

**展示进度** - 每完成 3-5 项后。

### 阶段 4：验证

验证：
- [ ] 所有 todo 已完成或已阻塞
- [ ] 代码遵循项目模式
- [ ] 无 linter 错误
- [ ] 测试通过（如适用）
- [ ] 检查侧边栏的 AI 代码审查

---

## 输出格式

**以此结尾：**

```
✅ 实现完成: [task-id]

**摘要：**
- 已完成: [X]/[Y] 个任务
- 阻塞: [N] 项（如有）
- 创建文件: [数量]
- 修改文件: [数量]

**已构建：**
- [功能/组件 1]
- [功能/组件 2]

**阻塞项（如有）：**
- [项目]: [原因]

**下一步：**
- 运行测试: `[测试命令]`
- 审查变更: 查看侧边栏的 AI 代码审查
- 更新规格: `/evolve [task-id] [发现]`

**文件：**
- Todo 列表: `./docs/specs/active/[task-id]/todo-list.md`
```

## 常见问题

**未找到 plan.md：** 先运行 `/plan [task-id]` 或 `/brief [task-id]`

**Todo 项太大：** 分解为子任务（如："实现认证" → 认证服务、登录接口、登出接口、JWT 生成、中间件）

**阻塞项太多：** 列出阻塞项，优先解决，继续处理独立任务

## 相关命令

- `/plan [task-id]` - 创建实现方案
- `/tasks [task-id]` - 生成任务分解
- `/evolve [task-id]` - 用发现更新规格
- `/brief [task-id]` - 快速规划替代方案
