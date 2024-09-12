/**
 * Represents geographical coordinates and associated data.
 */
export interface Coordinates {
  /** The latitude in decimal degrees. */
  latitude: number;
  /** The longitude in decimal degrees. */
  longitude: number;
  /** The accuracy of the coordinates in meters. */
  accuracy: number;
  /** The altitude in meters, relative to sea level. */
  altitude: number | null;
  /** The accuracy of the altitude in meters. */
  altitudeAccuracy: number | null;
  /** The heading in degrees clockwise from true north. */
  heading: number | null;
  /** The speed in meters per second. */
  speed: number | null;
}

/**
 * Options for geolocation operations.
 */
export interface GeolocationOptions {
  /** Timeout for the geolocation request in milliseconds. */
  timeout?: number;
  /** Enable high accuracy mode. */
  enableHighAccuracy?: boolean;
  /** Maximum age of a cached position in milliseconds. */
  maximumAge?: number;
}

/**
 * Geolocation error codes.
 */
export enum GeolocationErrorCode {
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3,
}

/**
 * Default options for geolocation operations.
 */
const defaultOptions: GeolocationOptions = {
  timeout: 10000,
  enableHighAccuracy: true,
  maximumAge: 0
};

/**
 * Checks if geolocation is supported in the current environment.
 * @returns {boolean} True if geolocation is supported, false otherwise.
 */
function isGeolocationSupported(): boolean {
  return "geolocation" in navigator;
}

/**
 * Extracts relevant coordinate data from a Position.
 * @param {GeolocationCoordinates} coords - The coordinates from a Position object.
 * @returns {Coordinates} An object containing the extracted coordinate data.
 */
function extractCoordinates(coords: GeolocationCoordinates): Coordinates {
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
    accuracy: coords.accuracy,
    altitude: coords.altitude,
    altitudeAccuracy: coords.altitudeAccuracy,
    heading: coords.heading,
    speed: coords.speed
  };
}

/**
 * Converts degrees to radians.
 * @param {number} degrees - The angle in degrees.
 * @returns {number} The angle in radians.
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees.
 * @param {number} radians - The angle in radians.
 * @returns {number} The angle in degrees.
 */
function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Gets the error message for a geolocation error code.
 * @param {GeolocationErrorCode} code - The error code.
 * @returns {string} The corresponding error message.
 */
function getErrorMessage(code: GeolocationErrorCode): string {
  switch (code) {
    case GeolocationErrorCode.PERMISSION_DENIED:
      return "User denied the request for geolocation";
    case GeolocationErrorCode.POSITION_UNAVAILABLE:
      return "Location information is unavailable";
    case GeolocationErrorCode.TIMEOUT:
      return "The request to get user location timed out";
    default:
      return "An unknown error occurred";
  }
}

/**
 * Gets the user's current location.
 * @param {GeolocationOptions} [options] - Options for the geolocation request.
 * @returns {Promise<Coordinates>} A promise that resolves with the coordinates.
 * @throws {Error} If geolocation is not supported or an error occurs.
 */
export function getCurrentLocation(options: GeolocationOptions = {}): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    const geoOptions: PositionOptions = { ...defaultOptions, ...options };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(extractCoordinates(position.coords));
      },
      (error) => {
        reject(new Error(getErrorMessage(error.code as GeolocationErrorCode)));
      },
      geoOptions
    );
  });
}

/**
 * Watches the user's location and provides updates.
 * @param {function(Coordinates): void} successCallback - Function to call on successful location update.
 * @param {function(Error): void} [errorCallback] - Function to call on error.
 * @param {GeolocationOptions} [options] - Options for the geolocation request.
 * @returns {number} The watch ID to pass to clearWatch.
 * @throws {Error} If geolocation is not supported.
 */
export function watchLocation(
  successCallback: (coords: Coordinates) => void,
  errorCallback?: (error: Error) => void,
  options: GeolocationOptions = {}
): number {
  if (!isGeolocationSupported()) {
    throw new Error("Geolocation is not supported by your browser");
  }

  const geoOptions: PositionOptions = { ...defaultOptions, ...options };

  return navigator.geolocation.watchPosition(
    (position) => {
      successCallback(extractCoordinates(position.coords));
    },
    (error) => {
      if (errorCallback) {
        errorCallback(new Error(getErrorMessage(error.code as GeolocationErrorCode)));
      }
    },
    geoOptions
  );
}

/**
 * Stops watching location updates.
 * @param {number} watchId - The ID returned by watchLocation.
 */
export function clearLocationWatch(watchId: number): void {
  navigator.geolocation.clearWatch(watchId);
}

/**
 * Calculates the distance between two points on Earth.
 * @param {Coordinates} start - Starting coordinates.
 * @param {Coordinates} end - Ending coordinates.
 * @returns {number} Distance in kilometers.
 */
export function calculateDistance(start: Coordinates, end: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(end.latitude - start.latitude);
  const dLon = toRadians(end.longitude - start.longitude);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(start.latitude)) * Math.cos(toRadians(end.latitude)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Calculates the bearing between two points.
 * @param {Coordinates} start - Starting coordinates.
 * @param {Coordinates} end - Ending coordinates.
 * @returns {number} Bearing in degrees.
 */
export function calculateBearing(start: Coordinates, end: Coordinates): number {
  const startLat = toRadians(start.latitude);
  const endLat = toRadians(end.latitude);
  const dLon = toRadians(end.longitude - start.longitude);

  const y = Math.sin(dLon) * Math.cos(endLat);
  const x = Math.cos(startLat) * Math.sin(endLat) -
            Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLon);
  const bearing = toDegrees(Math.atan2(y, x));

  return (bearing + 360) % 360;
}

/**
 * Checks if a point is within a certain radius of another point.
 * @param {Coordinates} center - Center point coordinates.
 * @param {Coordinates} point - Point to check.
 * @param {number} radius - Radius in kilometers.
 * @returns {boolean} True if the point is within the radius, false otherwise.
 */
export function isPointWithinRadius(center: Coordinates, point: Coordinates, radius: number): boolean {
  return calculateDistance(center, point) <= radius;
}

/**
 * Converts coordinates to a human-readable address using reverse geocoding.
 * @param {Coordinates} coordinates - The coordinates to convert.
 * @returns {Promise<string>} A promise that resolves with the address.
 * @throws {Error} If the geocoding request fails.
 */
export async function reverseGeocode(coordinates: Coordinates): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Geocoding request failed: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}