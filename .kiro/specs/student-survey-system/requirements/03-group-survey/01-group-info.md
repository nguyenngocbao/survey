# Form Thông tin Nhóm (Group - Group Info)

## User Story

**As a** Student_User  
**I want to** create a group survey by entering basic group information  
**So that** my team can document our group project and collaboration

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị form thông tin nhóm
WHEN a Student_User accesses the group info form, THE Survey_System SHALL display fields for group name, code, leader info, member count, class, subject, and avatar

### AC2: Validation số thành viên
WHEN a Student_User enters member count, THE Survey_System SHALL validate that the value is between 2 and 10

### AC3: Validation email trưởng nhóm
WHEN a Student_User enters leader email, THE Survey_System SHALL validate email format

### AC4: Tạo mã nhóm unique
WHEN a Student_User enters group code, THE Survey_System SHALL use this code as unique identifier for the group

### AC5: Lưu groupCode
WHEN the group info is saved successfully, THE Survey_System SHALL store the groupCode in localStorage with key `currentGroupCode`

### AC6: Upload ảnh đại diện nhóm
WHEN a Student_User uploads group avatar, THE Survey_System SHALL store the image with max size 3MB

## UI/UX Requirements

### Layout
- Card container với backdrop blur
- Icon header: 👥 với green gradient
- Title: "Thông tin nhóm"
- Subtitle: "Vui lòng điền thông tin cơ bản về nhóm học tập"

### Form Fields

#### Tên nhóm * (Required)
- Type: Text input
- Placeholder: "Nhóm Lập trình Web"

#### Mã nhóm * (Required)
- Type: Text input
- Placeholder: "GROUP001"
- Note: Unique identifier

#### Tên trưởng nhóm * (Required)
- Type: Text input
- Placeholder: "Nguyễn Văn A"

#### Email trưởng nhóm * (Required)
- Type: Email input
- Placeholder: "leader@university.edu.vn"
- Validation: Email format

#### SĐT trưởng nhóm * (Required)
- Type: Tel input
- Placeholder: "0123456789"

#### Số thành viên * (Required)
- Type: Number input
- Min: 2
- Max: 10
- Placeholder: "5"

#### Lớp * (Required)
- Type: Text input
- Placeholder: "CNTT01-K65"

#### Môn học * (Required)
- Type: Select dropdown
- Options:
  - Lập trình Web
  - Cơ sở dữ liệu
  - Mạng máy tính
  - Kỹ thuật phần mềm
  - Trí tuệ nhân tạo
  - Bảo mật thông tin
  - Hệ điều hành
  - Cấu trúc dữ liệu
  - Toán rời rạc
  - Khác

#### Ảnh đại diện nhóm
- Type: Image upload
- Max size: 3MB
- Optional

### Colors
- Primary: Green gradient (from-green-500 to-green-600)

## Validation Rules

### Member Count
- Required: Yes
- Type: Integer
- Range: 2-10
- Error: "Số thành viên phải từ 2 đến 10 người"

### Email
- Required: Yes
- Format: Valid email
- Error: "Email không hợp lệ"

### All Required Fields
- Error: "Vui lòng điền đầy đủ tất cả thông tin"

## API Endpoints

### POST /api/group-surveys/group-info

**Request Body:**
```json
{
  "groupName": "string",
  "groupCode": "string",
  "leaderName": "string",
  "leaderEmail": "string",
  "leaderPhone": "string",
  "memberCount": number,
  "class": "string",
  "subject": "string",
  "groupAvatar": "string (URL)"
}
```

## Data Model

```typescript
interface GroupInfo {
  groupName: string;
  groupCode: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  memberCount: number;
  class: string;
  subject: string;
  groupAvatar?: string;
}
```

## Success Flow

```
User fills group info
  ↓
Validate member count (2-10)
  ↓
Validate email format
  ↓
POST to /api/group-surveys/group-info
  ↓
Save groupCode to localStorage
  ↓
Navigate to Members Info form
```

## Special Notes

- groupCode is used as unique identifier throughout the group survey
- groupCode must be stored in localStorage for subsequent forms
- Member count determines how many member slots to show in next form
