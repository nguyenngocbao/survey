# Khảo sát Nhóm (Group Survey)

## Tổng quan

Khảo sát nhóm là một quy trình 4 bước giúp nhóm học sinh tài liệu hóa dự án, hoạt động nhóm, đánh giá thành viên và lên kế hoạch tương lai.

## Luồng hoạt động

```
Màn hình chính
  ↓
Chọn "Khảo sát Nhóm"
  ↓
1. Thông tin Nhóm (Group Info)
  ↓
2. Thành viên Nhóm (Members)
  ↓
3. Dự án & Hoạt động (Project Activities)
  ↓
4. Đánh giá & Phản hồi (Evaluation)
  ↓
Hoàn thành khảo sát nhóm
```

## Các màn hình

### 1. Thông tin Nhóm
**File**: `01-group-info.md`

Thu thập thông tin cơ bản nhóm:
- Tên nhóm, Mã nhóm (unique)
- Thông tin trưởng nhóm
- Số thành viên (2-10)
- Lớp, Môn học
- Ảnh đại diện nhóm (optional)

**Màu chủ đạo**: Green gradient

### 2. Thành viên Nhóm
**File**: `02-members.md`

Quản lý thông tin thành viên:
- Danh sách thành viên (min 2)
- Vai trò (Leader, Member, Secretary, Treasurer)
- % Đóng góp (tổng = 100%)
- Kỹ năng từng thành viên
- Đánh giá team dynamics (star rating)

**Màu chủ đạo**: Emerald gradient

### 3. Dự án & Hoạt động
**File**: `03-project-activities.md`

Tài liệu hóa dự án:
- Thông tin dự án (title, description, status, progress)
- Danh sách hoạt động nhóm
- Thành tích đạt được
- Khó khăn gặp phải
- Ảnh hoạt động nhóm (max 8)

**Màu chủ đạo**: Teal gradient

### 4. Đánh giá & Phản hồi
**File**: `04-evaluation.md`

Đánh giá và lên kế hoạch:
- Đánh giá hiệu quả nhóm (star rating)
- Điểm mạnh, điểm yếu
- Đánh giá từng thành viên (4 criteria)
- Kế hoạch tương lai
- Kỹ năng cần cải thiện

**Màu chủ đạo**: Cyan gradient

## Yêu cầu kỹ thuật

### API Endpoints
- `POST /api/group-surveys/group-info`
- `POST /api/group-surveys/members-info`
- `POST /api/group-surveys/project-activities`
- `POST /api/group-surveys/evaluation-feedback`

### Data Storage
- MongoDB collection: `group_surveys`
- Lưu groupCode vào localStorage để liên kết các forms
- Tracking progress với `completedSections`

### Progress Tracking
```typescript
completedSections: {
  groupInfo: boolean,
  members: boolean,
  projectActivities: boolean,
  evaluation: boolean
}
```

## Validation chung

### Group Info
- Số thành viên: 2-10
- Email trưởng nhóm phải đúng format
- groupCode là unique identifier

### Members
- Ít nhất 2 thành viên có thông tin đầy đủ
- Tổng % đóng góp = 100% (±5%)

### Project Activities
- Project title và description bắt buộc
- Ít nhất 1 activity

### Evaluation
- Star ratings: 1-5
- Member evaluations optional

## UI/UX Guidelines

### Layout
- Card-based design với backdrop blur
- Responsive: Desktop, Tablet, Mobile
- Progress indicator ở top
- Dynamic lists với add/remove

### Colors
- Group Info: Green (#10B981)
- Members: Emerald (#059669)
- Project: Teal (#14B8A6)
- Evaluation: Cyan (#06B6D4)

### Icons
- Group Info: 👥
- Members: 🤝
- Project: 📋
- Evaluation: ⭐

### Interactive Elements
- Star ratings cho đánh giá
- Dynamic member slots
- Dynamic activity/achievement/challenge lists
- Multi-image upload (max 8)

## Testing Scenarios

1. Complete full group survey flow
2. Add/remove members dynamically
3. Validate contribution percentages
4. Add/remove activities/achievements
5. Upload multiple images
6. Rate team dynamics and members
7. Handle API errors gracefully
8. Test on mobile devices
