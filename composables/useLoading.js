import { ref } from 'vue'

export const useLoading = () => {
  const isLoading = ref(false)
  
  if (process.client) {
    const router = useRouter()
    
    router.beforeEach(() => {
      isLoading.value = true
      return true
    })
    
    router.afterEach(() => {
      setTimeout(() => {
        isLoading.value = false
      }, 700)
    })
  }
  
  return {
    isLoading
  }
}