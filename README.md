# ICS Security Platform 🛡️

Hệ thống quản lý an ninh mạng chuyên nghiệp với giao diện hiện đại và đầy đủ tính năng.

## ✨ Tính năng

### 🔐 Authentication
- Đăng nhập
- Quên mật khẩu
- Đặt lại mật khẩu
- **Không có đăng ký** (Admin tạo tài khoản)

### 👤 User Portal
- **User Center**: Thông tin tài khoản, thống kê
- **Source Code Analysis**: Phân tích mã nguồn (ZIP, max 2GB)
- **Compatibility**: Kiểm tra tương thích Android (APK/AAB)
- **AppTotalGo**: Quét bảo mật ứng dụng
- **APK Protect**: Bảo vệ ứng dụng Android
- **iOS Protect**: Bảo vệ ứng dụng iOS
- **Malware Intelligence**: Tin tức mã độc mới nhất
- **Change Password**: Đổi mật khẩu bảo mật

### 👨‍💼 Admin Portal
- **Dashboard**: Tổng quan hệ thống
- **User Management**: 
  - Tạo/Sửa/Xóa người dùng
  - Phân quyền chi tiết
  - Tìm kiếm và lọc
- **Analytics**: Thống kê chi tiết
- Truy cập tất cả tính năng User

## 🚀 Quick Start

```bash
# Cài đặt dependencies
pnpm install

# Chạy development
pnpm dev

# Mở http://localhost:3000
```

## 🔑 Demo Accounts

**Admin:**
- Email: `admin@ics.com`
- Password: `admin123`

**User:**
- Email: `user@ics.com`
- Password: `user123`

## 🎨 Thiết kế

- **Theme**: Dark mode, Cybersecurity (Blue/Cyan gradients)
- **UI**: Modern, professional, enterprise-level
- **Animations**: Framer Motion
- **Effects**: Glass morphism, hover effects, smooth transitions
- **Responsive**: Mobile, Tablet, Desktop

## 🛠️ Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide Icons
- React Hook Form + Zod

## 📚 Tài liệu

Xem [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) để biết chi tiết về:
- Cấu trúc dự án
- API endpoints
- Customization
- Production deployment

## 📱 Pages

- `/` - Home (auto redirect)
- `/auth/login` - Đăng nhập
- `/auth/forgot-password` - Quên mật khẩu
- `/auth/reset-password` - Đặt lại mật khẩu
- `/user/dashboard` - User dashboard
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - Quản lý users

## 🔒 Security Features

- Password validation (8+ chars, uppercase, lowercase, number, special char)
- Token-based authentication
- Role-based access control (RBAC)
- Protected routes
- File upload validation

## 📝 Notes

- Mock APIs (cần thay bằng real backend)
- LocalStorage cho auth (production nên dùng httpOnly cookies)
- File uploads cần cloud storage integration
- Tất cả structure đã sẵn sàng cho production

## 📄 License

© 2025 ICS Security. All Rights Reserved.

