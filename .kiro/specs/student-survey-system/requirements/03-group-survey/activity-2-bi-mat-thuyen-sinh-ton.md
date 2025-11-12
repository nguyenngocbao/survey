# Hoạt động 2: Bí mật thuyền sinh tồn

## User Story

**As a** Student_User  
**I want to** complete Activity 2 form about survival boat mysteries  
**So that** my group can document our exploration of survival secrets

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
- Title: "Hoạt động 2: Bí mật thuyền sinh tồn"
- Subtitle: "Giải mã những bí mật huyền bí của sự sống"
- Color: Purple gradient (`from-purple-500 to-purple-600`)

**Back Button**:
- Text: "← Quay lại"
- Navigate to: `/group`

### Hướng dẫn chung

**Instruction Box** (hiển thị ở đầu form):
- Background: `bg-purple-50 border-l-4 border-purple-500`
- Icon: 🔮
- Text: "Hoạt động theo nhóm 3-5 bạn. Quan sát video/hình ảnh, thảo luận, điền câu trả lời trực tiếp. Sử dụng AI như trợ lý gợi ý, nhưng nhóm quyết định giữ hay điều chỉnh kết quả."

### Form Fields

**Câu 1: Phân tích yếu tố nổi và cân bằng**

- **Label**: "Câu 1 - Phân tích yếu tố nổi và cân bằng"
- **Context**:
  - Text: "Quan sát các loại thuyền: đánh cá, du thuyền, thuyền chở hàng."
  - Text: "Những yếu tố nào giúp thuyền nổi tốt và cân bằng ổn định?"
  - Text: "Theo nhóm, hình dạng, vật liệu và cấu trúc nào quan trọng nhất?"
  - Text: "Giải thích ngắn gọn lý do khoa học."
- **Input**:
  - Type: Textarea
  - Rows: 6
  - Placeholder: "Nhóm ghi 3-5 yếu tố + lý do khoa học..."
  - Required: Yes
  - Validation: Minimum 80 characters

---

**Câu 2: Nguyên tắc viết prompt AI**

- **Label**: "Câu 2 - Nguyên tắc viết prompt AI"
- **Context**:
  - Text: "Nhóm đề xuất 3 nguyên tắc viết prompt hiệu quả để AI gợi ý ý tưởng thuyền, kèm ví dụ minh họa ngắn."
- **Example hints**:
  - "Ngắn gọn + rõ mục tiêu → 'Gợi ý 3 kiểu thuyền từ vật liệu tái chế'"
  - "Cụ thể + chi tiết → 'Thuyền nhỏ, nổi tốt, dùng gỗ và chai nhựa'"
- **Input**: Dynamic list (3 items)
  - Each item has:
    - **Nguyên tắc** (Text input)
      - Placeholder: "Nguyên tắc {number}"
    - **Ví dụ minh họa** (Text input)
      - Placeholder: "Ví dụ prompt cụ thể"
  - Layout: 2 columns
  - Required: All 3 items must be filled

---

**Câu 3: Thử prompt & so sánh kết quả**

- **Label**: "Câu 3 - Thử prompt & so sánh kết quả"
- **Context**:
  - Text: "Nhập 1-2 prompt khác nhau vào AI (ngắn, dài, cụ thể, mơ hồ)."
  - Text: "Ghi lại kết quả: hình dạng, vật liệu, ưu điểm."
  - Text: "So sánh và thảo luận: tại sao kết quả khác nhau?"
  - Text: "Nhóm tick chọn các ý tưởng khả thi nhất để đưa vào bước tiếp theo."
- **Input Section 1**: Prompt Testing
  - **Prompt 1** (Textarea, 3 rows)
    - Label: "Prompt thứ nhất"
    - Placeholder: "Nhập prompt đầu tiên..."
  - **Kết quả AI 1** (Textarea, 4 rows)
    - Label: "Kết quả từ AI (hình dạng, vật liệu, ưu điểm)"
    - Placeholder: "Ghi lại kết quả AI trả về..."
  - **Prompt 2** (Textarea, 3 rows) - Optional
    - Label: "Prompt thứ hai (tùy chọn)"
    - Placeholder: "Nhập prompt thứ hai..."
  - **Kết quả AI 2** (Textarea, 4 rows) - Optional
    - Label: "Kết quả từ AI"
    - Placeholder: "Ghi lại kết quả AI trả về..."
