import axios from 'axios';

const API_URL = '/api/users';

/**
 * Service for user-related API calls
 */
const userService = {
  /**
   * Get all users
   * @returns {Promise} Promise with the list of users
   */
  getAllUsers: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Get a user by ID
   * @param {number} id - User ID
   * @returns {Promise} Promise with the user data
   */
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise} Promise with the created user
   */
  createUser: async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Update a user
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise} Promise with the updated user
   */
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {Promise} Promise with the response
   */
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
};

export { userService };
export default userService;
