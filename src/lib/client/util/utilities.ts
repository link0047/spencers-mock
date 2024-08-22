/**
 * Check if the given value is a plain JavaScript object.
 * @param {unknown} obj - The value to check.
 * @returns {boolean} - True if the value is a plain object, false otherwise.
 */
export function isPlainObject(obj: unknown) {
  return Object(obj) === obj;
}

/**
 * Check if the given value is an HTML element.
 * @param {unknown} obj - The value to check.
 * @returns {boolean} - True if the value is an HTML element, false otherwise.
 */
export function isElement(obj: unknown) {
  return obj instanceof HTMLElement || (typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string");
}

/**
 * Gets the bounding client rectangle of an HTML element using Intersection Observer.
 * 
 * @param {HTMLElement} element - The HTML element to observe.
 * @returns {Promise<DOMRect>} A promise that resolves to the bounding client rectangle of the element.
 */
export function getBoundingClientRectUsingIO(element: HTMLElement): Promise<DOMRect> {
  return new Promise<DOMRect>((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      observer.disconnect();
      resolve(entries[0].boundingClientRect);
    });

    observer.observe(element);
  });
}

/**
 * Debounces a function, ensuring it is not called more frequently than specified by the delay.
 * 
 * @param {Function} func - The function to debounce.
 * @param {number} [delay=0] - The delay in milliseconds.
 * @returns {Function & { cancel: () => void }} The debounced function with a cancel method.
 */
export function debounce<T extends (...args: any[]) => void>(func: T, delay = 0): T & { cancel: () => void } {
  /**
   * @type {ReturnType<typeof setTimeout> | null}
   */
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  /**
   * Cancels the currently scheduled execution of the debounced function.
   */
  function cancelTimeout(): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  /**
   * The debounced function.
   * @param {...any} args - Arguments passed to the debounced function.
   */
  function debounced(this: unknown, ...args: Parameters<T>): void {
    cancelTimeout();
    timeoutId = setTimeout(() => {
      timeoutId = null;
      func.apply(this, args);
    }, delay);
  }

  // Attach the cancel function to the debounced function for external use
  debounced.cancel = cancelTimeout;

  return debounced as T & { cancel: () => void };
}

/**
 * Converts a duration to milliseconds based on the specified unit.
 * 
 * @param {number} duration - The duration value.
 * @param {"ms" | "s" | "m"} unit - The unit of the duration ("ms" for milliseconds, "s" for seconds, "m" for minutes).
 * @returns {number} The duration converted to milliseconds.
 * 
 * @throws {Error} Will throw an error if the unit is not one of "ms", "s", or "m".
 */
function convertToMilliseconds(duration: number, unit: "ms" | "s" | "m"): number {
  const unitToMilliseconds: Record<"ms" | "s" | "m", number> = {
    "ms": 1,
    "s": 1000,
    "m": 60000
  };

  const multiplier = unitToMilliseconds[unit.toLowerCase() as "ms" | "s" | "m"];

  if (multiplier === undefined) {
    throw new Error(`Unsupported unit: ${unit}. Valid units are "ms", "s", or "m".`);
  }

  return duration * multiplier;
}

/**
 * A no-operation function that does nothing.
 * 
 * This function is useful as a placeholder or default callback.
 * It can be safely used in scenarios where a function is required but no action is needed.
 * 
 * @returns {void} - This function does not return any value.
 */
export function noop(): void {}

/**
 * Creates a timeout controller that triggers an action after a specified duration.
 * 
 * @param {Object} options - The options object.
 * @param {number} options.duration - The duration value.
 * @param {string} [options.unit="ms"] - The unit of the duration ('ms' for milliseconds, 's' for seconds, 'm' for minutes).
 * @param {Function} [options.onTimeout=noop] - The function to execute when the timeout occurs.
 * @param {AbortSignal} [options.externalSignal] - An external signal to abort the timeout.
 * @returns {AbortController} The timeout controller that can be used to cancel the timeout.
 * @throws {TypeError} If duration is not a positive number, unit is invalid, or externalSignal is not an instance of AbortSignal.
 */
