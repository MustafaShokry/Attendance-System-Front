import axios from 'axios';
import { base_url } from '../settings';
const api = axios.create({
  baseURL: base_url, // Replace with your actual API base URL
});

export const fetchCourses = async (studentId) => {
  try {
    const response = await api.get(`/student-summary/${studentId}`);

    if (response.status === 200) {
      return response.data; // Assuming your API returns an array of lecture details
    } else {
      throw new Error('Failed to fetch courses');
    }
  } catch (error) {
    throw new Error('Error during courses fetch');
  }
};
