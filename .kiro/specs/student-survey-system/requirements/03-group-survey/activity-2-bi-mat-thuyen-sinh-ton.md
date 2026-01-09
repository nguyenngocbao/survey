# Hoạt động 2: Khám phá thủy lực

## User Story

**As a** Student_User  
**I want to** complete Activity 2 form about hydraulic principles and boat design  
**So that** my group can understand buoyancy, materials, and use AI to optimize boat design

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị form hoạt động 2
WHEN a Student_User navigates to `/group/activity-2`, THE Survey_System SHALL display the Activity 2 form with all required fields

### AC2: Lưu dữ liệu hoạt động
WHEN a Student_User submits the form, THE Survey_System SHALL save data to database and mark activity 2 as completed

### AC3: Quay về trang group
WHEN a Student_User clicks back button, THE Survey_System SHALL navigate back to `/group` page

## UI/UX Requirements

### Page Layout

**Header**:
- Icon: 🔮
- Title: "Hoạt động 2: Khám phá thủy lực"
- Color: Purple gradient (`from-purple-500 to-purple-600`)

**Back Button**:
- Text: "← Quay lại"
- Navigate to: `/group`

### Mục tiêu

**Purpose Box** (hiển thị ở đầu form):
- Background: `bg-purple-50 border-l-4 border-purple-500`
- Icon: 🎯
- Title: "I. Mục tiêu"
- Content:
  - "Hình thành trực giác về lực đẩy Archimedes, thể tích chiếm nước và ảnh hưởng của hình dạng đến độ nổi."
  - "Nhận diện vật liệu, kết cấu và nguyên lý kỹ thuật của thuyền."
  - "Sử dụng AI để mở rộng phương án thiết kế và lựa chọn giải pháp tối ưu."

### Nhiệm vụ học tập

**Tasks Box**:
- Background: `bg-blue-50 border-l-4 border-blue-500`
- Icon: 📝
- Title: "II. Nhiệm vụ học tập"

### Form Fields

**Câu 1: Nguyên lý nổi**

- **Label**: "Câu 1 – Nguyên lý nổi"
- **Context**:
  - Text: "Nếu trọng lượng thuyền không đổi, bạn sẽ điều chỉnh hình dạng và thể tích chiếm nước như thế nào để thuyền nổi tốt và ổn định?"
- **Input**:
  - Type: Textarea
  - Rows: 6
  - Placeholder: "Nhập câu trả lời của nhóm..."
  - Required: Yes
  - Validation: Minimum 50 characters

---

**Câu 2: Kết cấu và vật liệu**

- **Label**: "Câu 2 – Kết cấu và vật liệu"
- **Context**:
  - Text: "Bạn sẽ chọn vật liệu và kết cấu ra sao để thuyền vừa nhẹ, bền, vừa an toàn? Giải thích dựa trên nguyên lý kỹ thuật đã học."
- **Input**:
  - Type: Textarea
  - Rows: 6
  - Placeholder: "Nhập câu trả lời của nhóm..."
  - Required: Yes
  - Validation: Minimum 50 characters

---

**Câu 3: Quy trình thiết kế**

- **Label**: "Câu 3 – Quy trình thiết kế"
- **Context**:
  - Text: "Mô tả 3 bước quan trọng để biến ý tưởng thuyền từ prototype đất sét thành phương án thiết kế AI, nêu công cụ hỗ trợ từng bước."
- **Input**:
  - Type: Textarea
  - Rows: 6
  - Placeholder: "Nhập câu trả lời của nhóm..."
  - Required: Yes
  - Validation: Minimum 50 characters

---

**Câu 4: So sánh và đánh giá**

- **Label**: "Câu 4 – So sánh và đánh giá"
- **Context**:
  - Text: "Khi so sánh prototype đất sét và phương án AI, bạn nhận thấy điểm mạnh – điểm yếu của mỗi phương án, và đâu là cơ sở để chọn giải pháp tối ưu?"
- **Input**:
  - Type: Textarea
  - Rows: 6
  - Placeholder: "Nhập câu trả lời của nhóm..."
  - Required: Yes
  - Validation: Minimum 50 characters

---

**Câu 5: Phác thảo phương án tối ưu**

- **Label**: "Câu 5 – Phác thảo phương án tối ưu"
- **Context**:
  - Text: "Mô tả thiết kế thuyền cuối cùng: hình dạng, vật liệu, kết cấu, và các ưu điểm nổi bật liên quan đến nổi, ổn định và an toàn."
- **Input**:
  - Type: Textarea
  - Rows: 6
  - Placeholder: "Nhập câu trả lời của nhóm..."
  - Required: Yes
  - Validation: Minimum 50 characters

### Submit Button
- Text: "Hoàn thành hoạt động"
- Background: `bg-gradient-to-r from-purple-500 to-purple-600`
- Action: Save data, mark completed, navigate back to `/group`

## API Endpoints

### POST /api/group-surveys/activity-2

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
  "message": "Activity 2 completed"
}
```

## Data Model

```typescript
interface Activity2Data {
  groupCode: string;
  
  // Câu 1: Nguyên lý nổi
  question1: string;
  
  // Câu 2: Kết cấu và vật liệu
  question2: string;
  
  // Câu 3: Quy trình thiết kế
  question3: string;
  
  // Câu 4: So sánh và đánh giá
  question4: string;
  
  // Câu 5: Phác thảo phương án tối ưu
  question5: string;
  
  completedAt: Date;
}
```

## Validation Rules

### All Questions (Câu 1-5)
- Required: Yes
- Minimum length: 50 characters
- Must provide detailed answers related to boat design, materials, and hydraulic principles

## Notes

- Cần định nghĩa cụ thể các câu hỏi/fields cho hoạt động này
- Form có thể có nhiều bước (multi-step) nếu cần
- Có thể thêm upload ảnh nếu cần