export function createTimeoutController({
  duration,
  unit = "ms",
  onTimeout = noop,
  externalSignal
}: {
  duration: number;
  unit?: "ms" | "s" | "m";
  onTimeout?: () => void;
  externalSignal?: AbortSignal;
}): AbortController {
  if (typeof duration !== "number" || isNaN(duration) || duration <= 0) {
    throw new TypeError("Timeout duration must be a positive number.");
  }

  if (typeof onTimeout !== "function") {
    throw new TypeError("onTimeout must be a function.");
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

  if (externalSignal) {
    if (!(externalSignal instanceof AbortSignal)) {
      throw new TypeError("External signal must be an instance of AbortSignal.");
    }
    externalSignal.addEventListener("abort", () => {
      controller.abort();
    });
  }

  return controller;
}

/**
 * Fetches data from a specified URL with optional configurations.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {Object} [options={}] - Optional configurations for the fetch request.
 * @param {number} [options.timeout] - The timeout duration in milliseconds.
 * @param {"json" | "text"} [options.responseType="json"] - The expected response type ('json' or 'text').
 * @param {HeadersInit} [options.headers] - Custom headers to include in the request.
 * @param {AbortSignal} [options.externalSignal] - An external signal to abort the request.
 * @param {() => void} [options.onTimeout] - A callback function to execute when the timeout occurs.
 * @param {"ms" | "s" | "m"} [options.timeoutUnit="ms"] - The unit of the timeout duration ('ms', 's', or 'm').
 * @returns {Promise<any>} A promise that resolves to the response data in the specified format.
 * @throws {Error} Throws an error if the URL is invalid, the response type is unsupported, or the fetch request fails.
 */
export async function fetchData(
  url: string,
  options: {
    timeout?: number;
    responseType?: "json" | "text";
    headers?: HeadersInit;
    externalSignal?: AbortSignal;
    onTimeout?: () => void;
    timeoutUnit?: "ms" | "s" | "m";
  } = {}
): Promise<any> {
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
  const defaultHeaders: HeadersInit = {
    Accept: options.responseType === "json" ? "application/json" : "text/plain",
    ...(options.headers || {}),
  };

  // Set default options
  const requestOptions: RequestInit = {
    ...options,
    headers: defaultHeaders,
  };

  try {
    let timeoutController: AbortController | undefined;
    if (options.timeout) {
      // Create timeout controller if timeout option is provided
      timeoutController = createTimeoutController({
        duration: options.timeout,
        unit: options.timeoutUnit,
        onTimeout: options.onTimeout,
        externalSignal: options.externalSignal,
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

/**
 * Submits a vote for a given UGC (User-Generated Content) ID to a remote endpoint.
 * 
 * @param {string} ugcId - The ID of the user-generated content to vote on.
 * @param {"upvote" | "downvote"} voteType - The type of vote ('upvote' or 'downvote').
 * @returns {Promise<any>} A promise that resolves to the response data from the server.
 * @throws {Error} Throws an error if the HTTP request fails or if the response is not OK.
 */
export async function submitVote(
  ugcId: string,
  voteType: "upvote" | "downvote"
): Promise<any> {
  const endpoint = "https://writeservices.powerreviews.com/voteugc";
  const payload = {
    merchant_id: "7874",
    ugc_id: ugcId,
    vote_type: voteType
  };

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  };

  try {
    const response = await fetch(endpoint, options);

    // Check if the response is OK before parsing JSON
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Enhanced error handling
    console.error("Failed to submit vote:", error instanceof Error ? error.message : error);
    throw error; // Rethrow the error for further handling if needed
  }
}

/**
 * Formats a timestamp into a human-readable string representing the time difference from the current time.
 * 
 * @param {number} timestamp - The timestamp to format, in milliseconds.
 * @returns {string} A human-readable string representing the time difference from the current time.
 * @throws {Error} Throws an error if the provided timestamp is not a valid positive integer.
 */
export function formatTimeDifference(timestamp: number): string {
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

  for (const interval of intervals) {
    const count = Math.floor(timeDifference / interval.seconds);

    if (count >= 1) {
      // Use singular or plural label based on the count
      const label = count > 1 ? `${interval.label}s` : interval.label;
      output = `${count} ${label}`;
      break;
    }
  }

  return output === "" ? "Just now" : `${output} ago`;
}

/**
 * Formats a timestamp into a string according to the specified format.
 * 
 * @param {number} timestamp - The timestamp in milliseconds.
 * @param {string} [format="MM/DD/YYYY"] - The format string for the output date. Default is "MM/DD/YYYY".
 *   Format options: "MM" for month, "DD" for day, "YYYY" for four-digit year, "YY" for two-digit year,
 *   "M" for month without leading zero, "D" for day without leading zero, "HH" for hours, "mm" for minutes,
 *   "ss" for seconds.
 * @returns {string} The formatted date string.
 * 
 * @throws {Error} If the timestamp is not a valid positive integer or if the timestamp does not represent a valid date.
 */
export function formatDate(timestamp: number, format: string = "MM/DD/YYYY"): string {
  if (!Number.isInteger(timestamp) || timestamp < 0 || Number.isNaN(timestamp)) {
    throw new Error("Invalid timestamp. Please provide a valid positive integer.");
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid timestamp. Please provide a valid timestamp.");
  }

  const options: { [key: string]: string | number } = {
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

  return format.replace(/(MM?|DD?|YYYY|YY|HH?|mm?|ss?)/g, match => options[match] as string);
}

/**
 * Modifies a URL parameter with the given value.
 * 
 * @param {string} url - The original URL.
 * @param {string} param - The parameter to modify or add.
 * @param {string} value - The new value for the parameter.
 * @returns {string} The modified URL with the updated parameter value.
 * 
 * @throws {TypeError} Will throw an error if the URL is invalid.
 */
export function modifyUrlParam(url: string, param: string, value: string): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set(param, value);
    return urlObj.toString();
  } catch (error) {
    throw new TypeError(`Invalid URL: ${url}`);
  }
}

/**
 * Removes a URL parameter from the given URL.
 * 
 * @param {string} url - The original URL.
 * @param {string} param - The parameter to remove.
 * @returns {string} The URL with the specified parameter removed.
 * 
 * @throws {TypeError} Will throw an error if the URL is invalid.
 */
export function removeURLParam(url: string, param: string): string {
  try {
    const urlObject = new URL(url);
    const searchParams = urlObject.searchParams;

    // Remove the parameter if it exists
    if (searchParams.has(param)) {
      searchParams.delete(param);
      urlObject.search = searchParams.toString();
    }

    return urlObject.href;
  } catch (error) {
    throw new TypeError(`Invalid URL: ${url}`);
  }
}

/**
 * Delays execution for a specified amount of time.
 * 
 * @param {number} ms - The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export function waitFor(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}