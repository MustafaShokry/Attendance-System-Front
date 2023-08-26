import axios from 'axios';
import { base_url } from '../settings';

const api = axios.create({
  baseURL: base_url, 
});

export const downloadAttendanceData = async (courseId) => {
  try {
    const response = await api.get(`/course/${courseId}/attendance/download`, {
      responseType: 'blob',
    });

    if (response.status === 200) {
      // Create a blob URL from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `attendance_${courseId}.xlsx`;

      // Trigger the click event to start the download
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      throw new Error('Failed to download attendance data');
    }
  } catch (error) {
    throw new Error('Error during attendance data download');
  }
};
