// UI控制器
class UIController {
    constructor() {
        this.currentScreen = 'naming-screen';
        this.init();
    }

    init() {
        const bind = (id, eventName, handler) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener(eventName, handler);
        };

        // 绑定起名界面事件
        bind('confirm-name-btn', 'click', () => this.handleNameConfirm());
        bind('influencer-name', 'input', () => this.validateName());
        bind('roll-attr-btn', 'click', () => this.handleRollAttributes());
        bind('random-name-btn', 'click', () => this.handleRandomName());
        document.querySelectorAll('input[name="gender"]').forEach(radio => {
            radio.addEventListener('change', () => this.handleGenderChange());
        });
        
        // 绑定主游戏界面事件
        bind('next-month-btn', 'click', () => this.handleMonthEnd());
        bind('save-btn', 'click', () => this.handleSave());
        bind('menu-btn', 'click', () => this.showMenu());
        bind('help-btn', 'click', () => this.showHelp());
        
        // 绑定弹窗事件
        bind('monthly-confirm-btn', 'click', () => this.closeMonthlyModal());
        bind('restart-btn', 'click', () => this.restartGame());
        bind('close-menu-btn', 'click', () => this.closeMenu());
        bind('new-game-btn', 'click', () => this.newGame());
        bind('load-btn', 'click', () => this.loadGame());
        bind('event-close-btn', 'click', () => this.closeEventModal());
        bind('help-close-btn', 'click', () => this.closeHelp());
        bind('rankup-close-btn', 'click', () => this.closeRankUpModal());
        bind('rankup-confirm-btn', 'click', () => this.closeRankUpModal());
        document.querySelectorAll('.help-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchHelpTab(tab.dataset.tab));
        });
        
        // 初始化游戏
        game.init();
        this.setDefaultName();
        this.renderAttributeList();
        this.renderAvatarList();
    }

    // 切换屏幕
    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;
    }

    // 验证名字
    validateName() {
        const input = document.getElementById('influencer-name');
        const tip = document.getElementById('name-tip');
        const name = input.value.trim();
        
        if (!name) {
            tip.textContent = '名字不能包含违规词汇';
            tip.className = 'tip';
            return false;
        }
        
        // 检查违规词
        for (let word of GameConfig.forbiddenWords) {
            if (name.includes(word)) {
                tip.textContent = `包含违规词汇：${word}`;
                tip.className = 'tip error';
                return false;
            }
        }
        
        if (name.length < 2) {
            tip.textContent = '名字至少需要2个字符';
            tip.className = 'tip error';
            return false;
        }
        
        tip.textContent = '✓ 名字可用';
        tip.className = 'tip success';
        return true;
    }

    // 确认名字
    handleNameConfirm() {
        const input = document.getElementById('influencer-name');
        const name = input.value.trim();
        const gender = this.getSelectedGender();
        const genderTip = document.getElementById('gender-tip');
        const avatarTip = document.getElementById('avatar-tip');

        if (!gender) {
            genderTip.textContent = '请选择性别';
            genderTip.className = 'tip error';
            return;
        }
        genderTip.textContent = '✓ 已选择性别';
        genderTip.className = 'tip success';
        game.setGender(gender);

        const state = game.getState();
        if (!state.avatarId) {
            avatarTip.textContent = '请选择头像';
            avatarTip.className = 'tip error';
            return;
        }
        avatarTip.textContent = '✓ 已选择头像';
        avatarTip.className = 'tip success';
        
        const result = game.setInfluencerName(name);
        
        if (result.success) {
            this.showCategoryScreen();
        } else {
            const tip = document.getElementById('name-tip');
            tip.textContent = result.message;
            tip.className = 'tip error';
        }
    }

    // 随机分配角色属性
    handleRollAttributes() {
        game.rollAttributes();
        this.renderAttributeList();
    }

    handleRandomName() {
        const input = document.getElementById('influencer-name');
        const list = GameConfig.randomNames || [];
        if (list.length === 0) return;
        const current = input.value.trim();
        let next = current;
        let guard = 0;
        while (next === current && guard < 5) {
            next = list[Math.floor(Math.random() * list.length)];
            guard += 1;
        }
        input.value = next;
        this.validateName();
    }

    handleGenderChange() {
        const gender = this.getSelectedGender();
        if (!gender) return;
        game.setGender(gender);
        this.renderAvatarList();
    }

    svgToDataUrl(svg) {
        const trimmed = (svg || '').trim();
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(trimmed)}`;
    }

    renderAvatarList() {
        const container = document.getElementById('avatar-list');
        const tip = document.getElementById('avatar-tip');
        if (!container) return;
        container.innerHTML = '';

        const gender = this.getSelectedGender();
        if (!gender) {
            tip.textContent = '请选择头像';
            tip.className = 'tip';
            return;
        }

        const list = GameConfig.avatarOptions?.[gender] || [];
        if (list.length === 0) {
            tip.textContent = '暂无头像可选';
            tip.className = 'tip error';
            return;
        }

        const state = game.getState();
        let selected = state.avatarId;
        if (!selected || !list.some(item => item.id === selected)) {
            selected = list[0].id;
            game.setAvatar(selected);
        }

        list.forEach(item => {
            const card = document.createElement('div');
            card.className = 'avatar-item';
            if (item.id === selected) card.classList.add('selected');
            const svgBox = document.createElement('div');
            svgBox.className = 'avatar-svg';
            svgBox.innerHTML = item.svg;

            const name = document.createElement('div');
            name.className = 'avatar-name';
            name.textContent = item.name;

            card.appendChild(svgBox);
            card.appendChild(name);

            card.addEventListener('click', () => {
                game.setAvatar(item.id);
                this.renderAvatarList();
            });

            container.appendChild(card);
        });

        tip.textContent = '✓ 已选择头像';
        tip.className = 'tip success';
    }

    setDefaultName() {
        const input = document.getElementById('influencer-name');
        if (input && !input.value) {
            input.value = GameConfig.defaultName;
            this.validateName();
        }
    }

    getSelectedGender() {
        const checked = document.querySelector('input[name="gender"]:checked');
        return checked ? checked.value : null;
    }

    // 渲染创角属性列表
    renderAttributeList() {
        const container = document.getElementById('attribute-list');
        const tip = document.getElementById('attr-tip');
        if (!container) return;

        const attrs = game.getState().attributes;
        container.innerHTML = '';

        GameConfig.characterAttributes.list.forEach(item => {
            const value = attrs ? attrs[item.key] : '-';
            const el = document.createElement('div');
            el.className = 'attribute-item';
            el.innerHTML = `${item.name}<strong>${value}</strong>`;
            container.appendChild(el);
        });

        if (attrs) {
            tip.textContent = '已随机分配属性点';
            tip.className = 'tip success';
        } else {
            tip.textContent = '点击按钮随机分配属性点';
            tip.className = 'tip';
        }
    }

    // 显示类别选择界面
    showCategoryScreen() {
        this.switchScreen('category-screen');
        this.renderCategories();
    }

    // 渲染类别列表
    renderCategories() {
        const container = document.getElementById('category-list');
        container.innerHTML = '';
        
        GameConfig.categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-header">
                    <div class="category-icon">${category.icon}</div>
                    <div class="category-name">${category.name}</div>
                </div>
                <div class="category-details">
                    <div class="category-detail">
                        <span class="category-label">初始加成：</span>
                        ${category.initialBonus}
                    </div>
                    <div class="category-detail">
                        <span class="category-label">变现渠道：</span>
                        ${category.profitChannel}
                    </div>
                    <div class="category-detail">
                        <span class="category-label">⚠️ 风险：</span>
                        ${category.risk}
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => this.selectCategory(category.id));
            container.appendChild(card);
        });
    }

    // 选择类别
    selectCategory(categoryId) {
        console.log('选择类别:', categoryId);
        if (game.selectCategory(categoryId)) {
            console.log('类别选择成功，当前状态:', game.getState());
            this.showMainGame();
        } else {
            console.error('类别选择失败');
            alert('类别选择失败，请重试');
        }
    }

    // 显示主游戏界面
    showMainGame() {
        this.switchScreen('main-game-screen');
        this.updateUI();
        this.renderActions();
        this.updateLog();
        
        // 月初有60%概率触发事件
        if (Math.random() < 0.6) {
            setTimeout(() => this.triggerEvent(), 1000);
        }
    }

    // 更新UI
    updateUI() {
        const state = game.getState();
        
        // 更新顶部信息
        document.getElementById('name-display').textContent = state.influencerName;
        document.getElementById('category-display').textContent = state.category ? state.category.name : '未分类';
        document.getElementById('rank-display').textContent = state.rank;
        document.getElementById('month-display').textContent = `${state.year}年${state.month}月`;
        
        // 更新数值条
        this.updateStatBar('energy', state.energy);
        this.updateStatBar('mood', state.mood);
        this.updateStatBar('quality', state.contentQuality);
        this.updateStatBar('persona', state.personaFit);
        
        // 更新数值显示
        document.getElementById('fans-value').textContent = state.fans.toLocaleString();
        document.getElementById('savings-value').textContent = `¥${state.savings.toLocaleString()}`;
        document.getElementById('violation-value').textContent = state.violationIndex;

        // 更新行动次数提示
        const actionTip = document.getElementById('action-limit-tip');
        if (actionTip) {
            actionTip.textContent = `本月行动次数：${state.actionCount}/${game.getActionLimit()}`;
            actionTip.classList.add('action-tip');
        }

        // 更新角色属性显示
        this.renderAttributeDisplay();

        // 更新头像显示
        const avatarDisplay = document.getElementById('avatar-display');
        if (avatarDisplay) {
            const gender = state.gender;
            const list = GameConfig.avatarOptions?.[gender] || [];
            const current = list.find(item => item.id === state.avatarId);
            if (current) {
                avatarDisplay.innerHTML = current.svg;
            }
        }

        // 存款归零直接结束
        if (state.savings <= 0 && !state.isGameOver) {
            game.gameOver('存款归零，资金链断裂，游戏结束');
            this.showGameOver();
        }
        
        // 职级进度已隐藏
    }

    // 渲染主界面角色属性
    renderAttributeDisplay() {
        const container = document.getElementById('attribute-display');
        if (!container) return;
        container.innerHTML = '';

        const attrs = game.getState().attributes;
        if (!attrs) return;

        GameConfig.characterAttributes.list.forEach(item => {
            const chip = document.createElement('div');
            chip.className = 'attribute-chip';
            chip.textContent = `${item.name} ${attrs[item.key]}`;
            container.appendChild(chip);
        });
    }

    // 更新数值条
    updateStatBar(type, value) {
        const bar = document.getElementById(`${type}-bar`);
        const valueDisplay = document.getElementById(`${type}-value`);
        
        bar.style.width = value + '%';
        valueDisplay.textContent = `${Math.floor(value)}/100`;
    }

    // 渲染行动列表
    renderActions() {
        const container = document.getElementById('action-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        const actions = game.getAvailableActions();
        const state = game.getState();
        
        if (!actions || actions.length === 0) {
            container.innerHTML = '<p style="color: #999; text-align: center;">暂无可用行动</p>';
            return;
        }
        
        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'action-btn';
            const energyText = action.energyCost < 0
                ? `+${Math.abs(action.energyCost)}`
                : `-${action.energyCost}`;
            btn.textContent = `${action.name} (${energyText}精力)`;
            
            if (!game.canTakeAction() || (action.energyCost > 0 && state.energy < action.energyCost)) {
                btn.disabled = true;
            }
            
            btn.addEventListener('click', () => this.performAction(action.name));
            container.appendChild(btn);
        });
    }

    // 执行行动
    performAction(actionName) {
        if (actionName === '能力训练') {
            const state = game.getState();
            const maxTraining = GameConfig.trainingConfig?.maxPerMonth ?? 2;
            if (state.trainingCount >= maxTraining) {
                alert(`本月训练次数已达上限（${maxTraining}次）`);
                return;
            }
            if (!game.canTakeAction()) {
                alert(`本月行动次数已达上限（${game.getActionLimit()}次）`);
                return;
            }
            game.consumeAction();
            const event = game.getTrainingEvent();
            this.showEventModal(event);
            return;
        }
        if (actionName === '擦边试探') {
            if (!game.canTakeAction()) {
                alert(`本月行动次数已达上限（${game.getActionLimit()}次）`);
                return;
            }
            game.consumeAction();
            const event = game.getEdgeActionEvent();
            if (event) {
                this.showEventModal(event);
            }
            return;
        }
        const result = game.performAction(actionName);
        
        if (result.success) {
            this.updateUI();
            this.renderActions(); // 重新渲染行动按钮（更新可用状态）
            this.updateLog();
            
            // 如果触发事件
            if (result.triggerEvent) {
                setTimeout(() => this.triggerEvent(), 500);
            }
        } else {
            alert(result.message);
        }
    }

    // 触发事件
    triggerEvent() {
        console.log('触发随机事件');
        const event = game.getEventForCurrentMonth();
        console.log('事件内容:', event);
        if (event) {
            this.showEventModal(event);
        } else {
            console.error('事件生成失败');
        }
    }

    // 显示事件弹窗
    showEventModal(event) {
        const modal = document.getElementById('event-modal');
        document.getElementById('event-title').textContent = event.title;
        const desc = document.getElementById('event-description');
        desc.textContent = event.description;
        const oldBanner = modal.querySelector('.risk-banner');
        if (oldBanner) oldBanner.remove();
        if (event.title.includes('擦边')) {
            const banner = document.createElement('div');
            banner.className = 'risk-banner';
            banner.textContent = '风险提示：擦边会带来口碑与内容质量损耗，请谨慎选择。';
            desc.insertAdjacentElement('afterend', banner);
        }
        
        const optionsContainer = document.getElementById('event-options');
        optionsContainer.innerHTML = '';
        const state = game.getState();

        const getCostText = (option) => {
            const effects = option.effects || {};
            const costs = [];
            if (effects.energy && effects.energy < 0) {
                costs.push(`精力${Math.abs(effects.energy)}`);
            }
            if (effects.savings && effects.savings < 0) {
                costs.push(`存款¥${Math.abs(effects.savings)}`);
            }
            if (effects.profit && effects.profit < 0) {
                costs.push(`存款¥${Math.abs(effects.profit)}`);
            }
            return costs.length > 0 ? `需要消耗：${costs.join(' / ')}` : '';
        };

        const canAffordOption = (option) => {
            const effects = option.effects || {};
            const energyCost = effects.energy || 0;
            const savingsCost = effects.savings || 0;
            const profitCost = effects.profit || 0;
            if (energyCost < 0 && state.energy + energyCost < 0) return false;
            const moneyCost = (savingsCost < 0 ? savingsCost : 0) + (profitCost < 0 ? profitCost : 0);
            if (moneyCost < 0 && state.savings + moneyCost < 0) return false;
            return true;
        };
        
        event.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            if (option.type === 'negative') btn.classList.add('negative');
            if (option.type === 'mixed') btn.classList.add('mixed');
            if (option.type === 'risky') btn.classList.add('risky');
            const eligible = game.isOptionEligible(option);
            const affordable = event.title === '能力训练' ? canAffordOption(option) : true;
            const costText = getCostText(option);
            const baseText = costText ? `${option.text}（${costText}）` : option.text;
            const suffixes = [];
            if (!eligible) suffixes.push('条件不足');
            if (!affordable) suffixes.push('不可负担');
            btn.textContent = suffixes.length > 0 ? `${baseText}（${suffixes.join(' / ')}）` : baseText;
            btn.disabled = !(eligible && affordable);
            
            btn.addEventListener('click', () => this.handleEventOption(event, index));
            optionsContainer.appendChild(btn);
        });
        
        modal.classList.add('active');
    }

    // 处理事件选项
    handleEventOption(event, optionIndex) {
        game.handleEventOption(event, optionIndex);
        this.closeEventModal();
        this.updateUI();
        this.updateLog();
        
        // 检查游戏是否结束
        if (game.state.isGameOver) {
            this.showGameOver();
        }
    }

    // 关闭事件弹窗
    closeEventModal() {
        document.getElementById('event-modal').classList.remove('active');
    }

    // 月末结算
    handleMonthEnd() {
        console.log('开始月度结算');
        const result = game.monthlySettle();
        console.log('结算结果:', result);
        this.updateUI();
        this.renderActions();
        this.updateLog();
        
        if (!game.state.isGameOver) {
            this.showMonthlyModal();
            this.showRankUpModalIfNeeded();
        } else {
            setTimeout(() => {
                this.showGameOver();
            }, 500);
        }
    }

    showRankUpModalIfNeeded() {
        const state = game.getState();
        if (!state.lastRankUp) return;
        const modal = document.getElementById('rankup-modal');
        const title = document.getElementById('rankup-title');
        const desc = document.getElementById('rankup-desc');
        title.textContent = '职级晋升';
        desc.textContent = `恭喜晋升：${state.lastRankUp.from} → ${state.lastRankUp.to}`;
        modal.classList.add('active');
        game.state.lastRankUp = null;
    }

    closeRankUpModal() {
        document.getElementById('rankup-modal').classList.remove('active');
    }

    // 显示月度总结弹窗（仅粉丝与存款）
    showMonthlyModal() {
        const modal = document.getElementById('monthly-modal');
        const content = document.getElementById('monthly-content');
        const state = game.getState();

        content.innerHTML = `
            <div class="monthly-summary">
                <div class="monthly-card">
                    <div>本月粉丝</div>
                    <div class="value">${state.fans.toLocaleString()}</div>
                </div>
                <div class="monthly-card">
                    <div>当前存款</div>
                    <div class="value">¥${state.savings.toLocaleString()}</div>
                </div>
            </div>
        `;

        modal.classList.add('active');
    }

    // 关闭月度总结弹窗
    closeMonthlyModal() {
        document.getElementById('monthly-modal').classList.remove('active');
        if (!game.state.isGameOver && Math.random() < 0.6) {
            setTimeout(() => this.triggerEvent(), 300);
        }
    }

    // 显示游戏结束
    showGameOver() {
        const modal = document.getElementById('gameover-modal');
        const state = game.getState();
        
        const isVictory = state.rank === 'MCN签约' && state.isGameOver;
        const isSuddenDeath = state.gameOverReason && state.gameOverReason.includes('猝死');
        
        document.getElementById('gameover-title').textContent = isVictory ? '🎉 游戏胜利！' : '游戏结束';
        if (isSuddenDeath) {
            document.getElementById('gameover-title').textContent = '⚠️ 猝死事件';
            document.getElementById('gameover-reason').textContent =
                '高强度透支导致精力归零，猝死事件触发。健康与节奏同样重要。';
        } else {
            document.getElementById('gameover-reason').textContent = state.gameOverReason;
        }
        
        const statsContainer = document.getElementById('gameover-stats');
        statsContainer.innerHTML = `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <p><strong>最终数据统计</strong></p>
                <p>坚持月数：${(state.year - 2026) * 12 + state.month}个月</p>
                <p>最终职级：${state.rank}</p>
                <p>粉丝数量：${state.fans.toLocaleString()}</p>
                <p>累计收益：¥${state.profit.toLocaleString()}</p>
                <p>当前存款：¥${state.savings.toLocaleString()}</p>
                <p>内容质量：${Math.floor(state.contentQuality)}</p>
                <p>人设契合：${Math.floor(state.personaFit)}</p>
                <p>违规指数：${state.violationIndex}</p>
            </div>
        `;
        
        modal.classList.add('active');
    }

    // 重新开始
    restartGame() {
        document.getElementById('gameover-modal').classList.remove('active');
        game.init();
        this.switchScreen('naming-screen');
        document.getElementById('influencer-name').value = '';
        document.getElementById('name-tip').textContent = '名字不能包含违规词汇';
        document.getElementById('name-tip').className = 'tip';
        document.getElementById('gender-tip').textContent = '请选择性别';
        document.getElementById('gender-tip').className = 'tip';
        document.querySelectorAll('input[name="gender"]').forEach(r => r.checked = false);
        document.getElementById('avatar-tip').textContent = '请选择头像';
        document.getElementById('avatar-tip').className = 'tip';
        this.setDefaultName();
        this.renderAttributeList();
        this.renderAvatarList();
    }

    // 更新日志
    updateLog() {
        const container = document.getElementById('log-content');
        container.innerHTML = '';
        
        // 只显示最近20条日志
        const recentLogs = game.eventLog.slice(-20);
        
        recentLogs.forEach(log => {
            const entry = document.createElement('p');
            entry.className = `log-entry ${log.type}`;
            const yearText = log.year ? `${log.year}年` : '';
            entry.textContent = `[${yearText}${log.month}月] ${log.message}`;
            container.appendChild(entry);
        });
        
        // 滚动到底部
        container.scrollTop = container.scrollHeight;
    }

    // 保存游戏
    handleSave() {
        const state = game.getState();
        if (storage.saveGame(state)) {
            alert('游戏已保存！');
        } else {
            alert('保存失败！');
        }
    }

    // 显示菜单
    showMenu() {
        document.getElementById('menu-modal').classList.add('active');
    }

    // 关闭菜单
    closeMenu() {
        document.getElementById('menu-modal').classList.remove('active');
    }

    showHelp() {
        document.getElementById('help-modal').classList.add('active');
        this.switchHelpTab('help-attrs');
    }

    closeHelp() {
        document.getElementById('help-modal').classList.remove('active');
    }

    switchHelpTab(tabId) {
        document.querySelectorAll('.help-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.help-panel').forEach(p => p.classList.remove('active'));
        const activeTab = document.querySelector(`.help-tab[data-tab="${tabId}"]`);
        const activePanel = document.getElementById(tabId);
        if (activeTab) activeTab.classList.add('active');
        if (activePanel) activePanel.classList.add('active');
    }

    // 新游戏
    newGame() {
        if (confirm('确定要开始新游戏吗？当前进度将丢失（除非已保存）')) {
            this.closeMenu();
            this.restartGame();
        }
    }

    // 加载游戏
    loadGame() {
        const savedState = storage.loadGame();
        if (savedState) {
            game.loadState(savedState);
            this.closeMenu();
            this.showMainGame();
            alert('存档加载成功！');
        } else {
            alert('没有找到存档！');
        }
    }
}

// 页面加载完成后初始化UI
document.addEventListener('DOMContentLoaded', () => {
    try {
        const ui = new UIController();
        
        // 检查是否有存档
        if (storage.hasSave()) {
            const saveTime = storage.getSaveTime();
            const loadSave = confirm(`检测到存档（${saveTime.toLocaleString()}），是否加载？`);
            if (loadSave) {
                ui.loadGame();
            }
        }
    } catch (e) {
        console.error('游戏初始化失败:', e);
        document.body.innerHTML = `<div style="padding:40px;color:red;font-size:18px;">
            <h2>游戏初始化出错</h2>
            <pre>${e.message}\n${e.stack}</pre>
        </div>`;
    }
});
