function getFromLocalStorage(key, fallback = null) {
  if (typeof window === "undefined") return;

  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    localStorage.removeItem(key);
    return fallback;
  }
}

export { getFromLocalStorage };
