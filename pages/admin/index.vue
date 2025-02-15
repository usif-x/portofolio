<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <button
            @click="handleLogout"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Icon icon="mdi:logout" class="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <Icon 
                  icon="mdi:folder-multiple"
                  class="h-8 w-8 text-blue-500 dark:text-blue-400"
                />
                <div class="ml-4">
                  <h2 class="text-xl font-medium text-gray-900 dark:text-white">
                    Project Management
                  </h2>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Manage your portfolio projects
                  </p>
                </div>
              </div>
              <NuxtLink 
                to="/admin/projects"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <Icon icon="mdi:pencil" class="h-5 w-5 mr-2" />
                Manage Projects
              </NuxtLink>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Total Projects: 
                <span v-if="loading" class="font-semibold text-gray-900 dark:text-white">
                  Loading...
                </span>
                <span v-else-if="error" class="font-semibold text-red-500">
                  Error loading projects
                </span>
                <span v-else class="font-semibold text-gray-900 dark:text-white">
                  {{ projects.length }}
                </span>
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                Last updated: <span class="font-semibold text-gray-900 dark:text-white">
                  {{ new Date().toLocaleDateString() }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

definePageMeta({
  middleware: ['auth', 'admin-layout']
})

const { logout } = useAuth()
const projects = ref([])
const loading = ref(false)
const error = ref(null)

const handleLogout = () => {
  logout()
  navigateTo('/admin/login')
}

const fetchProjects = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await fetch('/api/projects')
    if (!response.ok) throw new Error('Failed to fetch projects')
    projects.value = await response.json()
  } catch (err) {
    console.error('Error fetching projects:', err)
    error.value = 'Failed to load projects'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style> 