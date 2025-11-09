# Form Đánh giá & Phản hồi (Group - Evaluation & Feedback)

## User Story

**As a** Student_User  
**I want to** evaluate our group's performance, provide feedback on individual members, and plan for future collaboration  
**So that** we can reflect on our teamwork and identify areas for improvement

## Acceptance Criteria (EARS Format)

### AC1: Đánh giá hiệu quả nhóm
WHEN a Student_User rates group performance, THE Survey_System SHALL use star rating (1-5) for overall rating

### AC2: Chọn điểm mạnh nhóm
WHEN a Student_User selects group strengths, THE Survey_System SHALL allow multiple selections from predefined options

### AC3: Chọn điểm yếu nhóm
WHEN a Student_User selects weaknesses, THE Survey_System SHALL allow multiple selections from predefined options

### AC4: Đánh giá từng thành viên
WHEN a Student_User adds member evaluations, THE Survey_System SHALL provide 4 rating criteria (participation, reliability, creativity, leadership) with 1-5 stars each

### AC5: Kế hoạch tương lai
WHEN a Student_User fills future plans, THE Survey_System SHALL capture continuation plans, next project, and skills to improve

### AC6: Hoàn thành khảo sát nhóm
WHEN a Student_User successfully submits this final form, THE Survey_System SHALL mark the entire group survey as completed

## UI/UX Requirements

### Layout
- Card container với backdrop blur
- Icon header: ⭐ với cyan gradient
- Title: "Đánh giá & Phản hồi"
- Subtitle: "Đánh giá hiệu quả làm việc nhóm và lên kế hoạch tương lai"

### Group Performance Section

Background: Cyan-50

#### Đánh giá tổng thể
- Star rating (1-5)
- Label: "Đánh giá tổng thể về nhóm (1-5 sao)"

#### Điểm mạnh của nhóm
- Multiple checkboxes (Grid 4 columns)
- Options:
  - Giao tiếp tốt, Phân công rõ ràng, Hỗ trợ lẫn nhau, Sáng tạo
  - Kỹ thuật tốt, Quản lý thời gian, Giải quyết vấn đề, Teamwork

#### Điểm cần cải thiện
- Multiple checkboxes (Grid 4 columns)
- Options:
  - Giao tiếp kém, Phân công không rõ, Thiếu hỗ trợ, Ít sáng tạo
  - Kỹ thuật yếu, Quản lý thời gian kém, Khó giải quyết vấn đề, Làm việc cá nhân

#### Lĩnh vực cần cải thiện
- Multiple checkboxes (Grid 4 columns)
- Options:
  - Kỹ năng kỹ thuật, Giao tiếp, Quản lý thời gian, Leadership
  - Teamwork, Giải quyết vấn đề, Sáng tạo, Thuyết trình

### Member Evaluations Section

Dynamic list with add/remove functionality

Each member evaluation includes:

#### Tên thành viên
- Text input

#### 4 Rating Criteria (Star ratings 1-5)
- **Tham gia hoạt động**: Star rating
- **Độ tin cậy**: Star rating
- **Tính sáng tạo**: Star rating
- **Khả năng lãnh đạo**: Star rating

#### Nhận xét chi tiết
- Textarea (2 rows)
- Placeholder: "Nhận xét về thành viên này..."

### Future Plans Section

Background: Cyan-50

#### Tiếp tục làm việc cùng nhau
- Checkbox
- Label: "Nhóm sẽ tiếp tục làm việc cùng nhau trong tương lai"

#### Dự án tiếp theo
- Text input
- Placeholder: "Mobile App, Website thương mại điện tử..."

#### Kỹ năng cần cải thiện
- Multiple checkboxes (Grid 4 columns)
- Options:
  - Lập trình, Thiết kế, Quản lý dự án, Giao tiếp
  - Thuyết trình, Viết báo cáo, Teamwork, Leadership

#### Đề xuất thay đổi quy trình
- Textarea (3 rows)
- Placeholder: "Đề xuất cải thiện quy trình, phương pháp làm việc nhóm..."

### Buttons
- **Hủy**: Outline variant
- **🎉 Hoàn thành khảo sát nhóm**: Cyan gradient, indicates final submission

### Colors
- Primary: Cyan gradient (from-cyan-500 to-cyan-600)

## Validation Rules

### Member Evaluations
- Member name is optional
- Only members with names filled will be submitted
- Ratings default to 3 if not changed

### Group Performance
- Overall rating defaults to 3
- Strengths, weaknesses, and improvement areas are optional

## API Endpoints

### POST /api/group-surveys/evaluation-feedback

**Request Body:**
```json
{
  "groupCode": "string",
  "groupPerformance": {
    "overallRating": number,
    "strengths": ["string"],
    "weaknesses": ["string"],
    "improvementAreas": ["string"]
  },
  "memberEvaluations": [
    {
      "memberName": "string",
      "ratings": {
        "participation": number,
        "reliability": number,
        "creativity": number,
        "leadership": number
      },
      "feedback": "string"
    }
  ],
  "futurePlans": {
    "continueWorking": boolean,
    "nextProject": "string",
    "skillsToImprove": ["string"],
    "recommendChanges": "string"
  }
}
```

## Data Model

```typescript
interface GroupPerformance {
  overallRating: number; // 1-5
  strengths: string[];
  weaknesses: string[];
  improvementAreas: string[];
}

interface MemberEvaluation {
  memberName: string;
  ratings: {
    participation: number; // 1-5
    reliability: number; // 1-5
    creativity: number; // 1-5
    leadership: number; // 1-5
  };
  feedback: string;
}

interface FuturePlans {
  continueWorking: boolean;
  nextProject: string;
  skillsToImprove: string[];
  recommendChanges: string;
}

interface EvaluationFeedback {
  groupCode: string;
  groupPerformance: GroupPerformance;
  memberEvaluations: MemberEvaluation[];
  futurePlans: FuturePlans;
}
```

## Dynamic List Management

### Member Evaluations
- Initial: 1 evaluation slot
- Add: Click "Thêm thành viên" button
- Remove: Click ✕ button (minimum 1 must remain)
- Only evaluations with memberName filled are submitted

## Success Flow

```
User rates overall group performance
  ↓
User selects strengths, weaknesses, improvement areas
  ↓
User adds member evaluations (optional)
  ↓
User fills future plans
  ↓
Filter out empty member evaluations
  ↓
POST to /api/group-surveys/evaluation-feedback
  ↓
Mark group survey as completed
  ↓
Show completion toast: "🎉 Hoàn thành! Đã hoàn thành khảo sát nhóm!"
  ↓
Call onComplete() → Show completion screen
```

## Special Notes

- This is the FINAL form in the group survey flow
- Successful submission marks the entire group survey as completed
- Member evaluations are optional but recommended
- Star ratings provide visual and intuitive feedback mechanism
- The completion message should be celebratory with emoji
