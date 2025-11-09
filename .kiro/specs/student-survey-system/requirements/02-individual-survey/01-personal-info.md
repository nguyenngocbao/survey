# Form Thông tin Cá nhân (Individual - Personal Info)

## User Story

**As a** Student_User  
**I want to** fill in my personal information including name, student ID, contact details, and avatar  
**So that** the system can identify me and store my basic profile information

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị form thông tin cá nhân
WHEN a Student_User accesses the personal info form, THE Survey_System SHALL display a form with fields for fullName, studentId, email, phone, class, major, and avatar

### AC2: Validation các trường bắt buộc
WHEN a Student_User submits the form with missing required fields, THE Survey_System SHALL display an error message "Vui lòng điền đầy đủ tất cả thông tin"

### AC3: Validation email
WHEN a Student_User enters an invalid email format, THE Survey_System SHALL display an error message "Email không hợp lệ"

### AC4: Upload avatar
WHEN a Student_User uploads an avatar image, THE Survey_System SHALL store the image using Image_Upload service and save the URL to the database

### AC5: Lưu dữ liệu
WHEN a Student_User successfully submits the form, THE Survey_System SHALL save the data to MongoDB_Database via POST request to `/api/surveys/personal-info`

### AC6: Lưu studentId vào localStorage
WHEN the personal info is saved successfully, THE Survey_System SHALL store the studentId in localStorage with key `currentStudentId` for use in subsequent forms

### AC7: Chuyển sang form tiếp theo
WHEN the personal info is saved successfully, THE Survey_System SHALL call the onComplete callback to navigate to the next form section

## UI/UX Requirements

### Layout
- Card container với backdrop blur effect
- Icon header: 👤 với blue gradient background
- Title: "Thông tin cá nhân"
- Subtitle: "Vui lòng điền đầy đủ thông tin cá nhân của bạn"

### Form Fields

#### Họ và tên (fullName) *
- Type: Text input
- Placeholder: "Nguyễn Văn A"
- Required: Yes

#### Mã số sinh viên (studentId) *
- Type: Text input
- Placeholder: "2021001234"
- Required: Yes

#### Email *
- Type: Email input
- Placeholder: "student@university.edu.vn"
- Required: Yes
- Validation: Email format

#### Số điện thoại (phone) *
- Type: Tel input
- Placeholder: "0123456789"
- Required: Yes

#### Lớp (class) *
- Type: Text input
- Placeholder: "CNTT01-K65"
- Required: Yes

#### Ngành học (major) *
- Type: Select dropdown
- Options:
  - Công nghệ thông tin
  - Kỹ thuật phần mềm
  - Khoa học máy tính
  - Hệ thống thông tin
  - An toàn thông tin
  - Trí tuệ nhân tạo
  - Khác
- Required: Yes

#### Ảnh đại diện (avatar)
- Type: Image upload
- Max size: 2MB
- Supported formats: JPEG, PNG, WebP
- Required: No
- Component: `ImageUpload`

### Buttons
- **Hủy**: Outline variant, calls onCancel
- **Lưu và tiếp tục**: Primary button với blue gradient, submits form

### Colors
- Primary: Blue gradient (from-blue-500 to-blue-600)
- Background: White with 90% opacity and backdrop blur

## Validation Rules

### Required Fields
- fullName: Không được để trống
- studentId: Không được để trống
- email: Không được để trống và phải đúng format email
- phone: Không được để trống
- class: Không được để trống
- major: Phải chọn một option

### Email Validation
```regex
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

### Avatar Upload
- Max file size: 2MB
- Allowed types: image/jpeg, image/png, image/webp

## API Endpoints

### POST /api/surveys/personal-info

**Request Body:**
```json
{
  "fullName": "string",
  "studentId": "string",
  "email": "string",
  "phone": "string",
  "class": "string",
  "major": "string",
  "avatar": "string (URL)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Personal info saved successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Data Model

```typescript
interface PersonalInfo {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  class: string;
  major: string;
  avatar?: string;
}
```

## Component Structure

```
PersonalInfoForm
├── Card (container)
│   ├── Header (icon + title)
│   ├── Form
│   │   ├── Input fields (grid layout)
│   │   ├── Select (major)
│   │   ├── ImageUpload (avatar)
│   │   └── Button group
│   └── Toast notifications
```

## State Management

```typescript
const [formData, setFormData] = useState({
  fullName: '',
  studentId: '',
  email: '',
  phone: '',
  class: '',
  major: '',
  avatar: '',
});
const [loading, setLoading] = useState(false);
```

## Error Handling

### Client-side Errors
- Missing required fields → Toast error
- Invalid email format → Toast error
- Image upload failure → Toast error

### Server-side Errors
- API failure → Toast error "Không thể lưu thông tin. Vui lòng thử lại."
- Network error → Toast error

## Success Flow

```
User fills form
  ↓
User clicks "Lưu và tiếp tục"
  ↓
Validate all fields
  ↓
POST to /api/surveys/personal-info
  ↓
Save studentId to localStorage
  ↓
Show success toast
  ↓
Call onComplete() → Navigate to Academic Info
```

## Accessibility

- All inputs have associated labels
- Required fields marked with red asterisk
- Error messages are clear and actionable
- Keyboard navigation support
- Focus management

## Performance

- Debounce image upload
- Lazy load image preview
- Optimize form validation
- Minimize re-renders

## Testing Scenarios

1. Submit form with all fields filled correctly
2. Submit form with missing required fields
3. Submit form with invalid email
4. Upload avatar image successfully
5. Upload avatar with file too large
6. Cancel form and verify no data is saved
7. Verify studentId is saved to localStorage
8. Verify navigation to next form after success
