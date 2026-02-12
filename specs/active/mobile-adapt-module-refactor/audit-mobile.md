# 移动端走查问题清单

**Task ID:** mobile-adapt-module-refactor  
**日期:** 2026-02-12  
**说明:** 基于代码与布局分析的多视口问题记录，供阶段 2 样式修改依据。

---

## 1. 问题清单（视口 / 页面·区块 / 现象 / 严重程度）

| # | 视口 | 页面/区块 | 现象 | 严重程度 | 状态 |
|---|------|-----------|------|----------|------|
| 1 | 320px | 创角-起名 | `#influencer-name` 使用 `clamp(300px, 70vw, 500px)`，300px 最小宽度在 320px 下导致横向溢出 | 高 | **已解决** |
| 2 | 320–768px | 创角 | `.content-box` 水平 padding 40px 20px，小屏下左右占比较多，内容区过窄 | 中 | **已解决** |
| 3 | 320–768px | 全局按钮 | `.btn` 仅靠 padding clamp，小屏下有效触控高度可能 &lt; 44px | 中 | **已解决** |
| 4 | 320–768px | 主游戏-状态栏 | `.btn-small`（保存/菜单/说明）padding 8px 15px，触控热区 &lt; 44px | 中 | **已解决** |
| 5 | 320–768px | 底部 Tab | `.bottom-tab-item` 高度由内容决定，未设 min-height，可能 &lt; 44px | 中 | **已解决** |
| 6 | 320–768px | 主游戏 | `.bottom-tab-nav` 无 `padding-bottom: env(safe-area-inset-bottom)`，刘海/Home 条可能遮挡 | 中 | **已解决** |
| 7 | 320–768px | 主游戏 | `.tab-panel` 的 padding-bottom 80px 固定，未与安全区联动 | 低 | **已解决** |
| 8 | 320–414px | 创角-属性/头像 | `.attribute-list`、`.avatar-list` 多列在小屏下拥挤，建议 ≤480px 单列 | 中 | **已解决** |
| 9 | 320–768px | 弹窗 | `.modal-content` 在小屏下需确保无横向溢出、关闭按钮易点 | 中 | **已解决** |
| 10 | 768px | body | `body` 的 padding 20px 在移动端可缩小以增加可用宽度 | 低 | **已解决** |
| 11 | 320px | #game-container | `min-height: 600px` 在短屏设备可能造成整页滚动与内部滚动冲突 | 低 | **已解决** |

---

## 2. 主游戏信息分区与三 Tab 对应说明（任务 1.2）

### 2.1 顶-中-底分区与 DOM 对应

| 分区 | 含义 | 对应 DOM / Tab |
|------|------|----------------|
| **顶部** | 身份与关键数值 | `#main-game-screen > .status-bar-compact`（头像、昵称、月份、保存/菜单/说明）；在 Tab 内为 `#tab-profile` 的 `.profile-header-card`（头像、昵称、平台/类别/等级、粉丝/存款/违规） |
| **中部** | 动态/消息/决策信息 | `#tab-profile` 的 `.profile-feed-section`（发现、热搜、推荐）；`#tab-messages` 的 `.messages-categories` + `.log-panel`（小助理、评论与事件、事件日志）；`#tab-actions` 的 `.action-attributes-block` + 属性条（精力/心态/质量/人设） |
| **底部** | 行动与结算 | `#tab-actions` 的 `.action-panel`（本月行动、平台管理、行动列表、「结算本月」）；全局固定为 `.bottom-tab-nav`（个人主页 / 消息 / 行动） |

### 2.2 与「数值→消息→行动」动线对应

- **数值**：个人主页 Tab 的 profile-header-card + 行动 Tab 的 profile-bars（精力/心态/内容质量/人设契合）。
- **消息**：消息 Tab 的「小助理来信」「评论与事件」及事件日志；与《互联网大厂模拟器》的「消息/事件集中」一致。
- **行动**：行动 Tab 的「本月行动」与「结算本月」；与「回合行动明确」一致。

---

## 3. 断点与触控热区决策（任务 1.3）

### 3.1 断点决策

- **768px**：保留，作为平板/手机主断点，现有规则继续生效。
- **480px**：新增。用于创角区 `.attribute-list`、`.avatar-list` 单列；可选用于行动列表与底部 Tab 文案微调。
- **320px**：新增。仅做最小字号与 padding 兜底，避免 320px 下创角输入框溢出（见问题 1）。

### 3.2 需保证 ≥44px 触控热区的关键控件

| 控件 | 选择器/位置 | 说明 |
|------|-------------|------|
| 创角-起号 | `#confirm-name-btn` | 主 CTA |
| 创角-随机属性 | `#roll-attr-btn` | 高频 |
| 创角-随机花名 | `#random-name-btn` |  |
| 创角-性别 | `.gender-item` (label) | 扩大 label 可点区域 |
| 创角-头像 | `.avatar-item` | 每个头像选项 |
| 主游戏-保存/菜单/说明 | `.status-bar-compact .btn-small` | 顶部状态栏 |
| 主游戏-底部 Tab | `.bottom-tab-item` | 三个 Tab 项 |
| 主游戏-平台管理 | `#platform-manage-btn` |  |
| 主游戏-结算本月 | `#next-month-btn` |  |
| 主游戏-小助理/评论与事件 | `.message-category-card`（button） | 消息 Tab 入口 |
| 弹窗-关闭/确认 | `.modal-close`、各弹窗主按钮 |  |

---

*已修复项将在阶段 4 更新为「已解决」。*
