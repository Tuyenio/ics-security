export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  country?: string;
  companyName?: string;
  position?: string;
  mobile?: string;
  protectVersion?: string;
  androidTimes?: number;
  iosTimes?: number;
  permissions?: string[];
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface UploadedFile {
  id: string;
  filename: string;
  fileSize: number;
  version?: string;
  icon?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createTime: string;
  finishTime?: string;
  reportUrl?: string;
}

export interface MalwareNews {
  id: string;
  date: string;
  title: string;
  url: string;
}

export interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalUploads: number;
  serviceUsage: {
    serviceId: string;
    count: number;
  }[];
  recentActivity: {
    userId: string;
    userName: string;
    action: string;
    timestamp: string;
  }[];
}
