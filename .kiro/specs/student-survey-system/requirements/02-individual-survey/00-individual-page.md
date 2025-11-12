# Trang Khảo sát Cá nhân (Individual Survey Page)

## User Story

**As a** Student_User  
**I want to** access a comprehensive individual survey page with clear sections  
**So that** I can easily input personal information, share my perspective, and view statistics

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị trang khảo sát cá nhân
WHEN a Student_User navigates to `/individual`, THE Survey_System SHALL display a page with 4 main sections: header card, personal info form, perspective form, and statistics

### AC2: Quay về trang chủ
WHEN a Student_User clicks the back button, THE Survey_System SHALL navigate back to the home page at `/`

### AC3: Nộp khảo sát
WHEN a Student_User clicks "Nộp bài khảo sát" button, THE Survey_System SHALL validate all required fields, save both personal info and perspective data to database, update statistics, and show success message

### AC4: Validation trước khi nộp
WHEN a Student_User clicks submit with missing required fields, THE Survey_System SHALL display error messages indicating which fields need to be completed

### AC5: Hiển thị thống kê
WHEN survey data is updated, THE Survey_System SHALL display real-time statistics including completed and in-progress surveys

## UI/UX Requirements

### Page Layout

**Container**:
- Full screen with gradient background
- Max width: `max-w-6xl mx-auto`
- Padding: `px-4 py-8`
- Spacing between sections: `gap-8`

**Back Button**:
- Position: Top left
- Text: "Quay về trang chủ"
- Icon: Left arrow
- Color: `text-red-700 hover:text-red-900`
- Font: `text-sm font-medium`

---

## Section 1: Header Card (Thông tin chung)

**Purpose**: Giới thiệu tổng quan về khảo sát cá nhân

**Container**:
- Component: `<Card>`
- Padding: `p-8`
- Background: `bg-white/95 backdrop-blur-sm`
- Shadow: `shadow-2xl`
- Border: `border-0`
- Max width: Full width of container

**Icon Section**:
- Container: Circular div
  - Size: `w-24 h-24`
  - Background: `bg-gradient-to-r from-teal-500 to-cyan-600`
  - Position: `mx-auto` (centered)
- Icon: Person icon
  - SVG path: Single person icon
  - Size: `w-12 h-12`
  - Color: `text-white`

**Title Section**:
- Title: "Hoạt động cá nhân"
  - Font: `text-3xl font-bold`
  - Color: `text-gray-800`
  - Margin: `mb-3`
  - Alignment: Center

**Description**:
- Text: "Mở khóa tệp tin cảm xúc. Chỉ bạn thấy góc nhìn riêng."
- Font: `text-gray-600`
- Style: `leading-relaxed`
- Alignment: Center
- Max width: `max-w-2xl mx-auto`

---

## Section 2: Thông tin Cá nhân

**Purpose**: Form nhập thông tin cơ bản của học sinh

**Container**:
- Component: `<Card>`
- Padding: `p-8`
- Background: `bg-white/95 backdrop-blur-sm`
- Shadow: `shadow-xl`
- Border: `border-0`

**Section Title**:
- Text: "Thông tin cá nhân"
- Font: `text-2xl font-bold`
- Color: `text-gray-800`
- Icon: 📝 (teal gradient circle)

**Form Fields**:

### Thông tin cơ bản

1. **Họ và tên** * (Required)
   - Type: Text input
   - Placeholder: "Nguyễn Văn A"
   - Full width

2. **Lớp** * (Required)
   - Type: Text input
   - Placeholder: "10A1"
   - Half width


---

## Section 3: Góc nhìn của bạn

**Purpose**: Thu thập cảm xúc, trải nghiệm và góc nhìn cá nhân của học sinh về hoạt động

**Container**:
- Component: `<Card>`
- Padding: `p-8`
- Background: `bg-white/95 backdrop-blur-sm`
- Shadow: `shadow-xl`
- Border: `border-0`

**Section Title**:
- Text: "Góc nhìn của bạn"
- Font: `text-2xl font-bold`
- Color: `text-gray-800`
- Icon: 👁️ (cyan gradient circle)

**Form Fields**:

