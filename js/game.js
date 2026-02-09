// 游戏核心逻辑
class InfluencerGame {
    constructor() {
        this.state = {
            // 基础信息
            influencerName: '',
            gender: null,
            avatarId: null,
            category: null,
            platform: null,  // 当前平台
            rank: '素人',
            month: 1,
            year: 2026,
            
            // 数值属性
            energy: 80,
            mood: 80,
            contentQuality: 20,
            personaFit: 20,
            fans: 0,
            profit: 0,
            
            // 违规相关
            violationIndex: 0,
            violationCount: 0,
            fanGrowthRate: 1,
            violationMultiplier: 1,
            
            // 进度
            rankProgress: 0,
            
            // 事件追踪
            completedPositiveEvents: [],
            hasRankViolation: false,
            
            // 游戏状态
            isGameOver: false,
            gameOverReason: '',
            timelineEventsTriggered: {},
            attributes: null,
            chainQueue: {},
            deferredEvents: {},
            trainingCount: 0,
            actionCount: 0,
            lastRankUp: null,
            messages: [],  // 助理消息队列
            messageIdCounter: 1,  // 消息ID计数器
            subPlatforms: [],  // 副平台账号列表
            deferredOnboarding: [],  // 延迟的引导消息队列
            edgeCount: 0,  // 擦边次数累计
            edgeEscalationLevel: 0,  // 已触发的擦边等级
            lastMonthStats: {  // 上个月的数据统计
                fans: 0,
                savings: 5000
            }
        };
        
        this.eventLog = [];
        this.currentMonthActions = [];
    }

    // 初始化游戏
    init() {
        this.state = {
            ...GameConfig.initialData,
            influencerName: '',
            gender: null,
            avatarId: null,
            category: null,
            platform: null,
            rank: '素人',
            completedPositiveEvents: [],
            hasRankViolation: false,
            isGameOver: false,
            gameOverReason: '',
            timelineEventsTriggered: {},
            attributes: null,
            chainQueue: {},
            deferredEvents: {},
            trainingCount: 0,
            actionCount: 0,
            lastRankUp: null,
            deferredOnboarding: [],
            messages: [],
            messageIdCounter: 1,
            subPlatforms: [],
            edgeCount: 0,
            edgeEscalationLevel: 0,
            lastMonthStats: {
                fans: 0,
                savings: 5000
            }
        };
        this.eventLog = [];
        this.currentMonthActions = [];
    }

    // 随机分配角色属性
    rollAttributes() {
        const config = GameConfig.characterAttributes;
        const attrs = {};
        const list = config.list;
        const total = Math.floor(
            Math.random() * (config.totalPointsMax - config.totalPointsMin + 1)
        ) + config.totalPointsMin;
        const min = config.min;
        const max = config.max;

        list.forEach(item => {
            attrs[item.key] = min;
        });

        let remaining = total - min * list.length;
        while (remaining > 0) {
            const idx = Math.floor(Math.random() * list.length);
            const key = list[idx].key;
            if (attrs[key] < max) {
                attrs[key] += 1;
                remaining -= 1;
            }
        }

        this.state.attributes = attrs;
        return attrs;
    }

    // 行动次数限制
    getActionLimit() {
        return GameConfig.actionLimitPerMonth || 5;
    }

    canTakeAction() {
        return this.state.actionCount < this.getActionLimit();
    }

    consumeAction() {
        this.state.actionCount += 1;
    }

    // 获取属性加成倍率（只作用于正向收益）
    getAttributeMultiplier(key) {
        const attrs = this.state.attributes || {};
        const appearance = attrs.appearance || 5;
        const education = attrs.education || 5;
        const humor = attrs.humor || 5;
        const temperament = attrs.temperament || 5;
        const cameraSense = attrs.cameraSense || 5;

        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
        const cat = this.state.category ? this.state.category.id : null;

        let base = 1;
        if (key === 'fans') {
            base += (appearance - 5) * 0.02;
            base += (humor - 5) * 0.02;
            base += (cameraSense - 5) * 0.02;
            if (cat === 'mukbang') base += (humor - 5) * 0.02;
            if (cat === 'beauty') base += (appearance - 5) * 0.02;
            if (cat === 'lifestyle') base += (cameraSense - 5) * 0.01;
        } else if (key === 'contentQuality') {
            base += (education - 5) * 0.03;
            base += (cameraSense - 5) * 0.02;
            if (cat === 'science') base += (education - 5) * 0.02;
        } else if (key === 'personaFit') {
            base += (temperament - 5) * 0.03;
            base += (education - 5) * 0.01;
            if (cat === 'beauty' || cat === 'lifestyle') base += (temperament - 5) * 0.02;
        } else if (key === 'profit') {
            base += (appearance - 5) * 0.02;
            base += (cameraSense - 5) * 0.01;
            if (cat === 'beauty') base += (appearance - 5) * 0.02;
            if (cat === 'mukbang') base += (humor - 5) * 0.01;
        } else if (key === 'mood') {
            base += (humor - 5) * 0.02;
            base += (temperament - 5) * 0.01;
        }

        return clamp(base, 0.7, 1.4);
    }

    // 擦边收益倍率（基于属性）
    getEdgeMultiplier() {
        const attrs = this.state.attributes || {};
        const appearance = attrs.appearance || 5;
        const humor = attrs.humor || 5;
        const cameraSense = attrs.cameraSense || 5;
        const temperament = attrs.temperament || 5;

        let base = 1;
        base += (appearance - 5) * 0.03;
        base += (humor - 5) * 0.02;
        base += (cameraSense - 5) * 0.03;
        base += (temperament - 5) * 0.01;
        return Math.max(0.8, Math.min(1.6, base));
    }

    // 粉丝规模收益倍率
    getFanProfitMultiplier() {
        const tiers = GameConfig.profitFanMultiplierTiers || [];
        if (tiers.length === 0) return 1;
        const fans = this.state.fans || 0;
        let mult = 1;
        tiers.forEach(t => {
            if (fans >= t.minFans) mult = t.multiplier;
        });
        return mult;
    }

    // 粉丝增长：职级、粉丝量、内容质量三维加成（仅用于涨粉，数值越高增长越高）
    getFanGrowthDimensionMultiplier() {
        const rankOrder = ['素人', '初级达人', '新锐达人', '中级达人', '进阶达人', '高级达人', '头部达人', '顶流达人', 'MCN签约'];
        const rankIndex = rankOrder.indexOf(this.state.rank || '素人');
        const rankMult = 0.85 + rankIndex * 0.12; // 9档：0.85 ~ 1.81

        const fans = this.state.fans || 0;
        const fansMult = 1 + Math.min(0.35, Math.log10(fans + 1) * 0.08); // 粉丝越多口碑/曝光加成，约 1.0 ~ 1.35

        const quality = Math.max(0, Math.min(100, this.state.contentQuality || 0));
        const qualityMult = 0.75 + (quality / 100) * 0.75; // 内容质量 0→0.75, 100→1.5

        return rankMult * fansMult * qualityMult;
    }

    // 按职级取权重
    getWeightByRank(map, fallback = 0) {
        if (!map) return fallback;
        if (Object.prototype.hasOwnProperty.call(map, this.state.rank)) {
            return map[this.state.rank];
        }
        return fallback;
    }

    // 事件触发条件判断（名字/性别）
    isEventEligible(event) {
        if (!event || !event.requirements) return true;
        const req = event.requirements;
        const rankOrder = ["素人", "初级达人", "新锐达人", "中级达人", "进阶达人", "高级达人", "头部达人", "顶流达人", "MCN签约"];
        const currentRankIndex = rankOrder.indexOf(this.state.rank);
        if (req.genders && Array.isArray(req.genders)) {
            if (!this.state.gender || !req.genders.includes(this.state.gender)) return false;
        }
        if (req.names && Array.isArray(req.names)) {
            if (!this.state.influencerName || !req.names.includes(this.state.influencerName)) return false;
        }
        if (req.minRank) {
            if (currentRankIndex < rankOrder.indexOf(req.minRank)) return false;
        }
        if (req.maxRank) {
            if (currentRankIndex > rankOrder.indexOf(req.maxRank)) return false;
        }
        if (req.minAttributes) {
            const attrs = this.state.attributes || {};
            for (const [key, min] of Object.entries(req.minAttributes)) {
                if ((attrs[key] || 0) < min) return false;
            }
        }
        if (req.maxAttributes) {
            const attrs = this.state.attributes || {};
            for (const [key, max] of Object.entries(req.maxAttributes)) {
                if ((attrs[key] || 0) > max) return false;
            }
        }
        return true;
    }

    // 选项触发条件判断
    isOptionEligible(option) {
        if (!option || !option.requirements) return true;
        return this.isEventEligible({ requirements: option.requirements });
    }

    // 权重随机事件
    pickWeightedEvent(pools) {
        const available = [];
        pools.forEach(pool => {
            if (!pool || !pool.events || pool.weight <= 0) return;
            const candidates = pool.events.filter(e => this.isEventEligible(e));
            if (candidates.length > 0) {
                available.push({ weight: pool.weight, candidates });
            }
        });
        if (available.length === 0) return null;
        const total = available.reduce((sum, p) => sum + p.weight, 0);
        let roll = Math.random() * total;
        for (const pool of available) {
            if (roll < pool.weight) {
                const list = pool.candidates;
                return list[Math.floor(Math.random() * list.length)];
            }
            roll -= pool.weight;
        }
        const fallback = available[0].candidates;
        return fallback[Math.floor(Math.random() * fallback.length)];
    }

    // 从事件列表中筛选可触发事件
    pickEligibleEvent(events) {
        const filtered = events.filter(e => this.isEventEligible(e));
        if (filtered.length === 0) return null;
        return filtered[Math.floor(Math.random() * filtered.length)];
    }

    // 升级角色属性
    upgradeAttributes(count = 1) {
        const config = GameConfig.characterAttributes;
        if (!this.state.attributes) return;
        const keys = config.list.map(item => item.key);
        const max = config.max;
        let upgraded = 0;

        while (upgraded < count) {
            const key = keys[Math.floor(Math.random() * keys.length)];
            if (this.state.attributes[key] < max) {
                this.state.attributes[key] += 1;
                upgraded += 1;
                this.addLog(`属性提升：${config.list.find(i => i.key === key).name} +1`, 'positive');
            } else {
                const allMaxed = keys.every(k => this.state.attributes[k] >= max);
                if (allMaxed) break;
            }
        }
    }

