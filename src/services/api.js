// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const landAPI = {
  upload: (landData) => api.post('/lands', landData),
  getAll: () => api.get('/lands'),
  getById: (id) => api.get(`/lands/${id}`),
  search: (query) => api.get(`/lands/search?q=${query}`),
};

export const transactionAPI = {
  getAll: () => api.get('/transactions'),
  create: (transactionData) => api.post('/transactions', transactionData),
};

export default api;