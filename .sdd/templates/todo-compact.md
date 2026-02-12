# {{TASK_ID}} 待办

## 准备工作
- [ ] 审查调研 + 规格 + 方案
- [ ] 创建分支 `{{TASK_ID}}`
- [ ] 搭建开发环境

## 实现
{{#each TODOS}}
- [ ] **{{this.id}}**: {{this.desc}}
  - 时间: {{this.estimate}} | 依赖: {{this.deps}}
  - 模式: {{this.pattern}} | 文件: {{this.files}}
{{/each}}

## 模式复用
{{#each REUSE}}
- **{{this.component}}** → {{this.usage}}
{{/each}}

## 执行规则
1. 按依赖顺序执行
2. 追求心流状态 - 批量处理问题放到最后
3. 尽可能复用模式
4. 持续更新进度

## 进度
### 已完成
- [ ] 在此追踪已完成事项

### 阻塞
- [ ] 记录阻塞 + 解决方案

### 问题 (最后批量处理)
- [ ] 在此列出模糊事项

## 完成定义
所有待办完成 + 测试通过 + 评审 + 部署

---
开始: {{START_DATE}} | 目标: {{TARGET_DATE}} | {{TOTAL_ESTIMATE}}