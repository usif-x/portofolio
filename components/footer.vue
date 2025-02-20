<template>
  <footer class="relative bg-white dark:bg-gray-900 pt-16 pb-6">
      <div class="flex flex-col items-center text-center">
          <div class="py-6 dark:text-gray-200">
              © {{ currentYear }} <span class="font-bold">Yousseif Muhammed</span>
          </div>
          </div>
  </footer>
</template>

<script setup>
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(to right, rgb(0 0 0 / 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(0 0 0 / 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Optional: Add a subtle animation on page load */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

footer {
  animation: fadeIn 0.5s ease-out;
}
</style>