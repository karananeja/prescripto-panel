import Axios from 'axios';

import { env } from '../config/env';

export const api = Axios.create({ baseURL: env.API_URL });

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Accept = 'application/json';
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendMessage =
      error.response?.data?.msg || error.response?.data?.message;
    if (backendMessage) error.message = backendMessage;
    console.error(error.message);

    return Promise.reject(error);
  }
);
