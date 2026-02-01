# Tài liệu Hệ thống Khảo sát - ĐHSP TP.HCM

## 📚 Danh mục Tài liệu

### 🚀 Getting Started
- **[QUICK-START.md](QUICK-START.md)** - Hướng dẫn nhanh, shortcuts, FAQ
- **[STRUCTURE.md](STRUCTURE.md)** - Giải thích cấu trúc dự án chi tiết

### 🎨 Branding & Design
- **[FAVICON-GUIDE.md](FAVICON-GUIDE.md)** - Hướng dẫn tạo favicon từ logo ĐHSP
- **[BRANDING.md](BRANDING.md)** - Guidelines về màu sắc, typography, logo *(nếu có)*

### 🔧 Admin Separation
- **[ADMIN-SEPARATION-SUMMARY.md](ADMIN-SEPARATION-SUMMARY.md)** ⭐ - Tóm tắt về việc tách admin
- **[SPLIT-ADMIN-GUIDE.md](SPLIT-ADMIN-GUIDE.md)** - Hướng dẫn chi tiết tách admin ra domain riêng
- **[ADMIN-SPLIT-CHECKLIST.md](ADMIN-SPLIT-CHECKLIST.md)** - Checklist nhanh cho việc tách admin

### 📝 Change Logs
- **[CHANGELOG.md](CHANGELOG.md)** - Lịch sử thay đổi dự án

## 🗂️ Cấu trúc Thư mục

```
.kiro/specs/student-survey-system/
│
├── docs/                           # Thư mục này
│   ├── README.md                   # File này
│   ├── QUICK-START.md
│   ├── STRUCTURE.md
│   ├── FAVICON-GUIDE.md
│   ├── ADMIN-SEPARATION-SUMMARY.md
│   ├── SPLIT-ADMIN-GUIDE.md
│   ├── ADMIN-SPLIT-CHECKLIST.md
│   └── CHANGELOG.md
│
├── requirements/                   # Requirements chi tiết
│   ├── README.md
│   ├── 00-overview.md
│   ├── 01-home-screen/
│   ├── 02-individual-survey/
│   ├── 03-group-survey/
│   └── 04-admin/
│
├── requirements.md                 # File chính trỏ đến requirements/
└── plan.md                         # Kế hoạch implementation
```

## 🎯 Tìm Tài liệu Nhanh

### Tôi muốn...

**...bắt đầu với dự án**
→ Đọc [QUICK-START.md](QUICK-START.md)

**...hiểu cấu trúc code**
→ Đọc [STRUCTURE.md](STRUCTURE.md)

**...tạo favicon mới**
→ Đọc [FAVICON-GUIDE.md](FAVICON-GUIDE.md)

**...tách admin ra domain riêng**
→ Đọc [ADMIN-SEPARATION-SUMMARY.md](ADMIN-SEPARATION-SUMMARY.md) trước, sau đó [SPLIT-ADMIN-GUIDE.md](SPLIT-ADMIN-GUIDE.md)

**...xem requirements**
→ Vào thư mục [../requirements/](../requirements/)

**...xem lịch sử thay đổi**
→ Đọc [CHANGELOG.md](CHANGELOG.md)

## 📖 Quy ước

### Loại Tài liệu

- **README.md** - Overview và navigation
- **GUIDE.md** - Hướng dẫn chi tiết từng bước
- **CHECKLIST.md** - Danh sách kiểm tra nhanh
- **SUMMARY.md** - Tóm tắt ngắn gọn
- **CHANGELOG.md** - Lịch sử thay đổi

### Format

- Tất cả files dùng Markdown
- Có table of contents cho files dài
- Code examples với syntax highlighting
- Screenshots khi cần thiết

## 🔗 Links Hữu ích

### Internal
- [Requirements](../requirements/)
- [Requirements Overview](../requirements/00-overview.md)
- [Admin Requirements](../requirements/04-admin/)

### External
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)

## 📞 Support

Nếu không tìm thấy thông tin cần thiết:
1. Check README.md này
2. Search trong thư mục docs/
3. Check requirements/
4. Hỏi team lead

---

**Last Updated**: 2025-11-09
**Version**: 2.0
