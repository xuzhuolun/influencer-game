# {{TASK_ID}} 功能简报

## 🎯 背景 (2分钟)
**问题**: {{PROBLEM}}
**用户**: {{USERS}} 
**成功指标**: {{SUCCESS_METRIC}}

## 🔍 快速调研 (15分钟)
### 现有模式
{{#each PATTERNS}}
- {{this.name}} → {{this.usage}} | 可复用: {{this.reusable}}
{{/each}}

### 技术决策
**方案**: {{CHOSEN_APPROACH}}
**理由**: {{RATIONALE}}
**排除方案**: {{REJECTED_OPTIONS}}

## ✅ 需求 (10分钟)
{{#each REQUIREMENTS}}
- {{this.story}} → {{this.acceptance}}
{{/each}}

## 🏗️ 实现方案 (5分钟)
**组件**: {{COMPONENTS}}
**API接口**: {{API_ENDPOINTS}}
**数据变更**: {{DATA_CHANGES}}

## 📋 下一步行动 (2分钟)
{{#each IMMEDIATE_TASKS}}
- [ ] {{this.task}} ({{this.effort}})
{{/each}}

**开始编码时间**: {{START_TIME}}

---
**总规划时间**: ~30分钟 | **负责人**: {{OWNER}} | {{DATE}}

<!-- 活文档 - 编码过程中持续更新 -->

## 🔄 实现追踪

**关键**: 按待办清单系统化推进。标记完成项，记录阻塞，更新进度。

### 进度
- [ ] 在此追踪已完成事项
- [ ] 每日更新

### 阻塞
- [ ] 记录所有阻塞项

**参见**: [.sdd/IMPLEMENTATION_GUIDE.md](mdc:.sdd/IMPLEMENTATION_GUIDE.md) 获取详细执行规则。