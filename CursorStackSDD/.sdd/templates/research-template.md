# 调研报告: {{TASK_ID}}

## 概览
{{RESEARCH_OVERVIEW}}

## 调研目标
{{RESEARCH_OBJECTIVE}}

## 代码库分析

### 已发现的现有模式
{{#each EXISTING_PATTERNS}}
#### {{this.name}}
**位置**: {{this.location}}
**描述**: {{this.description}}
**代码示例**:
```{{this.language}}
{{this.code}}
```
**优点**: {{this.pros}}
**缺点**: {{this.cons}}
{{/each}}

### 类似实现
{{#each SIMILAR_IMPLEMENTATIONS}}
- **{{this.name}}**: {{this.description}} ({{this.location}})
{{/each}}

## 外部调研

### 库与框架
{{#each EXTERNAL_LIBRARIES}}
- **{{this.name}}**: {{this.description}}
  - **使用场景**: {{this.useCase}}
  - **优点**: {{this.pros}}
  - **缺点**: {{this.cons}}
  - **兼容性**: {{this.compatibility}}
{{/each}}

### 最佳实践
{{#each BEST_PRACTICES}}
- **{{this.practice}}**: {{this.description}}
  - **来源**: {{this.source}}
  - **适用性**: {{this.applicability}}
{{/each}}

### 行业标准
{{#each STANDARDS}}
- **{{this.standard}}**: {{this.description}}
{{/each}}

## 技术约束

### 项目约束
{{#each PROJECT_CONSTRAINTS}}
- **{{this.type}}**: {{this.description}}
{{/each}}

### 技术栈考量
{{#each TECH_CONSIDERATIONS}}
- **{{this.technology}}**: {{this.consideration}}
{{/each}}

## 发现的机会

### 可复用组件
{{#each REUSABLE_COMPONENTS}}
- **{{this.component}}**: {{this.description}}
  - **位置**: {{this.location}}
  - **所需修改**: {{this.modifications}}
{{/each}}

### 集成点
{{#each INTEGRATION_POINTS}}
- **{{this.system}}**: {{this.description}}
  - **API**: {{this.api}}
  - **数据格式**: {{this.dataFormat}}
{{/each}}

## 建议

### 推荐方案
{{PREFERRED_APPROACH}}

### 备选方案
{{#each ALTERNATIVES}}
#### {{this.name}}
**描述**: {{this.description}}
**优点**: {{this.pros}}
**缺点**: {{this.cons}}
**工作量**: {{this.effort}}
{{/each}}

### 实现策略
{{IMPLEMENTATION_STRATEGY}}

## 风险与缓解措施
{{#each RISKS}}
- **{{this.risk}}**: {{this.description}}
  - **影响**: {{this.impact}}
  - **可能性**: {{this.probability}}
  - **缓解措施**: {{this.mitigation}}
{{/each}}

## 待解决问题
{{#each QUESTIONS}}
- {{this.question}}
{{/each}}

## 参考资料
{{#each SOURCES}}
- [{{this.title}}]({{this.url}}) - {{this.description}}
{{/each}}

---
**创建时间:** {{CREATED_DATE}}  
**调研人:** {{RESEARCHER}}  
**调研耗时:** {{RESEARCH_DURATION}}  
**下一阶段:** 规格定义 (`/specify {{TASK_ID}}`)