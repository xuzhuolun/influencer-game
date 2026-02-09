@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ====================================
echo 网红模拟经营 - 推送更新到 Git
echo ====================================
echo.

if not exist .git (
    echo 错误：当前目录不是 Git 仓库，请先运行 git-push.bat 完成首次初始化
    pause
    exit /b 1
)

echo [1/3] 添加所有修改...
git add .
if errorlevel 1 (
    echo 错误：git add 失败，请确保已安装 Git 并已加入系统 PATH
    pause
    exit /b 1
)

echo.
echo [2/3] 提交（本次更新说明见下方）...
git commit -m "更新：平台引导、擦边专属事件、心态炸了结局、月度总结与选择结果优化"
if errorlevel 1 (
    echo 未检测到变更或提交失败
    echo 若没有变更可忽略；若有变更请检查 Git 配置
)

echo.
echo [3/3] 推送到远程...
git push
if errorlevel 1 (
    echo.
    echo 推送失败。若尚未设置远程，请先运行 git-push.bat 或执行：
    echo   git remote add origin 你的仓库地址
    echo   git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================
echo 推送完成！
echo ====================================
pause
