# {{TASK_ID}} 规格

## 是什么 & 为什么
- **问题**: {{PROBLEM}}
- **用户**: {{USERS}} 
- **价值**: {{VALUE}}

## 需求
### 必须有
{{#each MUST_HAVE}}
- {{this.req}} → {{this.criteria}}
{{/each}}

### 应该有  
{{#each SHOULD_HAVE}}
- {{this}}
{{/each}}

## 用户故事
{{#each STORIES}}
**{{this.role}}** {{this.action}} → {{this.outcome}}
- 验收标准: {{this.acceptance}}
- 优先级: {{this.priority}} | 工作量: {{this.effort}}
{{/each}}

## 成功指标
{{SUCCESS_METRICS}}

## 依赖
{{#each DEPS}}
- {{this}}
{{/each}}

## 不在范围内
{{#each OOS}}
- {{this}}
{{/each}}

---
状态: {{STATUS}} | 负责人: {{OWNER}} | {{CREATED_DATE}}