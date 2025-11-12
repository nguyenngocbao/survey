# Hoạt động 1: Bí ẩn đại dương

## User Story

**As a** Student_User  
**I want to** complete Activity 1 form about ocean mysteries  
**So that** my group can document our exploration of ocean secrets

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

### Hướng dẫn chung

**Instruction Box** (hiển thị ở đầu form):
- Background: `bg-blue-50 border-l-4 border-blue-500`
- Icon: 🌊
- Text: "Nhóm 3-5 bạn là thuyền trưởng và kỹ sư, đang thử nghiệm thuyền vượt lũ. Trả lời từng câu trên web hoặc điện thoại. Bạn có thể dùng AI như 'trợ lý thông minh', nhưng nhóm là người quyết định cuối cùng."

### Form Fields

**Câu 1: Nhập vai sinh tồn**

- **Label**: "Câu 1 - Nhập vai sinh tồn"
- **Context** (hiển thị trên label):
  - Text: "Bạn là một chiếc thuyền đang lướt giữa sông nước nổi sóng. Sóng lớn, gió mạnh xuất hiện…"
  - Style: `text-gray-700 mb-2`
- **Questions** (hiển thị dưới dạng list):
  - "Điều gì khiến bạn nổi được hay chìm xuống?"
  - "Điều gì khiến bạn dễ nghiêng hoặc khó giữ thăng bằng?"
- **Example hint**:
  - Text: "Ví dụ minh họa: chiều dài/thân rộng, vật liệu, trọng lượng, trọng tâm, đáy thuyền."
  - Style: `text-sm text-gray-500 italic`
- **Input**:
  - Type: Textarea
  - Rows: 6
  - Placeholder: "Nhóm ghi 3-5 yếu tố..."
  - Required: Yes
  - Validation: Minimum 50 characters

---

**Câu 2: Thử thách kỹ sư**

- **Label**: "Câu 2 - Thử thách kỹ sư"
- **Context**:
  - Text: "Bạn là kỹ sư thiết kế thuyền."
  - Text: "Viết ra 5 tiêu chí quan trọng nhất để thuyền vượt sóng an toàn và bền lâu."
  - Text: "Mỗi tiêu chí đi kèm 1 lý do ngắn gọn."
- **Example hint**:
  - Text: "Ví dụ: 'Thân thuyền rộng → giúp thuyền ổn định trên sóng lớn'"
  - Style: `text-sm text-gray-500 italic`
- **Input**: Dynamic list (5 items)
  - Each item has:
    - **Tiêu chí** (Text input)
      - Placeholder: "Tiêu chí {number}"
    - **Lý do** (Text input)
      - Placeholder: "Lý do cho tiêu chí này"
  - Layout: 2 columns (Tiêu chí | Lý do)
  - Required: All 5 items must be filled

---

**Câu 3: Kho báu phân loại**

- **Label**: "Câu 3 - Kho báu phân loại"
- **Context**:
  - Text: "Nhóm bạn có 4 kho báu: Kỹ thuật - Thẩm mỹ - Kinh tế - Bền vững."
  - Text: "Hãy xếp các tiêu chí vừa viết vào kho báu phù hợp."
- **Example hint**:
  - Text: "Ví dụ: 'Thân thuyền bằng gỗ nhẹ → Kỹ thuật; màu sắc → Thẩm mỹ'"
  - Style: `text-sm text-gray-500 italic`
- **Input**: Mapping interface
  - Display 5 criteria from Câu 2 (read-only)
  - For each criterion, dropdown to select category:
    - Options: "Kỹ thuật", "Thẩm mỹ", "Kinh tế", "Bền vững"
  - Layout: Table or card-based
  - Required: All 5 must be categorized

---

**Câu 4: Trợ lý AI thám hiểm**

- **Label**: "Câu 4 - Trợ lý AI thám hiểm"
- **Context**:
  - Text: "Hỏi AI: 'Gợi ý 5 tiêu chí đánh giá thuyền vùng ngập lũ'."
  - Text: "Tiêu chí nào giữ lại, điều chỉnh hay loại bỏ? Tại sao?"
- **Example hint**:
  - Text: "Ví dụ gợi ý AI: 'Chống lật, tiết kiệm vật liệu, dễ sửa chữa, chịu nước, an toàn cho người dùng'"
  - Style: `text-sm text-gray-500 italic`
- **Input**:
  - Type: Textarea
  - Rows: 8
  - Placeholder: "Nhóm thảo luận và ghi lại quyết định về các tiêu chí từ AI..."
  - Required: Yes
  - Validation: Minimum 100 characters

---

**Câu 5: Chốt tiêu chí & phiêu lưu cuối**

- **Label**: "Câu 5 - Chốt tiêu chí & phiêu lưu cuối"
- **Context**:
  - Text: "Nhóm bạn chốt bộ tiêu chí cuối cùng (ít nhất 5 tiêu chí)."
  - Text: "Giải thích tại sao bộ tiêu chí này khoa học, khách quan và dễ áp dụng."
- **Example hint**:
  - Text: "Ví dụ: 'Thân rộng + nhẹ → ổn định; vật liệu bền → tuổi thọ cao'"
  - Style: `text-sm text-gray-500 italic`
- **Input**:
  - Type: Textarea
  - Rows: 8
  - Placeholder: "Nhóm ghi bộ tiêu chí cuối cùng và giải thích..."
  - Required: Yes
  - Validation: Minimum 150 characters

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
  
  // Câu 1: Nhập vai sinh tồn
  question1: {
    factors: string; // 3-5 yếu tố
  };
  
  // Câu 2: Thử thách kỹ sư
  question2: {
    criteria: Array<{
      criterion: string;
      reason: string;
    }>; // 5 items
  };
  
  // Câu 3: Kho báu phân loại
  question3: {
    categorization: Array<{
      criterion: string;
      category: 'Kỹ thuật' | 'Thẩm mỹ' | 'Kinh tế' | 'Bền vững';
    }>; // 5 items
  };
  
  // Câu 4: Trợ lý AI thám hiểm
  question4: {
    aiAnalysis: string;
  };
  
  // Câu 5: Chốt tiêu chí
  question5: {
    finalCriteria: string;
  };
  
  completedAt: Date;
}
```

## Validation Rules

### Câu 1
- Required: Yes
- Minimum length: 20 characters
- Must contain at least 3 distinct points

### Câu 2
- Required: All 5 criteria and reasons must be filled
- Each criterion: Minimum 10 characters
- Each reason: Minimum 15 characters

### Câu 3
- Required: All 5 criteria must be categorized
- Each must have a valid category selection

### Câu 4
- Required: Yes
- Minimum length: 20 characters
- Should discuss AI suggestions

### Câu 5
- Required: Yes
- Minimum length: 20 characters
- Should include final criteria list and explanation

## Notes

- Cần định nghĩa cụ thể các câu hỏi/fields cho hoạt động này
- Form có thể có nhiều bước (multi-step) nếu cần
- Có thể thêm upload ảnh nếu cần

