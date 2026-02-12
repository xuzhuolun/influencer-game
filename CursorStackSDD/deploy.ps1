# Require UTF-8 for Chinese (save this file as UTF-8 with BOM if you see parse errors)
# CursorStackSDD 一键部署脚本
# 
# 使用方法:
#   1. 把 CursorStackSDD 文件夹复制到你的项目根目录
#   2. 在项目根目录运行: .\CursorStackSDD\deploy.ps1
#   3. 脚本会自动部署到项目根目录（CursorStackSDD 的父目录）
#
# 或指定目标路径: .\deploy.ps1 -TargetPath "C:\other-project"

param(
    [string]$TargetPath,
    [string]$ScriptDir
)

if (-not $ScriptDir) {
    $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}

# 如果没有指定目标路径，默认部署到脚本所在目录的父目录（项目根目录）
if (-not $TargetPath) {
    $TargetPath = Split-Path -Parent $ScriptDir
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CursorStackSDD 部署脚本 v1.0" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "源目录: $ScriptDir" -ForegroundColor DarkGray
Write-Host "目标目录: $TargetPath" -ForegroundColor DarkGray
Write-Host ""

# 检查目标路径
if (-not (Test-Path $TargetPath)) {
    Write-Host "[!] 目标路径不存在，正在创建: $TargetPath" -ForegroundColor Yellow
    New-Item -ItemType Directory -Force -Path $TargetPath | Out-Null
}

# 项目相关的规则文件（部署时排除）
$ExcludeRules = @(
    "L1-ue5-*.mdc",
    "L2-ue5-*.mdc",
    "L2-gamekit-*.mdc",
    "TXUE-rules.mdc"
)

# 项目相关的 specs 示例（部署时排除）
$ExcludeSpecs = @(
    "feat-001-sdd-commands"
)

Write-Host "[1/5] 复制 .cursor/ 目录（排除项目相关规则）..." -ForegroundColor Green

# 先复制整个 .cursor 目录
Copy-Item -Recurse -Force "$ScriptDir\.cursor" "$TargetPath\"

# 然后删除项目相关的规则文件
$RulesPath = "$TargetPath\.cursor\rules"
foreach ($pattern in $ExcludeRules) {
    $filesToRemove = Get-ChildItem -Path $RulesPath -Filter $pattern -ErrorAction SilentlyContinue
    foreach ($file in $filesToRemove) {
        Remove-Item -Force $file.FullName
        Write-Host "    [排除] $($file.Name)" -ForegroundColor DarkGray
    }
}

Write-Host "[2/5] 复制 .sdd/ 目录..." -ForegroundColor Green
Copy-Item -Recurse -Force "$ScriptDir\.sdd" "$TargetPath\"

Write-Host "[3/5] 复制 specs/ 目录（排除项目示例）..." -ForegroundColor Green
Copy-Item -Recurse -Force "$ScriptDir\specs" "$TargetPath\"

# 删除项目相关的 specs 示例
$SpecsActivePath = "$TargetPath\specs\active"
foreach ($folder in $ExcludeSpecs) {
    $folderPath = Join-Path $SpecsActivePath $folder
    if (Test-Path $folderPath) {
        Remove-Item -Recurse -Force $folderPath
        Write-Host "    [排除] specs/active/$folder" -ForegroundColor DarkGray
    }
}

Write-Host "[4/5] 复制 badcase.md..." -ForegroundColor Green
Copy-Item -Force "$ScriptDir\badcase.md" "$TargetPath\"

Write-Host "[5/5] 确保 specs 子目录存在..." -ForegroundColor Green
$specsDirs = @("active", "completed", "backlog")
foreach ($dir in $specsDirs) {
    $dirPath = Join-Path "$TargetPath\specs" $dir
    if (-not (Test-Path $dirPath)) {
        New-Item -ItemType Directory -Force -Path $dirPath | Out-Null
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  部署完成！" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "已部署到: $TargetPath" -ForegroundColor White
Write-Host ""
Write-Host "已排除的项目相关文件:" -ForegroundColor DarkGray
Write-Host "  - L1-ue5-*.mdc (UE5 引擎规范)" -ForegroundColor DarkGray
Write-Host "  - L2-ue5-*.mdc (UE5 技术约束)" -ForegroundColor DarkGray
Write-Host "  - L2-gamekit-*.mdc (GameKit 框架约束)" -ForegroundColor DarkGray
Write-Host "  - TXUE-rules.mdc (TXUE 项目规则)" -ForegroundColor DarkGray
Write-Host "  - specs/active/feat-001-sdd-commands/ (示例功能)" -ForegroundColor DarkGray
Write-Host ""
Write-Host "下一步:" -ForegroundColor Yellow
Write-Host "  1. 在 Cursor 中打开项目: $TargetPath"
Write-Host "  2. 参考 CursorStackSDD 中的 UE5/GameKit 规则，创建你自己的 L1/L2 规则"
Write-Host "  3. 输入 /brief your-feature 开始第一个功能"
Write-Host "  4. (可选) 部署完成后可删除 CursorStackSDD 文件夹"
Write-Host ""
