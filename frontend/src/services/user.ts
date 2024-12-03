import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const userAPI = {
    signup: (data: { name: string; email: string; password: string; image: string | null }) => axios.post(`${API_URL}/user/signup`, data),
    login: (data: { email: string; password: string }) => axios.post(`${API_URL}/user/login`, data),
    updateUser: (data: { name?: string; email: string; password?: string; image?: string }, token: string) => axios.put(`${API_URL}/user/update`, data, { headers: {token} }),
    deleteUser: (data: { email: string }, token: string) => axios.delete(`${API_URL}/user/delete`, { data, headers: {token} }),

    

}   

