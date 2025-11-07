# Hướng dẫn hoàn thiện đa ngôn ngữ cho Admin Pages

## ✅ Đã hoàn thành

### 1. Cấu trúc Translation Files
- ✅ `locales/en.json` - Thêm section `admin` với đầy đủ translations
- ✅ `locales/vi.json` - Thêm section `admin` với translations tiếng Việt
- ✅ `locales/zh.json` - Thêm section `admin` với translations tiếng Trung

### 2. Layout và Components
- ✅ `admin/layout.tsx` - Thêm `LanguageProvider` wrapper
- ✅ `components/layout/Header.tsx` - Thêm `LanguageSwitch` component
- ✅ `admin/dashboard/page.tsx` - Hoàn thiện đa ngôn ngữ (100%)
- ✅ `admin/users/page.tsx` - Đã thêm import `useLanguage` (cần hoàn thiện các text còn lại)

## 📋 Các trang cần hoàn thiện

### Pattern chung cho tất cả các trang:

```typescript
// 1. Thêm import
import { useLanguage } from '@/contexts/LanguageContext';

// 2. Trong component, thêm hook
const { t } = useLanguage();

// 3. Thay thế các hardcoded text bằng t()
// VÍ DỤ:
// OLD: <h1>User Management</h1>
// NEW: <h1>{t('admin.users.title')}</h1>
```

### A. Analytics Page (`admin/analytics/page.tsx`)
**Translation keys có sẵn:**
- `admin.analytics.title`
- `admin.analytics.subtitle`
- `admin.analytics.exportReport`

**Cần làm:**
1. Add import: `import { useLanguage } from '@/contexts/LanguageContext';`
2. Add hook: `const { t } = useLanguage();`
3. Replace texts:
   - Title: `t('admin.analytics.title')`
   - Subtitle: `t('admin.analytics.subtitle')`
   - Export button: `t('admin.analytics.exportReport')`

### B. APK Protect Page (`admin/apk-protect/page.tsx`)
**Translation keys có sẵn:**
```
admin.apkProtect.title
admin.apkProtect.subtitle
admin.apkProtect.stats.totalProtections
admin.apkProtect.stats.activeUsers
admin.apkProtect.stats.processing
admin.apkProtect.stats.completedToday
admin.apkProtect.search
admin.apkProtect.filterByStatus
admin.apkProtect.allStatus
admin.apkProtect.completed
admin.apkProtect.processing
admin.apkProtect.failed
admin.apkProtect.pending
admin.apkProtect.table.user
admin.apkProtect.table.file
admin.apkProtect.table.package
admin.apkProtect.table.protection
admin.apkProtect.table.features
admin.apkProtect.table.times
admin.apkProtect.table.uploaded
admin.apkProtect.table.completed
admin.apkProtect.table.status
admin.apkProtect.viewDetails
admin.apkProtect.download
```

**Cần làm:**
1. Add import
2. Add hook
3. Replace title/subtitle
4. Replace stats labels (4 stats)
5. Replace search placeholder
6. Replace filter options (5 options)
7. Replace table headers (9 columns)
8. Replace button texts (viewDetails, download)

### C. iOS Protect Page (`admin/ios-protect/page.tsx`)
**Translation keys tương tự APK Protect:**
```
admin.iosProtect.title
admin.iosProtect.subtitle
admin.iosProtect.stats.*
admin.iosProtect.table.*
```

**Cần làm:** Tương tự APK Protect page

### D. Source Code Analysis Page (`admin/source-code-analysis/page.tsx`)
**Translation keys:**
```
admin.sourceCode.title
admin.sourceCode.subtitle
admin.sourceCode.stats.totalScans
admin.sourceCode.stats.activeUsers
admin.sourceCode.stats.criticalIssues
admin.sourceCode.stats.completedToday
admin.sourceCode.table.user
admin.sourceCode.table.file
admin.sourceCode.table.language
admin.sourceCode.table.lines
admin.sourceCode.table.issues
admin.sourceCode.table.critical
admin.sourceCode.table.high
admin.sourceCode.table.medium
admin.sourceCode.table.low
admin.sourceCode.table.scanned
admin.sourceCode.table.completed
admin.sourceCode.table.status
```

