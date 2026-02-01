# Hoạt động 3: Thiết kế kỳ diệu

## User Story

**As a** Student_User  
**I want to** complete Activity 3 form to create complete technical drawings using AI  
**So that** my group can develop boat design from idea to 3D, 2D, and CAD drawings

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
- Title: "Hoạt động 3: Thiết kế kỳ diệu"
- Color: Indigo gradient (`from-indigo-500 to-indigo-600`)

**Back Button**:
- Text: "← Quay lại"
- Navigate to: `/group`

### Mục tiêu

**Purpose Box**:
- Background: `bg-indigo-50 border-l-4 border-indigo-500`
- Icon: 🎯
- Title: "I. Mục tiêu"
- Content:
  - "Tạo phác thảo thiết kế thuyền ban đầu đạt tiêu chí: nổi – ổn định – an toàn – thân thiện môi trường."
  - "Ứng dụng AI (Gemini, ChatGPT, Meshy AI) để tạo chuỗi bản vẽ kỹ thuật hoàn chỉnh: Ý tưởng → 3D → 2D → CAD."
  - "Hình thành tư duy thiết kế kỹ thuật dựa trên nguyên lý, kết cấu, vật liệu đã phân tích."

### Nhiệm vụ học tập

**Tasks Box**:
- Background: `bg-blue-50 border-l-4 border-blue-500`
- Icon: 📝
- Title: "II. Nhiệm vụ học tập"

### Form Fields

**Section 1: Phát triển ý tưởng**

- **Label**: "1. Phát triển ý tưởng"
- **Prompt AI định hướng** (5 fields):
  - **Mục đích** (Text input)
  - **Bối cảnh** (Text input)
  - **Tiêu chí** (Text input)
  - **Hình dạng cơ bản** (Text input)
  - **Chức năng đặc biệt** (Text input)
- **Prompt của tôi** (Textarea, 6 rows)
  - Placeholder: "Nhập prompt đầy đủ của bạn..."
  - Required: Yes
  - Validation: Minimum 50 characters
- **Ảnh minh họa ý tưởng** (File upload)
  - Accept: Images (jpg, png)
  - Multiple: Yes
  - Optional

---

**Section 2: Dựng mô hình 3D và tạo bản vẽ 2D (Pha 3.2 – 15 phút)**

- **Label**: "2. Dựng mô hình 3D và tạo bản vẽ 2D (Pha 3.2 – 15 phút)"
- **Mô hình 3D** (Textarea, 4 rows)
  - Placeholder: "Mô tả mô hình 3D..."
  - Required: Yes
  - Validation: Minimum 30 characters
- **Tải lên ảnh mô hình 3D** (File upload)
  - Accept: Images, 3D files (jpg, png, obj, stl)
  - Multiple: Yes
  - Optional
- **Ảnh kỹ thuật 2D** (3 file uploads):
  - **Mặt đứng** (File upload)
    - Label: "Mặt đứng:"
    - Accept: Images (jpg, png)
    - Help text: "Tải lên ảnh mặt đứng (JPG, PNG)"
  - **Mặt bằng** (File upload)
    - Label: "Mặt bằng:"
    - Accept: Images (jpg, png)
    - Help text: "Tải lên ảnh mặt bằng (JPG, PNG)"
  - **Mặt cạnh** (File upload)
    - Label: "Mặt cạnh:"
    - Accept: Images (jpg, png)
    - Help text: "Tải lên ảnh mặt cạnh (JPG, PNG)"

---

**Section 3: Chuyển sang bản vẽ CAD (Pha 3.3 – 10 phút)**

- **Label**: "3. Chuyển sang bản vẽ CAD (Pha 3.3 – 10 phút)"
- **File CAD/Hình ảnh CAD** (File upload)
  - Accept: CAD files, images (dwg, dxf, pdf, jpg, png)
  - Multiple: Yes
  - Optional

---

**Section 4: Sản phẩm cuối cùng**

- **Label**: "III. Sản phẩm cuối cùng"
- **Info box**:
  - Background: `bg-yellow-50 border-l-4 border-yellow-400`
  - Text: "Chuỗi bản vẽ hoàn chỉnh: Ảnh ý tưởng → Mô hình 3D → 3 ảnh kỹ thuật 2D → File CAD"
- **Nguyên vật liệu cần chuẩn bị** (Textarea, 5 rows)
  - Label: "Chuẩn bị cho Hoạt động 4 (Chế tạo mô hình) - Nguyên vật liệu cần chuẩn bị:"
  - Placeholder: "Liệt kê các nguyên vật liệu cần chuẩn bị..."
  - Required: Yes
  - Validation: Minimum 30 characters

---

**Section 5: Bảng tự đánh giá**

- **Label**: "IV. Bảng tự đánh giá"
- **Table format** with 5 criteria:
  - Columns: Tiêu chí | Đạt | Chưa đạt | Ghi chú
  - Rows:
    1. Ý tưởng tuân thủ tiêu chí kỹ thuật
    2. Mô hình 3D cân đối, hợp lý
    3. Ảnh 2D đủ ba mặt chiếu
    4. Bản vẽ CAD chính xác
    5. Hồ sơ thiết kế logic, mạch lạc
  - Each row has:
    - Checkbox for "Đạt"
    - Checkbox for "Chưa đạt"
    - Text input for "Ghi chú"

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
- Description: Required, minimum 20 characters
- Image upload: Optional
- If uploaded: jpg, png, pdf only, max 5MB

### Câu 2
- All 3 prompts: Required
- Each prompt: Minimum 20 characters
- Must be clear and specific

### Câu 3
- 3D drawing upload: Required
- Accepted formats: jpg, png, pdf, obj, stl
- Max size: 10MB
- Strengths: Required, minimum 20 characters
- Improvements: Required, minimum 20 characters

### Câu 4
- 2D drawing upload: Required (jpg, png, pdf, max 5MB)
- CAD file upload: Required (dwg, dxf, pdf, step, iges, max 10MB)
- Analysis: Required, minimum 20 characters

### Câu 5
- Final design upload: Required
- Accepted formats: jpg, png, pdf, dwg, dxf
- Max size: 10MB
- Evaluation: Required, minimum 20 characters
- Must include feasibility, safety, aesthetics, and improvements

## Notes

- Cần định nghĩa cụ thể các câu hỏi/fields cho hoạt động này
- Form có thể có nhiều bước (multi-step) nếu cần
- Có thể thêm upload ảnh nếu cần

