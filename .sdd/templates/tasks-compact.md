# {{TASK_ID}} 任务

## 阶段
### 1. 基础搭建
{{#each SETUP_TASKS}}
- [ ] {{this.task}} ({{this.effort}}) - {{this.owner}}
{{/each}}

### 2. 核心功能
{{#each CORE_TASKS}}
- [ ] {{this.task}} ({{this.effort}}) - {{this.owner}}
  - 依赖: {{this.deps}}
{{/each}}

### 3. 集成
{{#each INT_TASKS}}
- [ ] {{this.task}} ({{this.effort}}) - {{this.owner}}
{{/each}}

### 4. 部署
{{#each DEPLOY_TASKS}}
- [ ] {{this.task}} ({{this.effort}}) - {{this.owner}}
{{/each}}

## 依赖关系
```
{{#each TASK_DEPS}}
{{this.from}} → {{this.to}}
{{/each}}
```

## 完成定义
**单个任务**: 代码 + 测试 + 评审 + 文档
**功能整体**: 所有验收标准通过 + 端到端测试 + 部署 + 签字确认

## 估算
- **总计**: {{TOTAL_EFFORT}}
- **关键路径**: {{CRITICAL_PATH}}
- **目标日期**: {{TARGET_DATE}}

---
项目经理: {{PM}} | 技术负责人: {{LEAD}} | {{CREATED_DATE}}