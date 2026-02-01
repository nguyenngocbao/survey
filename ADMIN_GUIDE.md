# Hướng dẫn sử dụng Admin Panel

## 🔐 Đăng nhập Admin

### Thông tin đăng nhập mặc định:
- **URL**: `http://localhost:3000/admin/login`
- **Tên đăng nhập**: `admin`
- **Mật khẩu**: `admin123`

### Bảo mật:
- Session tự động hết hạn sau 24 giờ
- Middleware bảo vệ tất cả routes admin
- JWT token được lưu trong HTTP-only cookie

## 📊 Dashboard Admin

### URL: `http://localhost:3000/admin`

### Tính năng chính:

#### 1. **Thống kê tổng quan**
- 4 cards thống kê theo loại khảo sát:
  - 🤖 Khảo sát học sinh về AI
  - 👨‍🏫 Khảo sát giáo viên về AI  
  - 👥 Hoạt động nhóm
  - 👤 Khảo sát cá nhân
- Hiển thị tổng số và số lượng hôm nay
- Card tổng quan toàn hệ thống

#### 2. **Xuất dữ liệu**
- Xuất theo từng loại khảo sát hoặc tất cả
- 2 định dạng: CSV và JSON
- Tự động đặt tên file với ngày tháng
- Hỗ trợ tiếng Việt (UTF-8)

#### 3. **Danh sách khảo sát gần đây**
- Hiển thị 10 khảo sát mới nhất
- Filter theo loại: Tất cả / Học sinh / Giáo viên / Nhóm / Cá nhân
- Thông tin: Loại, Người tham gia, Ngày tạo
- Nút "Xem chi tiết" cho từng khảo sát

#### 4. **Xem chi tiết khảo sát**
- Modal popup hiển thị đầy đủ thông tin
- Tự động format dữ liệu theo loại khảo sát
- Hiển thị arrays dưới dạng badges
- Thông tin timestamps và metadata

## 🔧 API Endpoints

### Authentication
- `POST /api/admin/auth` - Đăng nhập
- `DELETE /api/admin/auth` - Đăng xuất  
- `GET /api/admin/verify` - Kiểm tra session

### Data Management
- `GET /api/admin/stats` - Thống kê tổng quan
- `GET /api/admin/surveys` - Danh sách khảo sát (có phân trang)
- `GET /api/admin/surveys/[id]` - Chi tiết khảo sát
- `GET /api/admin/export` - Xuất dữ liệu

### Query Parameters cho `/api/admin/surveys`:
- `type`: all | ai | teacher | group | individual
- `page`: số trang (mặc định: 1)
- `limit`: số items per page (mặc định: 20)

### Query Parameters cho `/api/admin/export`:
- `type`: all | ai | teacher | group | individual  
- `format`: csv | json

## 📁 Cấu trúc Files

```
app/
├── admin/
│   ├── login/page.tsx          # Trang đăng nhập
│   └── page.tsx                # Dashboard chính
├── api/admin/
│   ├── auth/route.ts           # Authentication API
│   ├── verify/route.ts         # Session verification
│   ├── stats/route.ts          # Statistics API
│   ├── surveys/route.ts        # Surveys list API
│   ├── surveys/[id]/route.ts   # Survey detail API
│   └── export/route.ts         # Export API
components/admin/
└── survey-detail-modal.tsx     # Modal chi tiết khảo sát
middleware.ts                   # Route protection
```

## 🛡️ Bảo mật

### Middleware Protection
- Tự động redirect đến `/admin/login` nếu chưa đăng nhập
- Kiểm tra JWT token và role admin
- Bảo vệ tất cả routes `/admin/*` (trừ login)

### Password Security
- Mật khẩu được hash bằng bcrypt
- Salt rounds: 10
- Không lưu plain text password

### Session Management
- JWT token với expiry 24h
- HTTP-only cookies
- Secure flag trong production
- SameSite: Strict

## 🎨 UI/UX Features

### Design System
- Gradient backgrounds
- Card-based layout
- Responsive design
- Loading states
- Empty states
- Error handling

### Notifications
- Custom popup notifications thay vì alert()
- Success/Error/Warning types
- Auto-dismiss và manual close
- Smooth animations

### Interactive Elements
- Filter buttons với active states
- Export buttons với loading states
- Modal với backdrop blur
- Hover effects và transitions

## 📊 Export Features

### CSV Export
- UTF-8 encoding với BOM
- Excel-compatible format
- Nested objects flattened
- Arrays joined với semicolon
- Proper escaping cho special characters

### JSON Export
- Pretty-printed format
- Metadata included (export date, total records)
- Full object structure preserved
- Developer-friendly format

### File Naming Convention
```
khao-sat-YYYY-MM-DD-{type}.{format}

Examples:
- khao-sat-2024-01-10-hoc-sinh.csv
- khao-sat-2024-01-10-tat-ca.json
- khao-sat-2024-01-10-giao-vien.csv
```

## 🔄 Data Flow

1. **Login**: User → Auth API → JWT Cookie → Dashboard
2. **Stats**: Dashboard → Stats API → Database → UI Update
3. **Surveys**: Filter → Surveys API → Database → List Update  
4. **Detail**: Click → Detail API → Database → Modal Display
5. **Export**: Click → Export API → Database → File Download

## 🚀 Deployment Notes

### Environment Variables
```bash
JWT_SECRET=your-super-secret-jwt-key-change-in-production-2024
MONGODB_URI=your-mongodb-connection-string
```

### Production Considerations
- Thay đổi JWT_SECRET
- Sử dụng HTTPS
- Rate limiting cho login attempts
- Audit logging
- IP whitelist (optional)
- Regular security updates

## 🐛 Troubleshooting

### Common Issues

1. **"Unauthorized" error**
   - Kiểm tra JWT_SECRET trong .env.local
   - Clear cookies và đăng nhập lại
   - Kiểm tra token expiry

2. **Build errors**
   - Kiểm tra import paths
   - Verify model exports (default vs named)
   - Check TypeScript types

3. **Database connection**
   - Verify MONGODB_URI
   - Check network connectivity
   - Ensure database permissions

4. **Export không hoạt động**
   - Check admin authentication
   - Verify API endpoints
   - Check browser download settings

### Debug Commands
```bash
# Check build
npm run build

# Check types
npx tsc --noEmit

# Run development
npm run dev
```

## 📞 Support

Nếu gặp vấn đề, hãy kiểm tra:
1. Console logs trong browser
2. Server logs trong terminal
3. Network tab trong DevTools
4. Database connection status

---

**Lưu ý**: Đây là phiên bản đầu tiên của Admin Panel. Các tính năng nâng cao như role-based access, audit logs, và advanced filtering sẽ được thêm vào các phiên bản tiếp theo.