### E. Compatibility Page (`admin/compatibility/page.tsx`)
**Translation keys:**
```
admin.compatibility.title
admin.compatibility.subtitle
admin.compatibility.stats.totalTests
admin.compatibility.stats.activeUsers
admin.compatibility.stats.testing
admin.compatibility.stats.completedToday
admin.compatibility.table.user
admin.compatibility.table.file
admin.compatibility.table.package
admin.compatibility.table.versions
admin.compatibility.table.devices
admin.compatibility.table.duration
admin.compatibility.table.compatibility
admin.compatibility.table.uploaded
admin.compatibility.table.completed
admin.compatibility.table.status
```

### F. App Total Go Page (`admin/app-total-go/page.tsx`)
**Translation keys:**
```
admin.appTotal.title
admin.appTotal.subtitle
admin.appTotal.stats.totalScans
admin.appTotal.stats.activeUsers
admin.appTotal.stats.threatsDetected
admin.appTotal.stats.cleanApps
admin.appTotal.table.user
admin.appTotal.table.file
admin.appTotal.table.platform
admin.appTotal.table.threats
admin.appTotal.table.vulnerabilities
admin.appTotal.table.riskScore
admin.appTotal.table.scanned
admin.appTotal.table.completed
admin.appTotal.table.status
```

### G. Malware Intelligence Page (`admin/malware-intelligence/page.tsx`)
**Translation keys:**
```
admin.malware.title
admin.malware.subtitle
admin.malware.stats.totalAccesses
admin.malware.stats.activeUsers
admin.malware.stats.criticalReports
admin.malware.stats.todayAccess
admin.malware.filterByAction
admin.malware.allActions
admin.malware.view
admin.malware.download
admin.malware.export
admin.malware.search
admin.malware.table.user
admin.malware.table.report
admin.malware.table.type
admin.malware.table.threat
admin.malware.table.category
admin.malware.table.accessed
admin.malware.table.duration
admin.malware.table.action
admin.malware.table.ip
```

### H. Settings Page (`admin/settings/page.tsx`)
**Translation keys:**
```
admin.settings.title
admin.settings.subtitle
admin.settings.saveChanges
admin.settings.general.title
admin.settings.general.subtitle
admin.settings.general.siteName
admin.settings.general.siteUrl
admin.settings.general.adminEmail
admin.settings.general.supportEmail
admin.settings.security.title
admin.settings.security.subtitle
admin.settings.security.sessionTimeout
admin.settings.security.maxLoginAttempts
admin.settings.security.passwordMinLength
admin.settings.security.requireTwoFactor
admin.settings.security.enable
admin.settings.email.title
admin.settings.email.subtitle
admin.settings.email.smtpHost
admin.settings.email.smtpPort
admin.settings.email.smtpUser
admin.settings.email.smtpPassword
admin.settings.email.emailFromName
admin.settings.api.title
admin.settings.api.subtitle
admin.settings.api.apiRateLimit
admin.settings.api.apiTimeout
admin.settings.api.enableApiLogging
admin.settings.api.logAllRequests
admin.settings.notifications.title
admin.settings.notifications.subtitle
admin.settings.notifications.emailNotifications
admin.settings.notifications.enableEmail
admin.settings.notifications.slackNotifications
admin.settings.notifications.enableSlack
admin.settings.notifications.slackWebhook
```

### I. Common Elements
**Translation keys dùng chung:**
```
admin.common.exportReport
admin.common.viewDetails
admin.common.download
admin.common.edit
admin.common.delete
admin.common.pagination.previous
admin.common.pagination.next
admin.common.pagination.page
admin.common.pagination.of
```

## 🔧 Các bước thực hiện cho mỗi page

### Bước 1: Thêm import
```typescript
import { useLanguage } from '@/contexts/LanguageContext';
```

### Bước 2: Thêm hook trong component
```typescript
export default function YourPage() {
  const { t } = useLanguage();
  // ... rest of code
}
```

### Bước 3: Thay thế text - Ví dụ cụ thể

#### 3.1. Title và Subtitle
```typescript
// OLD:
<h1 className="text-3xl font-bold text-white mb-2">APK Protection Management</h1>
<p className="text-slate-400">Monitor and manage Android application protection</p>

// NEW:
<h1 className="text-3xl font-bold text-white mb-2">{t('admin.apkProtect.title')}</h1>
<p className="text-slate-400">{t('admin.apkProtect.subtitle')}</p>
```

