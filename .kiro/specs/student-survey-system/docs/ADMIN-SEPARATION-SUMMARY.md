# Tóm tắt: Tách Admin ra Domain Riêng

## 🎯 Tổng quan

Tách hệ thống hiện tại thành 2 ứng dụng:

| App | Domain | Mục đích | Users |
|-----|--------|----------|-------|
| **Survey App** | `survey.hcmue.edu.vn` | Khảo sát sinh viên | Sinh viên |
| **Admin App** | `admin.hcmue.edu.vn` | Quản trị & báo cáo | Giáo viên/Admin |

## 📊 So sánh

### Hiện tại (Monolith)
```
survey.hcmue.edu.vn
├── /                    # Home
├── /individual          # Khảo sát cá nhân
├── /group              # Khảo sát nhóm
└── /admin              # Admin panel ⚠️
    ├── /admin          # Dashboard
    └── /admin/surveys  # Survey list
```

### Sau khi tách (Microservices)
```
survey.hcmue.edu.vn          admin.hcmue.edu.vn
├── /                        ├── /              # Dashboard
├── /individual              ├── /surveys       # Survey list
├── /group                   ├── /login         # Login
└── /api/surveys             └── /api/admin     # Admin APIs
```

## 📁 Files cần Di chuyển

### Pages (3 files)
- `app/admin/page.tsx` → Admin Dashboard
- `app/admin/surveys/page.tsx` → Survey List

### Components (4 files)
- `components/admin/admin-stats.tsx`
- `components/admin/survey-list.tsx`
- `components/admin/survey-detail.tsx`
- `components/admin/export-data.tsx`

### API Routes (5 files)
- `app/api/admin/stats/route.ts`
- `app/api/admin/surveys/route.ts`
- `app/api/admin/surveys/[id]/route.ts`
- `app/api/admin/export/csv/route.ts`
- `app/api/admin/export/json/route.ts`

## 🚀 Quick Start

### Cách 1: Tự động (Khuyến nghị)

```bash
# Chạy script tự động
chmod +x scripts/split-admin.sh
./scripts/split-admin.sh

# Setup admin app
cd admin-app
npm install
cp .env.local.example .env.local
# Cập nhật .env.local
npm run dev
```

### Cách 2: Thủ công

Xem chi tiết trong `.kiro/specs/student-survey-system/docs/SPLIT-ADMIN-GUIDE.md`

## ⏱️ Timeline

| Phase | Tasks | Time |
|-------|-------|------|
| **1. Preparation** | Backup, document, setup | 1-2 days |
| **2. Code Split** | Move files, update imports | 2-3 days |
| **3. Authentication** | Implement login, middleware | 1-2 days |
| **4. Testing** | Unit, integration, E2E tests | 2-3 days |
| **5. Deployment** | Deploy both apps, DNS | 1 day |
| **6. Monitoring** | Monitor, fix bugs | Ongoing |

**Total**: 1-2 tuần

## 🔐 Security Improvements

### Survey App
- ✅ Không có admin routes
- ✅ Giảm attack surface
- ✅ Rate limiting cho forms
- ✅ CAPTCHA (optional)

### Admin App
- ✅ Authentication required
- ✅ IP whitelist (optional)
- ✅ Audit logging
- ✅ Session management
- ✅ CSRF protection
- ✅ Rate limiting

## 💰 Chi phí

### Infrastructure
- **Survey App**: 1 server/instance
- **Admin App**: 1 server/instance (có thể nhỏ hơn)
- **Database**: Shared MongoDB (không tăng chi phí)
- **Storage**: Shared R2 (không tăng chi phí)

### Development
- **Initial**: 1-2 tuần development
- **Maintenance**: Tương tự như hiện tại

## ✅ Lợi ích

### Ngắn hạn
1. **Security**: Tách biệt quyền truy cập
2. **Performance**: Optimize riêng cho từng use case
3. **Deployment**: Deploy độc lập, ít downtime

### Dài hạn
1. **Scalability**: Scale độc lập theo nhu cầu
2. **Maintenance**: Code base rõ ràng hơn
3. **Team**: Nhiều người làm việc song song
4. **Monitoring**: Dễ track issues

## 📚 Tài liệu

### Chi tiết
- **docs/SPLIT-ADMIN-GUIDE.md** - Hướng dẫn đầy đủ từng bước
- **docs/ADMIN-SPLIT-CHECKLIST.md** - Checklist nhanh

### Requirements
- **requirements/04-admin/** - Requirements admin
- **requirements/02-individual-survey/** - Requirements survey cá nhân
- **requirements/03-group-survey/** - Requirements survey nhóm

### Scripts
- **scripts/split-admin.sh** - Script tự động tách code

## ⚠️ Lưu ý Quan trọng

1. **Backup Database** trước khi bắt đầu
2. **Test kỹ** trên local trước khi deploy
3. **Implement Authentication** cho admin app
4. **Update DNS** sau khi deploy
5. **Monitor logs** trong vài ngày đầu
6. **Có rollback plan** nếu có vấn đề

## 🆘 Support

Nếu gặp vấn đề:
1. Check `.kiro/specs/student-survey-system/docs/SPLIT-ADMIN-GUIDE.md`
2. Review `.kiro/specs/student-survey-system/docs/ADMIN-SPLIT-CHECKLIST.md`
3. Check requirements trong `.kiro/specs/student-survey-system/requirements/04-admin/`
4. Review code hiện tại trong `app/admin/`

## 🎯 Next Steps

1. **Review** tài liệu này và SPLIT-ADMIN-GUIDE.md
2. **Backup** database và code
3. **Run** script `./scripts/split-admin.sh`
4. **Test** admin app locally
5. **Implement** authentication
6. **Deploy** to staging
7. **Test** thoroughly
8. **Deploy** to production

---

**Recommended**: Bắt đầu với staging environment trước khi deploy production.

**Priority**: High (for security and scalability)

**Complexity**: Medium

**Risk**: Low (nếu test kỹ)
