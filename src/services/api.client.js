/**
 * HTTP client seam.
 *
 * This build is frontend-only, so nothing calls it yet. It exists so that
 * connecting a backend later is a matter of repointing the service modules at
 * these helpers — rather than scattering `fetch` calls through components.
 *
 * Provides the things a real client needs and a bare `fetch` does not:
 * timeouts, JSON handling, a typed error, and a single place to attach auth.
 */

const DEFAULT_TIMEOUT_MS = 12000;

/** Base URL comes from the environment; empty means same-origin. */
const BASE_URL = (import.meta.env?.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(message, { status, url, body } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
    this.body = body;
  }
}

const buildUrl = (path, params) => {
  const url = /^https?:\/\//i.test(path) ? path : `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  if (!params) return url;
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  ).toString();
  return search ? `${url}${url.includes('?') ? '&' : '?'}${search}` : url;
};

/**
 * Where a real auth token would be attached. Kept as a hook rather than an
 * import so `auth.service` can be swapped without touching this file.
 */
let authTokenProvider = () => null;
export const setAuthTokenProvider = (provider) => {
  authTokenProvider = typeof provider === 'function' ? provider : () => null;
};

export const request = async (
  path,
  { method = 'GET', params, body, headers = {}, timeout = DEFAULT_TIMEOUT_MS, signal } = {}
) => {
  const url = buildUrl(path, params);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  // Honour a caller-supplied signal alongside our own timeout.
  if (signal) signal.addEventListener('abort', () => controller.abort(), { once: true });

  const token = authTokenProvider();

  try {
    const response = await fetch(url, {
      method,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = response.headers.get('content-type') ?? '';
    const payload = contentType.includes('application/json')
      ? await response.json().catch(() => null)
      : await response.text();

    if (!response.ok) {
      throw new ApiError(payload?.message ?? `Request failed (${response.status})`, {
        status: response.status,
        url,
        body: payload,
      });
    }

    return payload;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('The request timed out.', { url, status: 0 });
    }
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message ?? 'Network request failed.', { url, status: 0 });
  } finally {
    clearTimeout(timer);
  }
};

export const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
};

export default api;
