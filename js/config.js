// 游戏配置文件
const GameConfig = {
    // 基础配置
    forbiddenWords: ["低俗","违规","色情","暴力","赌博","毒品","反动","辱骂","歧视","脏话","违禁","违法","不良","恶意","诋毁"],
    
    // 直播平台配置
    platforms: {
        douyin: {
            id: "douyin",
            name: "静音",
            icon: "🎵",
            description: "短视频之王，上下滑刷不完的那种。推荐算法强、爆款容易出圈，流量巨大但竞争激烈",
            features: [
                "✓ 粉丝增长速度 +30%",
                "✓ 推荐算法强大",
                "⚠ 擦边容忍度较低",
                "🎯 适合：吃播、美妆、生活"
            ],
            bonuses: {
                fanGrowth: 1.3,
                profitRate: 1.0,
                edgeTolerance: 0.8,
                contentBonus: 1.1
            },
            suitableCategories: ["mukbang", "beauty", "lifestyle"],
            switchCost: 0.15,
            color: "#000000"
        },
        bilibili: {
            id: "bilibili",
            name: "C站",
            icon: "📺",
            description: "高质量内容社区，UP主与弹幕文化浓厚。粉丝忠诚度高、适合深耕长视频与原创，创作激励可观",
            features: [
                "✓ 内容质量加成 +30%",
                "✓ 粉丝忠诚度高",
                "✓ 收益转化率 +20%",
                "🎯 适合：科普、生活、美妆"
            ],
            bonuses: {
                fanGrowth: 0.9,
                profitRate: 1.2,
                edgeTolerance: 0.6,
                contentBonus: 1.3
            },
            suitableCategories: ["science", "lifestyle", "beauty"],
            switchCost: 0.1,
            color: "#00A1D6"
        },
        xiaohongshu: {
            id: "xiaohongshu",
            name: "小绿书",
            icon: "📕",
            description: "以图文笔记为主的种草社区，女性用户多、消费决策强。品牌合作与蒲公英接单多，变现能力强",
            features: [
                "✓ 变现收益 +40%",
                "✓ 品牌合作机会多",
                "⚠ 女性向内容优势",
                "🎯 适合：美妆、生活"
            ],
            bonuses: {
                fanGrowth: 0.85,
                profitRate: 1.4,
                edgeTolerance: 0.7,
                contentBonus: 1.0
            },
            suitableCategories: ["beauty", "lifestyle"],
            switchCost: 0.12,
            color: "#FF2442"
        },
        kuaishou: {
            id: "kuaishou",
            name: "慢手",
            icon: "⚡",
            description: "老铁经济与直播打赏的主战场，下沉市场用户多。接地气、重互动，粉丝认人更认情",
            features: [
                "✓ 打赏收益 +50%",
                "✓ 粉丝互动性强",
                "✓ 下沉市场优势",
                "🎯 适合：吃播、生活"
            ],
            bonuses: {
                fanGrowth: 1.1,
                profitRate: 1.5,
                edgeTolerance: 0.9,
                contentBonus: 0.9
            },
            suitableCategories: ["mukbang", "lifestyle"],
            switchCost: 0.2,
            color: "#FF4C00"
        },
        weibo: {
            id: "weibo",
            name: "巨博",
            icon: "🎤",
            description: "明星网红扎堆、热搜与超话发酵快。大V认证、话题标签玩得转，舆论场一夜能红也能翻车",
            features: [
                "✓ 流量池大",
                "✓ 热点传播快",
                "⚠ 竞争激烈",
                "🎯 适合：各类别"
            ],
            bonuses: {
                fanGrowth: 1.2,
                profitRate: 1.1,
                edgeTolerance: 0.75,
                contentBonus: 1.0
            },
            suitableCategories: ["science", "mukbang", "beauty", "lifestyle"],
            switchCost: 0.18,
            color: "#E6162D"
        }
    },

    // 平台入驻引导事件（选择平台后第一个月由小助理发送）
    platformOnboarding: {
        douyin: [
            {
                title: "静音创作者入驻指南",
                description: "📱 小助理：恭喜你正式入驻静音！作为短视频之王，上下滑刷不完的那种，这里有海量流量等着你。不过竞争也很激烈哦~\n\n我帮你整理了新人起号攻略：\n1. 先完成实名认证\n2. 完善个人主页和简介\n3. 发布3条优质短视频参加新人流量扶持\n\n平台会给新创作者额外的推荐权重，抓住这个黄金期！",
                isMessage: true,
                isOnboarding: true,
                options: [
                    {
                        text: "认真完善资料，发布首条视频",
                        effects: { contentQuality: 5, fans: 50, personaFit: 5, energy: -10 },
                        type: 'positive'
                    },
                    {
                        text: "先随便发几条试试水",
                        effects: { fans: 20, energy: -5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "静音算法机制提醒",
                description: "📱 小助理：提醒你，静音的推荐算法非常看重完播率和互动率！前5秒是黄金时间，一定要抓住观众眼球。\n\n另外，平台对擦边内容管控很严，违规会直接限流甚至封号。建议你走优质内容路线，长期收益更大。",
                isMessage: true,
                isOnboarding: true,
                options: [
                    {
                        text: "收到，我会注意内容质量",
                        effects: { contentQuality: 3, mood: 5 },
                        type: 'positive'
                    }
                ]
            }
        ],
        bilibili: [
            {
                title: "C站新人UP主须知",
                description: "📱 小助理：欢迎来到C站！这里是国内最优质的内容社区之一，UP主与弹幕文化浓厚。C站用户对内容质量要求很高，但粉丝粘性也是最强的。\n\n重要提示：C站有一项独特的会员答题制度，新用户需要通过答题才能成为正式会员。作为UP主，了解社区文化非常重要！\n\n我建议你先做一套C站社区知识测试，熟悉弹幕礼仪和社区公约。",
                isMessage: true,
                isOnboarding: true,
                options: [
                    {
                        text: "认真答题，融入C站文化",
                        effects: { contentQuality: 8, personaFit: 8, fans: 30, energy: -15 },
                        type: 'positive'
                    },
                    {
                        text: "随便做做，先发视频再说",
                        effects: { fans: 10, contentQuality: -3, personaFit: -5, energy: -5 },
                        type: 'mixed'
                    },
                    {
                        text: "跳过答题，直接开始创作",
                        effects: { energy: -5, personaFit: -8 },
                        type: 'negative'
                    }
                ]
            },
            {
                title: "C站创作激励计划",
                description: "📱 小助理：好消息！C站有创作激励计划，根据视频播放量和质量给UP主发放收益。不过门槛是粉丝数达到1000+且投稿量达标。\n\n另外，C站用户非常重视原创和深度内容，搬运和水视频会被弹幕吐槽甚至举报。建议你认真打磨每一期内容！\n\n小贴士：善用C站的专栏、动态等功能，多和粉丝互动，发展弹幕文化。",
                isMessage: true,
                isOnboarding: true,
                options: [
                    {
                        text: "收到，我会深耕优质内容",
                        effects: { contentQuality: 10, mood: 8 },
                        type: 'positive'
                    }
                ]
            }
        ],
        xiaohongshu: [
            {
                title: "小绿书创作者入驻",
                description: "📱 小助理：欢迎入驻小绿书！这里是最大的图文笔记种草社区，以女性用户为主，消费力很强。\n\n入驻须知：\n1. 小绿书非常看重图文质量，封面图一定要精致\n2. 笔记标题要有吸引力，善用关键词\n3. 平台有严格的广告法合规要求，软广要打标\n\n品牌方经常在小绿书寻找KOL合作，变现能力很强，但前提是你的内容要足够种草！",
                isMessage: true,
                isOnboarding: true,
                options: [
                    {
                        text: "精心打磨首篇笔记",
                        effects: { contentQuality: 6, personaFit: 5, fans: 40, energy: -12 },
                        type: 'positive'
                    },
                    {
                        text: "先发几篇试试风格",
                        effects: { fans: 15, energy: -5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "小绿书蒲公英平台介绍",
                description: "📱 小助理：小绿书有官方的商业合作平台\u201C蒲公英\u201D，品牌方会通过这个平台找达人合作。\n\n开通条件：粉丝数5000+，近30天有内容更新。达到条件后品牌合作机会会大幅增加！\n\n温馨提示：小绿书社区对虚假种草、夸大宣传管控很严，一定要真实分享体验。",
                isMessage: true,
                isOnboarding: true,
                options: [
                    {
                        text: "了解了，先积累粉丝",
                        effects: { mood: 5, contentQuality: 3 },
                        type: 'positive'
                    }
                ]
            }
        ],
        kuaishou: [
            {
                title: "慢手老铁文化指南",
                description: "📱 小助理：欢迎来到慢手！这里是最接地气的短视频平台，\u201C老铁文化\u201D与直播打赏是核心。\n\n慢手特色：\n1. 直播打赏是主要收入来源，粉丝互动性极强\n2. 下沉市场用户为主，真实接地气的内容更受欢迎\n3. 平台对擦边内容相对宽容，但也在逐步收紧\n\n建议你多开直播，和老铁们互动。慢手的粉丝忠诚度很高，只要真诚对待，老铁们会一直支持你！",
                isMessage: true,
                isOnboarding: true,
                options: [
                    {
                        text: "开启首场直播，和老铁打招呼",
                        effects: { fans: 60, personaFit: 5, mood: 10, energy: -15 },
                        type: 'positive'
                    },
                    {
                        text: "先发视频，熟悉平台",
                        effects: { fans: 25, contentQuality: 3, energy: -8 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "慢手磁力聚星介绍",
                description: "📱 小助理：慢手的商业化平台叫\u201C磁力聚星\u201D，达人可以在上面接品牌推广任务。\n\n慢手的打赏分成比例相当可观，头部主播月入可达百万级。不过也要注意，慢手近期在加强内容审核，低俗内容风险在增加。\n\n记住：在慢手，真实感比精致感更重要！",
                isMessage: true,
                isOnboarding: true,
                options: [
                    {
                        text: "明白了，走真实路线",
                        effects: { personaFit: 5, mood: 5 },
                        type: 'positive'
                    }
                ]
            }
        ],
        weibo: [
            {
                title: "巨博大V养成计划",
                description: "📱 小助理：欢迎入驻巨博！这里是中国最大的社交媒体平台，明星、网红、KOL云集，热搜与超话发酵极快。\n\n巨博入驻要点：\n1. 先申请巨博认证（蓝V/黄V），提升账号可信度\n2. 善用话题标签(#)和超话，融入热点讨论\n3. 巨博是舆论场，热搜能让你一夜爆红，也能让你一夜翻车\n\n巨博的流量池很大，话题传播速度极快。善用热点是涨粉捷径，但也要注意言论风险！",
                isMessage: true,
                isOnboarding: true,
                options: [
                    {
                        text: "申请认证，发布首条巨博",
                        effects: { fans: 45, personaFit: 5, contentQuality: 3, energy: -10 },
                        type: 'positive'
                    },
                    {
                        text: "先潜水观察，了解热点节奏",
                        effects: { contentQuality: 5, mood: 5, energy: -5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "巨博商业化须知",
                description: "📱 小助理：巨博的商业化体系比较成熟，有巨任务、品牌合作等多种变现方式。\n\n不过巨博的竞争非常激烈，明星和大V占据了大量流量。作为新人博主，建议你找准细分领域，避开和头部正面竞争。\n\n温馨提示：巨博是公共舆论空间，发言要谨慎。一条不当言论可能被截图传播，造成不可挽回的影响。",
                isMessage: true,
                isOnboarding: true,
                options: [
                    {
                        text: "了解了，谨慎发言",
                        effects: { contentQuality: 3, mood: 5 },
                        type: 'positive'
                    }
                ]
            }
        ]
    },

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
    
    // 多平台账号配置
    multiPlatformConfig: {
        // 开设新平台账号的条件
        unlockConditions: {
            minRank: "中级达人",      // 最低职级要求
            minFans: 10000,           // 最低粉丝要求
            minSavings: 10000         // 最低存款要求
        },
        // 开设新账号的基础成本
        baseCost: 8000,
        // 副账号每月维护成本基数（会根据粉丝数调整）
        maintenanceCostPerFan: 0.02,  // 每个粉丝0.02元/月
        maintenanceMinCost: 500,      // 最低维护成本
        // 副账号收益系数（相对于主账号）
        incomeMultiplier: 0.6,        // 副账号收益为主账号的60%
        // 副账号粉丝增长系数
        fansGrowthMultiplier: 0.4,    // 副账号涨粉速度为主账号的40%
        // 最大平台数量
        maxPlatforms: 5
    },

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
        "初级达人": 0.15,
        "新锐达人": 0.2,
        "中级达人": 0.28,
        "进阶达人": 0.34,
        "高级达人": 0.4,
        "头部达人": 0.5,
        "顶流达人": 0.55,
        "MCN签约": 0.6
    },

    // 基础团队事件权重（中级达人开始出现）
    teamBaseEventWeightByRank: {
        "素人": 0,
        "初级达人": 0,
        "新锐达人": 0.04,
        "中级达人": 0.1,
        "进阶达人": 0.16,
        "高级达人": 0.22,
        "头部达人": 0.3,
        "顶流达人": 0.33,
        "MCN签约": 0.35
    },

    // 矩阵扩张事件权重（高职级更常见）
    teamMatrixEventWeightByRank: {
        "素人": 0,
        "初级达人": 0,
        "新锐达人": 0,
        "中级达人": 0.04,
        "进阶达人": 0.08,
        "高级达人": 0.14,
        "头部达人": 0.22,
        "顶流达人": 0.32,
        "MCN签约": 0.4
    },

    // 不同职级挑战事件权重
    rankChallengeWeightByRank: {
        "素人": 0.2,
        "初级达人": 0.23,
        "新锐达人": 0.26,
        "中级达人": 0.29,
        "进阶达人": 0.31,
        "高级达人": 0.33,
        "头部达人": 0.35,
        "顶流达人": 0.37,
        "MCN签约": 0.38
    },

    // 类别挑战事件权重
    categoryChallengeWeightByRank: {
        "素人": 0.15,
        "初级达人": 0.18,
        "新锐达人": 0.21,
        "中级达人": 0.24,
        "进阶达人": 0.26,
        "高级达人": 0.29,
        "头部达人": 0.32,
        "顶流达人": 0.34,
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
                { name: "科普实验演示", rank: "新锐达人", energyCost: 18, effects: { contentQuality: 10, fans: 80 } },
                { name: "科普书籍合作", rank: "高级达人", energyCost: 25, effects: { contentQuality: 10, profit: 500 } },
                { name: "权威科普联名", rank: "头部达人", energyCost: 30, effects: { contentQuality: 15, fans: 1000, profit: 2000 } }
            ],
            profitChannel: "知识付费变现系数+0.2；商务报价（教育、科技类）+30%；职级每提升1级，商务报价额外+10%",
            risk: "科普内容错误、虚假科普；擦边玩谐音梗（低俗化科普、过度娱乐化解读专业知识）；职级越高，违规处罚越重",
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
                { name: "餐饮品牌专场", rank: "进阶达人", energyCost: 26, effects: { fans: 400, profit: 1500 } },
                { name: "餐饮头部品牌合作", rank: "头部达人", energyCost: 30, effects: { fans: 800, profit: 3000 } }
            ],
            profitChannel: "食品类带货佣金+25%；餐饮品牌商务邀约概率+40%；职级每提升1级，邀约概率额外+8%",
            risk: "食品卫生问题、虚假宣传（夸大口感）；擦边玩谐音梗（过度暴饮暴食博眼球、低俗互动、着装擦边）；职级越高，违规封禁概率越高",
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
            risk: "美妆产品过敏、虚假宣传（夸大功效）；擦边玩谐音梗（着装擦边、低俗妆容解读、过度营销擦边话术）；职级越高，品牌追责风险越高",
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
                { name: "生活类IP联名", rank: "进阶达人", energyCost: 22, effects: { fans: 500, profit: 2000 } },
                { name: "生活类顶流合作", rank: "头部达人", energyCost: 25, effects: { fans: 1200, profit: 4000 } }
            ],
            profitChannel: "全品类商务邀约概率+25%；变现渠道无明显短板，稳定性强；职级每提升1级，全品类邀约概率额外+6%",
            risk: "隐私泄露、内容低俗、植入广告过多；擦边玩谐音梗（低俗日常片段、过度博眼球的场景演绎、擦边话术互动）；职级越高，内容审核越严格",
            bonusEffects: { energy: 5, fanRetention: 0.1, diverseProfit: 0.25 }
        }
    ],

    // 职级配置（划分更细，反馈更足：9档）
    rankConfig: {
        "素人": { 
            minFans: 0,
            minContentQuality: 0,
            positiveBonus: 5, 
            violationDeduct: 10, 
            edgeDeduct: 5, 
            unlockCondition: "完成起名+类别选择",
            nextRank: "初级达人"
        },
        "初级达人": { 
            minFans: 500,
            minContentQuality: 20,
            positiveBonus: 8, 
            violationDeduct: 12,
            progressFull: 10,
            unlockCondition: "粉丝≥500 + 内容质量≥20 + 违规＜10",
            nextRank: "新锐达人"
        },
        "新锐达人": { 
            minFans: 1200,
            minContentQuality: 28,
            positiveBonus: 8, 
            violationDeduct: 12,
            progressFull: 18,
            unlockCondition: "粉丝≥1200 + 内容质量≥28 + 违规＜12",
            nextRank: "中级达人"
        },
        "中级达人": { 
            minFans: 2500,
            minContentQuality: 40,
            positiveBonus: 10, 
            violationDeduct: 14,
            progressFull: 26,
            unlockCondition: "粉丝≥2500 + 内容质量≥40 + 违规＜15 + 完成1次正向事件",
            nextRank: "进阶达人"
        },
        "进阶达人": { 
            minFans: 5500,
            minContentQuality: 48,
            positiveBonus: 10, 
            violationDeduct: 15,
            progressFull: 34,
            unlockCondition: "粉丝≥5500 + 内容质量≥48 + 违规＜17",
            nextRank: "高级达人"
        },
        "高级达人": { 
            minFans: 12000,
            minContentQuality: 55,
            positiveBonus: 12, 
            violationDeduct: 16,
            progressFull: 48,
            unlockCondition: "粉丝≥12000 + 内容质量≥55 + 违规＜20 + 无职级负向违规",
            nextRank: "头部达人"
        },
        "头部达人": { 
            minFans: 35000,
            minContentQuality: 68,
            positiveBonus: 13, 
            violationDeduct: 18,
            progressFull: 62,
            unlockCondition: "粉丝≥35000 + 内容质量≥68 + 违规＜25 + 完成2次正向事件",
            nextRank: "顶流达人"
        },
        "顶流达人": { 
            minFans: 80000,
            minContentQuality: 78,
            positiveBonus: 14, 
            violationDeduct: 19,
            progressFull: 85,
            unlockCondition: "粉丝≥80000 + 内容质量≥78 + 违规＜28",
            nextRank: "MCN签约"
        },
        "MCN签约": { 
            minFans: 200000,
            minContentQuality: 88,
            positiveBonus: 15, 
            violationDeduct: 20,
            progressFull: 120,
            unlockCondition: "粉丝≥200000 + 内容质量≥88 + 违规＜30 + 累计收益≥100000",
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

    // 擦边次数触发专属事件配置（职级越高阈值越低，越容易触发；粉丝量参与严重度）
    edgeEscalationConfig: {
        // 概率触发：基础概率、每次擦边累加、概率上限（擦边次数/粉丝量/职级越高越易触发）
        triggerBaseRate: 0.05,
        triggerPerCountRate: 0.03,
        triggerMaxRate: 0.85,
        // 粉丝量档位（用于加重严重度与触发概率）：达到则 severity/概率 提升
        fanSeverityBands: [10000, 100000, 500000]
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
            "初级达人": 200,
            "新锐达人": 450,
            "中级达人": 700,
            "进阶达人": 1100,
            "高级达人": 1800,
            "头部达人": 2800,
            "顶流达人": 4000,
            "MCN签约": 5000
        }
    },

    // 合作类选项的二级选择：合作对象（谐音梗）
    cooperationPartners: [
        { id: 'laoganma', name: '老干码', tag: '谐音：老干妈。老在写代码，不上市不差钱' },
        { id: 'weilong', name: '未龙', tag: '谐音：卫龙。尚未成龙，辣条先成' },
        { id: 'erke', name: '红星二课', tag: '谐音：鸿星尔克。红色星星上两节课' },
        { id: 'baixiang', name: '白相', tag: '谐音：白象。沪语「白相」就是玩，玩转泡面' },
        { id: 'mixue', name: '密学冰成', tag: '谐音：蜜雪冰城。秘密学成，冰城出道' },
        { id: 'yeshu', name: '爷树', tag: '谐音：椰树。爷叔种的树，从小喝到大' },
        { id: 'luckin', name: '瑞杏', tag: '谐音：瑞幸。瑞气杏运，酱香翻盘' },
        { id: 'dongyuhei', name: '懂语会', tag: '谐音：董宇辉。懂语言就会了，玉米六块' },
        { id: 'xiaoyangge', name: '小样哥', tag: '谐音：小杨哥。小样儿，反向带货' },
        { id: 'zhangtongxue', name: '涨同学', tag: '谐音：张同学。涨粉的同学，一镜到底' },
        { id: 'fengchan', name: '风产姐妹', tag: '谐音：疯产姐妹。风头正产，不接广告' },
        { id: 'lijiaqi', name: '里佳琪', tag: '谐音：李佳琦。里面的佳琪，所有女生' },
        { id: 'liujianhong', name: '流耕宏', tag: '谐音：刘畊宏。流量耕种很宏，毽子操' },
        { id: 'xdf', name: '心东方', tag: '谐音：新东方。心向东方，知识型直播' },
        { id: 'naixue', name: '奶雪的茶', tag: '谐音：奈雪的茶。奶香雪顶，霸气系列' },
        { id: 'huaxizi', name: '画西子', tag: '谐音：花西子。画中西子，国风美妆' },
        { id: 'perfectdiary', name: '完美日寄', tag: '谐音：完美日记。每日寄送，大牌平替' },
        { id: 'chaoren', name: '潮人', tag: '谐音：超人。潮流之人，男人的选择' }
    ],

    // 通用行动（按职级开放：rank 为解锁所需职级）
    commonActions: [
        { name: "拍摄短视频", rank: "素人", energyCost: 15, effects: { contentQuality: 3, fans: 20, savings: -200 }, description: "创作日常短视频内容（需投入制作成本）" },
        { name: "学习提升", rank: "素人", energyCost: 15, effects: { contentQuality: 5, personaFit: 3 }, description: "学习专业技能提升自己" },
        { name: "能力训练", rank: "素人", energyCost: 0, effects: {}, description: "选择训练方式提升角色属性" },
        { name: "休息调整", rank: "素人", energyCost: 0, effects: { mood: 10, energy: 20 }, description: "休息恢复精力和心态" },
        { name: "接商务广告", rank: "初级达人", energyCost: 10, effects: { personaFit: -2, profit: 300 }, description: "接受品牌商务合作" },
        { name: "擦边试探", rank: "初级达人", energyCost: 0, effects: {}, description: "选择擦边方向获取流量" },
        { name: "直播互动", rank: "新锐达人", energyCost: 20, effects: { mood: -5, fans: 50, profit: 150 }, description: "与粉丝进行直播互动" }
    ]
};
