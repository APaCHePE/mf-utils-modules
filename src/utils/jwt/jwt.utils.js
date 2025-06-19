import CryptoJS from 'crypto-js';

const SECRET_KEY = 'clave-secreta-123';

export function encryptJWT(token) {
  try {
    return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  } catch (e) {
    console.error('Error encrypting JWT', e);
    return null;
  }
}

export function decryptJWT(encryptedToken) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.error('Error decrypting JWT', e);
    return null;
  }
}

export function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (e) {
    console.error("Error decoding JWT", e);
    return null;
  }
}