    // 获取能力训练事件
    getTrainingEvent() {
        const options = GameConfig.trainingOptions.map(item => ({
            text: `${item.name}（${item.desc}）`,
            effects: item.effects,
            type: 'mixed'
        }));

        return {
            title: "能力训练",
            description: "选择一种训练方式提升角色属性（有消耗）。",
            options
        };
    }

    // 获取擦边试探事件
    getEdgeActionEvent() {
        if (!Array.isArray(EdgeActionEvents) || EdgeActionEvents.length === 0) return null;
        return this.pickEligibleEvent(EdgeActionEvents);
    }

    // 计算每月固定支出
    getMonthlyExpenses() {
        const rent = GameConfig.monthlyExpenses.rent || 0;
        const teamCost = GameConfig.monthlyExpenses.teamCostByRank[this.state.rank] || 0;
        return {
            rent,
            teamCost,
            total: rent + teamCost
        };
    }

    // 应用属性加成后的数值变更
    applyEffectValue(key, value, results) {
        if (key === 'energy') {
            this.state.energy = Math.max(0, Math.min(100, this.state.energy + value));
            results.push(`精力${value > 0 ? '+' : ''}${value}`);
            if (this.state.energy <= 0) {
                this.gameOver('精力归零，猝死事件触发，游戏结束');
            }
            return;
        }
        if (key === 'mood') {
            const finalValue = value > 0 ? Math.round(value * this.getAttributeMultiplier('mood')) : value;
            this.state.mood = Math.max(0, Math.min(100, this.state.mood + finalValue));
            results.push(`心态${finalValue > 0 ? '+' : ''}${finalValue}`);
            if (this.state.mood <= 0) {
                this.gameOver('心态炸了，游戏结束');
            }
            return;
        }
        if (key === 'contentQuality') {
            let finalValue = value > 0 ? Math.round(value * this.getAttributeMultiplier('contentQuality')) : value;
            // 应用平台内容质量加成
            if (finalValue > 0) {
                finalValue = Math.round(finalValue * this.getPlatformBonus('contentBonus'));
            }
            this.state.contentQuality = Math.max(0, Math.min(100, this.state.contentQuality + finalValue));
            results.push(`内容质量${finalValue > 0 ? '+' : ''}${finalValue}`);
            return;
        }
        if (key === 'personaFit') {
            const finalValue = value > 0 ? Math.round(value * this.getAttributeMultiplier('personaFit')) : value;
            this.state.personaFit = Math.max(0, Math.min(100, this.state.personaFit + finalValue));
            results.push(`人设契合${finalValue > 0 ? '+' : ''}${finalValue}`);
            return;
        }
        if (key === 'fans') {
            const baseValue = value > 0 ? Math.floor(value * this.state.fanGrowthRate) : value;
            let finalValue = value > 0
                ? Math.floor(baseValue * this.getFanGrowthDimensionMultiplier() * this.getAttributeMultiplier('fans'))
                : value;
            // 应用平台加成
            if (finalValue > 0) {
                finalValue = Math.floor(finalValue * this.getPlatformBonus('fanGrowth'));
            }
            this.state.fans = Math.max(0, this.state.fans + finalValue);
            results.push(`粉丝${finalValue > 0 ? '+' : ''}${finalValue}`);
            return;
        }
        if (key === 'profit') {
            let finalValue = value > 0 ? Math.floor(value * this.getAttributeMultiplier('profit')) : value;
            if (finalValue > 0) {
                finalValue = Math.floor(finalValue * this.getFanProfitMultiplier());
                // 应用平台加成
                finalValue = Math.floor(finalValue * this.getPlatformBonus('profitRate'));
                this.state.profit += finalValue;
                this.state.savings += finalValue;
                results.push(`收益+¥${Math.abs(finalValue)}`);
                results.push(`存款+¥${Math.abs(finalValue)}`);
            } else if (finalValue < 0) {
                this.state.savings += finalValue;
                results.push(`支出-¥${Math.abs(finalValue)}`);
                results.push(`存款-¥${Math.abs(finalValue)}`);
            }
            if (this.state.savings <= 0) {
                this.gameOver('存款归零，资金链断裂，游戏结束');
            }
            return;
        }
        if (key === 'edgeFans') {
            const baseValue = value > 0 ? Math.floor(value * this.state.fanGrowthRate) : value;
            let finalValue = value > 0
                ? Math.floor(baseValue * this.getFanGrowthDimensionMultiplier() * this.getEdgeMultiplier())
                : value;
            if (finalValue > 0) {
                finalValue = Math.floor(finalValue * this.getPlatformBonus('fanGrowth'));
            }
            this.state.fans = Math.max(0, this.state.fans + finalValue);
            results.push(`粉丝${finalValue > 0 ? '+' : ''}${finalValue}`);
            return;
        }
        if (key === 'edgeProfit') {
            let finalValue = value > 0 ? Math.floor(value * this.getEdgeMultiplier()) : value;
            if (finalValue > 0) {
                finalValue = Math.floor(finalValue * this.getFanProfitMultiplier());
                this.state.profit += finalValue;
                this.state.savings += finalValue;
                results.push(`收益+¥${Math.abs(finalValue)}`);
                results.push(`存款+¥${Math.abs(finalValue)}`);
            } else if (finalValue < 0) {
                this.state.savings += finalValue;
                results.push(`支出-¥${Math.abs(finalValue)}`);
                results.push(`存款-¥${Math.abs(finalValue)}`);
            }
            if (this.state.savings <= 0) {
                this.gameOver('存款归零，资金链断裂，游戏结束');
            }
            return;
        }
        if (key === 'savings') {
            this.state.savings += value;
            const moneySign = value >= 0 ? '+' : '-';
            results.push(`存款${moneySign}¥${Math.abs(value)}`);
            if (this.state.savings <= 0) {
                this.gameOver('存款归零，资金链断裂，游戏结束');
            }
            return;
        }
        if (key === 'rankProgress') {
            this.state.rankProgress = Math.max(0, (this.state.rankProgress || 0) + value);
            const contentQualityGain = Math.floor(value * 0.5);
            if (contentQualityGain !== 0) {
                this.state.contentQuality = Math.max(0, this.state.contentQuality + contentQualityGain);
                results.push(`内容质量${contentQualityGain > 0 ? '+' : ''}${contentQualityGain}`);
            }
            results.push(`职级进度${value > 0 ? '+' : ''}${value}`);
            return;
        }
        if (key === 'attribute') {
            const config = GameConfig.characterAttributes;
            const max = config.max;
            Object.entries(value).forEach(([attrKey, add]) => {
                if (!this.state.attributes) return;
                const before = this.state.attributes[attrKey] || 0;
                const after = Math.min(max, before + add);
                this.state.attributes[attrKey] = after;
                const attrName = config.list.find(i => i.key === attrKey)?.name || attrKey;
                results.push(`${attrName}+${after - before}`);
            });
            return;
        }
        if (key === 'attributeUp') {
            this.upgradeAttributes(value);
            results.push(`属性提升+${value}`);
        }
    }

    // 设置网红名字
    setInfluencerName(name) {
        if (!this.state.gender) {
            return { success: false, message: '请选择性别' };
        }
        if (!this.state.avatarId) {
            return { success: false, message: '请选择头像' };
        }
        if (!this.state.attributes) {
            return { success: false, message: '请先随机分配角色属性' };
        }
        // 检查违规词
        for (let word of GameConfig.forbiddenWords) {
            if (name.includes(word)) {
                return { success: false, message: `名字包含违规词汇: ${word}` };
            }
        }
        
        // 检查长度
        if (name.length < 2 || name.length > 10) {
            return { success: false, message: '名字长度必须在2-10个字符之间' };
        }
        
        this.state.influencerName = name;
        return { success: true };
    }

    // 设置性别
    setGender(gender) {
        const valid = GameConfig.genderOptions.some(item => item.value === gender);
        if (!valid) return { success: false, message: '性别选项无效' };
        this.state.gender = gender;
        return { success: true };
    }

    // 设置头像
    setAvatar(avatarId) {
        if (!this.state.gender) return { success: false, message: '请先选择性别' };
        const list = GameConfig.avatarOptions?.[this.state.gender] || [];
        const valid = list.some(item => item.id === avatarId);
        if (!valid) return { success: false, message: '头像选项无效' };
        this.state.avatarId = avatarId;
        return { success: true };
    }

    // 选择类别
    selectCategory(categoryId) {
        const category = GameConfig.categories.find(c => c.id === categoryId);
        if (!category) return false;
        
        this.state.category = category;
        
        // 应用初始加成
        if (category.bonusEffects) {
            if (category.bonusEffects.contentQuality) {
                this.state.contentQuality += category.bonusEffects.contentQuality;
            }
            if (category.bonusEffects.mood) {
                this.state.mood += category.bonusEffects.mood;
            }
            if (category.bonusEffects.personaFit) {
                this.state.personaFit += category.bonusEffects.personaFit;
            }
            if (category.bonusEffects.energy) {
                this.state.energy += category.bonusEffects.energy;
            }
        }
        
        this.addLog(`选择了 ${category.name} 类别！`);
        return true;
    }

    // 选择平台
    selectPlatform(platformId) {
        const platform = GameConfig.platforms[platformId];
        if (!platform) return false;
        
        this.state.platform = platform;
        this.addLog(`选择了平台：${platform.name} ${platform.icon}`, 'positive');
        
        // 触发平台入驻引导消息
        this.triggerPlatformOnboarding(platformId);
        
        return true;
    }

    // 触发平台入驻引导事件
    triggerPlatformOnboarding(platformId) {
        const onboardingEvents = GameConfig.platformOnboarding?.[platformId];
        if (!onboardingEvents || !Array.isArray(onboardingEvents)) return;
        
        // 将所有引导消息加入助理消息队列
        onboardingEvents.forEach((event, index) => {
            // 第一条立即加入，后续标记延迟（第二个月触发）
            if (index === 0) {
                this.addMessage(event, true);  // 第一条标记为紧急
                this.addLog(`📱 收到${this.state.platform.name}平台引导消息`, 'positive');
            } else {
                // 后续引导消息存入延迟队列，下个月触发
                if (!this.state.deferredOnboarding) {
                    this.state.deferredOnboarding = [];
                }
                this.state.deferredOnboarding.push(event);
            }
        });
    }

