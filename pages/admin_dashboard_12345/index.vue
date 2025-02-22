<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Projects Dashboard</h1>
        <div class="flex items-center space-x-4">
          <button 
            @click="darkMode = !darkMode" 
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon v-if="darkMode" icon="mdi:weather-sunny" class="w-5 h-5 text-yellow-400" />
            <Icon v-else icon="mdi:weather-night" class="w-5 h-5 text-gray-600" />
          </button>
          <button 
            @click="logout" 
            class="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Icon icon="mdi:logout" class="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Alert notifications -->
      <div v-if="notification" 
           class="mb-6 p-4 rounded-lg flex items-start gap-3 animate-fade-in"
           :class="notification.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/30 dark:text-red-400'">
        <Icon :icon="notification.type === 'success' ? 'mdi:check-circle' : 'mdi:alert-circle'" 
              class="w-5 h-5 mt-0.5" />
        <div class="flex-1">
          <h3 class="font-semibold">{{ notification.title }}</h3>
          <p class="text-sm opacity-90">{{ notification.message }}</p>
        </div>
        <button @click="notification = null" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>

      <!-- Dashboard controls -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-1">Manage Projects</h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ projects.length }} project{{ projects.length !== 1 ? 's' : '' }} in total
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="relative">
            <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search projects..." 
              class="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button 
            @click="openAddProjectModal"
            class="flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Icon icon="mdi:plus" class="w-5 h-5" />
            Add New Project
          </button>
        </div>
      </div>

      <!-- Projects table -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div v-if="loading" class="flex flex-col items-center justify-center py-16">
          <Icon icon="svg-spinners:blocks-wave" class="w-12 h-12 text-blue-500 mb-4" />
          <p class="text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
        <div v-else-if="filteredProjects.length === 0" class="flex flex-col items-center justify-center py-16">
          <Icon icon="mdi:folder-open" class="w-16 h-16 text-gray-400 mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No projects found</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">
            {{ searchQuery ? 'Try adjusting your search query' : 'Start by adding your first project' }}
          </p>
          <button 
            v-if="!searchQuery"
            @click="openAddProjectModal"
            class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Icon icon="mdi:plus" class="w-5 h-5" />
            Add Project
          </button>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full table-auto">
            <thead class="bg-gray-50 dark:bg-gray-700/50 text-left">
              <tr>
                <th class="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Project</th>
                <th class="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
                <th class="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th class="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</th>
                <th class="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="project in filteredProjects" :key="project._id" 
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <img 
                      :src="project.image" 
                      :alt="project.title"
                      class="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <h3 class="font-medium text-gray-900 dark:text-white">{{ project.title }}</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                        {{ project.description }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                    {{ project.category }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <span 
                      class="flex-none w-2.5 h-2.5 rounded-full"
                      :class="project.status ? 'bg-green-500' : 'bg-gray-400'"
                    ></span>
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                      {{ project.status ? 'Published' : 'Draft' }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(project.updatedAt || project.createdAt || new Date().toISOString()) }}
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button 
                      @click="openEditProjectModal(project)"
                      class="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
                      title="Edit project"
                    >
                      <Icon icon="mdi:pencil" class="w-5 h-5" />
                    </button>
                    <button 
                      @click="toggleProjectStatus(project)"
                      class="p-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-full transition-colors"
                      :title="project.status ? 'Unpublish project' : 'Publish project'"
                    >
                      <Icon :icon="project.status ? 'mdi:eye-off' : 'mdi:eye'" class="w-5 h-5" />
                    </button>
                    <button 
                      @click="confirmDelete(project)"
                      class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
                      title="Delete project"
                    >
                      <Icon icon="mdi:delete" class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Add/Edit Project Modal -->
    <div v-if="projectModal.show" class="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 transition-opacity" @click="closeProjectModal"></div>
        
        <!-- Modal panel -->
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ projectModal.isEdit ? 'Edit Project' : 'Add New Project' }}
            </h3>
            <button @click="closeProjectModal" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <Icon icon="mdi:close" class="w-6 h-6" />
            </button>
          </div>
          
          <form @submit.prevent="saveProject" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Left column -->
              <div>
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Title</label>
                  <input 
                    v-model="projectModal.data.title"
                    type="text" 
                    required
                    class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
                  <input 
                    v-model="projectModal.data.category"
                    type="text" 
                    required
                    class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Image URL</label>
                  <input 
                    v-model="projectModal.data.image"
                    type="text" 
                    required
                    placeholder="/images/projects/your-image.jpg"
                    class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Demo URL</label>
                    <input 
                      v-model="projectModal.data.demo"
                      type="url" 
                      required
                      placeholder="https://example.com"
                      class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">GitHub URL</label>
                    <input 
                      v-model="projectModal.data.github"
                      type="url" 
                      required
                      placeholder="https://github.com/username/repo"
                      class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                  <div class="flex items-center">
                    <label class="flex items-center cursor-pointer">
                      <div class="relative">
                        <input 
                          v-model="projectModal.data.status"
                          type="checkbox"
                          class="sr-only"
                        />
                        <div class="block w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div 
                          class="dot absolute left-1 top-1 w-6 h-6 rounded-full transition"
                          :class="projectModal.data.status 
                            ? 'bg-blue-600 transform translate-x-6' 
                            : 'bg-white'"
                        ></div>
                      </div>
                      <span class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {{ projectModal.data.status ? 'Published' : 'Draft' }}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Right column -->
              <div>
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                  <textarea 
                    v-model="projectModal.data.description"
                    rows="4"
                    required
                    class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Technologies 
                    <span class="text-gray-500 text-xs">(comma separated)</span>
                  </label>
                  <div class="relative">
                    <input 
                      v-model="techInput"
                      @keydown.enter.prevent="addTechnology"
                      type="text" 
                      placeholder="Add technology and press Enter"
                      class="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button 
                      type="button"
                      @click="addTechnology"
                      class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <Icon icon="mdi:plus" class="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div v-if="projectModal.data.technologies.length > 0" class="mt-3 flex flex-wrap gap-2">
                    <div 
                      v-for="(tech, index) in projectModal.data.technologies" 
                      :key="index"
                      class="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700"
                    >
                      <span class="text-sm text-gray-800 dark:text-gray-200">{{ tech }}</span>
                      <button 
                        type="button"
                        @click="removeTechnology(index)"
                        class="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <Icon icon="mdi:close-circle" class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div v-if="projectModal.data.image" class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Image Preview</label>
                  <div class="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img 
                      :src="projectModal.data.image" 
                      :alt="projectModal.data.title || 'Project preview'"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                    <div v-if="imageError" class="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <p class="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
                        <Icon icon="mdi:image-off" class="w-8 h-8 mx-auto mb-2" />
                        Invalid image URL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button 
                type="button"
                @click="closeProjectModal"
                class="px-5 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                {{ projectModal.isEdit ? 'Update Project' : 'Create Project' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteModal.show" class="fixed inset-0 z-50 overflow-y-auto" aria-modal="true">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 transition-opacity" @click="closeDeleteModal"></div>
        
        <!-- Modal panel -->
        <div class="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full transform transition-all animate-fade-in">
          <div class="p-6">
            <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30">
              <Icon icon="mdi:alert" class="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            
            <h3 class="text-lg font-medium text-gray-900 dark:text-white text-center mb-2">
              Delete Project
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
              Are you sure you want to delete "{{ deleteModal.project?.title }}"? This action cannot be undone.
            </p>
            
            <div class="flex justify-center gap-3">
              <button 
                @click="closeDeleteModal"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                @click="deleteProject"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'

