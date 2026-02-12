# 生成规则命令指南

使用 `/generate-rules` 命令自动为项目生成编码规则的完整指南。

---

## 概述

`/generate-rules` 命令会分析你的代码库，检测技术栈，并生成遵循 10X 开发原则（DRY、KISS、模块化）和语言/框架最佳实践的全面编码规则。

---

## 快速开始

### 基本用法

```bash
# 自动检测并生成规则
/generate-rules
```

这将：
1. 检测你的技术栈（JavaScript、Python、React 等）
2. 分析代码库模式
3. 生成适当的规则文件
4. 分层组织规则

---

## 命令选项

### `--language [lang]`

指定主要语言（覆盖自动检测）：

```bash
/generate-rules --language javascript
/generate-rules --language python
/generate-rules --language typescript
```

**支持的语言:**
- `javascript`
- `typescript`
- `python`
- `java`
- `go`
- `rust`
- `php`
- `ruby`

### `--framework [framework]`

添加框架特定规则：

```bash
/generate-rules --framework react
/generate-rules --framework vue
/generate-rules --framework django
```

**支持的框架:**
- `react`
- `vue`
- `angular`
- `django`
- `express`
- `nextjs`
- `nuxt`
- `rails`
- `spring-boot`

### `--complexity [level]`

覆盖复杂度检测：

```bash
/generate-rules --complexity simple
/generate-rules --complexity medium
/generate-rules --complexity complex
/generate-rules --complexity enterprise
```

### `--update-existing`

更新现有规则而非创建新规则：

```bash
/generate-rules --update-existing
```

这将：
- 读取现有规则文件
- 合并新模式
- 尽可能保留自定义内容

### `--analyze-codebase`

深度代码库分析模式：

```bash
/generate-rules --analyze-codebase
```

这将：
- 分析更多文件
- 提取更多模式
- 生成更详细的项目特定规则

### `--strict`

生成严格规则（更多约束）：

```bash
/generate-rules --strict
```

### `--lenient`

生成灵活规则（更少约束）：

```bash
/generate-rules --lenient
```

### `--no-examples`

规则中不包含代码示例：

```bash
/generate-rules --no-examples
```

---

## 技术检测

### 自动检测

命令通过分析以下内容自动检测技术栈：

**包文件:**
- `package.json` → JavaScript/TypeScript/Node.js
- `requirements.txt` 或 `pyproject.toml` → Python
- `Cargo.toml` → Rust
- `go.mod` → Go
- `pom.xml` 或 `build.gradle` → Java
- `composer.json` → PHP
- `Gemfile` → Ruby

**配置文件:**
- `tsconfig.json` → TypeScript
- `webpack.config.js` → Webpack
- `vite.config.js` → Vite
- `next.config.js` → Next.js

**依赖项:**
- `react` → React
- `vue` → Vue
- `@angular/core` → Angular
- `django` → Django
- `express` → Express

### 手动覆盖

你可以覆盖自动检测：

```bash
/generate-rules --language typescript --framework react
```

---

## 生成的规则文件

### 文件结构

规则分层组织：

```
.cursor/rules/
├── coding-principles.mdc          # 核心 10X 开发原则（始终生成）
├── javascript-rules.mdc           # 如果检测到 JavaScript
├── typescript-rules.mdc           # 如果检测到 TypeScript
├── python-rules.mdc               # 如果检测到 Python
├── react-rules.mdc                # 如果检测到 React
├── vue-rules.mdc                  # 如果检测到 Vue
├── nodejs-rules.mdc               # 如果检测到 Node.js
├── testing-rules.mdc              # 如果检测到测试
├── security-rules.mdc             # 始终包含
├── performance-rules.mdc          # 始终包含
├── api-rules.mdc                  # 如果检测到 API
├── database-rules.mdc             # 如果检测到数据库
└── project-specific.mdc           # 基于代码库分析
```

### 规则类别

**核心原则:**
- DRY（不要重复自己）
- KISS（保持简单）
- 模块化设计
- SOLID 原则

**语言特定:**
- JavaScript/TypeScript 最佳实践
- Python PEP 8 和类型提示
- 语言特定模式

**框架特定:**
- React hooks 和组件
- Vue 组合式 API
- 框架约定

**分类规则:**
- 测试实践
- 安全最佳实践
- 性能优化
- API 设计模式
- 数据库模式

**项目特定:**
- 从代码库检测的模式
- 项目约定
- 团队标准

