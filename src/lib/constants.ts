// Các dịch vụ của hệ thống
export const SERVICES = {
  SOURCE_CODE_ANALYSIS: {
    id: 'source-code-analysis',
    name: 'Source Code Analysis',
    description: 'Reduce information security risks in the development stage through the analysis and discrimination of test reports.',
    icon: 'FileCode2',
    uploadFormat: '.zip',
    maxSize: '2GB',
  },
  COMPATIBILITY: {
    id: 'compatibility',
    name: 'Compatibility',
    description: 'Provide professional Android application testing services with comprehensive testing on various real devices available in the market.',
    icon: 'Smartphone',
    uploadFormat: '.apk, .aab',
    maxSize: '2GB',
    maxResourceSize: '3GB',
  },
  APP_TOTAL_GO: {
    id: 'app-total-go',
    name: 'AppTotalGo',
    description: 'Comprehensive app scanning and analysis platform for threat detection.',
    icon: 'Shield',
  },
  APK_PROTECT: {
    id: 'apk-protect',
    name: 'APK Protect',
    description: 'Advanced Android application protection with anti-tampering and obfuscation.',
    icon: 'Lock',
    platform: 'Android',
  },
  IOS_PROTECT: {
    id: 'ios-protect',
    name: 'iOS Protect',
    description: 'Protect the app\'s security through data and code encryption, prevention of dynamic memory loading, and detection of hacking tools.',
    icon: 'ShieldCheck',
    platform: 'iOS',
  },
  MALWARE_INTELLIGENCE: {
    id: 'malware-intelligence',
    name: 'Malware Intelligence',
    description: 'Collect the latest news on cyber attacks to help you stay informed of threat trends and remain vigilant at all times.',
    icon: 'Bug',
  },
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

// Permissions
export const PERMISSIONS = {
  // User management
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  MANAGE_ROLES: 'manage_roles',
  
  // Service access
  ACCESS_SOURCE_CODE_ANALYSIS: 'access_source_code_analysis',
  ACCESS_COMPATIBILITY: 'access_compatibility',
  ACCESS_APP_TOTAL_GO: 'access_app_total_go',
  ACCESS_APK_PROTECT: 'access_apk_protect',
  ACCESS_IOS_PROTECT: 'access_ios_protect',
  ACCESS_MALWARE_INTELLIGENCE: 'access_malware_intelligence',
  
  // System
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SYSTEM: 'manage_system',
} as const;

// Role permissions mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.USER]: [
    PERMISSIONS.ACCESS_SOURCE_CODE_ANALYSIS,
    PERMISSIONS.ACCESS_COMPATIBILITY,
    PERMISSIONS.ACCESS_APP_TOTAL_GO,
    PERMISSIONS.ACCESS_APK_PROTECT,
    PERMISSIONS.ACCESS_IOS_PROTECT,
    PERMISSIONS.ACCESS_MALWARE_INTELLIGENCE,
  ],
};