// Page metadata
useHead({
  title: 'Admin Dashboard - Projects'
})

// Dark mode toggle
const darkMode = ref(false)
watch(darkMode, (newVal) => {
  document.documentElement.classList.toggle('dark', newVal)
})

// Check for system preference
onMounted(() => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkMode.value = true
  }
})

// Projects state
const projects = ref([])
const loading = ref(true)
const searchQuery = ref('')
const notification = ref(null)
const imageError = ref(false)

// Filtered projects
const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects.value
  
  const query = searchQuery.value.toLowerCase()
  return projects.value.filter(project => 
    project.title.toLowerCase().includes(query) || 
    project.description.toLowerCase().includes(query) ||
    project.category.toLowerCase().includes(query) ||
    project.technologies.some(tech => tech.toLowerCase().includes(query))
  )
})

// Project modal state
const projectModal = reactive({
  show: false,
  isEdit: false,
  data: {
    _id: '',
    title: '',
    description: '',
    image: '',
    category: '',
    technologies: [],
    demo: '',
    github: '',
    status: true
  }
})

// Tech input
const techInput = ref('')

// Delete modal state
const deleteModal = reactive({
  show: false,
  project: null
})

// Fetch projects
const fetchProjects = async () => {
  try {
    loading.value = true
    const response = await fetch('/api/admin/projects')
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    
    const data = await response.json()
    projects.value = data.projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    showNotification('error', 'Error', 'Failed to load projects')
  } finally {
    loading.value = false
  }
}

