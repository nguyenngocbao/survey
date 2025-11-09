# Admin Export Data - Xuất Dữ liệu

## User Story

**As a** Teacher_User  
**I want to** export survey data in CSV or JSON format  
**So that** I can analyze the data in external tools like Excel or custom applications

## Acceptance Criteria (EARS Format)

### AC1: Xuất CSV
WHEN a Teacher_User clicks "Tải CSV", THE Survey_System SHALL generate and download a CSV file with all survey data

### AC2: Xuất JSON
WHEN a Teacher_User clicks "Tải JSON", THE Survey_System SHALL generate and download a JSON file with all survey data

### AC3: UTF-8 encoding
WHEN exporting data, THE Survey_System SHALL use UTF-8 encoding to properly display Vietnamese characters

### AC4: Filename với timestamp
WHEN generating export files, THE Survey_System SHALL include the current date in the filename format `khao-sat-YYYY-MM-DD`

### AC5: Loading state
WHEN export is in progress, THE Survey_System SHALL disable export buttons and show loading text

### AC6: Success notification
WHEN export completes successfully, THE Survey_System SHALL display a success toast notification

### AC7: Error handling
WHEN export fails, THE Survey_System SHALL display an error toast notification

## UI/UX Requirements

### Layout
- Card container với white background
- Padding: 6 units
- Shadow: xl
- Border: None

### Header Section

#### Title
- Icon: 📊
- Text: "Xuất dữ liệu"
- Font: xl, bold

#### Subtitle
- Text: "Tải xuống dữ liệu khảo sát để phân tích"
- Color: Gray-600

### Export Options

Grid layout: 2 columns (responsive to 1 column on mobile)

#### CSV Export Card
- Icon: 📄 (large)
- Title: "Xuất CSV"
- Description: "Định dạng bảng tính, phù hợp cho Excel"
- Button: "📄 Tải CSV"
  - Color: Green-600
  - Full width
  - Disabled when exporting

#### JSON Export Card
- Icon: 📋 (large)
- Title: "Xuất JSON"
- Description: "Định dạng dữ liệu, phù hợp cho lập trình"
- Button: "📋 Tải JSON"
  - Color: Blue-600
  - Full width
  - Disabled when exporting

### Info Section

Background: Blue-50
Padding: 4 units
Border radius: lg

#### Title
- Icon: 💡
- Text: "Lưu ý:"
- Color: Blue-800
- Font weight: Semibold

#### Notes List
- Bullet points with blue color
- Font size: Small
- Items:
  - "Dữ liệu bao gồm tất cả khảo sát đã hoàn thành"
  - "Thông tin cá nhân được mã hóa để bảo mật"
  - "File được đặt tên theo ngày xuất"
  - "Có thể mở bằng Excel, Google Sheets hoặc text editor"

### Colors
- CSV button: Green-600
- JSON button: Blue-600
- Info background: Blue-50
- Info text: Blue-700

## API Endpoints

### GET /api/admin/export/csv

**Response:**
- Content-Type: `text/csv; charset=utf-8`
- Content-Disposition: `attachment; filename="khao-sat-YYYY-MM-DD.csv"`
- Body: CSV formatted data with UTF-8 BOM

**CSV Structure:**
```csv
"MSSV","Họ tên","Email","Lớp","Ngành","GPA","Giờ học/ngày",...
"2021001234","Nguyễn Văn A","student@edu.vn","CNTT01","CNTT",3.5,6,...
```

### GET /api/admin/export/json

**Response:**
- Content-Type: `application/json; charset=utf-8`
- Content-Disposition: `attachment; filename="khao-sat-YYYY-MM-DD.json"`
- Body: JSON formatted data

**JSON Structure:**
```json
{
  "exportDate": "2025-11-09T10:30:00Z",
  "totalSurveys": 150,
  "surveys": [
    {
      "studentId": "2021001234",
      "fullName": "Nguyễn Văn A",
      "email": "student@edu.vn",
      "personalInfo": {...},
      "academicInfo": {...},
      "interests": {...},
      "futurePlans": {...}
    }
  ]
}
```

## Data Model

### CSV Export
- Flat structure with all fields as columns
- Arrays converted to comma-separated strings
- Booleans as "Có"/"Không"
- UTF-8 with BOM for Excel compatibility

### JSON Export
- Nested structure preserving data hierarchy
- Arrays as JSON arrays
- Booleans as true/false
- Metadata included (export date, total count)

## Component Structure

```
ExportData
├── Card Container
│   ├── Header
│   │   ├── Title
│   │   └── Subtitle
│   ├── Export Options Grid
│   │   ├── CSV Card
│   │   │   ├── Icon
│   │   │   ├── Title & Description
│   │   │   └── Export Button
│   │   └── JSON Card
│   │       ├── Icon
│   │       ├── Title & Description
│   │       └── Export Button
│   └── Info Section
│       ├── Title
│       └── Notes List
└── Toast Notifications
```

## State Management

```typescript
const [exporting, setExporting] = useState(false);
```

## Export Flow

### CSV Export
```
User clicks "Tải CSV"
  ↓
Set exporting = true
  ↓
Fetch from /api/admin/export/csv
  ↓
Create blob from response
  ↓
Create download link
  ↓
Trigger download
  ↓
Clean up blob URL
  ↓
Set exporting = false
  ↓
Show success toast
```

### JSON Export
```
User clicks "Tải JSON"
  ↓
Set exporting = true
  ↓
Fetch from /api/admin/export/json
  ↓
Create blob from response
  ↓
Create download link
  ↓
Trigger download
  ↓
Clean up blob URL
  ↓
Set exporting = false
  ↓
Show success toast
```

## Error Handling

### Network Error
- Toast: "Không thể xuất dữ liệu"
- Variant: Destructive
- Reset exporting state

### Server Error
- Toast: "Lỗi server khi xuất dữ liệu"
- Variant: Destructive
- Reset exporting state

### Empty Data
- Toast: "Không có dữ liệu để xuất"
- Variant: Warning

## File Download Implementation

```typescript
const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
```

## CSV Formatting

### Headers
- All field names in Vietnamese
- Quoted strings for safety
- UTF-8 BOM: `\uFEFF`

### Data Rows
- Quote all string values
- Escape quotes with double quotes
- Convert arrays to "item1, item2, item3"
- Convert booleans to "Có"/"Không"

## JSON Formatting

### Structure
- Pretty print with 2-space indentation
- Include metadata
- Preserve data types
- Include timestamps

## Performance

- Stream large datasets
- Compress files if > 1MB
- Show progress for large exports
- Cancel ongoing exports

## Security

- Validate user permissions
- Sanitize exported data
- Remove sensitive fields if needed
- Log export activities

## Accessibility

- Keyboard accessible buttons
- Screen reader announcements
- Clear loading states
- Error messages

## Future Enhancements

- Filter data before export
- Schedule automatic exports
- Export to Google Sheets
- Export to PDF format
- Compress large files
- Email export links
- Export templates