### Câu 1: Cảm xúc của bạn hôm nay * (Required)

- **Label**: "Câu 1 - Cảm xúc của bạn hôm nay"
- **Context**:
  - Text: "Nếu hôm nay là một màu sắc hoặc một biểu tượng, bạn sẽ chọn gì để thể hiện cảm xúc khi tham gia hoạt động? Giải thích ngắn gọn."
- **Example hint**:
  - Text: "Ví dụ: 🌊 vì vừa thú vị vừa 'bập bềnh' khi thử AI tạo thuyền; hoặc ⚡ vì năng động và sáng tạo."
  - Style: `text-sm text-gray-500 italic`
- **Input**:
  - Type: Textarea
  - Rows: 4
  - Placeholder: "Chọn màu sắc hoặc biểu tượng và giải thích..."
  - Required: Yes
  - Validation: Minimum 20 characters

### Câu 2: Phần bạn thích nhất & "Wow!" moment * (Required)

- **Label**: "Câu 2 - Phần bạn thích nhất & 'Wow!' moment"
- **Context**:
  - Text: "Trong buổi học, khoảnh khắc nào khiến bạn nói 'Wow!' hoặc thích thú nhất, và bạn học được gì từ đó?"
- **Example hint**:
  - Text: "Ví dụ: Khi AI biến prompt thành bản vẽ 3D, học cách mô tả chi tiết để AI hiểu đúng."
  - Style: `text-sm text-gray-500 italic`
- **Input**:
  - Type: Textarea
  - Rows: 5
  - Placeholder: "Khoảnh khắc 'Wow!' và điều bạn học được..."
  - Required: Yes
  - Validation: Minimum 30 characters

### Câu 3: Tương lai của trải nghiệm * (Required)

- **Label**: "Câu 3 - Tương lai của trải nghiệm"
- **Context**:
  - Text: "Nếu được tạo buổi học tiếp theo theo phong cách này, bạn sẽ muốn giữ, thay đổi hay thêm gì để vui hơn và học hiệu quả hơn?"
- **Example hint**:
  - Text: "Ví dụ: Thêm mini game phản biện hoặc thử nghiệm vật liệu thật cho thuyền."
  - Style: `text-sm text-gray-500 italic`
- **Input**:
  - Type: Textarea
  - Rows: 5
  - Placeholder: "Đề xuất của bạn cho buổi học tiếp theo..."
  - Required: Yes
  - Validation: Minimum 30 characters

---

## Section 4: Nộp bài khảo sát

**Purpose**: Submit button để nộp toàn bộ khảo sát

**Container**:
- Padding: `py-8`
- Alignment: Center

**Submit Button**:
- Text: "Nộp bài khảo sát" hoặc "Gửi khảo sát"
- Icon: Check circle icon
- Background: `bg-gradient-to-r from-indigo-500 to-purple-600`
- Size: Large (`px-12 py-6 text-lg`)
- Shadow: `shadow-xl hover:shadow-2xl`
- Hover effect: Scale and enhanced shadow
- Action: 
  1. Validate all required fields
  2. Save personal info and perspective to database
  3. Update statistics
  4. Show success message
  5. Optionally redirect to thank you page or home

---

## Section 5: Thống kê

**Purpose**: Hiển thị thống kê về số lượng học sinh đã hoàn thành khảo sát

**Container**:
- Component: `<Card>`
- Padding: `p-8`
- Background: `bg-white/95 backdrop-blur-sm`
- Shadow: `shadow-xl`
- Border: `border-0`

**Section Title**:
- Text: "Thống kê khảo sát"
- Font: `text-2xl font-bold`
- Color: `text-gray-800`
- Icon: 📊 (gradient circle)

**Stats Grid**:
- Layout: `grid grid-cols-1 md:grid-cols-2 gap-6`

### Stat Card Template

**Structure**:
- Padding: `p-6`
- Background: `bg-gradient-to-br from-{color}-50 to-{color}-100`
- Border: `border-2 border-{color}-200`
- Rounded: `rounded-xl`

**Content**:
1. **Icon** (Top)
   - Size: `w-10 h-10`
   - Color: Matching gradient

