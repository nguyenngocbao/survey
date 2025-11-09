# Form Kế hoạch Tương lai (Individual - Future Plans)

## User Story

**As a** Student_User  
**I want to** share my career goals, graduation plans, and skills I want to develop  
**So that** the system can understand my future aspirations and help track my development goals

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị form kế hoạch tương lai
WHEN a Student_User accesses the future plans form, THE Survey_System SHALL display fields for career goals, graduation plan, further education, work experience, and skills to improve

### AC2: Validation mục tiêu nghề nghiệp
WHEN a Student_User submits without career goals, THE Survey_System SHALL display error "Vui lòng điền đầy đủ thông tin bắt buộc"

### AC3: Chọn kế hoạch tốt nghiệp
WHEN a Student_User selects graduation plan, THE Survey_System SHALL require one option to be selected

### AC4: Toggle học lên cao học
WHEN a Student_User toggles further education switch, THE Survey_System SHALL update the form state

### AC5: Toggle đi làm ngay
WHEN a Student_User toggles work experience switch, THE Survey_System SHALL update the form state

### AC6: Hoàn thành khảo sát
WHEN a Student_User successfully submits this final form, THE Survey_System SHALL mark the entire survey as completed and display completion message

## UI/UX Requirements

### Layout
- Card container với backdrop blur
- Icon header: 🚀 với purple gradient
- Title: "Kế hoạch tương lai"
- Subtitle: "Chia sẻ về mục tiêu và kế hoạch phát triển của bạn"

### Form Fields

#### Mục tiêu nghề nghiệp * (Required)
- Type: Textarea
- Rows: 4
- Placeholder: "Ví dụ: Trở thành một Full-stack Developer tại công ty công nghệ lớn..."
- Helper text: "Mô tả chi tiết về công việc mơ ước, vị trí bạn muốn đạt được trong 3-5 năm tới"
- Required: Yes

#### Kế hoạch tốt nghiệp * (Required)
- Type: Select dropdown
- Options:
  - Tốt nghiệp đúng hạn (4 năm)
  - Tốt nghiệp sớm (3.5 năm)
  - Tốt nghiệp muộn (4.5-5 năm)
  - Chưa chắc chắn
- Required: Yes

#### Kế hoạch sau tốt nghiệp
- Background: Purple-50
- **Học lên cao học/thạc sĩ**: Switch toggle
  - Label: "Bạn có dự định tiếp tục học lên bậc cao hơn không?"
- **Đi làm ngay sau tốt nghiệp**: Switch toggle
  - Label: "Bạn có muốn tìm việc làm ngay sau khi tốt nghiệp không?"

#### Kỹ năng muốn phát triển
- Type: Multiple checkboxes
- Options:
  - Lập trình Web, Lập trình Mobile, Cơ sở dữ liệu
  - Machine Learning/AI, DevOps, UI/UX Design
  - Quản lý dự án, Tiếng Anh, Giao tiếp
  - Làm việc nhóm, Thuyết trình, Tư duy logic
- Layout: Grid 3 columns

#### Lời nhắn cuối
- Background: Gradient purple-50 to pink-50
- Icon: 🎯
- Message: "Cảm ơn bạn đã dành thời gian hoàn thành khảo sát này!"

### Buttons
- **Hủy**: Outline variant
- **Hoàn thành khảo sát 🎉**: Purple gradient, indicates final submission

### Colors
- Primary: Purple gradient (from-purple-500 to-purple-600)

## Validation Rules

### Career Goals
- Required: Yes
- Min length: 10 characters
- Error: "Vui lòng điền đầy đủ thông tin bắt buộc"

### Graduation Plan
- Required: Yes
- Must select one option

## API Endpoints

### POST /api/surveys/future-plans

**Request Body:**
```json
{
  "careerGoals": "string",
  "graduationPlan": "string",
  "furtherEducation": boolean,
  "workExperience": boolean,
  "skills": ["string"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Survey completed successfully",
  "surveyId": "string"
}
```

## Data Model

```typescript
interface FuturePlans {
  careerGoals: string;
  graduationPlan: string;
  furtherEducation: boolean;
  workExperience: boolean;
  skills: string[];
}
```

## Success Flow

```
User fills career goals (required)
  ↓
User selects graduation plan (required)
  ↓
User toggles further education/work plans
  ↓
User selects skills to improve
  ↓
Validate required fields
  ↓
POST to /api/surveys/future-plans
  ↓
Mark survey as completed
  ↓
Show completion toast: "Đã hoàn thành khảo sát! Cảm ơn bạn đã tham gia."
  ↓
Call onComplete() → Show completion screen
```

## Special Notes

- This is the FINAL form in the individual survey flow
- Successful submission marks the entire survey as completed
- The completion message should be celebratory
- Consider showing a summary or next steps after completion