    // 检查并触发延迟的引导消息
    checkDeferredOnboarding() {
        if (!this.state.deferredOnboarding || this.state.deferredOnboarding.length === 0) return;
        
        const event = this.state.deferredOnboarding.shift();
        if (event) {
            this.addMessage(event, false);
            this.addLog(`📱 收到助理后续引导消息：${event.title}`, 'normal');
        }
    }

    // 切换平台
    switchPlatform(newPlatformId) {
        const newPlatform = GameConfig.platforms[newPlatformId];
        if (!newPlatform || !this.state.platform) return { success: false, message: '平台不存在' };
        
        if (this.state.platform.id === newPlatformId) {
            return { success: false, message: '已经在该平台了' };
        }
        
        const oldPlatform = this.state.platform;
        const fansLost = Math.floor(this.state.fans * newPlatform.switchCost);
        
        this.state.platform = newPlatform;
        this.state.fans = Math.max(0, this.state.fans - fansLost);
        
        this.addLog(`从 ${oldPlatform.name} 切换到 ${newPlatform.name}，损失了 ${fansLost.toLocaleString()} 粉丝`, 'negative');
        
        // 切换平台后也触发新平台的引导消息
        this.triggerPlatformOnboarding(newPlatformId);
        
        return { 
            success: true, 
            fansLost,
            message: `切换到${newPlatform.name}，损失${fansLost.toLocaleString()}粉丝`
        };
    }

    // 获取平台加成
    getPlatformBonus(type) {
        if (!this.state.platform) return 1;
        return this.state.platform.bonuses[type] || 1;
    }

    // 获取可用行动
    getAvailableActions() {
        const actions = [];
        GameConfig.commonActions.forEach(a => {
            if (!a.rank || this.canUnlockRank(a.rank)) {
                actions.push({ ...a, categoryType: 'common' });
            }
        });
        if (this.state.category) {
            this.state.category.exclusiveActions.forEach(a => {
                if (this.canUnlockRank(a.rank)) {
                    actions.push({
                        ...a,
                        categoryType: 'exclusive',
                        categoryName: this.state.category.name
                    });
                }
            });
        }
        return actions;
    }

    // 检查是否可以解锁职级
    canUnlockRank(rankName) {
        const ranks = Object.keys(GameConfig.rankConfig);
        const currentRankIndex = ranks.indexOf(this.state.rank);
        const targetRankIndex = ranks.indexOf(rankName);
        return targetRankIndex <= currentRankIndex;
    }

    // 执行行动
    performAction(actionName) {
        if (!this.canTakeAction()) {
            return { success: false, message: `本月行动次数已达上限（${this.getActionLimit()}次）。\n\n提示：小助理消息、平台管理不消耗行动次数。` };
        }
        const allActions = this.getAvailableActions();
        const action = allActions.find(a => a.name === actionName);
        
        if (!action) return { success: false, message: '行动不存在' };
        
        // 检查精力
        if (action.energyCost > 0 && this.state.energy < action.energyCost) {
            return { success: false, message: '精力不足' };
        }
        
        // 消耗精力
        this.state.energy -= action.energyCost;
        this.state.energy = Math.max(0, this.state.energy);
        if (this.state.energy <= 0) {
            this.gameOver('精力归零，猝死事件触发，游戏结束');
            return { success: false, message: '精力归零，猝死事件触发，游戏结束', gameOver: true };
        }
        
        // 应用效果
        const results = [];
        if (action.effects) {
            for (let [key, value] of Object.entries(action.effects)) {
                this.applyEffectValue(key, value, results);
            }
        }
        
        this.consumeAction();
        this.currentMonthActions.push(actionName);
        this.addLog(`执行 ${actionName}：${results.join('，')}`, 'positive');
        
        // 触发事件
        if (Math.random() < GameConfig.eventProbability.afterActionTrigger) {
            return { success: true, triggerEvent: true };
        }
        
        return { success: true, triggerEvent: false };
    }

    // 触发随机事件
    triggerRandomEvent() {
        const rand = Math.random();
        
        // 40% 专属事件，60% 通用事件
        if (rand < GameConfig.eventProbability.exclusiveTotal && this.state.category) {
            return this.getExclusiveEvent();
        } else {
            return this.getCommonEvent();
        }
    }

    // 计算下一月
    getNextMonthYear(year, month) {
        if (month >= 12) {
            return { year: year + 1, month: 1 };
        }
        return { year, month: month + 1 };
    }

    // 将本月链式事件顺延到下一个可用月份
    deferChainEventForCurrentMonth() {
        const key = `${this.state.year}-${this.state.month}`;
        const chainEventId = this.state.chainQueue[key];
        if (!chainEventId) return;

        delete this.state.chainQueue[key];
        let next = this.getNextMonthYear(this.state.year, this.state.month);
        let nextKey = `${next.year}-${next.month}`;
        while (this.state.chainQueue[nextKey]) {
            next = this.getNextMonthYear(next.year, next.month);
            nextKey = `${next.year}-${next.month}`;
        }
        this.state.chainQueue[nextKey] = chainEventId;
    }

    // 延后年度事件，保证触发（支持 id 或 severity，擦边事件用 severity）
    enqueueDeferredEvent(event, year, month) {
        const key = `${year}-${month}`;
        if (!this.state.deferredEvents[key]) {
            this.state.deferredEvents[key] = [];
        }
        const payload = { source: event.source, id: event.id };
        if (event.severity !== undefined) payload.severity = event.severity;
        this.state.deferredEvents[key].push(payload);
    }

    // 获取本月延后事件
    getDeferredEventForCurrentMonth() {
        const key = `${this.state.year}-${this.state.month}`;
        const queue = this.state.deferredEvents[key];
        if (!queue || queue.length === 0) return null;

        const item = queue.shift();
        if (queue.length === 0) delete this.state.deferredEvents[key];

        if (item.source === 'annual') {
            const event = AnnualEvents.find(e => e.id === item.id) || null;
            if (event && this.isEventEligible(event)) {
                this.state.timelineEventsTriggered[event.id] = true;
                return event;
            }
            return null;
        }
        if (item.source === 'categoryAnnual') {
            const event = AnnualEventsByCategory.find(e => e.id === item.id) || null;
            if (event && this.isEventEligible(event)) {
                this.state.timelineEventsTriggered[event.id] = true;
                return event;
            }
            return null;
        }
        if (item.source === 'edge') {
            const list = Array.isArray(EdgeEscalationEvents) ? EdgeEscalationEvents : [];
            const event = item.severity !== undefined
                ? list.find(e => e.severity === item.severity)
                : list.find(e => e.id === item.id);
            if (event) return event;
            return null;
        }
        return null;
    }

    // 将本月未触发的延后事件顺延到下个月
    carryDeferredEventsToNextMonth(year, month) {
        const key = `${year}-${month}`;
        const queue = this.state.deferredEvents[key];
        if (!queue || queue.length === 0) return;

        const next = this.getNextMonthYear(year, month);
        const nextKey = `${next.year}-${next.month}`;
        if (!this.state.deferredEvents[nextKey]) {
            this.state.deferredEvents[nextKey] = [];
        }
        this.state.deferredEvents[nextKey].push(...queue);
        delete this.state.deferredEvents[key];
    }

    // 触发链式事件（连续剧情）
    getChainEventForCurrentMonth() {
        const key = `${this.state.year}-${this.state.month}`;
        const chainEventId = this.state.chainQueue[key];
        if (!chainEventId || !ChainEvents || !ChainEvents[chainEventId]) return null;

        const event = ChainEvents[chainEventId];
        if (!this.isEventEligible(event)) return null;
        if (this.state.timelineEventsTriggered[event.id]) return null;

        this.state.timelineEventsTriggered[event.id] = true;
        delete this.state.chainQueue[key];

        if (event.nextId && ChainEvents[event.nextId]) {
            const next = this.getNextMonthYear(this.state.year, this.state.month);
            this.state.chainQueue[`${next.year}-${next.month}`] = event.nextId;
        }

        return event;
    }

    // 获取当前年月的时间线事件（优先触发）
    getTimelineEventForCurrentMonth() {
        if (!Array.isArray(TimelineEvents) || TimelineEvents.length === 0) return null;
        const keyPrefix = `${this.state.year}-${this.state.month}-`;
        const event = TimelineEvents.find(item => {
            return item.year === this.state.year &&
                   item.month === this.state.month &&
                   !this.state.timelineEventsTriggered[item.id];
        });
        if (event && this.isEventEligible(event)) {
            this.state.timelineEventsTriggered[event.id] = true;
            if (event.nextId && ChainEvents && ChainEvents[event.nextId]) {
                const next = this.getNextMonthYear(this.state.year, this.state.month);
                this.state.chainQueue[`${next.year}-${next.month}`] = event.nextId;
            }
            return event;
        }
        return null;
    }

    // 按类别定制的年度大事件
    getCategoryAnnualEventForCurrentMonth() {
        if (!this.state.category || !Array.isArray(AnnualEventsByCategory)) return null;
        const categoryId = this.state.category.id;
        const event = AnnualEventsByCategory.find(item => {
            return item.year === this.state.year &&
                   item.month === this.state.month &&
                   item.categoryId === categoryId &&
                   !this.state.timelineEventsTriggered[item.id];
        });
        if (event && this.isEventEligible(event)) {
            this.state.timelineEventsTriggered[event.id] = true;
            return event;
        }
        return null;
    }

    // 获取年度大事件（每年固定月份触发）
    getAnnualEventForCurrentMonth() {
        return this.findAnnualEventForCurrentMonth(true);
    }

    // 查找年度事件（可选是否标记触发）
    findAnnualEventForCurrentMonth(markTriggered = false) {
        if (!Array.isArray(AnnualEvents) || AnnualEvents.length === 0) return null;
        const event = AnnualEvents.find(item => {
            return item.year === this.state.year &&
                   item.month === this.state.month &&
                   !this.state.timelineEventsTriggered[item.id];
        });
        if (event && this.isEventEligible(event) && markTriggered) {
            this.state.timelineEventsTriggered[event.id] = true;
        }
        return event && this.isEventEligible(event) ? event : null;
    }

