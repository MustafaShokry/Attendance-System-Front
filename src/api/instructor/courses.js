import axios from 'axios';
import { base_url } from '../settings';
const api = axios.create({
  baseURL: base_url, 
});

export const fetchCourses = async (instructorId) => {
  try {
    const response = await api.get(`/instructor/${instructorId}/courses-info`);

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('Failed to fetch courses');
    }
  } catch (error) {
    throw new Error('Error during courses fetch');
  }
};
