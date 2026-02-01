# Admin Survey Detail - Chi tiết Khảo sát

## User Story

**As a** Teacher_User  
**I want to** view complete details of a specific survey in a modal dialog  
**So that** I can review all information submitted by a student

## Acceptance Criteria (EARS Format)

### AC1: Fetch chi tiết khảo sát
WHEN a Teacher_User opens survey detail, THE Survey_System SHALL fetch complete survey data from `/api/admin/surveys/[id]`

### AC2: Hiển thị thông tin cá nhân
WHEN displaying survey details, THE Survey_System SHALL show all personal information including avatar, name, student ID, email, phone, class, and major

### AC3: Hiển thị thông tin học tập
WHEN displaying survey details, THE Survey_System SHALL show GPA, study hours, learning style, favorite subjects, and difficulties

### AC4: Hiển thị sở thích
WHEN displaying survey details, THE Survey_System SHALL show hobbies, sports, clubs, volunteer work, leadership status, and activity photos

### AC5: Hiển thị kế hoạch tương lai
WHEN displaying survey details, THE Survey_System SHALL show career goals, graduation plan, further education plans, work plans, and skills to improve

### AC6: Đóng modal
WHEN a Teacher_User clicks close or outside the modal, THE Survey_System SHALL close the detail view and return to the list

## UI/UX Requirements

### Modal Layout
- Component: Dialog/Modal
- Max width: 4xl
- Max height: 90vh
- Scrollable content
- Backdrop: Dark overlay

### Header Section

#### Close Button
- Position: Top-right
- Icon: ✕
- Action: Close modal

#### Title
- Student name with avatar
- Student ID
- Completion badge

### Content Sections

Each section in an expandable/collapsible card:

#### 1. Thông tin Cá nhân (Personal Info)
- Icon: 👤
- Color: Blue
- Fields:
  - Avatar (large display if available)
  - Họ và tên
  - Mã số sinh viên
  - Email
  - Số điện thoại
  - Lớp
  - Ngành học

#### 2. Thông tin Học tập (Academic Info)
- Icon: 📚
- Color: Green
- Fields:
  - GPA hiện tại
  - Số giờ học/ngày
  - Phong cách học tập
  - Môn học yêu thích (badges)
  - Khó khăn trong học tập (badges)

#### 3. Sở thích & Hoạt động (Interests)
- Icon: 🎯
- Color: Orange
- Fields:
  - Sở thích cá nhân (badges)
  - Thể thao yêu thích (badges)
  - Câu lạc bộ tham gia (badges)
  - Tham gia tình nguyện (Yes/No badge)
  - Kinh nghiệm lãnh đạo (Yes/No badge)
  - Ảnh hoạt động (gallery)

#### 4. Kế hoạch Tương lai (Future Plans)
- Icon: 🚀
- Color: Purple
- Fields:
  - Mục tiêu nghề nghiệp (text block)
  - Kế hoạch tốt nghiệp
  - Học lên cao học (Yes/No badge)
  - Đi làm ngay (Yes/No badge)
  - Kỹ năng muốn phát triển (badges)

### Loading State
- Spinner in modal center
- Text: "Đang tải chi tiết khảo sát..."

### Error State
- Icon: ⚠️
- Text: "Không thể tải thông tin khảo sát"
- Button: "Thử lại"

### Footer Section
- Timestamps:
  - Ngày tạo
  - Ngày cập nhật
  - Ngày hoàn thành (if completed)

## API Endpoints

### GET /api/admin/surveys/[id]

**Response:**
```json
{
  "survey": {
    "_id": "string",
    "personalInfo": {
      "fullName": "string",
      "studentId": "string",
      "email": "string",
      "phone": "string",
      "class": "string",
      "major": "string",
      "avatar": "string"
    },
    "academicInfo": {
      "gpa": number,
      "studyHours": number,
      "learningStyle": "string",
      "favoriteSubjects": ["string"],
      "difficulties": ["string"]
    },
    "interests": {
      "hobbies": ["string"],
      "sports": ["string"],
      "clubs": ["string"],
      "volunteerWork": boolean,
      "leadership": boolean,
      "photos": ["string"]
    },
    "futurePlans": {
      "careerGoals": "string",
      "graduationPlan": "string",
      "furtherEducation": boolean,
      "workExperience": boolean,
      "skills": ["string"]
    },
    "completedSections": {
      "personal": boolean,
      "academic": boolean,
      "interests": boolean,
      "future": boolean
    },
    "isCompleted": boolean,
    "createdAt": "string",
    "updatedAt": "string",
    "completedAt": "string"
  }
}
```

## Data Model

```typescript
interface SurveyDetail {
  _id: string;
  personalInfo: PersonalInfo;
  academicInfo?: AcademicInfo;
  interests?: Interests;
  futurePlans?: FuturePlans;
  completedSections: CompletedSections;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

## Component Structure

```
SurveyDetail (Modal)
├── Dialog Overlay
├── Dialog Content
│   ├── Header
│   │   ├── Close Button
│   │   ├── Student Info
│   │   └── Completion Badge
│   ├── Scrollable Content
│   │   ├── Personal Info Section
│   │   ├── Academic Info Section
│   │   ├── Interests Section
│   │   └── Future Plans Section
│   └── Footer
│       └── Timestamps
└── Loading/Error States
```

## Display Logic

### Section Visibility
- Personal Info: Always show (required)
- Academic Info: Show if `completedSections.academic === true`
- Interests: Show if `completedSections.interests === true`
- Future Plans: Show if `completedSections.future === true`

### Empty Sections
- If section not completed, show:
  - Icon: ⏳
  - Text: "Chưa hoàn thành phần này"

### Array Fields (Badges)
- Display as colored badges
- Wrap to multiple lines
- Empty arrays: Show "Chưa có thông tin"

### Boolean Fields
- True: Green badge with ✓
- False: Gray badge with ✗

### Photo Gallery
- Display in grid (3 columns)
- Clickable to view full size
- Lightbox for enlarged view

## Interactions

### Open Modal
```
User clicks "Xem chi tiết" in list
  ↓
Pass surveyId to SurveyDetail
  ↓
Fetch survey data
  ↓
Display in modal
```

### Close Modal
```
User clicks close button or backdrop
  ↓
Call onClose callback
  ↓
Modal closes
  ↓
Return to survey list
```

### View Photo
```
User clicks photo thumbnail
  ↓
Open lightbox with full-size image
  ↓
User can navigate between photos
  ↓
Close lightbox
```

## Styling

### Section Cards
- Background: White with subtle shadow
- Border: Light gray
- Padding: 4-6 units
- Margin bottom: 4 units

### Field Labels
- Font weight: Semibold
- Color: Gray-700
- Margin bottom: 1 unit

### Field Values
- Color: Gray-900
- Line height: Relaxed

### Badges
- Rounded: Full
- Padding: 2x3 units
- Font size: Small
- Various colors by category

## Performance

- Lazy load modal content
- Cache survey details
- Optimize image loading
- Virtual scroll for long lists

## Accessibility

- Focus trap in modal
- Escape key to close
- ARIA labels for sections
- Keyboard navigation
- Screen reader announcements

## Future Enhancements

- Print survey details
- Export individual survey as PDF
- Compare multiple surveys
- Add notes/comments
- Flag for review