- **Input Section 2**: Analysis & Selection
  - **So sánh & thảo luận** (Textarea, 5 rows)
    - Label: "Tại sao kết quả khác nhau?"
    - Placeholder: "Nhóm thảo luận và phân tích..."
    - Required: Yes
  - **Ý tưởng được chọn** (Checkboxes)
    - Label: "Tick chọn ý tưởng khả thi"
    - Options: Dynamic based on AI results
    - Allow multiple selections

---

**Câu 4: Chốt ý tưởng sơ bộ**

- **Label**: "Câu 4 - Chốt ý tưởng sơ bộ"
- **Context**:
  - Text: "Dựa trên các yếu tố khoa học, kết quả AI, và tiêu chí đánh giá ở Hoạt động 1:"
  - Text: "Nhóm chọn 1 ý tưởng khả thi nhất."
  - Text: "Mô tả hoặc vẽ sơ bộ (bằng tay hoặc AI): hình dạng, vật liệu, nguyên lý nổi, ưu điểm nổi bật."
- **Input Section 1**: Description
  - **Mô tả ý tưởng** (Textarea, 8 rows)
    - Label: "Mô tả chi tiết ý tưởng thuyền"
    - Placeholder: "Hình dạng, vật liệu, nguyên lý nổi, ưu điểm..."
    - Required: Yes
    - Validation: Minimum 150 characters
- **Input Section 2**: Sketch Upload
  - **Upload hình/phác thảo** (File upload)
    - Label: "Tải lên hình vẽ hoặc phác thảo"
    - Accept: Images (jpg, png, pdf)
    - Max size: 5MB
    - Optional
    - Preview: Show uploaded image

---

**Câu 5: Phản biện & cải thiện**

- **Label**: "Câu 5 - Phản biện & cải thiện"
- **Context**:
  - Text: "Giải thích tại sao ý tưởng này khả thi, khoa học, an toàn và phù hợp tiêu chí đánh giá."
  - Text: "Nếu được thử nghiệm thực tế, nhóm sẽ chỉnh sửa gì để tối ưu hơn?"
- **Input**:
  - Type: Textarea
  - Rows: 8
  - Placeholder: "Nhóm phản biện và đề xuất cải thiện..."
  - Required: Yes
  - Validation: Minimum 150 characters

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
  
  // Câu 1: Phân tích yếu tố nổi và cân bằng
  question1: {
    analysis: string; // 3-5 yếu tố + lý do
  };
  
  // Câu 2: Nguyên tắc viết prompt AI
  question2: {
    principles: Array<{
      principle: string;
      example: string;
    }>; // 3 items
  };
  
  // Câu 3: Thử prompt & so sánh
  question3: {
    prompt1: string;
    result1: string;
    prompt2?: string;
    result2?: string;
    comparison: string;
    selectedIdeas: string[];
  };
  
  // Câu 4: Chốt ý tưởng sơ bộ
  question4: {
    description: string;
    sketchUrl?: string; // URL of uploaded image
  };
  
  // Câu 5: Phản biện & cải thiện
  question5: {
    critique: string;
  };
  
  completedAt: Date;
}
```

## Validation Rules

### Câu 1
- Required: Yes
- Minimum length: 80 characters
- Must describe 3-5 factors with scientific reasoning

### Câu 2
- Required: All 3 principles and examples must be filled
- Each principle: Minimum 10 characters
- Each example: Minimum 20 characters

### Câu 3
- Prompt 1: Required, minimum 20 characters
- Result 1: Required, minimum 50 characters
- Prompt 2: Optional
- Result 2: Optional (required if Prompt 2 is filled)
- Comparison: Required, minimum 80 characters
- Selected ideas: At least 1 must be selected

### Câu 4
- Description: Required, minimum 150 characters
- Sketch upload: Optional
- If uploaded, file must be image format (jpg, png, pdf)
- Max file size: 5MB

### Câu 5
- Required: Yes
- Minimum length: 150 characters
- Must include both critique and improvement suggestions

## Notes

- Cần định nghĩa cụ thể các câu hỏi/fields cho hoạt động này
- Form có thể có nhiều bước (multi-step) nếu cần
- Có thể thêm upload ảnh nếu cần

