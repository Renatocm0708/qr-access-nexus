
export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  documentId: string;
  email?: string;
  phone?: string;
  active: boolean;
  hasQrCode: boolean;
  qrCodeUrl?: string;
  qrExpiration?: string;
  schedule?: string;
  scheduleId?: string;
}

export interface Schedule {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
}

export interface AccessLog {
  id: string;
  timestamp: string;
  personId: string;
  personName: string;
  documentId: string;
  allowed: boolean;
  terminal: string;
}

export interface QRCode {
  id: string;
  personId: string;
  personName: string;
  createdAt: string;
  expiresAt?: string;
  imageUrl: string;
  active: boolean;
}

export interface Terminal {
  id: string;
  name: string;
  ipAddress: string;
  port: string;
  username: string;
  password: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSyncTime?: string;
}
