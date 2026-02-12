# /pecut-all-in-one 命令

这是 `/sdd-full-plan` 的别名。请参阅完整文档。

**支持 `--until-finish` 标志** 用于自动执行整个项目！

---

## 快速参考

```
/pecut-all-in-one [project-id] [描述] [--until-finish]
```

**示例：**
```
# 仅创建路线图（手动执行）
/pecut-all-in-one blog-platform 完整博客带 CMS
/pecut-all-in-one ecommerce-app 多商家电商平台

# 创建路线图并自动执行所有内容
/pecut-all-in-one blog-platform 完整博客带 CMS --until-finish
/pecut-all-in-one saas-app 完整 SaaS 仪表盘 --until-finish
```

**功能：**
- 创建完整的 A-Z 项目路线图
- 生成看板结构
- 将任务映射到 SDD 命令
- 创建 VSCode 兼容的 JSON
- **使用 `--until-finish`:** 自动执行所有任务直到完成！

**完整文档:** 参见 `/sdd-full-plan` 命令

---

## `--until-finish` 标志

添加 `--until-finish` 后：

1. 照常创建路线图
2. **立即开始按顺序执行所有任务**
3. 无需用户干预 - 完全自动化
4. 出错时停止让你修复，然后恢复
5. 持续执行直到整个项目完成

**这是"启动后放手"模式** - 启动后回来看结果即可！

```
/pecut-all-in-one my-project 构建完整应用 --until-finish
    ↓
创建路线图 → 执行所有 Epic → 执行所有任务 → 🎉 完成！
```

---

## 状态声明（必需）

**开始前，输出：**

```
**SDD 模式: 完整项目规划**
模式: planning
目的: 创建带看板结构的完整 A-Z 项目路线图
实现: 阻止 - 我将规划整个项目，而非实现它
```

**使用 `--until-finish` 时，路线图创建后：**

```
**SDD 模式: 自动执行**
模式: execution
目的: 自动执行所有路线图任务
实现: 已授权 - 按顺序执行任务直到完成
```

然后严格遵循 `/sdd-full-plan` 工作流。
