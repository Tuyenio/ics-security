# Frontend ICS Security - Hướng Dẫn Sử Dụng

## Tổng Quan

Frontend cho hệ thống ICS Security được xây dựng bằng Next.js 14, TypeScript, Tailwind CSS.

## Cấu Hình

### Environment Variables

File `.env.local`:

```env
# Next.js Configuration
NEXT_PUBLIC_APP_NAME="Dashboard Quản Lý"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://myjjfkwbpbdgmkocobkk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15ampma3dicGJkZ21rb2NvYmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMjY5MjksImV4cCI6MjA3NzkwMjkyOX0.jFplWm7fuduOtT6vmcsY9jFNQISF50i5BEK8xy3FmUA

# Project Information
NEXT_PUBLIC_PROJECT_NAME=ics-security
NEXT_PUBLIC_PROJECT_ID=myjjfkwbpbdgmkocobkk
```

## Cài Đặt và Chạy

```bash
# Cài đặt dependencies
pnpm install

# Chạy development server
pnpm run dev

# Build production
pnpm run build

# Chạy production
pnpm run start
```

Frontend sẽ chạy tại: http://localhost:3000

## Tài Khoản Đăng Nhập

### Admin
- **Email:** tt98tuyen@gmail.com
- **Password:** 12345678
- **Redirect:** /admin/dashboard

### User
- **Email:** tuyenkoikop@gmail.com
- **Password:** 12345678
- **Redirect:** /user/dashboard

## Cấu Trúc Routes

### Public Routes (Không cần login)
- `/auth/login` - Trang đăng nhập
- `/auth/forgot-password` - Quên mật khẩu
- `/auth/reset-password` - Reset mật khẩu

### Admin Routes
- `/admin/dashboard` - Dashboard admin
- `/admin/users` - Quản lý users
- `/admin/analytics` - Phân tích dữ liệu

### User Routes
- `/user/dashboard` - Dashboard user
- `/user/apk-protect` - APK Protection
- `/user/ios-protect` - iOS Protection
- `/user/app-total-go` - App Total Go
- `/user/malware-intelligence` - Malware Intelligence
- `/user/source-code-analysis` - Source Code Analysis
- `/user/compatibility` - Compatibility
- `/user/change-password` - Đổi mật khẩu

## Tính Năng

### Authentication
✅ Login với email/password
✅ Forgot password với email
✅ Reset password với token
✅ JWT token storage trong localStorage
✅ Auto redirect dựa trên role
✅ Protected routes

### UI/UX
✅ Responsive design
✅ Dark theme với gradient backgrounds
✅ Smooth animations với Framer Motion
✅ Toast notifications
✅ Loading states
✅ Error handling
✅ Form validation

## Kết Nối Backend

Frontend sẽ tự động kết nối với backend API:

```typescript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

// Sử dụng token
const token = localStorage.getItem('token');
const response = await fetch('/api/protected', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## Development

### Thêm Route Mới

1. Tạo folder trong `src/app`
2. Thêm file `page.tsx`
3. Implement component

### Thêm API Route

1. Tạo folder trong `src/app/api`
2. Thêm file `route.ts`
3. Export async function POST/GET/PUT/DELETE

### Styling

Sử dụng Tailwind CSS:

```tsx
<div className="bg-slate-800 rounded-lg p-4">
  <h1 className="text-2xl font-bold text-white">
    Hello World
  </h1>
</div>
```

## Troubleshooting

### Không kết nối được backend
- Đảm bảo backend đang chạy tại port 3001
- Kiểm tra `NEXT_PUBLIC_API_URL` trong `.env.local`

### Login không hoạt động
- Mở Console để xem error messages
- Kiểm tra network tab trong DevTools
- Đảm bảo backend API đang hoạt động

### CORS errors
- Backend cần enable CORS cho `http://localhost:3000`
- Kiểm tra backend logs

## Scripts

```bash
# Development
pnpm run dev

# Build
pnpm run build

# Start production
pnpm run start

# Lint
pnpm run lint

# Type check
pnpm run type-check
```

## Dependencies Chính

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Browser Support

✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)

## Production Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t ics-security-frontend .

# Run container
docker run -p 3000:3000 ics-security-frontend
```

## Liên Hệ

Nếu có vấn đề, vui lòng liên hệ team development.
