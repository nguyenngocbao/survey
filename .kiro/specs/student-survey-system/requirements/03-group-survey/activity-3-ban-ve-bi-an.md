# Hoạt động 3: Bản vẽ bí ẩn

## User Story

**As a** Student_User  
**I want to** complete Activity 3 form about mysterious maps  
**So that** my group can document our exploration of secret blueprints

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị form hoạt động 3
WHEN a Student_User navigates to `/group/activity-3`, THE Survey_System SHALL display the Activity 3 form with all required fields

### AC2: Lưu dữ liệu hoạt động
WHEN a Student_User submits the form, THE Survey_System SHALL save data to database and mark activity 3 as completed

### AC3: Quay về trang group
WHEN a Student_User clicks back button, THE Survey_System SHALL navigate back to `/group` page

## UI/UX Requirements

### Page Layout

**Header**:
- Icon: 🗺️
- Title: "Hoạt động 3: Bản vẽ bí ẩn"
- Subtitle: "Khám phá bản vẽ chứa đựng những bí mật"
- Color: Indigo gradient (`from-indigo-500 to-indigo-600`)

**Back Button**:
- Text: "← Quay lại"
- Navigate to: `/group`

### Hướng dẫn chung

**Instruction Box** (hiển thị ở đầu form):
- Background: `bg-indigo-50 border-l-4 border-indigo-500`
- Icon: 🗺️
- Text: "Hoạt động theo nhóm 3-5 học sinh. Sử dụng AI hỗ trợ tạo bản vẽ 3D, 2D, CAD. Chèn hình minh họa và lưu file để chuẩn bị chế tạo."

### Form Fields

**Câu 1: Chốt ý tưởng cuối cùng**

- **Label**: "Câu 1 - Chốt ý tưởng cuối cùng"
- **Context**:
  - Text: "Chọn ý tưởng nhóm để phát triển bản vẽ kỹ thuật."
  - Text: "Mô tả hình dáng, vật liệu, nguyên lý nổi, ưu điểm."
- **Example hint**:
  - Text: "Ví dụ: đáy cong, thân rộng, gỗ + chai nhựa, nổi tốt, ổn định."
  - Style: `text-sm text-gray-500 italic`
- **Input Section 1**: Description
  - **Mô tả ý tưởng** (Textarea, 6 rows)
    - Placeholder: "Hình dáng, vật liệu, nguyên lý nổi, ưu điểm..."
    - Required: Yes
    - Validation: Minimum 100 characters
- **Input Section 2**: Image Upload
  - **Upload hình minh họa** (File upload)
    - Label: "Tải lên hình minh họa ý tưởng"
    - Accept: Images (jpg, png, pdf)
    - Max size: 5MB
    - Optional
    - Preview: Show uploaded image

---

**Câu 2: Lập kế hoạch AI**

- **Label**: "Câu 2 - Lập kế hoạch AI"
- **Context**:
  - Text: "Xác định 3 bản vẽ: 3D, 2D, CAD."
  - Text: "Viết prompt AI ngắn gọn, rõ ràng."
- **Example hints**:
  - "3D: 'Thuyền đáy cong, thân rộng, vật liệu gỗ + chai nhựa, nổi tốt.'"
  - "2D: 'Chi tiết kích thước các bộ phận.'"
  - "CAD: 'File CAD chuẩn kỹ thuật.'"
- **Input**: 3 prompts
  - **Prompt cho bản vẽ 3D** (Textarea, 3 rows)
    - Label: "Prompt tạo bản vẽ 3D"
    - Placeholder: "Mô tả chi tiết cho AI tạo bản vẽ 3D..."
    - Required: Yes
  - **Prompt cho bản vẽ 2D** (Textarea, 3 rows)
    - Label: "Prompt tạo bản vẽ 2D"
    - Placeholder: "Mô tả chi tiết cho AI tạo bản vẽ 2D..."
    - Required: Yes
  - **Prompt cho file CAD** (Textarea, 3 rows)
    - Label: "Prompt tạo file CAD"
    - Placeholder: "Mô tả chi tiết cho AI tạo file CAD..."
    - Required: Yes

---

**Câu 3: Tạo và đánh giá bản vẽ 3D**

- **Label**: "Câu 3 - Tạo và đánh giá bản vẽ 3D"
- **Context**:
  - Text: "Tạo bản vẽ 3D bằng AI hoặc công cụ khác."
  - Text: "Chèn hình minh họa."
  - Text: "Ghi điểm mạnh & cần cải thiện."
- **Example hint**:
  - Text: "Ví dụ: mô hình trực quan nhưng kích thước chưa chuẩn."
- **Input Section 1**: Upload 3D
  - **Upload bản vẽ 3D** (File upload)
    - Label: "Tải lên hình bản vẽ 3D"
    - Accept: Images, 3D files (jpg, png, pdf, obj, stl)
    - Max size: 10MB
    - Required: Yes
    - Preview: Show uploaded file
- **Input Section 2**: Evaluation
  - **Điểm mạnh** (Textarea, 3 rows)
    - Label: "Điểm mạnh của bản vẽ 3D"
    - Placeholder: "Ghi các điểm mạnh..."
    - Required: Yes
  - **Cần cải thiện** (Textarea, 3 rows)
    - Label: "Điểm cần cải thiện"
    - Placeholder: "Ghi các điểm cần cải thiện..."
    - Required: Yes

