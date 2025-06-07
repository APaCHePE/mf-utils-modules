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