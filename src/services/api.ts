import axios from 'axios';
import { store } from '../redux/store';
import {
  DeviceHistoryListResponse,
  DeviceListResponse,
  TDevice,
} from '../types/devices/device';

const api = axios.create({
  baseURL: 'https://dev-api.valarm.vn/',
});

api.interceptors.request.use(config => {
  const token = store.getState().user.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const deviceApi = {
  getDevices: (params: { page: number; limit: number }) =>
    api.get<DeviceListResponse>('/devices', { params }),

  createDevice: (data: Partial<TDevice>) => api.post<TDevice>('/devices', data),

  updateDevice: (id: string, data: Partial<TDevice>) =>
    api.put<TDevice>(`/devices/${id}`, data),

  deleteDevice: (id: string) => api.delete(`/devices/${id}`),

  getDeviceHistory: (
    deviceId: string,
    params: { page: number; limit: number },
  ) =>
    api.get<DeviceHistoryListResponse>(`/devices/${deviceId}/history`, {
      params,
    }),
};

export default api;
