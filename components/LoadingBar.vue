<template>
  <div
    class="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none transition-opacity duration-300"
    :class="{ 'opacity-0': !isLoading }"
  >
    <div
      class="h-full w-[85%] transition-all duration-300 ease-out origin-right"
      :class="[
        isDarkMode 
          ? 'bg-gradient-to-l from-purple-500 to-blue-400' 
          : 'bg-gradient-to-l from-blue-500 to-purple-500'
      ]"
      :style="{
        transform: isLoading ? 'translateX(-15%)' : 'translateX(-100%)',
        transition: isLoading
          ? 'transform 3s cubic-bezier(0.1, 0.05, 0, 1)'
          : 'transform 200ms ease-out'
      }"
    ></div>
  </div>
</template>

<script setup>
const isLoading = ref(false)
const { isDarkMode } = useDarkMode()

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
</script>

<style scoped>
.origin-right {
  transform-origin: right;
}
</style>