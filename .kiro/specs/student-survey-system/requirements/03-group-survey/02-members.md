# Form Thành viên Nhóm (Group - Members Info)

## User Story

**As a** Student_User  
**I want to** add detailed information about each team member including roles, contributions, and skills  
**So that** we can document individual contributions and team dynamics

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị danh sách thành viên
WHEN a Student_User accesses the members info form, THE Survey_System SHALL display 5 member input slots by default

### AC2: Validation số thành viên tối thiểu
WHEN a Student_User submits the form, THE Survey_System SHALL validate that at least 2 members have complete information

### AC3: Validation tổng % đóng góp
WHEN a Student_User submits the form, THE Survey_System SHALL validate that total contribution percentage equals 100% (±5%)

### AC4: Đánh giá team dynamics
WHEN a Student_User rates team dynamics, THE Survey_System SHALL use star rating (1-5) for communication and collaboration

### AC5: Chọn kỹ năng thành viên
WHEN a Student_User selects skills for each member, THE Survey_System SHALL allow multiple skill selections per member

## UI/UX Requirements

### Layout
- Card container với backdrop blur
- Icon header: 🤝 với emerald gradient
- Title: "Thành viên nhóm"
- Subtitle: "Quản lý thông tin và đánh giá hoạt động nhóm"

### Member Input Sections

Each member slot includes:

#### Thông tin cơ bản
- **Họ tên**: Text input
- **MSSV**: Text input
- **Vai trò**: Select (Trưởng nhóm, Thành viên, Thư ký, Thủ quỹ)
- **% Đóng góp**: Number input (0-100)

#### Kỹ năng
- Multiple checkboxes
- Options:
  - Lập trình, Thiết kế, Quản lý, Nghiên cứu
  - Thuyết trình, Viết báo cáo, Teamwork, Leadership

### Team Dynamics Section

Background: Emerald-50

#### Giao tiếp trong nhóm
- Star rating (1-5)
- Component: StarRating

#### Hợp tác làm việc
- Star rating (1-5)
- Component: StarRating

#### Giải quyết xung đột
- Select dropdown
- Options: Xuất sắc, Tốt, Khá, Cần cải thiện

#### Tần suất họp nhóm
- Select dropdown
- Options: Hàng ngày, Hàng tuần, 2 tuần/lần, Hàng tháng

### Colors
- Primary: Emerald gradient (from-emerald-500 to-emerald-600)

## Validation Rules

### Minimum Members
- At least 2 members must have name and studentId filled
- Error: "Vui lòng điền thông tin cho ít nhất 2 thành viên"

### Contribution Percentage
- Sum of all valid members' contributions must equal 100% (±5%)
- Error: "Tổng % đóng góp phải bằng 100% (hiện tại: X%)"

### Valid Member
- A member is valid if both name and studentId are filled

## API Endpoints

### POST /api/group-surveys/members-info

**Request Body:**
```json
{
  "groupCode": "string",
  "members": [
    {
      "name": "string",
      "studentId": "string",
      "email": "string",
      "role": "leader|member|secretary|treasurer",
      "contribution": number,
      "skills": ["string"]
    }
  ],
  "teamDynamics": {
    "communicationRating": number,
    "collaborationRating": number,
    "conflictResolution": "string",
    "meetingFrequency": "string"
  }
}
```

## Data Model

```typescript
interface Member {
  name: string;
  studentId: string;
  email: string;
  role: 'leader' | 'member' | 'secretary' | 'treasurer';
  contribution: number;
  skills: string[];
}

interface TeamDynamics {
  communicationRating: number; // 1-5
  collaborationRating: number; // 1-5
  conflictResolution: 'excellent' | 'good' | 'fair' | 'poor';
  meetingFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
}

interface MembersInfo {
  groupCode: string;
  members: Member[];
  teamDynamics: TeamDynamics;
}
```

## Component Structure

```
MembersInfoForm
├── Member slots (5 default)
│   ├── Basic info inputs
│   └── Skills checkboxes
├── Team Dynamics section
│   ├── Star ratings
│   └── Select dropdowns
└── Buttons
```

## Success Flow

```
User fills member information
  ↓
Validate at least 2 members
  ↓
Calculate total contribution %
  ↓
Validate total = 100% (±5%)
  ↓
User rates team dynamics
  ↓
POST to /api/group-surveys/members-info
  ↓
Navigate to Project Activities form
```

## Special Notes

- Only members with both name and studentId are considered valid
- Contribution percentages should sum to 100% for valid members only
- Star rating component provides visual feedback
- Skills are optional but recommended
