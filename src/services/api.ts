import axios from 'axios';
import { store } from '../redux/store';

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

export default api;
