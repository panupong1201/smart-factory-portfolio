@echo off
setlocal

set VPS_IP=119.59.114.118

echo ============================================
echo   Smart Factory Portfolio Installer
echo ============================================
echo.

docker version >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Docker is not installed or not running.
  echo Please start Docker Desktop first.
  echo.
  pause
  exit /b 1
)

if not exist ".env.local" (
  if exist ".env.example" (
    copy /Y ".env.example" ".env.local" >nul
    echo [INFO] Created .env.local from .env.example
    echo [INFO] Edit .env.local before using contact email features.
    echo.
  ) else (
    echo [ERROR] Missing .env.local and .env.example
    echo.
    pause
    exit /b 1
  )
)

if not exist "storage" mkdir storage

echo [1/2] Loading Docker image...
docker load -i smart-factory-portfolio.tar
if errorlevel 1 (
  echo [ERROR] Failed to load smart-factory-portfolio.tar
  echo.
  pause
  exit /b 1
)

echo.
echo [2/2] Starting container...
docker compose up -d
if errorlevel 1 (
  echo [ERROR] Failed to start container
  echo.
  pause
  exit /b 1
)

echo.
echo ============================================
echo   Installation completed successfully
echo   URL: http://%VPS_IP%:3000
echo ============================================
echo.
docker ps --filter "name=smart-factory-portfolio"
echo.
pause