@echo off
chcp 65001 >nul
echo ====================================
echo 网红模拟经营 - Git 初始化和推送
echo ====================================
echo.

:: 检查是否已初始化
if exist .git (
    echo [1/5] 检测到已有 Git 仓库
) else (
    echo [1/5] 正在初始化 Git 仓库...
    git init
    if errorlevel 1 (
        echo 错误：Git 初始化失败，请确保已安装 Git
        pause
        exit /b 1
    )
)

echo.
echo [2/5] 正在添加所有文件...
git add .

echo.
echo [3/5] 正在创建提交...
git commit -m "初始提交：网红模拟经营游戏"

echo.
echo [4/5] 设置默认分支为 main...
git branch -M main

echo.
echo ====================================
echo 本地准备完成！
echo ====================================
echo.
echo 接下来请执行以下步骤：
echo.
echo 1. 访问 https://github.com/new 创建新仓库
echo 2. 仓库名建议：influencer-game
echo 3. 选择 Public（公开）
echo 4. 不要勾选任何初始化选项
echo 5. 创建后复制仓库地址（格式：https://github.com/用户名/仓库名.git）
echo 6. 在下方输入你的仓库地址后按回车
echo.
set /p REPO_URL="请输入 GitHub 仓库地址: "

if "%REPO_URL%"=="" (
    echo 未输入仓库地址，取消推送
    pause
    exit /b 1
)

echo.
echo [5/5] 正在推送到 GitHub...
git remote add origin %REPO_URL%
git push -u origin main

if errorlevel 1 (
    echo.
    echo ====================================
    echo 推送失败！可能的原因：
    echo ====================================
    echo 1. 仓库地址错误
    echo 2. 没有 GitHub 访问权限
    echo 3. 需要配置 Git 用户信息
    echo.
    echo 如果是第一次使用 Git，请先配置：
    echo git config --global user.name "你的名字"
    echo git config --global user.email "你的邮箱"
    echo.
    echo 然后重新运行此脚本
    pause
    exit /b 1
)

echo.
echo ====================================
echo 推送成功！
echo ====================================
echo.
echo 现在进入 GitHub 仓库设置 Pages：
echo 1. 进入你的仓库页面
echo 2. 点击 Settings → Pages
echo 3. Source 选择 main 分支
echo 4. 保存后等待 1-2 分钟
echo 5. 你的游戏地址：https://你的用户名.github.io/influencer-game/
echo.
pause
