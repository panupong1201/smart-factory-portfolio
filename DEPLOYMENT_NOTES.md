# Smart Factory Portfolio Deployment Notes

เอกสารนี้เป็นโน้ตสั้นสำหรับ workflow production ปัจจุบันของโปรเจกต์นี้ เพื่อใช้อ้างอิงซ้ำได้เร็วกว่าเอกสาร deploy แบบ Docker เดิม

## Production Target

- Windows VPS: `119.59.114.118`
- Domain: `ton-logic.com`
- Proxy stack: Cloudflare -> Nginx -> Next.js on port `3000`
- App path on VPS: `C:\Users\Administrator\Desktop\deploy-node\package`
- PM2 app name: `smart-factory-portfolio`

## Critical Safety Rules

- ห้ามลบ `storage/` เด็ดขาด เพราะเก็บ visits, logs และ analytics JSON
- ต้องปกป้องข้อมูล analytics และ industrial-zone data ก่อนทุกครั้งที่ deploy
- ใช้ `.env.local` เป็นไฟล์ environment หลักบนเครื่อง deploy
- หลังแก้ process หรือ restart ผ่าน PM2 ต้องรัน `pm2 save`

## Current Update Workflow

รันที่เครื่อง VPS ใน path นี้:

```powershell
cd C:\Users\Administrator\Desktop\deploy-node\package
```

อัปเดตโค้ดจาก Git:

```powershell
git fetch --all
git reset --hard origin/main
git clean -fd -e storage/
```

หมายเหตุ:

- `git reset --hard origin/main` ใช้ให้ working tree ตรงกับ branch หลัก
- `git clean -fd -e storage/` ใช้ลบไฟล์ untracked แต่ยกเว้น `storage/`

## Environment And Database

- Environment file: `.env.local`
- Database stack: Prisma 7 + `prisma.config.ts`
- Production database reference: portable PostgreSQL 13
- ตัวแปรสำคัญที่ต้องถูกต้องก่อน deploy คือ `DATABASE_URL` และ app version

## Typical Deploy Sequence

```powershell
cd C:\Users\Administrator\Desktop\deploy-node\package
git fetch --all
git reset --hard origin/main
git clean -fd -e storage/
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart smart-factory-portfolio
pm2 save
```

ถ้ายังไม่มี process ใน PM2:

```powershell
pm2 start .next/standalone/server.js --name smart-factory-portfolio
pm2 save
```

## Post-Deploy Checks

- ตรวจว่า PM2 process ขึ้นปกติ
- ตรวจว่า Nginx forward ไป port `3000` ได้
- เปิดเว็บผ่าน domain จริงและเช็กหน้า home + project detail
- เช็กว่า analytics ยังบันทึกข้อมูลได้ตามปกติ
- ยืนยันว่า `storage/` ยังอยู่ครบ

## Operational Notes

- ถ้ามีไฟล์ build/generated จำนวนมากใน `deploy-node/package/.next/` ให้ระวังว่าอาจเป็น artifact จากการ build ไม่ใช่ source change
- เอกสาร [docs/deploy-guide.md](docs/deploy-guide.md) ยังอธิบาย workflow แบบ Docker package เดิมอยู่ จึงไม่ใช่ source of truth สำหรับ production ปัจจุบัน
- สำหรับคำสั่งประเภท Deploy หรือ Update code ให้ยึด workflow ในไฟล์นี้เป็นค่าเริ่มต้น