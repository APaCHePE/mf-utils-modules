import http from '../config/http-client';
import {
  loginResponseSchema
} from './auth.schema';
import {
  decodeJWT
} from '../../utils/jwt.utils.js';

export const login = async ({
  username,
  password
}) => {
  const res = await http.post('/auth/login', {
    username,
    password
  });
  console.log('Login response:', res);
  
  const data = loginResponseSchema.parse(res.data);
  const user = decodeJWT(data.access_token);
  if (!res.status) {
    throw new Error(result.message || 'Login failed');
  }
  sessionStorage.setItem('sessionId', data.accessToken);
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('accessToken', data.access_token);
  // window.history.pushState(null, '', data.default.defaultRoute);
  // Guardar el token en localStorage

  return data;
};
