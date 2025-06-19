import axios from 'axios';
import {
  decryptJWT
} from '../../utils/jwt/jwt.utils';
import {
  AUTH_KEYS
} from '../../utils/storage/storage.constants';
import {
  local
} from '../../utils/storage/local.storage';

const http = axios.create({
  baseURL: 'https://gateway.emapasalas.net.pe',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

http.interceptors.request.use(config => {
  const rawToken = local.get(AUTH_KEYS.ACCESS_TOKEN);
  if (rawToken) {
    try {
      const token = decryptJWT(rawToken);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn('Error decrypting JWT for request interceptor:', e);
    }
  }
  return config;
});

export default http;