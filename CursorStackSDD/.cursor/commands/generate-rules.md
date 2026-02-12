# /generate-rules 命令

基于技术栈检测和代码库分析自动生成完整的 Cursor 编码规则。

---

## 角色定义

**编码标准架构师** - 分析项目，检测技术栈，分析代码库模式，生成完整的 Cursor 规则文件，包括语言特定、框架特定和项目特定规则，以及 10X 开发原则（DRY、KISS、SOLID）。

**推荐 Cursor 模式：** Plan

## 使用方法

```
/generate-rules [选项]
```

**选项：**
- `--language [lang]` - 覆盖检测到的语言
- `--framework [framework]` - 添加框架特定规则
- `--analyze-codebase` - 深度分析模式
- `--update-existing` - 更新而非替换
- `--strict` - 更严格的规则执行
- `--lenient` - 更宽松的规则

**示例：**
```
/generate-rules
/generate-rules --language typescript --framework react
/generate-rules --analyze-codebase
/generate-rules --update-existing
```

---

## 执行流程

### 阶段 1：分析

**技术检测：** 检查包文件（package.json、requirements.txt、Cargo.toml、go.mod 等）

**框架检测：** 分析依赖（React、Vue、Next.js、Django、Flask 等）

**代码库分析：** 审查代码组织、命名规范、导入模式、错误处理、测试模式

**现有规则：** 检查 `.cursor/rules/*.mdc` 中要合并或替换的文件

### 阶段 2：规划

**展示检测结果：** 检测到的栈（语言、框架、运行时、测试、构建），代码库分析（结构、模式、规范），以及提议的规则文件（编码原则、语言特定、框架特定、测试、安全、性能、项目特定）。

**选项：** 生成全部新规则、仅生成缺失的、或自定义选择。等待用户批准。

### 阶段 3：执行

**按顺序生成规则文件：**

1. **coding-principles.mdc**（始终包含）- DRY、KISS、SOLID、代码质量、性能意识

2. **语言特定规则**（如 typescript-rules.mdc）- 类型安全、命名规范、最佳实践

3. **框架特定规则**（如 react-rules.mdc）- 组件设计、状态管理、性能、模式

4. **testing-rules.mdc** - 测试结构、覆盖率、Mock

5. **security-rules.mdc** - 输入验证、认证、密钥管理

6. **performance-rules.mdc** - 通用优化、加载、运行时

7. **project-specific.mdc** - 检测到的模式、文件组织、导入规范、自定义规则

## 输出格式

**回复必须以此结尾：**

```
✅ 规则生成成功！

**创建的文件：**
- `.cursor/rules/coding-principles.mdc` - 核心 10X 原则
- `.cursor/rules/[language]-rules.mdc` - [语言] 最佳实践
- `.cursor/rules/[framework]-rules.mdc` - [框架] 模式
- `.cursor/rules/testing-rules.mdc` - 测试实践
- `.cursor/rules/security-rules.mdc` - 安全指南
- `.cursor/rules/performance-rules.mdc` - 性能优化
- `.cursor/rules/project-specific.mdc` - 项目规范

**保留:** `.cursor/rules/sdd-system.mdc` - SDD 系统规则

**总计:** [N] 个规则文件。规则现已对所有 AI 交互生效。

**自定义:** 编辑 `.cursor/rules/` 中的文件或运行 `/generate-rules --update-existing` 刷新
```

---

## 规则文件格式 (.mdc)

```markdown
---
description: 这些规则的简要描述
globs: ["**/*.ts", "**/*.tsx"]  # 适用的文件
alwaysApply: false  # true = 应用到每个请求
---

# 规则类别

## 章节

- 规则 1
- 规则 2
```

---

## 常见问题

**没有包文件：** 询问手动输入技术栈

**现有规则冲突：** 提供合并或并存选项

**框架未识别：** 生成通用语言规则

---

## 相关命令

- `/brief [task-id]` - 创建功能简报
- `/research [task-id]` - 调研模式
- `/implement [task-id]` - 实现（规则在此生效）
