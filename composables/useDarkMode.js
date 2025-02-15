import { ref } from 'vue'
import { useNuxtApp } from '#app'

export function useDarkMode() {
  const isDarkMode = ref(false)
  const currentLogo = ref('/images/logo-light.png')
  const isTransitioning = ref(false)

  if (process.client) {
    const nuxtApp = useNuxtApp()

    // Initialize on client side only
    const initTheme = () => {
      const savedTheme = localStorage.getItem('darkMode')
      isDarkMode.value = savedTheme ? savedTheme === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches
      updateTheme()
      updateLogo()
    }

    const updateLogo = () => {
      isTransitioning.value = true
      setTimeout(() => {
        currentLogo.value = isDarkMode.value ? '/images/logo-dark.png' : '/images/logo-light.png'
        setTimeout(() => {
          isTransitioning.value = false
        }, 500)
      }, 150)
    }

    const updateTheme = () => {
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      localStorage.setItem('darkMode', isDarkMode.value)
      updateTheme()
      updateLogo()
    }

    // Initialize on mount
    nuxtApp.hook('app:mounted', () => {
      initTheme()
    })

    return {
      isDarkMode,
      toggleDarkMode,
      currentLogo,
      isTransitioning
    }
  }

  // Return default values for SSR
  return {
    isDarkMode,
    toggleDarkMode: () => {},
    currentLogo,
    isTransitioning
  }
} 