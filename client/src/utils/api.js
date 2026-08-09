const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Prepends the backend API URL to a path if it is relative.
 * @param {string} path - The relative or absolute path.
 * @returns {string} - The complete URL.
 */
export const getApiUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

/**
 * Prepends the backend API URL to local upload image paths.
 * @param {string} path - The relative or absolute path/URL.
 * @returns {string} - The complete image source URL.
 */
export const getUploadsUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};
