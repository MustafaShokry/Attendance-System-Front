import axios from 'axios';
import { base_url } from '../settings';
const api = axios.create({
  baseURL: base_url, 
});

export const fetchData = async (instructorId) => {
  try {
    const response = await api.get(`/instructor/${instructorId}/summary`);

    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('Failed to fetch instructor data');
    }
  } catch (error) {
    throw new Error('Error during instructor data fetch');
  }
};
