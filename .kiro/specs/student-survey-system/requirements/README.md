# Hướng dẫn Sử dụng Requirements

## Giới thiệu

Thư mục này chứa các file requirements chi tiết cho từng màn hình/workflow của Hệ thống Khảo sát Học sinh. Mỗi file tập trung vào một màn hình cụ thể, giúp bạn dễ dàng quản lý và chỉnh sửa yêu cầu.

## Cấu trúc Thư mục

```
requirements/
├── README.md                           # File này - Hướng dẫn chung
├── 00-overview.md                      # Tổng quan hệ thống
│
├── 01-home-screen/                     # Màn hình chính
│   └── requirements.md
│
├── 02-individual-survey/               # Nhóm Khảo sát Cá nhân
│   ├── README.md                       # Overview khảo sát cá nhân
│   ├── 01-personal-info.md             # Form thông tin cá nhân
│   ├── 02-academic-info.md             # Form thông tin học tập
│   ├── 03-interests.md                 # Form sở thích & hoạt động
│   └── 04-future-plans.md              # Form kế hoạch tương lai
│
├── 03-group-survey/                    # Nhóm Khảo sát Nhóm
│   ├── README.md                       # Overview khảo sát nhóm
│   ├── 01-group-info.md                # Form thông tin nhóm
│   ├── 02-members.md                   # Form thành viên nhóm
│   ├── 03-project-activities.md        # Form dự án & hoạt động
│   └── 04-evaluation.md                # Form đánh giá & phản hồi
│
└── 04-admin/                           # Nhóm Quản trị
    ├── README.md                       # Overview admin
    ├── 01-dashboard.md                 # Dashboard quản trị
    ├── 02-survey-list.md               # Danh sách khảo sát
    ├── 03-survey-detail.md             # Chi tiết khảo sát
    └── 04-export.md                    # Xuất dữ liệu
```

## Cách Sử dụng

### 1. Đọc Tổng quan
Bắt đầu với file `00-overview.md` để hiểu:
- Thuật ngữ hệ thống (Glossary)
- Cấu trúc màn hình
- Luồng hoạt động chính
- Yêu cầu kỹ thuật chung

### 2. Tìm Màn hình Cần Chỉnh sửa
Sử dụng cấu trúc thư mục để tìm màn hình:
- `01-home-screen/` : Màn hình chính
- `02-individual-survey/` : Khảo sát cá nhân (4 forms)
- `03-group-survey/` : Khảo sát nhóm (4 forms)
- `04-admin/` : Quản trị (4 màn hình)

Mỗi nhóm có file README.md riêng với tổng quan về nhóm chức năng đó.

### 3. Chỉnh sửa Requirements
Mỗi file requirements bao gồm:

#### User Story
Mô tả nhu cầu người dùng theo format:
```
As a [role]
I want to [action]
So that [benefit]
```

#### Acceptance Criteria (EARS Format)
Tiêu chí chấp nhận theo chuẩn EARS:
- WHEN [trigger], THE System SHALL [response]
- Rõ ràng, có thể kiểm tra được
- Tuân thủ INCOSE quality rules

#### UI/UX Requirements
- Layout và components
- Form fields chi tiết
- Colors và styling
- Interactions

#### Validation Rules
- Quy tắc kiểm tra dữ liệu
- Error messages
- Format requirements

#### API Endpoints
- Request/Response format
- Error handling

#### Data Models
- TypeScript interfaces
- Field descriptions

## Quy trình Thay đổi Requirements

### Bước 1: Xác định Màn hình
```bash
# Ví dụ: Muốn thay đổi form thông tin cá nhân
# Mở file: requirements/02-individual-survey/01-personal-info.md

# Hoặc xem tổng quan nhóm trước:
# Mở file: requirements/02-individual-survey/README.md
```

### Bước 2: Chỉnh sửa Nội dung
Chỉnh sửa các phần cần thiết:
- User Story (nếu thay đổi mục đích)
- Acceptance Criteria (nếu thay đổi hành vi)
- UI/UX Requirements (nếu thay đổi giao diện)
- Validation Rules (nếu thay đổi quy tắc)
- API Endpoints (nếu thay đổi API)

