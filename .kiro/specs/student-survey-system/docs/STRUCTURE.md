# Cấu trúc Dự án - Hệ thống Khảo sát Học sinh

## 📂 Tổng quan Cấu trúc

```
.kiro/specs/student-survey-system/
│
├── requirements.md                    # File chính - Trỏ đến cấu trúc chi tiết
├── plan.md                            # Kế hoạch implementation
│
├── docs/                              # Thư mục tài liệu
│   ├── CHANGELOG.md                   # Lịch sử thay đổi
│   └── STRUCTURE.md                   # File này - Giải thích cấu trúc
│
└── requirements/                      # Thư mục requirements chi tiết
    ├── README.md                      # Hướng dẫn sử dụng requirements
    ├── 00-overview.md                 # Tổng quan hệ thống
    │
    ├── 01-home-screen/                # 📱 Màn hình Chính
    │   └── requirements.md
    │
    ├── 02-individual-survey/          # 👤 Khảo sát Cá nhân
    │   ├── README.md                  # Overview nhóm chức năng
    │   ├── 01-personal-info.md        # Form 1: Thông tin cá nhân
    │   ├── 02-academic-info.md        # Form 2: Thông tin học tập
    │   ├── 03-interests.md            # Form 3: Sở thích & hoạt động
    │   └── 04-future-plans.md         # Form 4: Kế hoạch tương lai
    │
    ├── 03-group-survey/               # 👥 Khảo sát Nhóm
    │   ├── README.md                  # Overview nhóm chức năng
    │   ├── 01-group-info.md           # Form 1: Thông tin nhóm
    │   ├── 02-members.md              # Form 2: Thành viên nhóm
    │   ├── 03-project-activities.md   # Form 3: Dự án & hoạt động
    │   └── 04-evaluation.md           # Form 4: Đánh giá & phản hồi
    │
    └── 04-admin/                      # 🔧 Quản trị
        ├── README.md                  # Overview nhóm chức năng
        ├── 01-dashboard.md            # Dashboard với thống kê
        ├── 02-survey-list.md          # Danh sách khảo sát
        ├── 03-survey-detail.md        # Chi tiết khảo sát (modal)
        └── 04-export.md               # Xuất dữ liệu CSV/JSON
```

## 🎯 Nguyên tắc Tổ chức

### 1. Phân nhóm theo Chức năng
Mỗi nhóm chức năng lớn có thư mục riêng:
- **01-home-screen**: Màn hình chính (entry point)
- **02-individual-survey**: Tất cả forms của khảo sát cá nhân
- **03-group-survey**: Tất cả forms của khảo sát nhóm
- **04-admin**: Tất cả màn hình quản trị

### 2. Đánh số Thứ tự
- Thư mục: `01-`, `02-`, `03-`, `04-` (theo luồng sử dụng)
- Files trong thư mục: `01-`, `02-`, `03-`, `04-` (theo workflow)

### 3. README cho Mỗi Nhóm
Mỗi thư mục nhóm chức năng có file `README.md` chứa:
- Tổng quan về nhóm chức năng
- Luồng hoạt động
- Danh sách các màn hình
- Yêu cầu kỹ thuật chung
- UI/UX guidelines
- Testing scenarios

### 4. Tài liệu Riêng biệt
Thư mục `docs/` chứa các tài liệu không phải requirements:
- CHANGELOG.md: Lịch sử thay đổi
- STRUCTURE.md: Giải thích cấu trúc (file này)

## 📖 Cách Sử dụng

### Đọc Requirements

#### Bước 1: Hiểu Tổng quan
```bash
# Đọc tổng quan hệ thống
cat requirements/00-overview.md
```

#### Bước 2: Chọn Nhóm Chức năng
```bash
# Ví dụ: Muốn tìm hiểu về khảo sát cá nhân
cat requirements/02-individual-survey/README.md
```

#### Bước 3: Đọc Requirements Chi tiết
```bash
# Ví dụ: Đọc requirements form thông tin cá nhân
cat requirements/02-individual-survey/01-personal-info.md
```

### Chỉnh sửa Requirements

#### Thay đổi Một Màn hình
```bash
# 1. Tìm file cần sửa
# Ví dụ: Form thông tin học tập
vim requirements/02-individual-survey/02-academic-info.md

# 2. Chỉnh sửa các sections cần thiết
# 3. Lưu file
```

#### Thêm Màn hình Mới vào Nhóm
```bash
# 1. Tạo file mới trong thư mục nhóm
touch requirements/02-individual-survey/05-new-form.md

# 2. Copy template từ file tương tự
# 3. Cập nhật README.md của nhóm
vim requirements/02-individual-survey/README.md
```