    // 按粉丝规模/职级触发的大事件
    getMilestoneEventForCurrentMonth() {
        if (!Array.isArray(MilestoneEvents) || MilestoneEvents.length === 0) return null;
        const rankOrder = ["素人", "初级达人", "新锐达人", "中级达人", "进阶达人", "高级达人", "头部达人", "顶流达人", "MCN签约"];
        const currentRankIndex = rankOrder.indexOf(this.state.rank);
        const event = MilestoneEvents.find(item => {
            const rankOk = item.minRank
                ? currentRankIndex >= rankOrder.indexOf(item.minRank)
                : true;
            const fansOk = item.minFans ? this.state.fans >= item.minFans : true;
            return rankOk &&
                   fansOk &&
                   !this.state.timelineEventsTriggered[item.id];
        });
        if (event && this.isEventEligible(event)) {
            this.state.timelineEventsTriggered[event.id] = true;
            return event;
        }
        return null;
    }

    // 获取当前月份事件（时间线事件优先）
    getEventForCurrentMonth() {
        const deferredEvent = this.getDeferredEventForCurrentMonth();
        if (deferredEvent) return deferredEvent;

        const categoryAnnual = this.getCategoryAnnualEventForCurrentMonth();
        if (categoryAnnual) {
            const annualEvent = this.findAnnualEventForCurrentMonth(false);
            if (annualEvent) {
                this.enqueueDeferredEvent({ source: 'annual', id: annualEvent.id }, this.state.year, this.state.month);
            }
            this.deferChainEventForCurrentMonth();
            return categoryAnnual;
        }

        const annualEvent = this.getAnnualEventForCurrentMonth();
        if (annualEvent) {
            this.deferChainEventForCurrentMonth();
            return annualEvent;
        }

        const chainEvent = this.getChainEventForCurrentMonth();
        if (chainEvent) return chainEvent;

        const milestoneEvent = this.getMilestoneEventForCurrentMonth();
        if (milestoneEvent) return milestoneEvent;

        const timelineEvent = this.getTimelineEventForCurrentMonth();
        if (timelineEvent) return timelineEvent;

        return this.triggerRandomEvent();
    }

    // 获取专属事件
    getExclusiveEvent() {
        const eventType = Math.random();
        const categoryName = this.state.category.name;

        const priority = [];
        if (eventType < 0.25) priority.push('positive');
        else if (eventType < 0.45) priority.push('negative');
        else if (eventType < 0.7) priority.push('choice');
        else priority.push('edge');

        const allTypes = ['positive', 'negative', 'choice', 'edge'];
        allTypes.forEach(type => {
            if (!priority.includes(type)) priority.push(type);
        });

        for (const type of priority) {
            let event = null;
            if (type === 'positive') event = this.generatePositiveExclusiveEvent(categoryName);
            if (type === 'negative') event = this.generateNegativeExclusiveEvent(categoryName);
            if (type === 'choice') event = this.generateChoiceEvent(categoryName);
            if (type === 'edge') event = this.generateEdgeTemptationEvent(categoryName);
            if (event) return event;
        }

        return this.getCommonEvent();
    }

    // 生成正向专属事件
    generatePositiveExclusiveEvent(categoryName) {
        const categoryMap = {
            "科普类": "science",
            "吃播类": "mukbang",
            "美妆类": "beauty",
            "生活类": "lifestyle"
        };
        
        const categoryKey = categoryMap[categoryName] || "lifestyle";
        const events = EventLibrary[categoryKey].positive;
        return this.pickEligibleEvent(events);
    }

    // 生成负向专属事件
    generateNegativeExclusiveEvent(categoryName) {
        const categoryMap = {
            "科普类": "science",
            "吃播类": "mukbang",
            "美妆类": "beauty",
            "生活类": "lifestyle"
        };
        
        const categoryKey = categoryMap[categoryName] || "lifestyle";
        const events = EventLibrary[categoryKey].negative;
        return this.pickEligibleEvent(events);
    }

    // 生成抉择事件 - 需要权衡利弊
    generateChoiceEvent(categoryName) {
        const categoryMap = {
            "科普类": "science",
            "吃播类": "mukbang",
            "美妆类": "beauty",
            "生活类": "lifestyle"
        };
        
        const categoryKey = categoryMap[categoryName] || "lifestyle";
        const events = EventLibrary[categoryKey].choice;
        return this.pickEligibleEvent(events);
    }

    // 生成擦边诱惑事件 - 高收益高风险
    generateEdgeTemptationEvent(categoryName) {
        const categoryMap = {
            "科普类": "science",
            "吃播类": "mukbang",
            "美妆类": "beauty",
            "生活类": "lifestyle"
        };
        
        const categoryKey = categoryMap[categoryName] || "lifestyle";
        const events = EventLibrary[categoryKey].edgeTemptation;
        const event = this.pickEligibleEvent(events);
        if (event) event.isEdge = true;
        return event;
    }


