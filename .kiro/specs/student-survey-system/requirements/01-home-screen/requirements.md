# Màn hình Chính (Home Screen)

## User Story

**As a** Student_User  
**I want to** see a clear landing page with options to choose between individual and group surveys  
**So that** I can easily select the appropriate survey type for my needs

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị màn hình chính
WHEN a Student_User accesses the home page, THE Survey_System SHALL display a landing page with two survey type options

### AC2: Chọn khảo sát cá nhân
WHEN a Student_User clicks on the individual survey option, THE Survey_System SHALL navigate to the individual survey page at `/individual`

### AC3: Chọn khảo sát nhóm
WHEN a Student_User clicks on the group survey option, THE Survey_System SHALL navigate to the group survey page at `/group`

### AC4: Responsive design
WHEN a Student_User accesses the home page on any device, THE Survey_System SHALL display the page responsively with appropriate layout adjustments for desktop, tablet, and mobile viewports

### AC5: Visual feedback
WHEN a Student_User hovers over a survey type option, THE Survey_System SHALL provide visual feedback with hover effects and scale transformation

### AC6: Clean interface
THE Survey_System SHALL display a clean interface without university branding, focusing on survey selection

## UI/UX Requirements

### Layout

#### Header Section
- **Icon**: 
  - Circular gradient background (blue to purple)
  - Document/survey icon in white
  - Size: w-20 h-20
  - Positioned: Center, above title
  
- **Title**: "The X-File"
  - Font: text-5xl md:text-6xl
  - Style: font-serif italic
  - Color: text-gray-800
  
- **Subtitle**: "Học sinh & Nhóm học tập"
  - Font: text-2xl md:text-3xl
  - Style: font-serif italic
  - Color: text-gray-700
  
- **Description**: 
  - Text: "Khám phá 'tệp tin X' (bí mật) chứa đựng mọi dự án và tầm nhìn."
  - Font: text-lg
  - Color: text-gray-600
  - Max width: max-w-2xl mx-auto
  - Style: leading-relaxed

#### Survey Selection Cards

**Thứ tự hiển thị**: 
1. **Khảo sát Nhóm** (trái/trên) - Ưu tiên hiển thị trước
2. **Khảo sát Cá nhân** (phải/dưới)

**Layout**: 
- Grid: `grid-cols-1 lg:grid-cols-2`
- Gap: `gap-8`
- Animation: fade-in with slide-in-from-bottom

---

### Card 1: Khảo sát Nhóm (Group Survey)

**Container**:
- Component: `<Card>`
- Padding: `p-8`
- Background: `bg-white/95 backdrop-blur-sm`
- Shadow: `shadow-2xl` (hover: `shadow-3xl`)
- Border: `border-0`
- Hover effect: `hover:scale-105 transition-all duration-300`

**Icon Section**:
- Container: Circular div
  - Size: `w-24 h-24`
  - Background: `bg-gradient-to-r from-purple-500 to-violet-600`
  - Position: `mx-auto` (centered)
  - Hover: `group-hover:scale-110 transition-transform duration-300`
- Icon: Team/group icon (3 people)
  - SVG path: Multiple people icon
  - Size: `w-12 h-12`
  - Color: `text-white`

**Title Section**:
- Title: "Hoạt động nhóm"
  - Font: `text-2xl font-bold`
  - Color: `text-gray-800`
  - Margin: `mb-3`

**Description**:
- Text: "Giải mã bản đồ tập thể. Đâu là điểm chung lớn nhất?"
- Font: `text-gray-600`
- Style: `leading-relaxed`
- Margin: `mb-6`

**Feature List**:
- Container: `space-y-3`
- Item style: `flex items-center gap-3`
- Bullet: Colored circle dot
  - Size: `w-2 h-2`
  - Shape: `rounded-full`
  - Colors: Alternating purple shades
- Features:
  1. "Thông tin nhóm & thành viên" (bg-purple-500)
  2. "Hoạt động 1: Bí ẩn dòng nước" (bg-violet-500)
  3. "Hoạt động 2: Khám phá thủy lực" (bg-purple-400)
  4. "Hoạt động 3: Thiết kế kỳ diệu" (bg-violet-300)
  5. "Hoạt động 4: Bản vẽ toả sáng" (bg-violet-200)
- Text style: `text-sm text-gray-600`

**Call-to-Action Button**:
- Component: `<Button>`
- Width: `w-full`
- Background: `bg-gradient-to-r from-purple-500 to-violet-600`
- Hover: `hover:from-purple-600 hover:to-violet-700`
- Text: "Bắt đầu khảo sát nhóm"
  - Color: `text-white`
  - Font: `font-semibold`
  - Size: `text-lg`
- Padding: `py-4`
- Transition: `transition-all duration-300`
- Action: Navigate to `/group`

---

### Card 2: Khảo sát Cá nhân (Individual Survey)

