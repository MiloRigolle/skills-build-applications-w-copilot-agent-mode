const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

// Falls back to localhost when VITE_CODESPACE_NAME is not set
export const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

/** Extract items from paginated { key: [] } or plain array responses */
export function extractItems(data, key) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data[key])) return data[key];
  // Generic fallback: return the first array value found
  if (data && typeof data === 'object') {
    const firstArray = Object.values(data).find(Array.isArray);
    if (firstArray) return firstArray;
  }
  return [];
}
