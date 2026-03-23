# Smart Factory Portfolio - Setup & Deployment Guide

## Development & Production Setup Instructions

This document provides step-by-step instructions for setting up the project locally and deploying to production.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Running the Application](#running-the-application)
5. [Building for Production](#building-for-production)
6. [Deployment to Windows VPS](#deployment-to-windows-vps)
7. [Docker Deployment](#docker-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### System Requirements
- **Node.js**: v18.x or higher ([download](https://nodejs.org/))
- **npm**: v9.x or higher (bundled with Node.js)
- **Git**: v2.0+ ([download](https://git-scm.com/))
- **Operating System**: Windows, macOS, or Linux
- **Internet connection**: Required for npm package installation

### Development Tools (Recommended)
- **VS Code**: Code editor ([download](https://code.visualstudio.com/))
- **VS Code Extensions**:
  - Prettier (code formatting)
  - ESLint (linting)
  - Tailwind CSS IntelliSense
  - Thunder Client or REST Client (API testing)

### For Production Deployment
- **Windows VPS** with:
  - Node.js installed
  - PM2 installed globally (`npm i -g pm2`)
  - SSH access enabled
  - Firewall port 3000 (or reverse proxy) open
- **GitHub Account** (for CI/CD)
- **Gmail Account** (for SMTP email delivery)

---

## Local Development Setup

### 1. Clone Repository

```bash
# HTTPS (recommended for first-time)
git clone https://github.com/panupong1201/smart-factory-portfolio.git
cd smart-factory-portfolio

# OR SSH (if you have SSH key set up)
git clone git@github.com:panupong1201/smart-factory-portfolio.git
cd smart-factory-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

This installs all packages defined in `package.json` to `node_modules/`.

**Expected output:**
```
added 356 packages in 12s
packages: 356
dependencies: 8
dev dependencies: 8
```

### 3. Verify Installation

```bash
npm list
# Or check specific packages:
node --version     # Should be v18+
npm --version      # Should be v9+
npx next --version # Should be 16.1.6+
```

---

## Environment Configuration

### 1. Create `.env.local` File

```bash
# Copy the template
cp .env.example .env.local

# OR create manually
touch .env.local
```

### 2. Fill in Environment Variables

**Edit `.env.local`:**

```bash
# Email (SMTP) Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=panupong.nokaew@gmail.com
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD_HERE
CONTACT_TO_EMAIL=panupong.nokaew@gmail.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Get Gmail App Password

For Gmail with 2FA enabled:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Navigate to **Security** → **App passwords**
3. Select "Mail" and "Windows Computer"
4. Generate password (16 character string)
5. Copy and paste into `SMTP_PASS` in `.env.local`

**Alternative**: Use backup SMTP provider (SendGrid, Mailgun, etc.)

### 4. (Production) Set GitHub Secrets

For GitHub Actions deployment:

1. Go to Repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

| Secret Name | Value |
|------------|-------|
| `HOST` | VPS IP address or domain |
| `USERNAME` | `Administrator` (or VPS username) |
| `PASSWORD` | VPS remote access password |
| `PORT` | SSH port (typically 22 or custom) |

**Example:**
```
HOST: 203.146.255.100
USERNAME: Administrator
PASSWORD: SuperSecurePassword123!
PORT: 22
```

---

## Running the Application

### 1. Start Development Server

```bash
npm run dev
```

**Output:**
```
> smart-factory-portfolio@0.1.0 dev
> next dev

  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

### 2. Open in Browser

Navigate to: **http://localhost:3000**

### 3. Verify Application

- [ ] Homepage loads (Navbar, Hero, etc.)
- [ ] Language toggle works (EN ↔ TH)
- [ ] Project cards visible
- [ ] Contact form opens and works
- [ ] No console errors (open DevTools)

### 4. Test Backend APIs

```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'

# Test analytics summary
curl http://localhost:3000/api/analytics/summary

# Test visitor log
curl http://localhost:3000/api/analytics/logs
```

### 5. Hot Module Reload

Changes to files auto-reload:
- Edit `src/components/Hero.tsx` → Instantly reflects in browser
- Edit `src/data/projects.ts` → Page reloads with new data
- Edit `globals.css` → Styles update immediately

**Continue development workflow:**
```
Edit file → Save → Browser auto-updates → Test → Repeat
```

---

## Building for Production

### 1. Build Optimization

```bash
npm run build
```

**This process:**
- Optimizes React code (React Compiler)
- Bundles JavaScript (code splitting)
- Generates static assets
- Validates TypeScript types
- Creates standalone bundle

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
Route (pages)  Size     First Load JS
─ ○ / (Static) 12.5 kB  42.3 kB
─ ○ /projects/[slug] (Static) 18.2 kB  48.5 kB
✓ Build complete. Outputs:
  - JavaScript optimized & minified
  - Standalone bundle generated (.next/)
```

### 2. Build Output Structure

```
.next/
├── server/          # Server-side code & asset manifests
├── static/          # Client-side JavaScript bundles
└── public/          # Public static assets
```

### 3. Test Production Build Locally

```bash
npm run build
npm start
```

This runs the optimized production version locally on `http://localhost:3000`.

**Verify:**
- Page loads quickly
- All features work
- No unhandled errors in console
- API endpoints respond

### 4. Build Size Analysis

```bash
# Install analyzer (optional)
npm install --save-dev @next/bundle-analyzer

# See in next.config.ts:
# const withBundleAnalyzer = require('@next/bundle-analyzer')({
#   enabled: process.env.ANALYZE === 'true',
# })

# Run analysis:
ANALYZE=true npm run build
```

---

## Deployment to Windows VPS

### Prerequisites for VPS

**On the VPS, run:**

```powershell
# Install Node.js (if not already done)
# Download from https://nodejs.org/ or use:
# choco install nodejs (if chocolatey installed)

# Verify installation
node --version  # v18.x+
npm --version   # v9.x+

# Install PM2 globally
npm install -g pm2

# Verify PM2
pm2 --version
```

### Manual VPS Deployment

If GitHub Actions is not set up:

```powershell
# SSH into VPS
ssh Administrator@203.146.255.100 -p 22

# Navigate to deployment directory (or create it)
cd "C:\Users\Administrator\Desktop\deploy-node\package"

# Clone/update repository
git clone https://github.com/panupong1201/smart-factory-portfolio.git .
# OR if already cloned:
git fetch origin
git reset --hard origin/main

# Install dependencies
npm install

# Create .env.production (or .env.local)
$env:SMTP_HOST = "smtp.gmail.com"
$env:SMTP_PORT = "587"
# ... set other env vars

# Build
npm run build

# Start with PM2
pm2 start npm --name "smart-factory-portfolio" -- start

# Make PM2 auto-restart on reboot
pm2 startup
pm2 save
```

### Automatic Deployment (GitHub Actions)

When you push to the `main` branch:

1. GitHub receives webhook notification
2. Triggers `.github/workflows/deploy.yml`
3. SSH connects to VPS
4. Runs deployment script automatically
5. App reloads on VPS

**Workflow file:**

```yaml
name: Deploy to Windows VPS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT }}
          script_stop: true
          script: |
            cd 'C:\Users\Administrator\Desktop\deploy-node\package'
            git fetch --all
            git reset --hard origin/main
            git clean -fd
            npm install
            pm2 reload smart-factory-portfolio || pm2 start npm --name 'smart-factory-portfolio' -- start
```

### Verify VPS Deployment

```powershell
# SSH into VPS
ssh Administrator@203.146.255.100

# Check PM2 status
pm2 status

# View logs
pm2 logs smart-factory-portfolio

# Check running processes
Get-Process node

# Test API
curl http://localhost:3000/api/analytics/summary

# Test from external machine
curl http://203.146.255.100:3000
# Should return HTML homepage
```

---

## Docker Deployment

### Build Docker Image

```bash
# Build locally
docker build -t smart-factory-portfolio:latest .

# OR using Docker Compose
docker-compose build
```

### Run Docker Container

```bash
# Single container
docker run -p 3000:3000 \
  -e SMTP_HOST=smtp.gmail.com \
  -e SMTP_USER=your-email@gmail.com \
  -e SMTP_PASS=app-password \
  smart-factory-portfolio:latest

# Using Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop container
docker-compose down
```

### Docker Compose File

`docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    container_name: smart-factory-portfolio
    ports:
      - "3000:3000"
    environment:
      SMTP_HOST: smtp.gmail.com
      SMTP_PORT: 587
      SMTP_USER: ${SMTP_USER}
      SMTP_PASS: ${SMTP_PASS}
      CONTACT_TO_EMAIL: ${CONTACT_TO_EMAIL}
    restart: unless-stopped
```

### Deploy Docker to VPS

```bash
# On VPS with Docker installed
git clone <repo>
cd smart-factory-portfolio
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

---

## Environment Variables Reference

### Development (`.env.local`)
```bash
# Required for contact form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=your-email@gmail.com

# Optional for analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Production (GitHub Secrets)
```
HOST: VPS IP or domain
USERNAME: VPS username
PASSWORD: VPS password
PORT: SSH port
```

### VPS `.env.production`
```bash
# Final env file on production server
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=panupong.nokaew@gmail.com
SMTP_PASS=<app-password>
CONTACT_TO_EMAIL=panupong.nokaew@gmail.com
NODE_ENV=production
```

---

## PM2 Process Management

### Common PM2 Commands

```bash
# Start application
pm2 start npm --name "smart-factory-portfolio" -- start

# View status
pm2 status

# View logs
pm2 logs smart-factory-portfolio

# Restart application
pm2 restart smart-factory-portfolio

# Reload (graceful)
pm2 reload smart-factory-portfolio

# Stop application
pm2 stop smart-factory-portfolio

# Delete from PM2 list
pm2 delete smart-factory-portfolio

# Auto-restart on system reboot
pm2 startup
pm2 save

# Monitor CPU/Memory
pm2 monit
```

### PM2 Configuration File

`ecosystem.config.cjs`:

```javascript
module.exports = {
  apps: [
    {
      name: 'smart-factory-portfolio',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production'
      },
      max_memory_restart: '500M'
    }
  ]
}
```

Then start with:
```bash
pm2 start ecosystem.config.cjs
```

---

## Reverse Proxy Setup (Optional)

To serve on port 80/443 instead of 3000:

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name smart-factory-portfolio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### IIS Configuration (Windows)

1. Install IIS with Application Request Routing
2. Create reverse proxy rule to `http://localhost:3000`
3. Point domain to IIS server

---

## SSL/HTTPS Setup

### Using Let's Encrypt (Recommended)

```bash
# On Linux with Certbot
sudo certbot certonly --webroot -w /var/www/html -d smart-factory-portfolio.com

# Copy certificate to Windows VPS and configure IIS/Nginx
```

### Nginx SSL Configuration

```nginx
server {
    listen 443 ssl;
    server_name smart-factory-portfolio.com;
    
    ssl_certificate /path/to/certificate.pem;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name smart-factory-portfolio.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Monitoring & Maintenance

### Health Checks

```bash
# Check if app is running
curl http://localhost:3000

# Check API health
curl http://localhost:3000/api/analytics/summary

# Check database/storage
ls -la storage/visits.json
```

### Logs

```bash
# PM2 logs
pm2 logs smart-factory-portfolio

# Next.js build logs
npm run build 2>&1 | tee build.log

# Docker logs
docker-compose logs -f app
```

### Backup

```bash
# Backup visitor data
cp storage/visits.json storage/visits.backup.$(date +%s).json

# Backup entire app
tar -czf smart-factory-portfolio-backup.tar.gz .

# Upload to secure storage
aws s3 cp smart-factory-portfolio-backup.tar.gz s3://backups/
```

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or use different port
PORT=3001 npm run dev
```

### Email Not Sending

**Check:**
1. `.env.local` has correct SMTP credentials
2. Gmail App Password used (not regular password)
3. SMTP_PORT is 587 (TLS) or 465 (SSL)
4. Firewall allows outbound SMTP

**Test:**
```bash
npm install -g nodemailer-test
nodemailer-test -h smtp.gmail.com -p 587 -u your-email@gmail.com
```

### Build Failing with TypeScript Errors

```bash
# Check types
npx tsc --noEmit

# Fix ESLint issues
npm run lint -- --fix

# Rebuild
npm run build
```

### VPS SSH Connection Failed

```bash
# Test SSH connectivity
ssh -v -p 22 Administrator@203.146.255.100

# Check GitHub secrets are set correctly
# Verify VPS IP/port/credentials
```

### API Routes Not Found

**Check:**
- Files in `src/app/api/**` exist
- Named `route.ts` (exact spelling)
- Exported functions: `export async function POST/GET/etc(req, res)`
- Restarted dev server after adding route

### High Memory Usage

```bash
# Monitor memory
pm2 monit

# Increase PM2 memory limit
pm2 start npm --name app -- start --memory 1G

# Check for memory leaks
node --inspect=0.0.0.0:9229 ...
# Use Chrome DevTools to debug
```

---

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer

# Enable React Compiler (already on in next.config.ts)
# Already configured for minimal bundle size
```

### Runtime Optimization

1. **Enable gzip compression** (reverse proxy)
2. **Use CDN** for static assets
3. **Implement caching** headers for API
4. **Monitor performance** with Web Vitals

### Database Optimization

Current: JSON file-based storage  
For scaling: Consider PostgreSQL/MongoDB

---

## Related Documentation
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Project structure
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API endpoints
- [deploy-guide.md](deploy-guide.md) - Original VPS guide
