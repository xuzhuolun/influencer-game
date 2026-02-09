// 游戏配置文件
const GameConfig = {
    // 基础配置
    forbiddenWords: ["低俗","违规","色情","暴力","赌博","毒品","反动","辱骂","歧视","脏话","违禁","违法","不良","恶意","诋毁"],

    // 默认与随机名字
    defaultName: "小云",
    randomNames: [
        "李加琪", "薇鸭", "辛叭", "小羊哥", "李子七",
        "张同学", "风产姐", "到月社", "何童学", "回形针",
        "张大E", "林小七", "阿哲", "小鹿酱", "糖小葵",
        "阿柚", "橙子姐", "小火苗", "七七", "小豆豆"
    ],

    // 性别选项
    genderOptions: [
        { value: "male", label: "男" },
        { value: "female", label: "女" }
    ],

    // 头像选项（按性别）
    avatarOptions: {
        male: [
            {
                id: "m1",
                name: "清爽短发",
                svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<rect width="120" height="120" rx="24" fill="#E9F2FF"/>
<circle cx="60" cy="52" r="26" fill="#F5C9A9"/>
<path d="M32 48c6-16 50-18 56 0v8H32z" fill="#2E2E3A"/>
<rect x="34" y="80" width="52" height="28" rx="14" fill="#4C7DFF"/>
<circle cx="50" cy="52" r="3" fill="#2E2E3A"/>
<circle cx="70" cy="52" r="3" fill="#2E2E3A"/>
<path d="M50 62c6 6 14 6 20 0" stroke="#2E2E3A" stroke-width="3" fill="none"/>
</svg>`
            },
            {
                id: "m2",
                name: "校园风",
                svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<rect width="120" height="120" rx="24" fill="#FFF4E6"/>
<circle cx="60" cy="52" r="26" fill="#F2C7A5"/>
<path d="M30 50c8-18 52-20 60 0v6H30z" fill="#3A2E2E"/>
<rect x="36" y="80" width="48" height="28" rx="14" fill="#FF8A4C"/>
<circle cx="50" cy="52" r="3" fill="#2E2E3A"/>
<circle cx="70" cy="52" r="3" fill="#2E2E3A"/>
<path d="M50 63c6 4 14 4 20 0" stroke="#2E2E3A" stroke-width="3" fill="none"/>
</svg>`
            },
            {
                id: "m3",
                name: "都市感",
                svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<rect width="120" height="120" rx="24" fill="#EAF7F1"/>
<circle cx="60" cy="52" r="26" fill="#F5CCB0"/>
<path d="M28 50c10-20 54-20 64 0v6H28z" fill="#1F2A44"/>
<rect x="34" y="80" width="52" height="28" rx="14" fill="#2BAE8A"/>
<circle cx="50" cy="52" r="3" fill="#2E2E3A"/>
<circle cx="70" cy="52" r="3" fill="#2E2E3A"/>
<path d="M50 64c6 3 14 3 20 0" stroke="#2E2E3A" stroke-width="3" fill="none"/>
</svg>`
            },
            {
                id: "m4",
                name: "阳光派",
                svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<rect width="120" height="120" rx="24" fill="#F3F0FF"/>
<circle cx="60" cy="52" r="26" fill="#F4C8A4"/>
<path d="M30 48c10-14 50-14 60 0v8H30z" fill="#2B2B2B"/>
<rect x="34" y="80" width="52" height="28" rx="14" fill="#7B61FF"/>
<circle cx="50" cy="52" r="3" fill="#2E2E3A"/>
<circle cx="70" cy="52" r="3" fill="#2E2E3A"/>
<path d="M50 62c6 5 14 5 20 0" stroke="#2E2E3A" stroke-width="3" fill="none"/>
</svg>`
            }
        ],
        female: [
            {
                id: "f1",
                name: "元气甜心",
                svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<rect width="120" height="120" rx="24" fill="#FFF0F5"/>
<circle cx="60" cy="52" r="26" fill="#F6C9B2"/>
<path d="M30 54c6-20 54-22 60 0v10H30z" fill="#6B3B5B"/>
<rect x="34" y="80" width="52" height="28" rx="14" fill="#FF6FAE"/>
<circle cx="50" cy="52" r="3" fill="#2E2E3A"/>
<circle cx="70" cy="52" r="3" fill="#2E2E3A"/>
<path d="M50 62c6 6 14 6 20 0" stroke="#2E2E3A" stroke-width="3" fill="none"/>
</svg>`
            },
            {
                id: "f2",
                name: "气质长发",
                svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<rect width="120" height="120" rx="24" fill="#EAF6FF"/>
<circle cx="60" cy="52" r="26" fill="#F5C8A8"/>
<path d="M26 52c8-22 60-22 68 0v26H26z" fill="#3B2E5A"/>
<rect x="34" y="80" width="52" height="28" rx="14" fill="#5CA8FF"/>
<circle cx="50" cy="52" r="3" fill="#2E2E3A"/>
<circle cx="70" cy="52" r="3" fill="#2E2E3A"/>
<path d="M50 64c6 4 14 4 20 0" stroke="#2E2E3A" stroke-width="3" fill="none"/>
</svg>`
            },
            {
                id: "f3",
                name: "清冷感",
                svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<rect width="120" height="120" rx="24" fill="#F0FFF4"/>
<circle cx="60" cy="52" r="26" fill="#F2C6A8"/>
<path d="M28 54c8-20 56-20 64 0v22H28z" fill="#2D3A3A"/>
<rect x="34" y="80" width="52" height="28" rx="14" fill="#4AC29A"/>
<circle cx="50" cy="52" r="3" fill="#2E2E3A"/>
<circle cx="70" cy="52" r="3" fill="#2E2E3A"/>
<path d="M50 64c6 3 14 3 20 0" stroke="#2E2E3A" stroke-width="3" fill="none"/>
</svg>`
            },
            {
                id: "f4",
                name: "简约风",
                svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<rect width="120" height="120" rx="24" fill="#FFF7E6"/>
<circle cx="60" cy="52" r="26" fill="#F5C7A6"/>
<path d="M30 52c8-18 52-18 60 0v18H30z" fill="#4A3A2E"/>
<rect x="34" y="80" width="52" height="28" rx="14" fill="#FFB44C"/>
<circle cx="50" cy="52" r="3" fill="#2E2E3A"/>
<circle cx="70" cy="52" r="3" fill="#2E2E3A"/>
<path d="M50 63c6 5 14 5 20 0" stroke="#2E2E3A" stroke-width="3" fill="none"/>
</svg>`
            }
        ]
    },

    // 角色属性配置（创角随机分配）
    characterAttributes: {
        totalPointsMin: 25,
        totalPointsMax: 35,
        min: 1,
        max: 10,
        list: [
            { key: "appearance", name: "颜值" },
            { key: "education", name: "学历" },
            { key: "humor", name: "幽默" },
            { key: "temperament", name: "气质" },
            { key: "cameraSense", name: "镜头感" }
        ]
    },

    // 能力训练选项（属性提升专用）
    trainingOptions: [
        {
            name: "医美整容",
            desc: "快速提升颜值，但花费不小",
            effects: { savings: -2000, mood: -5, attribute: { appearance: 2 } }
        },
        {
            name: "健身塑形",
            desc: "提升颜值与气质，消耗精力较多",
            effects: { energy: -25, mood: 5, attribute: { appearance: 1, temperament: 1 } }
        },
        {
            name: "口才训练",
            desc: "提升幽默与镜头感，适合直播与互动",
            effects: { energy: -15, savings: -500, attribute: { humor: 1, cameraSense: 1 } }
        },
        {
            name: "进修学习",
            desc: "系统提升学历与内容深度",
            effects: { energy: -20, savings: -1000, attribute: { education: 2 } }
        },
        {
            name: "形象顾问",
            desc: "提升气质与人设稳定性",
            effects: { savings: -1500, attribute: { temperament: 2 } }
        }
    ],

    // 能力训练限制
    trainingConfig: {
        maxPerMonth: 2
    },

    // 行动次数限制
    actionLimitPerMonth: 5,

    // 粉丝规模对收益加成（正收益）
    profitFanMultiplierTiers: [
        { minFans: 0, multiplier: 1.0 },
        { minFans: 1000, multiplier: 1.05 },
        { minFans: 10000, multiplier: 1.1 },
        { minFans: 100000, multiplier: 1.2 },
        { minFans: 500000, multiplier: 1.3 }
    ],

    // 不同职级的存款事件权重（越高越容易出现）
    savingsEventWeightByRank: {
        "素人": 0.1,
        "初级达人": 0.18,
        "中级达人": 0.28,
        "高级达人": 0.38,
        "头部达人": 0.5,
        "MCN签约": 0.6
    },

    // 基础团队事件权重（中级达人开始出现）
    teamBaseEventWeightByRank: {
        "素人": 0,
        "初级达人": 0,
        "中级达人": 0.08,
        "高级达人": 0.2,
        "头部达人": 0.28,
        "MCN签约": 0.35
    },

    // 矩阵扩张事件权重（高职级更常见）
    teamMatrixEventWeightByRank: {
        "素人": 0,
        "初级达人": 0,
        "中级达人": 0.02,
        "高级达人": 0.12,
        "头部达人": 0.25,
        "MCN签约": 0.4
    },

    // 不同职级挑战事件权重
    rankChallengeWeightByRank: {
        "素人": 0.2,
        "初级达人": 0.25,
        "中级达人": 0.3,
        "高级达人": 0.32,
        "头部达人": 0.35,
        "MCN签约": 0.38
    },

    // 类别挑战事件权重
    categoryChallengeWeightByRank: {
        "素人": 0.15,
        "初级达人": 0.2,
        "中级达人": 0.24,
        "高级达人": 0.28,
        "头部达人": 0.32,
        "MCN签约": 0.35
    },
    
    // 初始数据
    initialData: {
        energy: 80,
        mood: 80,
        contentQuality: 20,
        personaFit: 20,
        fans: 0,
        violationIndex: 0,
        violationCount: 0,
        savings: 5000,
        profit: 0,
        fanGrowthRate: 1,
        violationMultiplier: 1,
        rankProgress: 0,
        month: 1,
        year: 2026,
        timelineEventsTriggered: {},
        attributes: null,
        chainQueue: {},
        deferredEvents: {}
    },

    // 网红类别配置
    categories: [
        {
            id: "science",
            name: "科普类",
            icon: "🔬",
            initialBonus: "内容质量+10、粉丝粘性+15%；全程科普类内容变现效率+20%；职级每提升1级，内容质量额外+3",
            exclusiveActions: [
                { name: "科普脚本创作", rank: "素人", energyCost: 15, effects: { contentQuality: 5, personaFit: 3 } },
                { name: "专业答疑直播", rank: "初级达人", energyCost: 20, effects: { contentQuality: 8, fans: 50 } },
                { name: "科普书籍合作", rank: "高级达人", energyCost: 25, effects: { contentQuality: 10, profit: 500 } },
                { name: "权威科普联名", rank: "头部达人", energyCost: 30, effects: { contentQuality: 15, fans: 1000, profit: 2000 } }
            ],
            profitChannel: "知识付费变现系数+0.2；商务报价（教育、科技类）+30%；职级每提升1级，商务报价额外+10%",
            risk: "科普内容错误、虚假科普；擦边玩梗（低俗化科普、过度娱乐化解读专业知识）；职级越高，违规处罚越重",
            bonusEffects: { contentQuality: 10, fanRetention: 0.15, profitRate: 0.2 }
        },
        {
            id: "mukbang",
            name: "吃播类",
            icon: "🍜",
            initialBonus: "心态+5、粉丝互动效果+20%；全程带货佣金（食品类）+25%；职级每提升1级，带货佣金额外+5%",
            exclusiveActions: [
                { name: "日常干饭直播", rank: "素人", energyCost: 15, effects: { mood: 5, fans: 30 } },
                { name: "美食探店", rank: "初级达人", energyCost: 20, effects: { fans: 80, profit: 200 } },
                { name: "食品测评带货", rank: "中级达人", energyCost: 25, effects: { fans: 150, profit: 800 } },
                { name: "餐饮品牌专场", rank: "头部达人", energyCost: 30, effects: { fans: 800, profit: 3000 } }
            ],
            profitChannel: "食品类带货佣金+25%；餐饮品牌商务邀约概率+40%；职级每提升1级，邀约概率额外+8%",
            risk: "食品卫生问题、虚假宣传（夸大口感）；擦边玩梗（过度暴饮暴食博眼球、低俗互动、着装擦边）；职级越高，违规封禁概率越高",
            bonusEffects: { mood: 5, interactionBonus: 0.2, foodProfit: 0.25 }
        },
        {
            id: "beauty",
            name: "美妆类",
            icon: "💄",
            initialBonus: "人设契合度+10、商务报价+15%；全程美妆类变现系数+0.2；职级每提升1级，人设契合度加成+3",
            exclusiveActions: [
                { name: "妆容教程", rank: "素人", energyCost: 15, effects: { personaFit: 5, contentQuality: 3 } },
                { name: "美妆好物分享", rank: "初级达人", energyCost: 20, effects: { personaFit: 8, profit: 300 } },
                { name: "品牌美妆专场直播", rank: "高级达人", energyCost: 25, effects: { fans: 200, profit: 1000 } },
                { name: "美妆品牌代言", rank: "头部达人", energyCost: 30, effects: { fans: 1000, profit: 5000, personaFit: 10 } }
            ],
            profitChannel: "美妆类广告报价+35%；美妆带货转化率+20%；职级每提升1级，转化率额外+4%",
            risk: "美妆产品过敏、虚假宣传（夸大功效）；擦边玩梗（着装擦边、低俗妆容解读、过度营销擦边话术）；职级越高，品牌追责风险越高",
            bonusEffects: { personaFit: 10, beautyProfit: 0.35, conversionRate: 0.2 }
        },
        {
            id: "lifestyle",
            name: "生活类",
            icon: "🏠",
            initialBonus: "精力+5、粉丝流失率-10%；全程变现渠道解锁速度+20%；职级每提升1级，粉丝流失率再降2%",
            exclusiveActions: [
                { name: "日常vlog拍摄", rank: "素人", energyCost: 10, effects: { mood: 3, fans: 20 } },
                { name: "生活好物分享", rank: "初级达人", energyCost: 15, effects: { fans: 60, profit: 250 } },
                { name: "生活场景植入广告", rank: "中级达人", energyCost: 20, effects: { profit: 600, fans: 100 } },
                { name: "生活类IP联名", rank: "头部达人", energyCost: 25, effects: { fans: 1200, profit: 4000 } }
            ],
            profitChannel: "全品类商务邀约概率+25%；变现渠道无明显短板，稳定性强；职级每提升1级，全品类邀约概率额外+6%",
            risk: "隐私泄露、内容低俗、植入广告过多；擦边玩梗（低俗日常片段、过度博眼球的场景演绎、擦边话术互动）；职级越高，内容审核越严格",
            bonusEffects: { energy: 5, fanRetention: 0.1, diverseProfit: 0.25 }
        }
    ],

    // 职级配置
    rankConfig: {
        "素人": { 
            progressFull: 0, 
            positiveBonus: 5, 
            violationDeduct: 10, 
            edgeDeduct: 5, 
            unlockCondition: "完成起名+类别选择，无违规",
            nextRank: "初级达人"
        },
        "初级达人": { 
            progressFull: 100, 
            positiveBonus: 8, 
            violationDeduct: 12, 
            unlockCondition: "进度≥100+违规指数＜10+粉丝≥1000",
            nextRank: "中级达人"
        },
        "中级达人": { 
            progressFull: 250, 
            positiveBonus: 10, 
            violationDeduct: 14, 
            unlockCondition: "进度≥250+违规指数＜15+粉丝≥5000+完成1次正向专属事件",
            nextRank: "高级达人"
        },
        "高级达人": { 
            progressFull: 500, 
            positiveBonus: 12, 
            violationDeduct: 16, 
            unlockCondition: "进度≥500+违规指数＜20+粉丝≥20000+无职级专属负向违规",
            nextRank: "头部达人"
        },
        "头部达人": { 
            progressFull: 1000, 
            positiveBonus: 14, 
            violationDeduct: 18, 
            unlockCondition: "进度≥1000+违规指数＜25+粉丝≥100000+完成1次高级正向专属事件",
            nextRank: "MCN签约"
        },
        "MCN签约": { 
            progressFull: 1800, 
            positiveBonus: 15, 
            violationDeduct: 20, 
            unlockCondition: "进度≥1800+违规指数＜30+粉丝≥500000+变现累计≥100000",
            nextRank: null
        }
    },

    // 事件概率配置
    eventProbability: {
        exclusiveTotal: 0.4,
        commonTotal: 0.6,
        exclusivePositive: 0.4,
        exclusiveNegative: 0.6,
        monthlyInitalTrigger: 0.6,
        afterActionTrigger: 0.3
    },

    // 评分权重
    scoreWeights: {
        contentQuality: 0.28,
        personaFit: 0.28,
        mood: 0.18,
        energy: 0.18,
        fans: 0.08
    },

    // 月度结算评分
    monthlySettle: {
        excellent: { score: 80, progressAdd: 30, name: "优秀" },
        good: { score: 60, progressAdd: 15, name: "良好" },
        qualified: { score: 40, progressAdd: 8, name: "合格" },
        unqualified: { score: 0, progressAdd: -10, name: "不合格" }
    },

    // 每月固定支出
    monthlyExpenses: {
        rent: 800,
        teamCostByRank: {
            "素人": 0,
            "初级达人": 300,
            "中级达人": 800,
            "高级达人": 1500,
            "头部达人": 3000,
            "MCN签约": 5000
        }
    },

    // 通用行动
    commonActions: [
        { 
            name: "拍摄短视频", 
            energyCost: 15, 
            effects: { contentQuality: 3, fans: 20, profit: 50 },
            description: "创作日常短视频内容"
        },
        { 
            name: "直播互动", 
            energyCost: 20, 
            effects: { mood: -5, fans: 50, profit: 150 },
            description: "与粉丝进行直播互动"
        },
        { 
            name: "接商务广告", 
            energyCost: 10, 
            effects: { personaFit: -2, profit: 300 },
            description: "接受品牌商务合作"
        },
        { 
            name: "学习提升", 
            energyCost: 15, 
            effects: { contentQuality: 5, personaFit: 3 },
            description: "学习专业技能提升自己"
        },
        {
            name: "能力训练",
            energyCost: 0,
            effects: {},
            description: "选择训练方式提升角色属性"
        },
        {
            name: "擦边试探",
            energyCost: 0,
            effects: {},
            description: "选择擦边方向获取流量"
        },
        { 
            name: "休息调整", 
            energyCost: 0, 
            effects: { mood: 10, energy: 20 },
            description: "休息恢复精力和心态"
        }
    ]
};
