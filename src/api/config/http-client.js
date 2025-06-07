import axios from 'axios';

const http = axios.create({
  baseURL: 'https://gateway.emapasalas.net.pe',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

http.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;