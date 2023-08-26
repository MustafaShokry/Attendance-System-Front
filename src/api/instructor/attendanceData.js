import axios from 'axios';
import { base_url } from '../settings';
const api = axios.create({
  baseURL: base_url, 
});

export const fetchAttendanceData = async (courseId) => {
  try {
    const response = await api.get(`/course/${courseId}/attendance`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch attendance data');
    }
  } catch (error) {
    throw new Error('Error during attendance data fetch');
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
