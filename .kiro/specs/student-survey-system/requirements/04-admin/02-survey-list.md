# Admin Survey List - Danh sách Khảo sát

## User Story

**As a** Teacher_User  
**I want to** view a filterable list of all surveys with their completion status  
**So that** I can quickly find and review specific surveys

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị danh sách khảo sát
WHEN a Teacher_User accesses the survey list, THE Survey_System SHALL fetch and display all surveys from `/api/admin/surveys`

### AC2: Filter theo trạng thái
WHEN a Teacher_User clicks a filter button, THE Survey_System SHALL filter surveys by status (all, completed, in-progress)

### AC3: Hiển thị thông tin cơ bản
WHEN displaying each survey, THE Survey_System SHALL show student name, ID, class, major, email, and completion status

### AC4: Hiển thị tiến độ
WHEN displaying each survey, THE Survey_System SHALL show progress indicators for all 4 sections (personal, academic, interests, future)

### AC5: Xem chi tiết
WHEN a Teacher_User clicks "Xem chi tiết", THE Survey_System SHALL open a modal with full survey details

### AC6: Hiển thị avatar
WHEN a survey has an avatar, THE Survey_System SHALL display the avatar image in the list

## UI/UX Requirements

### Layout
- Card container với white background and backdrop blur
- Padding: 6 units
- Border radius: lg

### Header Section

#### Title
- Text: "📋 Danh sách khảo sát"
- Font: 2xl, bold

#### Filter Buttons
- **Tất cả**: Shows count in parentheses
- **Hoàn thành**: Shows completed count
- **Đang thực hiện**: Shows in-progress count
- Active button: Default variant
- Inactive buttons: Outline variant

### Survey Item Card

Each survey displayed in a card with:

#### Header Row
- **Avatar**: 10x10 rounded circle (if available)
- **Name**: Large, bold, gray-800
- **Status Badge**: 
  - Completed: Green badge "Hoàn thành"
  - In-progress: Orange badge "X/4 phần"

#### Info Grid (3 columns on desktop)
- **MSSV**: Student ID
- **Lớp**: Class
- **Ngành**: Major

#### Email Row
- Display email with label

#### Timestamps
- **Tạo**: Creation date/time
- **Cập nhật**: Last update date/time
- Format: Vietnamese locale with time

#### Action Button
- Text: "👁️ Xem chi tiết"
- Color: Blue-600
- Size: Small

#### Progress Indicators
- 4 small badges showing section completion
- Completed: Green background
- Incomplete: Gray background
- Labels: Cá nhân, Học tập, Sở thích, Tương lai

### Loading State
- Spinner animation
- Text: "Đang tải danh sách khảo sát..."

### Empty State
- Icon: 📝 (large)
- Text: "Chưa có khảo sát nào"

### Colors
- Card background: Gradient from-gray-50 to-blue-50
- Border: Gray-200
- Hover: Shadow-md transition

## API Endpoints

### GET /api/admin/surveys

**Response:**
```json
{
  "surveys": [
    {
      "_id": "string",
      "personalInfo": {
        "fullName": "string",
        "studentId": "string",
        "email": "string",
        "class": "string",
        "major": "string",
        "avatar": "string"
      },
      "completedSections": {
        "personal": boolean,
        "academic": boolean,
        "interests": boolean,
        "future": boolean
      },
      "isCompleted": boolean,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

## Data Model

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

## State Management

```typescript
const [surveys, setSurveys] = useState<Survey[]>([]);
const [loading, setLoading] = useState(true);
const [filter, setFilter] = useState<'all' | 'completed' | 'inProgress'>('all');
const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
```

## Filtering Logic

### All
- Show all surveys

### Completed
- Filter: `survey.isCompleted === true`

### In Progress
- Filter: `!survey.isCompleted && survey.completedSections.personal === true`
- Note: Only show surveys that have started (personal info filled)

## Helper Functions

### getProgressBadge(survey)
- If completed: Green badge "Hoàn thành"
- Else: Orange badge "X/4 phần" (count completed sections)

### formatDate(dateString)
- Format: Vietnamese locale
- Include: Year, month (short), day, hour, minute
- Example: "9 thg 11, 2025, 14:30"

## Component Structure

```
SurveyList
├── Header
│   ├── Title
│   └── Filter Buttons
├── Loading State
├── Empty State
└── Survey Items
    ├── Survey Card
    │   ├── Avatar
    │   ├── Name & Badge
    │   ├── Info Grid
    │   ├── Email
    │   ├── Timestamps
    │   ├── Action Button
    │   └── Progress Indicators
    └── SurveyDetail Modal
```

## Interactions

### Click Filter Button
```
User clicks filter
  ↓
Update filter state
  ↓
Re-render with filtered surveys
```

### Click "Xem chi tiết"
```
User clicks detail button
  ↓
Set selectedSurveyId
  ↓
Open SurveyDetail modal
  ↓
Modal fetches full survey data
```

### Close Modal
```
User closes modal
  ↓
Set selectedSurveyId to null
  ↓
Modal unmounts
```

## Performance

- Memoize filtered surveys
- Lazy load survey details
- Virtual scrolling for large lists
- Debounce search (future enhancement)

## Accessibility

- Keyboard navigation for filters
- Focus management in modal
- Screen reader labels
- High contrast badges

## Future Enhancements

- Search by name or student ID
- Sort by date, name, completion
- Bulk actions (export selected)
- Pagination for large datasets
- Real-time updates
