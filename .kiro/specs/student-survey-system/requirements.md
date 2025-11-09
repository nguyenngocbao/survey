# Requirements Document - Hệ thống Khảo sát Học sinh

> **Lưu ý**: Requirements đã được tổ chức lại thành các file riêng biệt cho từng màn hình.  
> Xem thư mục `requirements/` để truy cập requirements chi tiết.

## Cấu trúc Requirements Mới

Requirements hiện được tổ chức theo từng màn hình/workflow riêng biệt:

### 📁 Cấu trúc: `requirements/`

```
requirements/
├── README.md                      # Hướng dẫn sử dụng
├── 00-overview.md                 # Tổng quan hệ thống
│
├── 01-home-screen/                # Màn hình chính
│   └── requirements.md
│
├── 02-individual-survey/          # Khảo sát Cá nhân
│   ├── README.md                  # Overview
│   ├── 01-personal-info.md
│   ├── 02-academic-info.md
│   ├── 03-interests.md
│   └── 04-future-plans.md
│
├── 03-group-survey/               # Khảo sát Nhóm
│   ├── README.md                  # Overview
│   ├── 01-group-info.md
│   ├── 02-members.md
│   ├── 03-project-activities.md
│   └── 04-evaluation.md
│
└── 04-admin/                      # Quản trị (Ứng dụng riêng)
    ├── README.md                  # Overview
    ├── 01-dashboard.md
    ├── 02-survey-list.md
    ├── 03-survey-detail.md
    ├── 04-export.md
    └── 05-authentication.md       # ⚠️ Cần implement
```

### 🏗️ Kiến trúc Hệ thống

**Hai ứng dụng độc lập:**

```
survey/ (Port 3000)              admin-app/ (Port 3001)
├── Trang chủ                    ├── Login (cần implement)
├── Khảo sát cá nhân             ├── Dashboard
├── Khảo sát nhóm                ├── Danh sách khảo sát
└── APIs                         ├── Chi tiết khảo sát
                                 ├── Xuất dữ liệu
                                 └── Admin APIs
        │                                │
        └────────── MongoDB ─────────────┘
                   (Shared)
```

### 📖 Hướng dẫn

Xem file **requirements/README.md** để biết:
- Cách sử dụng cấu trúc mới
- Quy trình thay đổi requirements
- Best practices
- Ví dụ cụ thể

## Lợi ích của Cấu trúc Mới

✅ **Dễ quản lý**: Mỗi màn hình có file riêng, dễ tìm và chỉnh sửa  
✅ **Collaboration tốt hơn**: Nhiều người có thể làm việc song song trên các màn hình khác nhau  
✅ **Version control**: Git diff rõ ràng hơn khi chỉ thay đổi một file  
✅ **Chi tiết hơn**: Mỗi file có đầy đủ thông tin về UI/UX, validation, API, data model  
✅ **Dễ review**: Review từng màn hình một cách độc lập

## Introduction

Hệ thống khảo sát học sinh là một ứng dụng web toàn diện được thiết kế để thu thập, quản lý và phân tích thông tin hồ sơ điện tử của học sinh. Hệ thống hỗ trợ hai loại khảo sát chính: khảo sát cá nhân và khảo sát nhóm, với giao diện quản trị dành cho giáo viên để theo dõi và xuất dữ liệu.

## Glossary

- **Survey_System**: Hệ thống khảo sát học sinh toàn diện
- **Individual_Survey**: Khảo sát cá nhân gồm 4 form riêng biệt
- **Group_Survey**: Khảo sát nhóm học tập gồm 4 form nhóm
- **Admin_Panel**: Giao diện quản trị dành cho giáo viên
- **Student_User**: Học sinh sử dụng hệ thống để điền khảo sát
- **Teacher_User**: Giáo viên sử dụng giao diện quản trị
- **Form_Section**: Một phần của khảo sát (personal, academic, interests, future)
- **Progress_Tracking**: Theo dõi tiến độ hoàn thành khảo sát
- **Data_Export**: Chức năng xuất dữ liệu CSV/JSON
- **Image_Upload**: Chức năng upload ảnh với Cloudflare R2
- **MongoDB_Database**: Cơ sở dữ liệu lưu trữ thông tin khảo sát

## Requirements

### Requirement 1: Khảo sát cá nhân học sinh

**User Story:** As a Student_User, I want to complete a comprehensive individual survey, so that I can provide my personal, academic, interests, and future plans information to the school.

#### Acceptance Criteria

1. WHEN a Student_User accesses the individual survey, THE Survey_System SHALL display a 4-step form navigation with progress tracking
2. WHEN a Student_User completes the personal information form, THE Survey_System SHALL save the data to MongoDB_Database and mark the personal section as completed
3. WHEN a Student_User uploads an avatar image, THE Survey_System SHALL store the image using Image_Upload service and save the URL to the database
4. WHEN a Student_User completes all 4 Form_Sections, THE Survey_System SHALL automatically mark the survey as completed and record the submission timestamp
5. THE Survey_System SHALL validate all required fields before allowing progression to the next section

### Requirement 2: Khảo sát nhóm học tập