#### 3.2. Stats Array
```typescript
// OLD:
const stats = [
  { label: 'Total Protections', value: records.length, ... },
  { label: 'Active Users', value: uniqueUsers, ... },
];

// NEW:
const stats = [
  { label: t('admin.apkProtect.stats.totalProtections'), value: records.length, ... },
  { label: t('admin.apkProtect.stats.activeUsers'), value: uniqueUsers, ... },
];
```

#### 3.3. Search Input
```typescript
// OLD:
<input placeholder="Search by user, email, or filename..." />

// NEW:
<input placeholder={t('admin.apkProtect.search')} />
```

#### 3.4. Filter Options
```typescript
// OLD:
<option value="all">All Status</option>
<option value="completed">Completed</option>

// NEW:
<option value="all">{t('admin.apkProtect.allStatus')}</option>
<option value="completed">{t('admin.apkProtect.completed')}</option>
```

#### 3.5. Table Headers
```typescript
// OLD:
<th>User</th>
<th>File</th>
<th>Status</th>

// NEW:
<th>{t('admin.apkProtect.table.user')}</th>
<th>{t('admin.apkProtect.table.file')}</th>
<th>{t('admin.apkProtect.table.status')}</th>
```

#### 3.6. Buttons
```typescript
// OLD:
<Button>Export Report</Button>
<Button>View Details</Button>

// NEW:
<Button>{t('admin.common.exportReport')}</Button>
<Button>{t('admin.apkProtect.viewDetails')}</Button>
```

#### 3.7. Pagination
```typescript
// OLD:
<button>Previous</button>
<span>Page {currentPage} of {totalPages}</span>
<button>Next</button>

// NEW:
<button>{t('admin.common.pagination.previous')}</button>
<span>{t('admin.common.pagination.page')} {currentPage} {t('admin.common.pagination.of')} {totalPages}</span>
<button>{t('admin.common.pagination.next')}</button>
```

## 📝 Checklist cho mỗi page

- [ ] Add `useLanguage` import
- [ ] Add `const { t } = useLanguage();` hook
- [ ] Replace page title
- [ ] Replace page subtitle
- [ ] Replace all stats labels (thường 4 stats)
- [ ] Replace search placeholder
- [ ] Replace filter labels và options
- [ ] Replace all table headers
- [ ] Replace all button texts
- [ ] Replace pagination texts (nếu có)
- [ ] Test với 3 ngôn ngữ: EN, VI, ZH

## 🎯 Ưu tiên thực hiện

1. **HIGH Priority** (quan trọng nhất):
   - ✅ Dashboard (DONE)
   - ⏳ Users Management (50% done - cần hoàn thiện table headers)
   - ⏳ Settings

2. **MEDIUM Priority**:
   - ⏳ APK Protect
   - ⏳ iOS Protect
   - ⏳ Source Code Analysis

3. **LOW Priority**:
   - ⏳ Compatibility
   - ⏳ App Total Go
   - ⏳ Malware Intelligence
   - ⏳ Analytics

## 💡 Tips

1. **Copy-paste pattern**: Tất cả các pages có cấu trúc tương tự, bạn có thể copy pattern từ Dashboard page
2. **Test ngay**: Sau khi hoàn thiện mỗi page, test với cả 3 ngôn ngữ
3. **Common translations**: Dùng `admin.common.*` cho các text lặp lại (Export, Download, Edit, Delete...)
4. **Be consistent**: Giữ format nhất quán giữa các pages

## 🚀 Kết quả mong đợi

Sau khi hoàn thành tất cả:
1. User chọn ngôn ngữ trong Landing page → lưu vào localStorage
2. Đăng nhập vào Admin → tự động hiển thị đúng ngôn ngữ
3. Click nút chọn ngôn ngữ trong Header → tất cả text trong admin thay đổi ngay lập tức
4. Tất cả 10 pages admin đều hiển thị đúng 3 ngôn ngữ: EN, VI, ZH

## 📊 Progress Tracking

- ✅ Setup & Infrastructure: 100%
- ✅ Translation Files: 100%
- ✅ Layout & Header: 100%
- ✅ Dashboard Page: 100%
- 🟡 Users Page: 50%
- ⏳ Other Pages: 0%

**Total Progress: ~35%**

Estimated time to complete: 2-3 hours (15-20 minutes per page × 8 pages)
