<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div class="flex items-center">
            <button class="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <bell-icon class="h-6 w-6" />
            </button>
            <div class="ml-3 relative">
              <div>
                <button class="flex items-center focus:outline-none">
                  <img class="h-8 w-8 rounded-full" src="" alt="User avatar" />
                  <span class="ml-2 text-sm font-medium text-gray-700 font-bold"><strong>{{user.email}}</strong></span>
                  <chevron-down-icon class="ml-1 h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
  
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div v-if="stats" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Stats Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <users-icon class="h-6 w-6 text-white" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd class="text-3xl font-semibold text-gray-900">{{totalUsers}}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <a href="#" class="font-medium text-purple-600 hover:text-purple-500">View all</a>
              </div>
            </div>
          </div>
  
          <!-- Chart Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900">User Growth</h3>
              <div class="mt-2 flex items-center justify-between">
                <div class="flex items-center">
                  <span class="text-2xl font-semibold text-gray-900">+5.36%</span>
                  <!-- <trend-up-icon class="ml-2 h-5 w-5 text-green-500" /> -->
                </div>
                <div class="text-sm text-gray-500">vs last month</div>
              </div>
              <div class="mt-4 h-24">
                <!-- Placeholder for chart -->
                <div class="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  Chart Placeholder
                </div>
              </div>
            </div>
          </div>
  
          <!-- Tasks Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Tasks</h3>
              <ul class="mt-4 space-y-4">
                <li v-for="task in tasks" :key="task.id" class="flex items-center">
                  <input :id="task.id" :checked="task.completed" type="checkbox" class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                  <label :for="task.id" class="ml-3 text-sm text-gray-700">{{ task.title }}</label>
                </li>
              </ul>
            </div>
            <div class="bg-gray-50 px-5 py-3">
              <div class="text-sm">
                <a href="#" class="font-medium text-purple-600 hover:text-purple-500">View all tasks</a>
              </div>
            </div>
          </div>
        </div>
        
  
        <!-- Recent Activity -->
        <div class="mt-8">
          <h2 class="text-lg leading-6 font-medium text-gray-900">Recent Activity</h2>
          <div class="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
              <li v-if="!loading && recentActivities?.length>0" v-for="activity in recentActivities" :key="activity.id">
                <a href="#" class="block hover:bg-gray-50">
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-purple-600 truncate">{{ activity.title }}</p>
                      <div class="ml-2 flex-shrink-0 flex">
                        <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {{ activity.type }}
                        </p>
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="sm:flex">
                        <p class="flex items-center text-sm text-gray-500">
                          <user-icon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {{ activity.user }}
                        </p>
                      </div>
                      <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <clock-icon class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <p>
                          {{ formatDateTime(activity.timestamp) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li v-else>
                You have no recent activities to show
              </li>
            </ul>
          </div>
        </div>
        

      <!-- API Key -->
      <div class="mt-8">
          <h2 class="text-lg leading-6 font-medium text-gray-900">Get an API Key</h2>
          
          <div class="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            
                  <div class="px-4 py-4 sm:px-6">

                    <div>
                      
                      <span> View the <a style="color:blue; text-decoration: underline" target="blank" href="https://easyprep-django.onrender.com/docs">docs</a> </span>
                    </div>
                    <br/> 
                    <button @click="generateApiKey" class="w-200 flex-shrink-0 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            Generate API Key
                          </button>
                    <!-- <div class="flex items-center justify-between">
                      
                      <div>
                      
                        
                      <div class="space-y-4"> -->
                          
                          <div v-if="apiKey" class="mt-4 p-4 bg-gray-100 rounded-md">
                            <div class="flex items-center justify-between">
                              <div class="flex-1 mr-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                                <div class="flex items-center">
                                  <input
                                    :type="showApiKey ? 'text' : 'password'"
                                    :value="apiKey"
                                    readonly
                                    class="flex-1 block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md bg-white"
                                  />
                                  <button
                                    @click="toggleApiKeyVisibility"
                                    class="ml-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    <eye-icon v-if="!showApiKey" class="h-5 w-5 text-gray-600" />
                                    <eye-off-icon v-else class="h-5 w-5 text-gray-600" />
                                  </button>
                                  <button
                                    @click="copyApiKey"
                                    class="ml-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    <copy-icon class="h-5 w-5 text-gray-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        
                        </div>
                        

                      </div>
                    </div>
                  </div>
                  
          </div>
        
  </template>
  
  <script setup>
  import { ref, onMounted} from 'vue'
  import { BellIcon, ChevronDownIcon, UsersIcon, UserIcon, ClockIcon } from 'lucide-vue-next'
  import { useUserStore } from '@/stores/user';
  import axios from 'axios';
  import { API_URL } from '@/utils/constants';
  import { formatDateTime } from '@/utils/utils';
  import { EyeIcon, EyeOffIcon, CopyIcon } from 'lucide-vue-next'
  import { useToast } from 'vue-toastification';

  const toast = useToast()
  const loading = ref(true)
  const totalUsers = ref(0)
  const stats = ref({})
  const userStore = useUserStore()
  const user = userStore.user
  const tasks = ref([
    { id: 'task1', title: 'Review new user signups', completed: true },
    { id: 'task2', title: 'Prepare monthly report', completed: false },
    { id: 'task3', title: 'Update privacy policy', completed: false },
  ])
  const apiKey = ref('')
  const showApiKey = ref(false)
  

  const generateApiKey = async () => {
    try {
      
      const response = await axios.post(`${API_URL}/auth/create_api_key/`)
      apiKey.value = response.data.key
      showApiKey.value = false
    } catch (error) {
      console.error('Error generating API key:', error.message)
      toast.error(`Error Generating API key. ${error.message}`)
    }
  }

  const toggleApiKeyVisibility = () => {
    showApiKey.value = !showApiKey.value
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey.value)
      .then(() => {
        toast.success('API Key copied')
      })
      .catch(err => {
        toast.error(`Failed to copy API key: ${err}`)
      })
  }
  const recentActivities = ref([])
  onMounted(
    
    async() => {
      const data = await axios.get(`${API_URL}/auth/profile/`)
      loading.value = false
      stats.value = data.data.stats
      console.log(stats)
      recentActivities.value = data.data.stats.recent_activity
      totalUsers.value = data.data.stats.total_users
      
      
    }
  )
  </script>
  
  <style scoped>
  /* Add any additional component-specific styles here */
  </style>