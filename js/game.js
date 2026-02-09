// 游戏核心逻辑
class InfluencerGame {
    constructor() {
        this.state = {
            // 基础信息
            influencerName: '',
            gender: null,
            avatarId: null,
            category: null,
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
            lastRankUp: null
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
            lastRankUp: null
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
        const rankOrder = ["素人", "初级达人", "中级达人", "高级达人", "头部达人", "MCN签约"];
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
            return;
        }
        if (key === 'contentQuality') {
            const finalValue = value > 0 ? Math.round(value * this.getAttributeMultiplier('contentQuality')) : value;
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
            const finalValue = value > 0 ? Math.floor(baseValue * this.getAttributeMultiplier('fans')) : value;
            this.state.fans = Math.max(0, this.state.fans + finalValue);
            results.push(`粉丝${finalValue > 0 ? '+' : ''}${finalValue}`);
            return;
        }
        if (key === 'profit') {
            let finalValue = value > 0 ? Math.floor(value * this.getAttributeMultiplier('profit')) : value;
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
        if (key === 'edgeFans') {
            const baseValue = value > 0 ? Math.floor(value * this.state.fanGrowthRate) : value;
            const finalValue = value > 0 ? Math.floor(baseValue * this.getEdgeMultiplier()) : value;
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
            this.state.rankProgress += value;
            results.push(`进度${value > 0 ? '+' : ''}${value}`);
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

    // 获取可用行动
    getAvailableActions() {
        const actions = [...GameConfig.commonActions];
        
        // 添加专属行动
        if (this.state.category) {
            const exclusiveActions = this.state.category.exclusiveActions.filter(action => {
                return this.canUnlockRank(action.rank);
            });
            actions.push(...exclusiveActions);
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
            return { success: false, message: `本月行动次数已达上限（${this.getActionLimit()}次）` };
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

    // 延后年度事件，保证触发
    enqueueDeferredEvent(event, year, month) {
        const key = `${year}-${month}`;
        if (!this.state.deferredEvents[key]) {
            this.state.deferredEvents[key] = [];
        }
        this.state.deferredEvents[key].push({ source: event.source, id: event.id });
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
        const rankOrder = ["素人", "初级达人", "中级达人", "高级达人", "头部达人", "MCN签约"];
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
        return this.pickEligibleEvent(events);
    }


    // 获取通用事件
    getCommonEvent() {
        const events = [
            // 正向事件
            {
                title: "平台推荐位",
                description: "你的内容获得平台首页推荐，流量暴涨！",
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
                title: "媒体报道",
                description: "传统媒体报道了你的事迹，影响力扩大！",
                options: [
                    {
                        text: "接受采访，扩大宣传",
                        effects: { fans: 1000, personaFit: 10, rankProgress: 12, savings: -300 },
                        type: 'positive'
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
                description: "某品牌希望邀请女性/男性形象代言，条件匹配后优先合作。",
                requirements: {
                    genders: ["female"]
                },
                options: [
                    {
                        text: "接受邀约，提升曝光",
                        effects: { profit: 3000, fans: 1000, personaFit: 6, rankProgress: 8 },
                        type: 'positive'
                    },
                    {
                        text: "谨慎合作，保持人设",
                        effects: { personaFit: 10, contentQuality: 5, rankProgress: 6 },
                        type: 'mixed'
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
                description: "有MCN机构邀请你签约，提供资源但要分成...",
                options: [
                    {
                        text: "接受签约，借助资源",
                        effects: { fans: 1000, profit: 2000, personaFit: -5, rankProgress: 10 },
                        type: 'mixed'
                    },
                    {
                        text: "拒绝签约，保持独立",
                        effects: { personaFit: 10, mood: 5, rankProgress: 5 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "跨界合作机会",
                description: "其他领域的博主邀请你跨界合作，可能带来新粉丝...",
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
                    }
                ]
            },
            {
                title: "高价广告诱惑",
                description: "有品牌出高价要求你做广告，但产品质量一般...",
                options: [
                    {
                        text: "接受广告，赚取收益",
                        effects: { profit: 5000, fans: -200, personaFit: -10, contentQuality: -8 },
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

        return this.pickWeightedEvent([
            { weight: 1, events },
            { weight: this.getWeightByRank(GameConfig.savingsEventWeightByRank, 0.2), events: savingsEvents },
            { weight: this.getWeightByRank(GameConfig.teamBaseEventWeightByRank, 0), events: teamBaseEvents },
            { weight: this.getWeightByRank(GameConfig.teamMatrixEventWeightByRank, 0), events: teamMatrixEvents },
            { weight: this.getWeightByRank(GameConfig.rankChallengeWeightByRank, 0.2), events: rankChallengeEvents },
            { weight: this.getWeightByRank(GameConfig.categoryChallengeWeightByRank, 0.2), events: categoryChallengeEvents },
            { weight: 0.15, events: missedEvents }
        ]) || this.pickEligibleEvent(events) || events[0];
    }

    // 处理事件选项
    handleEventOption(event, optionIndex) {
        const option = event.options[optionIndex];
        const results = [];

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


    // 月度结算
    monthlySettle() {
        const score = this.calculateMonthlyScore();
        let rating, progressAdd;
        
        if (score >= GameConfig.monthlySettle.excellent.score) {
            rating = GameConfig.monthlySettle.excellent.name;
            progressAdd = GameConfig.monthlySettle.excellent.progressAdd;
        } else if (score >= GameConfig.monthlySettle.good.score) {
            rating = GameConfig.monthlySettle.good.name;
            progressAdd = GameConfig.monthlySettle.good.progressAdd;
        } else if (score >= GameConfig.monthlySettle.qualified.score) {
            rating = GameConfig.monthlySettle.qualified.name;
            progressAdd = GameConfig.monthlySettle.qualified.progressAdd;
        } else {
            rating = GameConfig.monthlySettle.unqualified.name;
            progressAdd = GameConfig.monthlySettle.unqualified.progressAdd;
        }
        
        this.state.rankProgress += progressAdd;
        const expenses = this.getMonthlyExpenses();
        if (expenses.total > 0) {
            this.state.savings -= expenses.total;
            this.addLog(`固定支出：房租¥${expenses.rent} + 团队成本¥${expenses.teamCost} = ¥${expenses.total}`, 'negative');
            if (this.state.savings <= 0) {
                this.gameOver('存款归零，资金链断裂，游戏结束');
                return { score, rating, progressAdd, currentRank: this.state.rank, rankProgress: this.state.rankProgress, expenses };
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
        
        // 检查是否可以晋级
        this.checkRankUp();
        
        // 检查游戏结束条件
        if (this.state.mood <= 0) {
            this.gameOver('心态崩溃，退出网红圈');
        }
        if (this.state.savings <= 0) {
            this.gameOver('存款归零，资金链断裂，游戏结束');
        }
        
        return {
            score,
            rating,
            progressAdd,
            currentRank: this.state.rank,
            rankProgress: this.state.rankProgress,
            expenses
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
        
        // 检查是否满足晋级条件
        if (this.state.rankProgress >= nextRankConfig.progressFull) {
            // 额外条件检查
            const conditionsMet = this.checkRankUpConditions(currentRankConfig.nextRank);
            
            if (conditionsMet) {
                const prevRank = this.state.rank;
                this.state.rank = currentRankConfig.nextRank;
                this.state.rankProgress = 0;
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

    // 检查晋级条件
    checkRankUpConditions(nextRank) {
        const nextConfig = GameConfig.rankConfig[nextRank];
        
        // 根据职级检查不同条件
        switch(nextRank) {
            case '初级达人':
                return this.state.violationIndex < 10 && 
                       this.state.fans >= 1000;
            case '中级达人':
                return this.state.violationIndex < 15 && 
                       this.state.fans >= 5000 &&
                       this.state.completedPositiveEvents.length >= 1;
            case '高级达人':
                return this.state.violationIndex < 20 && 
                       this.state.fans >= 20000 &&
                       !this.state.hasRankViolation;
            case '头部达人':
                return this.state.violationIndex < 25 && 
                       this.state.fans >= 100000 &&
                       this.state.completedPositiveEvents.length >= 2;
            case 'MCN签约':
                return this.state.violationIndex < 30 && 
                       this.state.fans >= 500000 &&
                       this.state.profit >= 100000;
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
        if (!this.state.attributes) {
            this.rollAttributes();
        }
    }
}

// 全局游戏实例
const game = new InfluencerGame();
