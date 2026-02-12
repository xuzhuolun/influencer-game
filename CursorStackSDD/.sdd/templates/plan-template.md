# 技术方案: {{FEATURE_NAME}}

## 概览
{{PLAN_OVERVIEW}}

## 架构

### 系统架构
```
{{ARCHITECTURE_DIAGRAM}}
```

### 组件设计
{{#each COMPONENTS}}
- **{{this.name}}**: {{this.description}}
  - **职责**: {{this.responsibilities}}
  - **接口**: {{this.interfaces}}
{{/each}}

## 技术栈

### 前端
- **框架**: {{FRONTEND_FRAMEWORK}}
- **库**: {{FRONTEND_LIBRARIES}}
- **样式方案**: {{STYLING_APPROACH}}

### 后端
- **运行时**: {{BACKEND_RUNTIME}}
- **框架**: {{BACKEND_FRAMEWORK}}
- **数据库**: {{DATABASE_CHOICE}}
- **API 设计**: {{API_DESIGN}}

### 基础设施
- **托管平台**: {{HOSTING_PLATFORM}}
- **CI/CD**: {{CICD_PIPELINE}}
- **监控工具**: {{MONITORING_TOOLS}}

## 数据模型

### 数据库 Schema
```sql
{{DATABASE_SCHEMA}}
```

### API 契约
{{#each API_ENDPOINTS}}
#### {{this.method}} {{this.path}}
**描述**: {{this.description}}

**请求:**
```json
{{this.request}}
```

**响应:**
```json
{{this.response}}
```
{{/each}}

## 安全考虑
{{#each SECURITY_MEASURES}}
- **{{this.area}}**: {{this.measures}}
{{/each}}

## 性能考虑
{{#each PERFORMANCE_REQUIREMENTS}}
- **{{this.metric}}**: {{this.target}} ({{this.rationale}})
{{/each}}

## 集成点
{{#each INTEGRATIONS}}
- **{{this.system}}**: {{this.method}} - {{this.purpose}}
{{/each}}

## 迁移策略
{{MIGRATION_APPROACH}}

## 回滚方案
{{ROLLBACK_STRATEGY}}

## 测试策略

### 单元测试
- {{UNIT_TEST_APPROACH}}

### 集成测试
- {{INTEGRATION_TEST_APPROACH}}

### 端到端测试
- {{E2E_TEST_APPROACH}}

## 部署策略
{{DEPLOYMENT_APPROACH}}

## 监控与日志
{{#each MONITORING_REQUIREMENTS}}
- **{{this.type}}**: {{this.implementation}}
{{/each}}

## 风险评估
{{#each RISKS}}
- **{{this.risk}}**: 
  - **影响**: {{this.impact}}
  - **可能性**: {{this.probability}}
  - **缓解措施**: {{this.mitigation}}
{{/each}}

## 评审清单
- [ ] 架构可扩展且易维护
- [ ] 技术选型有理有据
- [ ] 安全需求已解决
- [ ] 性能目标切实可行
- [ ] 集成点定义清晰
- [ ] 测试策略完善
- [ ] 部署方案可行
- [ ] 回滚方案已记录
- [ ] 技术评审已完成

---
**创建时间:** {{CREATED_DATE}}  
**最后更新:** {{UPDATED_DATE}}  
**状态:** {{STATUS}}  
**负责人:** {{ASSIGNEE}}  
**评审人:** {{REVIEWER}}