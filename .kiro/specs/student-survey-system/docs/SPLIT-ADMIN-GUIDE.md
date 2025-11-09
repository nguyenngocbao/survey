# Hướng dẫn Tách Admin ra Domain Riêng

## 🎯 Mục tiêu

Tách hệ thống thành 2 ứng dụng độc lập:
- **Domain 1**: `survey.hcmue.edu.vn` - Khảo sát sinh viên
- **Domain 2**: `admin.hcmue.edu.vn` - Quản trị

## 📋 Lợi ích

### Security
- ✅ Tách biệt quyền truy cập
- ✅ Dễ implement authentication riêng
- ✅ Giảm attack surface
- ✅ Có thể whitelist IP cho admin

### Performance
- ✅ Optimize riêng cho từng use case
- ✅ Cache strategy khác nhau
- ✅ Scale độc lập

### Deployment
- ✅ Deploy độc lập
- ✅ Update admin không ảnh hưởng survey
- ✅ Rollback dễ dàng

### Maintenance
- ✅ Code base rõ ràng hơn
- ✅ Team có thể làm việc song song
- ✅ Testing dễ dàng hơn

## 🏗️ Kiến trúc Mới

```
┌─────────────────────────────────────────┐
│         survey.hcmue.edu.vn             │
│  (Student Survey Application)           │
├─────────────────────────────────────────┤
│  - Home page                            │
│  - Individual Survey (4 forms)          │
│  - Group Survey (4 forms)               │
│  - Public APIs                          │
└─────────────────────────────────────────┘
                    │
                    │ API Calls
                    ↓
┌─────────────────────────────────────────┐
│         Shared Database                 │
│         (MongoDB)                       │
└─────────────────────────────────────────┘
                    ↑
                    │ API Calls
                    │
┌─────────────────────────────────────────┐
│         admin.hcmue.edu.vn              │
│  (Admin Panel Application)              │
├─────────────────────────────────────────┤
│  - Dashboard                            │
│  - Survey List                          │
│  - Survey Details                       │
│  - Export Data                          │
│  - Admin APIs                           │
└─────────────────────────────────────────┘
```

## 📁 Cấu trúc Thư mục Mới

### Survey App (survey.hcmue.edu.vn)
```
survey-app/
├── app/
│   ├── page.tsx                    # Home - chọn loại khảo sát
│   ├── individual/
│   │   └── page.tsx                # Individual survey
│   ├── group/
│   │   └── page.tsx                # Group survey
│   ├── api/
│   │   ├── surveys/                # Individual survey APIs
│   │   ├── group-surveys/          # Group survey APIs
│   │   └── upload/                 # Image upload API
│   └── layout.tsx
├── components/
│   ├── forms/                      # Individual forms
│   ├── group/                      # Group forms
│   ├── ui/                         # Shared UI components
│   └── hcmue-background.tsx
├── lib/
│   ├── mongodb.ts
│   ├── r2-config.ts
│   └── upload-utils.ts
└── package.json
```

### Admin App (admin.hcmue.edu.vn)
```
admin-app/
├── app/
│   ├── page.tsx                    # Dashboard
│   ├── surveys/
│   │   └── page.tsx                # Survey list detail
│   ├── api/
│   │   └── admin/                  # Admin APIs
│   │       ├── stats/
│   │       ├── surveys/
│   │       └── export/
│   ├── login/
│   │   └── page.tsx                # Admin login
│   └── layout.tsx
├── components/
│   ├── admin/                      # Admin components
│   │   ├── admin-stats.tsx
│   │   ├── survey-list.tsx
│   │   ├── survey-detail.tsx
│   │   └── export-data.tsx
│   ├── ui/                         # Shared UI components
│   ├── hcmue-background.tsx
│   └── auth/                       # Auth components
├── lib/
│   ├── mongodb.ts                  # Shared DB connection
│   ├── auth.ts                     # Authentication
│   └── permissions.ts              # Authorization
├── middleware.ts                   # Auth middleware
└── package.json
```

## 🔧 Các Bước Thực hiện

### Bước 1: Tạo Admin App Mới

```bash
# Tạo thư mục mới
mkdir admin-app
cd admin-app

# Copy package.json và cài đặt
cp ../package.json .
npm install

# Copy shared dependencies
cp -r ../lib .
cp -r ../components/ui .
```

### Bước 2: Di chuyển Admin Code

```bash
# Copy admin pages
mkdir -p app
cp -r ../app/admin/* app/

# Copy admin components
mkdir -p components/admin
cp -r ../components/admin/* components/admin/

# Copy admin API routes
mkdir -p app/api/admin
cp -r ../app/api/admin/* app/api/admin/
```

### Bước 3: Cập nhật Survey App

Xóa admin code khỏi survey app:

```bash
# Trong survey app
rm -rf app/admin
rm -rf app/api/admin
rm -rf components/admin
```

### Bước 4: Cập nhật Environment Variables

**Survey App (.env.local)**
```bash
# MongoDB
MONGODB_URI=mongodb://localhost:27017/student-survey

# Cloudflare R2
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET_NAME=survey-student
R2_PUBLIC_URL=https://xxx.r2.dev

# App Config
NEXT_PUBLIC_APP_URL=https://survey.hcmue.edu.vn
NEXT_PUBLIC_ADMIN_URL=https://admin.hcmue.edu.vn
```

