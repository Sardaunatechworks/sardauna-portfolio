import apiClient from './client';

/**
 * Public Portfolio API Service
 * Fetches profile, experiences, projects, skills, certifications, and community data.
 */
export const portfolioApi = {
    /**
     * Get primary personal profile
     */
    async getProfile() {
        const res = await apiClient.get('/profile');
        return res?.data ?? res;
    },

    /**
     * Get work experience timeline
     */
    async getExperiences() {
        const res = await apiClient.get('/experiences');
        return res?.data ?? res;
    },

    /**
     * Get featured and archived projects
     * @param {Object} [params] - { featured, category, search }
     */
    async getProjects(params = null) {
        const res = await apiClient.get('/projects', params);
        return res?.data ?? res;
    },

    /**
     * Get single project by slug
     * @param {string} slug
     */
    async getProject(slug) {
        const res = await apiClient.get(`/projects/${slug}`);
        return res?.data ?? res;
    },

    /**
     * Get technical skills grouped or as list
     */
    async getSkills() {
        const res = await apiClient.get('/skills');
        return res?.data ?? res;
    },

    /**
     * Get credentials and certifications
     */
    async getCertifications() {
        const res = await apiClient.get('/certifications');
        return res?.data ?? res;
    },

    /**
     * Get community activities and speaking engagements
     */
    async getCommunity() {
        const res = await apiClient.get('/community');
        return res?.data ?? res;
    },

    /**
     * Get published editorial articles
     * @param {Object} [params] - { category, search, page }
     */
    async getArticles(params = null) {
        const res = await apiClient.get('/articles', params);
        return res?.data ?? res;
    },

    /**
     * Get single article by slug
     * @param {string} slug
     */
    async getArticle(slug) {
        const res = await apiClient.get(`/articles/${slug}`);
        return res?.data ?? res;
    },

    /**
     * Get public site settings (SEO, flags, social handles)
     */
    async getSettings() {
        const res = await apiClient.get('/settings/public');
        return res?.data ?? res;
    },

    /**
     * Concurrently fetch all baseline data needed for the landing page
     */
    async fetchLandingData() {
        const results = await Promise.allSettled([
            portfolioApi.getProfile(),
            portfolioApi.getExperiences(),
            portfolioApi.getProjects(),
            portfolioApi.getSkills(),
            portfolioApi.getCertifications(),
            portfolioApi.getCommunity(),
        ]);

        return {
            profile: results[0].status === 'fulfilled' ? results[0].value : null,
            experiences: results[1].status === 'fulfilled' ? results[1].value : null,
            projects: results[2].status === 'fulfilled' ? results[2].value : null,
            skills: results[3].status === 'fulfilled' ? results[3].value : null,
            certifications: results[4].status === 'fulfilled' ? results[4].value : null,
            community: results[5].status === 'fulfilled' ? results[5].value : null,
        };
    }
};

export default portfolioApi;
