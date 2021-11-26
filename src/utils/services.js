import axios from 'axios';
import store from '@/store/index';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});
apiClient.interceptors.response.use(response => {
  return response;
});

export const api = (path, data) => {
  return apiClient
    .post(path, data)
    .then(({ data }) => {
      store.dispatch('addNotification', data);
      return data;
    }).catch(() => {
      const notification = {
        success: false,
        msg: 'Cannot Connect to server',
      };
      store.dispatch('addNotification', notification);
      return notification;
    });
};