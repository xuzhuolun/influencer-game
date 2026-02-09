@echo off
echo 正在启动本地服务器...
echo.
echo 启动后请访问以下地址：
echo - 本机访问：http://localhost:8080
echo - 局域网访问：http://你的局域网IP:8080
echo.
echo 按 Ctrl+C 停止服务器
echo.
python -m http.server 8080
pause
