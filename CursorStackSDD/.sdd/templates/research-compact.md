# {{TASK_ID}} 调研

## 目标
{{RESEARCH_GOAL}}

## 现有模式
{{#each PATTERNS}}
- **{{this.name}}** ({{this.location}})
  - 用途: {{this.usage}}
  - 优点: {{this.pros}} | 缺点: {{this.cons}}
{{/each}}

## 外部方案
{{#each EXTERNAL}}
- **{{this.name}}**: {{this.desc}}
  - 适配度: {{this.fit}}/5 | 工作量: {{this.effort}}
{{/each}}

## 技术选型
{{#each TECH_OPTIONS}}
- **{{this.tech}}**: {{this.usecase}}
  - 优点: {{this.pros}}
  - 缺点: {{this.cons}}
  - 结论: {{this.verdict}}
{{/each}}

## 建议
1. **推荐方案**: {{PREFERRED_APPROACH}}
2. **备选方案**: {{ALTERNATIVE}}
3. **规避方案**: {{AVOID}}

## 下一步
{{NEXT_STEPS}}

---
调研人: {{RESEARCHER}} | 耗时: {{DURATION}} | {{CREATED_DATE}}