export default function debouncePromise(func, wait = 300) {
  let timeout;
  let prevPromise;

  return (...args) => new Promise((resolve, reject) => {
    if (prevPromise) {
      prevPromise.reject('debounce');
    }

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      prevPromise = null;

      resolve(func(...args));
    }, wait);

    prevPromise = { resolve, reject };
  });
}
