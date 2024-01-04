/**
 * Check if the given value is a plain JavaScript object.
 * @param {any} obj - The value to check.
 * @returns {boolean} - True if the value is a plain object, false otherwise.
 */
export function isPlainObject(obj) {
  return Object(obj) === obj;
}

/**
 * Check if the given value is an HTML element.
 * @param {any} obj - The value to check.
 * @returns {boolean} - True if the value is an HTML element, false otherwise.
 */
export function isElement(obj) {
  return obj instanceof HTMLElement || (typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string");
}

/**
 * Get the bounding client rectangle of an HTML element using Intersection Observer.
 * @param {HTMLElement} element - The HTML element to observe.
 * @returns {Promise<DOMRect>} - A promise that resolves to the bounding client rectangle.
 */
export function getBoundingClientRectUsingIO(element) {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      observer.disconnect();
      resolve(entries[0].boundingClientRect);
    });
    observer.observe(element);
  });
}

/**
 * Debounces a function, ensuring it is not called more frequently than specified by the delay.
 * @param {Function} func - The function to debounce.
 * @param {number} [delay=0] - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
export function debounce(func, delay = 0) {
  /**
   * @type {NodeJS.Timeout | null}
   */
  let timeoutId = null;

  /**
   * Cancels the currently scheduled execution of the debounced function.
   */
  function cancelTimeout() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  /**
   * The debounced function.
   * @param {...any} args - Arguments passed to the debounced function.
   */
  function debounced(...args) {
    cancelTimeout();
    timeoutId = setTimeout(() => {
      timeoutId = null;
      func(...args);
    }, delay);
  }

  // Attach the cancel function to the debounced function for external use
  debounced.cancel = cancelTimeout;

  return debounced;
}

/**
 * Creates an asynchronous debounced function that delays invoking the provided asynchronous function
 * until after a specified amount of time has elapsed since the last time the debounced function
 * was invoked.
 *
 * @param {Function} func - The asynchronous function to debounce.
 * @param {number} [delay=250] - The delay duration in milliseconds.
 * @returns {Function} - The debounced asynchronous function.
 */
export function debounceAsync(func, delay = 250) {
  /**
   * Identifier for the setTimeout function, representing the timer for delaying
   * the invocation of the provided asynchronous function.
   *
   * @type {NodeJS.Timeout | null}
   */
  let timeoutId = null;

  /**
   * Flag to indicate whether the debounced function should be canceled.
   *
   * @type {boolean}
   */
  let cancelFlag = false;

  /**
   * The debounced asynchronous function.
   *
   * @param {...any} args - Arguments to be passed to the debounced function.
   * @returns {Promise<any>} - A promise that resolves with the result of the debounced function.
   */
  const debouncedFunction = async (...args) => {
    return new Promise((resolve, reject) => {
      /**
       * Clears the existing timeout, preventing the invocation of the
       * debounced function until the specified delay has passed.
       */
      clearTimeout(timeoutId);

      timeoutId = setTimeout(async () => {
        if (!cancelFlag) {
          try {
            const result = await func(...args);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      }, delay);
    });
  };

  /**
   * Cancels the pending invocation of the debounced function.
   */
  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
    cancelFlag = true;
  };

  return debouncedFunction;
}