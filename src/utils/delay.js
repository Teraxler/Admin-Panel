function delay(callback, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(callback());
    }, delay);
  });
}

export { delay };
