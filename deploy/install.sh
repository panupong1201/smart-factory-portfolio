#!/usr/bin/env sh
set -eu

VPS_IP="119.59.114.118"

echo "============================================"
echo "  Smart Factory Portfolio Installer"
echo "============================================"
echo

if ! command -v docker >/dev/null 2>&1; then
  echo "[ERROR] Docker is not installed or not in PATH."
  exit 1
fi

if [ ! -f .env.local ]; then
  if [ -f .env.example ]; then
    cp .env.example .env.local
    echo "[INFO] Created .env.local from .env.example"
    echo "[INFO] Edit .env.local before using contact email features."
    echo
  else
    echo "[ERROR] Missing .env.local and .env.example"
    exit 1
  fi
fi

mkdir -p storage

echo "[1/2] Loading Docker image..."
docker load -i smart-factory-portfolio.tar

echo
echo "[2/2] Starting container..."
docker compose up -d

echo
echo "============================================"
echo "  Installation completed successfully"
echo "  URL: http://${VPS_IP}:3000"
echo "============================================"
echo
docker ps --filter name=smart-factory-portfolio