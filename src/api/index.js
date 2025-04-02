import axios from 'axios';

// Create a custom axios instance with default URL
const API = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to handle auth token and errors
API.interceptors.request.use(
  (config) => {
    // Add auth token to all requests
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No auth token found in localStorage');
    }
    console.log('Making request to:', config.baseURL + config.url);
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
API.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        headers: error.config?.headers
      }
    });
    
    // Handle 401 unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Projects API calls
export const fetchProjects = () => API.get('/api/projects');
export const fetchFeaturedProjects = () => API.get('/api/projects/featured');
export const fetchProjectById = (id) => API.get(`/api/projects/${id}`);
export const createProject = (newProject) => API.post('/api/projects', newProject);
export const updateProject = (id, updatedProject) => API.patch(`/api/projects/${id}`, updatedProject);
export const deleteProject = (id) => API.delete(`/api/projects/${id}`);

// Content API calls
export const fetchContents = () => API.get('/api/content');
export const createContent = (content) => API.post('/api/content', content);
export const updateContent = (id, content) => API.put(`/api/content/${id}`, content);
export const deleteContent = (id) => API.delete(`/api/content/${id}`);

export default API; 