**Admin App (.env.local)**
```bash
# MongoDB (same database)
MONGODB_URI=mongodb://localhost:27017/student-survey

# Auth
NEXTAUTH_URL=https://admin.hcmue.edu.vn
NEXTAUTH_SECRET=your-secret-key-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=hashed-password

# App Config
NEXT_PUBLIC_APP_URL=https://admin.hcmue.edu.vn
NEXT_PUBLIC_SURVEY_URL=https://survey.hcmue.edu.vn

# Optional: IP Whitelist
ALLOWED_IPS=192.168.1.0/24,10.0.0.0/8
```

### Bước 5: Implement Authentication (Admin App)

Tạo file `admin-app/middleware.ts`:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const token = request.cookies.get('admin-token')
  
  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Optional: IP whitelist
  const clientIP = request.ip || request.headers.get('x-forwarded-for')
  const allowedIPs = process.env.ALLOWED_IPS?.split(',') || []
  
  if (allowedIPs.length > 0 && !isIPAllowed(clientIP, allowedIPs)) {
    return new NextResponse('Forbidden', { status: 403 })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)'],
}
```

### Bước 6: Update Navigation Links

**Survey App** - Xóa links đến admin:
```typescript
// Xóa hoặc comment out
// <a href="/admin">Admin Panel</a>
```

**Admin App** - Thêm link về survey:
```typescript
<a href={process.env.NEXT_PUBLIC_SURVEY_URL}>
  ← Về trang khảo sát
</a>
```

### Bước 7: Update API Calls

Nếu cần gọi API cross-domain, cấu hình CORS:

**Survey App API** (`app/api/*/route.ts`):
```typescript
export async function GET(request: Request) {
  const response = NextResponse.json(data)
  
  // Allow admin domain
  response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_ADMIN_URL!)
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  
  return response
}
```

## 🚀 Deployment

### Survey App
```bash
# Vercel
vercel --prod

# Hoặc Docker
docker build -t survey-app .
docker run -p 3000:3000 survey-app
```

### Admin App
```bash
# Vercel
vercel --prod

# Hoặc Docker
docker build -t admin-app .
docker run -p 3001:3000 admin-app
```

### DNS Configuration
```
survey.hcmue.edu.vn  →  Survey App IP/Domain
admin.hcmue.edu.vn   →  Admin App IP/Domain
```

## 🔒 Security Checklist

### Admin App
- [ ] Implement authentication (NextAuth.js)
- [ ] Add IP whitelist (optional)
- [ ] Enable rate limiting
- [ ] Add CSRF protection
- [ ] Implement session management
- [ ] Add audit logging
- [ ] Use HTTPS only
- [ ] Set secure headers

### Survey App
- [ ] Rate limit form submissions
- [ ] Validate all inputs
- [ ] Sanitize file uploads
- [ ] Add CAPTCHA (optional)
- [ ] Monitor for abuse

## 📊 Shared Resources

### Database
- Cùng MongoDB instance
- Cùng collections
- Khác connection pools

### File Storage
- Cùng Cloudflare R2 bucket
- Khác access patterns
- Admin: read-only
- Survey: read-write

## 🧪 Testing

### Survey App
```bash
npm run test
npm run test:e2e
```

### Admin App
```bash
npm run test
npm run test:auth
npm run test:export
```

## 📝 Documentation Updates

Cập nhật các file sau:

1. **README.md** - Thêm thông tin về 2 apps
2. **DEPLOYMENT.md** - Hướng dẫn deploy riêng
3. **API.md** - Document API endpoints cho cả 2 apps
4. **AUTH.md** - Hướng dẫn authentication cho admin

## 🔄 Migration Plan

### Phase 1: Preparation (1-2 days)
- [ ] Backup database
- [ ] Document current setup
- [ ] Create admin-app structure
- [ ] Setup development environment

### Phase 2: Code Split (2-3 days)
- [ ] Move admin code
- [ ] Update imports
- [ ] Test locally
- [ ] Fix bugs

### Phase 3: Authentication (1-2 days)
- [ ] Implement login
- [ ] Add middleware
- [ ] Test auth flow

### Phase 4: Testing (2-3 days)
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Security audit

### Phase 5: Deployment (1 day)
- [ ] Deploy survey app
- [ ] Deploy admin app
- [ ] Configure DNS
- [ ] Monitor

### Phase 6: Monitoring (Ongoing)
- [ ] Check logs
- [ ] Monitor performance
- [ ] User feedback
- [ ] Bug fixes

## 💡 Tips

1. **Shared Components**: Tạo npm package cho shared UI components
2. **Monorepo**: Consider using Turborepo hoặc Nx
3. **API Gateway**: Consider thêm API gateway layer
4. **Caching**: Implement Redis cho admin stats
5. **Monitoring**: Setup logging và monitoring riêng

## 📞 Support

Nếu cần hỗ trợ:
1. Xem file này
2. Check requirements trong `requirements/04-admin/`
3. Review code trong `app/admin/` và `components/admin/`

---

**Estimated Time**: 1-2 tuần
**Complexity**: Medium
**Priority**: High (for security)
