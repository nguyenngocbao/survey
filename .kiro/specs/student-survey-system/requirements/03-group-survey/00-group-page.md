# Trang Khảo sát Nhóm (Group Survey Page)

## User Story

**As a** Student_User  
**I want to** access a comprehensive group survey page with clear sections  
**So that** I can easily input group information, select activities, and view real-time statistics

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị trang khảo sát nhóm
WHEN a Student_User navigates to `/group`, THE Survey_System SHALL display a page with 4 main sections: header card, group info form, activity selection, and real-time statistics

### AC2: Quay về trang chủ
WHEN a Student_User clicks the back button, THE Survey_System SHALL navigate back to the home page at `/`

### AC3: Lưu thông tin nhóm
WHEN a Student_User submits group information, THE Survey_System SHALL save data to database and update real-time statistics

### AC4: Chọn hoạt động
WHEN a Student_User selects an activity, THE Survey_System SHALL navigate to the corresponding activity form

### AC5: Hiển thị thống kê
WHEN group data is updated, THE Survey_System SHALL display real-time statistics including completion status and progress

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

**Purpose**: Giới thiệu tổng quan về khảo sát nhóm, giống card "Hoạt động nhóm" ở trang home

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
  - Background: `bg-gradient-to-r from-purple-500 to-violet-600`
  - Position: `mx-auto` (centered)
- Icon: Team/group icon (3 people)
  - SVG path: Multiple people icon
  - Size: `w-12 h-12`
  - Color: `text-white`

**Title Section**:
- Title: "Hoạt động nhóm"
  - Font: `text-3xl font-bold`
  - Color: `text-gray-800`
  - Margin: `mb-3`
  - Alignment: Center

**Description**:
- Text: "Giải mã bản đồ tập thể. Đâu là điểm chung lớn nhất?"
- Font: `text-gray-600`
- Style: `leading-relaxed`
- Alignment: Center
- Max width: `max-w-2xl mx-auto`

**Feature List** (Optional - có thể hiển thị hoặc không):
- Container: `space-y-2`
- Layout: Grid 2 columns hoặc flex wrap
- Items:
  1. "Thông tin nhóm & thành viên"
  2. "4 hoạt động khám phá"
  3. "Thống kê theo thời gian thực"

---

## Section 2: Thông tin Nhóm và Thành viên

**Purpose**: Form nhập thông tin cơ bản về nhóm và danh sách thành viên

**Container**:
- Component: `<Card>`
- Padding: `p-8`
- Background: `bg-white/95 backdrop-blur-sm`
- Shadow: `shadow-xl`
- Border: `border-0`

**Section Title**:
- Text: "Thông tin nhóm & thành viên"
- Font: `text-2xl font-bold`
- Color: `text-gray-800`
- Icon: 👥 (purple gradient circle)

**Form Fields**:

### Thông tin nhóm cơ bản

1. **Tên nhóm** * (Required)
   - Type: Text input
   - Placeholder: "Nhóm Xì Trum"
   - Full width

2. **Mã nhóm** * (Required)
   - Type: Text input
   - Placeholder: "GROUP001"
   - Note: "Mã định danh duy nhất cho nhóm"
   - Half width

3. **Lớp** * (Required)
   - Type: Text input
   - Placeholder: "10A1"
   - Half width

### Thông tin trưởng nhóm

4. **Tên trưởng nhóm** * (Required)
   - Type: Text input
   - Placeholder: "Nguyễn Văn A"



### Danh sách thành viên

**Section Header**:
- Text: "Danh sách thành viên"
- Font: `text-lg font-semibold`
- Color: `text-gray-700`
- Margin: `mt-6 mb-4`

**Member List** (Dynamic):
- Container: `space-y-3`
- Min members: 2 (including leader)
- Max members: 10
- Default: 2 members (leader + 1 member)

