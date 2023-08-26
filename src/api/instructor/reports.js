import axios from 'axios';
import { base_url } from '../settings';
const api = axios.create({
    baseURL: base_url,
});

export const fetchPendingReports = async (instructorId) => {
    try {
        const response = await api.get(`/reports/${instructorId}/illness-reports`);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch pending reports');
        }
    } catch (error) {
        throw new Error('Error during pending reports fetch');
    }
}

export const confirmReport = async (reportId, newState) => {
    try {
        const response = await api.put(`/confirm-illness-report/${reportId}`, { newState });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to confirm report');
        }
    } catch (error) {
        throw new Error('Error during report confirmation');
    }
}

export const fetchResolvedReports = async (instructorId) => {
    try {
        const response = await api.get(`/confirmed-or-rejected-reports/${instructorId}`);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch resolved reports');
        }
    } catch (error) {
        throw new Error('Error during resolved reports fetch');
    }
}