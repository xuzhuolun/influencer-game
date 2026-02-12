# 实现待办清单: {{TASK_ID}}

## 概览
{{TODO_OVERVIEW}}

## 实现前准备
- [ ] 审查调研结论
- [ ] 确认规格需求
- [ ] 验证技术方案
- [ ] 搭建开发环境
- [ ] 创建功能分支: `{{TASK_ID}}`

## 待办事项

### 阶段 1: 基础搭建
{{#each PHASE_1_TODOS}}
- [ ] **{{this.id}}**: {{this.description}}
  - **预估时间**: {{this.estimate}}
  - **依赖**: {{this.dependencies}}
  - **现有模式**: {{this.pattern}}
  - **涉及文件**: {{this.files}}
{{/each}}

### 阶段 2: 核心实现
{{#each PHASE_2_TODOS}}
- [ ] **{{this.id}}**: {{this.description}}
  - **预估时间**: {{this.estimate}}
  - **依赖**: {{this.dependencies}}
  - **现有模式**: {{this.pattern}}
  - **新建文件**: {{this.newFiles}}
  - **修改文件**: {{this.modifyFiles}}
{{/each}}

### 阶段 3: 集成
{{#each PHASE_3_TODOS}}
- [ ] **{{this.id}}**: {{this.description}}
  - **预估时间**: {{this.estimate}}
  - **依赖**: {{this.dependencies}}
  - **集成点**: {{this.integrations}}
{{/each}}

### 阶段 4: 测试
{{#each PHASE_4_TODOS}}
- [ ] **{{this.id}}**: {{this.description}}
  - **测试类型**: {{this.testType}}
  - **覆盖率目标**: {{this.coverage}}
  - **测试文件**: {{this.testFiles}}
{{/each}}

### 阶段 5: 文档与清理
{{#each PHASE_5_TODOS}}
- [ ] **{{this.id}}**: {{this.description}}
  - **文档类型**: {{this.docType}}
  - **目标受众**: {{this.audience}}
{{/each}}

## 模式复用策略

### 可复用组件
{{#each REUSE_COMPONENTS}}
- **{{this.component}}** ({{this.location}})
  - **所需修改**: {{this.modifications}}
  - **用途**: {{this.usage}}
{{/each}}

### 遵循的代码模式
{{#each CODE_PATTERNS}}
- **{{this.pattern}}**: {{this.description}}
  - **示例位置**: {{this.location}}
  - **实现方式**: {{this.implementation}}
{{/each}}

## 执行策略

### 持续实现规则
1. **按依赖顺序执行待办事项**
2. **追求心流状态 - 尽可能多地连续完成，不中断**
3. **将所有模糊问题集中到最后批量解决**
4. **尽可能复用现有模式和组件**
5. **持续更新进度**
6. **记录任何偏离计划的情况**

### 检查点计划
{{#each CHECKPOINTS}}
- **{{this.milestone}}**: {{this.description}}
  - **预计完成**: {{this.date}}
  - **交付物**: {{this.deliverables}}
  - **评审标准**: {{this.criteria}}
{{/each}}

## 待批量解决的问题
{{#each QUESTIONS}}
- **{{this.category}}**: {{this.question}}
  - **背景**: {{this.context}}
  - **未解决的影响**: {{this.impact}}
{{/each}}

## 进度追踪

### 已完成事项
- [ ] 完成后在此更新
- [ ] 记录任何偏差或发现
- [ ] 记录实际时间与预估对比

### 阻塞与问题
- [ ] 记录遇到的任何阻塞
- [ ] 包含采取的解决步骤
- [ ] 记录对时间线的影响

### 发现与偏差
- [ ] 记录需要变更的计划
- [ ] 记录发现的新模式或方法
- [ ] 记录对现有代码的改进

## 完成定义
- [ ] 所有待办事项已完成
- [ ] 测试通过且达到覆盖率要求
- [ ] 代码评审完成并批准
- [ ] 文档已更新
- [ ] 集成测试成功
- [ ] 满足性能要求
- [ ] 安全问题已解决
- [ ] 成功部署到预发环境
- [ ] 获得相关方验收

---
**创建时间:** {{CREATED_DATE}}  
**预估周期:** {{TOTAL_ESTIMATE}}  
**开始实现:** {{START_DATE}}  
**目标完成:** {{TARGET_DATE}}
