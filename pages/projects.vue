<template>
  <section v-if="showProjects" class="min-h-screen flex-grow relative flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black px-4 sm:px-6 lg:px-8 py-16 md:py-20 overflow-hidden transition-colors duration-300">
    <div class="absolute top-[-10%] right-[-5%] w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] animate-float-slow"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] animate-float-delayed"></div>


    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-fade-in">
        <h2 class="font-roboto text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Featured Projects
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        <p class="font-cairo mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore my latest works and creative solutions.
        </p>
      </div>

      <div v-if="loading" class="text-center py-20">
        <Icon icon="svg-spinners:blocks-wave" class="w-12 h-12 mx-auto text-blue-500 mb-4" />
        <p class="text-gray-600 dark:text-gray-400">Loading projects...</p>
      </div>

      <div v-else-if="error" class="text-center py-20">
        <Icon icon="mdi:alert-circle" class="w-12 h-12 mx-auto text-red-500 mb-4" />
        <p class="text-red-600 dark:text-red-400">{{ error }}</p>
      </div>

      <div v-else-if="filteredProjects.length === 0" 
            class="text-center py-20 animate-fade-in">
        <Icon icon="mdi:folder-open" 
              class="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <h3 class="font-roboto text-xl text-gray-600 dark:text-gray-400">
          No projects available at the moment.
        </h3>
        <p class="font-cairo text-gray-500 dark:text-gray-500 mt-2">
          Check back soon for updates!
        </p>
      </div>

      <template v-else>
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            v-for="category in availableCategories"
            :key="category"
            @click="selectedCategory = category"
            class="px-4 py-2 rounded-xl transition-all duration-300"
            :class="[
              selectedCategory === category 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(project, index) in filteredProjects" 
               :key="project.id"
               class="group relative animate-slide-up"
               :style="{ animationDelay: `${index * 100}ms` }">
            <div class="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
              <div class="relative h-64 overflow-hidden">
                <img :src="project.image" 
                     :alt="project.title"
                     class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div class="absolute bottom-4 left-4 right-4">
                    <div class="flex gap-3">
                      <a :href="project.demo" 
                         target="_blank"
                         class="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg backdrop-blur-sm bg-opacity-90 transition-all duration-300">
                        <Icon icon="mdi:eye" class="w-5 h-5" />
                        Live Demo
                      </a>
                      <a :href="project.github" 
                         target="_blank"
                         class="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white py-2 px-4 rounded-lg backdrop-blur-sm bg-opacity-90 transition-all duration-300">
                        <Icon icon="mdi:github" class="w-5 h-5" />
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="font-roboto text-xl font-bold text-gray-900 dark:text-white">
                    {{ project.title }}
                  </h3>
                  <span class="text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-400">
                    {{ project.category }}
                  </span>
                </div>
                
                <p class="font-cairo text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {{ project.description }}
                </p>

                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in project.technologies" 
                        :key="tech"
                        class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 rounded-full">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <a href="https://github.com/usif-x" 
             target="_blank"
             class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group">
            <Icon icon="mdi:github" class="w-6 h-6" />
            <span>View More Projects</span>
            <Icon icon="mdi:arrow-right" 
                  class="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </template>
    </div>
  </section>
  
  <section v-else class="relative py-20 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <div class="absolute w-[500px] h-[500px] top-0 left-0 bg-blue-500/30 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute w-[500px] h-[500px] bottom-0 right-0 bg-purple-500/30 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center py-20 animate-fade-in">
        <Icon icon="mdi:code-off" 
              class="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600 mb-6" />
        <h2 class="font-roboto text-3xl font-bold text-gray-600 dark:text-gray-400 mb-4">
          Projects Section Coming Soon
        </h2>
        <p class="font-cairo text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
          We're currently working on some amazing projects. Check back soon to see what we've been building!
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
useHead({
  title: 'My Projects'
})

const showProjects = ref(true)
const selectedCategory = ref('All')
const projects = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch projects from API
const fetchProjects = async () => {
  try {
    loading.value = true
    const response = await fetch('/api/projects')
    const data = await response.json()
    projects.value = data.projects
    console.log('Fetched projects:', projects.value)
  } catch (err) {
    error.value = 'Failed to load projects'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Load projects on mount
onMounted(() => {
  fetchProjects()
})

// Computed properties
const filteredProjects = computed(() => {
  console.log('showProjects:', showProjects.value)
  console.log('projects:', projects.value)
  
  if (!showProjects.value) return []
  const activeProjects = projects.value.filter(project => project.status)
  console.log('activeProjects:', activeProjects)
  
  if (selectedCategory.value === 'All') return activeProjects
  return activeProjects.filter(project => project.category === selectedCategory.value)
})

const availableCategories = computed(() => {
  if (!showProjects.value) return []
  const activeProjects = projects.value.filter(project => project.status)
  const categories = ['All', ...new Set(activeProjects.map(project => project.category))]
  return categories
})
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, rgb(0 0 0 / 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(0 0 0 / 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 1s ease-out forwards;
}
</style> 