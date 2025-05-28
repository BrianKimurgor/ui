import axios from 'axios';

// fetch backend api endpoint
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000',
  withCredentials: true,
});

export default api;
