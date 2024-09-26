import axios from "axios";
import authHeader from './Auth-header';

const API_URL = 'https://school-management-app-v1-0.onrender.com/v1/api/student/'; // Ensure there's a trailing slash
const API_URL_WELCOME = 'https://school-management-app-v1-0.onrender.com/v1/school/user/';

class UserService {
  // Fetch public content
  getPublicContent() {
    return axios.get(`${API_URL_WELCOME}home`);
  }

  // Register a new user
  async Register(rollNo, name, dob, gender, email, standard, mobileNumber, address, file) {
    try {
      // Create FormData instance
      const formData = new FormData();
      formData.append('rollNo', rollNo);
      formData.append('name', name);
      formData.append('dob', dob);
      formData.append('gender', gender);
      formData.append('email', email);
      formData.append('standard', standard);
      formData.append('mobileNumber', mobileNumber);
      formData.append('address', address);
      if (file) {
        formData.append('file', file);
      }

      // Make the POST request
      const response = await axios.post(`${API_URL}save`, formData, {
        headers: {
          ...authHeader(), // Ensure this includes necessary auth details
          'Content-Type': 'multipart/form-data' // Set Content-Type for file uploads
        }
      });

      // Handle the response
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      throw error; // Optionally rethrow the error
    }
  }

  // Update existing user
  async update(rollNo, name, dob, gender, email, standard, mobileNumber, address, file) {
    try {
      // Create FormData instance
      const formData = new FormData();
      formData.append('rollNo', rollNo);
      formData.append('name', name);
      formData.append('dob', dob);
      formData.append('gender', gender);
      formData.append('email', email);
      formData.append('standard', standard);
      formData.append('mobileNumber', mobileNumber);
      formData.append('address', address);
      if (file) {
        formData.append('file', file);
      }

      // Make the POST request
      const response = await axios.put(`${API_URL}update`, formData, {
        headers: {
          ...authHeader(), // Ensure this includes necessary auth details
          'Content-Type': 'multipart/form-data' // Set Content-Type for file uploads
        }
      });

      // Handle the response
      console.log('Update successful:', response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error('Update failed:', error.response ? error.response.data : error.message);
      throw error; // Optionally rethrow the error
    }
  }

  // Fetch students with headers
  async fetchStudents() {
    try {
      const response = await axios.get(`${API_URL}students`, {
        headers: authHeader() // Include headers in the request
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error.response ? error.response.data : error.message);
      return []; // Or handle error as needed
    }
  }

  // Fetch all students
  async fetchStudentall() {
    try {
      const response = await axios.get(`${API_URL}all`, {
        headers: authHeader() // Include headers in the request
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all students:', error.response ? error.response.data : error.message);
      return []; // Or handle error as needed
    }
  }

  // Fetch user board data
  getUserBoard() {
    return axios.get(`${API_URL}Studenttest`, { headers: authHeader() });
  }

  // Fetch moderator board data
  getModeratorBoard() {
    return axios.get(`${API_URL}teacher`, { headers: authHeader() });
  }

  // Fetch admin board data
  getAdminBoard() {
    return axios.get(`${API_URL}test`, { headers: authHeader() });
  }
}

export default new UserService();
