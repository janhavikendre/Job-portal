import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const userAPI = {
    signup: (data: any) => axios.post(`${API_URL}/user/signup`, data),
    login: (data: any) => axios.post(`${API_URL}/user/login`, data),
    updateUser: (data: any, token: string) => axios.put(`${API_URL}/user/update`, data, { headers: {token} }),
    deleteUser: (data: any, token: string) => axios.delete(`${API_URL}/user/delete`, { data, headers: {token} }),

    

}   

