// 存档系统
class StorageManager {
    constructor() {
        this.SAVE_KEY = 'influencer_game_save';
    }

    // 保存游戏
    saveGame(gameState) {
        try {
            const saveData = {
                version: '1.0',
                timestamp: Date.now(),
                data: gameState
            };
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
            return true;
        } catch (e) {
            console.error('保存失败:', e);
            return false;
        }
    }

    // 加载游戏
    loadGame() {
        try {
            const saveData = localStorage.getItem(this.SAVE_KEY);
            if (!saveData) return null;
            
            const parsed = JSON.parse(saveData);
            return parsed.data;
        } catch (e) {
            console.error('加载失败:', e);
            return null;
        }
    }

    // 检查是否有存档
    hasSave() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    }

    // 删除存档
    deleteSave() {
        localStorage.removeItem(this.SAVE_KEY);
    }

    // 获取存档时间
    getSaveTime() {
        try {
            const saveData = localStorage.getItem(this.SAVE_KEY);
            if (!saveData) return null;
            
            const parsed = JSON.parse(saveData);
            return new Date(parsed.timestamp);
        } catch (e) {
            return null;
        }
    }
}

// 全局存档管理器
const storage = new StorageManager();
