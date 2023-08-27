import axios from 'axios';
import { base_url } from '../settings';

const api = axios.create({
    baseURL: base_url, // Replace with your actual API base URL
});

// Function to fetch statistics
export const fetchStatistics = async () => {
    try {
        const response = await api.get('/statistics');

        if (response.status === 200) {
            return response.data; // The statistics data
        } else {
            throw new Error('Failed to fetch statistics');
        }
    } catch (error) {
        throw new Error('Error during statistics fetch');
    }
};

// Function to fetch all courses
export const fetchAllCourses = async () => {
    try {
        const response = await api.get('courses-info');

        if (response.status === 200) {
            return response.data; // The courses data
        } else {
            throw new Error('Failed to fetch courses');
        }
    } catch (error) {
        throw new Error('Error during courses fetch');
    }
}

// Function to fetch course details
export const fetchCourseDetails = async (courseId) => {
    try {
        const response = await api.get(`/course-attendance/${courseId}`);

        if (response.status === 200) {
            return response.data; // The course details
        } else {
            throw new Error('Failed to fetch course details');
        }
    } catch (error) {
        throw new Error('Error during course details fetch');
    }
}
