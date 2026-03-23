@echo off
set VPS_IP=119.59.114.118

echo ============================================
echo   Starting Smart Factory Portfolio...
echo ============================================
echo.

docker compose up -d

echo.
echo ============================================
echo   Portfolio is running!
echo   Access: http://%VPS_IP%:3000
echo ============================================
echo.
docker ps --filter "name=smart-factory-portfolio"
echo.
pause
