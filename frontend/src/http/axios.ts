/// <reference types="vite/client" />

import axios from 'axios';
import { getAuthToken, removeAuthToken } from '../storage/auth';

// Use VITE_API_URL from environment, fallback to '/api' for dev
const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
