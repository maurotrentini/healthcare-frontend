import axios from 'axios';

export default axios.create({
  baseURL: '/api',        // proxied to http://localhost:8000
  headers: { 
    'Accept': 'application/ld+json',
    'Content-Type': 'application/ld+json', 
  }
});