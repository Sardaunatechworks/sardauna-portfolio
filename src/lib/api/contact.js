import apiClient from './client';

/**
 * Public Contact API Service
 * Dispatches contact messages to Laravel REST endpoint with rate limiting & honeypot.
 */
export const contactApi = {
    /**
     * Submit a contact inquiry
     * @param {Object} payload
     * @param {string} payload.name
     * @param {string} payload.email
     * @param {string} [payload.subject]
     * @param {string} payload.message
     * @param {string} [payload.honeypot]
     * @returns {Promise<{ success: boolean, message: string, data?: Object }>}
     */
    async sendMessage(payload) {
        return apiClient.post('/contact', payload);
    }
};

export default contactApi;
