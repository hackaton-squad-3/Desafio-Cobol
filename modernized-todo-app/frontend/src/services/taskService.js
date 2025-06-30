import axiosInstance from '../config/axios';

const API_URL = '/api/tasks';

/**
 * Service for task-related API calls
 */
const taskService = {
  /**
   * Get all tasks
   * @returns {Promise} Promise with the list of tasks
   */
  getAllTasks: async () => {
    try {
      const response = await axiosInstance.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  /**
   * Get a task by ID
   * @param {number} id - Task ID
   * @returns {Promise} Promise with the task data
   */
  getTaskById: async (id) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get tasks assigned to a user
   * @param {number} userId - User ID
   * @returns {Promise} Promise with the list of tasks
   */
  getTasksByUser: async (userId) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tasks for user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Get tasks by tag
   * @param {string} tag - Tag to search for
   * @returns {Promise} Promise with the list of tasks
   */
  getTasksByTag: async (tag) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/tag/${tag}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tasks with tag ${tag}:`, error);
      throw error;
    }
  },

  /**
   * Create a new task
   * @param {Object} taskData - Task data
   * @returns {Promise} Promise with the created task
   */
  createTask: async (taskData) => {
    try {
      const response = await axiosInstance.post(API_URL, taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  /**
   * Update a task
   * @param {number} id - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Promise} Promise with the updated task
   */
  updateTask: async (id, taskData) => {
    try {
      const response = await axiosInstance.put(`${API_URL}/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  /**
   * Update a task's status
   * @param {number} id - Task ID
   * @param {string} status - New status
   * @returns {Promise} Promise with the updated task
   */
  updateTaskStatus: async (id, status) => {
    try {
      const response = await axiosInstance.patch(`${API_URL}/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for task ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a task
   * @param {number} id - Task ID
   * @returns {Promise} Promise with the response
   */
  deleteTask: async (id) => {
    try {
      const response = await axiosInstance.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get tasks grouped by users
   * @returns {Promise} Promise with tasks grouped by users
   */
  getTasksByAllUsers: async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/by-user`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks by users:', error);
      throw error;
    }
  }
};

export { taskService };
export default taskService;
