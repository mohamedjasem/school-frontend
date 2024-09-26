import axios from 'axios';

import  authHeader  from "./Auth-header";



// const API_URL = 'http://localhost:8080/v1/school/user/';
const API_URL = 'https://school-management-app-v1-0.onrender.com/v1/school/user/';
// const navigate1 = useNavigate();

class AuthService {
    

    async login(username, password) {
        try {
            const response = await axios.post(`${API_URL}login`, { username, password });
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    getCurrentUser() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            return { accessToken }; // Assuming you just need the token
        }
        return null;
    }
    

    logout() {
        localStorage.removeItem('accessToken'); 
       
        // Optionally notify the server about the logout
        // axios.post(`${API_URL}logout`);
    }

    async register(firstName, lastName, email, password, role) {
        try {
            const response = await axios.post(`${API_URL}create`, {
                firstName,
                lastName,
                email,
                password,
                role
            });
            return response.data;
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    async updateUser(userData) {
        try {
            const response = await axios.put(`${API_URL}update`, userData, { headers: authHeader() });
            return response.data;
        } catch (error) {
            console.error('Update user error:', error.response ? error.response.data : error.message);
            throw new Error(error.response?.data?.message || error.message);
        }
    }
}

export default new AuthService();
