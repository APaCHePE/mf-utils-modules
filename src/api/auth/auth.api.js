import http from '../config/http-client';
import {
  loginResponseSchema
} from './auth.schema';
import {
  decodeJWT, encryptJWT
} from '../../utils/jwt/jwt.utils.js';
import {
  AUTH_KEYS
} from '../../utils/storage/storage.constants.js';

export const login = async ({
  username,
  password
}) => {
  const res = await http.post('/auth/login', {
    username,
    password
  });
  const data = loginResponseSchema.parse(res.data);
  if (!res.status) {
    throw new Error(res.message || 'Login failed');
  }
  // const user = decodeJWT(data.access_token);
  // sessionStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(user));
  // console.log('Login successful xyz:', encryptJWT(data.access_token));
  
  localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, encryptJWT(data.access_token));
  return data;
};

export const refresh = async () => {
  // aqui se plantea refrescar la sessión por si el token ha vencido y no se pueden hacer nuevas consultas al backend
  const accessToken = localStorage.getItem('accessToken');

}
