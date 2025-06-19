export const local = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch {
      return item; // retorna como string si no es JSON
    }
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  }
};