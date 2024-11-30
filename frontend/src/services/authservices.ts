import { userAPI } from "./user";
import { adminAPI } from "./adminApi";


const TOKEN_KEY_ADMIN = 'admin_token';
const TOKEN_KEY_USER = 'user_token';

export const authService = {
   login: async (Credentials: any, isAdmin = false) => {
    try {
        const api = isAdmin ? adminAPI : userAPI;
        const response = await api.login(Credentials);

        const tokenKey = isAdmin ? TOKEN_KEY_ADMIN : TOKEN_KEY_USER;
        localStorage.setItem(tokenKey, response.data.token);

        return response.data;
    } catch (error) {
        throw error;
    }
   },

   logout: (isAdmin = false) => {
    const tokenKey = isAdmin ? TOKEN_KEY_ADMIN : TOKEN_KEY_USER;
    localStorage.removeItem(tokenKey);
   },

   getToken: (isAdmin = false) => {
    const tokenKey = isAdmin ? TOKEN_KEY_ADMIN : TOKEN_KEY_USER;
    return localStorage.getItem(tokenKey);
   },

   isAuthenticated: (isAdmin = false) => {
    
    const tokenKey = isAdmin ? TOKEN_KEY_ADMIN : TOKEN_KEY_USER;
    return !!localStorage.getItem(tokenKey);
   }
}

