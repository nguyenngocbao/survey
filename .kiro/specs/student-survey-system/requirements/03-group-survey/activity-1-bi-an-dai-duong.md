# Hoạt động 1: Bí ẩn dòng nước

## User Story

**As a** Student_User  
**I want to** complete Activity 1 form to establish technical criteria for mini boat design  
**So that** my group can create standardized evaluation criteria for safe boat design during flood season

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị form hoạt động 1
WHEN a Student_User navigates to `/group/activity-1`, THE Survey_System SHALL display the Activity 1 form with all required fields

### AC2: Lưu dữ liệu hoạt động
WHEN a Student_User submits the form, THE Survey_System SHALL save data to database and mark activity 1 as completed

### AC3: Quay về trang group
WHEN a Student_User clicks back button, THE Survey_System SHALL navigate back to `/group` page

## UI/UX Requirements

### Page Layout

**Header**:
- Icon: 🌊
- Title: "Hoạt động 1: Bí ẩn đại dương"
- Subtitle: "Khám phá những bí ẩn dưới đáy đại dương"
- Color: Violet gradient (`from-violet-500 to-violet-600`)

**Back Button**:
- Text: "← Quay lại"
- Navigate to: `/group`

### Mục đích sử dụng

**Purpose Box** (hiển thị ở đầu form):
- Background: `bg-blue-50 border-l-4 border-blue-500`
- Icon: �
- Content:
  - "Nhận diện vấn đề thực tiễn trong bối cảnh mùa nước nổi"
  - "Xây dựng hệ tiêu chí thiết kế dựa trên phân tích rủi ro và yêu cầu kỹ thuật"
  - "Chuẩn hóa tiêu chí theo định hướng năng lực thiết kế kỹ thuật"
  - "Tạo cơ sở đánh giá sản phẩm xuyên suốt các hoạt động sau"

### Quy trình thực hiện

**Process Box**:
- Background: `bg-violet-50 border-l-4 border-violet-500`
- Icon: 📋
- Content:
  - "Quan sát video/ảnh tình huống và liệt kê rủi ro"
  - "Đề xuất tiêu chí thiết kế ban đầu"
  - "Tham gia trò chơi 'Đấu trường Từ khóa' để nhận diện tiêu chí chuẩn"
  - "So sánh - điều chỉnh - thống nhất bộ tiêu chí kỹ thuật"

### Form Fields

## Bảng A: Tiêu chí ban đầu của nhóm

**Section Title**: "A. Tiêu chí ban đầu của nhóm"
**Description**: "Nhóm đề xuất các tiêu chí thiết kế ban đầu dựa trên quan sát và phân tích"

**Table Structure**:
- 5 rows (có thể thêm/xóa, tối thiểu 3, tối đa 7)
- 3 columns:
  1. **STT** (auto-numbered)
  2. **Tiêu chí đề xuất** (Text input)
     - Placeholder: "Nhập tiêu chí thiết kế..."
     - Required: Yes
     - Min length: 10 characters
  3. **Cơ sở lựa chọn** (Text input)
     - Placeholder: "Giải thích tại sao chọn tiêu chí này..."
     - Required: Yes
     - Min length: 20 characters

**Actions**:
- Button "+" Thêm tiêu chí (max 7 rows)
- Button "×" Xóa tiêu chí (min 3 rows)

---

## Bảng B: Bộ tiêu chí thống nhất của lớp

**Section Title**: "B. Bộ tiêu chí thống nhất của lớp (phiên bản chính thức)"
**Description**: "Sau khi tham gia 'Đấu trường Từ khóa' và thảo luận, nhóm ghi lại bộ tiêu chí chuẩn hóa"

**Table Structure**:
- 7 rows (fixed)
- 3 columns:
  1. **STT** (auto-numbered 1-7)
  2. **Tiêu chí kỹ thuật** (Text input)
     - Placeholder: "Tiêu chí kỹ thuật chuẩn..."
     - Required: Yes
     - Min length: 10 characters
  3. **Mô tả** (Textarea, 2 rows)
     - Placeholder: "Mô tả chi tiết tiêu chí..."
     - Required: Yes
     - Min length: 30 characters

**Note Box** (hiển thị dưới bảng):
- Background: `bg-yellow-50 border-l-4 border-yellow-400`
- Icon: 💡
- Text: "Bộ tiêu chí này sẽ được sử dụng để đánh giá thiết kế thuyền trong các hoạt động tiếp theo"

### Submit Button
- Text: "Hoàn thành hoạt động"
- Background: `bg-gradient-to-r from-violet-500 to-violet-600`
- Action: Save data, mark completed, navigate back to `/group`

## API Endpoints

### POST /api/group-surveys/activity-1

**Request Body:**
```json
{
  "groupCode": "string",
  "data": {
    // TODO: Define data structure
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Activity 1 completed"
}
```

## Data Model

```typescript
interface Activity1Data {
  groupCode: string;
  
  // Bảng A: Tiêu chí ban đầu của nhóm
  tableA: {
    initialCriteria: Array<{
      stt: number;
      criterion: string; // Tiêu chí đề xuất
      basis: string; // Cơ sở lựa chọn
    }>; // 3-7 items
  };
  
  // Bảng B: Bộ tiêu chí thống nhất của lớp
  tableB: {
    standardizedCriteria: Array<{
      stt: number; // 1-7
      technicalCriterion: string; // Tiêu chí kỹ thuật
      description: string; // Mô tả
    }>; // 7 items (fixed)
  };
  
  completedAt: Date;
}
```

## Validation Rules

### Bảng A: Tiêu chí ban đầu
- Minimum rows: 3
- Maximum rows: 7
- Each row:
  - Tiêu chí đề xuất: Required, minimum 10 characters
  - Cơ sở lựa chọn: Required, minimum 20 characters
- All rows must be filled before submission

### Bảng B: Bộ tiêu chí thống nhất
- Fixed rows: 7 (all must be filled)
- Each row:
  - Tiêu chí kỹ thuật: Required, minimum 10 characters
  - Mô tả: Required, minimum 30 characters
- All 7 criteria must be completed before submission

## Notes

- Cần định nghĩa cụ thể các câu hỏi/fields cho hoạt động này
- Form có thể có nhiều bước (multi-step) nếu cần
- Có thể thêm upload ảnh nếu cần

