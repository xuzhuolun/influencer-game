# 实现任务: {{FEATURE_NAME}}

## 概览
{{TASKS_OVERVIEW}}

## 任务分解

{{#each TASK_CATEGORIES}}
### {{this.category}}

{{#each this.tasks}}
#### {{this.id}}: {{this.title}}
**描述**: {{this.description}}

**验收标准**:
{{#each this.criteria}}
- {{this}}
{{/each}}

**依赖**: {{this.dependencies}}  
**预估工作量**: {{this.effort}}  
**优先级**: {{this.priority}}  
**负责人**: {{this.assignee}}  
**状态**: {{this.status}}

**技术备注**:
{{this.technicalNotes}}

---
{{/each}}
{{/each}}

## 实现顺序

### 阶段 1: 基础搭建
{{#each PHASE_1_TASKS}}
- [ ] **{{this.id}}**: {{this.title}} ({{this.effort}})
{{/each}}

### 阶段 2: 核心功能
{{#each PHASE_2_TASKS}}
- [ ] **{{this.id}}**: {{this.title}} ({{this.effort}})
{{/each}}

### 阶段 3: 集成与测试
{{#each PHASE_3_TASKS}}
- [ ] **{{this.id}}**: {{this.title}} ({{this.effort}})
{{/each}}

### 阶段 4: 部署与监控
{{#each PHASE_4_TASKS}}
- [ ] **{{this.id}}**: {{this.title}} ({{this.effort}})
{{/each}}

## 任务依赖

```mermaid
graph TD
{{#each DEPENDENCIES}}
    {{this.from}} --> {{this.to}}
{{/each}}
```

## 完成定义

### 单个任务完成标准:
- [ ] 代码按规格实现
- [ ] 单元测试编写并通过
- [ ] 代码已审查并批准
- [ ] 集成测试通过
- [ ] 文档已更新
- [ ] 未引入安全漏洞
- [ ] 满足性能要求

### 功能整体完成标准:
- [ ] 所有验收标准已满足
- [ ] 端到端测试通过
- [ ] 用户验收测试完成
- [ ] 成功部署到预发环境
- [ ] 监控和日志已就位
- [ ] 文档已完成
- [ ] 获得相关方签字确认

## 风险缓解

{{#each TASK_RISKS}}
### {{this.task}}: {{this.risk}}
**影响**: {{this.impact}}  
**缓解措施**: {{this.mitigation}}  
**应急方案**: {{this.contingency}}
{{/each}}

## 资源分配

| 阶段 | 预估周期 | 所需人员 | 关键技能 |
|------|---------|---------|---------|
{{#each RESOURCE_PLANNING}}
| {{this.phase}} | {{this.duration}} | {{this.teamSize}} | {{this.skills}} |
{{/each}}

## 测试策略

### 单元测试任务
{{#each UNIT_TESTING_TASKS}}
- [ ] {{this.component}}: {{this.description}}
{{/each}}

### 集成测试任务
{{#each INTEGRATION_TESTING_TASKS}}
- [ ] {{this.integration}}: {{this.description}}
{{/each}}

### 端到端测试任务
{{#each E2E_TESTING_TASKS}}
- [ ] {{this.scenario}}: {{this.description}}
{{/each}}

## 部署任务

{{#each DEPLOYMENT_TASKS}}
- [ ] **{{this.id}}**: {{this.description}}
  - **环境**: {{this.environment}}
  - **依赖**: {{this.dependencies}}
  - **回滚方案**: {{this.rollback}}
{{/each}}

## 沟通计划

### 每日站会
- 当前任务进度更新
- 阻塞和依赖情况
- 资源需求

### 周度评审
- 阶段完成状态
- 质量指标审查
- 风险评估更新

### 里程碑评审
- 向相关方演示
- 验收标准验证
- 下一阶段 Go/No-Go 决策

## 评审清单
- [ ] 所有任务定义清晰且可执行
- [ ] 依赖已识别并记录
- [ ] 工作量估算合理
- [ ] 资源分配可行
- [ ] 测试任务全面
- [ ] 部署策略详尽
- [ ] 风险缓解计划已就位
- [ ] 沟通计划已建立

---
**创建时间:** {{CREATED_DATE}}  
**最后更新:** {{UPDATED_DATE}}  
**状态:** {{STATUS}}  
**项目经理:** {{PROJECT_MANAGER}}  
**技术负责人:** {{TECH_LEAD}}