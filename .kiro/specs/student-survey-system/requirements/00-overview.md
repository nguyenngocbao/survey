# Tổng quan Hệ thống Khảo sát Học sinh

## Giới thiệu

Hệ thống khảo sát học sinh là một ứng dụng web toàn diện được thiết kế để thu thập, quản lý và phân tích thông tin hồ sơ điện tử của học sinh. Hệ thống hỗ trợ hai loại khảo sát chính: khảo sát cá nhân và khảo sát nhóm, với giao diện quản trị dành cho giáo viên để theo dõi và xuất dữ liệu.

## Thuật ngữ (Glossary)

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

## Cấu trúc Màn hình

### 1. Màn hình Chính (Home)
- Chọn loại khảo sát (Cá nhân / Nhóm)
- Thư mục: `01-home-screen/`
- File: `requirements.md`

### 2. Khảo sát Cá nhân (Individual Survey)
- Thư mục: `02-individual-survey/`
- Overview: `README.md`
- **2.1** Form Thông tin Cá nhân - `01-personal-info.md`
- **2.2** Form Thông tin Học tập - `02-academic-info.md`
- **2.3** Form Sở thích & Hoạt động - `03-interests.md`
- **2.4** Form Kế hoạch Tương lai - `04-future-plans.md`

### 3. Khảo sát Nhóm (Group Survey)
- Thư mục: `03-group-survey/`
- Overview: `README.md`
- **3.1** Form Thông tin Nhóm - `01-group-info.md`
- **3.2** Form Thành viên Nhóm - `02-members.md`
- **3.3** Form Dự án & Hoạt động - `03-project-activities.md`
- **3.4** Form Đánh giá & Phản hồi - `04-evaluation.md`

### 4. Giao diện Quản trị (Admin) - **Ứng dụng Riêng**
- **App**: `admin-app/` (Separate application)
- **Domain**: `admin.hcmue.edu.vn`
- **Port**: 3001
- Thư mục requirements: `04-admin/`
- Overview: `README.md`
- **4.1** Dashboard Quản trị - `01-dashboard.md`
- **4.2** Danh sách Khảo sát - `02-survey-list.md`
- **4.3** Chi tiết Khảo sát - `03-survey-detail.md`
- **4.4** Xuất Dữ liệu - `04-export.md`
- **4.5** Authentication - `05-authentication.md` (Cần implement)

## Luồng Hoạt động Chính

### Luồng Khảo sát Cá nhân
```
Home → Chọn "Cá nhân" → Personal Info → Academic Info → Interests → Future Plans → Hoàn thành
```

### Luồng Khảo sát Nhóm
```
Home → Chọn "Nhóm" → Group Info → Members Info → Project Activities → Evaluation → Hoàn thành
```

### Luồng Quản trị
```
Admin Dashboard → Xem thống kê → Danh sách khảo sát → Chi tiết khảo sát → Xuất dữ liệu
```

## Kiến trúc Hệ thống (Sau khi tách)

### 🏗️ Hai Ứng dụng Độc lập

#### Survey App (Khảo sát Sinh viên)
- **Domain**: `survey.hcmue.edu.vn`
- **Port Local**: 3000
- **Mục đích**: Thu thập khảo sát từ sinh viên
- **Users**: Sinh viên

#### Admin App (Quản trị)
- **Domain**: `admin.hcmue.edu.vn`
- **Port Local**: 3001
- **Mục đích**: Quản lý và phân tích dữ liệu khảo sát
- **Users**: Giáo viên/Admin
- **Authentication**: Required

### Shared Resources
- **Database**: MongoDB (shared)
- **Storage**: Cloudflare R2 (shared)

## Yêu cầu Kỹ thuật Chung

### Backend
- Next.js API Routes
- MongoDB Database (shared)
- Cloudflare R2 Storage (shared)

### Frontend
- React/Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui Components

### Tính năng Chung
- Responsive design (Desktop, Tablet, Mobile)
- Form validation
- Progress tracking
- Image upload
- Data export (CSV, JSON)
- Real-time statistics
- Authentication (Admin only)

## Cách Sử dụng Tài liệu

### Cấu trúc Thư mục
Requirements được tổ chức theo nhóm chức năng:
- Mỗi nhóm có thư mục riêng
- Mỗi thư mục có file README.md với tổng quan
- Các màn hình trong nhóm được đánh số thứ tự

### Đọc Requirements
1. Bắt đầu với file này (`00-overview.md`) để hiểu tổng quan
2. Đọc README.md của nhóm chức năng cần tìm hiểu
3. Đọc file requirements cụ thể của màn hình

Mỗi file requirements chi tiết sẽ bao gồm:
1. **User Story**: Mô tả nhu cầu người dùng
2. **Acceptance Criteria**: Tiêu chí chấp nhận theo chuẩn EARS
3. **UI/UX Requirements**: Yêu cầu giao diện
4. **Validation Rules**: Quy tắc kiểm tra dữ liệu
5. **API Endpoints**: Các endpoint liên quan
6. **Data Models**: Cấu trúc dữ liệu

Khi cần thay đổi yêu cầu cho một màn hình cụ thể, chỉ cần chỉnh sửa file requirements tương ứng.
