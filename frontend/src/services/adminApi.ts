import axios from 'axios';

const API_URL = 'http://localhost:3000/admin';

export const adminAPI = {
  signup: (data: { name: string; email: string; password: string; image: string | null }) => {
    return axios.post(`${API_URL}/signup`, data);
  },
  login: (data: { email: string; password: string }) => {
    return axios.post(`${API_URL}/login`, data);
  },
  update: (data: { name?: string; email: string; password?: string; image?: string }) => {
    return axios.put(`${API_URL}/update`, data);
  },
  delete: (email: string) => {
    return axios.delete(`${API_URL}/delete`, { data: { email } });
  },

  createJob: (data: { title: string; description: string; company: string; location: string; salary: string; jobType: string }) => {
    return axios.post(`${API_URL}/job/create`, data, {
      headers: {
        'token': `${localStorage.getItem('authToken')}`
      }
    });
  },
  
  getJobs: ( ) => {
    return axios.get(`${API_URL}/job/all`, {
      headers: {
        'token': `${localStorage.getItem('authToken')}`
      }
    });
  },

  deleteJob: (id: string) => {
    return axios.delete(`${API_URL}/job/delete/${id}`, {
      headers: {
        'token': `${localStorage.getItem('authToken')}`
      }
    });
  },

  updateJob: (id: string, data: { title: string; description: string; company: string; location: string; salary: string; jobType: string }) => {
    return axios.put(`${API_URL}/job/update/${id}`, data, {
      headers: {
        'token': `${localStorage.getItem('authToken')}`
      }
    });
  }
};