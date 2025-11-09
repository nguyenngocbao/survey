# Form Sở thích & Hoạt động (Individual - Interests)

## User Story

**As a** Student_User  
**I want to** share my hobbies, sports activities, club memberships, and activity photos  
**So that** the system can understand my interests and extracurricular involvement

## Acceptance Criteria (EARS Format)

### AC1: Hiển thị form sở thích
WHEN a Student_User accesses the interests form, THE Survey_System SHALL display sections for hobbies, sports, clubs, volunteer work, leadership, and photos

### AC2: Chọn sở thích
WHEN a Student_User selects hobbies, THE Survey_System SHALL require at least one hobby to be selected

### AC3: Upload ảnh hoạt động
WHEN a Student_User uploads activity photos, THE Survey_System SHALL allow up to 5 images with max 3MB each

### AC4: Toggle hoạt động tình nguyện
WHEN a Student_User toggles volunteer work switch, THE Survey_System SHALL update the form state accordingly

### AC5: Toggle kinh nghiệm lãnh đạo
WHEN a Student_User toggles leadership switch, THE Survey_System SHALL update the form state accordingly

### AC6: Lưu dữ liệu
WHEN a Student_User successfully submits the form, THE Survey_System SHALL save the data to MongoDB_Database via POST request to `/api/surveys/interests`

## UI/UX Requirements

### Layout
- Card container với backdrop blur
- Icon header: 🎯 với orange gradient
- Title: "Sở thích & Hoạt động"
- Subtitle: "Chia sẻ về sở thích và các hoạt động bạn tham gia"

### Form Sections

#### Sở thích cá nhân * (Required)
- Type: Multiple checkboxes
- Options:
  - Đọc sách, Nghe nhạc, Xem phim, Chơi game
  - Vẽ/Thiết kế, Chụp ảnh, Du lịch, Nấu ăn
  - Làm vườn, Học ngoại ngữ, Lập trình, Viết blog
- Layout: Grid 4 columns
- Validation: Ít nhất 1 sở thích

#### Thể thao yêu thích
- Type: Multiple checkboxes
- Options:
  - Bóng đá, Bóng rổ, Cầu lông, Bóng bàn
  - Bơi lội, Chạy bộ, Gym/Fitness, Yoga
  - Võ thuật, Tennis, Đạp xe
- Layout: Grid 4 columns

#### Câu lạc bộ tham gia
- Type: Multiple checkboxes
- Options:
  - CLB Lập trình, CLB Tiếng Anh, CLB Nhiếp ảnh
  - CLB Âm nhạc, CLB Thể thao, CLB Tình nguyện
  - CLB Khởi nghiệp, CLB Học thuật, CLB Văn hóa
  - CLB Nghệ thuật, CLB Du lịch, CLB Công nghệ
- Layout: Grid 3 columns

#### Hoạt động khác
- **Tham gia hoạt động tình nguyện**: Switch toggle
- **Có kinh nghiệm lãnh đạo**: Switch toggle
- Background: Orange-50

#### Ảnh hoạt động
- Type: Multi-image upload
- Max images: 5
- Max size per image: 3MB
- Component: `MultiImageUpload`
- Description: "Chia sẻ những hình ảnh về các hoạt động, sở thích của bạn"

### Colors
- Primary: Orange gradient (from-orange-500 to-orange-600)

## Validation Rules

### Hobbies
- Required: Yes
- Min selections: 1
- Error: "Vui lòng chọn ít nhất một sở thích"

### Photos
- Max count: 5
- Max size: 3MB per image
- Formats: JPEG, PNG, WebP

## API Endpoints

### POST /api/surveys/interests

**Request Body:**
```json
{
  "hobbies": ["Đọc sách", "Lập trình"],
  "sports": ["Bóng đá"],
  "clubs": ["CLB Lập trình"],
  "volunteerWork": true,
  "leadership": false,
  "photos": ["url1", "url2"]
}
```

## Data Model

```typescript
interface Interests {
  hobbies: string[];
  sports: string[];
  clubs: string[];
  volunteerWork: boolean;
  leadership: boolean;
  photos: string[];
}
```

## Component Dependencies

- `MultiImageUpload`: For uploading multiple activity photos
- `Checkbox`: For multi-select options
- `Switch`: For boolean toggles

## Success Flow

```
User selects hobbies (required)
  ↓
User optionally selects sports, clubs
  ↓
User toggles volunteer/leadership
  ↓
User uploads photos (optional)
  ↓
Validate at least 1 hobby selected
  ↓
POST to /api/surveys/interests
  ↓
Navigate to Future Plans form
```
