# Quản trị (Admin Panel)

## Tổng quan

Giao diện quản trị dành cho giáo viên để xem thống kê, quản lý danh sách khảo sát, xem chi tiết và xuất dữ liệu.

## Luồng hoạt động

```
Truy cập /admin
  ↓
Dashboard với thống kê tổng quan
  ↓
Xem danh sách khảo sát (có filter)
  ↓
Click "Xem chi tiết" → Modal hiển thị full data
  ↓
Xuất dữ liệu CSV/JSON
```

## ⚠️ Lưu ý Quan trọng

Admin Panel đã được tách ra thành **ứng dụng độc lập**:
- **Thư mục**: `admin-app/`
- **Domain**: `admin.hcmue.edu.vn`
- **Port Local**: 3001
- **Database**: Shared với Survey App
- **Authentication**: Required (cần implement)

## Các màn hình

### 0. Authentication (Cần implement)
**File**: `05-authentication.md`

Login và bảo mật:
- Login page
- Session management
- Protected routes
- Logout functionality

**Route**: `/login`
**Priority**: High

### 1. Dashboard
**File**: `01-dashboard.md`

Trang chính quản trị:
- 4 stat cards (Total, Completed, In-Progress, Today)
- Danh sách khảo sát gần đây
- Quick access đến export
- Navigation links

**Route**: `/admin`

### 2. Danh sách Khảo sát
**File**: `02-survey-list.md`

Quản lý danh sách:
- Hiển thị tất cả khảo sát
- Filter: All / Completed / In-Progress
- Thông tin cơ bản: Name, ID, Class, Major
- Progress indicators (4 sections)
- Action: "Xem chi tiết"

**Route**: `/admin` hoặc `/admin/surveys`

### 3. Chi tiết Khảo sát
**File**: `03-survey-detail.md`

Modal hiển thị chi tiết:
- Personal Info section
- Academic Info section
- Interests section
- Future Plans section
- Timestamps
- Photo gallery

**Component**: Modal/Dialog

### 4. Xuất Dữ liệu
**File**: `04-export.md`

Export functionality:
- Export CSV (Excel-friendly)
- Export JSON (Developer-friendly)
- UTF-8 encoding cho tiếng Việt
- Filename với timestamp
- Success/Error notifications

**Component**: Card trong Dashboard

## Yêu cầu kỹ thuật

### API Endpoints
- `GET /api/admin/stats` - Thống kê tổng quan
- `GET /api/admin/surveys` - Danh sách khảo sát
- `GET /api/admin/surveys/[id]` - Chi tiết khảo sát
- `GET /api/admin/export/csv` - Xuất CSV
- `GET /api/admin/export/json` - Xuất JSON

### Data Models

#### AdminStats
```typescript
interface AdminStats {
  totalSurveys: number;
  completedSurveys: number;
  inProgressSurveys: number;
  todaySubmissions: number;
  completionRate: number;
}
```

#### Survey List Item
```typescript
interface Survey {
  _id: string;
  personalInfo: {
    fullName: string;
    studentId: string;
    email: string;
    class: string;
    major: string;
    avatar?: string;
  };
  completedSections: {
    personal: boolean;
    academic: boolean;
    interests: boolean;
    future: boolean;
  };
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## UI/UX Guidelines

### Layout
- Full-width layout với max-width container
- Gradient background
- Card-based components
- Responsive grid

### Colors
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Orange (#F97316)
- Info: Purple (#8B5CF6)

### Components
- Stat cards với icons
- Filterable list
- Modal dialog
- Export buttons
- Loading states
- Empty states

### Interactions
- Click stat card → Filter list
- Click survey → Open detail modal
- Click export → Download file
- Filter buttons → Update list
- Close modal → Return to list

## Features

### Statistics
- Real-time completion rates
- Today's submissions count
- Visual progress indicators
- Completion badges

### Filtering
- All surveys
- Completed only
- In-progress only
- Count badges on filters

### Detail View
- Expandable sections
- Photo gallery với lightbox
- Formatted timestamps
- Badge displays for arrays
- Yes/No badges for booleans

### Export
- CSV: Excel-compatible, UTF-8 with BOM
- JSON: Pretty-printed, with metadata
- Filename: `khao-sat-YYYY-MM-DD.{csv|json}`
- Download triggers automatically

## Security & Permissions

- Admin routes should be protected
- Validate user permissions
- Sanitize exported data
- Log export activities
- Rate limiting on exports

## Performance

- Cache statistics (30s)
- Lazy load survey details
- Virtual scrolling for large lists
- Optimize image loading
- Debounce search (future)

## Testing Scenarios

1. View dashboard statistics
2. Filter surveys by status
3. Open and close survey details
4. Export CSV successfully
5. Export JSON successfully
6. Handle empty states
7. Handle loading states
8. Handle API errors
9. Test on mobile devices
10. Test with large datasets
