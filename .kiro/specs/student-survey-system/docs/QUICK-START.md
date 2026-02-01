# Quick Start - Hướng dẫn Nhanh

## 🎯 Tìm Requirements cho Màn hình Cụ thể

### Màn hình Chính
```bash
📱 requirements/01-home-screen/requirements.md
```

### Khảo sát Cá nhân
```bash
👤 requirements/02-individual-survey/
   ├── README.md                    # ⭐ Đọc đầu tiên
   ├── 01-personal-info.md          # Form thông tin cá nhân
   ├── 02-academic-info.md          # Form thông tin học tập
   ├── 03-interests.md              # Form sở thích
   └── 04-future-plans.md           # Form kế hoạch tương lai
```

### Khảo sát Nhóm
```bash
👥 requirements/03-group-survey/
   ├── README.md                    # ⭐ Đọc đầu tiên
   ├── 01-group-info.md             # Form thông tin nhóm
   ├── 02-members.md                # Form thành viên
   ├── 03-project-activities.md     # Form dự án
   └── 04-evaluation.md             # Form đánh giá
```

### Quản trị
```bash
🔧 requirements/04-admin/
   ├── README.md                    # ⭐ Đọc đầu tiên
   ├── 01-dashboard.md              # Dashboard
   ├── 02-survey-list.md            # Danh sách
   ├── 03-survey-detail.md          # Chi tiết
   └── 04-export.md                 # Xuất dữ liệu
```

## 🔍 Tìm Thông tin Cụ thể

### Tìm Validation Rules
```bash
# Tìm trong một nhóm
grep -r "Validation Rules" requirements/02-individual-survey/

# Tìm trong toàn bộ
grep -r "Validation Rules" requirements/
```

### Tìm API Endpoints
```bash
# Tìm POST endpoints
grep -r "POST /api" requirements/

# Tìm GET endpoints
grep -r "GET /api" requirements/
```

### Tìm Data Models
```bash
# Tìm TypeScript interfaces
grep -r "interface" requirements/

# Tìm trong một file cụ thể
grep "interface" requirements/02-individual-survey/01-personal-info.md
```

## 📝 Workflow Thường dùng

### 1. Hiểu Một Nhóm Chức năng
```bash
# Bước 1: Đọc overview nhóm
cat requirements/02-individual-survey/README.md

# Bước 2: Đọc requirements từng màn hình
cat requirements/02-individual-survey/01-personal-info.md
cat requirements/02-individual-survey/02-academic-info.md
# ...
```

### 2. Chỉnh sửa Requirements
```bash
# Bước 1: Mở file cần sửa
vim requirements/02-individual-survey/01-personal-info.md

# Bước 2: Sửa sections cần thiết:
# - User Story
# - Acceptance Criteria
# - UI/UX Requirements
# - Validation Rules
# - API Endpoints

# Bước 3: Lưu và commit
git add requirements/02-individual-survey/01-personal-info.md
git commit -m "Update personal info validation rules"
```

### 3. Thêm Màn hình Mới
```bash
# Bước 1: Tạo file mới trong nhóm phù hợp
touch requirements/02-individual-survey/05-new-screen.md

# Bước 2: Copy template từ file tương tự
cp requirements/02-individual-survey/01-personal-info.md \
   requirements/02-individual-survey/05-new-screen.md

# Bước 3: Chỉnh sửa nội dung
vim requirements/02-individual-survey/05-new-screen.md

# Bước 4: Cập nhật README của nhóm
vim requirements/02-individual-survey/README.md
```

## 🎨 Màu sắc theo Nhóm

| Nhóm | Màu chủ đạo | Gradient |
|------|-------------|----------|
| Home | Blue | `from-blue-50 to-indigo-100` |
| Individual - Personal | Blue | `from-blue-500 to-blue-600` |
| Individual - Academic | Green | `from-green-500 to-green-600` |
| Individual - Interests | Orange | `from-orange-500 to-orange-600` |
| Individual - Future | Purple | `from-purple-500 to-purple-600` |
| Group - Info | Green | `from-green-500 to-green-600` |
| Group - Members | Emerald | `from-emerald-500 to-emerald-600` |
| Group - Project | Teal | `from-teal-500 to-teal-600` |
| Group - Evaluation | Cyan | `from-cyan-500 to-cyan-600` |
| Admin | Blue | `from-blue-50 to-indigo-100` |

## 📚 Tài liệu Tham khảo

### Bắt đầu
1. `requirements/00-overview.md` - Tổng quan hệ thống
2. `requirements/README.md` - Hướng dẫn sử dụng
3. `docs/STRUCTURE.md` - Giải thích cấu trúc

### Nhóm Chức năng
1. `requirements/02-individual-survey/README.md` - Khảo sát cá nhân
2. `requirements/03-group-survey/README.md` - Khảo sát nhóm
3. `requirements/04-admin/README.md` - Quản trị

### Lịch sử
1. `docs/CHANGELOG.md` - Lịch sử thay đổi

## 💡 Tips

### Đọc Requirements Hiệu quả
1. **Đọc README trước**: Hiểu tổng quan nhóm chức năng
2. **Đọc theo workflow**: Theo thứ tự 01, 02, 03, 04
3. **Focus vào sections quan trọng**: User Story, Acceptance Criteria, Validation

### Tìm kiếm Nhanh
```bash
# Tìm tất cả required fields
grep -r "Required: Yes" requirements/

# Tìm tất cả error messages
grep -r "Error:" requirements/

# Tìm tất cả API routes
grep -r "/api/" requirements/
```

### Làm việc với Git
```bash
# Xem thay đổi trong một nhóm
git diff requirements/02-individual-survey/

# Commit theo nhóm
git add requirements/02-individual-survey/
git commit -m "Update individual survey requirements"

# Xem lịch sử của một file
git log requirements/02-individual-survey/01-personal-info.md
```

## 🚀 Shortcuts

### VSCode
```json
// Thêm vào .vscode/settings.json
{
  "files.associations": {
    "**/requirements/**/*.md": "markdown"
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true
  }
}
```

### Aliases (Bash/Zsh)
```bash
# Thêm vào ~/.bashrc hoặc ~/.zshrc
alias req='cd .kiro/specs/student-survey-system/requirements'
alias reqind='cd .kiro/specs/student-survey-system/requirements/02-individual-survey'
alias reqgrp='cd .kiro/specs/student-survey-system/requirements/03-group-survey'
alias reqadm='cd .kiro/specs/student-survey-system/requirements/04-admin'
```

## ❓ FAQ

**Q: Tôi muốn thay đổi validation cho form thông tin cá nhân, file nào?**  
A: `requirements/02-individual-survey/01-personal-info.md` → Section "Validation Rules"

**Q: Tôi muốn xem tất cả API endpoints của khảo sát cá nhân?**  
A: `grep -r "POST /api/surveys" requirements/02-individual-survey/`

**Q: Tôi muốn thêm một form mới vào khảo sát cá nhân?**  
A: 
1. Tạo file `requirements/02-individual-survey/05-new-form.md`
2. Cập nhật `requirements/02-individual-survey/README.md`
3. Cập nhật `requirements/00-overview.md`

**Q: Làm sao biết màu nào dùng cho màn hình nào?**  
A: Xem bảng "Màu sắc theo Nhóm" ở trên hoặc đọc README của nhóm

---

**Tip**: Bookmark file này để tra cứu nhanh! 🔖
