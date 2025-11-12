# Hoạt động 4: Bản vẽ toả sáng

## User Story

**As a** Student_User  
**I want to** complete Activity 4 form about glowing blueprints  
**So that** my group can document our exploration of luminous maps

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị form hoạt động 4
WHEN a Student_User navigates to `/group/activity-4`, THE Survey_System SHALL display the Activity 4 form with all required fields

### AC2: Lưu dữ liệu hoạt động
WHEN a Student_User submits the form, THE Survey_System SHALL save data to database and mark activity 4 as completed

### AC3: Quay về trang group
WHEN a Student_User clicks back button, THE Survey_System SHALL navigate back to `/group` page

## UI/UX Requirements

### Page Layout

**Header**:
- Icon: ✨
- Title: "Hoạt động 4: Bản vẽ toả sáng"
- Subtitle: "Tìm hiểu bản vẽ phát ra ánh sáng kỳ diệu"
- Color: Blue gradient (`from-blue-500 to-blue-600`)

**Back Button**:
- Text: "← Quay lại"
- Navigate to: `/group`

### Hướng dẫn chung

**Instruction Box** (hiển thị ở đầu form):
- Background: `bg-blue-50 border-l-4 border-blue-500`
- Icon: ✨
- Text: "Hoạt động tổng kết và phản tư. Nhóm nhìn lại toàn bộ quá trình, đánh giá sản phẩm và học hỏi từ các nhóm khác."

### Form Fields

**Câu 1: Điểm mạnh & cải tiến**

- **Label**: "Câu 1 - Điểm mạnh & cải tiến"
- **Context**:
  - Text: "Nhóm bạn nêu 1-2 điểm mạnh và 1 điểm cần cải thiện của sản phẩm cuối."
- **Example hints**:
  - "Điểm mạnh: thuyền nổi ổn định, thiết kế thẩm mỹ."
  - "Cải thiện: đáy thuyền hơi mỏng, cần gia cố."
- **Input Section 1**: Strengths
  - **Điểm mạnh** (Textarea, 4 rows)
    - Label: "1-2 điểm mạnh của sản phẩm"
    - Placeholder: "Nêu các điểm mạnh của thiết kế thuyền..."
    - Required: Yes
    - Validation: Minimum 50 characters
- **Input Section 2**: Improvements
  - **Điểm cần cải thiện** (Textarea, 4 rows)
    - Label: "1 điểm cần cải thiện"
    - Placeholder: "Nêu điểm cần cải thiện và cách khắc phục..."
    - Required: Yes
    - Validation: Minimum 40 characters

---

**Câu 2: Học hỏi từ nhóm khác**

- **Label**: "Câu 2 - Học hỏi từ nhóm khác"
- **Context**:
  - Text: "Nhóm bạn học được gì từ ý tưởng hoặc phản biện của nhóm khác?"
- **Example hint**:
  - Text: "Ví dụ: nhóm khác dùng vật liệu tái chế giúp thuyền nhẹ hơn → nhóm mình sẽ thử áp dụng."
  - Style: `text-sm text-gray-500 italic`
- **Input**:
  - Type: Textarea
  - Rows: 5
  - Placeholder: "Ghi lại những gì nhóm học được từ các nhóm khác..."
  - Required: Yes
  - Validation: Minimum 60 characters

---

**Câu 3: Bài học & cải tiến cá nhân**

- **Label**: "Câu 3 - Bài học & cải tiến cá nhân"
- **Context**:
  - Text: "Nêu 1 bài học quan trọng và 1 cách cải tiến nếu làm lại."
- **Example hint**:
  - Text: "Ví dụ: học cách viết prompt AI chính xác hơn để bản vẽ 3D chi tiết hơn."
  - Style: `text-sm text-gray-500 italic`
- **Input Section 1**: Lesson Learned
  - **Bài học quan trọng** (Textarea, 4 rows)
    - Label: "1 bài học quan trọng nhất"
    - Placeholder: "Bài học quan trọng nhất từ dự án này..."
    - Required: Yes
    - Validation: Minimum 40 characters
- **Input Section 2**: Future Improvement
  - **Cách cải tiến nếu làm lại** (Textarea, 4 rows)
    - Label: "1 cách cải tiến nếu làm lại"
    - Placeholder: "Nếu làm lại, nhóm sẽ cải tiến như thế nào..."
    - Required: Yes
    - Validation: Minimum 40 characters

### Submit Button
- Text: "Hoàn thành hoạt động"
- Background: `bg-gradient-to-r from-blue-500 to-blue-600`
- Action: Save data, mark completed, navigate back to `/group`

## API Endpoints

### POST /api/group-surveys/activity-4

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
  "message": "Activity 4 completed"
}
```

## Data Model

```typescript
interface Activity4Data {
  groupCode: string;
  
  // Câu 1: Điểm mạnh & cải tiến
  question1: {
    strengths: string; // 1-2 điểm mạnh
    improvements: string; // 1 điểm cần cải thiện
  };
  
  // Câu 2: Học hỏi từ nhóm khác
  question2: {
    learnings: string;
  };
  
  // Câu 3: Bài học & cải tiến cá nhân
  question3: {
    lesson: string; // Bài học quan trọng
    futureImprovement: string; // Cách cải tiến nếu làm lại
  };
  
  completedAt: Date;
}
```

## Validation Rules

### Câu 1
- Strengths: Required, minimum 50 characters
- Must list 1-2 specific strengths
- Improvements: Required, minimum 40 characters
- Must include specific improvement suggestion

### Câu 2
- Required: Yes
- Minimum length: 60 characters
- Should mention specific learnings from other groups

### Câu 3
- Lesson: Required, minimum 40 characters
- Must be a meaningful lesson learned
- Future improvement: Required, minimum 40 characters
- Must be a concrete improvement plan

## Notes

- Cần định nghĩa cụ thể các câu hỏi/fields cho hoạt động này
- Form có thể có nhiều bước (multi-step) nếu cần
- Có thể thêm upload ảnh nếu cần

