# 项目概览：SDD Cursor 命令集

## 项目描述
一个面向 Cursor IDE 的**规格驱动开发工具集**，通过一组结构化命令来完成：功能规格编写、技术规划以及任务拆分。

## 项目目标
- 通过结构化规格文档**梳理并加速开发流程**  
- 提升团队成员之间的协作效率  
- 在编码前进行**充分、可审计的规划**  
- 持续保持「需求 → 规格 → 实现」的一致性  

## 架构概览
系统围绕三条核心命令协同工作：
1. `/specify` —— 生成详细的功能规格（spec）  
2. `/plan` —— 输出技术实现方案和架构规划  
3. `/tasks` —— 将方案拆解为可执行任务列表  

## 技术栈
- **平台**：Cursor IDE 命令 / 扩展系统  
- **文档格式**：Markdown  
- **配置**：JSON（配置与模板定义）  
- **模板引擎**：类 Handlebars 的模板系统  

## 当前状态
- **阶段（Phase）**：初始开发  
- **版本（Version）**：1.0.0  
- **最后更新**：2024-09-19  

## 进行中的特性（Active Features）
当前暂无进行中的特性。

## 已完成的特性（Completed Features）
当前暂无已完成特性。

## 待办特性（Backlog）
- 完整的 Cursor 命令实现  
- 模板引擎集成  
- 进度追踪系统  
- 协作相关功能  

## 团队
- **项目负责人（Project Lead）**：待定  
- **开发（Developer）**：待定  
- **评审（Reviewer）**：待定  

## 相关链接
- [指南 / Guidelines](.sdd/guidelines.md)  
- [配置 / Configuration](.sdd/config.json)  
- [模板 / Templates](.sdd/templates/)  
