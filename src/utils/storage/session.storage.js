export function set(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
export function get(key) {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}
export function remove(key) {
  sessionStorage.removeItem(key);
}
export function clear() {
  sessionStorage.clear();
}
