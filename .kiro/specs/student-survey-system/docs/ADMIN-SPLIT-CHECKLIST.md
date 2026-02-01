# Checklist Tách Admin - Quick Reference

## 📦 Files cần Di chuyển

### Từ Survey App → Admin App

#### Pages
- [ ] `app/admin/page.tsx` → `admin-app/app/page.tsx`
- [ ] `app/admin/surveys/page.tsx` → `admin-app/app/surveys/page.tsx`

#### Components
- [ ] `components/admin/admin-stats.tsx`
- [ ] `components/admin/survey-list.tsx`
- [ ] `components/admin/survey-detail.tsx`
- [ ] `components/admin/export-data.tsx`

#### API Routes
- [ ] `app/api/admin/stats/route.ts`
- [ ] `app/api/admin/surveys/route.ts`
- [ ] `app/api/admin/surveys/[id]/route.ts`
- [ ] `app/api/admin/export/csv/route.ts`
- [ ] `app/api/admin/export/json/route.ts`

#### Shared (Copy to both)
- [ ] `lib/mongodb.ts`
- [ ] `components/ui/*`
- [ ] `components/hcmue-background.tsx`

## 🗑️ Files cần Xóa khỏi Survey App

- [ ] `app/admin/` (toàn bộ thư mục)
- [ ] `app/api/admin/` (toàn bộ thư mục)
- [ ] `components/admin/` (toàn bộ thư mục)

## ⚙️ Configuration

### Survey App
```bash
# .env.local
MONGODB_URI=mongodb://localhost:27017/student-survey
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET_NAME=survey-student
R2_PUBLIC_URL=https://xxx.r2.dev
NEXT_PUBLIC_APP_URL=https://survey.hcmue.edu.vn
NEXT_PUBLIC_ADMIN_URL=https://admin.hcmue.edu.vn
```

### Admin App
```bash
# .env.local
MONGODB_URI=mongodb://localhost:27017/student-survey
NEXTAUTH_URL=https://admin.hcmue.edu.vn
NEXTAUTH_SECRET=generate-random-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=hashed-password
NEXT_PUBLIC_APP_URL=https://admin.hcmue.edu.vn
NEXT_PUBLIC_SURVEY_URL=https://survey.hcmue.edu.vn
```

## 🔐 Security (Admin App Only)

- [ ] Add `middleware.ts` for authentication
- [ ] Create `/login` page
- [ ] Implement NextAuth.js
- [ ] Add IP whitelist (optional)
- [ ] Enable rate limiting
- [ ] Add audit logging

## 🔗 Update Links

### Survey App
- [ ] Xóa link "Admin Panel" từ navigation
- [ ] Xóa link "/admin" từ footer

### Admin App
- [ ] Thêm link về survey app
- [ ] Update breadcrumbs
- [ ] Update navigation

## 🧪 Testing

### Survey App
- [ ] Test home page
- [ ] Test individual survey flow
- [ ] Test group survey flow
- [ ] Test image upload
- [ ] Test form validation

### Admin App
- [ ] Test login
- [ ] Test dashboard stats
- [ ] Test survey list
- [ ] Test survey detail modal
- [ ] Test CSV export
- [ ] Test JSON export
- [ ] Test filters
- [ ] Test on mobile

## 🚀 Deployment

- [ ] Deploy survey app to `survey.hcmue.edu.vn`
- [ ] Deploy admin app to `admin.hcmue.edu.vn`
- [ ] Configure DNS
- [ ] Setup SSL certificates
- [ ] Test both domains
- [ ] Monitor logs

## 📊 Database

- [ ] Verify both apps connect to same MongoDB
- [ ] Test read operations (admin)
- [ ] Test write operations (survey)
- [ ] Backup database before deployment

## ✅ Final Checks

- [ ] Both apps run locally
- [ ] No broken imports
- [ ] No 404 errors
- [ ] Authentication works (admin)
- [ ] Forms submit successfully (survey)
- [ ] Export works (admin)
- [ ] Mobile responsive
- [ ] Cross-browser testing

## 📝 Documentation

- [ ] Update README.md
- [ ] Document deployment process
- [ ] Document authentication
- [ ] Update API documentation

---

**Estimated Time**: 1-2 weeks
**Priority**: High
