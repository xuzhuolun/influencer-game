# 功能规格: {{FEATURE_NAME}}

## 概览
{{FEATURE_DESCRIPTION}}

## 问题陈述
### 我们在解决什么问题？
- {{PROBLEM_DESCRIPTION}}

### 受影响的用户是谁？
- {{TARGET_USERS}}

### 为什么这很重要？
- {{BUSINESS_JUSTIFICATION}}

## 需求

### 功能性需求
{{#each FUNCTIONAL_REQUIREMENTS}}
- **{{this.id}}**: {{this.description}}
  - **验收标准**: {{this.criteria}}
{{/each}}

### 非功能性需求
{{#each NON_FUNCTIONAL_REQUIREMENTS}}
- **{{this.type}}**: {{this.description}}
{{/each}}

## 用户故事

{{#each USER_STORIES}}
### {{this.id}}: {{this.title}}
**作为** {{this.actor}}  
**我希望** {{this.action}}  
**从而** {{this.outcome}}

**验收标准:**
{{#each this.criteria}}
- {{this}}
{{/each}}

**优先级:** {{this.priority}}  
**工作量:** {{this.effort}}
{{/each}}

## 成功指标
- {{SUCCESS_METRICS}}

## 边界情况与错误场景
{{#each EDGE_CASES}}
- **{{this.scenario}}**: {{this.handling}}
{{/each}}

## 依赖
{{#each DEPENDENCIES}}
- {{this.name}}: {{this.description}}
{{/each}}

## 前置假设
{{#each ASSUMPTIONS}}
- {{this}}
{{/each}}

## 不在范围内
{{#each OUT_OF_SCOPE}}
- {{this}}
{{/each}}

## 评审清单
- [ ] 需求清晰且可测试
- [ ] 用户故事符合 INVEST 原则
- [ ] 验收标准具体且可量化
- [ ] 已识别并覆盖边界情况
- [ ] 依赖已记录
- [ ] 成功指标已定义
- [ ] 关键干系人评审完成

---
**创建时间:** {{CREATED_DATE}}  
**最后更新:** {{UPDATED_DATE}}  
**状态:** {{STATUS}}  
**负责人:** {{ASSIGNEE}}  
**评审人:** {{REVIEWER}}