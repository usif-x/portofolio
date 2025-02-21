
<script setup>
import { supabase } from '~/utils/supabase'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

definePageMeta({
  middleware: ['auth']
})

const projects = ref([])
const loading = ref(false)
const error = ref(null)
const isEditing = ref(false)
const showForm = ref(false)

// Form data
const formData = ref({
  id: null,
  title: '',
  category: '',
  description: '',
  image: '',
  technologies: [],
  demo: '',
  github: '',
  status: true
})

// Stats
const stats = computed(() => ({
  total: projects.value.length,
  active: projects.value.filter(p => p.status).length,
  inactive: projects.value.filter(p => !p.status).length
}))

// Available categories
const categories = [
  'Web App',
  'Mobile App',
  'Desktop App',
  'UI/UX Design',
  'Backend',
  'Full Stack',
  'Other'
]

// Technology input
const newTechnology = ref('')
const addTechnology = () => {
  if (newTechnology.value.trim()) {
    formData.value.technologies.push(newTechnology.value.trim())
    newTechnology.value = ''
  }
}
const removeTechnology = (index) => {
  formData.value.technologies.splice(index, 1)
}

// Reset form
const resetForm = () => {
  formData.value = {
    id: null,
    title: '',
    category: '',
    description: '',
    image: '',
    technologies: [],
    demo: '',
    github: '',
    status: true
  }
  isEditing.value = false
}
const fetchProjects = async () => {
  loading.value = true
  error.value = null
  try {
    const { data, error: supabaseError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (supabaseError) throw supabaseError
    projects.value = data || []
  } catch (err) {
    error.value = `Failed to load projects: ${err.message}`
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Update saveProject function
const saveProject = async () => {
  loading.value = true
  error.value = null
  try {
    if (isEditing.value) {
      const { error: supabaseError } = await supabase
        .from('projects')
        .update(formData.value)
        .eq('id', formData.value.id)

      if (supabaseError) throw supabaseError
    } else {
      const { error: supabaseError } = await supabase
        .from('projects')
        .insert([formData.value])

      if (supabaseError) throw supabaseError
    }
    
    await fetchProjects()
    resetForm()
    showForm.value = false
  } catch (err) {
    error.value = `Failed to ${isEditing.value ? 'update' : 'add'} project: ${err.message}`
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Update deleteProject function
const deleteProject = async (id) => {
  if (!confirm('Are you sure you want to delete this project?')) return
  
  loading.value = true
  error.value = null
  try {
    const { error: supabaseError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (supabaseError) throw supabaseError
    
    await fetchProjects()
  } catch (err) {
    error.value = `Failed to delete project: ${err.message}`
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Handle image error
const handleImageError = (event) => {
  event.target.style.display = 'none'
  const parent = event.target.parentElement
  if (parent) {
    parent.innerHTML = '<span class="text-red-500">Image not available</span>'
  }
}

onMounted(() => {
  fetchProjects()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Projects Dashboard</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Manage your portfolio projects</p>
      </div>

      <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
              <Icon icon="mdi:folder" class="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.total }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 dark:bg-green-900">
              <Icon icon="mdi:check-circle" class="w-6 h-6 text-green-500 dark:text-green-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Projects</p>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.active }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
              <Icon icon="mdi:pause-circle" class="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Inactive Projects</p>
              <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ stats.inactive }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center mb-6">
        <button 
          @click="showForm = !showForm"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Icon :icon="showForm ? 'mdi:close' : 'mdi:plus'" class="w-5 h-5 mr-2" />
          {{ showForm ? 'Cancel' : 'Add New Project' }}
        </button>
      </div>

      <div v-if="showForm" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          {{ isEditing ? 'Edit Project' : 'Add New Project' }}
        </h2>
        
        <form @submit.prevent="saveProject" class="form-container">
          <!-- Title Input -->
          <div class="form-group">
            <label class="form-label">Title</label>
            <div class="input-container">
              <Icon 
                icon="mdi:format-title" 
                class="input-icon"
              />
              <input 
                v-model="formData.title" 
                type="text" 
                required
                placeholder="Project Title"
                class="form-input"
              />
            </div>
          </div>

          <!-- Category Select -->
          <div class="form-group">
            <label class="form-label">Category</label>
            <div class="relative">
              <Icon 
                icon="mdi:folder" 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              />
              <select 
                v-model="formData.category"
                required
                class="form-input pl-10 appearance-none"
              >
                <option value="" disabled>Select a category</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
              <Icon 
                icon="mdi:chevron-down" 
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          <!-- Description Textarea -->
          <div class="form-group">
            <label class="form-label">Description</label>
            <div class="relative">
              <Icon 
                icon="mdi:text" 
                class="absolute left-3 top-3 text-gray-400 dark:text-gray-500"
              />
              <textarea 
                v-model="formData.description"
                required
                rows="4"
                placeholder="Project Description"
                class="form-input pl-10 min-h-[120px]"
              ></textarea>
            </div>
          </div>

          <!-- Image URL Input -->
          <div class="form-group">
            <label class="form-label">Image URL</label>
            <div class="relative">
              <Icon 
                icon="mdi:image" 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              />
              <input 
                v-model="formData.image"
                type="url"
                required
                placeholder="https://example.com/image.jpg"
                class="form-input pl-10"
              />
            </div>
            <div v-if="formData.image" class="mt-2">
              <img 
                :src="formData.image" 
                alt="Preview" 
                class="h-32 w-auto object-cover rounded-lg border dark:border-gray-700"
                @error="handleImageError"
              />
            </div>
          </div>

          <!-- Technologies Input -->
          <div class="form-group">
            <label class="form-label">Technologies</label>
            <div class="flex gap-2 mb-2">
              <div class="relative flex-1">
                <Icon 
                  icon="mdi:code-tags" 
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />
                <input 
                  v-model="newTechnology"
                  type="text"
                  placeholder="Add technology"
                  @keyup.enter="addTechnology"
                  class="form-input pl-10"
                />
              </div>
              <button 
                type="button"
                @click="addTechnology"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Icon icon="mdi:plus" class="w-5 h-5" />
                Add
              </button>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="(tech, index) in formData.technologies"
                :key="index"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              >
                {{ tech }}
                <button 
                  type="button"
                  @click="removeTechnology(index)"
                  class="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <Icon icon="mdi:close" class="w-4 h-4" />
                </button>
              </span>
            </div>
          </div>

          <!-- Demo URL Input -->
          <div class="form-group">
            <label class="form-label">Demo URL</label>
            <div class="relative">
              <Icon 
                icon="mdi:web" 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              />
              <input 
                v-model="formData.demo"
                type="url"
                placeholder="https://demo.example.com"
                class="form-input pl-10"
              />
            </div>
          </div>

          <div class="flex justify-end">
            <button 
              type="submit"
              class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ isEditing ? 'Update Project' : 'Add Project' }}
            </button>
          </div>
        </form>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <div v-for="project in projects" :key="project.id" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400">{{ project.description }}</p>
          <div class="flex justify-between mt-4">
            <button @click="editProject(project)" class="text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
            <button @click="deleteProject(project.id)" class="text-red-600 dark:text-red-400 hover:underline">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form-container {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ebebeb;
  margin-bottom: 0.5rem;
}

.input-container {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #e7e7e7;
}

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  background-color: white;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 2px rgba(82, 120, 182, 0.2);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .form-label {
    color: #3e3e3e;
  }

  .form-input {
    background-color: #e8e8e8;
    border-color: #ffffff;
    color: white;
  }

  .form-input:focus {
    border-color: #60A5FA;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
  }

  .input-icon {
    color: #6B7280;
  }
}

/* Fix autofill background */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 30px white inset;
  -webkit-text-fill-color: #374151;
  transition: background-color 5000s ease-in-out 0s;
}

@media (prefers-color-scheme: dark) {
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 30px #1F2937 inset;
    -webkit-text-fill-color: white;
  }
}
</style>