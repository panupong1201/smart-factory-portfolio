@echo off
echo ============================================
echo   Starting Smart Factory Portfolio...
echo ============================================
echo.

docker compose up -d

echo.
echo ============================================
echo   Portfolio is running!
echo   Access: http://localhost:3000
echo ============================================
echo.
docker ps --filter "name=smart-factory-portfolio"
echo.
pause
