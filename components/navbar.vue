<template>
  <div>
    <nav class="fixed top-0 w-full z-50 transition-all duration-300"
         :class="[scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow' : 'bg-transparent']">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          <NuxtLink to="/" class="relative flex items-center">
            <img 
              :src="currentLogo"
              alt="Logo"
              class="h-8 w-auto transition-all duration-500"
              :class="{
                'opacity-0 scale-150': isTransitioning,
                'opacity-100 scale-100': !isTransitioning
              }"
              @load="isTransitioning = false"
            />
          </NuxtLink>

          <div class="hidden md:flex items-center gap-8">
            <NuxtLink 
              v-for="link in ['Home', 'About', 'Skills', 'Projects', 'Contact']"
              :key="link"
              :to="link === 'Home' ? '/' : `/${link.toLowerCase()}`"
              class="font-cairo text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 relative group py-2"
            >
              {{ link }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </NuxtLink>
          </div>

          <div class="flex items-center gap-4">
            <button 
              @click="toggleDarkMode"
              class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:scale-110"
              aria-label="Toggle Dark Mode"
            >
              <div class="relative w-5 h-5">
                <Icon 
                  icon="mdi:weather-sunny" 
                  class="w-5 h-5 absolute transition-all duration-300"
                  :class="[isDarkMode ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100']"
                />
                <Icon 
                  icon="mdi:weather-night" 
                  class="w-5 h-5 absolute transition-all duration-300"
                  :class="[isDarkMode ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0']"
                />
              </div>
            </button>

            <button 
              @click="toggleMenu"
              class="md:hidden relative p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              aria-label="Toggle Menu"
            >
              <div class="w-6 h-5 relative flex flex-col justify-between">
                <span 
                  class="w-6 h-0.5 bg-current transform transition-all duration-300 origin-left"
                  :class="[isMenuOpen ? 'rotate-45 translate-x-px' : '']"
                ></span>
                <span 
                  class="w-6 h-0.5 bg-current transform transition-all duration-300"
                  :class="[isMenuOpen ? 'opacity-0 translate-x-3' : '']"
                ></span>
                <span 
                  class="w-6 h-0.5 bg-current transform transition-all duration-300 origin-left"
                  :class="[isMenuOpen ? '-rotate-45 translate-x-px' : '']"
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform -translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div 
          v-show="isMenuOpen"
          class="md:hidden absolute top-full left-0 right-0"
        >
          <div class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg px-4 pt-2 pb-3 space-y-1 shadow-lg">
            <NuxtLink 
              v-for="link in ['Home', 'About', 'Skills', 'Projects', 'Contact']"
              :key="link"
              :to="link === 'Home' ? '/' : `/${link.toLowerCase()}`"
              class="block px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
              @click="closeMenu"
            >
              <div class="flex items-center space-x-2">
                <Icon 
                  :icon="getMenuIcon(link)"
                  class="w-5 h-5"
                />
                <span>{{ link }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </transition>
    </nav>

    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isMenuOpen"
        class="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm md:hidden z-40"
        @click="closeMenu"
      ></div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useDarkMode } from '@/composables/useDarkMode'
import { useLogoTransition } from '~/composables/useLogoTransition'

const { isDarkMode, toggleDarkMode, currentLogo, isTransitioning } = useDarkMode()

const scrolled = ref(false)
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 10
  if (isMenuOpen.value && scrolled.value) {
    closeMenu()
  }
}

const getMenuIcon = (link) => {
  const icons = {
    'Home': 'mdi:home',
    'About': 'mdi:account',
    'Skills': 'mdi:tools',
    'Projects': 'mdi:folder-multiple',
    'Contact': 'mdi:email'
  }
  return icons[link]
}

watch(isDarkMode, () => {
  isTransitioning.value = true
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

/* Improve transition smoothness */
.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Optional: Add smooth transition for backdrop blur */
.backdrop-blur {
  transition: backdrop-filter 0.3s ease;
}
</style>