---

**Câu 4: Tạo bản vẽ 2D & CAD**

- **Label**: "Câu 4 - Tạo bản vẽ 2D & CAD"
- **Context**:
  - Text: "Dựa trên 3D, tạo 2D & CAD."
  - Text: "Chèn hình/file, ghi điểm khác biệt & điều chỉnh."
- **Example hint**:
  - Text: "Ví dụ: 2D có kích thước chuẩn, CAD chuẩn kỹ thuật."
- **Input Section 1**: Upload 2D
  - **Upload bản vẽ 2D** (File upload)
    - Label: "Tải lên hình bản vẽ 2D"
    - Accept: Images, PDF (jpg, png, pdf)
    - Max size: 5MB
    - Required: Yes
    - Preview: Show uploaded file
- **Input Section 2**: Upload CAD
  - **Upload file CAD** (File upload)
    - Label: "Tải lên file CAD"
    - Accept: CAD files (dwg, dxf, pdf, step, iges)
    - Max size: 10MB
    - Required: Yes
    - Show filename after upload
- **Input Section 3**: Analysis
  - **Điểm khác biệt & điều chỉnh** (Textarea, 5 rows)
    - Label: "So sánh 2D, CAD với 3D - Điểm khác biệt và điều chỉnh"
    - Placeholder: "Ghi các điểm khác biệt và điều chỉnh đã thực hiện..."
    - Required: Yes
    - Validation: Minimum 80 characters

---

**Câu 5: Chốt bản thiết kế cuối & phản biện**

- **Label**: "Câu 5 - Chốt bản thiết kế cuối & phản biện"
- **Context**:
  - Text: "So sánh với nhóm khác, chọn bản cuối cùng."
  - Text: "Giải thích tại sao khả thi, an toàn, thẩm mỹ, đề xuất cải thiện."
- **Example hint**:
  - Text: "Ví dụ: đáy thuyền dày hơn để chống rò nước."
- **Input Section 1**: Final Design Upload
  - **Upload bản vẽ hoàn chỉnh** (File upload)
    - Label: "Tải lên bản vẽ thiết kế cuối cùng"
    - Accept: Images, PDF, CAD (jpg, png, pdf, dwg, dxf)
    - Max size: 10MB
    - Required: Yes
    - Preview/Show filename
- **Input Section 2**: Final Evaluation
  - **Giải thích & đề xuất cải thiện** (Textarea, 8 rows)
    - Label: "Tại sao thiết kế này khả thi, an toàn, thẩm mỹ? Đề xuất cải thiện?"
    - Placeholder: "Nhóm giải thích và đề xuất cải thiện..."
    - Required: Yes
    - Validation: Minimum 150 characters

### Submit Button
- Text: "Hoàn thành hoạt động"
- Background: `bg-gradient-to-r from-indigo-500 to-indigo-600`
- Action: Save data, mark completed, navigate back to `/group`

## API Endpoints

### POST /api/group-surveys/activity-3

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
  "message": "Activity 3 completed"
}
```

## Data Model

```typescript
interface Activity3Data {
  groupCode: string;
  
  // Câu 1: Chốt ý tưởng cuối cùng
  question1: {
    description: string;
    imageUrl?: string;
  };
  
  // Câu 2: Lập kế hoạch AI
  question2: {
    prompt3D: string;
    prompt2D: string;
    promptCAD: string;
  };
  
  // Câu 3: Tạo và đánh giá bản vẽ 3D
  question3: {
    drawing3DUrl: string;
    strengths: string;
    improvements: string;
  };
  
  // Câu 4: Tạo bản vẽ 2D & CAD
  question4: {
    drawing2DUrl: string;
    cadFileUrl: string;
    analysis: string;
  };
  
  // Câu 5: Chốt bản thiết kế cuối
  question5: {
    finalDesignUrl: string;
    evaluation: string;
  };
  
  completedAt: Date;
}
```

## Validation Rules

### Câu 1
- Description: Required, minimum 100 characters
- Image upload: Optional
- If uploaded: jpg, png, pdf only, max 5MB

### Câu 2
- All 3 prompts: Required
- Each prompt: Minimum 30 characters
- Must be clear and specific

### Câu 3
- 3D drawing upload: Required
- Accepted formats: jpg, png, pdf, obj, stl
- Max size: 10MB
- Strengths: Required, minimum 50 characters
- Improvements: Required, minimum 50 characters

### Câu 4
- 2D drawing upload: Required (jpg, png, pdf, max 5MB)
- CAD file upload: Required (dwg, dxf, pdf, step, iges, max 10MB)
- Analysis: Required, minimum 80 characters

### Câu 5
- Final design upload: Required
- Accepted formats: jpg, png, pdf, dwg, dxf
- Max size: 10MB
- Evaluation: Required, minimum 150 characters
- Must include feasibility, safety, aesthetics, and improvements

## Notes

- Cần định nghĩa cụ thể các câu hỏi/fields cho hoạt động này
- Form có thể có nhiều bước (multi-step) nếu cần
- Có thể thêm upload ảnh nếu cần

