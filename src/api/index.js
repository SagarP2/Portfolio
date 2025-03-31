import axios from 'axios';

// Create a custom axios instance with default URL
const API = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to handle errors
API.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
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
    console.error('Response error:', error);
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

export default API; 