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

/**
 * Formats YYYY-MM-DD date strings into human-readable text (e.g., Aug 2024).
 * @param {string} dateStr - The date string to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  if (dateStr.toLowerCase() === 'present') return 'Present';
  
  // Date constructor might parse YYYY-MM-DD as UTC. To avoid timezone shifting,
  // we can append a time or replace dashes to avoid midnight UTC offsets if needed,
  // but standard new Date(dateStr) is generally fine for month/year representation.
  const parsed = new Date(dateStr);
  if (!isNaN(parsed)) {
    return parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return dateStr;
};
