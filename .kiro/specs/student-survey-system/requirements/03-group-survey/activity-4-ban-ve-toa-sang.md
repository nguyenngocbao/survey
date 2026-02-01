# Hoạt động 4: Bản vẽ toả sáng

## User Story

**As a** Student_User  
**I want to** complete Activity 4 form to present design process and evaluate results  
**So that** my group can finalize technical documentation and assess boat model against criteria

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
- Color: Blue gradient (`from-blue-500 to-blue-600`)

**Back Button**:
- Text: "← Quay lại"
- Navigate to: `/group`

### Mục tiêu

**Purpose Box**:
- Background: `bg-blue-50 border-l-4 border-blue-500`
- Icon: 🎯
- Title: "I. Mục tiêu"
- Content:
  - "Trình bày và phản biện quy trình thiết kế thuyền."
  - "Đánh giá kết quả thử nghiệm và đề xuất cải tiến."
  - "Hoàn thiện hồ sơ kỹ thuật số và mô hình thuyền đáp ứng tiêu chí: nổi - ổn định - an toàn - thân thiện môi trường."

### Nhiệm vụ học tập

**Tasks Box**:
- Background: `bg-cyan-50 border-l-4 border-cyan-500`
- Icon: 📝
- Title: "II. Nhiệm vụ học tập"

### Form Fields

**Câu hỏi 1: Quy trình thiết kế và kết quả thử nghiệm**

- **Label**: "Quy trình thiết kế và kết quả thử nghiệm:"
- **Context**:
  - Text: "Hãy mô tả ngắn gọn các bước thiết kế bạn thực hiện, kết quả thử nghiệm nổi/chìm và các cải tiến đã đề xuất."
- **Input**:
  - Type: Textarea
  - Rows: 8
  - Placeholder: "Nhập câu trả lời của nhóm..."
  - Required: Yes
  - Validation: Minimum 50 characters

---

**Câu hỏi 2: Vai trò AI trong thiết kế và hoàn thiện hồ sơ**

- **Label**: "Vai trò AI trong thiết kế và hoàn thiện hồ sơ:"
- **Context**:
  - Text: "AI đã hỗ trợ bạn những gì trong quá trình thiết kế, phân tích và lập hồ sơ kỹ thuật?"
- **Input**:
  - Type: Textarea
  - Rows: 8
  - Placeholder: "Nhập câu trả lời của nhóm..."
  - Required: Yes
  - Validation: Minimum 50 characters

---

**Câu hỏi 3: Hồ sơ kỹ thuật và đánh giá sản phẩm**

- **Label**: "Hồ sơ kỹ thuật và đánh giá sản phẩm:"
- **Context**:
  - Text: "Hồ sơ kỹ thuật của nhóm bạn có đầy đủ các bản vẽ, nhật ký, mô hình và đáp ứng tiêu chí kỹ thuật không? Hãy tự đánh giá."
- **Input**:
  - Type: Textarea
  - Rows: 8
  - Placeholder: "Nhập câu trả lời của nhóm..."
  - Required: Yes
  - Validation: Minimum 50 characters
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
- Strengths: Required, minimum 20 characters
- Must list 1-2 specific strengths
- Improvements: Required, minimum 20 characters
- Must include specific improvement suggestion

### Câu 2
- Required: Yes
- Minimum length: 20 characters
- Should mention specific learnings from other groups

### Câu 3
- Lesson: Required, minimum 20 characters
- Must be a meaningful lesson learned
- Future improvement: Required, minimum 40 characters
- Must be a concrete improvement plan

## Notes

- Cần định nghĩa cụ thể các câu hỏi/fields cho hoạt động này
- Form có thể có nhiều bước (multi-step) nếu cần
- Có thể thêm upload ảnh nếu cần

