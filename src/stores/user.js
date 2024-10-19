// stores/user.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Stores user info
    token: null, // Stores JWT token
  }),
  persist: true,
  actions: {
    async login(user, token) {
      try {
        this.token = token;
        this.user = user;

        // Set the default Authorization header for all Axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.access}`;
      } catch (error) {
        throw new Error('Login failed');
      }
    },

    logout() {
      // Clear the token and user info from the store
      this.token = null;
      this.user = null;

      // Remove the token from localStorage
      localStorage.removeItem('token');
      
      // Remove the Authorization header
      delete axios.defaults.headers.common['Authorization'];
    },

    applyAuthHeaders() {
      if (this.token) {
        // Reapply the default Authorization header when store is initialized
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token.access}`;
      }
    },
  },
  
  
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
