// stores/user.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { API_URL } from '@/utils/constants';
import { useUserStore } from './user';
export const useStatsStore = defineStore('userStats', {
  state: () => ({
    stats: null, // Stores user info
    // Stores JWT token
  }),
  persist: true,
  actions: {
    async setStats() {
      
      try{        
        const data = await axios.get(`${API_URL}/auth/profile`)
        this.userStats = data.data
        
        
      }
      catch(error){
        console.log(error)
        
      }
    }

    ,

    async getStats(){
      // if (!this.userStats){
      //   this.setStats()
      // }
      try{        
        const data = await axios.get(`${API_URL}/auth/profile`)
        this.userStats = data.data
        
        
      }
      catch(error){
        console.log(error)
        this.userStats = null
        
      }
      // this.setStats()
      
      return this.userStats
      
    },

    clearStats() {
      this.userStats = null;

      // Remove the token from localStorage
      localStorage.removeItem('userStats');

    },

    
  },
  
  getters: {
    isAdmin: (state) => !!state.userStats.is_staff,
  },
});
