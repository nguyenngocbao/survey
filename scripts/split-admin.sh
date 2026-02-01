#!/bin/bash

# Script tự động tách Admin ra app riêng
# Usage: ./scripts/split-admin.sh

set -e

echo "🚀 Bắt đầu tách Admin App..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kiểm tra thư mục hiện tại
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Lỗi: Phải chạy script từ thư mục root của project${NC}"
    exit 1
fi

# Tạo thư mục admin-app
echo -e "${YELLOW}📁 Tạo thư mục admin-app...${NC}"
mkdir -p admin-app

# Copy package.json
echo -e "${YELLOW}📦 Copy package.json...${NC}"
cp package.json admin-app/
cp package-lock.json admin-app/ 2>/dev/null || true
cp tsconfig.json admin-app/
cp next.config.js admin-app/ 2>/dev/null || cp next.config.mjs admin-app/ 2>/dev/null || true
cp tailwind.config.ts admin-app/ 2>/dev/null || cp tailwind.config.js admin-app/ 2>/dev/null || true
cp postcss.config.js admin-app/ 2>/dev/null || true

# Tạo cấu trúc thư mục
echo -e "${YELLOW}📂 Tạo cấu trúc thư mục...${NC}"
mkdir -p admin-app/app
mkdir -p admin-app/components
mkdir -p admin-app/lib
mkdir -p admin-app/public

# Copy admin pages
echo -e "${YELLOW}📄 Copy admin pages...${NC}"
if [ -d "app/admin" ]; then
    cp -r app/admin/* admin-app/app/
    echo -e "${GREEN}✅ Copied admin pages${NC}"
else
    echo -e "${RED}⚠️  Không tìm thấy app/admin${NC}"
fi

# Copy admin components
echo -e "${YELLOW}🎨 Copy admin components...${NC}"
if [ -d "components/admin" ]; then
    mkdir -p admin-app/components/admin
    cp -r components/admin/* admin-app/components/admin/
    echo -e "${GREEN}✅ Copied admin components${NC}"
else
    echo -e "${RED}⚠️  Không tìm thấy components/admin${NC}"
fi

# Copy admin API routes
echo -e "${YELLOW}🔌 Copy admin API routes...${NC}"
if [ -d "app/api/admin" ]; then
    mkdir -p admin-app/app/api/admin
    cp -r app/api/admin/* admin-app/app/api/admin/
    echo -e "${GREEN}✅ Copied admin API routes${NC}"
else
    echo -e "${RED}⚠️  Không tìm thấy app/api/admin${NC}"
fi

# Copy shared components
echo -e "${YELLOW}🔄 Copy shared components...${NC}"
if [ -d "components/ui" ]; then
    mkdir -p admin-app/components/ui
    cp -r components/ui/* admin-app/components/ui/
fi

if [ -f "components/hcmue-background.tsx" ]; then
    cp components/hcmue-background.tsx admin-app/components/
fi

# Copy lib
echo -e "${YELLOW}📚 Copy lib files...${NC}"
if [ -d "lib" ]; then
    cp -r lib/* admin-app/lib/
fi

# Copy public assets
echo -e "${YELLOW}🖼️  Copy public assets...${NC}"
if [ -d "public" ]; then
    cp -r public/* admin-app/public/
fi

# Copy globals.css
if [ -f "app/globals.css" ]; then
    cp app/globals.css admin-app/app/
fi

# Tạo layout.tsx cho admin
echo -e "${YELLOW}📝 Tạo layout.tsx cho admin...${NC}"
cat > admin-app/app/layout.tsx << 'EOF'
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import type React from "react";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel - Đại học Sư phạm TP.HCM",
  description: "Hệ thống quản trị khảo sát sinh viên",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={nunito.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
EOF

# Tạo .env.local template
echo -e "${YELLOW}⚙️  Tạo .env.local template...${NC}"
cat > admin-app/.env.local.example << 'EOF'
# MongoDB
MONGODB_URI=mongodb://localhost:27017/student-survey

# Authentication
NEXTAUTH_URL=https://admin.hcmue.edu.vn
NEXTAUTH_SECRET=generate-random-secret-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-hashed-password

# App Config
NEXT_PUBLIC_APP_URL=https://admin.hcmue.edu.vn
NEXT_PUBLIC_SURVEY_URL=https://survey.hcmue.edu.vn

# Optional: IP Whitelist
ALLOWED_IPS=192.168.1.0/24
EOF

# Tạo README cho admin app
echo -e "${YELLOW}📖 Tạo README...${NC}"
cat > admin-app/README.md << 'EOF'
# Admin Panel - ĐHSP TP.HCM

Hệ thống quản trị khảo sát sinh viên.

## Setup

```bash
npm install
cp .env.local.example .env.local
# Cập nhật .env.local với thông tin thực
npm run dev
```

## Deploy

```bash
npm run build
npm start
```

## Authentication

Cần implement authentication trước khi deploy production.
Xem: `docs/SPLIT-ADMIN-GUIDE.md`
EOF

echo ""
echo -e "${GREEN}✅ Hoàn thành tách admin app!${NC}"
echo ""
echo -e "${YELLOW}📋 Các bước tiếp theo:${NC}"
echo "1. cd admin-app"
echo "2. npm install"
echo "3. cp .env.local.example .env.local"
echo "4. Cập nhật .env.local"
echo "5. npm run dev"
echo ""
echo -e "${YELLOW}📚 Xem thêm:${NC}"
echo "- .kiro/specs/student-survey-system/docs/SPLIT-ADMIN-GUIDE.md"
echo "- .kiro/specs/student-survey-system/docs/ADMIN-SPLIT-CHECKLIST.md"
echo ""
echo -e "${RED}⚠️  Lưu ý:${NC}"
echo "- Cần implement authentication cho admin app"
echo "- Test kỹ trước khi deploy"
echo "- Backup database trước khi deploy"
