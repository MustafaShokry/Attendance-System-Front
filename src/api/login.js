
import axios from 'axios';
import { base_url } from './settings';
const api = axios.create({
  baseURL: base_url,
});

export const studentLogin = async (email, na_id) => {
  try {
    const response = await api.get(`/student/login/${email}/${na_id}`);

    if (response.status === 200) {
      return response.data.studentId;
    } else {
      throw new Error('Student login failed');
    }
  } catch (error) {
    throw new Error('Error during student login');
  }
};

export const instructorLogin = async (email, na_id) => {
  try {
    const response = await api.get(`/instructor/login/${email}/${na_id}`);

    if (response.status === 200) {
      return response.data.instructorId;
    } else {
      throw new Error('Instructor login failed');
    }
  } catch (error) {
    throw new Error('Error during instructor login');
  }
};

export const adminLogin = async (username, password) => {
    try {
      const response = await api.post('/admin/login', {
        username,
        pass: password,
      });
  
      if (response.status === 200) {
        return response.data.adminId;
      } else {
        throw new Error('Admin login failed');
      }
    } catch (error) {
      throw new Error('Error during admin login');
    }
  };
