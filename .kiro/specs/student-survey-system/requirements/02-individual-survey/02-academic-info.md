# Form Thông tin Học tập (Individual - Academic Info)

## User Story

**As a** Student_User  
**I want to** provide information about my academic performance, study habits, and learning preferences  
**So that** the system can understand my academic profile and learning style

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị form học tập
WHEN a Student_User accesses the academic info form, THE Survey_System SHALL display fields for GPA, study hours, learning style, favorite subjects, and difficulties

### AC2: Validation GPA
WHEN a Student_User enters a GPA value, THE Survey_System SHALL validate that the value is between 0.0 and 4.0

### AC3: Validation số giờ học
WHEN a Student_User enters study hours, THE Survey_System SHALL validate that the value is between 0 and 24

### AC4: Chọn môn học yêu thích
WHEN a Student_User selects favorite subjects, THE Survey_System SHALL allow multiple selections from the predefined list

### AC5: Chọn khó khăn học tập
WHEN a Student_User selects difficulties, THE Survey_System SHALL allow multiple selections from the predefined list

### AC6: Lưu dữ liệu
WHEN a Student_User successfully submits the form, THE Survey_System SHALL save the data to MongoDB_Database via POST request to `/api/surveys/academic-info`

## UI/UX Requirements

### Layout
- Card container với backdrop blur
- Icon header: 📚 với green gradient
- Title: "Thông tin học tập"
- Subtitle: "Chia sẻ về quá trình học tập và phong cách học của bạn"

### Form Fields

#### GPA hiện tại *
- Type: Number input
- Step: 0.01
- Min: 0
- Max: 4
- Placeholder: "3.50"
- Required: Yes

#### Số giờ học/ngày *
- Type: Number input
- Min: 0
- Max: 24
- Placeholder: "6"
- Required: Yes

#### Phong cách học tập *
- Type: Select dropdown
- Options:
  - Học qua hình ảnh (Visual)
  - Học qua nghe (Auditory)
  - Học qua thực hành (Kinesthetic)
  - Học qua đọc viết (Reading/Writing)
- Required: Yes

#### Môn học yêu thích
- Type: Multiple checkboxes
- Options:
  - Toán học
  - Lập trình
  - Cơ sở dữ liệu
  - Mạng máy tính
  - Hệ điều hành
  - Kỹ thuật phần mềm
  - Trí tuệ nhân tạo
  - Bảo mật thông tin
  - Thiết kế web
  - Mobile App
- Layout: Grid 2-3 columns

#### Khó khăn trong học tập
- Type: Multiple checkboxes
- Options:
  - Quản lý thời gian
  - Tập trung học tập
  - Hiểu bài giảng
  - Làm bài tập nhóm
  - Thuyết trình
  - Lập trình
  - Toán học
  - Tiếng Anh
- Layout: Grid 2-3 columns

### Colors
- Primary: Green gradient (from-green-500 to-green-600)

## Validation Rules

### GPA
- Required
- Must be a number
- Range: 0.0 - 4.0
- Error: "GPA phải là số từ 0.0 đến 4.0"

### Study Hours
- Required
- Must be an integer
- Range: 0 - 24
- Error: "Số giờ học phải từ 0 đến 24"

### Learning Style
- Required
- Must select one option

## API Endpoints

### POST /api/surveys/academic-info

**Request Body:**
```json
{
  "gpa": 3.5,
  "studyHours": 6,
  "learningStyle": "visual",
  "favoriteSubjects": ["Lập trình", "Cơ sở dữ liệu"],
  "difficulties": ["Quản lý thời gian"]
}
```

## Data Model

```typescript
interface AcademicInfo {
  gpa: number;
  studyHours: number;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  favoriteSubjects: string[];
  difficulties: string[];
}
```

## Success Flow

```
User fills academic info
  ↓
Validate GPA and study hours
  ↓
POST to /api/surveys/academic-info
  ↓
Show success toast
  ↓
Navigate to Interests form
```
