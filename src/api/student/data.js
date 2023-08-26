import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your actual API base URL
});

export const fetchData = async (studentId) => {
  try {
    const response = await api.get(`/student/${studentId}/data`);

    if (response.status === 200) {
      return response.data; // Assuming your API returns an array of lecture details
    } else {
      throw new Error('Failed to fetch courses');
    }
  } catch (error) {
    throw new Error('Error during courses fetch');
  }
};
