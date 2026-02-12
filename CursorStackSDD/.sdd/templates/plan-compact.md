# {{TASK_ID}} 技术方案

## 概览
{{OVERVIEW}}

## 技术栈
- **前端**: {{FE_STACK}}
- **后端**: {{BE_STACK}}
- **数据库**: {{DATABASE}}
- **部署**: {{DEPLOYMENT}}

## 架构
```
{{ARCH_DIAGRAM}}
```

## 组件
{{#each COMPONENTS}}
- **{{this.name}}**: {{this.desc}} | {{this.tech}}
{{/each}}

## API 接口
{{#each APIS}}
### {{this.method}} {{this.endpoint}}
请求: `{{this.request}}`
响应: `{{this.response}}`
{{/each}}

## 数据模型
```json
{{DATA_MODELS}}
```

## 安全性
{{#each SECURITY}}
- {{this.area}}: {{this.approach}}
{{/each}}

## 性能目标
{{#each PERF}}
- {{this.metric}}: {{this.target}}
{{/each}}

## 风险
{{#each RISKS}}
- **{{this.risk}}** ({{this.impact}}) → {{this.mitigation}}
{{/each}}

## 测试
- 单元测试: {{UNIT_TESTS}}
- 集成测试: {{INT_TESTS}}
- 端到端测试: {{E2E_TESTS}}

---
状态: {{STATUS}} | 技术负责人: {{TECH_LEAD}} | {{CREATED_DATE}}｜{{BUILD_DATE}}