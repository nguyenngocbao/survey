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
- **Simple icon**: Survey/document icon centered at top
- **Title**: "Hệ thống khảo sát"
- **Subtitle**: "Học sinh & Nhóm học tập"
- **Description**: Brief explanation of survey types

#### Survey Selection Cards
- **Thứ tự hiển thị**: 
  1. **Khảo sát Nhóm** (trái/trên) - Ưu tiên hiển thị trước
  2. **Khảo sát Cá nhân** (phải/dưới)
  
- **Card Design**:
  - Large clickable cards với shadow và hover effects
  - Icon rõ ràng: 👥 (Nhóm), 👤 (Cá nhân)
  - Title và description cho mỗi loại
  - Feature list với bullet points
  - Call-to-action button

- **Màu sắc**:
  - **Nhóm**: Purple gradient (from-purple-500 to-violet-600) - Màu nổi bật cho team
  - **Cá nhân**: Teal gradient (from-teal-500 to-cyan-600) - Màu dịu cho individual

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