    // 获取通用事件
    getCommonEvent() {
        const events = [
            // 正向事件
            {
                title: "平台推荐位",
                description: "📱 助理来信：好消息！平台运营团队通知，你的内容被选中获得首页推荐位！这是难得的流量曝光机会，建议你可以考虑加大投放力度，或者保持稳定输出。",
                isMessage: true,
                options: [
                    {
                        text: "把握机会，多发优质内容（投流）",
                        effects: { fans: 600, contentQuality: 5, energy: -15, rankProgress: 8, savings: -500 },
                        type: 'positive'
                    },
                    {
                        text: "保持节奏，稳定输出",
                        effects: { fans: 300, personaFit: 5, rankProgress: 5 },
                        type: 'positive'
                    },
                    {
                        text: "全力冲刺，加大投入",
                        effects: { fans: 1000, contentQuality: 3, energy: -25, savings: -1200 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "粉丝暖心礼物",
                description: "粉丝自发给你刷了大量礼物，感谢你的陪伴！",
                options: [
                    {
                        text: "真诚感谢，用心回馈",
                        effects: { profit: 1000, mood: 10, personaFit: 5, savings: -200 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "同行认可",
                description: "业内大V点赞转发你的内容，带来大量关注！",
                options: [
                    {
                        text: "礼貌回应，建立联系",
                        effects: { fans: 800, personaFit: 8, rankProgress: 10, savings: -150 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "媒体采访邀请",
                description: "📱 助理通知：某知名媒体想要采访你，报道你的创作故事和成长经历！这是提升个人品牌影响力的好机会，但需要准备采访内容和配合拍摄。",
                isMessage: true,
                options: [
                    {
                        text: "接受采访，扩大宣传",
                        effects: { fans: 1000, personaFit: 10, rankProgress: 12, savings: -300, energy: -10 },
                        type: 'positive'
                    },
                    {
                        text: "低调拒绝，专注内容",
                        effects: { contentQuality: 5, mood: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "粉丝应援",
                description: "粉丝自发组织应援活动，让你深受感动！",
                options: [
                    {
                        text: "感谢粉丝，努力创作",
                        effects: { mood: 15, fans: 500, personaFit: 8, rankProgress: 8, savings: -300 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "首次商业合作邀约",
                description: "📱 助理消息：你收到第一份正式商业合作邀约！对方是中小品牌，报价不高但能打开变现大门。",
                isMessage: true,
                requirements: { minRank: "初级达人", maxRank: "初级达人" },
                options: [
                    {
                        text: "接受合作，迈出第一步",
                        effects: { profit: 800, fans: 200, personaFit: 5, rankProgress: 8 },
                        type: 'positive'
                    },
                    {
                        text: "婉拒，再等等更好的",
                        effects: { contentQuality: 5, mood: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "行业新人奖提名",
                description: "📱 助理通知：你被提名为平台「年度新锐创作者」，需配合宣传和颁奖礼。",
                isMessage: true,
                requirements: { minRank: "中级达人", maxRank: "中级达人" },
                options: [
                    {
                        text: "积极参与",
                        effects: { fans: 600, personaFit: 10, rankProgress: 12, energy: -10, savings: -400 },
                        type: 'positive'
                    },
                    {
                        text: "婉拒出席，低调创作",
                        effects: { contentQuality: 8, mood: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "头部创作者闭门会",
                description: "📱 助理重磅：平台邀请你参加头部创作者闭门会，与算法、运营直接沟通，仅限高职级。",
                isMessage: true,
                requirements: { minRank: "头部达人" },
                options: [
                    {
                        text: "参加闭门会",
                        effects: { contentQuality: 5, personaFit: 8, rankProgress: 10, energy: -15 },
                        type: 'positive'
                    },
                    {
                        text: "婉拒，保持距离",
                        effects: { mood: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "平台点名扶持",
                description: "平台发布“新星扶持名单”，你的名字意外上榜。",
                requirements: {
                    names: ["李加琪", "小羊哥", "张同学", "李子七", "薇鸭"]
                },
                options: [
                    {
                        text: "抓住机会，提升内容质量",
                        effects: { fans: 1200, contentQuality: 8, rankProgress: 10 },
                        type: 'positive'
                    },
                    {
                        text: "加大投放，扩大曝光",
                        effects: { fans: 2000, savings: -800, rankProgress: 8 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "品牌形象大使邀约",
                description: "📱 助理来电：某知名品牌希望邀请你作为形象大使！对方开出了不错的代言费，但需要你参加多场活动。这会占用不少时间和精力，请权衡利弊。",
                isMessage: true,
                requirements: {
                    genders: ["female"]
                },
                options: [
                    {
                        text: "接受邀约，提升曝光",
                        effects: { profit: 3000, fans: 1000, personaFit: 6, rankProgress: 8, energy: -10 },
                        type: 'positive'
                    },
                    {
                        text: "谨慎合作，保持人设",
                        effects: { personaFit: 10, contentQuality: 5, rankProgress: 6 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒邀约，专注内容",
                        effects: { contentQuality: 8, mood: 5 },
                        type: 'neutral'
                    }
                ]
            },
            // 负向事件
            {
                title: "黑粉恶意攻击",
                description: "大量黑粉涌入评论区进行人身攻击！",
                options: [
                    {
                        text: "保持冷静，关闭评论",
                        effects: { mood: -10, fans: -100 },
                        type: 'negative'
                    },
                    {
                        text: "据理力争，正面回应",
                        effects: { mood: -15, energy: -15, fans: -50 },
                        type: 'negative'
                    },
                    {
                        text: "不予理会，继续创作",
                        effects: { mood: -5, personaFit: 5 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "平台限流",
                description: "不知为何，你的内容突然被限流，曝光量大幅下降！",
                options: [
                    {
                        text: "联系客服，积极申诉",
                        effects: { fans: -200, mood: -10, energy: -15 },
                        type: 'negative'
                    },
                    {
                        text: "调整内容，适应规则",
                        effects: { fans: -100, contentQuality: -5, personaFit: -5 },
                        type: 'negative'
                    }
                ]
            },
            {
                title: "设备故障",
                description: "拍摄设备突然损坏，需要重新购置！",
                options: [
                    {
                        text: "立即购买新设备",
                        effects: { savings: -2000, contentQuality: 5 },
                        type: 'negative'
                    },
                    {
                        text: "凑合使用旧设备",
                        effects: { contentQuality: -8, fans: -100 },
                        type: 'negative'
                    }
                ]
            },
            {
                title: "竞争对手抄袭",
                description: "发现有人大量抄袭你的创意和内容！",
                options: [
                    {
                        text: "公开维权，打击抄袭",
                        effects: { mood: -15, energy: -20, fans: 200 },
                        type: 'mixed'
                    },
                    {
                        text: "默默忍受，继续创新",
                        effects: { mood: -20, personaFit: 5 },
                        type: 'negative'
                    }
                ]
            },
            {
                title: "身体疲惫",
                description: "长期高强度工作导致身心俱疲，需要休息...",
                options: [
                    {
                        text: "停更休息，调整状态",
                        effects: { energy: 30, mood: 20, fans: -300, savings: -500 },
                        type: 'mixed'
                    },
                    {
                        text: "坚持更新，咬牙撑住",
                        effects: { fans: 200, profit: 500, energy: -20, mood: -15 },
                        type: 'mixed'
                    }
                ]
            },
            
            // 抉择事件
            {
                title: "MCN签约邀约",
                description: "📱 助理重要通知：有实力MCN机构正式发来签约邀请！他们承诺提供专业团队、推广资源和商务对接，但需要你让出30%的分成权。这是影响职业发展的重要决策，请慎重考虑。",
                isMessage: true,
                isUrgent: true,
                options: [
                    {
                        text: "接受签约，借助资源",
                        effects: { fans: 1000, profit: 2000, personaFit: -5, rankProgress: 10, savings: -1000 },
                        type: 'mixed'
                    },
                    {
                        text: "拒绝签约，保持独立",
                        effects: { personaFit: 10, mood: 5, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "提出更优条件再谈",
                        effects: { mood: -5, energy: -10 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "跨界合作机会",
                description: "📱 助理来信：另一个垂直领域的头部博主想和你跨界合作，制作一期联名内容。对方在他的领域有100万+粉丝，这次合作或许能帮你打开新圈层、获得流量曝光，但也可能稀释你的专业形象。",
                isMessage: true,
                options: [
                    {
                        text: "接受合作，拓宽领域",
                        effects: { fans: 800, profit: 1500, personaFit: -3, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "拒绝合作，专注主业",
                        effects: { personaFit: 8, contentQuality: 5, rankProgress: 8 },
                        type: 'mixed'
                    },
                    {
                        text: "提议互惠合作",
                        effects: { fans: 500, profit: 800, contentQuality: 3, energy: -15 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "高价广告诱惑",
                description: "📱 助理紧急通知：有品牌开出¥15,000的高价广告费希望你代言推广！但你的助理私下调查发现这个产品口碑一般、质量堪忧，甚至有消费者投诉记录。短期利益和长期口碑，你如何选择？",
                isMessage: true,
                isUrgent: true,
                options: [
                    {
                        text: "接受广告，赚取收益",
                        effects: { profit: 5000, fans: -200, personaFit: -10, contentQuality: -8, mood: -5 },
                        type: 'mixed'
                    },
                    {
                        text: "拒绝广告，保护口碑",
                        effects: { personaFit: 12, contentQuality: 5, rankProgress: 10 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "热点话题诱惑",
                description: "当前有个极具争议的热点话题，蹭热度能快速涨粉但可能引火烧身...",
                options: [
                    {
                        text: "理性发声，表明立场",
                        effects: { fans: 1000, mood: -10, personaFit: 5, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "大胆蹭热度，博取流量",
                        effects: { fans: 2000, profit: 1000, personaFit: -15, mood: -15, rankProgress: -10 },
                        type: 'risky'
                    },
                    {
                        text: "不予理会，专注内容",
                        effects: { personaFit: 8, contentQuality: 5, fans: -100 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "综艺节目邀约",
                description: "📱 助理消息：某热门综艺节目组邀请你作为飞行嘉宾参加录制！节目播出后预计能带来大量曝光，但录制需要2天时间，且不确定剪辑效果如何。",
                isMessage: true,
                options: [
                    {
                        text: "接受邀约",
                        effects: { fans: 2000, profit: 3000, energy: -25, mood: 10 },
                        type: 'positive'
                    },
                    {
                        text: "要求查看剪辑权",
                        effects: { fans: 1500, profit: 2000, energy: -20, personaFit: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒邀约",
                        effects: { mood: 5, contentQuality: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "电商平台合作",
                description: "📱 助理来信：某头部电商平台想邀请你入驻开设店铺！他们会提供流量扶持和供应链支持，但需要你投入时间运营店铺。这是拓展变现渠道的机会。",
                isMessage: true,
                options: [
                    {
                        text: "开设店铺，拓展业务",
                        effects: { profit: 4000, savings: -2000, energy: -20, personaFit: -5 },
                        type: 'mixed'
                    },
                    {
                        text: "只做推广不开店",
                        effects: { profit: 2000, personaFit: 3 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒合作",
                        effects: { contentQuality: 5, personaFit: 8 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "线下活动邀请",
                description: "📱 助理通知：某商场邀请你参加线下粉丝见面会，承诺提供场地和宣传支持。这是增进粉丝粘性的好机会，但需要你准备活动内容和现场互动。",
                isMessage: true,
                options: [
                    {
                        text: "接受邀请，举办见面会",
                        effects: { fans: 800, personaFit: 15, mood: 10, energy: -20, savings: -1000 },
                        type: 'positive'
                    },
                    {
                        text: "协商线上直播互动",
                        effects: { fans: 500, personaFit: 8, energy: -10, savings: -300 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒活动",
                        effects: { energy: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "出版社约稿邀请",
                description: "📱 助理转达：某知名出版社想邀请你出版个人作品集或经验分享书籍！这对提升个人IP价值很有帮助，但写书需要大量时间投入。",
                isMessage: true,
                options: [
                    {
                        text: "接受约稿，准备出书",
                        effects: { profit: 6000, personaFit: 20, contentQuality: 10, energy: -30, savings: -2000 },
                        type: 'positive'
                    },
                    {
                        text: "先出电子书试水",
                        effects: { profit: 3000, personaFit: 12, energy: -15, savings: -800 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒约稿",
                        effects: { contentQuality: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "知识付费平台邀请",
                description: "📱 助理来信：某头部知识付费平台邀请你开设付费专栏/课程！他们承诺流量扶持和分成比例优惠。这是知识变现的好渠道，但需要系统化内容制作。",
                isMessage: true,
                options: [
                    {
                        text: "开设付费课程",
                        effects: { profit: 5000, contentQuality: 12, personaFit: 8, energy: -25, savings: -1500 },
                        type: 'positive'
                    },
                    {
                        text: "先做免费试听课",
                        effects: { profit: 2000, contentQuality: 8, fans: 500, energy: -15 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒邀请",
                        effects: { mood: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "视频平台签约主播",
                description: "📱 助理通知：平台运营团队想与你签订\u201C独家创作者协议\u201D！签约后你将享受流量扶持、现金补贴和优先推荐，但3年内不能在其他平台发布内容。",
                isMessage: true,
                isUrgent: true,
                options: [
                    {
                        text: "签订独家协议",
                        effects: { profit: 8000, fans: 1500, contentQuality: 5, personaFit: -8, rankProgress: 10 },
                        type: 'mixed'
                    },
                    {
                        text: "谈判更优条件",
                        effects: { profit: 5000, fans: 1000, energy: -15, mood: -10 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒签约，保持自由",
                        effects: { personaFit: 12, mood: 10 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "品牌联名产品开发",
                description: "📱 助理重要消息：某品牌想邀请你共同开发联名产品（如服饰、周边等）！你将获得设计权和销售分成，但需要投入大量时间参与产品开发。",
                isMessage: true,
                options: [
                    {
                        text: "全力投入开发",
                        effects: { profit: 6000, personaFit: 15, contentQuality: 8, energy: -30, savings: -2500 },
                        type: 'positive'
                    },
                    {
                        text: "只参与设计顾问",
                        effects: { profit: 3000, personaFit: 8, energy: -15, savings: -1000 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒开发邀请",
                        effects: { contentQuality: 8, mood: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "团队扩张建议",
                description: "有人建议你组建团队，提高效率但增加成本...",
                options: [
                    {
                        text: "组建团队，规模化运营",
                        effects: { fans: 800, savings: -3000, contentQuality: 8, energy: 15 },
                        type: 'mixed'
                    },
                    {
                        text: "保持个人，灵活创作",
                        effects: { personaFit: 10, mood: 5, energy: -5 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "播客/电台邀约",
                description: "📱 助理消息：某知名播客或电台节目想邀请你作为嘉宾参与一期录制，主题围绕你的领域或成长经历。录制一般需要半天，能带来圈层曝光。",
                isMessage: true,
                options: [
                    {
                        text: "接受邀约，参与录制",
                        effects: { fans: 600, personaFit: 8, energy: -12, savings: -200 },
                        type: 'positive'
                    },
                    {
                        text: "婉拒，专注视频内容",
                        effects: { contentQuality: 5, mood: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "公益项目邀请",
                description: "📱 助理转达：某公益机构或政府项目希望邀请你参与公益宣传（环保、助学、健康等），无报酬但有助于提升正面形象。",
                isMessage: true,
                options: [
                    {
                        text: "参与公益，传递正能量",
                        effects: { personaFit: 15, fans: 300, mood: 10, energy: -15, savings: -300 },
                        type: 'positive'
                    },
                    {
                        text: "婉拒，精力有限",
                        effects: { mood: -3 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "品牌代言续约洽谈",
                description: "📱 助理来电：之前合作过的品牌方希望续约下一季代言，报价比去年略涨，但要求配合更多线下活动和拍摄。",
                isMessage: true,
                options: [
                    {
                        text: "接受续约，稳定收入",
                        effects: { profit: 4000, personaFit: 5, energy: -18 },
                        type: 'positive'
                    },
                    {
                        text: "谈判提高报价再签",
                        effects: { profit: 5500, personaFit: 2, energy: -20, mood: -5 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒续约，尝试新品牌",
                        effects: { mood: 5, rankProgress: 3 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "线下签售/见面会邀请",
                description: "📱 助理通知：某书店或商场想为你举办线下签售或粉丝见面会，需你到场 2～3 小时，能显著提升粉丝粘性和人设。",
                isMessage: true,
                options: [
                    {
                        text: "接受邀请，举办签售",
                        effects: { fans: 500, personaFit: 12, mood: 8, energy: -20, savings: -800 },
                        type: 'positive'
                    },
                    {
                        text: "改为线上直播连线",
                        effects: { fans: 300, personaFit: 6, energy: -10, savings: -200 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒",
                        effects: { energy: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "短视频挑战赛/活动邀请",
                description: "📱 助理消息：平台或品牌方举办短视频挑战赛/主题活动，邀请你担任发起人或嘉宾，需配合拍摄一条示范视频并带话题。",
                isMessage: true,
                options: [
                    {
                        text: "参与发起，带话题",
                        effects: { fans: 800, contentQuality: 3, energy: -15, rankProgress: 6 },
                        type: 'positive'
                    },
                    {
                        text: "只拍一条参与不发起",
                        effects: { fans: 400, energy: -10 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒",
                        effects: { mood: 3 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "政府/机构宣传合作",
                description: "📱 助理转达：某政府部门或事业单位希望邀请你参与正面宣传（如城市形象、科普、文明倡导等），报酬不高但背书强。",
                isMessage: true,
                options: [
                    {
                        text: "接受合作，配合宣传",
                        effects: { personaFit: 18, contentQuality: 5, profit: 1500, energy: -15 },
                        type: 'positive'
                    },
                    {
                        text: "婉拒，避免敏感",
                        effects: { mood: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "短剧/剧本客串邀约",
                description: "📱 助理消息：某短剧或网剧剧组想邀请你客串一个小角色，戏份不多但能出圈刷脸，拍摄约 1～2 天。",
                isMessage: true,
                options: [
                    {
                        text: "接受客串，跨界刷脸",
                        effects: { fans: 1200, personaFit: 5, energy: -22, profit: 2000 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒，专注主业",
                        effects: { contentQuality: 5, mood: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "音乐节/展会嘉宾邀请",
                description: "📱 助理通知：某音乐节、漫展或行业展会将举办创作者环节，邀请你作为嘉宾出席并做简短分享或互动，曝光偏年轻受众。",
                isMessage: true,
                options: [
                    {
                        text: "接受邀请，出席活动",
                        effects: { fans: 700, personaFit: 8, energy: -18, savings: -600 },
                        type: 'positive'
                    },
                    {
                        text: "婉拒",
                        effects: { energy: 5 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "危机公关/法律顾问推荐",
                description: "📱 助理提醒：近期你或同行遇到了一些舆论或版权问题，助理推荐了一家靠谱的危机公关/法律顾问机构，可签约做常年顾问，防患于未然。",
                isMessage: true,
                options: [
                    {
                        text: "签约顾问，买份安心",
                        effects: { personaFit: 5, savings: -3000, mood: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "暂不签约，有事再找",
                        effects: { mood: -2 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "粉丝众筹/周边开发邀约",
                description: "📱 助理消息：有粉丝或小品牌想和你联名做周边/众筹项目（如定制周边、联名款等），分成可观但需要你参与设计和宣传。",
                isMessage: true,
                options: [
                    {
                        text: "参与联名，开发周边",
                        effects: { profit: 2500, fans: 400, personaFit: 6, energy: -15, savings: -1000 },
                        type: 'mixed'
                    },
                    {
                        text: "只授权形象，轻参与",
                        effects: { profit: 1200, personaFit: 3, energy: -5 },
                        type: 'mixed'
                    },
                    {
                        text: "婉拒",
                        effects: { mood: 3 },
                        type: 'neutral'
                    }
                ]
            },
            {
                title: "微娅风波连锁反应",
                description: "头部主播“微娅”卷入合规风波，平台开始严查直播与带货内容，所有创作者都受到影响。",
                options: [
                    {
                        text: "主动自查，公开合规声明",
                        effects: { personaFit: 10, contentQuality: 5, fans: -200, savings: -500, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "减少带货，转向内容",
                        effects: { savings: -1500, contentQuality: 8, personaFit: 6, rankProgress: 8 },
                        type: 'mixed'
                    },
                    {
                        text: "保持节奏，观望风向",
                        effects: { fans: -100, mood: -5, rankProgress: -2 },
                        type: 'negative'
                    }
                ]
            },
            {
                title: "新巴带货翻车",
                description: "带货圈“新巴”因选品问题被舆论讨伐，粉丝对带货内容的信任骤降。",
                options: [
                    {
                        text: "升级选品标准",
                        effects: { contentQuality: 6, personaFit: 8, savings: -800, rankProgress: 6 },
                        type: 'mixed'
                    },
                    {
                        text: "暂停带货一阵",
                        effects: { savings: -2000, mood: 5, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "继续带货，抓住窗口期",
                        effects: { profit: 1500, fans: 400, personaFit: -10, rankProgress: -8 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "办公室小叶式翻车",
                description: "生活博主“办公室小叶”的大型实验翻车引发热议，大家开始质疑内容真实性。",
                options: [
                    {
                        text: "公开流程，增加透明度",
                        effects: { personaFit: 8, contentQuality: 6, fans: -100, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "减少实验类内容",
                        effects: { contentQuality: -3, fans: -200, mood: -5 },
                        type: 'negative'
                    },
                    {
                        text: "继续做实验，追求话题",
                        effects: { fans: 700, profit: 800, personaFit: -8, contentQuality: -6, rankProgress: -6 },
                        type: 'mixed'
                    }
                ]
            }
        ];
        
        const categoryId = this.state.category ? this.state.category.id : null;
        const savingsEvents = [];
        if (typeof SavingsEvents !== 'undefined') savingsEvents.push(...SavingsEvents);
        if (typeof SavingsEventsByCategory !== 'undefined' && categoryId) {
            savingsEvents.push(...(SavingsEventsByCategory[categoryId] || []));
        }
        const missedEvents = typeof MissedOpportunityEvents !== 'undefined' ? MissedOpportunityEvents : [];
        const teamBaseEvents = typeof TeamBaseEvents !== 'undefined' ? TeamBaseEvents : [];
        const teamMatrixEvents = typeof TeamMatrixEvents !== 'undefined' ? TeamMatrixEvents : [];
        const rankChallengeEvents = typeof RankChallengeEvents !== 'undefined' ? RankChallengeEvents : [];
        const categoryChallengeEvents = (typeof CategoryChallengeEventsByCategory !== 'undefined' && categoryId)
            ? (CategoryChallengeEventsByCategory[categoryId] || [])
            : [];
        const lowProbEvents = typeof LowProbabilityBigImpactEvents !== 'undefined' ? LowProbabilityBigImpactEvents : [];

        return this.pickWeightedEvent([
            { weight: 1, events },
            { weight: this.getWeightByRank(GameConfig.savingsEventWeightByRank, 0.2), events: savingsEvents },
            { weight: this.getWeightByRank(GameConfig.teamBaseEventWeightByRank, 0), events: teamBaseEvents },
            { weight: this.getWeightByRank(GameConfig.teamMatrixEventWeightByRank, 0), events: teamMatrixEvents },
            { weight: this.getWeightByRank(GameConfig.rankChallengeWeightByRank, 0.2), events: rankChallengeEvents },
            { weight: this.getWeightByRank(GameConfig.categoryChallengeWeightByRank, 0.2), events: categoryChallengeEvents },
            { weight: 0.15, events: missedEvents },
            { weight: 0.06, events: lowProbEvents }
        ]) || this.pickEligibleEvent(events) || events[0];
    }

    // 处理事件选项
    handleEventOption(event, optionIndex, partner) {
        const option = event.options[optionIndex];
        const results = [];

        if (partner) {
            this.addLog(`与 ${partner.name}（${partner.tag}）合作：${option.text}`, 'positive');
        }

        if (event.title === '能力训练') {
            const maxTraining = GameConfig.trainingConfig?.maxPerMonth ?? 2;
            if (this.state.trainingCount >= maxTraining) {
                this.addLog('本月训练次数已达上限', 'warning');
                return results;
            }
        }
        
        // 应用效果
        if (option.effects) {
            for (let [key, value] of Object.entries(option.effects)) {
                this.applyEffectValue(key, value, results);
            }
        }

        if (event.title === '能力训练') {
            this.state.trainingCount += 1;
        }

        // 统计擦边次数并触发专属事件
        if (this.isEdgeChoice(event, option)) {
            this.state.edgeCount += 1;
            this.checkEdgeEscalation();
        }
        
        // 记录日志
        const logType = option.type === 'positive' ? 'positive' : 'negative';
        this.addLog(`${event.title} - 选择：${option.text}`, logType);
        this.addLog(`结果：${results.join('，')}`, logType);
        
        // 检查正向专属事件完成
        if (option.type === 'positive' && event.options.length > 1) {
            this.state.completedPositiveEvents.push(event.title);
        }
        
        return results;
    }

    // 判断是否属于擦边选择
    isEdgeChoice(event, option) {
        if (!event || !option) return false;
        const effects = option.effects || {};
        const hasEdgeEffect = Object.prototype.hasOwnProperty.call(effects, 'edgeFans') ||
            Object.prototype.hasOwnProperty.call(effects, 'edgeProfit');
        if (hasEdgeEffect) return true;
        const titleEdge = typeof event.title === 'string' && event.title.includes('擦边');
        const isEdgeEvent = !!event.isEdge || titleEdge;
        return isEdgeEvent && option.type !== 'positive';
    }

    // 获取当前职级对应的擦边触发阈值 [第1档, 第2档, 第3档]
    getEdgeThresholdsForCurrentRank() {
        const config = GameConfig.edgeEscalationConfig;
        if (!config || !config.rankThresholds) return [5, 10, 15];
        const rank = this.state.rank || '素人';
        return config.rankThresholds[rank] || [5, 10, 15];
    }

    // 根据职级+粉丝量计算擦边事件严重度 0~3（职级越高、粉丝越多越严重）
    getEdgeSeverityLevel() {
        const rankOrder = ['素人', '初级达人', '新锐达人', '中级达人', '进阶达人', '高级达人', '头部达人', '顶流达人', 'MCN签约'];
        const rankIndex = rankOrder.indexOf(this.state.rank || '素人');
        const fans = this.state.fans || 0;
        const bands = GameConfig.edgeEscalationConfig?.fanSeverityBands || [10000, 100000, 500000];
        let fanTier = 0;
        if (fans >= bands[2]) fanTier = 3;
        else if (fans >= bands[1]) fanTier = 2;
        else if (fans >= bands[0]) fanTier = 1;
        const severity = Math.min(3, Math.max(0, rankIndex + fanTier - 2));
        return severity;
    }

    // 擦边事件触发概率：擦边次数越多、粉丝量越大、职级越高，越容易触发（0~1）
    getEdgeEscalationTriggerProbability() {
        const config = GameConfig.edgeEscalationConfig;
        const baseRate = (config && config.triggerBaseRate != null) ? config.triggerBaseRate : 0.05;
        const perCountRate = (config && config.triggerPerCountRate != null) ? config.triggerPerCountRate : 0.03;
        const maxRate = (config && config.triggerMaxRate != null) ? config.triggerMaxRate : 0.85;

        const rankOrder = ['素人', '初级达人', '新锐达人', '中级达人', '进阶达人', '高级达人', '头部达人', '顶流达人', 'MCN签约'];
        const rankIndex = rankOrder.indexOf(this.state.rank || '素人');
        const rankBonus = rankIndex * 0.05;

        const fans = this.state.fans || 0;
        const bands = config?.fanSeverityBands || [10000, 100000, 500000];
        let fanTier = 0;
        if (fans >= bands[2]) fanTier = 3;
        else if (fans >= bands[1]) fanTier = 2;
        else if (fans >= bands[0]) fanTier = 1;
        const fanBonus = fanTier * 0.05;

        const countBonus = (this.state.edgeCount || 0) * perCountRate;
        return Math.min(maxRate, baseRate + countBonus + rankBonus + fanBonus);
    }

    // 检查擦边并概率触发专属事件（概率受擦边次数、粉丝量、职级影响）
    checkEdgeEscalation() {
        const config = GameConfig.edgeEscalationConfig;
        if (!config) return;

        const nextLevel = this.state.edgeEscalationLevel || 0;
        if (nextLevel >= 3) return;

        if (Math.random() >= this.getEdgeEscalationTriggerProbability()) return;

        let severity = this.getEdgeSeverityLevel();
        severity = Math.min(3, severity + nextLevel);
        const edgeEvent = Array.isArray(EdgeEscalationEvents)
            ? EdgeEscalationEvents.find(e => e.severity === severity)
            : null;
        if (edgeEvent && edgeEvent.id) {
            this.enqueueDeferredEvent({ source: 'edge', severity }, this.state.year, this.state.month);
            this.state.edgeEscalationLevel = nextLevel + 1;
            this.addLog(`擦边行为引发关注（职级：${this.state.rank}，粉丝：${(this.state.fans || 0).toLocaleString()}），触发：${edgeEvent.title}`, 'warning');
        }
    }


    // 月度结算
    monthlySettle() {
        // 保存结算前的数据用于对比
        const beforeSettlement = {
            fans: this.state.fans,
            savings: this.state.savings
        };
        
        const score = this.calculateMonthlyScore();
        let rating, contentQualityBonus, progressAdd;
        
        if (score >= GameConfig.monthlySettle.excellent.score) {
            rating = GameConfig.monthlySettle.excellent.name;
            progressAdd = GameConfig.monthlySettle.excellent.progressAdd;
            contentQualityBonus = Math.floor(progressAdd * 0.3);
        } else if (score >= GameConfig.monthlySettle.good.score) {
            rating = GameConfig.monthlySettle.good.name;
            progressAdd = GameConfig.monthlySettle.good.progressAdd;
            contentQualityBonus = Math.floor(progressAdd * 0.3);
        } else if (score >= GameConfig.monthlySettle.qualified.score) {
            rating = GameConfig.monthlySettle.qualified.name;
            progressAdd = GameConfig.monthlySettle.qualified.progressAdd;
            contentQualityBonus = Math.floor(progressAdd * 0.3);
        } else {
            rating = GameConfig.monthlySettle.unqualified.name;
            progressAdd = GameConfig.monthlySettle.unqualified.progressAdd;
            contentQualityBonus = Math.floor(progressAdd * 0.3);
        }
        
        if (contentQualityBonus > 0) {
            this.state.contentQuality += contentQualityBonus;
        } else if (contentQualityBonus < 0) {
            this.state.contentQuality = Math.max(0, this.state.contentQuality + contentQualityBonus);
        }
        this.state.rankProgress = Math.max(0, (this.state.rankProgress || 0) + progressAdd);
        
        // 人设契合或内容质量归零时，月度结算掉粉
        const cq = this.state.contentQuality || 0;
        const pf = this.state.personaFit || 0;
        if (cq <= 0 || pf <= 0) {
            const fanLoss = Math.min(this.state.fans, Math.floor(this.state.fans * 0.05) + 50);
            if (fanLoss > 0) {
                this.state.fans = Math.max(0, this.state.fans - fanLoss);
                this.addLog(`内容质量或人设契合过低，本月掉粉 ${fanLoss.toLocaleString()}`, 'negative');
            }
        }
        
        // 计算副平台账号收益
        const subPlatformResult = this.calculateSubPlatformMonthly();
        if (subPlatformResult.details.length > 0) {
            this.state.savings += subPlatformResult.netIncome;
            this.state.profit += subPlatformResult.totalIncome;
            
            subPlatformResult.details.forEach(detail => {
                this.addLog(
                    `${detail.icon} ${detail.platform}：收益¥${detail.income} - 维护¥${detail.cost} = ¥${detail.income - detail.cost}，涨粉${detail.fansGrowth}`, 
                    detail.income > detail.cost ? 'positive' : 'negative'
                );
            });
            
            if (subPlatformResult.netIncome > 0) {
                this.addLog(`副平台净收益：¥${subPlatformResult.netIncome.toLocaleString()}`, 'positive');
            } else if (subPlatformResult.netIncome < 0) {
                this.addLog(`副平台净亏损：¥${Math.abs(subPlatformResult.netIncome).toLocaleString()}`, 'negative');
            }
        }
        
        const expenses = this.getMonthlyExpenses();
        if (expenses.total > 0) {
            this.state.savings -= expenses.total;
            this.addLog(`固定支出：房租¥${expenses.rent} + 团队成本¥${expenses.teamCost} = ¥${expenses.total}`, 'negative');
            if (this.state.savings <= 0) {
                this.gameOver('存款归零，资金链断裂，游戏结束');
                return { score, rating, contentQualityBonus, currentRank: this.state.rank, expenses, subPlatformResult };
            }
        }
        this.carryDeferredEventsToNextMonth(this.state.year, this.state.month);
        if (this.state.month >= 12) {
            this.state.month = 1;
            this.state.year += 1;
        } else {
            this.state.month += 1;
        }
        this.state.energy = Math.min(100, this.state.energy + 30); // 月初恢复精力
        this.currentMonthActions = [];
        this.state.trainingCount = 0;
        this.state.actionCount = 0;
        
        // 计算月度变化
        const monthlyChange = {
            fans: this.state.fans - this.state.lastMonthStats.fans,
            savings: this.state.savings - this.state.lastMonthStats.savings
        };
        
        // 更新上个月的统计数据
        this.state.lastMonthStats = {
            fans: this.state.fans,
            savings: this.state.savings
        };
        
        // 检查是否有延迟的引导消息要触发
        this.checkDeferredOnboarding();
        
        // 检查是否可以晋级
        this.checkRankUp();
        
        // 检查游戏结束条件
        if (this.state.mood <= 0) {
            this.gameOver('心态炸了，游戏结束');
        }
        if (this.state.energy <= 0) {
            this.gameOver('精力归零，猝死事件触发，游戏结束');
        }
        if (this.state.savings <= 0) {
            this.gameOver('存款归零，资金链断裂，游戏结束');
        }
        
        return {
            score,
            rating,
            contentQualityBonus,
            currentRank: this.state.rank,
            expenses,
            subPlatformResult,
            monthlyChange,
            currentStats: {
                fans: this.state.fans,
                savings: this.state.savings
            }
        };
    }

    // 计算月度评分
    calculateMonthlyScore() {
        let score = 0;
        const weights = GameConfig.scoreWeights || {
            contentQuality: 0.3,
            personaFit: 0.3,
            mood: 0.2,
            energy: 0.2,
            fans: 0
        };
        
        // 内容质量 (0-30分)
        score += this.state.contentQuality * (weights.contentQuality || 0);
        
        // 人设契合 (0-30分)
        score += this.state.personaFit * (weights.personaFit || 0);
        
        // 心态 (0-20分)
        score += this.state.mood * (weights.mood || 0);
        
        // 精力 (0-20分)
        score += this.state.energy * (weights.energy || 0);

        // 粉丝权重（对数缩放，避免过度放大）
        const fansScore = Math.min(100, Math.log10(this.state.fans + 1) * 25);
        score += fansScore * (weights.fans || 0);
        
        // 违规惩罚
        score -= this.state.violationIndex;
        
        return Math.max(0, Math.floor(score));
    }

    // 检查晋级
    checkRankUp() {
        const currentRankConfig = GameConfig.rankConfig[this.state.rank];
        if (!currentRankConfig.nextRank) return; // 已经是最高级
        
        const nextRankConfig = GameConfig.rankConfig[currentRankConfig.nextRank];
        
        const progressRequired = nextRankConfig.progressFull ?? 100;
        if (this.state.rankProgress >= progressRequired) {
            // 额外条件检查
            const conditionsMet = this.checkRankUpConditions(currentRankConfig.nextRank);
            
            if (conditionsMet) {
                const prevRank = this.state.rank;
                this.state.rank = currentRankConfig.nextRank;
                this.state.rankProgress = 0;
                this.state.edgeCount = 0;
                this.state.edgeEscalationLevel = 0;
                this.addLog(`🎉 恭喜晋级到 ${this.state.rank}！`, 'positive');
                this.state.lastRankUp = { from: prevRank, to: this.state.rank };
                
                // 检查是否达成胜利条件
                if (this.state.rank === 'MCN签约') {
                    this.gameOver('成功签约MCN，成为顶级网红！', true);
                }
            } else {
                this.addLog(`进度已满，但未满足晋级条件`, 'warning');
            }
        }
    }

    // 检查晋级条件（与 rankConfig 一致，违规上限按职级）
    checkRankUpConditions(nextRank) {
        const nextConfig = GameConfig.rankConfig[nextRank];
        if (!nextConfig) return false;
        const minFans = nextConfig.minFans ?? 0;
        const minContentQuality = nextConfig.minContentQuality ?? 0;
        const violationMaxByRank = { '初级达人': 10, '新锐达人': 12, '中级达人': 15, '进阶达人': 17, '高级达人': 20, '头部达人': 25, '顶流达人': 28, 'MCN签约': 30 };
        if (this.state.violationIndex >= (violationMaxByRank[nextRank] ?? 30)) return false;
        if (this.state.fans < minFans) return false;
        if ((this.state.contentQuality || 0) < minContentQuality) return false;
        
        switch(nextRank) {
            case '初级达人':
            case '新锐达人':
                return true;
            case '中级达人':
            case '进阶达人':
                return this.state.completedPositiveEvents.length >= 1;
            case '高级达人':
                return !this.state.hasRankViolation;
            case '头部达人':
            case '顶流达人':
                return this.state.completedPositiveEvents.length >= 2;
            case 'MCN签约':
                return (this.state.profit || 0) >= 100000;
            default:
                return true;
        }
    }

    // 游戏结束
    gameOver(reason, isVictory = false) {
        this.state.isGameOver = true;
        this.state.gameOverReason = reason;
        return { isVictory, reason };
    }

    // 添加日志
    addLog(message, type = 'normal') {
        this.eventLog.push({ message, type, month: this.state.month, year: this.state.year });
    }

    // 获取游戏状态
    getState() {
        return { ...this.state };
    }

    // 加载游戏状态
    loadState(savedState) {
        this.state = { ...savedState };
        if (!this.state.year) this.state.year = 2026;
        if (!this.state.timelineEventsTriggered) this.state.timelineEventsTriggered = {};
        if (!this.state.chainQueue) this.state.chainQueue = {};
        if (!this.state.deferredEvents) this.state.deferredEvents = {};
        if (typeof this.state.savings !== 'number') this.state.savings = 5000;
        if (typeof this.state.trainingCount !== 'number') this.state.trainingCount = 0;
        if (typeof this.state.actionCount !== 'number') this.state.actionCount = 0;
        if (!this.state.lastRankUp) this.state.lastRankUp = null;
        if (!this.state.gender) this.state.gender = null;
        if (!this.state.avatarId) this.state.avatarId = null;
        if (typeof this.state.edgeCount !== 'number') this.state.edgeCount = 0;
        if (typeof this.state.edgeEscalationLevel !== 'number') this.state.edgeEscalationLevel = 0;
        if (!this.state.attributes) {
            this.rollAttributes();
        }
        if (!Array.isArray(this.state.messages)) this.state.messages = [];
        if (typeof this.state.messageIdCounter !== 'number') this.state.messageIdCounter = 1;
        if (!Array.isArray(this.state.deferredOnboarding)) this.state.deferredOnboarding = [];
    }

    // 添加消息到队列
    addMessage(event, isUrgent = false) {
        const message = {
            id: this.state.messageIdCounter++,
            event: event,
            time: `${this.state.year}年${this.state.month}月`,
            isRead: false,
            isUrgent: isUrgent,
            timestamp: Date.now()
        };
        this.state.messages.unshift(message);  // 新消息放在前面
        return message.id;
    }

    // 获取未读消息数量
    getUnreadMessageCount() {
        return this.state.messages.filter(m => !m.isRead).length;
    }

    // 标记消息为已读
    markMessageAsRead(messageId) {
        const message = this.state.messages.find(m => m.id === messageId);
        if (message) {
            message.isRead = true;
        }
    }

    // 删除消息
    deleteMessage(messageId) {
        const index = this.state.messages.findIndex(m => m.id === messageId);
        if (index !== -1) {
            this.state.messages.splice(index, 1);
        }
    }

    // 获取所有消息
    getMessages() {
        return this.state.messages;
    }

    // 检查是否可以开设新平台账号
    canOpenNewPlatform() {
        const config = GameConfig.multiPlatformConfig;
        const rankOrder = ["素人", "初级达人", "新锐达人", "中级达人", "进阶达人", "高级达人", "头部达人", "顶流达人", "MCN签约"];
        const currentRankIndex = rankOrder.indexOf(this.state.rank);
        const minRankIndex = rankOrder.indexOf(config.unlockConditions.minRank);
        
        if (currentRankIndex < minRankIndex) {
            return { 
                canOpen: false, 
                reason: `需要达到${config.unlockConditions.minRank}职级`
            };
        }
        
        if (this.state.fans < config.unlockConditions.minFans) {
            return { 
                canOpen: false, 
                reason: `需要至少${config.unlockConditions.minFans.toLocaleString()}粉丝`
            };
        }
        
        if (this.state.savings < config.unlockConditions.minSavings) {
            return { 
                canOpen: false, 
                reason: `需要至少¥${config.unlockConditions.minSavings.toLocaleString()}存款`
            };
        }
        
        if (this.state.subPlatforms.length >= config.maxPlatforms - 1) {
            return { 
                canOpen: false, 
                reason: `最多同时运营${config.maxPlatforms}个平台`
            };
        }
        
        return { canOpen: true };
    }

    // 开设新平台账号
    openNewPlatform(platformId) {
        const check = this.canOpenNewPlatform();
        if (!check.canOpen) {
            return { success: false, message: check.reason };
        }
        
        const platform = GameConfig.platforms[platformId];
        if (!platform) {
            return { success: false, message: '平台不存在' };
        }
        
        // 检查是否已经在该平台开设账号
        const mainPlatformId = this.state.platform?.id;
        const existingPlatform = this.state.subPlatforms.find(p => p.platformId === platformId);
        
        if (mainPlatformId === platformId || existingPlatform) {
            return { success: false, message: '已经在该平台开设了账号' };
        }
        
        const config = GameConfig.multiPlatformConfig;
        const cost = config.baseCost;
        
        if (this.state.savings < cost) {
            return { success: false, message: `开设账号需要¥${cost.toLocaleString()}` };
        }
        
        // 扣除成本
        this.state.savings -= cost;
        
        // 创建副平台账号
        const subPlatform = {
            platformId: platformId,
            platform: platform,
            fans: 100,  // 初始粉丝
            openedMonth: this.state.month,
            openedYear: this.state.year
        };
        
        this.state.subPlatforms.push(subPlatform);
        this.addLog(`在${platform.name}开设了新账号！花费¥${cost.toLocaleString()}`, 'positive');
        
        return { 
            success: true, 
            platform: platform,
            cost: cost
        };
    }

    // 计算副平台账号月度收益和成本
    calculateSubPlatformMonthly() {
        const config = GameConfig.multiPlatformConfig;
        let totalIncome = 0;
        let totalCost = 0;
        const results = [];
        
        this.state.subPlatforms.forEach(subPlatform => {
            // 计算维护成本
            const maintenanceCost = Math.max(
                config.maintenanceMinCost,
                Math.floor(subPlatform.fans * config.maintenanceCostPerFan)
            );
            
            // 计算收益（基于主账号的基础收益和平台加成）
            const baseIncome = Math.floor(
                (this.state.contentQuality * 20 + this.state.personaFit * 15) *
                config.incomeMultiplier
            );
            const platformIncome = Math.floor(
                baseIncome * (subPlatform.platform.bonuses.profitRate || 1)
            );
            
            // 计算粉丝增长
            const baseFansGrowth = Math.floor(
                (this.state.contentQuality + this.state.personaFit) * 
                config.fansGrowthMultiplier
            );
            const fansGrowth = Math.floor(
                baseFansGrowth * (subPlatform.platform.bonuses.fanGrowth || 1)
            );
            
            subPlatform.fans += fansGrowth;
            
            totalIncome += platformIncome;
            totalCost += maintenanceCost;
            
            results.push({
                platform: subPlatform.platform.name,
                icon: subPlatform.platform.icon,
                income: platformIncome,
                cost: maintenanceCost,
                fansGrowth: fansGrowth,
                totalFans: subPlatform.fans
            });
        });
        
        return {
            totalIncome,
            totalCost,
            netIncome: totalIncome - totalCost,
            details: results
        };
    }

    // 关闭副平台账号
    closeSubPlatform(platformId) {
        const index = this.state.subPlatforms.findIndex(p => p.platformId === platformId);
        if (index === -1) {
            return { success: false, message: '未找到该平台账号' };
        }
        
        const subPlatform = this.state.subPlatforms[index];
        this.state.subPlatforms.splice(index, 1);
        this.addLog(`关闭了${subPlatform.platform.name}的账号`, 'normal');
        
        return { success: true, platform: subPlatform.platform };
    }
}

// 全局游戏实例
const game = new InfluencerGame();
