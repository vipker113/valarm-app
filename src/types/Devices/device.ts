import { DeviceStatus, DeviceType } from './enum';

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export type TCompany = {
  id: string;
  name: string;
};

export type TBranch = {
  id: string;
  name: string;
};

export type TDevice = {
  id: string;
  name: string;
  code: string;
  companyId: TCompany;
  branchId?: TBranch;
  displayLocation?: string;
  latitude?: number;
  longitude?: number;
  status: DeviceStatus;
  deviceType: DeviceType;
  battery?: number;
  signalStrength?: number;
  createdAt: string;
  updatedAt: string;
  rtspUrl?: string;
};

export interface DeviceListResponse {
  items: TDevice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export enum DeviceHistoryStatusType {
  DEVICE_STATUS = 'device_status',
  BATTERY = 'battery',
  SIGNAL_STRENGTH = 'signal_strength',
  INFO_UPDATE = 'info_update',
  ALERT = 'alert',
}

export enum AlertStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  IGNORED = 'ignored',
}

export type TDeviceHistory = {
  id: string;
  deviceId: string;
  companyId: string;
  statusType: DeviceHistoryStatusType;
  value: string | number;
  timestamp: string;
  createdBy?: {
    id: string;
    fullName: string;
  };
  alertId?: {
    status: AlertStatus;
    actionBy?: {
      id: string;
      fullName: string;
    };
    actionAt?: string;
  };
};

export interface DeviceHistoryListResponse {
  items: TDeviceHistory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
