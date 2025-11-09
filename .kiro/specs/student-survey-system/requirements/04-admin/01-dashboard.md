# Admin Dashboard - Trang Quản trị Chính

## User Story

**As a** Teacher_User  
**I want to** see an overview dashboard with statistics and quick access to survey management  
**So that** I can monitor survey completion rates and access detailed information efficiently

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị thống kê tổng quan
WHEN a Teacher_User accesses the admin dashboard, THE Survey_System SHALL display statistics for total surveys, completed surveys, in-progress surveys, and today's submissions

### AC2: Hiển thị danh sách khảo sát
WHEN a Teacher_User views the dashboard, THE Survey_System SHALL display a list of recent surveys with basic information

### AC3: Hiển thị công cụ xuất dữ liệu
WHEN a Teacher_User views the dashboard, THE Survey_System SHALL display export options for CSV and JSON formats

### AC4: Navigation links
WHEN a Teacher_User clicks navigation links, THE Survey_System SHALL navigate to appropriate pages (home, survey list, survey details)

### AC5: Real-time statistics
WHEN the dashboard loads, THE Survey_System SHALL fetch current statistics from `/api/admin/stats`

## UI/UX Requirements

### Layout
- Full-width layout với gradient background
- Max-width container: 7xl
- Spacing: 8 units between sections

### Header Section

#### Title
- Text: "🔧 Quản trị khảo sát"
- Font: 4xl, bold
- Color: Gray-800

#### Subtitle
- Text: "Xem và quản lý các khảo sát đã được nộp"
- Color: Gray-600

#### Navigation Links
- "← Quay về trang khảo sát" → `/`
- "📋 Xem chi tiết khảo sát" → `/admin/surveys`

### Statistics Section

Component: `AdminStats`

4 stat cards in grid layout (responsive):
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column

#### Card 1: Tổng khảo sát
- Icon: 📊
- Color: Blue
- Value: Total survey count
- Change: "+12%"

#### Card 2: Hoàn thành
- Icon: ✅
- Color: Green
- Value: Completed survey count
- Change: Completion rate percentage

#### Card 3: Đang thực hiện
- Icon: ⏳
- Color: Orange
- Value: In-progress survey count
- Change: "Active"

#### Card 4: Hôm nay
- Icon: 🎯
- Color: Purple
- Value: Today's submission count
- Change: "New"

### Main Content Section

Grid layout:
- Left (2/3): `SurveyList` component
- Right (1/3): `ExportData` component

### Colors
- Background: Gradient from-slate-50 via-blue-50 to-indigo-100
- Cards: White with 80% opacity and backdrop blur

## API Endpoints

### GET /api/admin/stats

**Response:**
```json
{
  "totalSurveys": number,
  "completedSurveys": number,
  "inProgressSurveys": number,
  "todaySubmissions": number,
  "completionRate": number
}
```

## Data Model

```typescript
interface AdminStats {
  totalSurveys: number;
  completedSurveys: number;
  inProgressSurveys: number;
  todaySubmissions: number;
  completionRate: number;
}
```

## Component Structure

```
AdminPage
├── Header
│   ├── Title & Subtitle
│   └── Navigation Links
├── AdminStats
│   └── 4 Stat Cards
└── Grid Layout
    ├── SurveyList (2/3)
    └── ExportData (1/3)
```

## Loading States

### Statistics Loading
- Show spinner animation
- Text: "Đang tải thống kê..."

### Empty State
- Icon: 📊
- Text: "Chưa có dữ liệu thống kê"

## Success Flow

```
Teacher accesses /admin
  ↓
Fetch statistics from API
  ↓
Display stat cards
  ↓
Load survey list
  ↓
Display export options
  ↓
Teacher can navigate to details or export data
```

## Responsive Design

### Desktop (lg+)
- 4 stat cards in row
- Survey list and export side-by-side

### Tablet (md)
- 2 stat cards per row
- Survey list and export stacked

### Mobile (sm)
- 1 stat card per row
- All components stacked vertically

## Performance

- Lazy load survey list
- Cache statistics for 30 seconds
- Optimize re-renders with React.memo
- Use skeleton loaders for better UX

## Accessibility

- Semantic HTML structure
- ARIA labels for statistics
- Keyboard navigation support
- Screen reader friendly

## Future Enhancements

- Real-time updates with WebSocket
- Customizable dashboard widgets
- Date range filters for statistics
- Export scheduled reports
- User activity logs