#### Thêm Nhóm Chức năng Mới
```bash
# 1. Tạo thư mục mới
mkdir requirements/05-new-feature/

# 2. Tạo README.md cho nhóm
touch requirements/05-new-feature/README.md

# 3. Tạo các file requirements
touch requirements/05-new-feature/01-screen-1.md

# 4. Cập nhật 00-overview.md
vim requirements/00-overview.md
```

## 🔍 Tìm kiếm Requirements

### Tìm theo Keyword
```bash
# Tìm tất cả validation rules
grep -r "Validation Rules" requirements/

# Tìm API endpoints
grep -r "POST /api" requirements/

# Tìm data models
grep -r "interface" requirements/
```

### Tìm theo Nhóm
```bash
# List tất cả files trong nhóm khảo sát cá nhân
ls -la requirements/02-individual-survey/

# List tất cả files trong nhóm admin
ls -la requirements/04-admin/
```

## 🎨 Quy ước Đặt tên

### Thư mục
- Format: `{số}-{tên-nhóm}/`
- Ví dụ: `02-individual-survey/`, `04-admin/`
- Lowercase, dấu gạch ngang

### Files Requirements
- Format: `{số}-{tên-màn-hình}.md`
- Ví dụ: `01-personal-info.md`, `02-survey-list.md`
- Lowercase, dấu gạch ngang

### Files Đặc biệt
- `README.md`: Overview của nhóm chức năng
- `requirements.md`: Requirements của màn hình đơn lẻ (home screen)
- `00-overview.md`: Tổng quan toàn hệ thống

## 💡 Lợi ích Cấu trúc Mới

### 1. Dễ Quản lý
✅ Nhóm chức năng rõ ràng  
✅ Tìm file nhanh chóng  
✅ Không bị lạc trong danh sách dài

### 2. Dễ Collaboration
✅ Nhiều người làm việc trên các nhóm khác nhau  
✅ Ít conflict khi merge  
✅ Review dễ dàng hơn

### 3. Dễ Maintain
✅ Thay đổi một màn hình không ảnh hưởng nhóm khác  
✅ Thêm màn hình mới vào đúng nhóm  
✅ Xóa/di chuyển màn hình dễ dàng

### 4. Dễ Hiểu
✅ Cấu trúc tree trực quan  
✅ README cho mỗi nhóm  
✅ Workflow rõ ràng

### 5. Scalable
✅ Dễ thêm nhóm chức năng mới  
✅ Dễ mở rộng trong tương lai  
✅ Không giới hạn số lượng màn hình

## 📊 So sánh với Cấu trúc Cũ

### Cấu trúc Cũ (Flat)
```
requirements/
├── 01-home-screen.md
├── 02-individual-personal-info.md
├── 03-individual-academic-info.md
├── 04-individual-interests.md
├── 05-individual-future-plans.md
├── 06-group-info.md
├── 07-group-members.md
├── 08-group-project-activities.md
├── 09-group-evaluation.md
├── 10-admin-dashboard.md
├── 11-admin-survey-list.md
├── 12-admin-survey-detail.md
└── 13-admin-export.md
```

**Vấn đề**:
- ❌ Khó phân biệt nhóm chức năng
- ❌ Danh sách dài, khó tìm
- ❌ Không có overview cho từng nhóm
- ❌ Khó mở rộng

### Cấu trúc Mới (Tree)
```
requirements/
├── 01-home-screen/
├── 02-individual-survey/
│   ├── README.md
│   └── 4 forms
├── 03-group-survey/
│   ├── README.md
│   └── 4 forms
└── 04-admin/
    ├── README.md
    └── 4 screens
```

**Ưu điểm**:
- ✅ Nhóm chức năng rõ ràng
- ✅ Dễ navigate
- ✅ Có overview cho mỗi nhóm
- ✅ Dễ mở rộng

## 🚀 Best Practices

### 1. Luôn Cập nhật README
Khi thêm/sửa màn hình trong nhóm, cập nhật README.md của nhóm đó.

### 2. Tuân thủ Naming Convention
Đặt tên file theo format đã định: `{số}-{tên}.md`

### 3. Sử dụng Overview
Đọc README.md của nhóm trước khi đọc requirements chi tiết.

### 4. Tổ chức Tài liệu
Đặt tài liệu không phải requirements vào thư mục `docs/`.

### 5. Version Control
Commit theo nhóm chức năng để dễ review và rollback.

## 📞 Hỗ trợ

Nếu có câu hỏi về cấu trúc:
1. Đọc file này (STRUCTURE.md)
2. Đọc requirements/README.md
3. Xem ví dụ trong các file requirements
4. Hỏi team lead

---

**Cập nhật**: 2025-11-09  
**Version**: 2.0 - Tree Structure
