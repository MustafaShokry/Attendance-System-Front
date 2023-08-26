import axios from 'axios';
import { base_url } from '../settings';
const api = axios.create({
    baseURL: base_url,
});

export const fetchPendingWarnings = async (instructorId) => {
    try {
        const response = await api.get(`/get-pending-warnings/${instructorId}`);

        if (response.status === 200) {
            return response.data.pendingWarnings;
        } else {
            throw new Error('Failed to fetch pending warnings');
        }
    } catch (error) {
        throw new Error('Error during pending warnings fetch');
    }
};

export const fetchResolvedWarnings = async (instructorId) => {
    try {
        const response = await api.get(`/get-resolved-warnings/${instructorId}`);

        if (response.status === 200) {
            return response.data.resolvedWarnings;
        } else {
            throw new Error('Failed to fetch resolved warnings');
        }
    } catch (error) {
        throw new Error('Error during resolved warnings fetch');
    }
}

export const confirmWarning = async (studentId, courseId) => {
    try {
        const response = await api.post(`/confirm-warning/${studentId}/${courseId}`);

        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        } else {
            throw new Error('Failed to confirm warning');
        }
    } catch (error) {
        throw new Error('Error during warning confirmation');
    }
}
