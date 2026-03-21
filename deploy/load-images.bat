@echo off
echo ============================================
echo   Loading Docker Images...
echo ============================================
echo.

echo [1/1] Loading smart-factory-portfolio...
docker load -i smart-factory-portfolio.tar
echo.

echo ============================================
echo   All images loaded successfully!
echo ============================================
echo.
docker images | findstr "smart-factory-portfolio"
echo.
pause