**Member Input Row**:
- Layout: Flex row with gap
- Components:
  1. **Member Number Badge**
     - Text: "#{number}"
     - Background: `bg-purple-100`
     - Color: `text-purple-700`
     - Font: `text-sm font-medium`
     - Padding: `px-3 py-2`
     - Rounded: `rounded-lg`
     - Width: Fixed (e.g., `w-12`)
  
  2. **Name Input**
     - Type: Text input
     - Placeholder: "Tên thành viên {number}"
     - Full width (flex-1)
     - Border: `border-gray-300`
     - Focus: `focus:border-purple-500`
  
  3. **Remove Button** (-)
     - Icon: Minus icon or "×"
     - Background: `bg-red-100 hover:bg-red-200`
     - Color: `text-red-600`
     - Size: `w-10 h-10`
     - Rounded: `rounded-lg`
     - Disabled: If only 2 members left (minimum)
     - Action: Remove this member row

**Add Member Button** (+):
- Position: Below member list
- Text: "+ Thêm thành viên"
- Icon: Plus icon
- Background: `bg-purple-100 hover:bg-purple-200`
- Color: `text-purple-700`
- Font: `text-sm font-medium`
- Padding: `px-4 py-2`
- Rounded: `rounded-lg`
- Border: `border-2 border-dashed border-purple-300`
- Full width
- Disabled: If 10 members reached (maximum)
- Action: Add new member input row

**Behavior**:
- First member is always the leader (from "Tên trưởng nhóm" field)
- Cannot remove first member (leader)
- Can add members up to 10 total
- Can remove members down to 2 minimum (leader + 1)
- Member numbers auto-update when adding/removing
- Empty member names show validation error on submit

**Action Buttons**:
- "Lưu thông tin nhóm" (Primary button)
  - Background: `bg-gradient-to-r from-purple-500 to-violet-600`
  - Full width hoặc right-aligned
  - Action: Save to database, show success message

---

## Section 3: Các Hoạt động

**Purpose**: Chọn và điền thông tin cho 4 hoạt động khám phá

**Container**:
- Component: `<Card>`
- Padding: `p-8`
- Background: `bg-white/95 backdrop-blur-sm`
- Shadow: `shadow-xl`
- Border: `border-0`

**Section Title**:
- Text: "Các hoạt động khám phá"
- Font: `text-2xl font-bold`
- Color: `text-gray-800`
- Icon: 🎯 (gradient circle)

**Activity Cards Grid**:
- Layout: `grid grid-cols-1 md:grid-cols-2 gap-6`
- 4 activity cards

### Activity Card Template

**Card Structure**:
- Padding: `p-6`
- Background: `bg-gradient-to-br from-{color}-50 to-{color}-100`
- Border: `border-2 border-{color}-200`
- Hover: `hover:shadow-lg hover:scale-102 transition-all`
- Cursor: `cursor-pointer`

**Card Content**:

1. **Activity Number Badge**
   - Position: Top left
   - Text: "Hoạt động {number}"
   - Background: Gradient matching activity color
   - Font: `text-xs font-semibold`
   - Padding: `px-3 py-1`
   - Rounded: `rounded-full`

2. **Activity Icon**
   - Size: `w-12 h-12`
   - Background: Gradient circle
   - Icon: Activity-specific icon
   - Position: Center or left

3. **Activity Title**
   - Font: `text-xl font-bold`
   - Color: `text-gray-800`
   - Margin: `mb-2`

4. **Activity Description**
   - Font: `text-sm text-gray-600`
   - Style: `leading-relaxed`
   - Max lines: 2-3

5. **Status Badge**
   - Show completion status
   - "Chưa hoàn thành" (gray) or "Đã hoàn thành" (green)
   - Position: Bottom right

6. **Action Button**
   - Text: "Bắt đầu" or "Tiếp tục" or "Xem lại"
   - Size: Small
   - Style: Outline or solid based on status

### 4 Activities

**Activity 1: Bí ẩn dòng nước**
- Color: `violet-500`
- Icon: 🌊
- Description: "Khám phá những bí ẩn dưới đáy đại dương"
- Route: `/group/activity-1`

**Activity 2: Khám phá thủy lực**
- Color: `purple-500`
- Icon: 🔮
- Description: "Tìm hiểu nguyên lý nổi và thiết kế thuyền"
- Route: `/group/activity-2`

**Activity 3: Thiết kế kỳ diệu**
- Color: `indigo-500`
- Icon: 🗺️
- Description: "Tạo bản vẽ kỹ thuật hoàn chỉnh với AI"
- Route: `/group/activity-3`