### Bước 3: Cập nhật Overview (nếu cần)
Nếu thay đổi ảnh hưởng đến:
- Thuật ngữ mới
- Luồng hoạt động
- Cấu trúc màn hình

Cập nhật file `00-overview.md`

### Bước 4: Thông báo cho Team
Sau khi chỉnh sửa, thông báo cho team về:
- File nào đã thay đổi
- Lý do thay đổi
- Impact đến các màn hình khác

## Ví dụ Thay đổi

### Ví dụ 1: Thêm Field Mới

**Màn hình**: Form Thông tin Cá nhân  
**File**: `02-individual-survey/01-personal-info.md`

**Thay đổi**:
1. Thêm field "Địa chỉ" vào UI/UX Requirements
2. Thêm validation rule cho địa chỉ
3. Cập nhật Data Model
4. Cập nhật API Request Body

### Ví dụ 2: Thay đổi Validation

**Màn hình**: Form Thông tin Học tập  
**File**: `02-individual-survey/02-academic-info.md`

**Thay đổi**:
1. Tìm section "Validation Rules"
2. Chỉnh sửa rule cho GPA (ví dụ: từ 0-4 thành 0-10)
3. Cập nhật Acceptance Criteria tương ứng
4. Cập nhật error message

### Ví dụ 3: Thêm Màn hình Mới

**Nếu cần thêm màn hình mới**:
1. Tạo file mới với số thứ tự phù hợp
2. Copy template từ file tương tự
3. Điền đầy đủ các sections
4. Cập nhật `00-overview.md`

## Template cho File Mới

```markdown
# [Tên Màn hình]

## User Story

**As a** [Role]  
**I want to** [Action]  
**So that** [Benefit]

## Acceptance Criteria (EARS Format)

### AC1: [Tiêu đề]
WHEN [trigger], THE Survey_System SHALL [response]

## UI/UX Requirements

### Layout
[Mô tả layout]

### Form Fields
[Chi tiết các fields]

### Colors
[Màu sắc chính]

## Validation Rules

[Quy tắc validation]

## API Endpoints

### [METHOD] [PATH]

**Request Body:**
```json
{}
```

**Response:**
```json
{}
```

## Data Model

```typescript
interface [Name] {
  // fields
}
```

## Success Flow

```
Step 1
  ↓
Step 2
  ↓
Step 3
```
```

## Best Practices

### 1. Tuân thủ EARS Format
- Sử dụng đúng pattern: WHEN, THE, SHALL
- Một requirement = một ý tưởng
- Rõ ràng, có thể kiểm tra

### 2. Chi tiết UI/UX
- Mô tả đầy đủ layout
- Liệt kê tất cả fields
- Ghi rõ colors và styling

### 3. Validation Rõ ràng
- Liệt kê tất cả rules
- Ghi rõ error messages
- Ví dụ cụ thể

### 4. API Documentation
- Request/Response đầy đủ
- Error cases
- Status codes

### 5. Data Models
- TypeScript interfaces
- Comment cho fields phức tạp
- Ghi rõ optional fields

## Công cụ Hỗ trợ

### Tìm kiếm Requirements
```bash
# Tìm tất cả requirements về validation
grep -r "Validation Rules" requirements/

# Tìm API endpoints
grep -r "API Endpoints" requirements/

# Tìm data models
grep -r "Data Model" requirements/
```

### Kiểm tra Consistency
```bash
# Kiểm tra tất cả files có đầy đủ sections
for file in requirements/*.md; do
  echo "Checking $file"
  grep -q "User Story" "$file" || echo "Missing User Story"
  grep -q "Acceptance Criteria" "$file" || echo "Missing AC"
  grep -q "UI/UX Requirements" "$file" || echo "Missing UI/UX"
done
```

## Liên hệ

Nếu có câu hỏi về requirements:
1. Đọc file `00-overview.md` trước
2. Tìm file màn hình cụ thể
3. Nếu vẫn chưa rõ, hỏi team lead

## Changelog

### 2025-11-09
- Tạo cấu trúc requirements mới
- Tách thành 14 files riêng biệt
- Thêm README và hướng dẫn
