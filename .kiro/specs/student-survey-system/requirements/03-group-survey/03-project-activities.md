# Form Dự án & Hoạt động (Group - Project Activities)

## User Story

**As a** Student_User  
**I want to** document our group's current project, activities, achievements, and challenges  
**So that** we can track our progress and share our work with instructors

## Acceptance Criteria (EARS Format)

### AC1: Nhập thông tin dự án
WHEN a Student_User enters project information, THE Survey_System SHALL require project title and description

### AC2: Thêm hoạt động nhóm
WHEN a Student_User clicks "Thêm hoạt động", THE Survey_System SHALL add a new activity input slot

### AC3: Xóa hoạt động
WHEN a Student_User clicks remove on an activity, THE Survey_System SHALL remove that activity (minimum 1 activity must remain)

### AC4: Thêm thành tích
WHEN a Student_User clicks "Thêm thành tích", THE Survey_System SHALL add a new achievement input field

### AC5: Thêm khó khăn
WHEN a Student_User clicks "Thêm khó khăn", THE Survey_System SHALL add a new challenge input field

### AC6: Upload ảnh hoạt động
WHEN a Student_User uploads project photos, THE Survey_System SHALL allow up to 8 images with max 5MB each

## UI/UX Requirements

### Layout
- Card container với backdrop blur
- Icon header: 📋 với teal gradient
- Title: "Dự án & Hoạt động"
- Subtitle: "Thông tin về dự án hiện tại và hoạt động của nhóm"

### Current Project Section

Background: Teal-50

#### Tên dự án * (Required)
- Type: Text input
- Placeholder: "Website bán hàng online"

#### Trạng thái
- Type: Select dropdown
- Options:
  - Lên kế hoạch
  - Đang thực hiện
  - Hoàn thành
  - Tạm dừng

#### Mô tả dự án * (Required)
- Type: Textarea (3 rows)
- Placeholder: "Mô tả chi tiết về dự án, mục tiêu và phạm vi..."

#### Ngày bắt đầu
- Type: Date input

#### Ngày kết thúc
- Type: Date input

#### Tiến độ (%)
- Type: Number input (0-100)
- Placeholder: "75"

### Activities Section

Dynamic list with add/remove functionality

Each activity includes:
- **Tên hoạt động**: Text input
- **Loại hoạt động**: Select (Họp nhóm, Nghiên cứu, Phát triển, Thuyết trình, Khác)
- **Ngày thực hiện**: Date input
- **Thời gian (phút)**: Number input

### Achievements Section

Dynamic list with add/remove functionality
- Text input for each achievement
- Placeholder: "Hoàn thành UI design"

### Challenges Section

Dynamic list with add/remove functionality
- Text input for each challenge
- Placeholder: "Khó khăn về database"

### Photos Section

Background: Teal-50
- Component: `MultiImageUpload`
- Max images: 8
- Max size: 5MB per image
- Description: "Upload tối đa 8 ảnh về quá trình làm việc, demo, hoạt động nhóm"

### Colors
- Primary: Teal gradient (from-teal-500 to-teal-600)

## Validation Rules

### Project Title
- Required: Yes
- Error: "Vui lòng điền tên và mô tả dự án"

### Project Description
- Required: Yes
- Error: "Vui lòng điền tên và mô tả dự án"

### Activities
- At least 1 activity must remain (cannot delete all)

### Photos
- Max count: 8
- Max size: 5MB per image

## API Endpoints

### POST /api/group-surveys/project-activities

**Request Body:**
```json
{
  "groupCode": "string",
  "currentProject": {
    "title": "string",
    "description": "string",
    "startDate": "string",
    "endDate": "string",
    "status": "planning|in-progress|completed|on-hold",
    "progress": number
  },
  "activities": [
    {
      "name": "string",
      "type": "meeting|research|development|presentation|other",
      "date": "string",
      "duration": number,
      "participants": []
    }
  ],
  "achievements": ["string"],
  "challenges": ["string"],
  "photos": ["url"]
}
```

## Data Model

```typescript
interface CurrentProject {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
}

interface Activity {
  name: string;
  type: 'meeting' | 'research' | 'development' | 'presentation' | 'other';
  date: string;
  duration: number;
  participants: string[];
}

interface ProjectActivities {
  groupCode: string;
  currentProject: CurrentProject;
  activities: Activity[];
  achievements: string[];
  challenges: string[];
  photos: string[];
}
```

## Dynamic List Management

### Activities
- Initial: 1 activity slot
- Add: Click "Thêm hoạt động" button
- Remove: Click ✕ button (minimum 1 must remain)

### Achievements
- Initial: 1 achievement field
- Add: Click "Thêm thành tích" button
- Remove: Click ✕ button (minimum 1 must remain)

### Challenges
- Initial: 1 challenge field
- Add: Click "Thêm khó khăn" button
- Remove: Click ✕ button (minimum 1 must remain)

## Success Flow

```
User enters project title & description (required)
  ↓
User fills project details (status, dates, progress)
  ↓
User adds activities (at least 1)
  ↓
User adds achievements (optional)
  ↓
User adds challenges (optional)
  ↓
User uploads photos (optional, max 8)
  ↓
Validate required fields
  ↓
Filter out empty activities/achievements/challenges
  ↓
POST to /api/group-surveys/project-activities
  ↓
Navigate to Evaluation & Feedback form
```

## Special Notes

- Empty activities, achievements, and challenges are filtered out before submission
- Photos are stored using groupCode as identifier
- Progress percentage is optional but recommended
- Activity duration is in minutes