**Activity 4: Bản vẽ toả sáng**
- Color: `blue-500`
- Icon: ✨
- Description: "Tìm hiểu bản vẽ phát ra ánh sáng kỳ diệu"
- Route: `/group/activity-4`

---

## Section 4: Thống kê theo thời gian thực

**Purpose**: Hiển thị tiến độ và thống kê của nhóm

**Container**:
- Component: `<Card>`
- Padding: `p-8`
- Background: `bg-white/95 backdrop-blur-sm`
- Shadow: `shadow-xl`
- Border: `border-0`

**Section Title**:
- Text: "Thống kê nhóm"
- Font: `text-2xl font-bold`
- Color: `text-gray-800`
- Icon: 📊 (gradient circle)

**Stats Grid**:
- Layout: `grid grid-cols-2 md:grid-cols-4 gap-4`

### Stat Card Template

**Structure**:
- Padding: `p-4`
- Background: `bg-gradient-to-br from-{color}-50 to-{color}-100`
- Border: `border border-{color}-200`
- Rounded: `rounded-lg`

**Content**:
1. **Icon** (Top)
   - Size: `w-8 h-8`
   - Color: Matching gradient

2. **Value** (Center)
   - Font: `text-3xl font-bold`
   - Color: `text-gray-800`

3. **Label** (Bottom)
   - Font: `text-sm text-gray-600`

### 4 Stats

**Stat 1: Thành viên**
- Icon: 👥
- Value: Dynamic (số thành viên đã nhập)
- Label: "Thành viên"
- Color: `purple`

**Stat 2: Hoạt động hoàn thành**
- Icon: ✅
- Value: Dynamic (X/4)
- Label: "Hoạt động"
- Color: `green`

**Stat 3: Tiến độ**
- Icon: 📈
- Value: Dynamic (XX%)
- Label: "Tiến độ"
- Color: `blue`

**Stat 4: Cập nhật lần cuối**
- Icon: 🕐
- Value: Dynamic (time ago)
- Label: "Cập nhật"
- Color: `gray`

**Progress Bar** (Optional):
- Full width below stats
- Show overall completion percentage
- Color: Purple gradient
- Height: `h-2`
- Rounded: `rounded-full`

---

## Technical Requirements

### Route
- Path: `/group`
- Component: `app/group/page.tsx`

### State Management
- Use React state for form data
- Store groupCode in localStorage
- Track completion status for each activity

### API Endpoints

**POST /api/group-surveys/group-info**
- Save group and member information
- Return groupCode

**GET /api/group-surveys/stats/:groupCode**
- Get real-time statistics
- Return completion status, member count, progress

**GET /api/group-surveys/:groupCode**
- Get existing group data
- Return all saved information

### Data Flow

```
User lands on /group
  ↓
Load existing data (if groupCode in localStorage)
  ↓
Display 4 sections
  ↓
User fills group info → Save → Update stats
  ↓
User clicks activity → Navigate to activity form
  ↓
Activity completed → Return to /group → Update stats
```

## Validation Rules

### Group Info
- All required fields must be filled
- Email must be valid format
- Member count: 2-10
- Phone number: 10 digits

### Member List
- At least 2 members (leader + 1 member minimum)
- Maximum 10 members
- Each member must have a name (non-empty)
- First member is always the leader

## Colors & Styling

### Section Colors
- Header Card: Purple gradient (`from-purple-500 to-violet-600`)
- Group Info: Purple accent
- Activities: Individual colors (violet, purple, indigo, blue)
- Statistics: Multi-color (purple, green, blue, gray)

### Responsive Breakpoints
- Mobile (< 768px): Single column, stacked sections
- Tablet (768px - 1024px): 2 columns for activities
- Desktop (> 1024px): Full layout with 2-4 columns

## Accessibility

- Keyboard navigation support
- Clear focus indicators
- Screen reader friendly labels
- High contrast colors
- Form validation messages

## Performance

- Lazy load activity forms
- Cache group data in localStorage
- Debounce auto-save
- Optimize re-renders with React.memo

## Future Enhancements

- Auto-save draft every 30 seconds
- Collaborative editing (multiple users)
- Export group report as PDF
- Activity completion badges
- Group chat/comments
- File attachments for activities
- Timeline view of group progress

