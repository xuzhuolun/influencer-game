# 规则模板参考文档

`/generate-rules` 命令使用的所有规则模板的参考文档。

---

## 模板结构

所有模板遵循以下结构：

```markdown
---
alwaysApply: true
---

# [规则类别] 规则

[包含示例和最佳实践的内容]

---

**生成方式：** `/generate-rules` 命令  
**最后更新：** {{DATE}}  
**项目复杂度：** {{COMPLEXITY}}
```

---

## 可用模板

### 核心模板

#### coding-principles.mdc

**用途：** 适用于所有代码的核心 10X 开发者原则

**内容：**
- DRY（不要重复自己）
- KISS（保持简单）
- 模块化设计
- SOLID 原则
- 整洁代码原则
- 代码组织
- 性能考虑
- 安全原则
- 测试原则
- 文档原则

**始终生成：** 是

---

### 语言模板

#### javascript-rules.mdc

**用途：** JavaScript 最佳实践和规范

**内容：**
- 现代 JavaScript 特性（ES6+）
- Async/await 模式
- 代码组织
- 命名规范
- 函数和箭头函数
- 对象和数组
- 错误处理
- 性能
- 安全
- 测试

**生成条件：** 检测到 JavaScript

---

#### typescript-rules.mdc

**用途：** 具有强类型的 TypeScript 最佳实践

**内容：**
- TypeScript 配置
- 类型定义
- 类型推断
- 接口和类型
- 泛型
- 枚举
- 类
- 实用类型
- 错误处理
- Async/await 类型

**生成条件：** 检测到 TypeScript

---

#### python-rules.mdc

**用途：** 遵循 PEP 8 的 Python 最佳实践

**内容：**
- PEP 8 风格指南
- 类型提示
- 现代 Python 特性
- f-strings
- 列表/字典推导式
- 函数
- 错误处理
- 类
- 模块和包
- 测试

**生成条件：** 检测到 Python

---

### 框架模板

#### react-rules.mdc

**用途：** React 开发最佳实践

**内容：**
- 函数组件
- Hooks（useState、useEffect、自定义 hooks）
- Props 和 prop types
- 状态管理
- 性能（记忆化、代码分割）
- 事件处理器
- 条件渲染
- 列表和 keys

**生成条件：** 检测到 React

---

### 类别模板

#### testing-rules.mdc

**用途：** 测试最佳实践

**内容：**
- 测试结构（AAA 模式）
- 测试组织
- 测试数据和 fixtures
- 断言
- 模拟（Mocking）
- 测试覆盖率
- 集成测试
- E2E 测试
- 测试性能

**生成条件：** 检测到测试

---

#### security-rules.mdc

**用途：** 安全最佳实践

**内容：**
- 输入验证
- 认证
- 授权
- SQL 注入防护
- XSS 防护
- CSRF 保护
- 密钥管理
- HTTPS
- 依赖安全
- 错误处理

**始终生成：** 是

---

#### performance-rules.mdc

**用途：** 性能优化

**内容：**
- 代码优化
- 缓存
- 数据库优化
- 前端性能
- 内存管理
- 网络优化
- 监控

**始终生成：** 是

---

#### api-rules.mdc

**用途：** API 设计最佳实践

**内容：**
- RESTful 设计
- HTTP 方法
- 状态码
- 请求/响应格式
- 分页
- 版本控制
- 错误处理
- 认证
- 限流
- 文档

**生成条件：** 检测到 API

---

#### database-rules.mdc

**用途：** 数据库最佳实践

**内容：**
- Schema 设计
- 索引
- 查询
- 事务
- 迁移
- ORM 使用
- 性能

**生成条件：** 检测到数据库

---

### 项目特定模板

#### project-specific.mdc

**用途：** 从代码库分析中提取的项目特定模式

**内容：**
- 检测到的模式
- 项目结构
- 代码规范
- 架构模式
- 自定义工具
- 团队规范

**占位符：**
- `{{DETECTED_PATTERNS}}` - 代码库中发现的模式
- `{{PROJECT_STRUCTURE}}` - 项目组织结构
- `{{CODE_CONVENTIONS}}` - 代码风格规范
- `{{ARCHITECTURE_PATTERNS}}` - 架构模式
- `{{CUSTOM_UTILITIES}}` - 自定义工具函数
- `{{TEAM_CONVENTIONS}}` - 团队特定规范

**生成条件：** 执行代码库分析

---

## 模板变量

模板使用在生成过程中替换的变量：

- `{{DATE}}` - 当前日期
- `{{COMPLEXITY}}` - 项目复杂度（simple/medium/complex/enterprise）
- `{{ANALYSIS_DATE}}` - 代码库分析时间（仅项目特定）

---

## 自定义

### 添加新模板

添加新模板的步骤：

1. 在 `.sdd/templates/rules/` 中创建模板文件
2. 遵循模板结构
3. 包含示例和最佳实践
4. 在此参考文档中记录

### 修改模板

模板可以自定义：

1. 直接编辑模板文件
2. 重新生成规则以应用更改
3. 记录自定义内容

---

## 模板示例

### 示例：JavaScript 模板

```markdown
---
alwaysApply: true
---

# JavaScript 编码规则

## 现代 JavaScript 特性

### 使用 ES6+ 语法
[示例和最佳实践]

## 代码组织
[文件结构和导入]

## 命名规范
[变量和函数命名]
```

### 示例：React 模板

```markdown
---
alwaysApply: true
---

# React 编码规则

## 组件结构

### 函数组件
[组件模式]

## Hooks
[useState、useEffect、自定义 hooks]

## 性能
[记忆化、代码分割]
```

---

## 最佳实践

### 模板设计

- **清晰的结构：** 按类别组织
- **示例：** 包含好/坏示例
- **实用：** 专注于可操作的规则
- **全面：** 覆盖常见场景

### 内容指南

- **10X 开发者原则：** 始终包含 DRY、KISS、模块化
- **最佳实践：** 语言/框架规范
- **安全：** 安全考虑
- **性能：** 性能技巧
- **测试：** 测试模式

---

## 另请参阅

- [生成规则指南](./GENERATE_RULES_GUIDE.md) - 使用指南
- [SDD 指南](./guidelines.md) - SDD 方法论
- [Cursor 规则格式](https://cursor.com/docs) - Cursor 规则文档

---

**最后更新：** 2025-10-21  
**模板位置：** `.sdd/templates/rules/`