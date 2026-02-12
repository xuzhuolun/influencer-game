# 执行模式增强说明（Execution Mode Enhancement）

**特性:** 让用户在「逐个执行」与「一次性全部执行」之间进行选择  
**日期:** 2025-10-21  
**状态:** ✅ 已完成

---

## 概览

在 `/sdd-full-plan` 与 `/pecut-all-in-one` 命令中增加了一个交互步骤：  
在路线图规划通过后，询问用户希望如何创建任务：
- 按步骤逐个创建（One-by-One）——适合学习和细致审查  
- 一次性全部创建（Immediate）——适合熟练用户快速搭建  

## 改动内容

### 之前
- 路线图方案一旦确认，命令会**直接生成所有任务**，不再与用户确认执行方式。

### 现在
- 命令会先询问用户期望的执行模式：
  - **选项 A：逐个处理（One-by-One Processing）** —— 交互式、一步一步创建任务  
  - **选项 B：立即执行（Immediate Execution）** —— 一次性生成所有任务  

## 为什么要加这个能力？

### 对「学习/探索」用户
- **One-by-One 模式**有利于：
  - 逐个审查每个 Epic / Task  
  - 更好地理解项目结构与依赖关系  
  - 在每一步都能调整方案  

### 对「熟练/有经验」用户
- **Immediate 模式**可以：
  - 在数秒内创建完整路线图  
  - 一次性看到全部任务  
  - 立即进入团队协作阶段  

## 实现细节

### 交互提示文案

在路线图方案（plan）被用户确认后，AI 会询问：

```text
How would you like to proceed with task creation?

Option A: One-by-One Processing (Recommended for learning)
- Review and approve each task as it's created
- Understand each phase before moving forward
- Interactive, step-by-step learning about your project
- Best for: New projects, learning, thorough review

Option B: Immediate Execution
- Generate all tasks at once after roadmap approval
- Fast, automated task creation
- Quick setup for experienced users
- Best for: Well-understood projects, experienced teams

Which mode would you prefer? (A/B or 'one-by-one'/'immediate')
```

> 中文理解即可，命令与输出保持英文，方便后续对照上游版本。

### One-by-One 模式流程

1. 创建路线图骨架（基本结构）  
2. 展示第一个 Epic / Task 的计划  
3. 等待用户确认  
4. 用户同意后创建对应任务  
5. 展示当前进度汇总  
6. 展示下一个任务供确认  
7. 如此循环直至所有任务都被处理  
8. 过程中允许切换为 Immediate 模式  

**示例：**

```text
Epic 1: Research & Foundation
- Task 1-1: Research patterns (8h)
- Task 1-2: Define architecture (16h)
Create this epic? (Yes/No/Skip)

→ User: Yes

✅ Epic 1 created!
Progress: 1/5 epics (20%)
Ready for Epic 2?
```

### Immediate 模式流程

1. 一次性生成完整的 `roadmap.json`（包含所有任务）  
2. 为每个任务创建对应的 JSON 文件  
3. 生成完整的 `roadmap.md`  
4. 初始化 `execution-log.md`（执行日志）  
5. 更新索引/注册信息  
6. 输出简洁的汇总信息  

**示例：**

```text
✅ Roadmap created!

Total epics: 5
Total tasks: 20
All tasks ready for execution!
Start with: /execute-task epic-001
```

### 模式切换（中途变更）

执行过程中，用户可以随时从 One-by-One 切到 Immediate：

```text
You've created 3 of 8 epics so far.
Would you like to:
- Continue one-by-one (recommended)
- Switch to immediate mode (create remaining 5 epics now)
- Pause and review what we have so far
```

---

## 修改的文件

1. **`.cursor/commands/sdd-full-plan.md`**
   - 在 Phase 1 中新增「执行模式选择」提问  
   - 在 Phase 3 中分别描述两种执行模式的具体流程  
   - 在 AI 使用说明中加入模式选择注意事项  
   - 强化 Phase 4 文档说明  

2. **`.cursor/commands/pecut-all-in-one.md`**
   - 补充执行模式说明  
   - 明确「仅创建路线图」与「创建并执行」的差异  

3. **`.sdd/FULL_PLAN_EXAMPLES.md`**
   - 新增包含执行模式选择的完整示例  
   - 更新 Tips & Best Practices 部分  

---

## 带来的收益

### 对用户
- ✅ **可控性（Control）**：掌控路线图任务创建节奏  
- ✅ **可学习性（Learning）**：One-by-One 有利于理解项目与依赖  
- ✅ **效率（Speed）**：Immediate 适合已经成型的需求与团队  
- ✅ **灵活性（Flexibility）**：中途可切换模式  

### 对 AI 助手
- ✅ **指令更清晰**：根据模式选择采用不同的执行策略  
- ✅ **尊重用户偏好**：不会强迫某一种工作流  
- ✅ **流程一致性**：不同项目复用同一套模式逻辑  

---

## 使用示例

### 一：逐个执行模式

```bash
/sdd-full-plan blog-platform Full blog with CMS

# AI 展示规划 → 用户批准
# AI 询问执行模式: "One-by-One or Immediate?"
# 用户选择: "Option A - One-by-One"
# AI 按 Epic 逐个创建任务
```

### 二：立即执行模式

```bash
/pecut-all-in-one notifications Add email notifications

# AI 展示规划 → 用户批准
# AI 询问执行模式: "One-by-One or Immediate?"
# 用户选择: "Option B - Immediate"
# AI 一次性创建所有任务
```

---

## 最佳实践建议

### 何时使用 One-by-One
- 🎓 在**了解新项目/新领域**时  
- 🔍 第一次规划这类项目，希望看清每一步  
- 🧐 需要逐阶段地理解结构与依赖  
- 📝 规划过程中预计会不断调整方案  
- ⚠️ 领域复杂或风险较高  

### 何时使用 Immediate
- ⚡ 项目与需求**已经高度清晰**  
- 🏃 需要快速搭建看板和任务结构  
- 👥 团队已就绪，马上要进入协作开发  
- ✅ 已经熟悉 SDD 工作流  
- 📊 希望一开始就看到完整任务图景  

---

## 质量保证

- [x] 提问发生在路线图方案通过之后  
- [x] 两种模式的行为和差异都有清晰文档  
- [x] 支持中途切换模式  
- [x] 示例覆盖典型用例  
- [x] 对 AI 助手的指令足够明确  
- [x] 尊重用户选择，不强制单一路径  
- [x] 保持向后兼容，不破坏已有使用方式  

---

**状态：** 已可在生产使用  
**影响：** 显著提升用户体验与学习效果  
**向后兼容性：** 100%（未选择时可回退到原有默认行为）

🎊 **Execution Mode Enhancement：执行模式增强已完成！** 🎊