---

## 工作流程

### 1. 分析阶段

命令分析：
- 技术栈
- 代码库模式
- 项目复杂度
- 现有规则

### 2. 规划阶段

展示计划包括：
- 检测到的技术
- 要生成的规则文件
- 如何处理现有规则
- 包含的规则类别

**交互式问题（Cursor 2.1+）:**
- 确认检测到的技术
- 添加额外的语言/框架
- 覆盖复杂度级别
- 选择规则类别
- 处理现有规则

### 3. 执行阶段

批准后生成规则：
- 核心原则文件
- 语言特定规则
- 框架特定规则
- 分类规则
- 项目特定规则

### 4. 文档阶段

提供摘要：
- 创建的文件
- 如何自定义
- 更新说明

---

## 示例

### 示例 1: React + TypeScript 项目

```bash
/generate-rules
```

**检测到:**
- 语言: TypeScript
- 框架: React
- 测试: Jest
- 构建: Vite

**生成:**
- `coding-principles.mdc`
- `typescript-rules.mdc`
- `react-rules.mdc`
- `testing-rules.mdc`
- `security-rules.mdc`
- `performance-rules.mdc`
- `project-specific.mdc`

### 示例 2: Python Django 项目

```bash
/generate-rules --analyze-codebase
```

**检测到:**
- 语言: Python
- 框架: Django
- 测试: pytest

**生成:**
- `coding-principles.mdc`
- `python-rules.mdc`
- `django-rules.mdc`（如果模板存在）
- `testing-rules.mdc`
- `security-rules.mdc`
- `performance-rules.mdc`
- `api-rules.mdc`（如果检测到 REST API）
- `database-rules.mdc`
- `project-specific.mdc`（来自分析的详细内容）

### 示例 3: 更新现有规则

```bash
/generate-rules --update-existing
```

**流程:**
1. 读取现有规则文件
2. 分析代码库中的新模式
3. 将新模式与现有规则合并
4. 保留自定义内容
5. 更新过时的实践

---

## 自定义

### 编辑规则

规则是标准的 `.mdc` 文件。直接编辑它们：

```bash
# 编辑规则文件
code .cursor/rules/javascript-rules.mdc
```

### 添加自定义规则

将项目特定规则添加到 `project-specific.mdc`：

```markdown
## 自定义模式

### 我们团队的约定
- 始终使用 async/await
- 优先使用函数式组件
- 使用 TypeScript 严格模式
```

### 更新规则

在以下情况下重新生成规则：
- 技术栈变更
- 出现新模式
- 最佳实践演进

```bash
/generate-rules --update-existing
```

---

## 集成

### 与 SDD 系统

规则补充 SDD 工作流：
- 在 `/implement` 阶段使用
- 指导代码生成
- 确保一致性

### 与 Cursor

规则应用于所有 AI 交互：
- 自动执行
- 上下文感知建议
- 质量提升

### 与团队

通过团队命令共享规则（Cursor 2.1+）：
- 团队内一致
- 集中管理
- 轻松更新

---

## 故障排除

### 规则未检测

**问题:** 技术未被检测到

**解决方案:**
- 使用 `--language` 和 `--framework` 选项
- 检查包文件是否存在
- 验证依赖名称

### 现有规则冲突

**问题:** 如何处理现有规则

**解决方案:**
- 在提示时选择合并/替换/备份
- 使用 `--update-existing` 进行合并
- 如有需要，先备份现有规则

### 生成的规则过于严格/宽松

**问题:** 规则不符合项目需求

**解决方案:**
- 使用 `--strict` 或 `--lenient` 选项
- 直接编辑规则文件
- 自定义 `project-specific.mdc`

---

## 最佳实践

### 何时生成规则

- **新项目:** 在项目开始时生成规则
- **技术变更:** 栈变更时重新生成
- **团队入职:** 为一致性而生成
- **代码审查:** 根据反馈更新规则

### 规则维护

- **定期更新:** 定期重新生成
- **自定义:** 编辑项目特定规则
- **版本控制:** 提交规则文件
- **团队审查:** 与团队一起审查规则

---

## 另请参阅

- [规则模板参考](./RULE_TEMPLATES_REFERENCE.md) - 模板文档
- [SDD 指南](./guidelines.md) - SDD 方法论
- [Cursor 规则格式](https://cursor.com/docs) - Cursor 规则文档

---

**最后更新:** 2025-10-21  
**命令:** `/generate-rules`
