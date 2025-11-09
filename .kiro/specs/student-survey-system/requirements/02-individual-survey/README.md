# Khảo sát Cá nhân (Individual Survey)

## Tổng quan

Khảo sát cá nhân là một quy trình 4 bước giúp thu thập thông tin toàn diện về học sinh, bao gồm thông tin cá nhân, học tập, sở thích và kế hoạch tương lai.

## Luồng hoạt động

```
Màn hình chính
  ↓
Chọn "Khảo sát Cá nhân"
  ↓
1. Thông tin Cá nhân (Personal Info)
  ↓
2. Thông tin Học tập (Academic Info)
  ↓
3. Sở thích & Hoạt động (Interests)
  ↓
4. Kế hoạch Tương lai (Future Plans)
  ↓
Hoàn thành khảo sát
```

## Các màn hình

### 1. Thông tin Cá nhân
**File**: `01-personal-info.md`

Thu thập thông tin cơ bản:
- Họ tên, MSSV, Email, SĐT
- Lớp, Ngành học
- Ảnh đại diện (optional)

**Màu chủ đạo**: Blue gradient

### 2. Thông tin Học tập
**File**: `02-academic-info.md`

Thu thập thông tin học tập:
- GPA, Số giờ học/ngày
- Phong cách học tập
- Môn học yêu thích
- Khó khăn trong học tập

**Màu chủ đạo**: Green gradient

### 3. Sở thích & Hoạt động
**File**: `03-interests.md`

Thu thập thông tin ngoại khóa:
- Sở thích cá nhân
- Thể thao yêu thích
- Câu lạc bộ tham gia
- Hoạt động tình nguyện
- Kinh nghiệm lãnh đạo
- Ảnh hoạt động (max 5)

**Màu chủ đạo**: Orange gradient

### 4. Kế hoạch Tương lai
**File**: `04-future-plans.md`

Thu thập kế hoạch phát triển:
- Mục tiêu nghề nghiệp
- Kế hoạch tốt nghiệp
- Học lên cao học
- Đi làm ngay
- Kỹ năng muốn phát triển

**Màu chủ đạo**: Purple gradient

## Yêu cầu kỹ thuật

### API Endpoints
- `POST /api/surveys/personal-info`
- `POST /api/surveys/academic-info`
- `POST /api/surveys/interests`
- `POST /api/surveys/future-plans`

### Data Storage
- MongoDB collection: `individual_surveys`
- Lưu studentId vào localStorage để liên kết các forms
- Tracking progress với `completedSections`

### Progress Tracking
```typescript
completedSections: {
  personal: boolean,
  academic: boolean,
  interests: boolean,
  future: boolean
}
```

## Validation chung

- Tất cả required fields phải được điền
- Email phải đúng format
- GPA: 0-4
- Số giờ học: 0-24
- Ít nhất 1 sở thích phải được chọn

## UI/UX Guidelines

### Layout
- Card-based design với backdrop blur
- Responsive: Desktop, Tablet, Mobile
- Progress indicator ở top
- Navigation: Hủy / Lưu và tiếp tục

### Colors
- Personal: Blue (#3B82F6)
- Academic: Green (#10B981)
- Interests: Orange (#F97316)
- Future: Purple (#8B5CF6)

### Icons
- Personal: 👤
- Academic: 📚
- Interests: 🎯
- Future: 🚀

## Testing Scenarios

1. Complete full survey flow
2. Save and resume later
3. Validate all required fields
4. Upload images successfully
5. Handle API errors gracefully
6. Test on mobile devices
