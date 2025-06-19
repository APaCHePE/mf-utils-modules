import { decodeJWT, decryptJWT } from '../../utils/jwt/jwt.utils.js';

export function getUserIdFromToken(token) {
  if (!token) {
    console.error('Token is required but was not provided.');
    return null;
  }
  const payload = decodeJWT(decryptJWT(token));
  return payload?.user?.idUsuario ?? null;
}
export function getModuleDefault(token) {
  if (!token) {
    console.error('Token is required but was not provided.');
    return 0;
  }
  const payload = decodeJWT(decryptJWT(token));
  return payload?.user?.moduloDefault ?? 0;
}
export function getSistemaDefault(token) {
  if (!token) {
    console.error('Token is required but was not provided.');
    return 0;
  }
  const payload = decodeJWT(token);
  return payload?.user?.sistemaDefault ?? 0;
}
export function getUserEmailFromToken(token) {
  if (!token) {
    console.error('Token is required but was not provided.');
    return null;
  }
  const payload = decodeJWT(token);
  return payload?.user?.email ?? null;
}

export function getUserRolesFromToken(token) {
  if (!token) {
    console.error('Token is required but was not provided.');
    return [];
  }
  const payload = decodeJWT(token);
  return payload?.roles ?? [];
}

export function getUserFullNameFromToken(token) {
  if (!token) {
    console.error('Token is required but was not provided.');
    return null;
  }
  const payload = decodeJWT(token);
  const {
    nombres,
    apellidoPaterno,
    apellidoMaterno
  } = payload?.user ?? {};
  return [nombres, apellidoPaterno, apellidoMaterno].filter(Boolean).join(' ') || null;
}

export function isTokenExpired(token) {
  if (!token) {
    console.error('Token is required but was not provided.');
    return true;
  }
  const payload = decodeJWT(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
}