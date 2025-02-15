import { ref, computed } from 'vue'
import { useDarkMode } from './useDarkMode'

export function useLogoTransition() {
  const { isDarkMode } = useDarkMode()
  const isLogoTransitioning = ref(false)

  // Use computed property to reactively update logo based on isDarkMode
  const currentLogo = computed(() => {
    console.log('Dark mode state:', isDarkMode.value)
    return isDarkMode.value ? '/images/logo-dark.png' : '/images/logo-light.png'
  })

  return {
    currentLogo,
    isLogoTransitioning
  }
} 