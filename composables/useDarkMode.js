import { ref, nextTick } from 'vue'
import { useNuxtApp } from '#app'

export function useDarkMode() {
  const isDarkMode = ref(false)
  const currentLogo = ref('/images/logo-light.png')
  const isTransitioning = ref(false)

  const updateTheme = () => {
    if (!process.client) return
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const updateLogo = () => {
    if (!process.client) return
    isTransitioning.value = true
    setTimeout(() => {
      currentLogo.value = isDarkMode.value ? '/images/logo-dark.png' : '/images/logo-light.png'
      setTimeout(() => {
        isTransitioning.value = false
      }, 500)
    }, 150)
  }

  const initTheme = () => {
    if (!process.client) return
    
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme !== null) {
      isDarkMode.value = savedTheme === 'true'
    } else {
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    updateTheme()
    updateLogo()
  }

  if (process.client) {
    const nuxtApp = useNuxtApp()

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      localStorage.setItem('darkMode', isDarkMode.value ? 'true' : 'false')
      updateTheme()
      updateLogo()
    }

    nuxtApp.hook('app:mounted', () => {
      initTheme()
    })

    return {
      isDarkMode,
      toggleDarkMode,
      currentLogo,
      isTransitioning,
      initTheme
    }
  }

  // Return default values for SSR
  return {
    isDarkMode,
    toggleDarkMode: () => {},
    currentLogo,
    isTransitioning,
    initTheme: () => {}
  }
}