# ICS Security Platform

Hệ thống quản lý an ninh mạng hiện đại với đầy đủ tính năng cho Admin và User.

## 🚀 Tính năng chính

### Cho User:
- **User Center**: Thông tin tài khoản và thống kê
- **Source Code Analysis**: Phân tích mã nguồn (upload ZIP, max 2GB)
- **Compatibility**: Kiểm tra tương thích ứng dụng Android (APK/AAB)
- **AppTotalGo**: Quét và phân tích ứng dụng
- **APK Protect**: Bảo vệ ứng dụng Android
- **iOS Protect**: Bảo vệ ứng dụng iOS (50 lần)
- **Malware Intelligence**: Tin tức và cảnh báo về mã độc
- **Change Password**: Đổi mật khẩu với validation mạnh

### Cho Admin:
- **Dashboard**: Tổng quan hệ thống với analytics
- **User Management**: Quản lý người dùng
  - Tạo tài khoản mới
  - Phân quyền chi tiết
  - Xóa/Sửa user
  - Tìm kiếm và lọc
- **Analytics**: Thống kê chi tiết về hoạt động
- Truy cập tất cả tính năng của User

## 🎨 Thiết kế

- **Theme**: Dark mode với gradient xanh dương/cyan (cybersecurity theme)
- **Animations**: Framer Motion cho transitions mượt mà
- **Effects**: Glass morphism, gradient backgrounds, hover effects
- **Responsive**: Hoạt động tốt trên mobile, tablet, desktop
- **Professional**: Thiết kế cấp độ enterprise

## 🔐 Authentication

### Tài khoản demo:

**Admin:**
- Email: `admin@ics.com`
- Password: `admin123`

**User:**
- Email: `user@ics.com`
- Password: `user123`

### Các trang:
- `/auth/login` - Đăng nhập
- `/auth/forgot-password` - Quên mật khẩu
- `/auth/reset-password` - Đặt lại mật khẩu

## 📁 Cấu trúc dự án

```
src/
├── app/
│   ├── auth/                 # Authentication pages
│   │   ├── login/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── user/                 # User dashboard
│   │   ├── dashboard/
│   │   ├── source-code-analysis/
│   │   ├── compatibility/
│   │   ├── app-total-go/
│   │   ├── apk-protect/
│   │   ├── ios-protect/
│   │   ├── malware-intelligence/
│   │   └── change-password/
│   ├── admin/                # Admin dashboard
│   │   ├── dashboard/
│   │   ├── users/
│   │   └── analytics/
│   └── api/                  # API routes
│       └── auth/
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── layout/               # Layout components
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── Logo.tsx
├── lib/
│   ├── constants.ts          # App constants
│   └── utils.ts              # Utility functions
└── types/
    └── index.ts              # TypeScript types
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Validation**: React Hook Form + Zod
- **State Management**: React Hooks + localStorage

## 🚦 Chạy dự án

1. **Cài đặt dependencies:**
```bash
pnpm install
```

2. **Chạy development server:**
```bash
pnpm dev
```

3. **Mở trình duyệt:**
```
http://localhost:3000
```

## 📝 Lưu ý quan trọng

### Authentication Flow:
1. User truy cập `/` → tự động redirect đến `/auth/login`
2. Sau khi login thành công:
   - Admin → `/admin/dashboard`
   - User → `/user/dashboard`
3. Mỗi layout kiểm tra authentication và role

### API Routes:
- Hiện tại đang dùng mock data
- Cần thay thế bằng API thật khi có backend
- Tất cả endpoints đã được chuẩn bị sẵn structure

### Upload Files:
- Source Code Analysis: ZIP (max 2GB)
- Compatibility: APK, AAB (max 2GB)
- Validation đã được implement

### Security:
- Password requirements: 8+ chars, uppercase, lowercase, number, special char
- Token-based authentication (localStorage)
- Role-based access control

## 🎯 Next Steps

### Để hoàn thiện production:

1. **Backend Integration:**
   - Thay thế mock APIs bằng real endpoints
   - Implement JWT authentication
   - Database integration

2. **File Upload:**
   - Integrate với cloud storage (AWS S3, Azure Blob)
   - Implement chunked upload cho files lớn
   - Progress tracking

3. **Real-time Updates:**
   - WebSocket cho status updates
   - Notifications

4. **Admin Features:**
   - Complete user CRUD operations
   - Permission management UI
   - System settings
   - Audit logs

5. **Performance:**
   - Image optimization
   - Code splitting
   - Caching strategies

6. **Testing:**
   - Unit tests
   - Integration tests
   - E2E tests

## 🎨 Customization

### Colors:
Chỉnh sửa trong `src/app/globals.css`:
```css
:root {
  --primary: #3b82f6;
  --secondary: #0ea5e9;
  --accent: #06b6d4;
  /* ... */
}
```

### Logo:
Chỉnh sửa component `src/components/Logo.tsx`

### Services:
Chỉnh sửa constants trong `src/lib/constants.ts`

## 📱 Screenshots

### Login Page
- Modern gradient background
- Animated elements
- Form validation

### User Dashboard
- Statistics overview
- Profile information
- Service usage tracking

### Admin Dashboard
- Analytics
- User management
- Service monitoring

## 🤝 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng liên hệ ICS Security Team.

## 📄 License

© 2025 ICS Security. All Rights Reserved.
