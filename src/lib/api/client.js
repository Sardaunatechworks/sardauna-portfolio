/**
 * Centralized API Client for Laravel 13 REST API
 * Handles Sanctum cookies & Bearer tokens, unified response parsing, and error normalization.
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/+$/, '');
const TOKEN_STORAGE_KEY = 'portfolio_auth_token';

class ApiClient {
    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    getToken() {
        return localStorage.getItem(TOKEN_STORAGE_KEY) || null;
    }

    setToken(token) {
        if (token) {
            localStorage.setItem(TOKEN_STORAGE_KEY, token);
        } else {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    }

    clearToken() {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}/${endpoint.replace(/^\/+/, '')}`;
        const headers = {
            'Accept': 'application/json',
            ...(options.headers || {})
        };

        // Attach Sanctum Bearer token if available
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Attach JSON content type if payload is not FormData
        if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        const config = {
            ...options,
            headers,
            credentials: 'include', // Enables cross-subdomain Sanctum cookie transfer
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json().catch(() => null);

            if (!response.ok) {
                const errorMessage = data?.message || data?.error || `HTTP error ${response.status}`;
                const error = new Error(errorMessage);
                error.status = response.status;
                error.errors = data?.errors || null;
                error.data = data;
                throw error;
            }

            return data;
        } catch (err) {
            // Rethrow structured errors for controller/hook handlers
            throw err;
        }
    }

    get(endpoint, params = null) {
        let path = endpoint;
        if (params && typeof params === 'object') {
            const query = new URLSearchParams();
            Object.entries(params).forEach(([key, val]) => {
                if (val !== undefined && val !== null && val !== '') {
                    query.append(key, val);
                }
            });
            const qs = query.toString();
            if (qs) path += `?${qs}`;
        }
        return this.request(path, { method: 'GET' });
    }

    post(endpoint, body = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: body instanceof FormData ? body : JSON.stringify(body)
        });
    }

    put(endpoint, body = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: body instanceof FormData ? body : JSON.stringify(body)
        });
    }

    patch(endpoint, body = {}) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: body instanceof FormData ? body : JSON.stringify(body)
        });
    }

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    upload(endpoint, file, additionalFields = {}) {
        const formData = new FormData();
        formData.append('file', file);
        Object.entries(additionalFields).forEach(([key, val]) => {
            if (val !== undefined && val !== null) {
                formData.append(key, val);
            }
        });
        return this.post(endpoint, formData);
    }
}

export const apiClient = new ApiClient();
export default apiClient;
