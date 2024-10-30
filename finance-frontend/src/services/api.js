import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add CORS configuration
  withCredentials: false,
  timeout: 5000, // 5 seconds timeout
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  config => {
    console.log('Making request to:', config.url);
    console.log('Request data:', config.data);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  response => {
    console.log('Response received:', response.data);
    return response;
  },
  error => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error - Is the backend server running?');
    }
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export const api = {
  // User endpoints
  createUser: (userData) => axiosInstance.post('/users', userData),
  getAllUsers: () => axiosInstance.get('/users'),
  getUserById: (id) => axiosInstance.get(`/users/${id}`),
  
  // Category endpoints
  createCategory: (categoryData) => axiosInstance.post('/categories', categoryData),
  getAllCategories: () => axiosInstance.get('/categories'),
  
  // Transaction endpoints
  createTransaction: async (transactionData) => {
    try {
      const response = await axiosInstance.post('/transactions', transactionData);
      return response;
    } catch (error) {
      console.error('API Error:', error.response?.data);
      throw error;
    }
  },
  getAllTransactions: () => axiosInstance.get('/transactions'),
  getUserTransactions: (userId) => axiosInstance.get(`/transactions/user/${userId}`),
};