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

/**
 * Converts a duration to milliseconds based on the specified unit.
 * @param {number} duration - The duration value.
 * @param {string} unit - The unit of the duration ('ms', 's', 'm').
 * @returns {number} - The duration converted to milliseconds.
 */
function convertToMilliseconds(duration, unit) {
	const unitToMilliseconds = {
		"ms": 1,
		"s": 1000,
		"m": 60000
	};	
	const multiplier = unitToMilliseconds[unit.toLowerCase()];
	
	return duration * multiplier;
}

/**
 * A no-operation function that does nothing.
 * 
 * This function is useful as a placeholder or default callback.
 * It can be safely used in scenarios where a function is required but no action is needed.
 * 
 * @returns void
 */
export function noop() {}

/**
 * Creates a timeout controller that triggers an action after a specified duration.
 * @param {Object} options - The options object.
 * @param {number} options.duration - The duration value.
 * @param {string} [options.unit="ms"] - The unit of the duration ('ms', 's', 'm').
 * @param {Function} [options.onTimeout] - The function to execute when the timeout occurs.
 * @param {AbortSignal} [options.externalSignal] - An external signal to abort the timeout.
 * @returns {AbortController} - The timeout controller.
 * @throws {TypeError} - If duration is not a positive number, unit is invalid, or externalSignal is not an instance of AbortSignal.
 */
function createTimeoutController({ duration, unit = "ms", onTimeout = noop, externalSignal }) {
	if (typeof duration !== "number" || isNaN(duration) || duration <= 0) {
    throw new TypeError("Timeout duration must be a positive number");
  }

	if (typeof onTimeout !== "function") {
		throw new TypeError("onTimeout must be a function");
	}

	if (!["ms", "s", "m"].includes(unit)) {
		throw new TypeError("Invalid unit. Unit must be 'ms' (milliseconds), 's' (seconds), or 'm' (minutes).");
	}

	const timeoutDuration = convertToMilliseconds(duration, unit);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
		controller.abort();
		onTimeout();
	}, timeoutDuration);
  
  // Clean up the setTimeout when abort is called
  controller.signal.addEventListener("abort", () => {
    clearTimeout(timeoutId);
  });

	if (externalSignal !== undefined && externalSignal !== null) {
		if (!(externalSignal instanceof AbortSignal)) {
			throw new TypeError("External signal must be an instance of AbortSignal");
		}
		externalSignal.addEventListener("abort", () => {
			controller.abort();
		});
	}

  return controller;
}

export async function fetchData(url, options = {}) {
  // Check if URL is provided and is a non-empty string
  if (!url || typeof url !== "string" || url.trim() === "") {
    throw new Error("Invalid URL provided");
  }

	// Validate response type
  const supportedResponseTypes = ["json", "text"];
  if (options.responseType && !supportedResponseTypes.includes(options.responseType)) {
    throw new Error("Unsupported response type");
  }

  // Set default headers
  const defaultHeaders = {
    Accept: options.responseType || "application/json",
    ...(options.headers || {}),
  };

  // Set default options
  const requestOptions = {
    ...options,
    headers: defaultHeaders,
  };

  try {
		let timeoutController;
    if (options.timeout) {
      // Create timeout controller if timeout option is provided
      timeoutController = createTimeoutController({
        duration: options.timeout,
        unit: options.timeoutUnit,
				onTimeout: options.onTimeout,
				externalSignal: options.externalSignal
      });
      // Add AbortSignal to requestOptions if timeout is set
      requestOptions.signal = timeoutController.signal;
    }
		
    // Perform fetch
    const response = await fetch(url, requestOptions);

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
    }

    // Parse response based on response type
    if (options.responseType === "json") {
      return await response.json();
    } else if (options.responseType === "text") {
      return await response.text();
    } else {
      // By default, parse as JSON if content-type is "application/json"
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    }
  } catch (error) {
    // Log and rethrow error
    console.error(`Error fetching data from ${url} with options:`, options, "Error:", error);
    throw error;
  }
}

