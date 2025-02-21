<template>
  <main class="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black px-4 overflow-hidden">
    <!-- Background elements -->
    <div class="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-[80px] animate-float-slow"></div>
    <div class="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[80px] animate-float-delayed"></div>
    
    <!-- Content -->
    <div class="relative text-center animate-fade-in">
      <!-- 404 heading -->
      <h1 class="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        404
      </h1>
      
      <!-- Message -->
      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
        Page not found
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <!-- Back to home button -->
      <NuxtLink 
        to="/" 
        class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group"
      >
        <Icon icon="mdi:arrow-left" class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
import { Icon } from '@iconify/vue'

// Set page title
useHead({
  title: '404 - Page Not Found'
})

// Clear error when leaving the page
defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 6s ease-in-out infinite;
  animation-delay: 2s;
}
</style>