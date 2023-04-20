export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isElement(obj) {
  return typeof HTMLElement === "object"
    ? obj instanceof HTMLElement
    : typeof obj === "object" &&
        obj !== null &&
        obj.nodeType === 1 &&
        typeof obj.nodeName === "string";
}

export function getBoundingClientRectUsingIO(element) {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      observer.disconnect();
      resolve(entries[0].boundingClientRect);
    });
    observer.observe(element);
  });
}

export function debounce(fn, time = 0) {
  /**
   * @type {string | number | NodeJS.Timeout | null | undefined}
   */
  let timeoutId;

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  function wrapper(...args) {
    cancel();
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }

  wrapper.cancel = cancel;

  return wrapper;
}
