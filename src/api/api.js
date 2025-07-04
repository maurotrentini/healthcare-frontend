import axios from 'axios';

// VITE_API_BASE_URL comes from import.meta.env at build time
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default axios.create({
  //baseURL: '/api',        // proxied to http://localhost:8000
  baseURL: `${API_BASE}/api`,
  headers: { 
    'Accept': 'application/ld+json',
    'Content-Type': 'application/ld+json', 
  }
});