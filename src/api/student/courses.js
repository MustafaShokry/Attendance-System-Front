import axios from 'axios';
import { base_url } from '../settings';
const api = axios.create({
  baseURL: base_url, // Replace with your actual API base URL
});

export const fetchCourses = async (studentId) => {
  try {
    const response = await api.get(`/student-summary/${studentId}`);

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('Failed to fetch courses');
    }
  } catch (error) {
    throw new Error('Error during courses fetch');
  }
};

export const fetchStudentCourses = async (studentId) => {
  try {
    const response = await api.get(`/student/${studentId}/courses`);

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('Failed to fetch courses');
    }
  } catch (error) {
    throw new Error('Error during courses fetch');
  }
}