**Container**:
- Component: `<Card>`
- Padding: `p-8`
- Background: `bg-white/95 backdrop-blur-sm`
- Shadow: `shadow-2xl` (hover: `shadow-3xl`)
- Border: `border-0`
- Hover effect: `hover:scale-105 transition-all duration-300`

**Icon Section**:
- Container: Circular div
  - Size: `w-24 h-24`
  - Background: `bg-gradient-to-r from-teal-500 to-cyan-600`
  - Position: `mx-auto` (centered)
  - Hover: `group-hover:scale-110 transition-transform duration-300`
- Icon: Single person icon
  - SVG path: User profile icon
  - Size: `w-12 h-12`
  - Color: `text-white`

**Title Section**:
- Title: "Hoạt động cá nhân"
  - Font: `text-2xl font-bold`
  - Color: `text-gray-800`
  - Margin: `mb-3`

**Description**:
- Text: "Mở khóa tệp tin cảm xúc. Chỉ bạn thấy góc nhìn riêng."
- Font: `text-gray-600`
- Style: `leading-relaxed`
- Margin: `mb-6`

**Feature List**:
- Container: `space-y-3`
- Item style: `flex items-center gap-3`
- Bullet: Colored circle dot
  - Size: `w-2 h-2`
  - Shape: `rounded-full`
  - Colors: Alternating teal/cyan shades
- Features:
  1. "Thông tin cá nhân" (bg-teal-500)
  2. "Góc nhìn của bạn" (bg-cyan-500)
- Text style: `text-sm text-gray-600`

**Call-to-Action Button**:
- Component: `<Button>`
- Width: `w-full`
- Background: `bg-gradient-to-r from-teal-500 to-cyan-600`
- Hover: `hover:from-teal-600 hover:to-cyan-700`
- Text: "Bắt đầu khảo sát cá nhân"
  - Color: `text-white`
  - Font: `font-semibold`
  - Size: `text-lg`
- Padding: `py-4`
- Transition: `transition-all duration-300`
- Action: Navigate to `/individual`

#### Background
- Gradient background: `bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100`
- Clean, minimal design

### Components
- `SurveyTypeSelector`: Component chính hiển thị hai lựa chọn
- `HCMUEBackground`: Background component (gradient only)
- Card components với hover states
- **No admin link**: Admin access through separate domain only

### Interactions

#### Hover Effects
- Scale transformation: `scale-105`
- Shadow enhancement: `shadow-xl`
- Smooth transition: `transition-all duration-300`

#### Click Actions
- Navigate to `/group` (Khảo sát Nhóm)
- Navigate to `/individual` (Khảo sát Cá nhân)
- Visual feedback on click

#### Animations
- Fade-in animation on page load
- Stagger animation for cards
- Smooth page transitions

## Technical Requirements

### Route
- Path: `/`
- Component: `app/page.tsx`

### Dependencies
- `@/components/survey-type-selector`
- Next.js routing

### State Management
- Không cần state phức tạp
- Chỉ cần navigation

## Validation Rules

Không có validation cho màn hình này vì chỉ là navigation.

## API Endpoints

Không có API calls trực tiếp từ màn hình này.

## Data Flow

```
User lands on home page
  ↓
User sees two options
  ↓
User clicks on option
  ↓
Navigate to /individual or /group
```

## Accessibility

- Keyboard navigation support
- Clear focus indicators
- Screen reader friendly labels
- High contrast colors

## Performance

- Fast initial load
- No heavy assets
- Minimal JavaScript
- Static page generation

## Design Specifications

### Typography
- **Title**: text-4xl font-bold
- **Subtitle**: text-lg text-gray-600
- **Card Title**: text-2xl font-semibold
- **Card Description**: text-gray-600

### Spacing
- Container: max-w-6xl mx-auto px-4
- Card gap: gap-6 (mobile), gap-8 (desktop)
- Padding: p-8 (cards)

### Colors (Modern Theme)
- **Group Survey**: Purple gradient (#A855F7 to #7C3AED) - Vibrant team color
- **Individual Survey**: Teal gradient (#14B8A6 to #0891B2) - Calm personal color
- **Background**: Gradient slate-blue-indigo
- **Text**: Gray-900 (headings), Gray-600 (body)
- **Accent**: White cards with backdrop blur

### Responsive Breakpoints
- **Mobile** (< 768px): Single column, stacked cards
- **Tablet** (768px - 1024px): Single column, larger cards
- **Desktop** (> 1024px): Two columns or large centered cards

## Future Enhancements

- Thêm thống kê tổng quan (số lượng khảo sát đã hoàn thành)
- Thêm hướng dẫn sử dụng (modal hoặc tooltip)
- Thêm ngôn ngữ đa ngôn ngữ (Vietnamese/English toggle)
- Thêm video hướng dẫn
- Thêm FAQ section
- Integration với university authentication system
