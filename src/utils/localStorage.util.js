function getFromLocalStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    localStorage.removeItem(key);
    return fallback;
  }
}

export { getFromLocalStorage };
