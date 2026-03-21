# Smart Factory Portfolio — Deployment Guide

## สิ่งที่ต้องมีบนเครื่องเป้าหมาย
- Docker Desktop (Windows) หรือ Docker Engine (Linux)
- Docker Compose v2+

---

## โครงสร้างโฟลเดอร์ Deploy

```
deploy/
├── docker-compose.yml      # กำหนด container service
├── load-images.bat          # โหลด .tar เข้า Docker
├── start.bat                # เปิด container
├── stop.bat                 # ปิด container
├── smart-factory-portfolio.tar   # Docker image (ต้อง copy มาเอง)
├── .env.local               # ค่า environment (ต้องสร้างเอง)
└── storage/                 # โฟลเดอร์เก็บข้อมูล visits.json
```

---

## ขั้นตอนการ Deploy

### 1. Build Docker Image (บนเครื่อง Dev)

```bash
# อยู่ที่ root ของโปรเจค
docker build -t smart-factory-portfolio:latest .
```

### 2. Export เป็น .tar

```bash
docker save -o deploy/smart-factory-portfolio.tar smart-factory-portfolio:latest
```

### 3. สร้างไฟล์ .env.local ในโฟลเดอร์ deploy/

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=your-email@gmail.com
```

### 4. Copy โฟลเดอร์ deploy/ ไปยังเครื่องเป้าหมาย

- ใช้ USB, SCP, หรือ File Share
- ตัวอย่าง SCP:
```bash
scp -r deploy/ root@119.59.114.118:/opt/portfolio/
```

### 5. บนเครื่องเป้าหมาย — รันตามลำดับ

```
1. ดับเบิลคลิก load-images.bat    → โหลด image เข้า Docker
2. ดับเบิลคลิก start.bat          → เริ่ม container
3. เปิดเบราว์เซอร์ → http://localhost:3000
```

### 6. หยุด Container

```
ดับเบิลคลิก stop.bat
```

---

## คำสั่ง Manual (ถ้าไม่ใช้ .bat)

```bash
# โหลด image
docker load -i smart-factory-portfolio.tar

# เริ่ม container
docker compose up -d

# ดูสถานะ
docker ps

# ดู logs
docker logs smart-factory-portfolio

# หยุด container
docker compose down
```

---

## อัพเดทเวอร์ชันใหม่

```bash
# 1. บนเครื่อง Dev — build ใหม่
docker build -t smart-factory-portfolio:latest .

# 2. Export .tar ใหม่
docker save -o deploy/smart-factory-portfolio.tar smart-factory-portfolio:latest

# 3. Copy ไปเครื่องเป้าหมาย แล้วรัน:
docker compose down
docker load -i smart-factory-portfolio.tar
docker compose up -d
```

---

## Copilot Quick Command

ถ้าจะสั่ง Copilot สร้าง deployment package ใหม่ ใช้คำสั่งนี้:

> **"สร้าง Docker deployment package — build image, export .tar, สร้าง batch scripts (load-images, start, stop) ไว้ในโฟลเดอร์ deploy/"**

---

## Port & Network

| Service | Port | URL |
|---------|------|-----|
| Portfolio | 3000 | http://localhost:3000 |

## Troubleshooting

| ปัญหา | วิธีแก้ |
|--------|---------|
| `docker: command not found` | ติดตั้ง Docker Desktop |
| Container ไม่ขึ้น | ดู logs: `docker logs smart-factory-portfolio` |
| Port 3000 ถูกใช้แล้ว | เปลี่ยน port ใน docker-compose.yml: `"3001:3000"` |
| ภาพไม่แสดง | เช็ค public/ folder ถูก copy ครบ |