2. **Value** (Center)
   - Font: `text-4xl font-bold`
   - Color: `text-gray-800`

3. **Label** (Bottom)
   - Font: `text-sm text-gray-600 font-medium`

### 2 Stats

**Stat 1: Đã hoàn thành**
- Icon: ✅
- Value: Dynamic (số lượng khảo sát đã hoàn thành)
- Label: "Đã hoàn thành"
- Color: `green`

**Stat 2: Đang hoàn thành**
- Icon: ⏳
- Value: Dynamic (số lượng khảo sát đang thực hiện)
- Label: "Đang hoàn thành"
- Color: `orange`

---

## Technical Requirements

### Route
- Path: `/individual`
- Component: `app/individual/page.tsx`

### State Management
- Use React state for form data
- Store studentId in localStorage
- Track completion status for each section

### API Endpoints

**POST /api/individual-surveys/submit**
- Save complete survey (personal info + perspective)
- Request body: Full IndividualSurvey object
- Return success status and surveyId

**GET /api/individual-surveys/stats**
- Get real-time statistics
- Return completed count, in-progress count

### Data Flow

```
User lands on /individual
  ↓
Display all 5 sections (Header, Personal Info, Perspective, Submit Button, Stats)
  ↓
User fills personal info fields
  ↓
User fills perspective fields
  ↓
User clicks "Nộp bài khảo sát"
  ↓
Validate all required fields
  ↓
POST to /api/individual-surveys/submit (both personal + perspective)
  ↓
Save to database
  ↓
Update stats
  ↓
Show success message "🎉 Cảm ơn bạn đã hoàn thành khảo sát!"
  ↓
Optionally redirect or clear form
```

## Validation Rules

### Personal Info
- Họ và tên: Required, minimum 2 characters
- Lớp: Required
- Email: Optional, but must be valid format if filled
- Số điện thoại: Optional

### Perspective (Góc nhìn của bạn)
- Câu 1 - Cảm xúc: Required, minimum 20 characters
- Câu 2 - Wow moment: Required, minimum 30 characters
- Câu 3 - Tương lai: Required, minimum 30 characters

## Colors & Styling

### Section Colors
- Header Card: Teal-Cyan gradient (`from-teal-500 to-cyan-600`)
- Personal Info: Teal accent
- Perspective: Cyan accent
- Statistics: Multi-color (teal, cyan, blue)

### Responsive Breakpoints
- Mobile (< 768px): Single column, stacked sections
- Tablet (768px - 1024px): Single column, wider
- Desktop (> 1024px): Single column, max-w-6xl

## Accessibility

- Keyboard navigation support
- Clear focus indicators
- Screen reader friendly labels
- High contrast colors
- Form validation messages

## Performance

- Auto-save draft every 30 seconds (optional)
- Cache data in localStorage
- Debounce auto-save
- Optimize re-renders with React.memo

## Data Model

```typescript
interface IndividualSurvey {
  studentId: string;
  
  // Personal Info
  personalInfo: {
    fullName: string;
    class: string;
    phone?: string;
    email?: string;
  };
  
  // Perspective
  perspective: {
    emotionToday: string; // Câu 1: Cảm xúc hôm nay
    wowMoment: string; // Câu 2: Wow moment & học được gì
    futureExperience: string; // Câu 3: Đề xuất cho tương lai
  };
  
  completedAt: Date;
}
```

## Success Messages

- Survey submitted successfully: "🎉 Cảm ơn bạn đã hoàn thành khảo sát!"
- Validation errors: "⚠️ Vui lòng điền đầy đủ các trường bắt buộc"

## Error Messages

- Missing required fields: "Vui lòng điền: [list of missing fields]"
- Invalid email format: "Email không hợp lệ"
- Text too short: "Vui lòng nhập ít nhất [X] ký tự"

## Notes

- Tất cả sections hiển thị trên cùng 1 trang
- Không cần navigation giữa các forms
- User điền tất cả thông tin trước khi nộp
- Chỉ có 1 button "Nộp bài khảo sát" duy nhất ở cuối
- Validation xảy ra khi click nộp bài
- Stats cập nhật real-time sau khi nộp thành công
- Có thể thêm auto-save draft (optional)
