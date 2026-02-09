// UI控制器
class UIController {
    constructor() {
        this.currentScreen = 'naming-screen';
        this.currentMessageId = null;
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
        bind('intro-confirm-btn', 'click', () => this.closeIntroModal());
        bind('result-confirm-btn', 'click', () => this.closeResultModal());
        bind('partner-picker-cancel', 'click', () => this.closePartnerPicker());
        bind('message-btn', 'click', () => this.showMessages());
        bind('messages-close-btn', 'click', () => this.closeMessages());
        bind('platform-manage-btn', 'click', () => this.showPlatformManageMenu());
        bind('trigger-event-comment-btn', 'click', () => this.openEventsPanel());
        bind('events-panel-close', 'click', () => this.closeEventsPanel());
        bind('events-panel-close-btn', 'click', () => this.closeEventsPanel());
        document.querySelectorAll('.help-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchHelpTab(tab.dataset.tab));
        });
        document.querySelectorAll('.bottom-tab-item').forEach(item => {
            item.addEventListener('click', () => this.switchMainTab(item.dataset.tab));
        });
        
        // 初始化游戏
        game.init();
        this.setDefaultName();
        this.renderAttributeList();
        this.renderAvatarList();
        
        // 显示创角鼓励弹窗
        this.showIntroModal();
    }

    // 切换屏幕
    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;
    }

    // 切换主游戏页签（个人主页 / 消息 / 行动）
    switchMainTab(tabId) {
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.bottom-tab-item').forEach(b => b.classList.remove('active'));
        const panel = document.getElementById(tabId);
        const btn = document.querySelector(`.bottom-tab-item[data-tab="${tabId}"]`);
        if (panel) panel.classList.add('active');
        if (btn) btn.classList.add('active');
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
            this.showPlatformScreen();
        } else {
            console.error('类别选择失败');
            alert('类别选择失败，请重试');
        }
    }

    // 显示平台选择界面
    showPlatformScreen() {
        this.switchScreen('platform-screen');
        this.renderPlatforms();
    }

    // 渲染平台列表
    renderPlatforms() {
        const container = document.getElementById('platform-list');
        container.innerHTML = '';
        
        const platforms = Object.values(GameConfig.platforms);
        const categoryId = game.state.category?.id;
        
        platforms.forEach(platform => {
            const card = document.createElement('div');
            card.className = 'platform-card';
            
            // 判断是否适合当前类别
            const suitable = !categoryId || platform.suitableCategories.includes(categoryId);
            
            card.innerHTML = `
                <div class="platform-header">
                    <div class="platform-icon">${platform.icon}</div>
                    <div class="platform-info">
                        <div class="platform-name">${platform.name}</div>
                        <div class="platform-desc">${platform.description}</div>
                    </div>
                </div>
                <ul class="platform-features">
                    ${platform.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <div class="platform-switch-cost">💸 转换平台粉丝损失：${(platform.switchCost * 100).toFixed(0)}%</div>
            `;
            
            if (!suitable) {
                card.style.opacity = '0.6';
            }
            
            card.addEventListener('click', () => this.selectPlatform(platform.id));
            container.appendChild(card);
        });
    }

    // 选择平台
    selectPlatform(platformId) {
        console.log('选择平台:', platformId);
        if (game.selectPlatform(platformId)) {
            console.log('平台选择成功，当前状态:', game.getState());
            this.showMainGame(true);  // 标记为首次进入
        } else {
            console.error('平台选择失败');
            alert('平台选择失败，请重试');
        }
    }

    // 显示主游戏界面
    showMainGame(isFirstEntry = false) {
        this.switchScreen('main-game-screen');
        this.updateUI();
        this.renderActions();
        this.updateLog();
        this.updateMessageBadge();
        
        if (isFirstEntry) {
            // 首次进入：显示平台引导消息提醒，延迟弹出助理消息
            setTimeout(() => {
                const unreadCount = game.getUnreadMessageCount();
                if (unreadCount > 0) {
                    this.showOnboardingHint();
                }
            }, 800);
        } else {
            // 月初有60%概率触发事件
            if (Math.random() < 0.6) {
                setTimeout(() => this.triggerEvent(), 1000);
            }
        }
    }

    // 显示入驻引导提醒
    showOnboardingHint() {
        const state = game.getState();
        const platformName = state.platform?.name || '平台';
        const platformIcon = state.platform?.icon || '📱';
        
        // 直接打开助理消息列表
        this.showMessages();
    }

    // 更新UI
    updateUI() {
        const state = game.getState();
        
        // 更新顶部信息
        document.getElementById('name-display').textContent = state.influencerName;
        const platformDisplay = document.getElementById('platform-display');
        if (state.platform) {
            const subCount = state.subPlatforms?.length || 0;
            const platformText = subCount > 0 
                ? `${state.platform.icon} ${state.platform.name} +${subCount}`
                : `${state.platform.icon} ${state.platform.name}`;
            platformDisplay.textContent = platformText;
            platformDisplay.title = subCount > 0 
                ? `主平台：${state.platform.name}\n副平台：${state.subPlatforms.map(p => p.platform.name).join('、')}`
                : '';
        } else {
            platformDisplay.textContent = '未选择平台';
        }
        
        // 更新平台管理按钮
        const platformManageIcon = document.getElementById('platform-manage-icon');
        const platformManageTitle = document.getElementById('platform-manage-title');
        const platformManageSubtitle = document.getElementById('platform-manage-subtitle');
        if (state.platform && platformManageIcon) {
            platformManageIcon.textContent = state.platform.icon;
            platformManageTitle.textContent = `${state.platform.name} · 平台管理`;
            const subCount = state.subPlatforms?.length || 0;
            platformManageSubtitle.textContent = subCount > 0 
                ? `切换平台 · 多开账号 · 副平台×${subCount}` 
                : '切换平台 · 多开账号';
        }
        
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

        // 更新「新增关注」本月新增粉丝数
        this.updateMonthlyFanGain();

        // 更新角色属性显示
        this.renderAttributeDisplay();

        // 更新头像显示（顶部栏 + 个人主页）
        const avatarDisplay = document.getElementById('avatar-display');
        const profileAvatar = document.getElementById('profile-avatar');
        const profileName = document.getElementById('profile-name');
        const profileCategory = document.getElementById('profile-category');
        const gender = state.gender;
        const list = GameConfig.avatarOptions?.[gender] || [];
        const current = list.find(item => item.id === state.avatarId);
        if (current) {
            if (avatarDisplay) avatarDisplay.innerHTML = current.svg;
            if (profileAvatar) profileAvatar.innerHTML = current.svg;
        }
        if (profileName) profileName.textContent = state.influencerName;
        if (profileCategory) profileCategory.textContent = state.category ? state.category.name : '—';

        // 精力归零触发猝死
        if (state.energy <= 0 && !state.isGameOver) {
            game.gameOver('精力归零，猝死事件触发，游戏结束');
            this.showGameOver();
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
        
        const common = actions.filter(a => a.categoryType === 'common');
        const exclusive = actions.filter(a => a.categoryType === 'exclusive');
        const groups = [];
        if (common.length) groups.push({ title: '通用行动', list: common });
        if (exclusive.length) groups.push({ title: (exclusive[0].categoryName || '本类') + '专属', list: exclusive });
        
        groups.forEach(group => {
            const titleEl = document.createElement('div');
            titleEl.className = 'action-group-title';
            titleEl.textContent = group.title;
            container.appendChild(titleEl);
            group.list.forEach(action => {
                const btn = document.createElement('button');
                btn.className = 'action-btn';
                let energyText;
                if (action.energyCost > 0) {
                    energyText = `-${action.energyCost}精力`;
                } else if (action.energyCost < 0) {
                    energyText = `+${Math.abs(action.energyCost)}精力`;
                } else if (action.energyCost === 0 && action.effects && action.effects.energy) {
                    const energyGain = action.effects.energy;
                    energyText = energyGain > 0 ? `+${energyGain}精力` : `${energyGain}精力`;
                } else {
                    energyText = action.description || '';
                }
                btn.textContent = `${action.name} (${energyText})`;
                if (!game.canTakeAction() || (action.energyCost > 0 && state.energy < action.energyCost)) {
                    btn.disabled = true;
                }
                btn.addEventListener('click', () => this.performAction(action.name));
                container.appendChild(btn);
            });
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
                alert(`本月行动次数已达上限（${game.getActionLimit()}次）。\n\n提示：小助理消息、平台管理不消耗行动次数。`);
                return;
            }
            game.consumeAction();
            const event = game.getTrainingEvent();
            this.showEventModal(event);
            return;
        }
        if (actionName === '擦边试探') {
            if (!game.canTakeAction()) {
                alert(`本月行动次数已达上限（${game.getActionLimit()}次）。\n\n提示：小助理消息、平台管理不消耗行动次数。`);
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
            if (result.gameOver) {
                this.updateUI();
                this.showGameOver();
            } else {
                alert(result.message);
            }
        }
    }

    // 更新「新增关注」显示：本月新增粉丝数
    updateMonthlyFanGain() {
        const el = document.getElementById('monthly-fan-gain');
        if (!el) return;
        const state = game.getState();
        const lastFans = state.lastMonthStats?.fans ?? state.fans;
        const gain = state.fans - lastFans;
        el.textContent = (gain >= 0 ? '+' : '') + gain.toLocaleString();
        el.classList.toggle('positive', gain > 0);
    }

    // 打开评论与事件二级界面：只展示「已触发、待处理」的事件列表（由行动、月末等自动触发），无主动抽取。
    openEventsPanel() {
        const listEl = document.getElementById('events-panel-list');
        const emptyEl = document.getElementById('events-panel-empty');
        if (!listEl || !emptyEl) return;

        const pending = game.getPendingEvents();
        listEl.innerHTML = '';

        if (pending.length === 0) {
            emptyEl.style.display = 'block';
            document.getElementById('events-panel-empty-text').textContent = '暂无待处理事件';
            document.getElementById('events-panel-empty-hint').textContent = '事件会在执行行动、月末结算等时机自动触发，届时会出现在这里。';
        } else {
            emptyEl.style.display = 'none';
            pending.forEach(({ id, event, time }) => {
                const card = document.createElement('button');
                card.type = 'button';
                card.className = 'events-panel-card';
                const preview = (event.messagePreview || event.description || event.title).replace(/^📱\s*/, '').slice(0, 60);
                card.innerHTML = `
                    <div class="events-panel-card-title">${event.title}</div>
                    <div class="events-panel-card-preview">${preview}${preview.length >= 60 ? '…' : ''}</div>
                    <span class="events-panel-card-tag">${time}</span>
                `;
                card.addEventListener('click', () => {
                    game.removePendingEvent(id);
                    this.closeEventsPanel();
                    this.showEventModal(event);
                    this.updateMessageBadge();
                    this.updateLog();
                });
                listEl.appendChild(card);
            });
        }

        document.getElementById('events-panel-modal').classList.add('active');
    }

    // 关闭评论与事件二级界面
    closeEventsPanel() {
        this.pendingPanelEvent = null;
        document.getElementById('events-panel-modal').classList.remove('active');
    }

    // 触发事件：按设计每种事件有各自触发方式（行动后、月末、月初等）。触发后：助理类进消息，其余进「评论与事件」待处理列表。
    triggerEvent() {
        const event = game.getEventForCurrentMonth();
        if (!event) return;
        if (event.isMessage) {
            game.addMessage(event, event.isUrgent);
            this.updateMessageBadge();
            game.addLog(`📱 收到助理消息：${event.title}`, 'normal');
            this.updateLog();
        } else {
            game.addPendingEvent(event);
            this.updateMessageBadge();
            game.addLog(`💬 新事件待处理：${event.title}`, 'normal');
            this.updateLog();
        }
    }

    // 显示事件弹窗（messageId 不为空时表示来自小助理消息，选择后将删除该消息）
    showEventModal(event, messageId = null) {
        this.currentMessageId = messageId != null ? messageId : null;
        const modal = document.getElementById('event-modal');
        document.getElementById('event-title').textContent = event.title;
        const desc = document.getElementById('event-description');
        // 引导类消息支持换行显示
        if (event.isOnboarding || event.description.includes('\n')) {
            desc.innerHTML = event.description.replace(/\n/g, '<br>');
        } else {
            desc.textContent = event.description;
        }
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
            
            btn.addEventListener('click', () => {
                if (this.isCoopOption(option)) {
                    this.pendingCoop = { event, optionIndex };
                    this.showPartnerPicker();
                } else {
                    this.handleEventOption(event, index);
                }
            });
            optionsContainer.appendChild(btn);
        });
        
        modal.classList.add('active');
    }

    // 判断是否为合作类选项（需要二级选合作对象）
    isCoopOption(option) {
        if (!option) return false;
        if (option.isCoopChoice === true) return true;
        const t = (option.text || '').trim();
        const coopKeywords = ['合作', '代言', '联名', '签约', '邀约', '接受合作', '接广告'];
        const isCoopText = coopKeywords.some(kw => t.includes(kw));
        const isPositive = option.type === 'positive' && option.effects && (option.effects.profit > 0 || option.effects.fans > 0);
        if (isCoopText && isPositive) return true;
        return false;
    }

    // 显示合作对象选择弹窗
    showPartnerPicker() {
        const listEl = document.getElementById('partner-picker-list');
        if (!listEl) return;
        const partners = GameConfig.cooperationPartners || [];
        const shuffled = partners.slice().sort(() => Math.random() - 0.5);
        const showCount = Math.min(9, shuffled.length);
        listEl.innerHTML = '';
        shuffled.slice(0, showCount).forEach(partner => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'option-btn partner-option';
            btn.innerHTML = `<span class="partner-name">${partner.name}</span><span class="partner-tag">${partner.tag}</span>`;
            btn.addEventListener('click', () => {
                this.closePartnerPicker();
                if (this.pendingCoop) {
                    const { event, optionIndex } = this.pendingCoop;
                    this.pendingCoop = null;
                    this.handleEventOption(event, optionIndex, partner);
                }
            });
            listEl.appendChild(btn);
        });
        const modal = document.getElementById('partner-picker-modal');
        if (modal) modal.classList.add('active');
    }

    closePartnerPicker() {
        this.pendingCoop = null;
        const modal = document.getElementById('partner-picker-modal');
        if (modal) modal.classList.remove('active');
    }

    // 处理事件选项（partner 为合作类二级选择时传入）
    handleEventOption(event, optionIndex, partner) {
        const option = event.options[optionIndex];
        const beforeState = {
            energy: game.state.energy,
            mood: game.state.mood,
            contentQuality: game.state.contentQuality,
            personaFit: game.state.personaFit,
            fans: game.state.fans,
            savings: game.state.savings,
            violationIndex: game.state.violationIndex,
            attributes: { ...(game.state.attributes || {}) }
        };
        
        game.handleEventOption(event, optionIndex, partner);
        if (this.currentMessageId != null) {
            game.deleteMessage(this.currentMessageId);
            this.currentMessageId = null;
            this.updateMessageBadge();
        }
        this.closeEventModal();
        
        const afterState = {
            energy: game.state.energy,
            mood: game.state.mood,
            contentQuality: game.state.contentQuality,
            personaFit: game.state.personaFit,
            fans: game.state.fans,
            savings: game.state.savings,
            violationIndex: game.state.violationIndex,
            attributes: { ...(game.state.attributes || {}) }
        };
        
        // 显示结果反馈
        this.showResultModal(event, option, beforeState, afterState);
        
        this.updateUI();
        this.updateLog();
        this.updateMessageBadge();
        
        // 检查游戏是否结束
        if (game.state.isGameOver) {
            setTimeout(() => this.showGameOver(), 500);
        }
    }

    // 关闭事件弹窗（未选选项时清除消息关联，避免误删）
    closeEventModal() {
        this.currentMessageId = null;
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
            this.showMonthlyModal(result.monthlyChange);
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

    // 显示月度总结弹窗（含对比数据，使用结算返回的 monthlyChange 避免被覆盖后显示无变化）
    showMonthlyModal(monthlyChange) {
        const modal = document.getElementById('monthly-modal');
        const content = document.getElementById('monthly-content');
        const state = game.getState();
        
        const fansChange = monthlyChange && typeof monthlyChange.fans === 'number' ? monthlyChange.fans : (state.fans - (state.lastMonthStats?.fans ?? 0));
        const savingsChange = monthlyChange && typeof monthlyChange.savings === 'number' ? monthlyChange.savings : (state.savings - (state.lastMonthStats?.savings ?? state.savings));
        const profitChange = monthlyChange && typeof monthlyChange.profit === 'number' ? monthlyChange.profit : 0;
        
        // 格式化变化数值
        const formatChange = (value, prefix = '') => {
            if (value > 0) {
                return `<span style="color: #10b981;">▲ ${prefix}${Math.abs(value).toLocaleString()}</span>`;
            } else if (value < 0) {
                return `<span style="color: #ef4444;">▼ ${prefix}${Math.abs(value).toLocaleString()}</span>`;
            } else {
                return `<span style="color: #999;">— 无变化</span>`;
            }
        };

        content.innerHTML = `
            <div class="monthly-summary">
                <div class="monthly-card">
                    <div class="monthly-card-label">本月收益</div>
                    <div class="value ${profitChange >= 0 ? 'positive' : 'negative'}">¥${profitChange.toLocaleString()}</div>
                    <div class="monthly-change">${profitChange >= 0 ? '本月赚取' : '本月亏损'}</div>
                </div>
                <div class="monthly-card">
                    <div class="monthly-card-label">本月粉丝</div>
                    <div class="value">${state.fans.toLocaleString()}</div>
                    <div class="monthly-change">${formatChange(fansChange)}</div>
                </div>
                <div class="monthly-card">
                    <div class="monthly-card-label">当前存款</div>
                    <div class="value">¥${state.savings.toLocaleString()}</div>
                    <div class="monthly-change">${formatChange(savingsChange, '¥')}</div>
                </div>
            </div>
        `;

        modal.classList.add('active');
    }

    // 关闭月度总结弹窗
    closeMonthlyModal() {
        document.getElementById('monthly-modal').classList.remove('active');
        // 更新消息红点（可能有新的引导消息）
        this.updateMessageBadge();
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
        const isMoodCollapse = state.gameOverReason && state.gameOverReason.includes('心态炸了');
        
        document.getElementById('gameover-title').textContent = isVictory ? '🎉 游戏胜利！' : '游戏结束';
        if (isSuddenDeath) {
            document.getElementById('gameover-title').textContent = '⚠️ 猝死事件';
            document.getElementById('gameover-reason').textContent =
                '高强度透支导致精力归零，猝死事件触发。健康与节奏同样重要。';
        } else if (isMoodCollapse) {
            document.getElementById('gameover-title').textContent = '💥 心态炸了';
            document.getElementById('gameover-reason').textContent =
                '心态值归零，心态炸了。压力与负面事件累积导致无法继续，退出网红圈。';
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

    showIntroModal() {
        document.getElementById('intro-modal').classList.add('active');
    }

    closeIntroModal() {
        document.getElementById('intro-modal').classList.remove('active');
    }

    // 显示事件结果反馈弹窗
    showResultModal(event, option, beforeState, afterState) {
        const modal = document.getElementById('result-modal');
        const content = document.getElementById('result-content');
        
        const changes = [];
        const stateKeys = {
            energy: '精力',
            mood: '心态',
            contentQuality: '内容质量',
            personaFit: '人设契合',
            fans: '粉丝数',
            savings: '存款',
            violationIndex: '违规指数'
        };
        
        for (const [key, label] of Object.entries(stateKeys)) {
            const before = beforeState[key];
            const after = afterState[key];
            const diff = after - before;
            
            if (diff !== 0) {
                let type = 'neutral';
                if (key === 'violationIndex') {
                    type = diff > 0 ? 'negative' : 'positive';
                } else {
                    type = diff > 0 ? 'positive' : 'negative';
                }
                
                let valueText;
                if (key === 'savings') {
                    valueText = `${diff > 0 ? '+' : '-'}¥${Math.abs(diff).toLocaleString()}`;
                } else if (key === 'fans') {
                    valueText = `${diff > 0 ? '+' : '-'}${Math.abs(diff).toLocaleString()}`;
                } else {
                    valueText = `${diff > 0 ? '+' : ''}${diff}`;
                }
                
                changes.push({ label, value: valueText, type });
            }
        }
        
        // 角色属性变化（颜值、学历、幽默、气质、镜头感）
        const attrList = GameConfig.characterAttributes?.list || [];
        const beforeAttrs = beforeState.attributes || {};
        const afterAttrs = afterState.attributes || {};
        for (const item of attrList) {
            const before = beforeAttrs[item.key] ?? 0;
            const after = afterAttrs[item.key] ?? 0;
            const diff = after - before;
            if (diff !== 0) {
                const type = diff > 0 ? 'positive' : 'negative';
                const valueText = `${diff > 0 ? '+' : ''}${diff}`;
                changes.push({ label: item.name, value: valueText, type });
            }
        }
        
        let html = '';
        if (changes.length > 0) {
            changes.forEach(change => {
                html += `
                    <div class="result-item ${change.type}">
                        <span class="result-label">${change.label}</span>
                        <span class="result-value ${change.type}">${change.value}</span>
                    </div>
                `;
            });
        } else {
            html = '<div class="result-item neutral"><span class="result-label">无变化</span></div>';
        }
        
        html += `<div class="result-summary">${option.text}</div>`;
        
        content.innerHTML = html;
        modal.classList.add('active');
    }

    closeResultModal() {
        document.getElementById('result-modal').classList.remove('active');
    }

    // 显示助理消息列表
    showMessages() {
        const modal = document.getElementById('messages-modal');
        const list = document.getElementById('messages-list');
        const messages = game.getMessages();
        
        if (messages.length === 0) {
            list.innerHTML = `
                <div class="messages-empty">
                    <div class="messages-empty-icon">📭</div>
                    <div class="messages-empty-text">暂无消息</div>
                </div>
            `;
        } else {
            list.innerHTML = '';
            messages.forEach(message => {
                const item = document.createElement('div');
                const isOnboarding = message.event.isOnboarding;
                item.className = `message-item ${message.isRead ? '' : 'unread'} ${isOnboarding ? 'onboarding' : ''} ${message.isUrgent ? 'urgent' : ''}`;
                
                const unreadBadge = message.isRead ? '' : '<span class="message-badge-new">NEW</span>';
                const tagHtml = isOnboarding 
                    ? '<span class="message-tag onboarding-tag">平台引导</span>' 
                    : (message.isUrgent ? '<span class="message-tag urgent-tag">紧急</span>' : '');
                
                const displayTitle = message.event.messagePreview || message.event.title;
                const previewText = message.event.messagePreview
                    ? '点击查看详情并做出选择'
                    : (message.event.description.substring(0, 80) + (message.event.description.length > 80 ? '...' : ''));
                item.innerHTML = `
                    <div class="message-header">
                        <div class="message-title">
                            ${tagHtml}
                            ${displayTitle}
                            ${unreadBadge}
                        </div>
                        <div class="message-time">${message.time}</div>
                    </div>
                    <div class="message-preview">${previewText}</div>
                    <div class="message-action">
                        <button class="message-btn" data-message-id="${message.id}">${isOnboarding ? '查看引导' : (message.event.messagePreview ? '去处理' : '查看详情')}</button>
                    </div>
                `;
                
                const btn = item.querySelector('.message-btn');
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openMessage(message.id);
                });
                
                list.appendChild(item);
            });
        }
        
        modal.classList.add('active');
    }

    closeMessages() {
        document.getElementById('messages-modal').classList.remove('active');
    }

    // 打开消息详情
    openMessage(messageId) {
        const message = game.getMessages().find(m => m.id === messageId);
        if (!message) return;
        
        game.markMessageAsRead(messageId);
        this.closeMessages();
        this.showEventModal(message.event, message.id);
        this.updateMessageBadge();
    }

    // 更新消息红点（小助理未读 + 评论与事件待处理数 + 底部消息页签角标）
    updateMessageBadge() {
        const badge = document.getElementById('message-badge');
        const eventsBadge = document.getElementById('events-pending-badge');
        const messageTabBtn = document.querySelector('.bottom-tab-item[data-tab="tab-messages"]');
        const unreadCount = game.getUnreadMessageCount();
        const pendingCount = game.getPendingEvents().length;
        
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
        if (eventsBadge) {
            if (pendingCount > 0) {
                eventsBadge.textContent = pendingCount;
                eventsBadge.style.display = 'block';
            } else {
                eventsBadge.style.display = 'none';
            }
        }
        if (messageTabBtn) {
            if (unreadCount > 0 || pendingCount > 0) messageTabBtn.classList.add('has-badge');
            else messageTabBtn.classList.remove('has-badge');
        }
    }

    // 显示平台管理菜单
    showPlatformManageMenu() {
        const state = game.getState();
        const currentPlatform = state.platform;
        if (!currentPlatform) {
            alert('当前没有选择平台');
            return;
        }
        
        const modal = document.getElementById('event-modal');
        document.getElementById('event-title').textContent = `${currentPlatform.icon} 平台管理`;
        
        const subCount = state.subPlatforms?.length || 0;
        let descText = `当前主平台：${currentPlatform.icon} ${currentPlatform.name}`;
        if (subCount > 0) {
            descText += `\n副平台(${subCount}个)：${state.subPlatforms.map(p => p.platform.icon + ' ' + p.platform.name).join('、')}`;
        }
        
        const desc = document.getElementById('event-description');
        desc.innerHTML = descText.replace(/\n/g, '<br>');
        
        const optionsContainer = document.getElementById('event-options');
        optionsContainer.innerHTML = '';
        
        // 切换平台按钮
        const switchBtn = document.createElement('button');
        switchBtn.className = 'event-option-btn';
        switchBtn.innerHTML = `<span class="option-text">🔄 切换平台</span><span class="option-cost">转移到其他平台发展（会损失部分粉丝）</span>`;
        switchBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            this.showPlatformSwitchModal();
        });
        optionsContainer.appendChild(switchBtn);
        
        // 多开平台按钮
        const multiBtn = document.createElement('button');
        multiBtn.className = 'event-option-btn';
        const check = game.canOpenNewPlatform();
        if (check.canOpen) {
            multiBtn.innerHTML = `<span class="option-text">➕ 多开平台</span><span class="option-cost">在其他平台开设账号</span>`;
        } else {
            multiBtn.innerHTML = `<span class="option-text">➕ 多开平台</span><span class="option-cost">🔒 ${check.reason}</span>`;
            multiBtn.style.opacity = '0.6';
        }
        multiBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            this.showMultiPlatformModal();
        });
        optionsContainer.appendChild(multiBtn);
        
        // 副平台管理按钮（如果有副平台）
        if (subCount > 0) {
            const manageBtn = document.createElement('button');
            manageBtn.className = 'event-option-btn';
            manageBtn.innerHTML = `<span class="option-text">📋 副平台管理</span><span class="option-cost">查看和管理已开设的副平台账号</span>`;
            manageBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                this.showSubPlatformManagement();
            });
            optionsContainer.appendChild(manageBtn);
        }
        
        // 取消按钮
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'event-option-btn';
        cancelBtn.textContent = '返回';
        cancelBtn.style.opacity = '0.7';
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        optionsContainer.appendChild(cancelBtn);
        
        modal.classList.add('active');
    }

    // 显示平台切换弹窗
    showPlatformSwitchModal() {
        const modal = document.getElementById('event-modal');
        const currentPlatform = game.state.platform;
        
        if (!currentPlatform) {
            alert('当前没有选择平台');
            return;
        }
        
        document.getElementById('event-title').textContent = '切换平台';
        document.getElementById('event-description').textContent = 
            `当前平台：${currentPlatform.icon} ${currentPlatform.name}\n切换平台会损失部分粉丝，但可以获得新平台的特性加成。`;
        
        const optionsContainer = document.getElementById('event-options');
        optionsContainer.innerHTML = '';
        
        const platforms = Object.values(GameConfig.platforms);
        platforms.forEach(platform => {
            if (platform.id === currentPlatform.id) return;
            
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            
            const fansLoss = Math.floor(game.state.fans * platform.switchCost);
            btn.textContent = `切换到 ${platform.icon} ${platform.name}（损失${fansLoss.toLocaleString()}粉丝）`;
            
            btn.addEventListener('click', () => {
                const result = game.switchPlatform(platform.id);
                if (result.success) {
                    this.closeEventModal();
                    this.updateUI();
                    this.updateLog();
                    alert(`成功切换到${platform.name}！\n损失了${result.fansLost.toLocaleString()}粉丝`);
                } else {
                    alert(result.message);
                }
            });
            
            optionsContainer.appendChild(btn);
        });
        
        // 添加取消按钮
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'option-btn';
        cancelBtn.textContent = '取消切换';
        cancelBtn.addEventListener('click', () => this.closeEventModal());
        optionsContainer.appendChild(cancelBtn);
        
        modal.classList.add('active');
    }

    // 显示多开平台弹窗
    showMultiPlatformModal() {
        const check = game.canOpenNewPlatform();
        
        if (!check.canOpen) {
            alert(`无法开设新平台账号：${check.reason}`);
            return;
        }
        
        const modal = document.getElementById('event-modal');
        const config = GameConfig.multiPlatformConfig;
        const currentPlatform = game.state.platform;
        const subPlatforms = game.state.subPlatforms.map(p => p.platformId);
        
        document.getElementById('event-title').textContent = '🚀 多平台账号运营';
        document.getElementById('event-description').textContent = 
            `开设新平台账号需要¥${config.baseCost.toLocaleString()}\n` +
            `每月维护成本：¥${config.maintenanceMinCost}起（随粉丝数增加）\n` +
            `副账号会自动产生收益和涨粉，但效率较低\n\n` +
            `当前运营：${game.state.subPlatforms.length + 1}/${config.maxPlatforms}个平台`;
        
        const optionsContainer = document.getElementById('event-options');
        optionsContainer.innerHTML = '';
        
        const platforms = Object.values(GameConfig.platforms);
        platforms.forEach(platform => {
            // 跳过已经开设的平台
            if (currentPlatform && platform.id === currentPlatform.id) return;
            if (subPlatforms.includes(platform.id)) return;
            
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            
            btn.innerHTML = `
                <div style="text-align: left;">
                    <div><strong>${platform.icon} ${platform.name}</strong></div>
                    <div style="font-size: 12px; color: #666; margin-top: 4px;">
                        ${platform.description}<br>
                        收益倍率：${(platform.bonuses.profitRate * 100).toFixed(0)}% | 
                        涨粉倍率：${(platform.bonuses.fanGrowth * 100).toFixed(0)}%
                    </div>
                </div>
            `;
            
            btn.addEventListener('click', () => {
                const result = game.openNewPlatform(platform.id);
                if (result.success) {
                    this.closeEventModal();
                    this.updateUI();
                    this.updateLog();
                    alert(`成功在${platform.name}开设账号！\n花费：¥${result.cost.toLocaleString()}`);
                } else {
                    alert(result.message);
                }
            });
            
            optionsContainer.appendChild(btn);
        });
        
        // 添加查看副账号管理按钮
        if (game.state.subPlatforms.length > 0) {
            const manageBtn = document.createElement('button');
            manageBtn.className = 'option-btn';
            manageBtn.style.background = '#f8f9fa';
            manageBtn.style.borderColor = '#ccc';
            manageBtn.textContent = '📊 管理副平台账号';
            manageBtn.addEventListener('click', () => {
                this.closeEventModal();
                this.showSubPlatformManagement();
            });
            optionsContainer.appendChild(manageBtn);
        }
        
        // 添加取消按钮
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'option-btn';
        cancelBtn.textContent = '取消';
        cancelBtn.addEventListener('click', () => this.closeEventModal());
        optionsContainer.appendChild(cancelBtn);
        
        modal.classList.add('active');
    }

    // 显示副平台账号管理
    showSubPlatformManagement() {
        const modal = document.getElementById('event-modal');
        
        document.getElementById('event-title').textContent = '📊 副平台账号管理';
        
        let desc = `管理你的副平台账号\n每月自动结算收益和成本\n\n`;
        game.state.subPlatforms.forEach((sub, index) => {
            const config = GameConfig.multiPlatformConfig;
            const cost = Math.max(
                config.maintenanceMinCost,
                Math.floor(sub.fans * config.maintenanceCostPerFan)
            );
            desc += `${index + 1}. ${sub.platform.icon} ${sub.platform.name}：${sub.fans.toLocaleString()}粉丝，月维护¥${cost.toLocaleString()}\n`;
        });
        
        document.getElementById('event-description').textContent = desc;
        
        const optionsContainer = document.getElementById('event-options');
        optionsContainer.innerHTML = '';
        
        game.state.subPlatforms.forEach(sub => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.style.background = '#fff5f5';
            btn.style.borderColor = '#ff4757';
            btn.style.color = '#ff4757';
            btn.textContent = `关闭 ${sub.platform.icon} ${sub.platform.name} 账号`;
            
            btn.addEventListener('click', () => {
                if (confirm(`确定要关闭${sub.platform.name}的账号吗？\n将失去该平台的${sub.fans.toLocaleString()}粉丝`)) {
                    const result = game.closeSubPlatform(sub.platformId);
                    if (result.success) {
                        this.closeEventModal();
                        this.updateUI();
                        this.updateLog();
                        alert(`已关闭${result.platform.name}账号`);
                    }
                }
            });
            
            optionsContainer.appendChild(btn);
        });
        
        // 返回按钮
        const backBtn = document.createElement('button');
        backBtn.className = 'option-btn';
        backBtn.textContent = '返回';
        backBtn.addEventListener('click', () => this.closeEventModal());
        optionsContainer.appendChild(backBtn);
        
        modal.classList.add('active');
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
                ui.closeIntroModal(); // 加载存档时关闭欢迎弹窗
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
