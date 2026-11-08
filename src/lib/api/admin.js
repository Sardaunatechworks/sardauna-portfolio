import apiClient from './client';

/**
 * Admin API Service (Protected via Laravel Sanctum)
 * Provides CRUD operations for portfolio management, messages, and file uploads.
 */
export const adminApi = {
    // ── Dashboard Metrics ──
    async getDashboardMetrics() {
        const res = await apiClient.get('/admin/dashboard');
        return res?.data ?? res;
    },

    // ── Profile Management ──
    async getProfile() {
        const res = await apiClient.get('/admin/profile');
        return res?.data ?? res;
    },

    async updateProfile(profileData) {
        const res = await apiClient.put('/admin/profile', profileData);
        return res?.data ?? res;
    },

    // ── Experience CRUD ──
    async getExperiences() {
        const res = await apiClient.get('/admin/experiences');
        return res?.data ?? res;
    },

    async createExperience(data) {
        const res = await apiClient.post('/admin/experiences', data);
        return res?.data ?? res;
    },

    async updateExperience(id, data) {
        const res = await apiClient.put(`/admin/experiences/${id}`, data);
        return res?.data ?? res;
    },

    async deleteExperience(id) {
        return apiClient.delete(`/admin/experiences/${id}`);
    },

    // ── Projects CRUD ──
    async getProjects() {
        const res = await apiClient.get('/admin/projects');
        return res?.data ?? res;
    },

    async createProject(data) {
        const res = await apiClient.post('/admin/projects', data);
        return res?.data ?? res;
    },

    async updateProject(id, data) {
        const res = await apiClient.put(`/admin/projects/${id}`, data);
        return res?.data ?? res;
    },

    async deleteProject(id) {
        return apiClient.delete(`/admin/projects/${id}`);
    },

    // ── Skills Management ──
    async getSkills() {
        const res = await apiClient.get('/admin/skills');
        return res?.data ?? res;
    },

    async createSkill(data) {
        const res = await apiClient.post('/admin/skills', data);
        return res?.data ?? res;
    },

    async deleteSkill(id) {
        return apiClient.delete(`/admin/skills/${id}`);
    },

    // ── Certifications CRUD ──
    async getCertifications() {
        const res = await apiClient.get('/admin/certifications');
        return res?.data ?? res;
    },

    async createCertification(data) {
        const res = await apiClient.post('/admin/certifications', data);
        return res?.data ?? res;
    },

    async updateCertification(id, data) {
        const res = await apiClient.put(`/admin/certifications/${id}`, data);
        return res?.data ?? res;
    },

    async deleteCertification(id) {
        return apiClient.delete(`/admin/certifications/${id}`);
    },

    // ── Contact Messages Inbox ──
    async getMessages(params = null) {
        const res = await apiClient.get('/admin/messages', params);
        return res?.data ?? res;
    },

    async getMessage(id) {
        const res = await apiClient.get(`/admin/messages/${id}`);
        return res?.data ?? res;
    },

    async updateMessageStatus(id, status) {
        const res = await apiClient.patch(`/admin/messages/${id}/status`, { status });
        return res?.data ?? res;
    },

    async deleteMessage(id) {
        return apiClient.delete(`/admin/messages/${id}`);
    },

    // ── Media Upload & Storage ──
    async uploadMedia(file, category = 'projects') {
        const res = await apiClient.upload('/admin/media/upload', file, { category });
        return res?.data ?? res;
    },

    async deleteMedia(id) {
        return apiClient.delete(`/admin/media/${id}`);
    }
};

export default adminApi;