// Project form operations
const resetProjectFormData = () => {
  projectModal.data = {
    _id: '',
    title: '',
    description: '',
    image: '',
    category: '',
    technologies: [],
    demo: '',
    github: '',
    status: true
  }
  techInput.value = ''
  imageError.value = false
}

const openAddProjectModal = () => {
  resetProjectFormData()
  projectModal.isEdit = false
  projectModal.show = true
}

const openEditProjectModal = (project) => {
  resetProjectFormData()
  projectModal.data = { ...project, technologies: [...project.technologies] }
  projectModal.isEdit = true
  projectModal.show = true
}

const closeProjectModal = () => {
  projectModal.show = false
}

// Technologies management
const addTechnology = () => {
  const tech = techInput.value.trim()
  if (tech && !projectModal.data.technologies.includes(tech)) {
    projectModal.data.technologies.push(tech)
    techInput.value = ''
  }
}

const removeTechnology = (index) => {
  projectModal.data.technologies.splice(index, 1)
}

// Image preview error handling
const handleImageError = () => {
  imageError.value = true
}
// In your Vue component's script setup:

// Update the saveProject function
const saveProject = async () => {
  try {
    const isEdit = projectModal.isEdit
    const projectData = { ...projectModal.data }
    
    // Ensure we have all required fields
    if (!projectData.title || !projectData.description || !projectData.category || !projectData.image) {
      showNotification('error', 'Validation Error', 'Please fill in all required fields')
      return
    }
    
    const response = await fetch(`/api/admin/projects${isEdit ? `/${projectData._id}` : ''}`, {
      method: isEdit ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })
    
    if (!response.ok) {
      throw new Error(`Failed to ${isEdit ? 'update' : 'create'} project`)
    }
    
    const data = await response.json()
    
    if (isEdit) {
      const index = projects.value.findIndex(p => p._id === projectData._id)
      if (index !== -1) {
        projects.value[index] = data.project
      }
    } else {
      projects.value.unshift(data.project)
    }
    
    showNotification(
      'success', 
      isEdit ? 'Project Updated' : 'Project Created',
      `${projectData.title} has been ${isEdit ? 'updated' : 'created'} successfully.`
    )
    
    closeProjectModal()
  } catch (error) {
    console.error('Error saving project:', error)
    showNotification('error', 'Error', `Failed to ${projectModal.isEdit ? 'update' : 'create'} project`)
  }
}

// Update the deleteProject function
const deleteProject = async () => {
  if (!deleteModal.project?._id) return
  
  try {
    const response = await fetch(`/api/admin/projects/${deleteModal.project._id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete project')
    }
    
    projects.value = projects.value.filter(p => p._id !== deleteModal.project._id)
    
    showNotification(
      'success', 
      'Project Deleted',
      `${deleteModal.project.title} has been deleted successfully.`
    )
    
    closeDeleteModal()
  } catch (error) {
    console.error('Error deleting project:', error)
    showNotification('error', 'Error', 'Failed to delete project')
  }
}

// Toggle project status
const toggleProjectStatus = async (project) => {
  try {
    const updatedProject = { 
      ...project, 
      status: !project.status,
      updatedAt: new Date().toISOString()
    }
    
    const response = await fetch(`/api/admin/projects/${project._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProject)
    })
    
    if (!response.ok) {
      throw new Error('Failed to update project status')
    }
    
    // Update local state
    const index = projects.value.findIndex(p => p._id === project._id)
    if (index !== -1) {
      projects.value[index] = updatedProject
    }
    
    showNotification(
      'success', 
      'Status Updated',
      `"${project.title}" is now ${updatedProject.status ? 'published' : 'unpublished'}.`
    )
  } catch (error) {
    console.error('Error updating project status:', error)
    showNotification('error', 'Error', 'Failed to update project status')
  }
}

// Delete operations
const confirmDelete = (project) => {
  deleteModal.project = project
  deleteModal.show = true
}

const closeDeleteModal = () => {
  deleteModal.show = false
  deleteModal.project = null
}

// Notification system
const showNotification = (type, title, message) => {
  notification.value = { type, title, message }
  
  // Auto h_ide notification after 5 seconds
  setTimeout(() => {
    if (notification.value) notification.value = null
  }, 5000)
}

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// Logout function
const logout = () => {
  // Implementation would depend on your authentication setup
  navigateTo('/')
}

// Fetch projects on component mount
onMounted(() => {
  fetchProjects()
})

</script>