**User Story:** As a Student_User, I want to complete a group survey with my team members, so that we can document our group activities, project progress, and team dynamics.

#### Acceptance Criteria

1. WHEN a Student_User creates a new group survey, THE Survey_System SHALL generate a unique group code for team identification
2. WHEN a Student_User enters group information, THE Survey_System SHALL validate that member count is between 2 and 10 people
3. WHEN a Student_User adds team members, THE Survey_System SHALL allow assignment of roles (leader, member, secretary, treasurer) and contribution percentages
4. WHEN a Student_User uploads project photos, THE Survey_System SHALL support up to 8 images per project using Image_Upload service
5. WHEN a Student_User completes member evaluations, THE Survey_System SHALL record ratings on a 1-5 scale for participation, reliability, creativity, and leadership

### Requirement 3: Giao diện quản trị cho giáo viên

**User Story:** As a Teacher_User, I want to access an admin panel to view survey statistics and manage student data, so that I can monitor student progress and analyze survey results.

#### Acceptance Criteria

1. WHEN a Teacher_User accesses the admin panel, THE Survey_System SHALL display comprehensive statistics including total surveys, completion rates, and recent submissions
2. WHEN a Teacher_User views the survey list, THE Survey_System SHALL show filterable data with completion status, submission dates, and student information
3. WHEN a Teacher_User clicks on a survey entry, THE Survey_System SHALL display detailed survey information in a modal popup with all form sections
4. WHEN a Teacher_User requests data export, THE Survey_System SHALL generate CSV and JSON files with UTF-8 encoding for Vietnamese text support
5. THE Survey_System SHALL provide separate admin views for individual surveys and group surveys

### Requirement 4: Lưu trữ và quản lý dữ liệu

**User Story:** As a system administrator, I want reliable data storage and management capabilities, so that survey data is securely stored and easily retrievable.

#### Acceptance Criteria

1. THE Survey_System SHALL store all survey data in MongoDB_Database with proper schema validation
2. WHEN survey data is saved, THE Survey_System SHALL automatically update timestamps for creation and modification
3. WHEN a survey is completed, THE Survey_System SHALL set completion status and submission timestamp
4. THE Survey_System SHALL maintain separate collections for individual surveys and group surveys
5. THE Survey_System SHALL support data relationships between group members and their individual contributions

### Requirement 5: Upload và quản lý hình ảnh

**User Story:** As a Student_User, I want to upload images for my profile and group activities, so that I can enhance my survey with visual documentation.

#### Acceptance Criteria

1. WHEN a Student_User uploads an image, THE Survey_System SHALL validate file type (JPEG, PNG, WebP) and size limits
2. WHEN an image upload is successful, THE Survey_System SHALL store the file using Cloudflare R2 service and return a public URL
3. THE Survey_System SHALL support drag-and-drop image upload with preview functionality
4. WHEN multiple images are uploaded for group activities, THE Survey_System SHALL maintain proper ordering and association with the project
5. THE Survey_System SHALL provide fallback handling for upload failures with user-friendly error messages

### Requirement 6: Responsive design và trải nghiệm người dùng

**User Story:** As a Student_User, I want to access the survey system on any device with an intuitive interface, so that I can complete surveys conveniently from desktop or mobile devices.

#### Acceptance Criteria

1. THE Survey_System SHALL provide responsive design that adapts to desktop, tablet, and mobile screen sizes
2. WHEN a Student_User navigates between form sections, THE Survey_System SHALL maintain progress state and allow returning to previous sections
3. THE Survey_System SHALL provide visual feedback for form validation errors with clear error messages
4. WHEN a Student_User interacts with rating components, THE Survey_System SHALL provide intuitive star-based rating interfaces
5. THE Survey_System SHALL use consistent color coding and visual hierarchy throughout the application

### Requirement 7: API và tích hợp hệ thống

**User Story:** As a developer, I want well-structured APIs for all survey operations, so that the system can be integrated with other educational platforms.

#### Acceptance Criteria

1. THE Survey_System SHALL provide RESTful API endpoints for all survey operations (create, read, update)
2. WHEN API requests are made, THE Survey_System SHALL validate input data and return appropriate HTTP status codes
3. THE Survey_System SHALL provide separate API routes for individual surveys (/api/surveys/) and group surveys (/api/group-surveys/)
4. WHEN admin operations are performed, THE Survey_System SHALL provide dedicated admin API endpoints (/api/admin/)
5. THE Survey_System SHALL handle API errors gracefully with informative error messages and proper error logging

### Requirement 8: Thống kê và báo cáo

**User Story:** As a Teacher_User, I want to view comprehensive statistics and generate reports, so that I can analyze student survey data and track completion trends.

#### Acceptance Criteria

1. WHEN a Teacher_User accesses statistics, THE Survey_System SHALL display real-time completion rates for both individual and group surveys
2. THE Survey_System SHALL calculate and display average ratings, popular choices, and completion time analytics
3. WHEN generating reports, THE Survey_System SHALL provide export options in multiple formats (CSV, JSON) with proper data formatting
4. THE Survey_System SHALL show visual progress indicators and completion badges for easy status identification
5. THE Survey_System SHALL provide filtering capabilities by date range, completion status, and survey type