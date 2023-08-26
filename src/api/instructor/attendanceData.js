import axios from 'axios';
import { base_url } from '../settings';
const api = axios.create({
  baseURL: base_url, // Replace with your actual API base URL
});

export const fetchAttendanceData = async (courseId) => {
  try {
    const response = await api.get(`/course/${courseId}/attendance`);

    if (response.status === 200) {
      return response.data; // Assuming your API returns an array of lecture details
    } else {
      throw new Error('Failed to fetch courses');
    }
  } catch (error) {
    throw new Error('Error during courses fetch');
  }
};

export const updateAttendanceData = async (courseId, attendanceData) => {
  try {
    const response = await api.put(`/update-attendance/${courseId}`, attendanceData);

    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Failed to update attendance data');
    }
  } catch (error) {
    throw new Error('Error during attendance data update');
  }
}
