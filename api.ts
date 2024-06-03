import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = async () => {
  try {
    const response = await api.get('/Utilisateurs');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
