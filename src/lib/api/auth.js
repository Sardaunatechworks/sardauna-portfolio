import apiClient from './client';

/**
 * Authentication API Service (Laravel Sanctum)
 * Supports dual cookie-based stateful authentication and Bearer token storage.
 */
export const authApi = {
    /**
     * Log in admin user
     * @param {string} email
     * @param {string} password
     * @returns {Promise<{ user: Object, token: string }>}
     */
    async login(email, password) {
        const response = await apiClient.post('/admin/login', { email, password });
        if (response?.data?.token) {
            apiClient.setToken(response.data.token);
        }
        return response.data;
    },

    /**
     * Terminate admin session and revoke current access token
     * @returns {Promise<void>}
     */
    async logout() {
        try {
            await apiClient.post('/admin/logout');
        } catch (err) {
            console.warn('Logout request completed with warning:', err?.message);
        } finally {
            apiClient.clearToken();
        }
    },

    /**
     * Retrieve the currently authenticated admin user
     * @returns {Promise<Object>}
     */
    async getMe() {
        const response = await apiClient.get('/admin/me');
        return response.data;
    },

    /**
     * Quick check if a token is present in client storage
     * @returns {boolean}
     */
    hasStoredToken() {
        return !!apiClient.getToken();
    }
};

export default authApi;