export async function submitVote(ugcId, voteType) {
  const endpoint = "https://writeservices.powerreviews.com/voteugc";
  const payload = {
    merchant_id: "7874",
    ugc_id: ugcId,
    vote_type: voteType
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  };

  try {
    const response = await fetch(endpoint, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error("Failed to submit vote:", error.message);
  }
}

/**
 * Formats a timestamp into a human-readable string representing the time difference from the current time.
 * @param {number} timestamp - The timestamp to format, in milliseconds.
 * @returns {string} A human-readable string representing the time difference from the current time.
 * @throws {Error} Throws an error if the provided timestamp is not a valid positive integer.
 */
export function formatTimeDifference(timestamp) {
	if (!Number.isInteger(timestamp) || timestamp < 0 || Number.isNaN(timestamp)) {
    throw new Error("Invalid timestamp. Please provide a valid positive integer.");
  }
	
  const currentTime = Date.now();
  const timeDifference = (currentTime - timestamp) / 1000; // Convert milliseconds to seconds

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 }
  ];

  let output = "";

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(timeDifference / interval.seconds);

    if (count >= 1) {
      const roundedCount = Math.round(timeDifference / interval.seconds);
      output = `${roundedCount} ${interval.label}`;
      break;
    }
  }

  return output === "" ? "Just now" : `${output} ago`;
}

/**
 * Formats a timestamp into a string according to the specified format.
 * @param {number} timestamp - The timestamp in milliseconds.
 * @param {string} [format="MM/DD/YYYY"] - The format string for the output date. Default is "MM/DD/YYYY".
 *   Format options: "MM" for month, "DD" for day, "YYYY" for four-digit year, "YY" for two-digit year,
 *   "M" for month without leading zero, "D" for day without leading zero, "HH" for hours, "mm" for minutes,
 *   "ss" for seconds.
 * @returns {string} The formatted date string.
 * @throws {Error} If the timestamp is not a valid positive integer or if the timestamp does not represent a valid date.
 */
export function formatDate(timestamp, format = "MM/DD/YYYY") {
  if (!Number.isInteger(timestamp) || timestamp < 0 || Number.isNaN(timestamp)) {
    throw new Error("Invalid timestamp. Please provide a valid positive integer.");
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid timestamp. Please provide a valid timestamp.");
  }

  const options = {
    "MM": `${date.getMonth() + 1}`.padStart(2, "0"),
    "DD": `${date.getDate()}`.padStart(2, "0"),
    "YYYY": date.getFullYear().toString(),
    "YY": date.getFullYear().toString().slice(-2),
    "M": date.getMonth() + 1,
    "D": date.getDate(),
    "HH": `${date.getHours()}`.padStart(2, "0"),
    "mm": `${date.getMinutes()}`.padStart(2, "0"),
    "ss": `${date.getSeconds()}`.padStart(2, "0")
  };

  const formattedDate = format.replace(/(MM?|DD?|YYYY|YY|HH?|mm?|ss?)/g, match => options[match]);

  return formattedDate;
}

/**
 * Modify a URL parameter with the given value.
 * @param {string} url - The original URL.
 * @param {string} param - The parameter to modify.
 * @param {string} value - The new value for the parameter.
 * @returns {string} The modified URL.
 */
export function modifyUrlParam(url, param, value) {
  const urlObj = new URL(url);
  urlObj.searchParams.set(param, value);
  return urlObj.toString();
}

/**
* Remove a URL parameter from the given URL.
* @param {string} url - The original URL.
* @param {string} param - The parameter to remove.
* @returns {string} The URL with the specified parameter removed.
*/
export function removeURLParam(url, param) {
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;
  
  // Check if the param exists before attempting to delete it
  if (searchParams.has(param)) {
    searchParams.delete(param);
    urlObject.search = searchParams.toString();
  }
  
  return urlObject.href;
}